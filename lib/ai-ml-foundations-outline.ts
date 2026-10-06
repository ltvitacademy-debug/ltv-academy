// The full AI/ML Foundations course outline. Only lessons with a
// contentDir + videoUrl are playable; everything else renders as "in
// production". Genuine ML literacy for an AI engineer — not math-heavy
// theory, but enough to understand what's actually happening under an
// LLM API call before the rest of this path builds on top of it.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/ai-ml-foundations/
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

export const AI_ML_FOUNDATIONS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "What Machine Learning Actually Is",
    lessons: [
      L(1, "supervised-unsupervised-reinforcement", "Supervised vs. Unsupervised vs. Reinforcement Learning", { contentDir: "ch01/01-supervised-unsupervised-reinforcement" }),
      L(2, "training-vs-inference", "The Training/Inference Split", { contentDir: "ch01/02-training-vs-inference" }),
      L(3, "features-and-labels", "Features & Labels", { contentDir: "ch01/03-features-and-labels" }),
      L(4, "overfitting-and-underfitting", "Overfitting & Underfitting", { contentDir: "ch01/04-overfitting-and-underfitting" }),
      L(5, "evaluation-metrics-overview", "Evaluation Metrics, Overview", { contentDir: "ch01/05-evaluation-metrics-overview" }),
    ],
  },
  {
    n: 2,
    title: "Core ML Concepts",
    lessons: [
      L(6, "linear-regression-intuition", "Linear Regression, Intuition", { contentDir: "ch02/06-linear-regression-intuition" }),
      L(7, "classification-intuition", "Classification, Intuition", { contentDir: "ch02/07-classification-intuition" }),
      L(8, "decision-trees-and-ensembles", "Decision Trees & Ensembles", { contentDir: "ch02/08-decision-trees-and-ensembles" }),
      L(9, "neural-networks-intuition", "Neural Networks, Intuition", { contentDir: "ch02/09-neural-networks-intuition" }),
      L(10, "loss-functions-and-gradient-descent", "Loss Functions & Gradient Descent, Intuition", { contentDir: "ch02/10-loss-functions-and-gradient-descent" }),
      L(11, "train-validation-test-splits", "Train/Validation/Test Splits", { contentDir: "ch02/11-train-validation-test-splits" }),
    ],
  },
  {
    n: 3,
    title: "Working With Data for ML",
    lessons: [
      L(12, "data-cleaning-for-ml", "Data Cleaning for ML", { contentDir: "ch03/12-data-cleaning-for-ml" }),
      L(13, "feature-engineering-basics", "Feature Engineering, Basics", { contentDir: "ch03/13-feature-engineering-basics" }),
      L(14, "handling-missing-data", "Handling Missing Data", { contentDir: "ch03/14-handling-missing-data" }),
      L(15, "categorical-encoding", "Categorical Encoding", { contentDir: "ch03/15-categorical-encoding" }),
      L(16, "data-leakage", "Data Leakage", { contentDir: "ch03/16-data-leakage" }),
    ],
  },
  {
    n: 4,
    title: "Deep Learning Foundations",
    lessons: [
      L(17, "what-a-neural-network-really-is", "What a Neural Network Really Is", { contentDir: "ch04/17-what-a-neural-network-really-is" }),
      L(18, "layers-and-activation-functions", "Layers & Activation Functions", { contentDir: "ch04/18-layers-and-activation-functions" }),
      L(19, "backpropagation-intuition", "Backpropagation, Intuition", { contentDir: "ch04/19-backpropagation-intuition" }),
      L(20, "cnns-rnns-and-transformers", "CNNs vs. RNNs vs. Transformers, Conceptually", { contentDir: "ch04/20-cnns-rnns-and-transformers" }),
      L(21, "why-transformers-changed-everything", "Why Transformers Changed Everything", { contentDir: "ch04/21-why-transformers-changed-everything" }),
    ],
  },
  {
    n: 5,
    title: "Using Pretrained Models",
    lessons: [
      L(22, "hugging-face-ecosystem-overview", "The Hugging Face Ecosystem, Overview", { contentDir: "ch05/22-hugging-face-ecosystem-overview" }),
      L(23, "loading-a-pretrained-model", "Loading a Pretrained Model", { contentDir: "ch05/23-loading-a-pretrained-model" }),
      L(24, "fine-tuning-vs-using-as-is", "Fine-Tuning vs. Using As-Is", { contentDir: "ch05/24-fine-tuning-vs-using-as-is" }),
      L(25, "transfer-learning-intuition", "Transfer Learning, Intuition", { contentDir: "ch05/25-transfer-learning-intuition" }),
      L(26, "model-cards-and-choosing-a-model", "Model Cards & Choosing a Model", { contentDir: "ch05/26-model-cards-and-choosing-a-model" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(27, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch06/27-capstone-kickoff" }),
      L(28, "capstone-a-classification-project", "Capstone: A Simple Classification Project", { contentDir: "ch06/28-capstone-a-classification-project" }),
      L(29, "capstone-evaluating-your-model", "Capstone: Evaluating Your Model", { contentDir: "ch06/29-capstone-evaluating-your-model" }),
      L(30, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/30-capstone-wrap-up" }),
    ],
  },
];
