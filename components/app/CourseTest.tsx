"use client";

import { useState } from "react";
import {
  AnyResponse,
  FinalTestQuestion,
  isCorrect,
  passingScore,
  scoreFinalTest,
} from "@/lib/finalTestTypes";

function defaultResponse(q: FinalTestQuestion): AnyResponse {
  switch (q.type) {
    case "single-select":
      return null;
    case "multi-select":
      return [];
    case "fill-in":
      return "";
    case "matching":
      return q.left.map(() => null);
    case "sequencing":
      // Deterministic (not the correct order, not randomized) so server and
      // client render identically on first paint — same hydration-safety
      // pattern as the flashcard deck and guided practice.
      return [...q.items].reverse();
  }
}

function initialResponses(questions: FinalTestQuestion[]): Record<string, AnyResponse> {
  const out: Record<string, AnyResponse> = {};
  for (const q of questions) out[q.id] = defaultResponse(q);
  return out;
}

function isAnswered(q: FinalTestQuestion, response: AnyResponse): boolean {
  switch (q.type) {
    case "single-select":
      return response !== null;
    case "multi-select":
      return Array.isArray(response) && (response as number[]).length > 0;
    case "fill-in":
      return typeof response === "string" && response.trim().length > 0;
    case "matching":
      return (
        Array.isArray(response) && (response as (number | null)[]).every((v) => v !== null)
      );
    case "sequencing":
      return Array.isArray(response);
  }
}

export default function CourseTest({
  questions,
  storageKey,
}: {
  questions: FinalTestQuestion[];
  storageKey: string;
}) {
  const [responses, setResponses] = useState<Record<string, AnyResponse>>(() =>
    initialResponses(questions)
  );
  const [submitted, setSubmitted] = useState(false);

  const { score, total, percent, passed } = scoreFinalTest(questions, responses);
  const threshold = passingScore(total);

  function setResponse(id: string, value: AnyResponse) {
    setResponses((r) => ({ ...r, [id]: value }));
  }

  function submit() {
    setSubmitted(true);
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ score, total, percent, passed, at: Date.now() })
      );
    } catch {}
  }

  function retake() {
    setResponses(initialResponses(questions));
    setSubmitted(false);
  }

  const allAnswered = questions.every((q) => isAnswered(q, responses[q.id]));

  return (
    <div className="space-y-8">
      {submitted && (
        <div
          className={`border-2 p-6 ${
            passed ? "border-gold bg-gold/10" : "border-crimson bg-crimson/5"
          }`}
        >
          <p className="eyebrow mb-2">Final test score</p>
          <p className="display text-3xl">
            <span className={passed ? "text-gold" : "text-crimson"}>
              {score} / {total} / {percent}%
            </span>
            <span className="ml-2 text-lg text-stone">{passed ? "PASS" : "NOT PASSED"}</span>
          </p>
          <p className="mt-2 text-sm text-stone">
            {passed
              ? `You cleared the 90% pass mark (${threshold} of ${total}) for this course's final test.`
              : `90% (${threshold} of ${total}) is required to pass. Review the submitted and correct answers below, then retake the test.`}
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
        <fieldset key={question.id} className="border-2 border-ink/15 p-5">
          <legend className="display text-xl">
            <span className="text-crimson">{qi + 1}.</span> {question.prompt}
          </legend>

          {question.code && (
            <pre className="mt-3 overflow-x-auto border border-ink/15 bg-ink/5 p-4 text-xs">
              <code>{question.code}</code>
            </pre>
          )}

          <div className="mt-4">
            <QuestionBody
              question={question}
              response={responses[question.id]}
              submitted={submitted}
              onChange={(v) => setResponse(question.id, v)}
            />
          </div>

          {submitted && (
            <div className="mt-4 space-y-2 border-l-2 border-gold pl-4 text-sm">
              <p className={isCorrect(question, responses[question.id]) ? "text-stone" : "font-semibold text-crimson"}>
                {isCorrect(question, responses[question.id]) ? "Correct" : "Missed"}
              </p>
              <p className="text-stone">{question.explain}</p>
              {question.type === "single-select" && question.distractorExplain && (
                <p className="text-stone">{question.distractorExplain}</p>
              )}
            </div>
          )}
        </fieldset>
      ))}

      {!submitted && (
        <button
          type="button"
          onClick={submit}
          disabled={!allAnswered}
          className="rounded-[2px] bg-crimson px-6 py-3 text-sm font-semibold text-parchment enabled:hover:bg-crimson-deep disabled:opacity-40"
        >
          Grade my test
        </button>
      )}
    </div>
  );
}

