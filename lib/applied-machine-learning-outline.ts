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
      L(1, "the-scikit-learn-api", "The scikit-learn API"),
      L(2, "estimators-transformers-and-predictors", "Estimators, Transformers & Predictors"),
      L(3, "preprocessing-with-columntransformer", "Preprocessing With ColumnTransformer"),
      L(4, "pipelines", "Pipelines"),
      L(5, "saving-and-loading-models", "Saving & Loading Models"),
    ],
  },
  {
    n: 2,
    title: "Evaluating Models",
    lessons: [
      L(6, "classification-metrics-accuracy-precision-and-recall", "Classification Metrics: Accuracy, Precision & Recall"),
      L(7, "f1-roc-and-auc", "F1, ROC & AUC"),
      L(8, "confusion-matrices-and-thresholds", "Confusion Matrices & Thresholds"),
      L(9, "regression-metrics-in-practice", "Regression Metrics in Practice"),
      L(10, "cross-validation", "Cross-Validation"),
      L(11, "learning-curves-and-diagnostics", "Learning Curves & Diagnostics"),
    ],
  },
  {
    n: 3,
    title: "Tuning Models",
    lessons: [
      L(12, "hyperparameters-vs-parameters", "Hyperparameters vs. Parameters"),
      L(13, "grid-search", "Grid Search"),
      L(14, "random-and-bayesian-search", "Random & Bayesian Search"),
      L(15, "avoiding-overfitting-the-validation-set", "Avoiding Overfitting the Validation Set"),
      L(16, "comparing-models-fairly", "Comparing Models Fairly"),
    ],
  },
  {
    n: 4,
    title: "Imbalanced & Messy Data",
    lessons: [
      L(17, "understanding-class-imbalance", "Understanding Class Imbalance"),
      L(18, "resampling-smote-and-undersampling", "Resampling: SMOTE & Undersampling"),
      L(19, "class-weights-and-cost-sensitive-learning", "Class Weights & Cost-Sensitive Learning"),
      L(20, "missing-data-in-pipelines", "Missing Data in Pipelines"),
    ],
  },
  {
    n: 5,
    title: "Applied Projects",
    lessons: [
      L(21, "churn-prediction-walkthrough", "Churn Prediction Walkthrough"),
      L(22, "price-prediction-walkthrough", "Price Prediction Walkthrough"),
      L(23, "fraud-detection-walkthrough", "Fraud Detection Walkthrough"),
      L(24, "documenting-a-modeling-project", "Documenting a Modeling Project"),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(25, "capstone-kickoff-build-and-defend-a-prediction-model", "Capstone Kickoff: Build and Defend a Prediction Model"),
      L(26, "capstone-build-it", "Capstone: Build It"),
      L(27, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
