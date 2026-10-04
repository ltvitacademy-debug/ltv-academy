"use client";

import { useState } from "react";

type Question = { q: string; options: string[]; answer: number; explain: string };

// Many quiz.json files were authored with the correct option always listed
// first — shuffle each question's options so the answer position isn't a
// visible pattern. This is a static export: Quiz renders once at build time
// for the prerendered HTML and again on the client during hydration, so the
// shuffle must be deterministic (seeded from storageKey) rather than
// Math.random() — otherwise the two renders disagree and React throws a
// hydration mismatch.
function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return function random() {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleQuestion(q: Question, rand: () => number): Question {
  const order = q.options.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    ...q,
    options: order.map((i) => q.options[i]),
    answer: order.indexOf(q.answer),
  };
}

export default function Quiz({
  questions,
  storageKey,
}: {
  questions: Question[];
  storageKey: string;
}) {
  const [shuffled] = useState<Question[]>(() => {
    const rand = mulberry32(hashSeed(storageKey));
    return questions.map((q) => shuffleQuestion(q, rand));
  });
  const [picks, setPicks] = useState<(number | null)[]>(
    shuffled.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);

  const score = picks.filter((p, i) => p === shuffled[i].answer).length;

  function submit() {
    setSubmitted(true);
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ score, total: shuffled.length, at: Date.now() })
      );
    } catch {}
  }

  return (
    <div className="space-y-8">
      {shuffled.map((question, qi) => (
        <fieldset key={qi}>
          <legend className="display text-xl">
            <span className="text-crimson">{qi + 1}.</span> {question.q}
          </legend>
          <div className="mt-3 space-y-2">
            {question.options.map((opt, oi) => {
              const chosen = picks[qi] === oi;
              const missed = submitted && picks[qi] !== question.answer;
              const correct = submitted && oi === question.answer;
              const wrong = submitted && chosen && oi !== question.answer;
              return (
                <label
                  key={oi}
                  className={`flex cursor-pointer items-baseline gap-3 border p-3 text-sm transition-colors ${
                    correct
                      ? missed
                        ? "border-crimson bg-crimson/10"
                        : "border-gold bg-gold/10"
                      : wrong
                        ? "border-crimson bg-crimson/5"
                        : chosen
                          ? "border-ink/50"
                          : "border-ink/15 hover:border-ink/40"
                  }`}
                >
                  <input
                    type="radio"
                    name={`q${qi}`}
                    className="accent-crimson"
                    disabled={submitted}
                    checked={chosen}
                    onChange={() =>
                      setPicks((p) => p.map((v, i) => (i === qi ? oi : v)))
                    }
                  />
                  <span className={correct && missed ? "font-semibold text-crimson" : undefined}>
                    {opt}
                  </span>
                </label>
              );
            })}
          </div>
          {submitted && (
            <p className="mt-3 border-l-2 border-gold pl-4 text-sm text-stone">
              {question.explain}
            </p>
          )}
        </fieldset>
      ))}

      {!submitted ? (
        <button
          type="button"
          onClick={submit}
          disabled={picks.some((p) => p === null)}
          className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment enabled:hover:bg-crimson-deep disabled:opacity-40"
        >
          Grade my answers
        </button>
      ) : (
        <p className="display text-2xl">
          You scored <span className="text-crimson">{score}</span> of{" "}
          {shuffled.length}.
        </p>
      )}
    </div>
  );
}
