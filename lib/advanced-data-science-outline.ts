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
      L(1, "gradient-boosting-explained", "Gradient Boosting Explained", { contentDir: "ch01/01-gradient-boosting-explained" }),
      L(2, "xgboost", "XGBoost", { contentDir: "ch01/02-xgboost" }),
      L(3, "lightgbm-and-catboost", "LightGBM & CatBoost", { contentDir: "ch01/03-lightgbm-and-catboost" }),
      L(4, "tuning-boosted-models", "Tuning Boosted Models", { contentDir: "ch01/04-tuning-boosted-models" }),
      L(5, "boosting-vs-random-forests", "Boosting vs. Random Forests", { contentDir: "ch01/05-boosting-vs-random-forests" }),
    ],
  },
  {
    n: 2,
    title: "Time-Series Forecasting",
    lessons: [
      L(6, "time-series-components", "Time Series Components", { contentDir: "ch02/06-time-series-components" }),
      L(7, "stationarity-and-autocorrelation", "Stationarity & Autocorrelation", { contentDir: "ch02/07-stationarity-and-autocorrelation" }),
      L(8, "baselines-and-naive-forecasts", "Baselines & Naive Forecasts", { contentDir: "ch02/08-baselines-and-naive-forecasts" }),
      L(9, "exponential-smoothing-and-arima", "Exponential Smoothing & ARIMA", { contentDir: "ch02/09-exponential-smoothing-and-arima" }),
      L(10, "prophet", "Prophet", { contentDir: "ch02/10-prophet" }),
      L(11, "forecasting-with-machine-learning", "Forecasting With Machine Learning", { contentDir: "ch02/11-forecasting-with-machine-learning" }),
      L(12, "evaluating-forecasts", "Evaluating Forecasts", { contentDir: "ch02/12-evaluating-forecasts" }),
    ],
  },
  {
    n: 3,
    title: "NLP Fundamentals",
    lessons: [
      L(13, "text-cleaning-and-tokenization", "Text Cleaning & Tokenization", { contentDir: "ch03/13-text-cleaning-and-tokenization" }),
      L(14, "bag-of-words-and-tf-idf", "Bag-of-Words & TF-IDF", { contentDir: "ch03/14-bag-of-words-and-tf-idf" }),
      L(15, "text-classification", "Text Classification", { contentDir: "ch03/15-text-classification" }),
      L(16, "sentiment-analysis", "Sentiment Analysis", { contentDir: "ch03/16-sentiment-analysis" }),
      L(17, "topic-modeling", "Topic Modeling", { contentDir: "ch03/17-topic-modeling" }),
    ],
  },
  {
    n: 4,
    title: "Recommendation Systems",
    lessons: [
      L(18, "how-recommenders-work", "How Recommenders Work", { contentDir: "ch04/18-how-recommenders-work" }),
      L(19, "collaborative-filtering", "Collaborative Filtering", { contentDir: "ch04/19-collaborative-filtering" }),
      L(20, "content-based-recommendation", "Content-Based Recommendation", { contentDir: "ch04/20-content-based-recommendation" }),
      L(21, "evaluating-recommenders", "Evaluating Recommenders", { contentDir: "ch04/21-evaluating-recommenders" }),
    ],
  },
  {
    n: 5,
    title: "Model Explainability",
    lessons: [
      L(22, "why-explainability-matters", "Why Explainability Matters", { contentDir: "ch05/22-why-explainability-matters" }),
      L(23, "feature-importance-and-permutation-importance", "Feature Importance & Permutation Importance", { contentDir: "ch05/23-feature-importance-and-permutation-importance" }),
      L(24, "shap", "SHAP", { contentDir: "ch05/24-shap" }),
      L(25, "communicating-model-decisions", "Communicating Model Decisions", { contentDir: "ch05/25-communicating-model-decisions" }),
      L(26, "fairness-and-bias-in-models", "Fairness & Bias in Models", { contentDir: "ch05/26-fairness-and-bias-in-models" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(27, "capstone-kickoff-forecast-and-explain-a-business-outcome", "Capstone Kickoff: Forecast and Explain a Business Outcome", { contentDir: "ch06/27-capstone-kickoff-forecast-and-explain-a-business-outcome" }),
      L(28, "capstone-build-it", "Capstone: Build It", { contentDir: "ch06/28-capstone-build-it" }),
      L(29, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/29-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
