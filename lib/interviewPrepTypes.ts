// Pure types + sizing rules for the Career Interview Prep Center — no fs/path,
// so this is safe to import from client-side components. Content itself lives
// as static JSON per career path (content/interview-prep/<path-slug>/<difficulty>.json),
// loaded server-side by lib/interviewPrep.ts, mirroring the Final Test system's
// split between finalTestTypes.ts (pure) and finalTest.ts (fs-based).
//
// No AI grading, no code execution — students self-assess against a revealed
// model answer, same deliberate scoping as Guided Practice.

export type InterviewDifficulty = "beginner" | "intermediate" | "advanced" | "expert";

export type InterviewCategory =
  | "technical-knowledge"
  | "hands-on"
  | "troubleshooting"
  | "architecture"
  | "behavioral";

export type InterviewResponseFormat = "text" | "sql" | "code";

export type InterviewQuestionStatus = "draft" | "published" | "archived";

export type InterviewQuestion = {
  id: string; // e.g. "msbi-adv-014" — unique within the path
  questionCode: string; // human-readable reference, e.g. "LTV-MSBI-0014"
  title: string; // short title
  prompt: string; // the full interview question
  category: InterviewCategory;
  difficulty: InterviewDifficulty;
  responseFormat: InterviewResponseFormat;
  skills: string[]; // technical skill tags, e.g. ["T-SQL", "Performance Tuning"]
  code?: string; // optional fenced code/query shown with the prompt

  // Revealed only after the student submits an attempt.
  modelAnswer: string; // recommended, technically correct interview response
  professionalAnswer: string; // how an experienced candidate would explain it aloud
  example?: string; // a worked code example or real-world scenario, where it strengthens the answer
  commonMistakes: string[]; // misunderstandings/details candidates often miss
  keyPoints: string[]; // concepts a strong answer should cover (self-assessment checklist)
  evaluationCriteria: { criterion: string; weight: number }[]; // weighted self-assessment rubric, weights sum to 100

  estimatedMinutes: number;
  lessonLink?: { courseSlug: string; lessonSlug: string; label: string }; // "review this lesson"

  status: InterviewQuestionStatus;
  version: number;
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
};

export type InterviewBank = {
  questions: InterviewQuestion[];
};

// ---------------------------------------------------------------------------
// Sizing (per-path total = 175: 30 beginner / 40 intermediate / 50 advanced / 55 expert)
// ---------------------------------------------------------------------------

export const DIFFICULTY_QUOTA: Record<InterviewDifficulty, number> = {
  beginner: 30,
  intermediate: 40,
  advanced: 50,
  expert: 55,
};

export const PATH_TOTAL_QUESTIONS = Object.values(DIFFICULTY_QUOTA).reduce((a, b) => a + b, 0); // 175

export const DIFFICULTY_LABELS: Record<InterviewDifficulty, string> = {
  beginner: "Beginner — Entry level",
  intermediate: "Intermediate — 2–5 years",
  advanced: "Advanced — Senior",
  expert: "Expert — Lead / Architect",
};

export const CATEGORY_LABELS: Record<InterviewCategory, string> = {
  "technical-knowledge": "Technical knowledge",
  "hands-on": "Hands-on coding / configuration",
  troubleshooting: "Troubleshooting and scenarios",
  architecture: "Architecture and design",
  behavioral: "Behavioral and communication",
};

// ---------------------------------------------------------------------------
// Session / self-assessment (client-side, localStorage-backed)
// ---------------------------------------------------------------------------

export type ReviewDecision = "got-it" | "needs-review" | null;

export type InterviewResponse = {
  questionId: string;
  answerText: string;
  revealed: boolean;
  decision: ReviewDecision;
  savedForLater: boolean;
};

export type InterviewSessionConfig = {
  pathSlug: string;
  skillFilter: string | null; // null = all skills
  difficulty: InterviewDifficulty | "all";
  length: number; // requested question count
  category: InterviewCategory | "mixed";
};

export type InterviewSession = {
  id: string;
  pathSlug: string;
  config: InterviewSessionConfig;
  questionIds: string[]; // the actual question order selected for this attempt
  responses: Record<string, InterviewResponse>;
  startedAt: string;
  completedAt?: string;
};

// ---------------------------------------------------------------------------
// Question-availability / selection rules (spec section 5)
// ---------------------------------------------------------------------------

export type AvailabilityResult = {
  requested: number;
  available: number; // exact-match count (path + skill + difficulty)
  sufficient: boolean;
};

export function checkAvailability(
  pool: InterviewQuestion[],
  skillFilter: string | null,
  difficulty: InterviewDifficulty | "all",
  requested: number
): AvailabilityResult {
  const matches = pool.filter((q) => {
    if (q.status !== "published") return false;
    if (difficulty !== "all" && q.difficulty !== difficulty) return false;
    if (skillFilter && !q.skills.includes(skillFilter)) return false;
    return true;
  });
  return { requested, available: matches.length, sufficient: matches.length >= requested };
}

// Deterministic, seedable shuffle (no external random dependency) so a
// session's question order is reproducible for debugging but still varies
// attempt to attempt via the seed.
export function shuffledSelection<T>(items: T[], count: number, seed: number): T[] {
  const arr = [...items];
  let s = seed;
  const rand = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, count);
}
