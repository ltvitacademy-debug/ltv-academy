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
      L(1, "asset-classes-overview", "Asset Classes Overview"),
      L(2, "exchanges-brokers-and-market-participants", "Exchanges, Brokers & Market Participants"),
      L(3, "order-types-and-the-limit-order-book", "Order Types & the Limit Order Book"),
      L(4, "market-microstructure-basics", "Market Microstructure Basics"),
      L(5, "liquidity-spreads-and-market-impact", "Liquidity, Spreads & Market Impact"),
    ],
  },
  {
    n: 2,
    title: "Equities, Bonds & Futures",
    lessons: [
      L(6, "equities-and-corporate-actions", "Equities & Corporate Actions"),
      L(7, "fixed-income-and-yield-curves", "Fixed Income & Yield Curves"),
      L(8, "bond-pricing-duration-and-convexity", "Bond Pricing, Duration & Convexity"),
      L(9, "futures-and-forwards", "Futures & Forwards"),
      L(10, "foreign-exchange-basics", "Foreign Exchange Basics"),
    ],
  },
  {
    n: 3,
    title: "Options & Derivatives",
    lessons: [
      L(11, "option-basics-and-payoffs", "Option Basics & Payoffs"),
      L(12, "put-call-parity-and-no-arbitrage", "Put-Call Parity & No-Arbitrage"),
      L(13, "the-binomial-model", "The Binomial Model"),
      L(14, "the-black-scholes-model", "The Black-Scholes Model"),
      L(15, "the-greeks", "The Greeks"),
      L(16, "implied-volatility-and-the-volatility-surface", "Implied Volatility & the Volatility Surface"),
      L(17, "exotic-options-overview", "Exotic Options Overview"),
    ],
  },
  {
    n: 4,
    title: "Portfolio Theory",
    lessons: [
      L(18, "risk-return-and-diversification", "Risk, Return & Diversification"),
      L(19, "mean-variance-optimization", "Mean-Variance Optimization"),
      L(20, "the-capital-asset-pricing-model", "The Capital Asset Pricing Model"),
      L(21, "factor-models-and-multi-factor-investing", "Factor Models & Multi-Factor Investing"),
      L(22, "performance-attribution", "Performance Attribution"),
    ],
  },
  {
    n: 5,
    title: "Risk Management",
    lessons: [
      L(23, "value-at-risk-and-expected-shortfall", "Value at Risk & Expected Shortfall"),
      L(24, "stress-testing-and-scenario-analysis", "Stress Testing & Scenario Analysis"),
      L(25, "market-credit-and-liquidity-risk", "Market, Credit & Liquidity Risk"),
      L(26, "hedging-strategies", "Hedging Strategies"),
      L(27, "regulation-and-risk-governance-overview", "Regulation & Risk Governance Overview"),
    ],
  },
  {
    n: 6,
    title: "Quant Career Landscape",
    lessons: [
      L(28, "hedge-funds-prop-trading-banks-and-asset-managers", "Hedge Funds, Prop Trading, Banks & Asset Managers"),
      L(29, "quant-researcher-developer-and-trader-roles", "Quant Researcher, Developer & Trader Roles"),
      L(30, "how-quants-get-paid", "How Quants Get Paid"),
    ],
  },
  {
    n: 7,
    title: "Capstone",
    lessons: [
      L(31, "capstone-kickoff-price-and-hedge-a-derivatives-portfolio", "Capstone Kickoff: Price and Hedge a Derivatives Portfolio"),
      L(32, "capstone-build-it", "Capstone: Build It"),
      L(33, "capstone-wrap-up-and-portfolio-presentation", "Capstone: Wrap-Up & Portfolio Presentation"),
    ],
  },
];
