// The Financial Markets & Quantitative Finance course outline — FRAMEWORK ONLY (chapter and lesson
// titles, no lesson content yet). Lessons without a contentDir render as
// "in production". Step 4 of the Quantitative Developer / Researcher path. No prior finance assumed; builds the domain knowledge quant research and trading roles expect.

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
      L(1, "asset-classes-overview", "Asset Classes Overview", { contentDir: "ch01/01-asset-classes-overview" }),
      L(2, "exchanges-brokers-and-market-participants", "Exchanges, Brokers & Market Participants", { contentDir: "ch01/02-exchanges-brokers-and-market-participants" }),
      L(3, "order-types-and-the-limit-order-book", "Order Types & the Limit Order Book", { contentDir: "ch01/03-order-types-and-the-limit-order-book" }),
      L(4, "market-microstructure-basics", "Market Microstructure Basics", { contentDir: "ch01/04-market-microstructure-basics" }),
      L(5, "liquidity-spreads-and-market-impact", "Liquidity, Spreads & Market Impact", { contentDir: "ch01/05-liquidity-spreads-and-market-impact" }),
    ],
  },
  {
    n: 2,
    title: "Equities, Bonds & Futures",
    lessons: [
      L(6, "equities-and-corporate-actions", "Equities & Corporate Actions", { contentDir: "ch02/06-equities-and-corporate-actions" }),
      L(7, "fixed-income-and-yield-curves", "Fixed Income & Yield Curves", { contentDir: "ch02/07-fixed-income-and-yield-curves" }),
      L(8, "bond-pricing-duration-and-convexity", "Bond Pricing, Duration & Convexity", { contentDir: "ch02/08-bond-pricing-duration-and-convexity" }),
      L(9, "futures-and-forwards", "Futures & Forwards", { contentDir: "ch02/09-futures-and-forwards" }),
      L(10, "foreign-exchange-basics", "Foreign Exchange Basics", { contentDir: "ch02/10-foreign-exchange-basics" }),
    ],
  },
  {
    n: 3,
    title: "Options & Derivatives",
    lessons: [
      L(11, "option-basics-and-payoffs", "Option Basics & Payoffs", { contentDir: "ch03/11-option-basics-and-payoffs" }),
      L(12, "put-call-parity-and-no-arbitrage", "Put-Call Parity & No-Arbitrage", { contentDir: "ch03/12-put-call-parity-and-no-arbitrage" }),
      L(13, "the-binomial-model", "The Binomial Model", { contentDir: "ch03/13-the-binomial-model" }),
      L(14, "the-black-scholes-model", "The Black-Scholes Model", { contentDir: "ch03/14-the-black-scholes-model" }),
      L(15, "the-greeks", "The Greeks", { contentDir: "ch03/15-the-greeks" }),
      L(16, "implied-volatility-and-the-volatility-surface", "Implied Volatility & the Volatility Surface", { contentDir: "ch03/16-implied-volatility-and-the-volatility-surface" }),
      L(17, "exotic-options-overview", "Exotic Options Overview", { contentDir: "ch03/17-exotic-options-overview" }),
    ],
  },
  {
    n: 4,
    title: "Portfolio Theory",
    lessons: [
      L(18, "risk-return-and-diversification", "Risk, Return & Diversification", { contentDir: "ch04/18-risk-return-and-diversification" }),
      L(19, "mean-variance-optimization", "Mean-Variance Optimization", { contentDir: "ch04/19-mean-variance-optimization" }),
      L(20, "the-capital-asset-pricing-model", "The Capital Asset Pricing Model", { contentDir: "ch04/20-the-capital-asset-pricing-model" }),
      L(21, "factor-models-and-multi-factor-investing", "Factor Models & Multi-Factor Investing", { contentDir: "ch04/21-factor-models-and-multi-factor-investing" }),
      L(22, "performance-attribution", "Performance Attribution", { contentDir: "ch04/22-performance-attribution" }),
    ],
  },
  {
    n: 5,
    title: "Risk Management",
    lessons: [
      L(23, "value-at-risk-and-expected-shortfall", "Value at Risk & Expected Shortfall", { contentDir: "ch05/23-value-at-risk-and-expected-shortfall" }),
      L(24, "stress-testing-and-scenario-analysis", "Stress Testing & Scenario Analysis", { contentDir: "ch05/24-stress-testing-and-scenario-analysis" }),
      L(25, "market-credit-and-liquidity-risk", "Market, Credit & Liquidity Risk", { contentDir: "ch05/25-market-credit-and-liquidity-risk" }),
      L(26, "hedging-strategies", "Hedging Strategies", { contentDir: "ch05/26-hedging-strategies" }),
      L(27, "regulation-and-risk-governance-overview", "Regulation & Risk Governance Overview", { contentDir: "ch05/27-regulation-and-risk-governance-overview" }),
    ],
  },
  {
    n: 6,
    title: "Quant Career Landscape",
    lessons: [
      L(28, "hedge-funds-prop-trading-banks-and-asset-managers", "Hedge Funds, Prop Trading, Banks & Asset Managers", { contentDir: "ch06/28-hedge-funds-prop-trading-banks-and-asset-managers" }),
      L(29, "quant-researcher-developer-and-trader-roles", "Quant Researcher, Developer & Trader Roles", { contentDir: "ch06/29-quant-researcher-developer-and-trader-roles" }),
      L(30, "how-quants-get-paid", "How Quants Get Paid", { contentDir: "ch06/30-how-quants-get-paid" }),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(31, "capstone-kickoff-price-and-hedge-a-derivatives-portfolio", "Capstone Kickoff: Price and Hedge a Derivatives Portfolio", { contentDir: "ch07/31-capstone-kickoff-price-and-hedge-a-derivatives-portfolio" }),
      L(32, "capstone-build-it", "Capstone: Build It", { contentDir: "ch07/32-capstone-build-it" }),
      L(33, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation", { contentDir: "ch07/33-capstone-wrap-up-and-portfolio-presentation" }),
    ],
  },
];
