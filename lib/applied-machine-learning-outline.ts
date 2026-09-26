// The Applied Machine Learning course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 6 of the Data Scientist path. The production-minded scikit-learn workflow, assuming Machine Learning Fundamentals.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/applied-machine-learning/
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

export const APPLIED_MACHINE_LEARNING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "The scikit-learn Workflow",
    lessons: [
      L(1, "the-scikit-learn-api", "The scikit-learn API", { contentDir: "ch01/01-the-scikit-learn-api" }),
      L(2, "estimators-transformers-and-predictors", "Estimators, Transformers & Predictors", { contentDir: "ch01/02-estimators-transformers-and-predictors" }),
      L(3, "preprocessing-with-columntransformer", "Preprocessing With ColumnTransformer", { contentDir: "ch01/03-preprocessing-with-columntransformer" }),
      L(4, "pipelines", "Pipelines", { contentDir: "ch01/04-pipelines" }),
      L(5, "saving-and-loading-models", "Saving & Loading Models", { contentDir: "ch01/05-saving-and-loading-models" }),
    ],
  },
  {
    n: 2,
    title: "Evaluating Models",
    lessons: [
      L(6, "classification-metrics-accuracy-precision-and-recall", "Classification Metrics: Accuracy, Precision & Recall", { contentDir: "ch02/06-classification-metrics-accuracy-precision-and-recall" }),
      L(7, "f1-roc-and-auc", "F1, ROC & AUC", { contentDir: "ch02/07-f1-roc-and-auc" }),
      L(8, "confusion-matrices-and-thresholds", "Confusion Matrices & Thresholds", { contentDir: "ch02/08-confusion-matrices-and-thresholds" }),
      L(9, "regression-metrics-in-practice", "Regression Metrics in Practice", { contentDir: "ch02/09-regression-metrics-in-practice" }),
      L(10, "cross-validation", "Cross-Validation", { contentDir: "ch02/10-cross-validation" }),
      L(11, "learning-curves-and-diagnostics", "Learning Curves & Diagnostics", { contentDir: "ch02/11-learning-curves-and-diagnostics" }),
    ],
  },
  {
    n: 3,
    title: "Tuning Models",
    lessons: [
      L(12, "hyperparameters-vs-parameters", "Hyperparameters vs. Parameters", { contentDir: "ch03/12-hyperparameters-vs-parameters" }),
      L(13, "grid-search", "Grid Search", { contentDir: "ch03/13-grid-search" }),
      L(14, "random-and-bayesian-search", "Random & Bayesian Search", { contentDir: "ch03/14-random-and-bayesian-search" }),
      L(15, "avoiding-overfitting-the-validation-set", "Avoiding Overfitting the Validation Set", { contentDir: "ch03/15-avoiding-overfitting-the-validation-set" }),
      L(16, "comparing-models-fairly", "Comparing Models Fairly", { contentDir: "ch03/16-comparing-models-fairly" }),
    ],
  },
  {
    n: 4,
    title: "Imbalanced & Messy Data",
    lessons: [
      L(17, "understanding-class-imbalance", "Understanding Class Imbalance", { contentDir: "ch04/17-understanding-class-imbalance" }),
      L(18, "resampling-smote-and-undersampling", "Resampling: SMOTE & Undersampling", { contentDir: "ch04/18-resampling-smote-and-undersampling" }),
      L(19, "class-weights-and-cost-sensitive-learning", "Class Weights & Cost-Sensitive Learning", { contentDir: "ch04/19-class-weights-and-cost-sensitive-learning" }),
      L(20, "missing-data-in-pipelines", "Missing Data in Pipelines", { contentDir: "ch04/20-missing-data-in-pipelines" }),
    ],
  },
  {
    n: 5,
    title: "Applied Projects",
    lessons: [
      L(21, "churn-prediction-walkthrough", "Churn Prediction Walkthrough", { contentDir: "ch05/21-churn-prediction-walkthrough" }),
      L(22, "price-prediction-walkthrough", "Price Prediction Walkthrough", { contentDir: "ch05/22-price-prediction-walkthrough" }),
      L(23, "fraud-detection-walkthrough", "Fraud Detection Walkthrough", { contentDir: "ch05/23-fraud-detection-walkthrough" }),
      L(24, "documenting-a-modeling-project", "Documenting a Modeling Project", { contentDir: "ch05/24-documenting-a-modeling-project" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(25, "capstone-kickoff-build-and-defend-a-prediction-model", "Capstone Kickoff: Build and Defend a Prediction Model", { contentDir: "ch06/25-capstone-kickoff-build-and-defend-a-prediction-model" }),
      L(26, "capstone-build-it", "Capstone: Build It", { contentDir: "ch06/26-capstone-build-it" }),
      L(27, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/27-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
