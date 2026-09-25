// The Algorithmic Trading & Backtesting course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 7 of the Quantitative Developer / Researcher path. Turns models into tradable strategies and teaches how to tell a real edge from an artifact of the backtest.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/algorithmic-trading-and-backtesting/
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

export const ALGORITHMIC_TRADING_AND_BACKTESTING_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "Strategy Foundations",
    lessons: [
      L(1, "what-makes-a-trading-strategy", "What Makes a Trading Strategy"),
      L(2, "alpha-beta-and-edge", "Alpha, Beta & Edge"),
      L(3, "strategy-families-momentum-mean-reversion-and-carry", "Strategy Families: Momentum, Mean Reversion & Carry"),
      L(4, "statistical-arbitrage-and-pairs-trading", "Statistical Arbitrage & Pairs Trading"),
      L(5, "from-idea-to-hypothesis", "From Idea to Hypothesis"),
    ],
  },
  {
    n: 2,
    title: "Signals & Portfolio Construction",
    lessons: [
      L(6, "building-trading-signals", "Building Trading Signals"),
      L(7, "combining-signals", "Combining Signals"),
      L(8, "portfolio-construction-methods", "Portfolio Construction Methods"),
      L(9, "position-sizing-and-the-kelly-criterion", "Position Sizing & the Kelly Criterion"),
      L(10, "risk-budgeting-and-leverage", "Risk Budgeting & Leverage"),
    ],
  },
  {
    n: 3,
    title: "Backtesting Engines",
    lessons: [
      L(11, "backtesting-fundamentals", "Backtesting Fundamentals"),
      L(12, "vectorized-vs-event-driven-backtests", "Vectorized vs. Event-Driven Backtests"),
      L(13, "building-a-simple-backtester", "Building a Simple Backtester"),
      L(14, "using-backtesting-frameworks", "Using Backtesting Frameworks"),
      L(15, "data-handling-in-backtests", "Data Handling in Backtests"),
    ],
  },
  {
    n: 4,
    title: "Realism in Backtests",
    lessons: [
      L(16, "transaction-costs-and-slippage", "Transaction Costs & Slippage"),
      L(17, "market-impact-and-capacity", "Market Impact & Capacity"),
      L(18, "look-ahead-bias-and-survivorship-bias", "Look-Ahead Bias & Survivorship Bias"),
      L(19, "data-snooping-and-overfitting", "Data Snooping & Overfitting"),
      L(20, "realistic-fill-assumptions", "Realistic Fill Assumptions"),
    ],
  },
  {
    n: 5,
    title: "Performance & Risk Analysis",
    lessons: [
      L(21, "returns-sharpe-and-sortino-ratios", "Returns, Sharpe & Sortino Ratios"),
      L(22, "drawdown-and-recovery", "Drawdown & Recovery"),
      L(23, "risk-adjusted-performance-measures", "Risk-Adjusted Performance Measures"),
      L(24, "performance-attribution", "Performance Attribution"),
      L(25, "statistical-significance-of-results", "Statistical Significance of Results"),
    ],
  },
  {
    n: 6,
    title: "From Backtest to Production",
    lessons: [
      L(26, "paper-trading-and-forward-testing", "Paper Trading & Forward Testing"),
      L(27, "execution-algorithms-twap-vwap-and-beyond", "Execution Algorithms: TWAP, VWAP & Beyond"),
      L(28, "connecting-to-brokers-and-exchanges", "Connecting to Brokers & Exchanges"),
      L(29, "monitoring-live-strategies", "Monitoring Live Strategies"),
      L(30, "strategy-decay-and-retirement", "Strategy Decay & Retirement"),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(31, "capstone-kickoff-design-backtest-and-stress-test-a-strategy", "Capstone Kickoff: Design, Backtest, and Stress-Test a Strategy"),
      L(32, "capstone-build-it", "Capstone: Build It"),
      L(33, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
