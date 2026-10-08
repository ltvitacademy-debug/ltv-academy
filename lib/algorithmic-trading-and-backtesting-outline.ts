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
      L(1, "what-makes-a-trading-strategy", "What Makes a Trading Strategy", { contentDir: "ch01/01-what-makes-a-trading-strategy" }),
      L(2, "alpha-beta-and-edge", "Alpha, Beta & Edge", { contentDir: "ch01/02-alpha-beta-and-edge" }),
      L(3, "strategy-families-momentum-mean-reversion-and-carry", "Strategy Families: Momentum, Mean Reversion & Carry", { contentDir: "ch01/03-strategy-families-momentum-mean-reversion-and-carry" }),
      L(4, "statistical-arbitrage-and-pairs-trading", "Statistical Arbitrage & Pairs Trading", { contentDir: "ch01/04-statistical-arbitrage-and-pairs-trading" }),
      L(5, "from-idea-to-hypothesis", "From Idea to Hypothesis", { contentDir: "ch01/05-from-idea-to-hypothesis" }),
    ],
  },
  {
    n: 2,
    title: "Signals & Portfolio Construction",
    lessons: [
      L(6, "building-trading-signals", "Building Trading Signals", { contentDir: "ch02/06-building-trading-signals" }),
      L(7, "combining-signals", "Combining Signals", { contentDir: "ch02/07-combining-signals" }),
      L(8, "portfolio-construction-methods", "Portfolio Construction Methods", { contentDir: "ch02/08-portfolio-construction-methods" }),
      L(9, "position-sizing-and-the-kelly-criterion", "Position Sizing & the Kelly Criterion", { contentDir: "ch02/09-position-sizing-and-the-kelly-criterion" }),
      L(10, "risk-budgeting-and-leverage", "Risk Budgeting & Leverage", { contentDir: "ch02/10-risk-budgeting-and-leverage" }),
    ],
  },
  {
    n: 3,
    title: "Backtesting Engines",
    lessons: [
      L(11, "backtesting-fundamentals", "Backtesting Fundamentals", { contentDir: "ch03/11-backtesting-fundamentals" }),
      L(12, "vectorized-vs-event-driven-backtests", "Vectorized vs. Event-Driven Backtests", { contentDir: "ch03/12-vectorized-vs-event-driven-backtests" }),
      L(13, "building-a-simple-backtester", "Building a Simple Backtester", { contentDir: "ch03/13-building-a-simple-backtester" }),
      L(14, "using-backtesting-frameworks", "Using Backtesting Frameworks", { contentDir: "ch03/14-using-backtesting-frameworks" }),
      L(15, "data-handling-in-backtests", "Data Handling in Backtests", { contentDir: "ch03/15-data-handling-in-backtests" }),
    ],
  },
  {
    n: 4,
    title: "Realism in Backtests",
    lessons: [
      L(16, "transaction-costs-and-slippage", "Transaction Costs & Slippage", { contentDir: "ch04/16-transaction-costs-and-slippage" }),
      L(17, "market-impact-and-capacity", "Market Impact & Capacity", { contentDir: "ch04/17-market-impact-and-capacity" }),
      L(18, "look-ahead-bias-and-survivorship-bias", "Look-Ahead Bias & Survivorship Bias", { contentDir: "ch04/18-look-ahead-bias-and-survivorship-bias" }),
      L(19, "data-snooping-and-overfitting", "Data Snooping & Overfitting", { contentDir: "ch04/19-data-snooping-and-overfitting" }),
      L(20, "realistic-fill-assumptions", "Realistic Fill Assumptions", { contentDir: "ch04/20-realistic-fill-assumptions" }),
    ],
  },
  {
    n: 5,
    title: "Performance & Risk Analysis",
    lessons: [
      L(21, "returns-sharpe-and-sortino-ratios", "Returns, Sharpe & Sortino Ratios", { contentDir: "ch05/21-returns-sharpe-and-sortino-ratios" }),
      L(22, "drawdown-and-recovery", "Drawdown & Recovery", { contentDir: "ch05/22-drawdown-and-recovery" }),
      L(23, "risk-adjusted-performance-measures", "Risk-Adjusted Performance Measures", { contentDir: "ch05/23-risk-adjusted-performance-measures" }),
      L(24, "performance-attribution", "Performance Attribution", { contentDir: "ch05/24-performance-attribution" }),
      L(25, "statistical-significance-of-results", "Statistical Significance of Results", { contentDir: "ch05/25-statistical-significance-of-results" }),
    ],
  },
  {
    n: 6,
    title: "From Backtest to Production",
    lessons: [
      L(26, "paper-trading-and-forward-testing", "Paper Trading & Forward Testing", { contentDir: "ch06/26-paper-trading-and-forward-testing" }),
      L(27, "execution-algorithms-twap-vwap-and-beyond", "Execution Algorithms: TWAP, VWAP & Beyond", { contentDir: "ch06/27-execution-algorithms-twap-vwap-and-beyond" }),
      L(28, "connecting-to-brokers-and-exchanges", "Connecting to Brokers & Exchanges", { contentDir: "ch06/28-connecting-to-brokers-and-exchanges" }),
      L(29, "monitoring-live-strategies", "Monitoring Live Strategies", { contentDir: "ch06/29-monitoring-live-strategies" }),
      L(30, "strategy-decay-and-retirement", "Strategy Decay & Retirement", { contentDir: "ch06/30-strategy-decay-and-retirement" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(31, "capstone-kickoff-design-backtest-and-stress-test-a-strategy", "Capstone Kickoff: Design, Backtest, and Stress-Test a Strategy", { contentDir: "ch07/31-capstone-kickoff-design-backtest-and-stress-test-a-strategy" }),
      L(32, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/32-capstone-build-it" }),
      L(33, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/33-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
