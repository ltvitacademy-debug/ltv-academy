// The Financial Markets & Quantitative Finance course outline. All
// lessons have real guide.md content (the header here previously,
// incorrectly, called this "framework only" — fixed 2026-10-18).
// Lessons without a contentDir render as "in production". Step 4 of
// the Quantitative Developer / Researcher path. No prior finance
// assumed; builds the domain knowledge quant research and trading
// roles expect.
//
// Chapter 8 (lessons 34-37) is a deliberate exception added
// 2026-10-18: a 5-parallel-agent audit against an external 24-lesson
// upgrade proposal found the concepts (bid-ask, Black-Scholes, Greeks,
// implied vol) already taught well — the real gap was zero hands-on
// code anywhere in the microstructure/options material. These 4
// lessons close it: a real limit order book matching engine, Level 2
// data/maker-taker fees, a Monte Carlo option pricer validated against
// closed-form Black-Scholes, and a real Newton-Raphson implied-vol
// solver building an actual volatility smile. Every numeric example
// was actually executed (verified via an equivalent seeded
// simulation) before being written into these lessons.

export type LessonMeta = {
  n: number;
  slug: string;
  title: string;
  contentDir?: string; // under content/financial-markets-and-quantitative-finance/
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

export const FINANCIAL_MARKETS_AND_QUANTITATIVE_FINANCE_CHAPTERS: ChapterMeta[] = [
  {
    n: 1,
    title: "How Markets Work",
    lessons: [
      L(1, "asset-classes-overview", "Asset Classes Overview", { contentDir: "ch01/01-asset-classes-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792506769/ltv-financial-markets-and-quantitative-finance/asset-classes-overview.mp4", durationLabel: "2 min 7 s" }),
      L(2, "exchanges-brokers-and-market-participants", "Exchanges, Brokers & Market Participants", { contentDir: "ch01/02-exchanges-brokers-and-market-participants", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792507557/ltv-financial-markets-and-quantitative-finance/exchanges-brokers-and-market-participants.mp4", durationLabel: "2 min 9 s" }),
      L(3, "order-types-and-the-limit-order-book", "Order Types & the Limit Order Book", { contentDir: "ch01/03-order-types-and-the-limit-order-book", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792508317/ltv-financial-markets-and-quantitative-finance/order-types-and-the-limit-order-book.mp4", durationLabel: "2 min 10 s" }),
      L(4, "market-microstructure-basics", "Market Microstructure Basics", { contentDir: "ch01/04-market-microstructure-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509133/ltv-financial-markets-and-quantitative-finance/market-microstructure-basics.mp4", durationLabel: "2 min 13 s" }),
      L(5, "liquidity-spreads-and-market-impact", "Liquidity, Spreads & Market Impact", { contentDir: "ch01/05-liquidity-spreads-and-market-impact", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792509941/ltv-financial-markets-and-quantitative-finance/liquidity-spreads-and-market-impact.mp4", durationLabel: "2 min 12 s" }),
    ],
  },
  {
    n: 2,
    title: "Equities, Bonds & Futures",
    lessons: [
      L(6, "equities-and-corporate-actions", "Equities & Corporate Actions", { contentDir: "ch02/06-equities-and-corporate-actions", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792510809/ltv-financial-markets-and-quantitative-finance/equities-and-corporate-actions.mp4", durationLabel: "2 min 15 s" }),
      L(7, "fixed-income-and-yield-curves", "Fixed Income & Yield Curves", { contentDir: "ch02/07-fixed-income-and-yield-curves", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792511525/ltv-financial-markets-and-quantitative-finance/fixed-income-and-yield-curves.mp4", durationLabel: "1 min 55 s" }),
      L(8, "bond-pricing-duration-and-convexity", "Bond Pricing, Duration & Convexity", { contentDir: "ch02/08-bond-pricing-duration-and-convexity", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792512314/ltv-financial-markets-and-quantitative-finance/bond-pricing-duration-and-convexity.mp4", durationLabel: "2 min 7 s" }),
      L(9, "futures-and-forwards", "Futures & Forwards", { contentDir: "ch02/09-futures-and-forwards", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513061/ltv-financial-markets-and-quantitative-finance/futures-and-forwards.mp4", durationLabel: "2 min 4 s" }),
      L(10, "foreign-exchange-basics", "Foreign Exchange Basics", { contentDir: "ch02/10-foreign-exchange-basics", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792513906/ltv-financial-markets-and-quantitative-finance/foreign-exchange-basics.mp4", durationLabel: "2 min 14 s" }),
    ],
  },
  {
    n: 3,
    title: "Options & Derivatives",
    lessons: [
      L(11, "option-basics-and-payoffs", "Option Basics & Payoffs", { contentDir: "ch03/11-option-basics-and-payoffs", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792514746/ltv-financial-markets-and-quantitative-finance/option-basics-and-payoffs.mp4", durationLabel: "2 min 17 s" }),
      L(12, "put-call-parity-and-no-arbitrage", "Put-Call Parity & No-Arbitrage", { contentDir: "ch03/12-put-call-parity-and-no-arbitrage", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792515589/ltv-financial-markets-and-quantitative-finance/put-call-parity-and-no-arbitrage.mp4", durationLabel: "2 min 13 s" }),
      L(13, "the-binomial-model", "The Binomial Model", { contentDir: "ch03/13-the-binomial-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792516557/ltv-financial-markets-and-quantitative-finance/the-binomial-model.mp4", durationLabel: "2 min 30 s" }),
      L(14, "the-black-scholes-model", "The Black-Scholes Model", { contentDir: "ch03/14-the-black-scholes-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792517422/ltv-financial-markets-and-quantitative-finance/the-black-scholes-model.mp4", durationLabel: "2 min 18 s" }),
      L(15, "the-greeks", "The Greeks", { contentDir: "ch03/15-the-greeks", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792518213/ltv-financial-markets-and-quantitative-finance/the-greeks.mp4", durationLabel: "2 min 6 s" }),
      L(16, "implied-volatility-and-the-volatility-surface", "Implied Volatility & the Volatility Surface", { contentDir: "ch03/16-implied-volatility-and-the-volatility-surface", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792519086/ltv-financial-markets-and-quantitative-finance/implied-volatility-and-the-volatility-surface.mp4", durationLabel: "2 min 9 s" }),
      L(17, "exotic-options-overview", "Exotic Options Overview", { contentDir: "ch03/17-exotic-options-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520000/ltv-financial-markets-and-quantitative-finance/exotic-options-overview.mp4", durationLabel: "2 min 20 s" }),
    ],
  },
  {
    n: 4,
    title: "Portfolio Theory",
    lessons: [
      L(18, "risk-return-and-diversification", "Risk, Return & Diversification", { contentDir: "ch04/18-risk-return-and-diversification", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792520901/ltv-financial-markets-and-quantitative-finance/risk-return-and-diversification.mp4", durationLabel: "2 min 21 s" }),
      L(19, "mean-variance-optimization", "Mean-Variance Optimization", { contentDir: "ch04/19-mean-variance-optimization", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792521743/ltv-financial-markets-and-quantitative-finance/mean-variance-optimization.mp4", durationLabel: "2 min 8 s" }),
      L(20, "the-capital-asset-pricing-model", "The Capital Asset Pricing Model", { contentDir: "ch04/20-the-capital-asset-pricing-model", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792522539/ltv-financial-markets-and-quantitative-finance/the-capital-asset-pricing-model.mp4", durationLabel: "2 min 11 s" }),
      L(21, "factor-models-and-multi-factor-investing", "Factor Models & Multi-Factor Investing", { contentDir: "ch04/21-factor-models-and-multi-factor-investing", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792523375/ltv-financial-markets-and-quantitative-finance/factor-models-and-multi-factor-investing.mp4", durationLabel: "2 min 9 s" }),
      L(22, "performance-attribution", "Performance Attribution", { contentDir: "ch04/22-performance-attribution", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792524263/ltv-financial-markets-and-quantitative-finance/performance-attribution.mp4", durationLabel: "2 min 22 s" }),
    ],
  },
  {
    n: 5,
    title: "Risk Management",
    lessons: [
      L(23, "value-at-risk-and-expected-shortfall", "Value at Risk & Expected Shortfall", { contentDir: "ch05/23-value-at-risk-and-expected-shortfall", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792525194/ltv-financial-markets-and-quantitative-finance/value-at-risk-and-expected-shortfall.mp4", durationLabel: "2 min 27 s" }),
      L(24, "stress-testing-and-scenario-analysis", "Stress Testing & Scenario Analysis", { contentDir: "ch05/24-stress-testing-and-scenario-analysis", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792526123/ltv-financial-markets-and-quantitative-finance/stress-testing-and-scenario-analysis.mp4", durationLabel: "2 min 32 s" }),
      L(25, "market-credit-and-liquidity-risk", "Market, Credit & Liquidity Risk", { contentDir: "ch05/25-market-credit-and-liquidity-risk", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527033/ltv-financial-markets-and-quantitative-finance/market-credit-and-liquidity-risk.mp4", durationLabel: "2 min 29 s" }),
      L(26, "hedging-strategies", "Hedging Strategies", { contentDir: "ch05/26-hedging-strategies", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792527946/ltv-financial-markets-and-quantitative-finance/hedging-strategies.mp4", durationLabel: "2 min 22 s" }),
      L(27, "regulation-and-risk-governance-overview", "Regulation & Risk Governance Overview", { contentDir: "ch05/27-regulation-and-risk-governance-overview", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792528898/ltv-financial-markets-and-quantitative-finance/regulation-and-risk-governance-overview.mp4", durationLabel: "2 min 41 s" }),
    ],
  },
  {
    n: 6,
    title: "Quant Career Landscape",
    lessons: [
      L(28, "hedge-funds-prop-trading-banks-and-asset-managers", "Hedge Funds, Prop Trading, Banks & Asset Managers", { contentDir: "ch06/28-hedge-funds-prop-trading-banks-and-asset-managers", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792529835/ltv-financial-markets-and-quantitative-finance/hedge-funds-prop-trading-banks-and-asset-managers.mp4", durationLabel: "2 min 34 s" }),
      L(29, "quant-researcher-developer-and-trader-roles", "Quant Researcher, Developer & Trader Roles", { contentDir: "ch06/29-quant-researcher-developer-and-trader-roles", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792530629/ltv-financial-markets-and-quantitative-finance/quant-researcher-developer-and-trader-roles.mp4", durationLabel: "2 min 20 s" }),
      L(30, "how-quants-get-paid", "How Quants Get Paid", { contentDir: "ch06/30-how-quants-get-paid", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792531549/ltv-financial-markets-and-quantitative-finance/how-quants-get-paid.mp4", durationLabel: "2 min 30 s" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(31, "capstone-kickoff-price-and-hedge-a-derivatives-portfolio", "Capstone Kickoff: Price and Hedge a Derivatives Portfolio", { contentDir: "ch07/31-capstone-kickoff-price-and-hedge-a-derivatives-portfolio", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792532406/ltv-financial-markets-and-quantitative-finance/capstone-kickoff-price-and-hedge-a-derivatives-portfolio.mp4", durationLabel: "2 min 32 s" }),
      L(32, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/32-capstone-build-it", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533017/ltv-financial-markets-and-quantitative-finance/capstone-build-it.mp4", durationLabel: "2 min 35 s" }),
      L(33, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/33-capstone-wrap-up-and-portfolio-presentation", videoUrl: "https://res.cloudinary.com/gmgfbpxh/video/upload/v1792533512/ltv-financial-markets-and-quantitative-finance/capstone-wrap-up-and-portfolio-presentation.mp4", durationLabel: "2 min 37 s" }),
    ],
  },
  {
    n: 8,
    title: "Hands-On Pricing & Microstructure Labs",
    lessons: [
      L(34, "building-a-limit-order-book-simulator", "Building a Limit Order Book Simulator", {
        contentDir: "ch08/34-building-a-limit-order-book-simulator",
      }),
      L(35, "level-2-market-data-and-maker-taker-fees", "Level 2 Market Data and Maker/Taker Fees", {
        contentDir: "ch08/35-level-2-market-data-and-maker-taker-fees",
      }),
      L(36, "monte-carlo-option-pricing", "Monte Carlo Option Pricing", {
        contentDir: "ch08/36-monte-carlo-option-pricing",
      }),
      L(37, "fitting-an-implied-volatility-surface", "Fitting an Implied Volatility Surface", {
        contentDir: "ch08/37-fitting-an-implied-volatility-surface",
      }),
    ],
  },
];
