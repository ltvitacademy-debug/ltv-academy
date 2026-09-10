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
      L(1, "supervised-unsupervised-reinforcement", "Supervised vs. Unsupervised vs. Reinforcement Learning"),
      L(2, "training-vs-inference", "The Training/Inference Split"),
      L(3, "features-and-labels", "Features & Labels"),
      L(4, "overfitting-and-underfitting", "Overfitting & Underfitting"),
      L(5, "evaluation-metrics-overview", "Evaluation Metrics, Overview"),
    ],
  },
  {
    n: 2,
    title: "Core ML Concepts",
    lessons: [
      L(6, "linear-regression-intuition", "Linear Regression, Intuition"),
      L(7, "classification-intuition", "Classification, Intuition"),
      L(8, "decision-trees-and-ensembles", "Decision Trees & Ensembles"),
      L(9, "neural-networks-intuition", "Neural Networks, Intuition"),
      L(10, "loss-functions-and-gradient-descent", "Loss Functions & Gradient Descent, Intuition"),
      L(11, "train-validation-test-splits", "Train/Validation/Test Splits"),
    ],
  },
  {
    n: 3,
    title: "Working With Data for ML",
    lessons: [
      L(12, "data-cleaning-for-ml", "Data Cleaning for ML"),
      L(13, "feature-engineering-basics", "Feature Engineering, Basics"),
      L(14, "handling-missing-data", "Handling Missing Data"),
      L(15, "categorical-encoding", "Categorical Encoding"),
      L(16, "data-leakage", "Data Leakage"),
    ],
  },
  {
    n: 4,
    title: "Deep Learning Foundations",
    lessons: [
      L(17, "what-a-neural-network-really-is", "What a Neural Network Really Is"),
      L(18, "layers-and-activation-functions", "Layers & Activation Functions"),
      L(19, "backpropagation-intuition", "Backpropagation, Intuition"),
      L(20, "cnns-rnns-and-transformers", "CNNs vs. RNNs vs. Transformers, Conceptually"),
      L(21, "why-transformers-changed-everything", "Why Transformers Changed Everything"),
    ],
  },
  {
    n: 5,
    title: "Using Pretrained Models",
    lessons: [
      L(22, "hugging-face-ecosystem-overview", "The Hugging Face Ecosystem, Overview"),
      L(23, "loading-a-pretrained-model", "Loading a Pretrained Model"),
      L(24, "fine-tuning-vs-using-as-is", "Fine-Tuning vs. Using As-Is"),
      L(25, "transfer-learning-intuition", "Transfer Learning, Intuition"),
      L(26, "model-cards-and-choosing-a-model", "Model Cards & Choosing a Model"),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(27, "capstone-kickoff", "Capstone Kickoff"),
      L(28, "capstone-a-classification-project", "Capstone: A Simple Classification Project"),
      L(29, "capstone-evaluating-your-model", "Capstone: Evaluating Your Model"),
      L(30, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
