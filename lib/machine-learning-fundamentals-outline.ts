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
      L(1, "what-machine-learning-is", "What Machine Learning Is"),
      L(2, "supervised-vs-unsupervised-learning", "Supervised vs. Unsupervised Learning"),
      L(3, "the-ml-workflow", "The ML Workflow"),
      L(4, "bias-variance-and-generalization", "Bias, Variance & Generalization"),
      L(5, "overfitting-and-underfitting", "Overfitting & Underfitting"),
      L(6, "loss-functions-and-optimization", "Loss Functions & Optimization"),
    ],
  },
  {
    n: 2,
    title: "Data Preparation & Feature Engineering",
    lessons: [
      L(7, "train-validation-and-test-splits", "Train, Validation & Test Splits"),
      L(8, "data-leakage", "Data Leakage"),
      L(9, "encoding-categorical-variables", "Encoding Categorical Variables"),
      L(10, "scaling-and-normalization", "Scaling & Normalization"),
      L(11, "creating-new-features", "Creating New Features"),
      L(12, "feature-selection", "Feature Selection"),
    ],
  },
  {
    n: 3,
    title: "Regression",
    lessons: [
      L(13, "linear-regression", "Linear Regression"),
      L(14, "multiple-regression", "Multiple Regression"),
      L(15, "regularization-ridge-and-lasso", "Regularization: Ridge & Lasso"),
      L(16, "regression-metrics", "Regression Metrics"),
      L(17, "logistic-regression", "Logistic Regression"),
    ],
  },
  {
    n: 4,
    title: "Trees & Ensembles",
    lessons: [
      L(18, "decision-trees", "Decision Trees"),
      L(19, "random-forests", "Random Forests"),
      L(20, "feature-importance", "Feature Importance"),
      L(21, "k-nearest-neighbors-and-naive-bayes-overview", "k-Nearest Neighbors & Naive Bayes Overview"),
    ],
  },
  {
    n: 5,
    title: "Unsupervised Learning",
    lessons: [
      L(22, "clustering-overview", "Clustering Overview"),
      L(23, "k-means", "k-Means"),
      L(24, "choosing-the-number-of-clusters", "Choosing the Number of Clusters"),
      L(25, "hierarchical-clustering", "Hierarchical Clustering"),
      L(26, "dimensionality-reduction-with-pca", "Dimensionality Reduction With PCA"),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(27, "capstone-kickoff-build-your-first-models", "Capstone Kickoff: Build Your First Models"),
      L(28, "capstone-build-it", "Capstone: Build It"),
      L(29, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
