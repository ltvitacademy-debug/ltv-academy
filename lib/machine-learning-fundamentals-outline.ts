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
      L(1, "what-machine-learning-is", "What Machine Learning Is", { contentDir: "ch01/01-what-machine-learning-is" }),
      L(2, "supervised-vs-unsupervised-learning", "Supervised vs. Unsupervised Learning", { contentDir: "ch01/02-supervised-vs-unsupervised-learning" }),
      L(3, "the-ml-workflow", "The ML Workflow", { contentDir: "ch01/03-the-ml-workflow" }),
      L(4, "bias-variance-and-generalization", "Bias, Variance & Generalization", { contentDir: "ch01/04-bias-variance-and-generalization" }),
      L(5, "overfitting-and-underfitting", "Overfitting & Underfitting", { contentDir: "ch01/05-overfitting-and-underfitting" }),
      L(6, "loss-functions-and-optimization", "Loss Functions & Optimization", { contentDir: "ch01/06-loss-functions-and-optimization" }),
    ],
  },
  {
    n: 2,
    title: "Data Preparation & Feature Engineering",
    lessons: [
      L(7, "train-validation-and-test-splits", "Train, Validation & Test Splits", { contentDir: "ch02/07-train-validation-and-test-splits" }),
      L(8, "data-leakage", "Data Leakage", { contentDir: "ch02/08-data-leakage" }),
      L(9, "encoding-categorical-variables", "Encoding Categorical Variables", { contentDir: "ch02/09-encoding-categorical-variables" }),
      L(10, "scaling-and-normalization", "Scaling & Normalization", { contentDir: "ch02/10-scaling-and-normalization" }),
      L(11, "creating-new-features", "Creating New Features", { contentDir: "ch02/11-creating-new-features" }),
      L(12, "feature-selection", "Feature Selection", { contentDir: "ch02/12-feature-selection" }),
    ],
  },
  {
    n: 3,
    title: "Regression",
    lessons: [
      L(13, "linear-regression", "Linear Regression", { contentDir: "ch03/13-linear-regression" }),
      L(14, "multiple-regression", "Multiple Regression", { contentDir: "ch03/14-multiple-regression" }),
      L(15, "regularization-ridge-and-lasso", "Regularization: Ridge & Lasso", { contentDir: "ch03/15-regularization-ridge-and-lasso" }),
      L(16, "regression-metrics", "Regression Metrics", { contentDir: "ch03/16-regression-metrics" }),
      L(17, "logistic-regression", "Logistic Regression", { contentDir: "ch03/17-logistic-regression" }),
    ],
  },
  {
    n: 4,
    title: "Trees & Ensembles",
    lessons: [
      L(18, "decision-trees", "Decision Trees", { contentDir: "ch04/18-decision-trees" }),
      L(19, "random-forests", "Random Forests", { contentDir: "ch04/19-random-forests" }),
      L(20, "feature-importance", "Feature Importance", { contentDir: "ch04/20-feature-importance" }),
      L(21, "k-nearest-neighbors-and-naive-bayes-overview", "k-Nearest Neighbors & Naive Bayes Overview", { contentDir: "ch04/21-k-nearest-neighbors-and-naive-bayes-overview" }),
    ],
  },
  {
    n: 5,
    title: "Unsupervised Learning",
    lessons: [
      L(22, "clustering-overview", "Clustering Overview", { contentDir: "ch05/22-clustering-overview" }),
      L(23, "k-means", "k-Means", { contentDir: "ch05/23-k-means" }),
      L(24, "choosing-the-number-of-clusters", "Choosing the Number of Clusters", { contentDir: "ch05/24-choosing-the-number-of-clusters" }),
      L(25, "hierarchical-clustering", "Hierarchical Clustering", { contentDir: "ch05/25-hierarchical-clustering" }),
      L(26, "dimensionality-reduction-with-pca", "Dimensionality Reduction With PCA", { contentDir: "ch05/26-dimensionality-reduction-with-pca" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(27, "capstone-kickoff-build-your-first-models", "Capstone Kickoff: Build Your First Models", { contentDir: "ch06/27-capstone-kickoff-build-your-first-models" }),
      L(28, "capstone-build-it", "Capstone: Build It", { contentDir: "ch06/28-capstone-build-it" }),
      L(29, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/29-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
