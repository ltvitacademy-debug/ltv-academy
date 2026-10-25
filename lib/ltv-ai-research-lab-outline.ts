// The LTV AI Research Lab course outline — FRAMEWORK ONLY (chapter and lesson titles,
// no lesson content yet). Lessons without a contentDir render as "in production". The
// taught capstone of the AI/ML Research Engineer & Alignment Engineer destination.
// Assumes AI Research Engineering. Three research projects deliberately built around
// SQL and data systems — this catalog's own strength — rather than generic Atari or
// text-only RL tasks: RL for query optimization, reward modeling for data quality, and
// RLHF for a database assistant, plus an interpretability case study on the student's
// own trained model.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ltv-ai-research-lab/
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

export const LTV_AI_RESEARCH_LAB_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Research Lab Kickoff",
    lessons: [
      L(1, "how-this-research-lab-works", "How This Research Lab Works", { contentDir: "ch01/01-how-this-research-lab-works", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506510/ltv-ai-research-lab/how-this-research-lab-works.mp4", durationLabel: "2 min 2 s" }),
      L(2, "picking-a-research-question", "Picking a Research Question", { contentDir: "ch01/02-picking-a-research-question", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507358/ltv-ai-research-lab/picking-a-research-question.mp4", durationLabel: "1 min 50 s" }),
      L(3, "scoping-a-research-project-under-a-deadline", "Scoping a Research Project Under a Deadline", { contentDir: "ch01/03-scoping-a-research-project-under-a-deadline", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508083/ltv-ai-research-lab/scoping-a-research-project-under-a-deadline.mp4", durationLabel: "1 min 49 s" }),
    ],
  },
  {
    n: 2,
    title: "Project 1 — RL for SQL Query Optimization",
    lessons: [
      L(4, "framing-query-plan-selection-as-an-rl-problem", "Framing Query Plan Selection as an RL Problem", { contentDir: "ch02/04-framing-query-plan-selection-as-an-rl-problem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508854/ltv-ai-research-lab/framing-query-plan-selection-as-an-rl-problem.mp4", durationLabel: "1 min 49 s" }),
      L(5, "building-a-custom-query-optimization-environment", "Building a Custom Query-Optimization Environment", { contentDir: "ch02/05-building-a-custom-query-optimization-environment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509542/ltv-ai-research-lab/building-a-custom-query-optimization-environment.mp4", durationLabel: "1 min 40 s" }),
      L(6, "designing-a-reward-from-execution-cost", "Designing a Reward From Execution Cost", { contentDir: "ch02/06-designing-a-reward-from-execution-cost", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510288/ltv-ai-research-lab/designing-a-reward-from-execution-cost.mp4", durationLabel: "1 min 48 s" }),
      L(7, "training-an-agent-to-choose-execution-plans", "Training an Agent to Choose Execution Plans", { contentDir: "ch02/07-training-an-agent-to-choose-execution-plans", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511233/ltv-ai-research-lab/training-an-agent-to-choose-execution-plans.mp4", durationLabel: "2 min 20 s" }),
      L(8, "evaluating-against-the-query-optimizers-own-choices", "Evaluating Against the Query Optimizer's Own Choices", { contentDir: "ch02/08-evaluating-against-the-query-optimizers-own-choices", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512507/ltv-ai-research-lab/evaluating-against-the-query-optimizers-own-choices.mp4", durationLabel: "1 min 42 s" }),
      L(9, "project-1-writeup", "Project 1 Write-Up", { contentDir: "ch02/09-project-1-writeup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513194/ltv-ai-research-lab/project-1-writeup.mp4", durationLabel: "1 min 44 s" }),
    ],
  },
  {
    n: 3,
    title: "Project 2 — Reward Modeling for Data Quality",
    lessons: [
      L(10, "framing-data-quality-as-a-preference-problem", "Framing Data Quality as a Preference Problem", { contentDir: "ch03/10-framing-data-quality-as-a-preference-problem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513962/ltv-ai-research-lab/framing-data-quality-as-a-preference-problem.mp4", durationLabel: "1 min 49 s" }),
      L(11, "building-a-small-preference-dataset", "Building a Small Preference Dataset", { contentDir: "ch03/11-building-a-small-preference-dataset", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514677/ltv-ai-research-lab/building-a-small-preference-dataset.mp4", durationLabel: "1 min 40 s" }),
      L(12, "training-a-data-quality-reward-model", "Training a Data-Quality Reward Model", { contentDir: "ch03/12-training-a-data-quality-reward-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515517/ltv-ai-research-lab/training-a-data-quality-reward-model.mp4", durationLabel: "1 min 47 s" }),
      L(13, "evaluating-the-reward-model-against-held-out-cases", "Evaluating the Reward Model Against Held-Out Cases", { contentDir: "ch03/13-evaluating-the-reward-model-against-held-out-cases", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516388/ltv-ai-research-lab/evaluating-the-reward-model-against-held-out-cases.mp4", durationLabel: "1 min 57 s" }),
      L(14, "project-2-writeup", "Project 2 Write-Up", { contentDir: "ch03/14-project-2-writeup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517169/ltv-ai-research-lab/project-2-writeup.mp4", durationLabel: "1 min 44 s" }),
    ],
  },
  {
    n: 4,
    title: "Project 3 — RLHF for a Database Assistant",
    lessons: [
      L(15, "picking-a-small-open-weight-base-model", "Picking a Small Open-Weight Base Model", { contentDir: "ch04/15-picking-a-small-open-weight-base-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518204/ltv-ai-research-lab/picking-a-small-open-weight-base-model.mp4", durationLabel: "2 min 30 s" }),
      L(16, "sft-on-natural-language-to-sql", "SFT on Natural-Language-to-SQL", { contentDir: "ch04/16-sft-on-natural-language-to-sql", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519260/ltv-ai-research-lab/sft-on-natural-language-to-sql.mp4", durationLabel: "2 min 19 s" }),
      L(17, "building-a-reward-signal-from-execution-correctness", "Building a Reward Signal From Execution Correctness", { contentDir: "ch04/17-building-a-reward-signal-from-execution-correctness", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520253/ltv-ai-research-lab/building-a-reward-signal-from-execution-correctness.mp4", durationLabel: "2 min 6 s" }),
      L(18, "running-rlhf-on-the-database-assistant", "Running RLHF on the Database Assistant", { contentDir: "ch04/18-running-rlhf-on-the-database-assistant", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521239/ltv-ai-research-lab/running-rlhf-on-the-database-assistant.mp4", durationLabel: "2 min 8 s" }),
      L(19, "evaluating-query-correctness-before-and-after", "Evaluating Query Correctness, Before & After", { contentDir: "ch04/19-evaluating-query-correctness-before-and-after", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522224/ltv-ai-research-lab/evaluating-query-correctness-before-and-after.mp4", durationLabel: "2 min 7 s" }),
      L(20, "project-3-writeup", "Project 3 Write-Up", { contentDir: "ch04/20-project-3-writeup", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523088/ltv-ai-research-lab/project-3-writeup.mp4", durationLabel: "1 min 56 s" }),
    ],
  },
  {
    n: 5,
    title: "Interpretability Case Study",
    lessons: [
      L(21, "choosing-which-of-your-models-to-inspect", "Choosing Which of Your Models to Inspect", { contentDir: "ch05/21-choosing-which-of-your-models-to-inspect" }),
      L(22, "applying-activation-patching-to-your-own-model", "Applying Activation Patching to Your Own Model", { contentDir: "ch05/22-applying-activation-patching-to-your-own-model" }),
      L(23, "looking-for-a-circuit-in-the-database-assistant", "Looking for a Circuit in the Database Assistant", { contentDir: "ch05/23-looking-for-a-circuit-in-the-database-assistant" }),
      L(24, "writing-up-an-interpretability-finding", "Writing Up an Interpretability Finding", { contentDir: "ch05/24-writing-up-an-interpretability-finding" }),
    ],
  },
  {
    n: 6,
    title: "Research Lab Wrap-Up",
    lessons: [
      L(25, "assembling-the-research-portfolio", "Assembling the Research Portfolio", { contentDir: "ch06/25-assembling-the-research-portfolio", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523973/ltv-ai-research-lab/assembling-the-research-portfolio.mp4", durationLabel: "1 min 45 s" }),
      L(26, "presenting-findings-to-a-technical-audience", "Presenting Findings to a Technical Audience", { contentDir: "ch06/26-presenting-findings-to-a-technical-audience", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525480/ltv-ai-research-lab/presenting-findings-to-a-technical-audience.mp4", durationLabel: "1 min 45 s" }),
      L(27, "where-this-research-could-go-next", "Where This Research Could Go Next", { contentDir: "ch06/27-where-this-research-could-go-next", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526630/ltv-ai-research-lab/where-this-research-could-go-next.mp4", durationLabel: "2 min 43 s" }),
    ],
  },
];
