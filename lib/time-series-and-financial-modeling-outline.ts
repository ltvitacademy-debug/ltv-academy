// The Time Series & Financial Modeling course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 5 of the Quantitative Developer / Researcher path. Goes well past the time-series basics in Advanced Data Science, into the models financial data specifically demands.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/time-series-and-financial-modeling/
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

export const TIME_SERIES_AND_FINANCIAL_MODELING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Financial Data & Returns",
    lessons: [
      L(1, "prices-returns-and-log-returns", "Prices, Returns & Log Returns"),
      L(2, "adjusting-for-splits-and-dividends", "Adjusting for Splits & Dividends"),
      L(3, "stylized-facts-of-financial-returns", "Stylized Facts of Financial Returns"),
      L(4, "survivorship-and-other-data-biases", "Survivorship & Other Data Biases"),
      L(5, "cleaning-market-data", "Cleaning Market Data"),
    ],
  },
  {
    n: 2,
    title: "Time Series Foundations",
    lessons: [
      L(6, "stationarity-and-unit-roots", "Stationarity & Unit Roots"),
      L(7, "autocorrelation-and-partial-autocorrelation", "Autocorrelation & Partial Autocorrelation"),
      L(8, "white-noise-and-random-walks", "White Noise & Random Walks"),
      L(9, "cointegration-and-pairs", "Cointegration & Pairs"),
      L(10, "testing-and-diagnostics", "Testing & Diagnostics"),
    ],
  },
  {
    n: 3,
    title: "Linear Time Series Models",
    lessons: [
      L(11, "ar-ma-and-arma-models", "AR, MA & ARMA Models"),
      L(12, "arima-and-seasonal-models", "ARIMA & Seasonal Models"),
      L(13, "model-selection-and-diagnostics", "Model Selection & Diagnostics"),
      L(14, "forecasting-and-forecast-evaluation", "Forecasting & Forecast Evaluation"),
      L(15, "vector-autoregression", "Vector Autoregression"),
    ],
  },
  {
    n: 4,
    title: "Volatility Modeling",
    lessons: [
      L(16, "realized-and-historical-volatility", "Realized & Historical Volatility"),
      L(17, "arch-and-garch-models", "ARCH & GARCH Models"),
      L(18, "garch-extensions", "GARCH Extensions"),
      L(19, "stochastic-volatility-overview", "Stochastic Volatility Overview"),
      L(20, "volatility-forecasting-in-practice", "Volatility Forecasting in Practice"),
    ],
  },
  {
    n: 5,
    title: "Factor Models & Cross-Sectional Analysis",
    lessons: [
      L(21, "fama-french-and-factor-investing", "Fama-French & Factor Investing"),
      L(22, "building-factors-from-raw-data", "Building Factors From Raw Data"),
      L(23, "cross-sectional-regression", "Cross-Sectional Regression"),
      L(24, "risk-models-and-covariance-estimation", "Risk Models & Covariance Estimation"),
      L(25, "shrinkage-and-robust-covariance", "Shrinkage & Robust Covariance"),
    ],
  },
  {
    n: 6,
    title: "State-Space & Advanced Models",
    lessons: [
      L(26, "state-space-models-and-the-kalman-filter", "State-Space Models & the Kalman Filter"),
      L(27, "regime-switching-models", "Regime-Switching Models"),
      L(28, "copulas-and-dependence-overview", "Copulas & Dependence Overview"),
    ],
  },
  {
    n: 7,
    title: "Financial Feature Engineering",
    lessons: [
      L(29, "technical-indicators-and-their-pitfalls", "Technical Indicators & Their Pitfalls"),
      L(30, "fundamental-and-alternative-data-features", "Fundamental & Alternative Data Features"),
      L(31, "feature-stationarity-and-normalization", "Feature Stationarity & Normalization"),
      L(32, "avoiding-leakage-in-time-aware-features", "Avoiding Leakage in Time-Aware Features"),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(33, "capstone-kickoff-model-returns-and-volatility-for-a-universe-of-assets", "Capstone Kickoff: Model Returns and Volatility for a Universe of Assets"),
      L(34, "capstone-build-it", "Capstone: Build It"),
      L(35, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
