// The Advanced Data Science course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 7 of the Data Scientist path. The specializations that separate junior from senior candidates; assumes Applied Machine Learning.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/advanced-data-science/
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

export const ADVANCED_DATA_SCIENCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Boosting",
    lessons: [
      L(1, "gradient-boosting-explained", "Gradient Boosting Explained"),
      L(2, "xgboost", "XGBoost"),
      L(3, "lightgbm-and-catboost", "LightGBM & CatBoost"),
      L(4, "tuning-boosted-models", "Tuning Boosted Models"),
      L(5, "boosting-vs-random-forests", "Boosting vs. Random Forests"),
    ],
  },
  {
    n: 2,
    title: "Time-Series Forecasting",
    lessons: [
      L(6, "time-series-components", "Time Series Components"),
      L(7, "stationarity-and-autocorrelation", "Stationarity & Autocorrelation"),
      L(8, "baselines-and-naive-forecasts", "Baselines & Naive Forecasts"),
      L(9, "exponential-smoothing-and-arima", "Exponential Smoothing & ARIMA"),
      L(10, "prophet", "Prophet"),
      L(11, "forecasting-with-machine-learning", "Forecasting With Machine Learning"),
      L(12, "evaluating-forecasts", "Evaluating Forecasts"),
    ],
  },
  {
    n: 3,
    title: "NLP Fundamentals",
    lessons: [
      L(13, "text-cleaning-and-tokenization", "Text Cleaning & Tokenization"),
      L(14, "bag-of-words-and-tf-idf", "Bag-of-Words & TF-IDF"),
      L(15, "text-classification", "Text Classification"),
      L(16, "sentiment-analysis", "Sentiment Analysis"),
      L(17, "topic-modeling", "Topic Modeling"),
    ],
  },
  {
    n: 4,
    title: "Recommendation Systems",
    lessons: [
      L(18, "how-recommenders-work", "How Recommenders Work"),
      L(19, "collaborative-filtering", "Collaborative Filtering"),
      L(20, "content-based-recommendation", "Content-Based Recommendation"),
      L(21, "evaluating-recommenders", "Evaluating Recommenders"),
    ],
  },
  {
    n: 5,
    title: "Model Explainability",
    lessons: [
      L(22, "why-explainability-matters", "Why Explainability Matters"),
      L(23, "feature-importance-and-permutation-importance", "Feature Importance & Permutation Importance"),
      L(24, "shap", "SHAP"),
      L(25, "communicating-model-decisions", "Communicating Model Decisions"),
      L(26, "fairness-and-bias-in-models", "Fairness & Bias in Models"),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(27, "capstone-kickoff-forecast-and-explain-a-business-outcome", "Capstone Kickoff: Forecast and Explain a Business Outcome"),
      L(28, "capstone-build-it", "Capstone: Build It"),
      L(29, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
