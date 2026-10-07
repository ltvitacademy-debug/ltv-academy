// The Machine Learning for Quantitative Finance course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 6 of the Quantitative Developer / Researcher path. Assumes the Data Scientist path's ML courses; the focus is what changes in finance: low signal-to-noise, non-stationarity, and the constant danger of overfitting.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/machine-learning-for-quant-finance/
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

export const MACHINE_LEARNING_FOR_QUANT_FINANCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Why Finance Is Different",
    lessons: [
      L(1, "low-signal-to-noise-and-non-stationarity", "Low Signal-to-Noise & Non-Stationarity", { contentDir: "ch01/01-low-signal-to-noise-and-non-stationarity" }),
      L(2, "the-overfitting-problem-in-finance", "The Overfitting Problem in Finance", { contentDir: "ch01/02-the-overfitting-problem-in-finance" }),
      L(3, "labeling-financial-data", "Labeling Financial Data", { contentDir: "ch01/03-labeling-financial-data" }),
      L(4, "sample-weights-and-overlapping-outcomes", "Sample Weights & Overlapping Outcomes", { contentDir: "ch01/04-sample-weights-and-overlapping-outcomes" }),
    ],
  },
  {
    n: 2,
    title: "Supervised Learning for Returns",
    lessons: [
      L(5, "regularized-linear-models", "Regularized Linear Models", { contentDir: "ch02/05-regularized-linear-models" }),
      L(6, "tree-based-models", "Tree-Based Models", { contentDir: "ch02/06-tree-based-models" }),
      L(7, "gradient-boosting-on-financial-features", "Gradient Boosting on Financial Features", { contentDir: "ch02/07-gradient-boosting-on-financial-features" }),
      L(8, "neural-networks-for-tabular-financial-data", "Neural Networks for Tabular Financial Data", { contentDir: "ch02/08-neural-networks-for-tabular-financial-data" }),
      L(9, "combining-and-ensembling-models", "Combining & Ensembling Models", { contentDir: "ch02/09-combining-and-ensembling-models" }),
    ],
  },
  {
    n: 3,
    title: "Unsupervised Learning in Finance",
    lessons: [
      L(10, "clustering-assets-and-regimes", "Clustering Assets & Regimes", { contentDir: "ch03/10-clustering-assets-and-regimes" }),
      L(11, "dimensionality-reduction-for-factor-discovery", "Dimensionality Reduction for Factor Discovery", { contentDir: "ch03/11-dimensionality-reduction-for-factor-discovery" }),
      L(12, "anomaly-detection-in-markets", "Anomaly Detection in Markets", { contentDir: "ch03/12-anomaly-detection-in-markets" }),
      L(13, "hierarchical-risk-parity", "Hierarchical Risk Parity", { contentDir: "ch03/13-hierarchical-risk-parity" }),
    ],
  },
  {
    n: 4,
    title: "Validation Done Right",
    lessons: [
      L(14, "walk-forward-validation", "Walk-Forward Validation", { contentDir: "ch04/14-walk-forward-validation" }),
      L(15, "purged-and-embargoed-cross-validation", "Purged & Embargoed Cross-Validation", { contentDir: "ch04/15-purged-and-embargoed-cross-validation" }),
      L(16, "combinatorial-cross-validation", "Combinatorial Cross-Validation", { contentDir: "ch04/16-combinatorial-cross-validation" }),
      L(17, "the-deflated-sharpe-ratio-and-multiple-testing", "The Deflated Sharpe Ratio & Multiple Testing", { contentDir: "ch04/17-the-deflated-sharpe-ratio-and-multiple-testing" }),
      L(18, "detecting-backtest-overfitting", "Detecting Backtest Overfitting", { contentDir: "ch04/18-detecting-backtest-overfitting" }),
    ],
  },
  {
    n: 5,
    title: "Feature Importance & Interpretation",
    lessons: [
      L(19, "feature-importance-in-financial-models", "Feature Importance in Financial Models", { contentDir: "ch05/19-feature-importance-in-financial-models" }),
      L(20, "shap-and-model-explanation", "SHAP & Model Explanation", { contentDir: "ch05/20-shap-and-model-explanation" }),
      L(21, "stability-of-signals-over-time", "Stability of Signals Over Time", { contentDir: "ch05/21-stability-of-signals-over-time" }),
    ],
  },
  {
    n: 6,
    title: "Modern Topics",
    lessons: [
      L(22, "sequence-models-for-market-data", "Sequence Models for Market Data", { contentDir: "ch06/22-sequence-models-for-market-data" }),
      L(23, "nlp-for-financial-text-and-news", "NLP for Financial Text & News", { contentDir: "ch06/23-nlp-for-financial-text-and-news" }),
      L(24, "alternative-data-overview", "Alternative Data Overview", { contentDir: "ch06/24-alternative-data-overview" }),
      L(25, "reinforcement-learning-for-trading-overview", "Reinforcement Learning for Trading Overview", { contentDir: "ch06/25-reinforcement-learning-for-trading-overview" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(26, "capstone-kickoff-build-and-validate-an-ml-return-prediction-model", "Capstone Kickoff: Build and Validate an ML Return-Prediction Model", { contentDir: "ch07/26-capstone-kickoff-build-and-validate-an-ml-return-prediction-model" }),
      L(27, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/27-capstone-build-it" }),
      L(28, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/28-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
