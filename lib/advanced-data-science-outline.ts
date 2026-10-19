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
      L(1, "gradient-boosting-explained", "Gradient Boosting Explained", { contentDir: "ch01/01-gradient-boosting-explained", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792407889/ltv-advanced-data-science/gradient-boosting-explained.mp4", durationLabel: "2 min 25 s" }),
      L(2, "xgboost", "XGBoost", { contentDir: "ch01/02-xgboost", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408176/ltv-advanced-data-science/xgboost.mp4", durationLabel: "2 min 41 s" }),
      L(3, "lightgbm-and-catboost", "LightGBM & CatBoost", { contentDir: "ch01/03-lightgbm-and-catboost", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408506/ltv-advanced-data-science/lightgbm-and-catboost.mp4", durationLabel: "2 min 48 s" }),
      L(4, "tuning-boosted-models", "Tuning Boosted Models", { contentDir: "ch01/04-tuning-boosted-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792408865/ltv-advanced-data-science/tuning-boosted-models.mp4", durationLabel: "2 min 56 s" }),
      L(5, "boosting-vs-random-forests", "Boosting vs. Random Forests", { contentDir: "ch01/05-boosting-vs-random-forests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409234/ltv-advanced-data-science/boosting-vs-random-forests.mp4", durationLabel: "2 min 44 s" }),
    ],
  },
  {
    n: 2,
    title: "Time-Series Forecasting",
    lessons: [
      L(6, "time-series-components", "Time Series Components", { contentDir: "ch02/06-time-series-components", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409597/ltv-advanced-data-science/time-series-components.mp4", durationLabel: "2 min 47 s" }),
      L(7, "stationarity-and-autocorrelation", "Stationarity & Autocorrelation", { contentDir: "ch02/07-stationarity-and-autocorrelation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792409953/ltv-advanced-data-science/stationarity-and-autocorrelation.mp4", durationLabel: "2 min 51 s" }),
      L(8, "baselines-and-naive-forecasts", "Baselines & Naive Forecasts", { contentDir: "ch02/08-baselines-and-naive-forecasts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410290/ltv-advanced-data-science/baselines-and-naive-forecasts.mp4", durationLabel: "2 min 27 s" }),
      L(9, "exponential-smoothing-and-arima", "Exponential Smoothing & ARIMA", { contentDir: "ch02/09-exponential-smoothing-and-arima", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410638/ltv-advanced-data-science/exponential-smoothing-and-arima.mp4", durationLabel: "2 min 48 s" }),
      L(10, "prophet", "Prophet", { contentDir: "ch02/10-prophet", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792410976/ltv-advanced-data-science/prophet.mp4", durationLabel: "2 min 45 s" }),
      L(11, "forecasting-with-machine-learning", "Forecasting With Machine Learning", { contentDir: "ch02/11-forecasting-with-machine-learning", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411268/ltv-advanced-data-science/forecasting-with-machine-learning.mp4", durationLabel: "2 min 2 s" }),
      L(12, "evaluating-forecasts", "Evaluating Forecasts", { contentDir: "ch02/12-evaluating-forecasts", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411572/ltv-advanced-data-science/evaluating-forecasts.mp4", durationLabel: "2 min 19 s" }),
    ],
  },
  {
    n: 3,
    title: "NLP Fundamentals",
    lessons: [
      L(13, "text-cleaning-and-tokenization", "Text Cleaning & Tokenization", { contentDir: "ch03/13-text-cleaning-and-tokenization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792411914/ltv-advanced-data-science/text-cleaning-and-tokenization.mp4", durationLabel: "1 min 59 s" }),
      L(14, "bag-of-words-and-tf-idf", "Bag-of-Words & TF-IDF", { contentDir: "ch03/14-bag-of-words-and-tf-idf", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412209/ltv-advanced-data-science/bag-of-words-and-tf-idf.mp4", durationLabel: "2 min 13 s" }),
      L(15, "text-classification", "Text Classification", { contentDir: "ch03/15-text-classification", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412488/ltv-advanced-data-science/text-classification.mp4", durationLabel: "2 min 9 s" }),
      L(16, "sentiment-analysis", "Sentiment Analysis", { contentDir: "ch03/16-sentiment-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792412782/ltv-advanced-data-science/sentiment-analysis.mp4", durationLabel: "2 min 9 s" }),
      L(17, "topic-modeling", "Topic Modeling", { contentDir: "ch03/17-topic-modeling", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413033/ltv-advanced-data-science/topic-modeling.mp4", durationLabel: "1 min 55 s" }),
    ],
  },
  {
    n: 4,
    title: "Recommendation Systems",
    lessons: [
      L(18, "how-recommenders-work", "How Recommenders Work", { contentDir: "ch04/18-how-recommenders-work", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413311/ltv-advanced-data-science/how-recommenders-work.mp4", durationLabel: "1 min 57 s" }),
      L(19, "collaborative-filtering", "Collaborative Filtering", { contentDir: "ch04/19-collaborative-filtering", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413567/ltv-advanced-data-science/collaborative-filtering.mp4", durationLabel: "1 min 52 s" }),
      L(20, "content-based-recommendation", "Content-Based Recommendation", { contentDir: "ch04/20-content-based-recommendation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792413826/ltv-advanced-data-science/content-based-recommendation.mp4", durationLabel: "1 min 58 s" }),
      L(21, "evaluating-recommenders", "Evaluating Recommenders", { contentDir: "ch04/21-evaluating-recommenders", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414083/ltv-advanced-data-science/evaluating-recommenders.mp4", durationLabel: "2 min 2 s" }),
    ],
  },
  {
    n: 5,
    title: "Model Explainability",
    lessons: [
      L(22, "why-explainability-matters", "Why Explainability Matters", { contentDir: "ch05/22-why-explainability-matters", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414402/ltv-advanced-data-science/why-explainability-matters.mp4", durationLabel: "1 min 56 s" }),
      L(23, "feature-importance-and-permutation-importance", "Feature Importance & Permutation Importance", { contentDir: "ch05/23-feature-importance-and-permutation-importance", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414670/ltv-advanced-data-science/feature-importance-and-permutation-importance.mp4", durationLabel: "1 min 57 s" }),
      L(24, "shap", "SHAP", { contentDir: "ch05/24-shap", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792414951/ltv-advanced-data-science/shap.mp4", durationLabel: "2 min 6 s" }),
      L(25, "communicating-model-decisions", "Communicating Model Decisions", { contentDir: "ch05/25-communicating-model-decisions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415289/ltv-advanced-data-science/communicating-model-decisions.mp4", durationLabel: "2 min 6 s" }),
      L(26, "fairness-and-bias-in-models", "Fairness & Bias in Models", { contentDir: "ch05/26-fairness-and-bias-in-models", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792415725/ltv-advanced-data-science/fairness-and-bias-in-models.mp4", durationLabel: "1 min 58 s" }),
    ],
  },
  {
    n: 6,
    title: "Capstone",
    lessons: [
      L(27, "capstone-kickoff-forecast-and-explain-a-business-outcome", "Capstone Kickoff: Forecast and Explain a Business Outcome", { contentDir: "ch06/27-capstone-kickoff-forecast-and-explain-a-business-outcome", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416260/ltv-advanced-data-science/capstone-kickoff-forecast-and-explain-a-business-outcome.mp4", durationLabel: "2 min 7 s" }),
      L(28, "capstone-build-it", "Capstone: Build It", { contentDir: "ch06/28-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792416700/ltv-advanced-data-science/capstone-build-it.mp4", durationLabel: "2 min 10 s" }),
      L(29, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch06/29-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792417135/ltv-advanced-data-science/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "2 min 15 s" }),
    ],
  },
];
