"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CommunicationScenario } from "@/lib/communicationTrainerTypes";

type Status = "gotIt" | "review";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function loadProgress(storageKey: string): Record<string, Status> {
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveProgress(storageKey: string, progress: Record<string, Status>) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch {}
}

export default function CommunicationTrainer({
  scenarios,
  storageKey,
}: {
  scenarios: CommunicationScenario[];
  storageKey: string;
}) {
  // Same hydration reasoning as GuidedPractice/FlashcardDeck: render in the
  // server-sent order on first paint, reorder by localStorage progress only
  // after mount.
  const [deck, setDeck] = useState(scenarios);
  const [progress, setProgress] = useState<Record<string, Status>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = loadProgress(storageKey);
    setProgress(saved);
    const review = scenarios.filter((s) => saved[s.id] === "review");
    const unseen = scenarios.filter((s) => !saved[s.id]);
    const gotIt = scenarios.filter((s) => saved[s.id] === "gotIt");
    setDeck([...shuffle(review), ...shuffle(unseen), ...shuffle(gotIt)]);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [roundDone, setRoundDone] = useState(false);

  const total = scenarios.length;
  const current = deck[index];
  const reviewCount = Object.values(progress).filter((s) => s === "review").length;
  const gotItCount = Object.values(progress).filter((s) => s === "gotIt").length;

  function mark(status: Status) {
    const next = { ...progress, [current.id]: status };
    setProgress(next);
    saveProgress(storageKey, next);
    setAnswer("");
    setRevealed(false);
    if (index + 1 < deck.length) {
      setIndex(index + 1);
    } else {
      setRoundDone(true);
    }
  }

  function restart() {
    const saved = loadProgress(storageKey);
    const review = scenarios.filter((s) => saved[s.id] === "review");
    const unseen = scenarios.filter((s) => !saved[s.id]);
    const gotIt = scenarios.filter((s) => saved[s.id] === "gotIt");
    setDeck([...shuffle(review), ...shuffle(unseen), ...shuffle(gotIt)]);
    setIndex(0);
    setAnswer("");
    setRevealed(false);
    setRoundDone(false);
  }

  if (total === 0) {
    return (
      <div className="photo-plate relative flex min-h-[12rem] items-center justify-center">
        <p className="px-6 text-center text-parchment/90">This path&apos;s communication trainer set is in production.</p>
      </div>
    );
  }

  if (roundDone) {
    return (
      <div className="border-2 border-gold bg-gold/10 p-8 text-center">
        <p className="eyebrow mb-2">Round complete</p>
        <p className="display text-3xl">
          You went through all <span className="text-gold">{deck.length}</span> scenarios
        </p>
        <p className="mt-2 text-sm text-stone">
          {gotItCount} marked &ldquo;Got it&rdquo; · {reviewCount} queued for next time
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-6 rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
        >
          Go again — weak spots first
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.18em] text-stone">
          Scenario {index + 1} of {deck.length}
        </p>
        {ready && reviewCount > 0 && (
          <p className="text-xs uppercase tracking-[0.18em] text-crimson">{reviewCount} marked for review are coming up first</p>
        )}
      </div>

      <div className="mt-4 border-2 border-ink/15 bg-parchment p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-stone">{current.skillTag}</p>
        <p className="display mt-2 text-2xl">{current.situation}</p>

        {!revealed ? (
          <>
            <p className="mt-5 text-sm font-semibold text-stone">How would you answer this out loud?</p>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer — or skip straight to Reveal if you just want to compare."
              rows={4}
              className="mt-3 w-full border border-ink/20 bg-white/60 p-4 text-sm text-ink placeholder:text-stone/60 focus:border-crimson focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="mt-4 rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
            >
              Reveal the professional answer
            </button>
          </>
        ) : (
          <div className="mt-5 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">Your answer</p>
              <p className="mt-1 text-ink">{answer.trim() ? answer : <span className="italic text-stone">(skipped)</span>}</p>
            </div>

            <div className="rounded-[2px] border border-ink/15 bg-white/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">A real, not-wrong, beginner answer</p>
              <p className="mt-1 text-ink">{current.beginnerAnswer}</p>
            </div>

            <div className="rounded-[2px] border-2 border-crimson bg-gold-pale p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">Professional answer</p>
              <p className="mt-1 text-crimson-deep">{current.professionalAnswer}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">Vocabulary this answer uses</p>
              <ul className="mt-2 space-y-2">
                {current.vocabulary.map((v) => (
                  <li key={v.term} className="text-sm">
                    <span className="font-semibold text-crimson-deep">{v.term}</span>
                    <span className="text-ink"> — &ldquo;{v.usage}&rdquo;</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">Why it&apos;s stronger</p>
              <p className="mt-1 text-stone">{current.whyStronger}</p>
            </div>

            {current.lessonLink && (
              <Link
                href={`/app/courses/${current.lessonLink.courseSlug}/${current.lessonLink.lessonSlug}`}
                className="inline-block text-sm font-semibold text-crimson-deep hover:underline"
              >
                Review this lesson: {current.lessonLink.label} →
              </Link>
            )}
          </div>
        )}
      </div>

      {revealed && (
        <div className="mt-5 flex flex-wrap gap-3">
          <p className="w-full text-sm text-stone">How close were you?</p>
          <button
            type="button"
            onClick={() => mark("gotIt")}
            className="flex-1 rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
          >
            Got it →
          </button>
          <button
            type="button"
            onClick={() => mark("review")}
            className="flex-1 rounded-[2px] border border-ink/20 px-6 py-3 text-sm font-semibold hover:border-crimson hover:text-crimson"
          >
            Review again
          </button>
        </div>
      )}
    </div>
  );
}
