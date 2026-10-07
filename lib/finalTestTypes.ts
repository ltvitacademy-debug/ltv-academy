// Pure types + deterministic scoring for the Final Test system — no fs/path,
// so this is safe to import from the client-side CourseTest component.
// File I/O and the question-selection algorithm live in lib/finalTest.ts
// (server-only, imports this file).

export type QuestionDifficulty = "foundational" | "intermediate" | "advanced";

type BaseQuestion = {
  id: string;
  prompt: string;
  explain: string;
  chapter?: string;
  difficulty?: QuestionDifficulty;
  code?: string; // optional fenced code block shown with the prompt
};

export type SingleSelectQuestion = BaseQuestion & {
  type: "single-select";
  options: string[];
  correctIndex: number;
  // True only for a traditional "recognize the definition" MCQ counted
  // toward the ~8% quota. An applied single-select (choose the correct
  // SQL, predict the output, pick the best fix) is NOT traditional even
  // though it also presents options to click.
  traditional: boolean;
  // Required on every traditional MCQ per the spec's Rule 11: explains why
  // the closest wrong option is wrong, distinct from the general `explain`.
  distractorExplain?: string;
};

export type MultiSelectQuestion = BaseQuestion & {
  type: "multi-select";
  options: string[];
  correctIndices: number[];
};

export type FillInQuestion = BaseQuestion & {
  type: "fill-in";
  acceptedAnswers: string[]; // compared case/whitespace-insensitively
};

export type MatchingQuestion = BaseQuestion & {
  type: "matching";
  left: string[];
  right: string[];
  // correctMap[i] is the index into `right` that matches left[i].
  correctMap: number[];
};

export type SequencingQuestion = BaseQuestion & {
  type: "sequencing";
  // Stored in the correct order; the UI shuffles for display and compares
  // the student's arrangement back against this array.
  items: string[];
};

export type FinalTestQuestion =
  | SingleSelectQuestion
  | MultiSelectQuestion
  | FillInQuestion
  | MatchingQuestion
  | SequencingQuestion;

export type FinalTest = {
  questions: FinalTestQuestion[];
  targetSize: number; // what the sizing rule asked for
  shortfall: number; // targetSize - questions.length; 0 means fully met
};

// ---------------------------------------------------------------------------
// Sizing (spec section 1)
// ---------------------------------------------------------------------------

export function targetTestSize(lessons: number): number {
  if (lessons <= 20) return 20;
  if (lessons <= 40) return 30;
  if (lessons <= 60) return 40;
  if (lessons <= 80) return 50;
  if (lessons <= 100) return 60;
  return 70;
}

// Spec section 2's explicit table (not a flat 8% of every size, the spec
// gives exact counts per tier).
const MCQ_QUOTA: Record<number, number> = { 20: 2, 30: 2, 40: 3, 50: 4, 60: 5, 70: 6 };

export function traditionalMcqQuota(targetSize: number): number {
  return MCQ_QUOTA[targetSize] ?? Math.round(targetSize * 0.08);
}

export function passingScore(total: number): number {
  return Math.ceil(total * 0.9);
}

// ---------------------------------------------------------------------------
// Scoring (spec section 13: deterministic, no AI, no execution)
// ---------------------------------------------------------------------------

// A student's response shape per question type — intentionally mirrors each
// question type's own data shape so grading is a direct structural compare.
export type ResponseFor<Q extends FinalTestQuestion> = Q extends SingleSelectQuestion
  ? number | null
  : Q extends MultiSelectQuestion
    ? number[]
    : Q extends FillInQuestion
      ? string
      : Q extends MatchingQuestion
        ? (number | null)[] // response[i] = chosen right-index for left[i]
        : Q extends SequencingQuestion
          ? string[] // student's proposed order of the same items
          : never;

export type AnyResponse = number | null | number[] | string | (number | null)[] | string[];

function normalizeFillIn(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

export function isCorrect(question: FinalTestQuestion, response: AnyResponse): boolean {
  switch (question.type) {
    case "single-select":
      return response === question.correctIndex;
    case "multi-select": {
      const r = (response as number[] | undefined) ?? [];
      const correct = [...question.correctIndices].sort();
      const given = [...r].sort();
      return (
        correct.length === given.length && correct.every((v, i) => v === given[i])
      );
    }
    case "fill-in": {
      const r = normalizeFillIn((response as string | undefined) ?? "");
      return question.acceptedAnswers.some((a) => normalizeFillIn(a) === r);
    }
    case "matching": {
      const r = (response as (number | null)[] | undefined) ?? [];
      return (
        question.correctMap.length === r.length &&
        question.correctMap.every((v, i) => v === r[i])
      );
    }
    case "sequencing": {
      const r = (response as string[] | undefined) ?? [];
      return (
        question.items.length === r.length && question.items.every((v, i) => v === r[i])
      );
    }
  }
}

export function scoreFinalTest(
  questions: FinalTestQuestion[],
  responses: Record<string, AnyResponse>
): { score: number; total: number; percent: number; passed: boolean } {
  const total = questions.length;
  const score = questions.filter((q) => isCorrect(q, responses[q.id] ?? null)).length;
  const percent = total === 0 ? 0 : Math.round((score / total) * 100);
  const passed = score >= passingScore(total);
  return { score, total, percent, passed };
}
