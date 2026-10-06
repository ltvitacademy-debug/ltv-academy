// The AI Safety, Alignment & Interpretability course outline — FRAMEWORK ONLY (chapter
// and lesson titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Fourth course of the AI/ML Research Engineer & Alignment Engineer
// destination. Assumes Reinforcement Learning & RL for LLMs. Covers why alignment is
// hard, the evaluation and oversight techniques used today, and mechanistic
// interpretability — the toolset of an AI Alignment Research Engineer.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ai-safety-alignment-and-interpretability/
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

export const AI_SAFETY_ALIGNMENT_AND_INTERPRETABILITY_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Why Alignment Is Hard",
    lessons: [
      L(1, "what-alignment-means", "What \"Alignment\" Means"),
      L(2, "specification-gaming", "Specification Gaming"),
      L(3, "reward-hacking-revisited", "Reward Hacking, Revisited"),
      L(4, "goodharts-law-in-ml-systems", "Goodhart's Law in ML Systems"),
      L(5, "outer-alignment-vs-inner-alignment", "Outer Alignment vs. Inner Alignment"),
      L(6, "why-capable-models-make-alignment-harder", "Why More Capable Models Make Alignment Harder"),
    ],
  },
  {
    n: 2,
    title: "Alignment Techniques Today",
    lessons: [
      L(7, "rlhf-and-rlaif-an-alignment-lens", "RLHF & RLAIF, an Alignment Lens"),
      L(8, "constitutional-ai-revisited", "Constitutional AI, Revisited"),
      L(9, "red-teaming-a-model", "Red-Teaming a Model"),
      L(10, "adversarial-prompting-and-jailbreaks", "Adversarial Prompting & Jailbreaks"),
      L(11, "refusal-training-and-its-limits", "Refusal Training & Its Limits"),
      L(12, "the-limits-of-current-alignment-methods", "The Limits of Current Alignment Methods"),
    ],
  },
  {
    n: 3,
    title: "Evaluations for Safety",
    lessons: [
      L(13, "capability-evaluations-vs-safety-evaluations", "Capability Evaluations vs. Safety Evaluations"),
      L(14, "designing-a-dangerous-capability-evaluation", "Designing a Dangerous-Capability Evaluation"),
      L(15, "eval-design-pitfalls", "Eval Design Pitfalls"),
      L(16, "sandbagging-and-evaluation-gaming", "Sandbagging & Evaluation Gaming"),
      L(17, "third-party-and-external-evaluations", "Third-Party & External Evaluations"),
      L(18, "building-a-small-safety-eval-suite", "Building a Small Safety Eval Suite"),
    ],
  },
  {
    n: 4,
    title: "Scalable Oversight",
    lessons: [
      L(19, "the-scalable-oversight-problem", "The Scalable Oversight Problem"),
      L(20, "debate-as-an-oversight-method", "Debate as an Oversight Method"),
      L(21, "recursive-reward-modeling", "Recursive Reward Modeling"),
      L(22, "weak-to-strong-generalization", "Weak-to-Strong Generalization"),
      L(23, "ai-assisted-human-oversight", "AI-Assisted Human Oversight"),
    ],
  },
  {
    n: 5,
    title: "Interpretability Foundations",
    lessons: [
      L(24, "why-interpretability-matters", "Why Interpretability Matters"),
      L(25, "black-box-vs-mechanistic-approaches", "Black-Box vs. Mechanistic Approaches"),
      L(26, "probing-classifiers", "Probing Classifiers"),
      L(27, "activation-visualization", "Activation Visualization"),
      L(28, "the-logit-lens", "The Logit Lens"),
      L(29, "attribution-methods", "Attribution Methods"),
    ],
  },
  {
    n: 6,
    title: "Mechanistic Interpretability",
    lessons: [
      L(30, "circuits-what-they-are", "Circuits: What They Are"),
      L(31, "features-and-superposition", "Features & Superposition"),
      L(32, "sparse-autoencoders", "Sparse Autoencoders"),
      L(33, "attention-head-analysis", "Attention Head Analysis"),
      L(34, "induction-heads", "Induction Heads"),
      L(35, "finding-and-patching-a-circuit", "Finding & Patching a Circuit"),
      L(36, "activation-patching-and-causal-tracing", "Activation Patching & Causal Tracing"),
      L(37, "current-tools-for-interpretability-research", "Current Tools for Interpretability Research"),
    ],
  },
  {
    n: 7,
    title: "Model Behavior & Honesty",
    lessons: [
      L(38, "sycophancy", "Sycophancy"),
      L(39, "deception-and-situational-awareness", "Deception & Situational Awareness"),
      L(40, "truthfulness-and-calibration-research", "Truthfulness & Calibration Research"),
      L(41, "hallucination-from-an-alignment-perspective", "Hallucination From an Alignment Perspective"),
      L(42, "detecting-concerning-behaviors", "Detecting Concerning Behaviors"),
      L(43, "case-studies-in-model-behavior-research", "Case Studies in Model Behavior Research"),
    ],
  },
  {
    n: 8,
    title: "Governance & Responsible Deployment",
    lessons: [
      L(44, "model-cards-and-system-cards", "Model Cards & System Cards"),
      L(45, "responsible-scaling-policies", "Responsible Scaling Policies"),
      L(46, "deployment-safety-cases", "Deployment Safety Cases"),
      L(47, "the-role-of-an-alignment-research-engineer-in-industry", "The Role of an Alignment Research Engineer in Industry"),
      L(48, "course-wrap-up-and-open-problems", "Course Wrap-Up & Open Problems"),
    ],
  },
];
