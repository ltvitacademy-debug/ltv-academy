"use client";

import { useState } from "react";

type Question = { q: string; options: string[]; answer: number; explain: string };

const PASS_THRESHOLD = 90;

export default function CourseTest({
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
  const percent = Math.round((score / questions.length) * 100);
  const passed = percent >= PASS_THRESHOLD;

  function submit() {
    setSubmitted(true);
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ score, total: questions.length, percent, passed, at: Date.now() })
      );
    } catch {}
  }

  function retake() {
    setPicks(questions.map(() => null));
    setSubmitted(false);
  }

  return (
    <div className="space-y-8">
      {submitted && (
        <div
          className={`border-2 p-6 ${
            passed ? "border-gold bg-gold/10" : "border-crimson bg-crimson/5"
          }`}
        >
          <p className="eyebrow mb-2">{passed ? "Passed" : "Not yet"}</p>
          <p className="display text-3xl">
            You scored <span className={passed ? "text-gold" : "text-crimson"}>{percent}%</span>
            <span className="text-lg text-stone"> ({score} of {questions.length})</span>
          </p>
          <p className="mt-2 text-sm text-stone">
            {passed
              ? `You cleared the ${PASS_THRESHOLD}% pass mark for this course's final test.`
              : `${PASS_THRESHOLD}% (${Math.ceil((PASS_THRESHOLD / 100) * questions.length)} of ${questions.length}) is required to pass. Review the explanations below, then retake the test.`}
          </p>
          <button
            type="button"
            onClick={retake}
            className="mt-4 rounded-[2px] border border-ink/20 px-5 py-2 text-sm font-semibold hover:border-crimson hover:text-crimson"
          >
            Retake the test
          </button>
        </div>
      )}

      {questions.map((question, qi) => (
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

      {!submitted && (
        <button
          type="button"
          onClick={submit}
          disabled={picks.some((p) => p === null)}
          className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment enabled:hover:bg-crimson-deep disabled:opacity-40"
        >
          Grade my test
        </button>
      )}
    </div>
  );
}