function QuestionBody({
  question,
  response,
  submitted,
  onChange,
}: {
  question: FinalTestQuestion;
  response: AnyResponse;
  submitted: boolean;
  onChange: (v: AnyResponse) => void;
}) {
  switch (question.type) {
    case "single-select": {
      const picked = response as number | null;
      return (
        <div className="space-y-2">
          {question.options.map((opt, oi) => {
            const chosen = picked === oi;
            const correct = submitted && oi === question.correctIndex;
            const wrong = submitted && chosen && oi !== question.correctIndex;
            return (
              <label
                key={oi}
                className={optionClass({ chosen, correct, wrong })}
              >
                <input
                  type="radio"
                  name={question.id}
                  className="accent-crimson"
                  disabled={submitted}
                  checked={chosen}
                  onChange={() => onChange(oi)}
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
      );
    }

    case "multi-select": {
      const picked = (response as number[] | null) ?? [];
      return (
        <div className="space-y-2">
          {question.options.map((opt, oi) => {
            const chosen = picked.includes(oi);
            const shouldBeChosen = question.correctIndices.includes(oi);
            const correct = submitted && shouldBeChosen;
            const wrong = submitted && chosen && !shouldBeChosen;
            return (
              <label
                key={oi}
                className={optionClass({ chosen, correct, wrong })}
              >
                <input
                  type="checkbox"
                  className="accent-crimson"
                  disabled={submitted}
                  checked={chosen}
                  onChange={() =>
                    onChange(
                      chosen ? picked.filter((v) => v !== oi) : [...picked, oi]
                    )
                  }
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
      );
    }

    case "fill-in": {
      const value = (response as string | null) ?? "";
      return (
        <div>
          <input
            type="text"
            value={value}
            disabled={submitted}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Type your answer"
            className="w-full border border-ink/20 bg-white/60 p-3 text-sm text-ink placeholder:text-stone/60 focus:border-crimson focus:outline-none disabled:opacity-70"
          />
          {submitted && (
            <p className="mt-2 text-xs uppercase tracking-[0.18em] text-stone">
              Accepted: {question.acceptedAnswers.join(" / ")}
            </p>
          )}
        </div>
      );
    }

    case "matching": {
      const picked = (response as (number | null)[] | null) ?? question.left.map(() => null);
      return (
        <div className="space-y-3">
          {question.left.map((item, li) => {
            const chosenRight = picked[li];
            const correctRight = question.correctMap[li];
            const rowCorrect = submitted && chosenRight === correctRight;
            const rowWrong = submitted && chosenRight !== correctRight;
            return (
              <div
                key={li}
                className={`flex flex-wrap items-center gap-3 border p-3 text-sm ${
                  submitted
                    ? rowCorrect
                      ? "border-gold bg-gold/10"
                      : "border-crimson bg-crimson/5"
                    : "border-ink/15"
                }`}
              >
                <span className="min-w-[10rem] font-medium">{item}</span>
                <select
                  value={chosenRight ?? ""}
                  disabled={submitted}
                  onChange={(e) => {
                    const next = [...picked];
                    next[li] = e.target.value === "" ? null : Number(e.target.value);
                    onChange(next);
                  }}
                  className="border border-ink/20 bg-white/60 p-2 text-sm disabled:opacity-70"
                >
                  <option value="">Select a match…</option>
                  {question.right.map((opt, ri) => (
                    <option key={ri} value={ri}>
                      {opt}
                    </option>
                  ))}
                </select>
                {submitted && rowWrong && (
                  <span className="text-xs text-crimson">
                    Correct: {question.right[correctRight]}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      );
    }

    case "sequencing": {
      const order = (response as string[] | null) ?? [...question.items].reverse();
      function move(i: number, dir: -1 | 1) {
        const j = i + dir;
        if (j < 0 || j >= order.length) return;
        const next = [...order];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
      }
      return (
        <ol className="space-y-2">
          {order.map((item, i) => {
            const correctHere = submitted && question.items[i] === item;
            return (
              <li
                key={item}
                className={`flex items-center gap-3 border p-3 text-sm ${
                  submitted
                    ? correctHere
                      ? "border-gold bg-gold/10"
                      : "border-crimson bg-crimson/5"
                    : "border-ink/15"
                }`}
              >
                <span className="text-crimson">{i + 1}.</span>
                <span className="flex-1">{item}</span>
                {!submitted && (
                  <span className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => move(i, -1)}
                      disabled={i === 0}
                      className="rounded-[2px] border border-ink/20 px-2 py-1 text-xs disabled:opacity-30"
                      aria-label="Move up"
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => move(i, 1)}
                      disabled={i === order.length - 1}
                      className="rounded-[2px] border border-ink/20 px-2 py-1 text-xs disabled:opacity-30"
                      aria-label="Move down"
                    >
                      ↓
                    </button>
                  </span>
                )}
              </li>
            );
          })}
          {submitted && (
            <li className="mt-2 text-xs uppercase tracking-[0.18em] text-stone">
              Correct order: {question.items.join(" → ")}
            </li>
          )}
        </ol>
      );
    }
  }
}

function optionClass({
  chosen,
  correct,
  wrong,
}: {
  chosen: boolean;
  correct: boolean;
  wrong: boolean;
}) {
  const base = "flex cursor-pointer items-baseline gap-3 border p-3 text-sm transition-colors";
  if (correct) return `${base} border-gold bg-gold/10`;
  if (wrong) return `${base} border-crimson bg-crimson/5`;
  if (chosen) return `${base} border-ink/50`;
  return `${base} border-ink/15 hover:border-ink/40`;
}
