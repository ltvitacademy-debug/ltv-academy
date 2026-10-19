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
      L(1, "the-scikit-learn-api", "The scikit-learn API", { contentDir: "ch01/01-the-scikit-learn-api", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417639/ltv-applied-machine-learning/the-scikit-learn-api.mp4", durationLabel: "1 min 53 s" }),
      L(2, "estimators-transformers-and-predictors", "Estimators, Transformers & Predictors", { contentDir: "ch01/02-estimators-transformers-and-predictors", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418036/ltv-applied-machine-learning/estimators-transformers-and-predictors.mp4", durationLabel: "1 min 57 s" }),
      L(3, "preprocessing-with-columntransformer", "Preprocessing With ColumnTransformer", { contentDir: "ch01/03-preprocessing-with-columntransformer", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418364/ltv-applied-machine-learning/preprocessing-with-columntransformer.mp4", durationLabel: "2 min 1 s" }),
      L(4, "pipelines", "Pipelines", { contentDir: "ch01/04-pipelines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792418840/ltv-applied-machine-learning/pipelines.mp4", durationLabel: "2 min 13 s" }),
      L(5, "saving-and-loading-models", "Saving & Loading Models", { contentDir: "ch01/05-saving-and-loading-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419195/ltv-applied-machine-learning/saving-and-loading-models.mp4", durationLabel: "2 min 5 s" }),
    ],
  },
  {
    n: 2,
    title: "Evaluating Models",
    lessons: [
      L(6, "classification-metrics-accuracy-precision-and-recall", "Classification Metrics: Accuracy, Precision & Recall", { contentDir: "ch02/06-classification-metrics-accuracy-precision-and-recall", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792419716/ltv-applied-machine-learning/classification-metrics-accuracy-precision-and-recall.mp4", durationLabel: "2 min 14 s" }),
      L(7, "f1-roc-and-auc", "F1, ROC & AUC", { contentDir: "ch02/07-f1-roc-and-auc", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420239/ltv-applied-machine-learning/f1-roc-and-auc.mp4", durationLabel: "2 min 12 s" }),
      L(8, "confusion-matrices-and-thresholds", "Confusion Matrices & Thresholds", { contentDir: "ch02/08-confusion-matrices-and-thresholds", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420590/ltv-applied-machine-learning/confusion-matrices-and-thresholds.mp4", durationLabel: "2 min 12 s" }),
      L(9, "regression-metrics-in-practice", "Regression Metrics in Practice", { contentDir: "ch02/09-regression-metrics-in-practice", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792420898/ltv-applied-machine-learning/regression-metrics-in-practice.mp4", durationLabel: "2 min 10 s" }),
      L(10, "cross-validation", "Cross-Validation", { contentDir: "ch02/10-cross-validation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421240/ltv-applied-machine-learning/cross-validation.mp4", durationLabel: "2 min 14 s" }),
      L(11, "learning-curves-and-diagnostics", "Learning Curves & Diagnostics", { contentDir: "ch02/11-learning-curves-and-diagnostics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792421735/ltv-applied-machine-learning/learning-curves-and-diagnostics.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 3,
    title: "Tuning Models",
    lessons: [
      L(12, "hyperparameters-vs-parameters", "Hyperparameters vs. Parameters", { contentDir: "ch03/12-hyperparameters-vs-parameters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422158/ltv-applied-machine-learning/hyperparameters-vs-parameters.mp4", durationLabel: "2 min 20 s" }),
      L(13, "grid-search", "Grid Search", { contentDir: "ch03/13-grid-search", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422518/ltv-applied-machine-learning/grid-search.mp4", durationLabel: "2 min 35 s" }),
      L(14, "random-and-bayesian-search", "Random & Bayesian Search", { contentDir: "ch03/14-random-and-bayesian-search", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792422857/ltv-applied-machine-learning/random-and-bayesian-search.mp4", durationLabel: "2 min 32 s" }),
      L(15, "avoiding-overfitting-the-validation-set", "Avoiding Overfitting the Validation Set", { contentDir: "ch03/15-avoiding-overfitting-the-validation-set", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423131/ltv-applied-machine-learning/avoiding-overfitting-the-validation-set.mp4", durationLabel: "2 min 4 s" }),
      L(16, "comparing-models-fairly", "Comparing Models Fairly", { contentDir: "ch03/16-comparing-models-fairly", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423439/ltv-applied-machine-learning/comparing-models-fairly.mp4", durationLabel: "2 min 3 s" }),
    ],
  },
  {
    n: 4,
    title: "Imbalanced & Messy Data",
    lessons: [
      L(17, "understanding-class-imbalance", "Understanding Class Imbalance", { contentDir: "ch04/17-understanding-class-imbalance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792423855/ltv-applied-machine-learning/understanding-class-imbalance.mp4", durationLabel: "2 min 16 s" }),
      L(18, "resampling-smote-and-undersampling", "Resampling: SMOTE & Undersampling", { contentDir: "ch04/18-resampling-smote-and-undersampling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792425469/ltv-applied-machine-learning/resampling-smote-and-undersampling.mp4", durationLabel: "2 min 16 s" }),
      L(19, "class-weights-and-cost-sensitive-learning", "Class Weights & Cost-Sensitive Learning", { contentDir: "ch04/19-class-weights-and-cost-sensitive-learning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426502/ltv-applied-machine-learning/class-weights-and-cost-sensitive-learning.mp4", durationLabel: "2 min 24 s" }),
      L(20, "missing-data-in-pipelines", "Missing Data in Pipelines", { contentDir: "ch04/20-missing-data-in-pipelines", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427411/ltv-applied-machine-learning/missing-data-in-pipelines.mp4", durationLabel: "2 min 25 s" }),
    ],
  },
  {
    n: 5,
    title: "Applied Projects",
    lessons: [
      L(21, "churn-prediction-walkthrough", "Churn Prediction Walkthrough", { contentDir: "ch05/21-churn-prediction-walkthrough", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792426771/ltv-applied-machine-learning/churn-prediction-walkthrough.mp4", durationLabel: "2 min 20 s" }),
      L(22, "price-prediction-walkthrough", "Price Prediction Walkthrough", { contentDir: "ch05/22-price-prediction-walkthrough", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792427700/ltv-applied-machine-learning/price-prediction-walkthrough.mp4", durationLabel: "2 min 14 s" }),
      L(23, "fraud-detection-walkthrough", "Fraud Detection Walkthrough", { contentDir: "ch05/23-fraud-detection-walkthrough", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428443/ltv-applied-machine-learning/fraud-detection-walkthrough.mp4", durationLabel: "2 min 23 s" }),
      L(24, "documenting-a-modeling-project", "Documenting a Modeling Project", { contentDir: "ch05/24-documenting-a-modeling-project", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792429468/ltv-applied-machine-learning/documenting-a-modeling-project.mp4", durationLabel: "2 min 28 s" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(25, "capstone-kickoff-build-and-defend-a-prediction-model", "Capstone Kickoff: Build and Defend a Prediction Model", { contentDir: "ch06/25-capstone-kickoff-build-and-defend-a-prediction-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792428657/ltv-applied-machine-learning/capstone-kickoff-build-and-defend-a-prediction-model.mp4", durationLabel: "2 min 8 s" }),
      L(26, "capstone-build-it", "Capstone: Build It", { contentDir: "ch06/26-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792429561/ltv-applied-machine-learning/capstone-build-it.mp4", durationLabel: "2 min 24 s" }),
      L(27, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/27-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792430287/ltv-applied-machine-learning/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "2 min 11 s" }),
    ],
  },
];
