// The full Prompt & Context Engineering course outline. Only lessons with
// a contentDir + videoUrl are playable; everything else renders as "in
// production". Assumes Generative AI & LLMs — this course treats prompt
// design and context management as an engineering discipline with its own
// testing and evaluation practice, not guesswork.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/prompt-context-engineering/
  videoUrl?: string;
  durationLabel?: string;
};

export type ChapterMeta = { n: number; title: string; lessons: LessonMeta[] };

const L = (n: number, slug: string, title: string, extra?: Partial<LessonMeta>): LessonMeta => ({
  n,
  slug,
  title,
  ...extra,
});

export const PROMPT_CONTEXT_ENGINEERING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Prompt Engineering Fundamentals",
    lessons: [
      L(1, "what-makes-a-good-prompt", "What Makes a Good Prompt", { contentDir: "ch01/01-what-makes-a-good-prompt" }),
      L(2, "zero-shot-vs-few-shot", "Zero-Shot vs. Few-Shot Prompting", { contentDir: "ch01/02-zero-shot-vs-few-shot" }),
      L(3, "system-prompts-done-well", "System Prompts, Done Well", { contentDir: "ch01/03-system-prompts-done-well" }),
      L(4, "prompt-templates", "Prompt Templates", { contentDir: "ch01/04-prompt-templates" }),
      L(5, "common-prompt-failure-modes", "Common Prompt Failure Modes", { contentDir: "ch01/05-common-prompt-failure-modes" }),
      L(6, "iterating-on-prompts-systematically", "Iterating on Prompts Systematically", { contentDir: "ch01/06-iterating-on-prompts-systematically" }),
    ],
  },
  {
    n: 2,
    title: "Advanced Prompting Techniques",
    lessons: [
      L(7, "chain-of-thought-prompting", "Chain-of-Thought Prompting", { contentDir: "ch02/07-chain-of-thought-prompting" }),
      L(8, "self-consistency-and-multiple-sampling", "Self-Consistency & Multiple Sampling", { contentDir: "ch02/08-self-consistency-and-multiple-sampling" }),
      L(9, "role-based-prompting", "Role-Based Prompting", { contentDir: "ch02/09-role-based-prompting" }),
      L(10, "constrained-structured-output-prompting", "Constrained & Structured Output Prompting", { contentDir: "ch02/10-constrained-structured-output-prompting" }),
      L(11, "prompt-chaining", "Prompt Chaining", { contentDir: "ch02/11-prompt-chaining" }),
    ],
  },
  {
    n: 3,
    title: "Context Engineering",
    lessons: [
      L(12, "prompt-vs-context-engineering", "Prompt Engineering vs. Context Engineering"),
      L(13, "managing-context-window-budgets", "Managing Context Window Budgets"),
      L(14, "context-compression-techniques", "Context Compression Techniques"),
      L(15, "context-ordering-and-prioritization", "Context Ordering & Prioritization"),
      L(16, "tool-descriptions-as-context", "Tool Descriptions as Context"),
      L(17, "memory-strategies", "Memory Strategies: Short-Term vs. Long-Term"),
    ],
  },
  {
    n: 4,
    title: "Evaluating Prompts",
    lessons: [
      L(18, "building-a-prompt-eval-set", "Building a Prompt Eval Set"),
      L(19, "automated-prompt-testing", "Automated Prompt Testing"),
      L(20, "a-b-testing-prompts", "A/B Testing Prompts"),
      L(21, "regression-testing-prompts", "Regression Testing Prompts"),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(22, "capstone-kickoff", "Capstone Kickoff"),
      L(23, "capstone-building-a-prompt-library", "Capstone: Building a Prompt Library for a Real Use Case"),
      L(24, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
