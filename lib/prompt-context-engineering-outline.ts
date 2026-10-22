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
      L(1, "what-makes-a-good-prompt", "What Makes a Good Prompt", { contentDir: "ch01/01-what-makes-a-good-prompt", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611719/ltv-prompt-context-engineering/what-makes-a-good-prompt.mp4", durationLabel: "1 min 46 s" }),
      L(2, "zero-shot-vs-few-shot", "Zero-Shot vs. Few-Shot Prompting", { contentDir: "ch01/02-zero-shot-vs-few-shot", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612288/ltv-prompt-context-engineering/zero-shot-vs-few-shot.mp4", durationLabel: "1 min 40 s" }),
      L(3, "system-prompts-done-well", "System Prompts, Done Well", { contentDir: "ch01/03-system-prompts-done-well", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612864/ltv-prompt-context-engineering/system-prompts-done-well.mp4", durationLabel: "1 min 40 s" }),
      L(4, "prompt-templates", "Prompt Templates", { contentDir: "ch01/04-prompt-templates", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613309/ltv-prompt-context-engineering/prompt-templates.mp4", durationLabel: "1 min 36 s" }),
      L(5, "common-prompt-failure-modes", "Common Prompt Failure Modes", { contentDir: "ch01/05-common-prompt-failure-modes", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613740/ltv-prompt-context-engineering/common-prompt-failure-modes.mp4", durationLabel: "1 min 37 s" }),
      L(6, "iterating-on-prompts-systematically", "Iterating on Prompts Systematically", { contentDir: "ch01/06-iterating-on-prompts-systematically", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614074/ltv-prompt-context-engineering/iterating-on-prompts-systematically.mp4", durationLabel: "1 min 42 s" }),
    ],
  },
  {
    n: 2,
    title: "Advanced Prompting Techniques",
    lessons: [
      L(7, "chain-of-thought-prompting", "Chain-of-Thought Prompting", { contentDir: "ch02/07-chain-of-thought-prompting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614447/ltv-prompt-context-engineering/chain-of-thought-prompting.mp4", durationLabel: "1 min 36 s" }),
      L(8, "self-consistency-and-multiple-sampling", "Self-Consistency & Multiple Sampling", { contentDir: "ch02/08-self-consistency-and-multiple-sampling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614787/ltv-prompt-context-engineering/self-consistency-and-multiple-sampling.mp4", durationLabel: "1 min 42 s" }),
      L(9, "role-based-prompting", "Role-Based Prompting", { contentDir: "ch02/09-role-based-prompting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615100/ltv-prompt-context-engineering/role-based-prompting.mp4", durationLabel: "1 min 47 s" }),
      L(10, "constrained-structured-output-prompting", "Constrained & Structured Output Prompting", { contentDir: "ch02/10-constrained-structured-output-prompting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615324/ltv-prompt-context-engineering/constrained-structured-output-prompting.mp4", durationLabel: "1 min 34 s" }),
      L(11, "prompt-chaining", "Prompt Chaining", { contentDir: "ch02/11-prompt-chaining", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615538/ltv-prompt-context-engineering/prompt-chaining.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
  {
    n: 3,
    title: "Context Engineering",
    lessons: [
      L(12, "prompt-vs-context-engineering", "Prompt Engineering vs. Context Engineering", { contentDir: "ch03/12-prompt-vs-context-engineering", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629137/ltv-prompt-context-engineering/prompt-vs-context-engineering.mp4", durationLabel: "1 min 26 s" }),
      L(13, "managing-context-window-budgets", "Managing Context Window Budgets", { contentDir: "ch03/13-managing-context-window-budgets", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629236/ltv-prompt-context-engineering/managing-context-window-budgets.mp4", durationLabel: "1 min 47 s" }),
      L(14, "context-compression-techniques", "Context Compression Techniques", { contentDir: "ch03/14-context-compression-techniques", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629332/ltv-prompt-context-engineering/context-compression-techniques.mp4", durationLabel: "1 min 48 s" }),
      L(15, "context-ordering-and-prioritization", "Context Ordering & Prioritization", { contentDir: "ch03/15-context-ordering-and-prioritization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629427/ltv-prompt-context-engineering/context-ordering-and-prioritization.mp4", durationLabel: "1 min 42 s" }),
      L(16, "tool-descriptions-as-context", "Tool Descriptions as Context", { contentDir: "ch03/16-tool-descriptions-as-context", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629529/ltv-prompt-context-engineering/tool-descriptions-as-context.mp4", durationLabel: "1 min 55 s" }),
      L(17, "memory-strategies", "Memory Strategies: Short-Term vs. Long-Term", { contentDir: "ch03/17-memory-strategies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629629/ltv-prompt-context-engineering/memory-strategies.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
  {
    n: 4,
    title: "Evaluating Prompts",
    lessons: [
      L(18, "building-a-prompt-eval-set", "Building a Prompt Eval Set", { contentDir: "ch04/18-building-a-prompt-eval-set", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629722/ltv-prompt-context-engineering/building-a-prompt-eval-set.mp4", durationLabel: "1 min 38 s" }),
      L(19, "automated-prompt-testing", "Automated Prompt Testing", { contentDir: "ch04/19-automated-prompt-testing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629818/ltv-prompt-context-engineering/automated-prompt-testing.mp4", durationLabel: "1 min 45 s" }),
      L(20, "a-b-testing-prompts", "A/B Testing Prompts", { contentDir: "ch04/20-a-b-testing-prompts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792629909/ltv-prompt-context-engineering/a-b-testing-prompts.mp4", durationLabel: "1 min 42 s" }),
      L(21, "regression-testing-prompts", "Regression Testing Prompts", { contentDir: "ch04/21-regression-testing-prompts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630004/ltv-prompt-context-engineering/regression-testing-prompts.mp4", durationLabel: "1 min 43 s" }),
    ],
  },
  {
    n: 5,
    title: "Capstone",
    lessons: [
      L(22, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch05/22-capstone-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630115/ltv-prompt-context-engineering/capstone-kickoff.mp4", durationLabel: "1 min 58 s" }),
      L(23, "capstone-building-a-prompt-library", "Capstone: Building a Prompt Library for a Real Use Case", { contentDir: "ch05/23-capstone-building-a-prompt-library", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630218/ltv-prompt-context-engineering/capstone-building-a-prompt-library.mp4", durationLabel: "1 min 54 s" }),
      L(24, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch05/24-capstone-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792630329/ltv-prompt-context-engineering/capstone-wrap-up.mp4", durationLabel: "2 min 4 s" }),
    ],
  },
];
