"use client";

import { useEffect, useState } from "react";

type PracticeQuestion = {
  id: string;
  q: string;
  correctAnswers: string[];
  why: string;
  lessonTitle: string;
};

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

export default function GuidedPractice({
  questions,
  storageKey,
}: {
  questions: PracticeQuestion[];
  storageKey: string;
}) {
  // Render in the server-sent order on first paint — same reasoning as
  // FlashcardDeck: reordering by localStorage progress (client-only data)
  // or Math.random() during the initial render would mismatch the server
  // HTML and trigger a hydration error. Reorder only after mount.
  const [deck, setDeck] = useState(questions);
  const [progress, setProgress] = useState<Record<string, Status>>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = loadProgress(storageKey);
    setProgress(saved);
    const review = questions.filter((q) => saved[q.id] === "review");
    const unseen = questions.filter((q) => !saved[q.id]);
    const gotIt = questions.filter((q) => saved[q.id] === "gotIt");
    setDeck([...shuffle(review), ...shuffle(unseen), ...shuffle(gotIt)]);
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [roundDone, setRoundDone] = useState(false);

  const total = questions.length;
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
    const review = questions.filter((q) => saved[q.id] === "review");
    const unseen = questions.filter((q) => !saved[q.id]);
    const gotIt = questions.filter((q) => saved[q.id] === "gotIt");
    setDeck([...shuffle(review), ...shuffle(unseen), ...shuffle(gotIt)]);
    setIndex(0);
    setAnswer("");
    setRevealed(false);
    setRoundDone(false);
  }

  if (total === 0) {
    return (
      <div className="photo-plate relative flex min-h-[12rem] items-center justify-center">
        <p className="px-6 text-center text-parchment/90">
          This course&apos;s guided practice set is in production.
        </p>
      </div>
    );
  }

  if (roundDone) {
    return (
      <div className="border-2 border-gold bg-gold/10 p-8 text-center">
        <p className="eyebrow mb-2">Round complete</p>
        <p className="display text-3xl">
          You went through all <span className="text-gold">{deck.length}</span> questions
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
          Question {index + 1} of {deck.length}
        </p>
        {ready && reviewCount > 0 && (
          <p className="text-xs uppercase tracking-[0.18em] text-crimson">
            {reviewCount} marked for review are coming up first
          </p>
        )}
      </div>

      <div className="mt-4 border-2 border-ink/15 bg-parchment p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-stone">{current.lessonTitle}</p>
        <p className="display mt-2 text-2xl">{current.q}</p>

        {!revealed ? (
          <>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer — or skip straight to Reveal if you just want to check your thinking."
              rows={4}
              className="mt-5 w-full border border-ink/20 bg-white/60 p-4 text-sm text-ink placeholder:text-stone/60 focus:border-crimson focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setRevealed(true)}
              className="mt-4 rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment hover:bg-crimson-deep"
            >
              Reveal answer
            </button>
          </>
        ) : (
          <div className="mt-5 space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">
                Your answer
              </p>
              <p className="mt-1 text-ink">
                {answer.trim() ? answer : <span className="italic text-stone">(skipped)</span>}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-crimson-deep">
                {current.correctAnswers.length > 1 ? "Possible correct answers" : "Correct answer"}
              </p>
              <ul className="mt-1 space-y-1">
                {current.correctAnswers.map((a, i) => (
                  <li key={i} className="text-ink">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            {current.why && (
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone">Why</p>
                <p className="mt-1 text-stone">{current.why}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {revealed && (
        <div className="mt-5 flex flex-wrap gap-3">
          <p className="w-full text-sm text-stone">How did you do?</p>
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
