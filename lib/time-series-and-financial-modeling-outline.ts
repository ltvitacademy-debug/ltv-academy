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
      L(1, "prices-returns-and-log-returns", "Prices, Returns & Log Returns", { contentDir: "ch01/01-prices-returns-and-log-returns" }),
      L(2, "adjusting-for-splits-and-dividends", "Adjusting for Splits & Dividends", { contentDir: "ch01/02-adjusting-for-splits-and-dividends" }),
      L(3, "stylized-facts-of-financial-returns", "Stylized Facts of Financial Returns", { contentDir: "ch01/03-stylized-facts-of-financial-returns" }),
      L(4, "survivorship-and-other-data-biases", "Survivorship & Other Data Biases", { contentDir: "ch01/04-survivorship-and-other-data-biases" }),
      L(5, "cleaning-market-data", "Cleaning Market Data", { contentDir: "ch01/05-cleaning-market-data" }),
    ],
  },
  {
    n: 2,
    title: "Time Series Foundations",
    lessons: [
      L(6, "stationarity-and-unit-roots", "Stationarity & Unit Roots", { contentDir: "ch02/06-stationarity-and-unit-roots" }),
      L(7, "autocorrelation-and-partial-autocorrelation", "Autocorrelation & Partial Autocorrelation", { contentDir: "ch02/07-autocorrelation-and-partial-autocorrelation" }),
      L(8, "white-noise-and-random-walks", "White Noise & Random Walks", { contentDir: "ch02/08-white-noise-and-random-walks" }),
      L(9, "cointegration-and-pairs", "Cointegration & Pairs", { contentDir: "ch02/09-cointegration-and-pairs" }),
      L(10, "testing-and-diagnostics", "Testing & Diagnostics", { contentDir: "ch02/10-testing-and-diagnostics" }),
    ],
  },
  {
    n: 3,
    title: "Linear Time Series Models",
    lessons: [
      L(11, "ar-ma-and-arma-models", "AR, MA & ARMA Models", { contentDir: "ch03/11-ar-ma-and-arma-models" }),
      L(12, "arima-and-seasonal-models", "ARIMA & Seasonal Models", { contentDir: "ch03/12-arima-and-seasonal-models" }),
      L(13, "model-selection-and-diagnostics", "Model Selection & Diagnostics", { contentDir: "ch03/13-model-selection-and-diagnostics" }),
      L(14, "forecasting-and-forecast-evaluation", "Forecasting & Forecast Evaluation", { contentDir: "ch03/14-forecasting-and-forecast-evaluation" }),
      L(15, "vector-autoregression", "Vector Autoregression", { contentDir: "ch03/15-vector-autoregression" }),
    ],
  },
  {
    n: 4,
    title: "Volatility Modeling",
    lessons: [
      L(16, "realized-and-historical-volatility", "Realized & Historical Volatility", { contentDir: "ch04/16-realized-and-historical-volatility" }),
      L(17, "arch-and-garch-models", "ARCH & GARCH Models", { contentDir: "ch04/17-arch-and-garch-models" }),
      L(18, "garch-extensions", "GARCH Extensions", { contentDir: "ch04/18-garch-extensions" }),
      L(19, "stochastic-volatility-overview", "Stochastic Volatility Overview", { contentDir: "ch04/19-stochastic-volatility-overview" }),
      L(20, "volatility-forecasting-in-practice", "Volatility Forecasting in Practice", { contentDir: "ch04/20-volatility-forecasting-in-practice" }),
    ],
  },
  {
    n: 5,
    title: "Factor Models & Cross-Sectional Analysis",
    lessons: [
      L(21, "fama-french-and-factor-investing", "Fama-French & Factor Investing", { contentDir: "ch05/21-fama-french-and-factor-investing" }),
      L(22, "building-factors-from-raw-data", "Building Factors From Raw Data", { contentDir: "ch05/22-building-factors-from-raw-data" }),
      L(23, "cross-sectional-regression", "Cross-Sectional Regression", { contentDir: "ch05/23-cross-sectional-regression" }),
      L(24, "risk-models-and-covariance-estimation", "Risk Models & Covariance Estimation", { contentDir: "ch05/24-risk-models-and-covariance-estimation" }),
      L(25, "shrinkage-and-robust-covariance", "Shrinkage & Robust Covariance", { contentDir: "ch05/25-shrinkage-and-robust-covariance" }),
    ],
  },
  {
    n: 6,
    title: "State-Space & Advanced Models",
    lessons: [
      L(26, "state-space-models-and-the-kalman-filter", "State-Space Models & the Kalman Filter", { contentDir: "ch06/26-state-space-models-and-the-kalman-filter" }),
      L(27, "regime-switching-models", "Regime-Switching Models", { contentDir: "ch06/27-regime-switching-models" }),
      L(28, "copulas-and-dependence-overview", "Copulas & Dependence Overview", { contentDir: "ch06/28-copulas-and-dependence-overview" }),
    ],
  },
  {
    n: 7,
    title: "Financial Feature Engineering",
    lessons: [
      L(29, "technical-indicators-and-their-pitfalls", "Technical Indicators & Their Pitfalls", { contentDir: "ch07/29-technical-indicators-and-their-pitfalls" }),
      L(30, "fundamental-and-alternative-data-features", "Fundamental & Alternative Data Features", { contentDir: "ch07/30-fundamental-and-alternative-data-features" }),
      L(31, "feature-stationarity-and-normalization", "Feature Stationarity & Normalization", { contentDir: "ch07/31-feature-stationarity-and-normalization" }),
      L(32, "avoiding-leakage-in-time-aware-features", "Avoiding Leakage in Time-Aware Features", { contentDir: "ch07/32-avoiding-leakage-in-time-aware-features" }),
    ],
  },
  {
    n: 8,
    title: "Capstone",
    lessons: [
      L(33, "capstone-kickoff-model-returns-and-volatility-for-a-universe-of-assets", "Capstone Kickoff: Model Returns and Volatility for a Universe of Assets", { contentDir: "ch08/33-capstone-kickoff-model-returns-and-volatility-for-a-universe-of-assets" }),
      L(34, "capstone-build-it", "Capstone: Build It", { contentDir: "ch08/34-capstone-build-it" }),
      L(35, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch08/35-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
