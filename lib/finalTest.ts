import fs from "fs";
import path from "path";
import { CourseMeta, lessonCount, Quiz } from "./courses";
import {
  FinalTest,
  FinalTestQuestion,
  SingleSelectQuestion,
  targetTestSize,
  traditionalMcqQuota,
} from "./finalTestTypes";

export * from "./finalTestTypes";

// ---------------------------------------------------------------------------
// Loading a course's authored Final Test bank (server-only: reads content/)
// ---------------------------------------------------------------------------
// A course's Final Test bank lives at content/<contentBase>/final-test.json
// in the new schema (see finalTestTypes.ts). Courses that haven't been
// migrated yet fall back to the legacy content/<contentBase>/course-test.json
// (old Quiz shape, {q, options[4], answer, explain}) normalized into
// single-select "traditional" questions, so nothing already shipped breaks.

type FinalTestBank = { questions: FinalTestQuestion[] };

function normalizeLegacyQuiz(quiz: Quiz, idPrefix: string): SingleSelectQuestion[] {
  return quiz.questions.map((q, i) => ({
    id: `${idPrefix}:${i}`,
    type: "single-select" as const,
    prompt: q.q,
    options: q.options,
    correctIndex: q.answer,
    explain: q.explain,
    traditional: true,
  }));
}

function loadFinalTestBank(course: CourseMeta): FinalTestQuestion[] {
  const contentBase = course.contentBase ?? course.slug;
  const newPath = path.join(process.cwd(), "content", contentBase, "final-test.json");
  if (fs.existsSync(newPath)) {
    try {
      const bank: FinalTestBank = JSON.parse(fs.readFileSync(newPath, "utf8"));
      if (Array.isArray(bank.questions)) return bank.questions;
    } catch {
      // fall through to legacy
    }
  }
  const legacyPath = path.join(process.cwd(), "content", contentBase, "course-test.json");
  if (fs.existsSync(legacyPath)) {
    try {
      const quiz: Quiz = JSON.parse(fs.readFileSync(legacyPath, "utf8"));
      return normalizeLegacyQuiz(quiz, "legacy-test");
    } catch {
      return [];
    }
  }
  return [];
}

// ---------------------------------------------------------------------------
// Selection (spec sections 17, 18, 20: coverage, difficulty mix, randomization)
// ---------------------------------------------------------------------------

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Spreads selection across chapters round-robin so later chapters aren't
// starved when the pool is larger than the target size, then randomizes
// final order. When the pool is smaller than the target, everything
// eligible is used (shortfall is reported, never backfilled with filler).
function selectCoveringChapters(
  pool: FinalTestQuestion[],
  count: number
): FinalTestQuestion[] {
  if (pool.length <= count) return shuffle(pool);

  const byChapter = new Map<string, FinalTestQuestion[]>();
  for (const q of pool) {
    const key = q.chapter ?? "__none__";
    const arr = byChapter.get(key) ?? [];
    arr.push(q);
    byChapter.set(key, arr);
  }
  const chapterQueues = Array.from(byChapter.values()).map((arr) => shuffle(arr));

  const picked: FinalTestQuestion[] = [];
  let ci = 0;
  while (picked.length < count && chapterQueues.some((q) => q.length > 0)) {
    const queue = chapterQueues[ci % chapterQueues.length];
    if (queue.length > 0) picked.push(queue.shift()!);
    ci++;
  }
  return shuffle(picked);
}

export function buildFinalTest(course: CourseMeta): FinalTest {
  const lessons = lessonCount(course);
  const targetSize = targetTestSize(lessons);
  const mcqQuota = traditionalMcqQuota(targetSize);

  const pool = loadFinalTestBank(course);
  const traditional = pool.filter(
    (q): q is SingleSelectQuestion => q.type === "single-select" && q.traditional
  );
  const applied = pool.filter((q) => !(q.type === "single-select" && q.traditional));

  const pickedMcq = selectCoveringChapters(traditional, mcqQuota);
  const appliedTarget = targetSize - pickedMcq.length;
  const pickedApplied = selectCoveringChapters(applied, appliedTarget);

  const questions = shuffle([...pickedMcq, ...pickedApplied]);
  const shortfall = targetSize - questions.length;

  return { questions, targetSize, shortfall };
}
