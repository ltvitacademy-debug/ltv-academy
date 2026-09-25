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
      L(1, "low-signal-to-noise-and-non-stationarity", "Low Signal-to-Noise & Non-Stationarity"),
      L(2, "the-overfitting-problem-in-finance", "The Overfitting Problem in Finance"),
      L(3, "labeling-financial-data", "Labeling Financial Data"),
      L(4, "sample-weights-and-overlapping-outcomes", "Sample Weights & Overlapping Outcomes"),
    ],
  },
  {
    n: 2,
    title: "Supervised Learning for Returns",
    lessons: [
      L(5, "regularized-linear-models", "Regularized Linear Models"),
      L(6, "tree-based-models", "Tree-Based Models"),
      L(7, "gradient-boosting-on-financial-features", "Gradient Boosting on Financial Features"),
      L(8, "neural-networks-for-tabular-financial-data", "Neural Networks for Tabular Financial Data"),
      L(9, "combining-and-ensembling-models", "Combining & Ensembling Models"),
    ],
  },
  {
    n: 3,
    title: "Unsupervised Learning in Finance",
    lessons: [
      L(10, "clustering-assets-and-regimes", "Clustering Assets & Regimes"),
      L(11, "dimensionality-reduction-for-factor-discovery", "Dimensionality Reduction for Factor Discovery"),
      L(12, "anomaly-detection-in-markets", "Anomaly Detection in Markets"),
      L(13, "hierarchical-risk-parity", "Hierarchical Risk Parity"),
    ],
  },
  {
    n: 4,
    title: "Validation Done Right",
    lessons: [
      L(14, "walk-forward-validation", "Walk-Forward Validation"),
      L(15, "purged-and-embargoed-cross-validation", "Purged & Embargoed Cross-Validation"),
      L(16, "combinatorial-cross-validation", "Combinatorial Cross-Validation"),
      L(17, "the-deflated-sharpe-ratio-and-multiple-testing", "The Deflated Sharpe Ratio & Multiple Testing"),
      L(18, "detecting-backtest-overfitting", "Detecting Backtest Overfitting"),
    ],
  },
  {
    n: 5,
    title: "Feature Importance & Interpretation",
    lessons: [
      L(19, "feature-importance-in-financial-models", "Feature Importance in Financial Models"),
      L(20, "shap-and-model-explanation", "SHAP & Model Explanation"),
      L(21, "stability-of-signals-over-time", "Stability of Signals Over Time"),
    ],
  },
  {
    n: 6,
    title: "Modern Topics",
    lessons: [
      L(22, "sequence-models-for-market-data", "Sequence Models for Market Data"),
      L(23, "nlp-for-financial-text-and-news", "NLP for Financial Text & News"),
      L(24, "alternative-data-overview", "Alternative Data Overview"),
      L(25, "reinforcement-learning-for-trading-overview", "Reinforcement Learning for Trading Overview"),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(26, "capstone-kickoff-build-and-validate-an-ml-return-prediction-model", "Capstone Kickoff: Build and Validate an ML Return-Prediction Model"),
      L(27, "capstone-build-it", "Capstone: Build It"),
      L(28, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
