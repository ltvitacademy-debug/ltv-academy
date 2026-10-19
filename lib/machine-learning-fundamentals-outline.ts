// The Machine Learning Fundamentals course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 5 of the Data Scientist path. The core algorithms and the ideas behind them; Applied Machine Learning (step 6) then covers the scikit-learn workflow. Goes deeper than AI/ML Foundations, which is an overview for AI engineers.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/machine-learning-fundamentals/
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

export const MACHINE_LEARNING_FUNDAMENTALS_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Machine Learning Foundations",
    lessons: [
      L(1, "what-machine-learning-is", "What Machine Learning Is", { contentDir: "ch01/01-what-machine-learning-is", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792440738/ltv-machine-learning-fundamentals/what-machine-learning-is.mp4", durationLabel: "3 min 30 s" }),
      L(2, "supervised-vs-unsupervised-learning", "Supervised vs. Unsupervised Learning", { contentDir: "ch01/02-supervised-vs-unsupervised-learning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792440874/ltv-machine-learning-fundamentals/supervised-vs-unsupervised-learning.mp4", durationLabel: "3 min 12 s" }),
      L(3, "the-ml-workflow", "The ML Workflow", { contentDir: "ch01/03-the-ml-workflow", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792441009/ltv-machine-learning-fundamentals/the-ml-workflow.mp4", durationLabel: "3 min 12 s" }),
      L(4, "bias-variance-and-generalization", "Bias, Variance & Generalization", { contentDir: "ch01/04-bias-variance-and-generalization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792441131/ltv-machine-learning-fundamentals/bias-variance-and-generalization.mp4", durationLabel: "3 min 12 s" }),
      L(5, "overfitting-and-underfitting", "Overfitting & Underfitting", { contentDir: "ch01/05-overfitting-and-underfitting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792441256/ltv-machine-learning-fundamentals/overfitting-and-underfitting.mp4", durationLabel: "3 min 20 s" }),
      L(6, "loss-functions-and-optimization", "Loss Functions & Optimization", { contentDir: "ch01/06-loss-functions-and-optimization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792441391/ltv-machine-learning-fundamentals/loss-functions-and-optimization.mp4", durationLabel: "3 min 47 s" }),
    ],
  },
  {
    n: 2,
    title: "Data Preparation & Feature Engineering",
    lessons: [
      L(7, "train-validation-and-test-splits", "Train, Validation & Test Splits", { contentDir: "ch02/07-train-validation-and-test-splits", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792441516/ltv-machine-learning-fundamentals/train-validation-and-test-splits.mp4", durationLabel: "3 min 27 s" }),
      L(8, "data-leakage", "Data Leakage", { contentDir: "ch02/08-data-leakage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792441644/ltv-machine-learning-fundamentals/data-leakage.mp4", durationLabel: "3 min 35 s" }),
      L(9, "encoding-categorical-variables", "Encoding Categorical Variables", { contentDir: "ch02/09-encoding-categorical-variables", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792441778/ltv-machine-learning-fundamentals/encoding-categorical-variables.mp4", durationLabel: "3 min 28 s" }),
      L(10, "scaling-and-normalization", "Scaling & Normalization", { contentDir: "ch02/10-scaling-and-normalization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792441918/ltv-machine-learning-fundamentals/scaling-and-normalization.mp4", durationLabel: "3 min 46 s" }),
      L(11, "creating-new-features", "Creating New Features", { contentDir: "ch02/11-creating-new-features", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792442037/ltv-machine-learning-fundamentals/creating-new-features.mp4", durationLabel: "3 min 7 s" }),
      L(12, "feature-selection", "Feature Selection", { contentDir: "ch02/12-feature-selection", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792442168/ltv-machine-learning-fundamentals/feature-selection.mp4", durationLabel: "3 min 30 s" }),
    ],
  },
  {
    n: 3,
    title: "Regression",
    lessons: [
      L(13, "linear-regression", "Linear Regression", { contentDir: "ch03/13-linear-regression", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792442292/ltv-machine-learning-fundamentals/linear-regression.mp4", durationLabel: "3 min 22 s" }),
      L(14, "multiple-regression", "Multiple Regression", { contentDir: "ch03/14-multiple-regression", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792442436/ltv-machine-learning-fundamentals/multiple-regression.mp4", durationLabel: "4 min 3 s" }),
      L(15, "regularization-ridge-and-lasso", "Regularization: Ridge & Lasso", { contentDir: "ch03/15-regularization-ridge-and-lasso", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792442559/ltv-machine-learning-fundamentals/regularization-ridge-and-lasso.mp4", durationLabel: "3 min 22 s" }),
      L(16, "regression-metrics", "Regression Metrics", { contentDir: "ch03/16-regression-metrics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792442683/ltv-machine-learning-fundamentals/regression-metrics.mp4", durationLabel: "3 min 27 s" }),
      L(17, "logistic-regression", "Logistic Regression", { contentDir: "ch03/17-logistic-regression", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792442817/ltv-machine-learning-fundamentals/logistic-regression.mp4", durationLabel: "3 min 43 s" }),
    ],
  },
  {
    n: 4,
    title: "Trees & Ensembles",
    lessons: [
      L(18, "decision-trees", "Decision Trees", { contentDir: "ch04/18-decision-trees", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792442934/ltv-machine-learning-fundamentals/decision-trees.mp4", durationLabel: "3 min 10 s" }),
      L(19, "random-forests", "Random Forests", { contentDir: "ch04/19-random-forests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792443059/ltv-machine-learning-fundamentals/random-forests.mp4", durationLabel: "3 min 28 s" }),
      L(20, "feature-importance", "Feature Importance", { contentDir: "ch04/20-feature-importance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792443185/ltv-machine-learning-fundamentals/feature-importance.mp4", durationLabel: "3 min 25 s" }),
      L(21, "k-nearest-neighbors-and-naive-bayes-overview", "k-Nearest Neighbors & Naive Bayes Overview", { contentDir: "ch04/21-k-nearest-neighbors-and-naive-bayes-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792443441/ltv-machine-learning-fundamentals/k-nearest-neighbors-and-naive-bayes-overview.mp4", durationLabel: "3 min 51 s" }),
    ],
  },
  {
    n: 5,
    title: "Unsupervised Learning",
    lessons: [
      L(22, "clustering-overview", "Clustering Overview", { contentDir: "ch05/22-clustering-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792443584/ltv-machine-learning-fundamentals/clustering-overview.mp4", durationLabel: "3 min 17 s" }),
      L(23, "k-means", "k-Means", { contentDir: "ch05/23-k-means", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792443700/ltv-machine-learning-fundamentals/k-means.mp4", durationLabel: "3 min 3 s" }),
      L(24, "choosing-the-number-of-clusters", "Choosing the Number of Clusters", { contentDir: "ch05/24-choosing-the-number-of-clusters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792443812/ltv-machine-learning-fundamentals/choosing-the-number-of-clusters.mp4", durationLabel: "2 min 56 s" }),
      L(25, "hierarchical-clustering", "Hierarchical Clustering", { contentDir: "ch05/25-hierarchical-clustering", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792443937/ltv-machine-learning-fundamentals/hierarchical-clustering.mp4", durationLabel: "3 min 14 s" }),
      L(26, "dimensionality-reduction-with-pca", "Dimensionality Reduction With PCA", { contentDir: "ch05/26-dimensionality-reduction-with-pca", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792444066/ltv-machine-learning-fundamentals/dimensionality-reduction-with-pca.mp4", durationLabel: "3 min 28 s" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(27, "capstone-kickoff-build-your-first-models", "Capstone Kickoff: Build Your First Models", { contentDir: "ch06/27-capstone-kickoff-build-your-first-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792444189/ltv-machine-learning-fundamentals/capstone-kickoff-build-your-first-models.mp4", durationLabel: "3 min 21 s" }),
      L(28, "capstone-build-it", "Capstone: Build It", { contentDir: "ch06/28-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792444317/ltv-machine-learning-fundamentals/capstone-build-it.mp4", durationLabel: "3 min 40 s" }),
      L(29, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/29-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792444452/ltv-machine-learning-fundamentals/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "3 min 52 s" }),
    ],
  },
];
