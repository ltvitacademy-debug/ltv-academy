"use client";

import Link from "next/link";
import { useState } from "react";
import type { CommunicationExercise } from "@/lib/communicationTrainerTypes";

// Step order follows the learning sequence exactly:
// 1 read scenario -> 2 beginner response -> 3 why it's weak -> 4 professional
// response -> 5 SCOPE breakdown -> 6 vocabulary & professional phrasing ->
// 7 construct your own response -> 8 compare against the model -> 9 verbal
// rehearsal. "What makes this sound senior?" and "Say it like a senior" are
// additions layered into that sequence (after SCOPE, and after vocabulary,
// respectively) — not substitutes for any of the 9 steps.
const STEP_LABELS = [
  "The scenario",
  "A beginner answer",
  "Why it's weak",
  "The professional answer",
  "SCOPE breakdown",
  "What makes this sound senior?",
  "Vocabulary & professional phrasing",
  "Say it like a senior",
  "Construct your own response",
  "Compare against the model",
  "Verbal rehearsal",
] as const;

function SayItLikeASenior({ prompts }: { prompts: CommunicationExercise["sayItLikeASenior"] }) {
  const [attempts, setAttempts] = useState<string[]>(prompts.map(() => ""));
  const [revealed, setRevealed] = useState<boolean[]>(prompts.map(() => false));

  return (
    <div className="space-y-6">
      <p className="text-stone">
        Try transforming each beginner statement into something a senior professional would say —
        <em> before</em> you reveal the suggested version. There&apos;s no single correct answer; the
        point is practicing the upgrade yourself.
      </p>
      {prompts.map((p, i) => (
        <div key={i} className="rounded-[2px] border border-ink/15 bg-white/50 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">Beginner statement</p>
          <p className="mt-1 italic text-ink">&ldquo;{p.beginnerStatement}&rdquo;</p>

          {!revealed[i] ? (
            <>
              <textarea
                value={attempts[i]}
                onChange={(e) => {
                  const next = [...attempts];
                  next[i] = e.target.value;
                  setAttempts(next);
                }}
                placeholder="Your professional version..."
                rows={2}
                className="mt-3 w-full border border-ink/20 bg-white/60 p-3 text-sm text-ink placeholder:text-stone/60 focus:border-crimson focus:outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  const next = [...revealed];
                  next[i] = true;
                  setRevealed(next);
                }}
                className="mt-3 rounded-[2px] border border-crimson/40 px-5 py-2 text-sm font-semibold text-crimson-deep hover:bg-crimson hover:text-parchment transition-colors"
              >
                Reveal suggested version
              </button>
            </>
          ) : (
            <div className="mt-3 space-y-3">
              {attempts[i].trim() && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">Your version</p>
                  <p className="mt-1 text-ink">{attempts[i]}</p>
                </div>
              )}
              <div className="rounded-[2px] border-2 border-crimson bg-gold-pale p-3">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">Suggested version</p>
                <p className="mt-1 text-crimson-deep">{p.suggestedProfessionalVersion}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function CommunicationTrainer({ exercise }: { exercise: CommunicationExercise }) {
  const [step, setStep] = useState(0);
  const last = STEP_LABELS.length - 1;

  // Lifted to the parent so the "construct" step and "compare" step share
  // the same answer text.
  const [answer, setAnswer] = useState("");
  const [checked, setChecked] = useState<boolean[]>(exercise.selfAssessmentRubric.map(() => false));

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.18em] text-stone">
          Step {step + 1} of {STEP_LABELS.length} · {STEP_LABELS[step]}
        </p>
      </div>
      <div className="mt-2 flex gap-1">
        {STEP_LABELS.map((label, i) => (
          <button
            key={label}
            type="button"
            onClick={() => setStep(i)}
            aria-label={`Go to step ${i + 1}: ${label}`}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-crimson" : "bg-ink/10"}`}
          />
        ))}
      </div>

      <div className="mt-6 border-2 border-ink/15 bg-parchment p-6 sm:p-8">
        {step === 0 && (
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-stone">{exercise.skillTag}</p>
            <p className="display mt-2 text-2xl">{exercise.situation}</p>
            <p className="mt-4 text-stone">
              Before reading on, think about how you&apos;d actually answer this out loud. The next
              steps show a weak answer, a strong one, and exactly what separates them — not so you
              can memorize this script, but so you can see the reasoning behind it.
            </p>
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="eyebrow mb-2">A real, not-wrong, beginner answer</p>
            <p className="text-ink">{exercise.beginnerResponse}</p>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="eyebrow mb-2">Why it's weak</p>
            <p className="text-ink">{exercise.whyBeginnerIsWeak}</p>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="eyebrow mb-2">The professional answer</p>
            <div className="rounded-[2px] border-2 border-crimson bg-gold-pale p-4">
              <p className="text-crimson-deep">{exercise.professionalResponse}</p>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="eyebrow mb-4">Breaking the answer down with SCOPE</p>
            <div className="space-y-5">
              {exercise.scopeBreakdown.map((s) => (
                <div key={s.letter} className="flex gap-4">
                  <span className="display flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-crimson-deep text-lg text-gold-pale">
                    {s.letter}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{s.label}</p>
                    <p className="mt-0.5 text-sm italic text-stone">{s.quickReference}</p>
                    <p className="mt-1 text-sm text-ink">{s.explanation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <p className="eyebrow mb-4">What makes this sound senior?</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {exercise.whatMakesThisSoundSenior.map((q) => (
                <div key={q.quality} className="rounded-[2px] border border-ink/15 bg-white/50 p-4">
                  <p className="font-semibold text-crimson-deep">{q.quality}</p>
                  <p className="mt-1 text-xs italic text-stone">{q.description}</p>
                  <p className="mt-2 text-sm text-ink">{q.howThisResponseShowsIt}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div>
            <p className="eyebrow mb-1">Vocabulary & professional phrasing</p>
            <p className="mb-4 text-sm text-stone">
              Some terms are covered in your coursework; others go beyond it, on purpose — a working
              professional&apos;s vocabulary isn&apos;t limited to exactly what one course taught.
            </p>
            <div className="space-y-4">
              {exercise.vocabulary.map((v) => (
                <div
                  key={v.term}
                  className={`rounded-[2px] border p-4 ${v.kind === "prerequisite" ? "border-ink/15 bg-white/50" : "border-gold bg-gold-pale/40"}`}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-semibold text-crimson-deep">{v.term}</p>
                    <span
                      className={`rounded-[2px] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                        v.kind === "prerequisite" ? "bg-ink/10 text-stone" : "bg-gold text-crimson-deep"
                      }`}
                    >
                      {v.kind === "prerequisite" ? "From your coursework" : "Enrichment — beyond the course"}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-ink">{v.definition}</p>
                  <p className="mt-1 text-sm text-stone">{v.whyItMatters}</p>
                  <p className="mt-2 text-sm italic text-ink">&ldquo;{v.example}&rdquo;</p>
                  {v.lessonLink && (
                    <Link
                      href={`/app/courses/${v.lessonLink.courseSlug}/${v.lessonLink.lessonSlug}`}
                      className="mt-2 inline-block text-xs font-semibold text-crimson-deep hover:underline"
                    >
                      Review this lesson: {v.lessonLink.label} →
                    </Link>
                  )}
                </div>
              ))}
            </div>

            <p className="eyebrow mb-4 mt-8">Professional language upgrades</p>
            <div className="space-y-4">
              {exercise.languageUpgrades.map((u, i) => (
                <div key={i} className="rounded-[2px] border border-ink/15 bg-white/50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">Weak</p>
                  <p className="text-ink">&ldquo;{u.weak}&rdquo;</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">Professional</p>
                  <p className="text-crimson-deep">&ldquo;{u.professional}&rdquo;</p>
                  <p className="mt-2 text-sm text-stone">{u.whyStronger}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 7 && (
          <div>
            <p className="eyebrow mb-4">Say it like a senior</p>
            <SayItLikeASenior prompts={exercise.sayItLikeASenior} />
          </div>
        )}

        {step === 8 && (
          <div>
            <p className="eyebrow mb-2">Construct your own response</p>
            <p className="mb-4 text-stone">
              Using the SCOPE framework and the vocabulary you just studied, write your own full
              answer to the original scenario — in your own words, not a recitation of the model
              answer.
            </p>
            <div className="rounded-[2px] border-2 border-ink/15 bg-white/50 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-stone">{exercise.skillTag}</p>
              <p className="mt-1 font-semibold text-ink">{exercise.situation}</p>
            </div>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Write your professional explanation..."
              rows={6}
              className="mt-4 w-full border border-ink/20 bg-white/60 p-4 text-sm text-ink placeholder:text-stone/60 focus:border-crimson focus:outline-none"
            />
          </div>
        )}

        {step === 9 && (
          <div className="space-y-6">
            <p className="eyebrow mb-2">Compare against the professional model</p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">Your answer</p>
              <p className="mt-1 text-ink">{answer.trim() ? answer : <span className="italic text-stone">(nothing written — go back to the previous step if you'd like to try)</span>}</p>
            </div>
            <div className="rounded-[2px] border-2 border-crimson bg-gold-pale p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">Professional model answer</p>
              <p className="mt-1 text-crimson-deep">{exercise.professionalResponse}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">Self-assessment — check what your answer actually did</p>
              <ul className="mt-3 space-y-2">
                {exercise.selfAssessmentRubric.map((item, i) => (
                  <li key={i}>
                    <label className="flex cursor-pointer items-start gap-3 text-sm">
                      <input
                        type="checkbox"
                        checked={checked[i]}
                        onChange={() => {
                          const next = [...checked];
                          next[i] = !next[i];
                          setChecked(next);
                        }}
                        className="mt-1"
                      />
                      <span className="text-ink">{item}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-stone">
                {checked.filter(Boolean).length} of {exercise.selfAssessmentRubric.length} — no grade, just an honest self-check.
              </p>
            </div>
          </div>
        )}

        {step === 10 && (
          <div>
            <p className="eyebrow mb-2">Verbal rehearsal</p>
            <div className="rounded-[2px] border-l-4 border-gold bg-gold-pale/40 p-5">
              <p className="text-ink">{exercise.verbalRehearsalPrompt}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 flex justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="rounded-[2px] border border-ink/20 px-6 py-3 text-sm font-semibold hover:border-crimson hover:text-crimson disabled:opacity-30 disabled:hover:border-ink/20 disabled:hover:text-ink"
        >
          ← Back
        </button>
        {step < last ? (
          <button
            type="button"
            onClick={() => setStep((s) => Math.min(last, s + 1))}
            className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
          >
            Next →
          </button>
        ) : (
          <span className="rounded-[2px] border border-gold px-6 py-3 text-sm font-semibold text-crimson-deep">Exercise complete</span>
        )}
      </div>
    </div>
  );
}
