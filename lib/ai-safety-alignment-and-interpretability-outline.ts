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
      L(1, "what-alignment-means", "What \"Alignment\" Means", { contentDir: "ch01/01-what-alignment-means", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792505813/ltv-ai-safety-alignment-and-interpretability/what-alignment-means.mp4", durationLabel: "1 min 54 s" }),
      L(2, "specification-gaming", "Specification Gaming", { contentDir: "ch01/02-specification-gaming", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507327/ltv-ai-safety-alignment-and-interpretability/specification-gaming.mp4", durationLabel: "1 min 32 s" }),
      L(3, "reward-hacking-revisited", "Reward Hacking, Revisited", { contentDir: "ch01/03-reward-hacking-revisited", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507961/ltv-ai-safety-alignment-and-interpretability/reward-hacking-revisited.mp4", durationLabel: "1 min 50 s" }),
      L(4, "goodharts-law-in-ml-systems", "Goodhart's Law in ML Systems", { contentDir: "ch01/04-goodharts-law-in-ml-systems", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508564/ltv-ai-safety-alignment-and-interpretability/goodharts-law-in-ml-systems.mp4", durationLabel: "1 min 40 s" }),
      L(5, "outer-alignment-vs-inner-alignment", "Outer Alignment vs. Inner Alignment", { contentDir: "ch01/05-outer-alignment-vs-inner-alignment", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509214/ltv-ai-safety-alignment-and-interpretability/outer-alignment-vs-inner-alignment.mp4", durationLabel: "1 min 50 s" }),
      L(6, "why-capable-models-make-alignment-harder", "Why More Capable Models Make Alignment Harder", { contentDir: "ch01/06-why-capable-models-make-alignment-harder", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509911/ltv-ai-safety-alignment-and-interpretability/why-capable-models-make-alignment-harder.mp4", durationLabel: "1 min 51 s" }),
    ],
  },
  {
    n: 2,
    title: "Alignment Techniques Today",
    lessons: [
      L(7, "rlhf-and-rlaif-an-alignment-lens", "RLHF & RLAIF, an Alignment Lens", { contentDir: "ch02/07-rlhf-and-rlaif-an-alignment-lens", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510753/ltv-ai-safety-alignment-and-interpretability/rlhf-and-rlaif-an-alignment-lens.mp4", durationLabel: "2 min 8 s" }),
      L(8, "constitutional-ai-revisited", "Constitutional AI, Revisited", { contentDir: "ch02/08-constitutional-ai-revisited", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511465/ltv-ai-safety-alignment-and-interpretability/constitutional-ai-revisited.mp4", durationLabel: "1 min 57 s" }),
      L(9, "red-teaming-a-model", "Red-Teaming a Model", { contentDir: "ch02/09-red-teaming-a-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512202/ltv-ai-safety-alignment-and-interpretability/red-teaming-a-model.mp4", durationLabel: "2 min 1 s" }),
      L(10, "adversarial-prompting-and-jailbreaks", "Adversarial Prompting & Jailbreaks", { contentDir: "ch02/10-adversarial-prompting-and-jailbreaks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512909/ltv-ai-safety-alignment-and-interpretability/adversarial-prompting-and-jailbreaks.mp4", durationLabel: "1 min 54 s" }),
      L(11, "refusal-training-and-its-limits", "Refusal Training & Its Limits", { contentDir: "ch02/11-refusal-training-and-its-limits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513653/ltv-ai-safety-alignment-and-interpretability/refusal-training-and-its-limits.mp4", durationLabel: "1 min 58 s" }),
      L(12, "the-limits-of-current-alignment-methods", "The Limits of Current Alignment Methods", { contentDir: "ch02/12-the-limits-of-current-alignment-methods", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514415/ltv-ai-safety-alignment-and-interpretability/the-limits-of-current-alignment-methods.mp4", durationLabel: "1 min 58 s" }),
    ],
  },
  {
    n: 3,
    title: "Evaluations for Safety",
    lessons: [
      L(13, "capability-evaluations-vs-safety-evaluations", "Capability Evaluations vs. Safety Evaluations", { contentDir: "ch03/13-capability-evaluations-vs-safety-evaluations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515270/ltv-ai-safety-alignment-and-interpretability/capability-evaluations-vs-safety-evaluations.mp4", durationLabel: "2 min 14 s" }),
      L(14, "designing-a-dangerous-capability-evaluation", "Designing a Dangerous-Capability Evaluation", { contentDir: "ch03/14-designing-a-dangerous-capability-evaluation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516124/ltv-ai-safety-alignment-and-interpretability/designing-a-dangerous-capability-evaluation.mp4", durationLabel: "2 min 12 s" }),
      L(15, "eval-design-pitfalls", "Eval Design Pitfalls", { contentDir: "ch03/15-eval-design-pitfalls", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516857/ltv-ai-safety-alignment-and-interpretability/eval-design-pitfalls.mp4", durationLabel: "1 min 57 s" }),
      L(16, "sandbagging-and-evaluation-gaming", "Sandbagging & Evaluation Gaming", { contentDir: "ch03/16-sandbagging-and-evaluation-gaming", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517672/ltv-ai-safety-alignment-and-interpretability/sandbagging-and-evaluation-gaming.mp4", durationLabel: "2 min 16 s" }),
      L(17, "third-party-and-external-evaluations", "Third-Party & External Evaluations", { contentDir: "ch03/17-third-party-and-external-evaluations", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518566/ltv-ai-safety-alignment-and-interpretability/third-party-and-external-evaluations.mp4", durationLabel: "2 min 21 s" }),
      L(18, "building-a-small-safety-eval-suite", "Building a Small Safety Eval Suite", { contentDir: "ch03/18-building-a-small-safety-eval-suite", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520100/ltv-ai-safety-alignment-and-interpretability/building-a-small-safety-eval-suite.mp4", durationLabel: "2 min 5 s" }),
    ],
  },
  {
    n: 4,
    title: "Scalable Oversight",
    lessons: [
      L(19, "the-scalable-oversight-problem", "The Scalable Oversight Problem", { contentDir: "ch04/19-the-scalable-oversight-problem", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520897/ltv-ai-safety-alignment-and-interpretability/the-scalable-oversight-problem.mp4", durationLabel: "2 min 4 s" }),
      L(20, "debate-as-an-oversight-method", "Debate as an Oversight Method", { contentDir: "ch04/20-debate-as-an-oversight-method", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521706/ltv-ai-safety-alignment-and-interpretability/debate-as-an-oversight-method.mp4", durationLabel: "2 min 8 s" }),
      L(21, "recursive-reward-modeling", "Recursive Reward Modeling", { contentDir: "ch04/21-recursive-reward-modeling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522500/ltv-ai-safety-alignment-and-interpretability/recursive-reward-modeling.mp4", durationLabel: "2 min 13 s" }),
      L(22, "weak-to-strong-generalization", "Weak-to-Strong Generalization", { contentDir: "ch04/22-weak-to-strong-generalization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523354/ltv-ai-safety-alignment-and-interpretability/weak-to-strong-generalization.mp4", durationLabel: "2 min 16 s" }),
      L(23, "ai-assisted-human-oversight", "AI-Assisted Human Oversight", { contentDir: "ch04/23-ai-assisted-human-oversight", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524207/ltv-ai-safety-alignment-and-interpretability/ai-assisted-human-oversight.mp4", durationLabel: "2 min 21 s" }),
    ],
  },
  {
    n: 5,
    title: "Interpretability Foundations",
    lessons: [
      L(24, "why-interpretability-matters", "Why Interpretability Matters", { contentDir: "ch05/24-why-interpretability-matters" }),
      L(25, "black-box-vs-mechanistic-approaches", "Black-Box vs. Mechanistic Approaches", { contentDir: "ch05/25-black-box-vs-mechanistic-approaches" }),
      L(26, "probing-classifiers", "Probing Classifiers", { contentDir: "ch05/26-probing-classifiers" }),
      L(27, "activation-visualization", "Activation Visualization", { contentDir: "ch05/27-activation-visualization" }),
      L(28, "the-logit-lens", "The Logit Lens", { contentDir: "ch05/28-the-logit-lens" }),
      L(29, "attribution-methods", "Attribution Methods", { contentDir: "ch05/29-attribution-methods" }),
    ],
  },
  {
    n: 6,
    title: "Mechanistic Interpretability",
    lessons: [
      L(30, "circuits-what-they-are", "Circuits: What They Are", { contentDir: "ch06/30-circuits-what-they-are" }),
      L(31, "features-and-superposition", "Features & Superposition", { contentDir: "ch06/31-features-and-superposition" }),
      L(32, "sparse-autoencoders", "Sparse Autoencoders", { contentDir: "ch06/32-sparse-autoencoders" }),
      L(33, "attention-head-analysis", "Attention Head Analysis", { contentDir: "ch06/33-attention-head-analysis" }),
      L(34, "induction-heads", "Induction Heads", { contentDir: "ch06/34-induction-heads" }),
      L(35, "finding-and-patching-a-circuit", "Finding & Patching a Circuit", { contentDir: "ch06/35-finding-and-patching-a-circuit" }),
      L(36, "activation-patching-and-causal-tracing", "Activation Patching & Causal Tracing", { contentDir: "ch06/36-activation-patching-and-causal-tracing" }),
      L(37, "current-tools-for-interpretability-research", "Current Tools for Interpretability Research", { contentDir: "ch06/37-current-tools-for-interpretability-research" }),
    ],
  },
  {
    n: 7,
    title: "Model Behavior & Honesty",
    lessons: [
      L(38, "sycophancy", "Sycophancy", { contentDir: "ch07/38-sycophancy" }),
      L(39, "deception-and-situational-awareness", "Deception & Situational Awareness", { contentDir: "ch07/39-deception-and-situational-awareness" }),
      L(40, "truthfulness-and-calibration-research", "Truthfulness & Calibration Research", { contentDir: "ch07/40-truthfulness-and-calibration-research" }),
      L(41, "hallucination-from-an-alignment-perspective", "Hallucination From an Alignment Perspective", { contentDir: "ch07/41-hallucination-from-an-alignment-perspective" }),
      L(42, "detecting-concerning-behaviors", "Detecting Concerning Behaviors", { contentDir: "ch07/42-detecting-concerning-behaviors" }),
      L(43, "case-studies-in-model-behavior-research", "Case Studies in Model Behavior Research", { contentDir: "ch07/43-case-studies-in-model-behavior-research" }),
    ],
  },
  {
    n: 8,
    title: "Governance & Responsible Deployment",
    lessons: [
      L(44, "model-cards-and-system-cards", "Model Cards & System Cards", { contentDir: "ch08/44-model-cards-and-system-cards" }),
      L(45, "responsible-scaling-policies", "Responsible Scaling Policies", { contentDir: "ch08/45-responsible-scaling-policies" }),
      L(46, "deployment-safety-cases", "Deployment Safety Cases", { contentDir: "ch08/46-deployment-safety-cases" }),
      L(47, "the-role-of-an-alignment-research-engineer-in-industry", "The Role of an Alignment Research Engineer in Industry", { contentDir: "ch08/47-the-role-of-an-alignment-research-engineer-in-industry" }),
      L(48, "course-wrap-up-and-open-problems", "Course Wrap-Up & Open Problems", { contentDir: "ch08/48-course-wrap-up-and-open-problems" }),
    ],
  },
];
