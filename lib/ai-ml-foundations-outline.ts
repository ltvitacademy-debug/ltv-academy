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
      L(1, "supervised-unsupervised-reinforcement", "Supervised vs. Unsupervised vs. Reinforcement Learning", { contentDir: "ch01/01-supervised-unsupervised-reinforcement", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792498742/ltv-ai-ml-foundations/supervised-unsupervised-reinforcement.mp4", durationLabel: "1 min 54 s" }),
      L(2, "training-vs-inference", "The Training/Inference Split", { contentDir: "ch01/02-training-vs-inference", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792498821/ltv-ai-ml-foundations/training-vs-inference.mp4", durationLabel: "1 min 44 s" }),
      L(3, "features-and-labels", "Features & Labels", { contentDir: "ch01/03-features-and-labels", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792498884/ltv-ai-ml-foundations/features-and-labels.mp4", durationLabel: "1 min 37 s" }),
      L(4, "overfitting-and-underfitting", "Overfitting & Underfitting", { contentDir: "ch01/04-overfitting-and-underfitting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792498937/ltv-ai-ml-foundations/overfitting-and-underfitting.mp4", durationLabel: "1 min 37 s" }),
      L(5, "evaluation-metrics-overview", "Evaluation Metrics, Overview", { contentDir: "ch01/05-evaluation-metrics-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499000/ltv-ai-ml-foundations/evaluation-metrics-overview.mp4", durationLabel: "1 min 41 s" }),
    ],
  },
  {
    n: 2,
    title: "Core ML Concepts",
    lessons: [
      L(6, "linear-regression-intuition", "Linear Regression, Intuition", { contentDir: "ch02/06-linear-regression-intuition", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499062/ltv-ai-ml-foundations/linear-regression-intuition.mp4", durationLabel: "1 min 38 s" }),
      L(7, "classification-intuition", "Classification, Intuition", { contentDir: "ch02/07-classification-intuition", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499127/ltv-ai-ml-foundations/classification-intuition.mp4", durationLabel: "1 min 41 s" }),
      L(8, "decision-trees-and-ensembles", "Decision Trees & Ensembles", { contentDir: "ch02/08-decision-trees-and-ensembles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499195/ltv-ai-ml-foundations/decision-trees-and-ensembles.mp4", durationLabel: "1 min 51 s" }),
      L(9, "neural-networks-intuition", "Neural Networks, Intuition", { contentDir: "ch02/09-neural-networks-intuition", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499281/ltv-ai-ml-foundations/neural-networks-intuition.mp4", durationLabel: "1 min 34 s" }),
      L(10, "loss-functions-and-gradient-descent", "Loss Functions & Gradient Descent, Intuition", { contentDir: "ch02/10-loss-functions-and-gradient-descent", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499339/ltv-ai-ml-foundations/loss-functions-and-gradient-descent.mp4", durationLabel: "1 min 37 s" }),
      L(11, "train-validation-test-splits", "Train/Validation/Test Splits", { contentDir: "ch02/11-train-validation-test-splits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499398/ltv-ai-ml-foundations/train-validation-test-splits.mp4", durationLabel: "1 min 38 s" }),
    ],
  },
  {
    n: 3,
    title: "Working With Data for ML",
    lessons: [
      L(12, "data-cleaning-for-ml", "Data Cleaning for ML", { contentDir: "ch03/12-data-cleaning-for-ml", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499464/ltv-ai-ml-foundations/data-cleaning-for-ml.mp4", durationLabel: "1 min 42 s" }),
      L(13, "feature-engineering-basics", "Feature Engineering, Basics", { contentDir: "ch03/13-feature-engineering-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499519/ltv-ai-ml-foundations/feature-engineering-basics.mp4", durationLabel: "1 min 33 s" }),
      L(14, "handling-missing-data", "Handling Missing Data", { contentDir: "ch03/14-handling-missing-data", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499577/ltv-ai-ml-foundations/handling-missing-data.mp4", durationLabel: "1 min 38 s" }),
      L(15, "categorical-encoding", "Categorical Encoding", { contentDir: "ch03/15-categorical-encoding", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499634/ltv-ai-ml-foundations/categorical-encoding.mp4", durationLabel: "1 min 38 s" }),
      L(16, "data-leakage", "Data Leakage", { contentDir: "ch03/16-data-leakage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499702/ltv-ai-ml-foundations/data-leakage.mp4", durationLabel: "1 min 51 s" }),
    ],
  },
  {
    n: 4,
    title: "Deep Learning Foundations",
    lessons: [
      L(17, "what-a-neural-network-really-is", "What a Neural Network Really Is", { contentDir: "ch04/17-what-a-neural-network-really-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499770/ltv-ai-ml-foundations/what-a-neural-network-really-is.mp4", durationLabel: "2 min 5 s" }),
      L(18, "layers-and-activation-functions", "Layers & Activation Functions", { contentDir: "ch04/18-layers-and-activation-functions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499845/ltv-ai-ml-foundations/layers-and-activation-functions.mp4", durationLabel: "2 min 3 s" }),
      L(19, "backpropagation-intuition", "Backpropagation, Intuition", { contentDir: "ch04/19-backpropagation-intuition", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499917/ltv-ai-ml-foundations/backpropagation-intuition.mp4", durationLabel: "2 min 5 s" }),
      L(20, "cnns-rnns-and-transformers", "CNNs vs. RNNs vs. Transformers, Conceptually", { contentDir: "ch04/20-cnns-rnns-and-transformers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792499998/ltv-ai-ml-foundations/cnns-rnns-and-transformers.mp4", durationLabel: "2 min 21 s" }),
      L(21, "why-transformers-changed-everything", "Why Transformers Changed Everything", { contentDir: "ch04/21-why-transformers-changed-everything", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500079/ltv-ai-ml-foundations/why-transformers-changed-everything.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 5,
    title: "Using Pretrained Models",
    lessons: [
      L(22, "hugging-face-ecosystem-overview", "The Hugging Face Ecosystem, Overview", { contentDir: "ch05/22-hugging-face-ecosystem-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500142/ltv-ai-ml-foundations/hugging-face-ecosystem-overview.mp4", durationLabel: "1 min 41 s" }),
      L(23, "loading-a-pretrained-model", "Loading a Pretrained Model", { contentDir: "ch05/23-loading-a-pretrained-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500216/ltv-ai-ml-foundations/loading-a-pretrained-model.mp4", durationLabel: "2 min 2 s" }),
      L(24, "fine-tuning-vs-using-as-is", "Fine-Tuning vs. Using As-Is", { contentDir: "ch05/24-fine-tuning-vs-using-as-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500299/ltv-ai-ml-foundations/fine-tuning-vs-using-as-is.mp4", durationLabel: "2 min 35 s" }),
      L(25, "transfer-learning-intuition", "Transfer Learning, Intuition", { contentDir: "ch05/25-transfer-learning-intuition", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500384/ltv-ai-ml-foundations/transfer-learning-intuition.mp4", durationLabel: "2 min 3 s" }),
      L(26, "model-cards-and-choosing-a-model", "Model Cards & Choosing a Model", { contentDir: "ch05/26-model-cards-and-choosing-a-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500448/ltv-ai-ml-foundations/model-cards-and-choosing-a-model.mp4", durationLabel: "1 min 54 s" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(27, "capstone-kickoff", "Capstone Kickoff", { contentDir: "ch06/27-capstone-kickoff", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500510/ltv-ai-ml-foundations/capstone-kickoff.mp4", durationLabel: "1 min 46 s" }),
      L(28, "capstone-a-classification-project", "Capstone: A Simple Classification Project", { contentDir: "ch06/28-capstone-a-classification-project", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500568/ltv-ai-ml-foundations/capstone-a-classification-project.mp4", durationLabel: "1 min 35 s" }),
      L(29, "capstone-evaluating-your-model", "Capstone: Evaluating Your Model", { contentDir: "ch06/29-capstone-evaluating-your-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500631/ltv-ai-ml-foundations/capstone-evaluating-your-model.mp4", durationLabel: "1 min 53 s" }),
      L(30, "capstone-wrap-up", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/30-capstone-wrap-up", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792500699/ltv-ai-ml-foundations/capstone-wrap-up.mp4", durationLabel: "1 min 50 s" }),
    ],
  },
];
