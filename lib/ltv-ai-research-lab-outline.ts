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
      L(1, "how-this-research-lab-works", "How This Research Lab Works"),
      L(2, "picking-a-research-question", "Picking a Research Question"),
      L(3, "scoping-a-research-project-under-a-deadline", "Scoping a Research Project Under a Deadline"),
    ],
  },
  {
    n: 2,
    title: "Project 1 — RL for SQL Query Optimization",
    lessons: [
      L(4, "framing-query-plan-selection-as-an-rl-problem", "Framing Query Plan Selection as an RL Problem"),
      L(5, "building-a-custom-query-optimization-environment", "Building a Custom Query-Optimization Environment"),
      L(6, "designing-a-reward-from-execution-cost", "Designing a Reward From Execution Cost"),
      L(7, "training-an-agent-to-choose-execution-plans", "Training an Agent to Choose Execution Plans"),
      L(8, "evaluating-against-the-query-optimizers-own-choices", "Evaluating Against the Query Optimizer's Own Choices"),
      L(9, "project-1-writeup", "Project 1 Write-Up"),
    ],
  },
  {
    n: 3,
    title: "Project 2 — Reward Modeling for Data Quality",
    lessons: [
      L(10, "framing-data-quality-as-a-preference-problem", "Framing Data Quality as a Preference Problem"),
      L(11, "building-a-small-preference-dataset", "Building a Small Preference Dataset"),
      L(12, "training-a-data-quality-reward-model", "Training a Data-Quality Reward Model"),
      L(13, "evaluating-the-reward-model-against-held-out-cases", "Evaluating the Reward Model Against Held-Out Cases"),
      L(14, "project-2-writeup", "Project 2 Write-Up"),
    ],
  },
  {
    n: 4,
    title: "Project 3 — RLHF for a Database Assistant",
    lessons: [
      L(15, "picking-a-small-open-weight-base-model", "Picking a Small Open-Weight Base Model"),
      L(16, "sft-on-natural-language-to-sql", "SFT on Natural-Language-to-SQL"),
      L(17, "building-a-reward-signal-from-execution-correctness", "Building a Reward Signal From Execution Correctness"),
      L(18, "running-rlhf-on-the-database-assistant", "Running RLHF on the Database Assistant"),
      L(19, "evaluating-query-correctness-before-and-after", "Evaluating Query Correctness, Before & After"),
      L(20, "project-3-writeup", "Project 3 Write-Up"),
    ],
  },
  {
    n: 5,
    title: "Interpretability Case Study",
    lessons: [
      L(21, "choosing-which-of-your-models-to-inspect", "Choosing Which of Your Models to Inspect"),
      L(22, "applying-activation-patching-to-your-own-model", "Applying Activation Patching to Your Own Model"),
      L(23, "looking-for-a-circuit-in-the-database-assistant", "Looking for a Circuit in the Database Assistant"),
      L(24, "writing-up-an-interpretability-finding", "Writing Up an Interpretability Finding"),
    ],
  },
  {
    n: 6,
    title: "Research Lab Wrap-Up",
    lessons: [
      L(25, "assembling-the-research-portfolio", "Assembling the Research Portfolio"),
      L(26, "presenting-findings-to-a-technical-audience", "Presenting Findings to a Technical Audience"),
      L(27, "where-this-research-could-go-next", "Where This Research Could Go Next"),
    ],
  },
];
