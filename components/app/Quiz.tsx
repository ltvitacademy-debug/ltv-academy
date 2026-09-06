"use client";

import { useState } from "react";

type Question = { q: string; options: string[]; answer: number; explain: string };

export default function Quiz({
  questions,
  storageKey,
}: {
  questions: Question[];
  storageKey: string;
}) {
  const [picks, setPicks] = useState<(number | null)[]>(
    questions.map(() => null)
  );
  const [submitted, setSubmitted] = useState(false);

  const score = picks.filter((p, i) => p === questions[i].answer).length;

  function submit() {
    setSubmitted(true);
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ score, total: questions.length, at: Date.now() })
      );
    } catch {}
  }

  return (
    <div className="space-y-8">
      {questions.map((question, qi) => (
        <fieldset key={qi}>
          <legend className="display text-xl">
            <span className="text-crimson">{qi + 1}.</span> {question.q}
          </legend>
          <div className="mt-3 space-y-2">
            {question.options.map((opt, oi) => {
              const chosen = picks[qi] === oi;
              const correct = submitted && oi === question.answer;
              const wrong = submitted && chosen && oi !== question.answer;
              return (
                <label
                  key={oi}
                  className={`flex cursor-pointer items-baseline gap-3 border p-3 text-sm transition-colors ${
                    correct
                      ? "border-gold bg-gold/10"
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
                  <span>{opt}</span>
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
          {questions.length}.
        </p>
      )}
    </div>
  );
}
