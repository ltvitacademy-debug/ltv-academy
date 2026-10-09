"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type {
  InterviewCategory,
  InterviewDifficulty,
  InterviewQuestion,
} from "@/lib/interviewPrepTypes";
import { CATEGORY_LABELS, DIFFICULTY_LABELS, checkAvailability } from "@/lib/interviewPrepTypes";

type CompletedSession = {
  id: string;
  completedAt: string;
  questionCount: number;
  gotIt: number;
  needsReview: number;
};

type Decision = "got-it" | "needs-review" | null;

const LENGTH_OPTIONS = [10, 20, 30, 50];

const SHORT_CATEGORY_LABELS: Record<InterviewCategory, string> = {
  "technical-knowledge": "Technical",
  "hands-on": "Hands-On",
  troubleshooting: "Troubleshooting",
  architecture: "Architecture",
  behavioral: "Behavioral",
};

const SHORT_DIFFICULTY_LABELS: Record<InterviewDifficulty, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

function historyKey(pathSlug: string) {
  return `interviewPrep:${pathSlug}:history`;
}
function savedKey(pathSlug: string) {
  return `interviewPrep:${pathSlug}:saved`;
}

function loadHistory(pathSlug: string): CompletedSession[] {
  try {
    const raw = localStorage.getItem(historyKey(pathSlug));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveHistory(pathSlug: string, history: CompletedSession[]) {
  try {
    localStorage.setItem(historyKey(pathSlug), JSON.stringify(history));
  } catch {}
}
function loadSaved(pathSlug: string): string[] {
  try {
    const raw = localStorage.getItem(savedKey(pathSlug));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function persistSaved(pathSlug: string, saved: string[]) {
  try {
    localStorage.setItem(savedKey(pathSlug), JSON.stringify(saved));
  } catch {}
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

type Stage = "configure" | "availability" | "interview" | "summary";

export default function InterviewPrep({
  pathSlug,
  pathTitle,
  questions,
}: {
  pathSlug: string;
  pathTitle: string;
  questions: InterviewQuestion[];
}) {
  const [ready, setReady] = useState(false);
  const [history, setHistory] = useState<CompletedSession[]>([]);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    setHistory(loadHistory(pathSlug));
    setSaved(loadSaved(pathSlug));
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const allSkills = useMemo(() => {
    const s = new Set<string>();
    for (const q of questions) for (const sk of q.skills) s.add(sk);
    return Array.from(s).sort();
  }, [questions]);

  const [stage, setStage] = useState<Stage>("configure");
  const [skillFilter, setSkillFilter] = useState<string | null>(null);
  const [difficulty, setDifficulty] = useState<InterviewDifficulty | "all">("all");
  const [category, setCategory] = useState<InterviewCategory | "mixed">("mixed");
  const [length, setLength] = useState(20);

  const [expandSkill, setExpandSkill] = useState(false);
  const [expandDifficulty, setExpandDifficulty] = useState(false);

  const [sessionQuestions, setSessionQuestions] = useState<InterviewQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const availability = useMemo(
    () => checkAvailability(questions, skillFilter, difficulty, length),
    [questions, skillFilter, difficulty, length]
  );

  function matchingPool(opts: { ignoreSkill?: boolean; ignoreDifficulty?: boolean }) {
    return questions.filter((q) => {
      if (q.status !== "published") return false;
      if (category !== "mixed" && q.category !== category) return false;
      if (!opts.ignoreDifficulty && difficulty !== "all" && q.difficulty !== difficulty)
        return false;
      if (!opts.ignoreSkill && skillFilter && !q.skills.includes(skillFilter)) return false;
      return true;
    });
  }

  function goToAvailabilityCheck() {
    setExpandSkill(false);
    setExpandDifficulty(false);
    setStage("availability");
  }

  function startInterview() {
    const pool = matchingPool({ ignoreSkill: expandSkill, ignoreDifficulty: expandDifficulty });
    const picked = shuffle(pool).slice(0, length);
    setSessionQuestions(picked);
    setIndex(0);
    setAnswer("");
    setRevealed(false);
    setDecisions({});
    setStage("interview");
  }

  function practiceAvailableOnly() {
    const pool = matchingPool({});
    setSessionQuestions(shuffle(pool));
    setIndex(0);
    setAnswer("");
    setRevealed(false);
    setDecisions({});
    setStage("interview");
  }

  const current = sessionQuestions[index];

  function decide(decision: Decision) {
    const next = { ...decisions, [current.id]: decision };
    setDecisions(next);
    setAnswer("");
    setRevealed(false);
    if (index + 1 < sessionQuestions.length) {
      setIndex(index + 1);
    } else {
      finishSession(next);
    }
  }

  function finishSession(finalDecisions: Record<string, Decision>) {
    const gotIt = Object.values(finalDecisions).filter((d) => d === "got-it").length;
    const needsReview = Object.values(finalDecisions).filter((d) => d === "needs-review").length;
    const entry: CompletedSession = {
      id: `${Date.now()}`,
      completedAt: new Date().toISOString(),
      questionCount: sessionQuestions.length,
      gotIt,
      needsReview,
    };
    const next = [entry, ...history].slice(0, 50);
    setHistory(next);
    saveHistory(pathSlug, next);
    setStage("summary");
  }

  function toggleSaved(id: string) {
    const next = saved.includes(id) ? saved.filter((s) => s !== id) : [...saved, id];
    setSaved(next);
    persistSaved(pathSlug, next);
  }

  function restart() {
    setStage("configure");
  }

  // -------------------------------------------------------------------------
  if (questions.length === 0) {
    return (
      <div className="photo-plate relative flex min-h-[12rem] items-center justify-center">
        <p className="px-6 text-center text-parchment/90">
          This career path&apos;s interview question bank is in production.
        </p>
      </div>
    );
  }

  const skillPoolSize = questions.filter(
    (q) => q.status === "published" && (!skillFilter || q.skills.includes(skillFilter))
  ).length;

  // --- Configure -------------------------------------------------------
  if (stage === "configure") {
    return (
      <div className="border-2 border-ink/15 bg-parchment p-6 sm:p-8">
        <p className="eyebrow mb-2">Configure your mock interview</p>
        <h2 className="display text-2xl sm:text-3xl">{pathTitle}</h2>
        <p className="mt-2 text-sm text-stone">
          {questions.length} questions in this path&apos;s bank · reveal only after you answer.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone">
              Technical skill
            </span>
            <select
              value={skillFilter ?? ""}
              onChange={(e) => setSkillFilter(e.target.value || null)}
              className="mt-1.5 w-full border border-ink/20 bg-white/60 p-3 text-sm text-ink focus:border-crimson focus:outline-none"
            >
              <option value="">All skills</option>
              {allSkills.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone">
              Experience level
            </span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as InterviewDifficulty | "all")}
              className="mt-1.5 w-full border border-ink/20 bg-white/60 p-3 text-sm text-ink focus:border-crimson focus:outline-none"
            >
              <option value="all">All levels</option>
              {(Object.keys(DIFFICULTY_LABELS) as InterviewDifficulty[]).map((d) => (
                <option key={d} value={d}>
                  {DIFFICULTY_LABELS[d]}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone">
              Interview length
            </span>
            <select
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="mt-1.5 w-full border border-ink/20 bg-white/60 p-3 text-sm text-ink focus:border-crimson focus:outline-none"
            >
              {LENGTH_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} questions
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone">
              Interview type
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as InterviewCategory | "mixed")}
              className="mt-1.5 w-full border border-ink/20 bg-white/60 p-3 text-sm text-ink focus:border-crimson focus:outline-none"
            >
              <option value="mixed">Mixed interview</option>
              {(Object.keys(CATEGORY_LABELS) as InterviewCategory[]).map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          onClick={goToAvailabilityCheck}
          className="mt-7 rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
        >
          Preview interview →
        </button>

        {ready && history.length > 0 && (
          <div className="mt-8 border-t border-ink/10 pt-6">
            <p className="eyebrow mb-3">Your history</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <StatTile label="Interviews" value={history.length} />
              <StatTile
                label="Questions practiced"
                value={history.reduce((s, h) => s + h.questionCount, 0)}
              />
              <StatTile
                label="Self-rated strong"
                value={`${Math.round(
                  (100 * history.reduce((s, h) => s + h.gotIt, 0)) /
                    Math.max(1, history.reduce((s, h) => s + h.questionCount, 0))
                )}%`}
              />
            </div>
            <p className="mt-3 text-xs text-stone">
              These percentages are self-reported confidence, not independently verified.
            </p>
          </div>
        )}

        {ready && saved.length > 0 && (
          <p className="mt-4 text-xs text-stone">
            {saved.length} question{saved.length === 1 ? "" : "s"} saved for later.
          </p>
        )}
      </div>
    );
  }

  // --- Availability check ------------------------------------------------
  if (stage === "availability") {
    const exactPool = matchingPool({});
    const withSkillExpanded = skillFilter ? matchingPool({ ignoreSkill: true }) : exactPool;
    const withDifficultyExpanded =
      difficulty !== "all" ? matchingPool({ ignoreDifficulty: true }) : exactPool;
    const withBothExpanded = matchingPool({ ignoreSkill: true, ignoreDifficulty: true });

    // A short, natural description of the active filters causing the shortfall,
    // e.g. "Advanced DAX Technical" — built only from filters actually narrowing
    // the pool, so an unfiltered mixed interview just says "questions".
    const qualifierParts = [
      difficulty !== "all" ? SHORT_DIFFICULTY_LABELS[difficulty] : null,
      skillFilter,
      category !== "mixed" ? SHORT_CATEGORY_LABELS[category] : null,
    ].filter((p): p is string => Boolean(p));
    const qualifier = qualifierParts.length > 0 ? qualifierParts.join(" ") + " " : "";

    if (exactPool.length >= length) {
      return (
        <div className="border-2 border-ink/15 bg-parchment p-6 sm:p-8">
          <p className="eyebrow mb-2">Question availability</p>
          <p className="display text-2xl">
            {exactPool.length} of {length} questions available
          </p>
          <p className="mt-2 text-sm text-stone">
            Exact match for your selected skill, level, and type. You&apos;re ready to start.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={startInterview}
              className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
            >
              Start interview →
            </button>
            <button
              type="button"
              onClick={() => setStage("configure")}
              className="rounded-[2px] border border-ink/20 px-6 py-3 text-sm font-semibold hover:border-crimson hover:text-crimson"
            >
              ← Change settings
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="border-2 border-gold bg-gold/10 p-6 sm:p-8">
        <p className="eyebrow mb-2">Question availability</p>
        <p className="display text-2xl">
          We only have {exactPool.length} {qualifier}question{exactPool.length === 1 ? "" : "s"}.
        </p>
        <p className="mt-2 text-sm text-stone">
          Go ahead with the {exactPool.length} question{exactPool.length === 1 ? "" : "s"}, or
          widen the search below.
        </p>

        <div className="mt-5 space-y-3">
          <button
            type="button"
            onClick={practiceAvailableOnly}
            className="flex w-full items-center justify-between gap-4 rounded-[2px] bg-crimson px-5 py-4 text-left text-parchment shadow-[0_4px_14px_-4px_rgba(142,28,28,0.5)] transition-colors hover:bg-crimson-deep"
          >
            <span>
              <span className="block font-semibold">
                Yes — go ahead with the {exactPool.length} question
                {exactPool.length === 1 ? "" : "s"}
              </span>
              <span className="block text-sm text-parchment/80">
                Exact match only, no substitutions.
              </span>
            </span>
            <span className="shrink-0 text-xl">→</span>
          </button>

          {skillFilter && withSkillExpanded.length > exactPool.length && (
            <ExpandOption
              onClick={() => {
                setExpandSkill(true);
                startInterview();
              }}
              title={`Include other skills to reach ${Math.min(length, withSkillExpanded.length)}`}
              detail={`Drops the "${skillFilter}" filter — ${withSkillExpanded.length} questions become available.`}
            />
          )}

          {difficulty !== "all" && withDifficultyExpanded.length > exactPool.length && (
            <ExpandOption
              onClick={() => {
                setExpandDifficulty(true);
                startInterview();
              }}
              title={`Include other difficulty levels to reach ${Math.min(length, withDifficultyExpanded.length)}`}
              detail={`Drops the "${DIFFICULTY_LABELS[difficulty]}" filter — ${withDifficultyExpanded.length} questions become available.`}
            />
          )}

          {skillFilter && difficulty !== "all" && withBothExpanded.length > Math.max(
            withSkillExpanded.length,
            withDifficultyExpanded.length
          ) && (
            <ExpandOption
              onClick={() => {
                setExpandSkill(true);
                setExpandDifficulty(true);
                startInterview();
              }}
              title={`Include both to reach ${Math.min(length, withBothExpanded.length)}`}
              detail={`Drops both filters — ${withBothExpanded.length} questions become available.`}
            />
          )}
        </div>

        <button
          type="button"
          onClick={() => setStage("configure")}
          className="mt-5 text-sm text-stone underline underline-offset-4 hover:text-crimson"
        >
          ← Change settings instead
        </button>
      </div>
    );
  }

  // --- Interview session ---------------------------------------------------
  if (stage === "interview" && current) {
    const isSaved = saved.includes(current.id);
    return (
      <div>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.18em] text-stone">
            Question {index + 1} of {sessionQuestions.length}
          </p>
          <p className="text-xs uppercase tracking-[0.18em] text-crimson-deep">
            {DIFFICULTY_LABELS[current.difficulty]} · {CATEGORY_LABELS[current.category]}
          </p>
        </div>

        <div className="mt-4 border-2 border-ink/15 bg-parchment p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <p className="text-xs uppercase tracking-[0.18em] text-stone">
              {current.questionCode} · {current.skills.join(", ")}
            </p>
            <button
              type="button"
              onClick={() => toggleSaved(current.id)}
              className={`shrink-0 text-xs font-semibold uppercase tracking-[0.1em] ${
                isSaved ? "text-crimson" : "text-stone hover:text-crimson"
              }`}
            >
              {isSaved ? "★ Saved" : "☆ Save for later"}
            </button>
          </div>
          <p className="display mt-2 text-2xl">{current.title}</p>
          <p className="mt-3 text-ink">{current.prompt}</p>

          {current.code && (
            <pre className="mt-4 overflow-x-auto border border-ink/15 bg-white/70 p-4 text-sm">
              <code>{current.code}</code>
            </pre>
          )}

          {!revealed ? (
            <>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your answer as you would say it in an interview..."
                rows={6}
                className="mt-5 w-full border border-ink/20 bg-white/60 p-4 text-sm text-ink placeholder:text-stone/60 focus:border-crimson focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setRevealed(true)}
                disabled={!answer.trim()}
                className="mt-4 rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit answer
              </button>
              <p className="mt-2 text-xs text-stone">
                Type something before revealing — clicking through without answering won&apos;t
                tell you what you actually know.
              </p>
            </>
          ) : (
            <div className="mt-5 space-y-5">
              <Field label="Your answer">
                <p className="text-ink">{answer}</p>
              </Field>

              <Field label="Correct technical answer" accent>
                <p className="text-ink">{current.modelAnswer}</p>
              </Field>

              <Field label="Professional interview answer" accent>
                <p className="text-ink">{current.professionalAnswer}</p>
              </Field>

              {current.example && (
                <Field label="Practical example">
                  {current.responseFormat !== "text" ? (
                    <pre className="overflow-x-auto border border-ink/15 bg-white/70 p-4 text-sm">
                      <code>{current.example}</code>
                    </pre>
                  ) : (
                    <p className="text-ink">{current.example}</p>
                  )}
                </Field>
              )}

              <Field label="Common mistakes">
                <ul className="list-disc space-y-1 pl-5 text-ink">
                  {current.commonMistakes.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))}
                </ul>
              </Field>

              <Field label="Key points checklist">
                <ul className="list-disc space-y-1 pl-5 text-ink">
                  {current.keyPoints.map((k, i) => (
                    <li key={i}>{k}</li>
                  ))}
                </ul>
              </Field>

              {current.lessonLink && (
                <Link
                  href={`/app/courses/${current.lessonLink.courseSlug}/${current.lessonLink.lessonSlug}`}
                  className="inline-block text-sm text-crimson-deep underline underline-offset-4 hover:text-crimson"
                >
                  Review this lesson: {current.lessonLink.label} →
                </Link>
              )}
            </div>
          )}
        </div>

        {revealed && (
          <div className="mt-5 flex flex-wrap gap-3">
            <p className="w-full text-sm text-stone">
              How did your answer compare? (Self-assessed, not graded.)
            </p>
            <button
              type="button"
              onClick={() => decide("got-it")}
              className="flex-1 rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
            >
              Got it →
            </button>
            <button
              type="button"
              onClick={() => decide("needs-review")}
              className="flex-1 rounded-[2px] border border-ink/20 px-6 py-3 text-sm font-semibold hover:border-crimson hover:text-crimson"
            >
              Needs review
            </button>
          </div>
        )}
      </div>
    );
  }

  // --- Summary -------------------------------------------------------------
  const last = history[0];
  return (
    <div className="border-2 border-gold bg-gold/10 p-8 text-center">
      <p className="eyebrow mb-2">Interview complete</p>
      <p className="display text-3xl">
        You went through <span className="text-gold">{last?.questionCount ?? 0}</span> questions
      </p>
      <p className="mt-2 text-sm text-stone">
        {last?.gotIt ?? 0} self-rated &ldquo;Got it&rdquo; · {last?.needsReview ?? 0} marked for
        review
      </p>
      <p className="mt-1 text-xs text-stone">
        Self-reported confidence, not independently graded.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={restart}
          className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
        >
          Start another interview
        </button>
      </div>
    </div>
  );
}

function ExpandOption({
  onClick,
  title,
  detail,
}: {
  onClick: () => void;
  title: string;
  detail: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-4 rounded-[2px] border-2 border-ink/20 bg-white/60 px-5 py-4 text-left transition-colors hover:border-crimson hover:bg-white"
    >
      <span>
        <span className="block font-semibold text-ink">{title}</span>
        <span className="block text-sm text-stone">{detail}</span>
      </span>
      <span className="shrink-0 text-xl text-crimson">→</span>
    </button>
  );
}

function Field({
  label,
  accent,
  children,
}: {
  label: string;
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        className={`text-xs font-semibold uppercase tracking-[0.18em] ${
          accent ? "text-crimson-deep" : "text-stone"
        }`}
      >
        {label}
      </p>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function StatTile({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="border border-ink/10 bg-white/50 p-4 text-center">
      <p className="display text-2xl text-crimson-deep">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-stone">{label}</p>
    </div>
  );
}
