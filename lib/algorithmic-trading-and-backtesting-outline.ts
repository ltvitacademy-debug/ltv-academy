// The Algorithmic Trading & Backtesting course outline. All lessons have
// real guide.md content (the header here previously, incorrectly, called
// this "framework only" — fixed 2026-10-18). Lessons without a contentDir
// render as "in production". Step 7 of the Quantitative Developer /
// Researcher path. Turns models into tradable strategies and teaches how
// to tell a real edge from an artifact of the backtest.
//
// Chapter 8 (lessons 34-39) is a deliberate exception added 2026-10-18:
// market making, a topic confirmed 100% absent from this course and the
// whole Quant Developer/Researcher + Quantitative Trader path's 264
// existing lessons (Phase 1 audit, 5 parallel agents). The reservation-
// price/inventory-skew mechanics are grounded in the Avellaneda-Stoikov
// framework, verified against current sources before writing — guide-only
// (no video yet), same content-first pattern used elsewhere in this
// catalog. This is also the content gap that makes the Quantitative
// Trader destination (which shares this exact course) genuinely distinct
// from Quant Developer/Researcher, not just differently named.

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
      L(1, "what-makes-a-trading-strategy", "What Makes a Trading Strategy", { contentDir: "ch01/01-what-makes-a-trading-strategy", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792610853/ltv-algorithmic-trading-and-backtesting/what-makes-a-trading-strategy.mp4", durationLabel: "1 min 50 s" }),
      L(2, "alpha-beta-and-edge", "Alpha, Beta & Edge", { contentDir: "ch01/02-alpha-beta-and-edge", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792611555/ltv-algorithmic-trading-and-backtesting/alpha-beta-and-edge.mp4", durationLabel: "1 min 51 s" }),
      L(3, "strategy-families-momentum-mean-reversion-and-carry", "Strategy Families: Momentum, Mean Reversion & Carry", { contentDir: "ch01/03-strategy-families-momentum-mean-reversion-and-carry", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612204/ltv-algorithmic-trading-and-backtesting/strategy-families-momentum-mean-reversion-and-carry.mp4", durationLabel: "1 min 59 s" }),
      L(4, "statistical-arbitrage-and-pairs-trading", "Statistical Arbitrage & Pairs Trading", { contentDir: "ch01/04-statistical-arbitrage-and-pairs-trading", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792612822/ltv-algorithmic-trading-and-backtesting/statistical-arbitrage-and-pairs-trading.mp4", durationLabel: "1 min 48 s" }),
      L(5, "from-idea-to-hypothesis", "From Idea to Hypothesis", { contentDir: "ch01/05-from-idea-to-hypothesis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613334/ltv-algorithmic-trading-and-backtesting/from-idea-to-hypothesis.mp4", durationLabel: "1 min 40 s" }),
    ],
  },
  {
    n: 2,
    title: "Signals & Portfolio Construction",
    lessons: [
      L(6, "building-trading-signals", "Building Trading Signals", { contentDir: "ch02/06-building-trading-signals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792613772/ltv-algorithmic-trading-and-backtesting/building-trading-signals.mp4", durationLabel: "1 min 47 s" }),
      L(7, "combining-signals", "Combining Signals", { contentDir: "ch02/07-combining-signals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614074/ltv-algorithmic-trading-and-backtesting/combining-signals.mp4", durationLabel: "1 min 44 s" }),
      L(8, "portfolio-construction-methods", "Portfolio Construction Methods", { contentDir: "ch02/08-portfolio-construction-methods", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614380/ltv-algorithmic-trading-and-backtesting/portfolio-construction-methods.mp4", durationLabel: "1 min 45 s" }),
      L(9, "position-sizing-and-the-kelly-criterion", "Position Sizing & the Kelly Criterion", { contentDir: "ch02/09-position-sizing-and-the-kelly-criterion", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792614756/ltv-algorithmic-trading-and-backtesting/position-sizing-and-the-kelly-criterion.mp4", durationLabel: "1 min 52 s" }),
      L(10, "risk-budgeting-and-leverage", "Risk Budgeting & Leverage", { contentDir: "ch02/10-risk-budgeting-and-leverage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615092/ltv-algorithmic-trading-and-backtesting/risk-budgeting-and-leverage.mp4", durationLabel: "1 min 53 s" }),
    ],
  },
  {
    n: 3,
    title: "Backtesting Engines",
    lessons: [
      L(11, "backtesting-fundamentals", "Backtesting Fundamentals", { contentDir: "ch03/11-backtesting-fundamentals", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615388/ltv-algorithmic-trading-and-backtesting/backtesting-fundamentals.mp4", durationLabel: "2 min 8 s" }),
      L(12, "vectorized-vs-event-driven-backtests", "Vectorized vs. Event-Driven Backtests", { contentDir: "ch03/12-vectorized-vs-event-driven-backtests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615639/ltv-algorithmic-trading-and-backtesting/vectorized-vs-event-driven-backtests.mp4", durationLabel: "1 min 58 s" }),
      L(13, "building-a-simple-backtester", "Building a Simple Backtester", { contentDir: "ch03/13-building-a-simple-backtester", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792615913/ltv-algorithmic-trading-and-backtesting/building-a-simple-backtester.mp4", durationLabel: "1 min 55 s" }),
      L(14, "using-backtesting-frameworks", "Using Backtesting Frameworks", { contentDir: "ch03/14-using-backtesting-frameworks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616100/ltv-algorithmic-trading-and-backtesting/using-backtesting-frameworks.mp4", durationLabel: "2 min 1 s" }),
      L(15, "data-handling-in-backtests", "Data Handling in Backtests", { contentDir: "ch03/15-data-handling-in-backtests", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616281/ltv-algorithmic-trading-and-backtesting/data-handling-in-backtests.mp4", durationLabel: "1 min 53 s" }),
    ],
  },
  {
    n: 4,
    title: "Realism in Backtests",
    lessons: [
      L(16, "transaction-costs-and-slippage", "Transaction Costs & Slippage", { contentDir: "ch04/16-transaction-costs-and-slippage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616419/ltv-algorithmic-trading-and-backtesting/transaction-costs-and-slippage.mp4", durationLabel: "1 min 50 s" }),
      L(17, "market-impact-and-capacity", "Market Impact & Capacity", { contentDir: "ch04/17-market-impact-and-capacity", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616563/ltv-algorithmic-trading-and-backtesting/market-impact-and-capacity.mp4", durationLabel: "1 min 59 s" }),
      L(18, "look-ahead-bias-and-survivorship-bias", "Look-Ahead Bias & Survivorship Bias", { contentDir: "ch04/18-look-ahead-bias-and-survivorship-bias", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616710/ltv-algorithmic-trading-and-backtesting/look-ahead-bias-and-survivorship-bias.mp4", durationLabel: "1 min 56 s" }),
      L(19, "data-snooping-and-overfitting", "Data Snooping & Overfitting", { contentDir: "ch04/19-data-snooping-and-overfitting", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792616867/ltv-algorithmic-trading-and-backtesting/data-snooping-and-overfitting.mp4", durationLabel: "2 min 4 s" }),
      L(20, "realistic-fill-assumptions", "Realistic Fill Assumptions", { contentDir: "ch04/20-realistic-fill-assumptions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792617021/ltv-algorithmic-trading-and-backtesting/realistic-fill-assumptions.mp4", durationLabel: "2 min 1 s" }),
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
  {
    n: 8,
    title: "Market Making",
    lessons: [
      L(34, "fair-value-estimation-for-market-making", "Fair Value Estimation: What a Market Maker Actually Prices Around", {
        contentDir: "ch08/34-fair-value-estimation-for-market-making",
      }),
      L(35, "two-sided-quoting-and-the-reservation-price", "Two-Sided Quoting and the Reservation Price", {
        contentDir: "ch08/35-two-sided-quoting-and-the-reservation-price",
      }),
      L(36, "inventory-limits-and-spread-sizing", "Inventory Limits and Spread Sizing", {
        contentDir: "ch08/36-inventory-limits-and-spread-sizing",
      }),
      L(37, "adverse-selection-and-toxic-flow", "Adverse Selection and Toxic Flow", {
        contentDir: "ch08/37-adverse-selection-and-toxic-flow",
      }),
      L(38, "market-maker-pnl-decomposition", "Market-Maker P&L: Spread Capture, Inventory Risk, and Execution Costs", {
        contentDir: "ch08/38-market-maker-pnl-decomposition",
      }),
      L(39, "capstone-building-a-market-making-simulator", "Capstone: Building a Market-Making Simulator", {
        contentDir: "ch08/39-capstone-building-a-market-making-simulator",
      }),
    ],
  },
];
