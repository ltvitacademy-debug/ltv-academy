import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "quantitative-trader": {
    levelLabel: "Quantitative Trader",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Quantitative Trader with a from-scratch mathematical, programming, and markets foundation for quantitative " +
      "finance — market microstructure and the limit order book; derivatives pricing and the Greeks; portfolio " +
      "theory and risk measurement; position sizing, risk budgeting, and real-time strategy monitoring; and the " +
      "probability brainteasers and mental math quant-desk interviews run on. Built on a prior data science and " +
      "cloud data engineering foundation. The same seven connected capstones behind this program's research track " +
      "— including a trading-and-risk capstone run from the trader's seat: sizing the position inside a stated risk " +
      "budget, setting up live monitoring and kill-switch discipline, and defending the net, cost-adjusted result — " +
      "stand behind the skills below. Bringing that foundation to a Quantitative Trader, Market Maker, or " +
      "Proprietary/Execution Trader role.",
    skills: [
      "Market Microstructure, Order Types & the Limit Order Book",
      "Derivatives Pricing & the Greeks (Black-Scholes, Binomial Model, Implied Volatility)",
      "Portfolio Theory & Risk Measurement (CAPM, Factor Models, VaR/CVaR, Stress Testing)",
      "Position Sizing & Risk Budgeting (Kelly Criterion, Leverage, Hard Risk Limits)",
      "Real-Time Strategy Monitoring (Kill Switches, Alerting, Live-vs-Backtest Comparison)",
      "Algorithmic Trading & Execution (TWAP/VWAP, Transaction Costs, Slippage, Market Impact)",
      "Financial Time-Series & Volatility Modeling (ARIMA, GARCH, Vector Autoregression)",
      "Performance & Risk Reporting (Sharpe/Sortino/Calmar, Drawdown, Stress-Test Windows)",
      "Calculus, Linear Algebra & Probability for Finance (MLE, Bayesian Inference, Regression Theory)",
      "Stochastic Processes & Monte Carlo Simulation (Random Walks, Brownian Motion, Itô's Lemma)",
      "High-Performance Research Python (Vectorization, NumPy/pandas/SciPy/Polars, Numba/Cython)",
      "Modern C++ (C++17/20) for Performance-Critical Pricing & Execution Code",
      "C++/Python Interop with pybind11",
      "Machine Learning for Financial Data, Validated With Walk-Forward/Purged Cross-Validation",
      "SQL for Time-Series & Market Data",
      "Quant Interview Preparation (Probability Brainteasers, Mental Math, Market-Knowledge & Trading-Desk Interviews)",
      "Git/GitHub for Reproducible Research",
    ],
    tools:
      "Python (NumPy, pandas, SciPy, Polars, scikit-learn, Numba, pybind11), C++17/20, Jupyter, Git/GitHub, SQL, " +
      "kdb+/q (overview), pyproject.toml/pip packaging",
    sections: [
      {
        heading: "Training",
        entries: [
          {
            left: "Lifting the Veil IT Academy — Apprenticeship Program",
            right: "Jul 2026 – Dec 2026",
            sub: "Quantitative Trader Destination · Atlanta, GA",
            bullets: [
              "Completed the Data Scientist apprenticeship and a Snowflake-based cloud data engineering specialization beforehand, then this destination's quantitative core — mathematics, advanced Python, C++, financial markets, time-series modeling, machine learning for finance, and algorithmic trading and backtesting — before the trading-and-risk capstone below.",
              "Built fluency in calculus, linear algebra, probability and statistical inference, optimization, and stochastic processes as the mathematical base for every later course, with deliberate focus on the probability brainteasers, expected-value/betting problems, combinatorics, and mental-math estimation drills that quant trading-desk screens actually run on.",
              "Learned how markets actually work from the order book up — asset classes, exchanges/brokers/market makers, order types, the limit order book and price-time priority, market microstructure, and liquidity/market impact — then priced and analyzed options (payoffs, put-call parity, the binomial model, Black-Scholes, the Greeks, implied volatility) and applied portfolio theory and risk measurement (VaR, expected shortfall, stress testing, hedging strategies) to real option and portfolio scenarios.",
              "Wrote fast, memory-aware, reproducible Python research code and modern C++ (C++17/20, smart pointers, concurrency primitives, performance benchmarking) bridged to Python with pybind11 — the kind of low-latency-aware code a trading seat's execution and pricing tools are built on.",
              "Modeled financial time series (ARIMA, GARCH volatility clustering, vector autoregression, state-space/Kalman-filter models) and trained machine learning models on financial data validated with walk-forward and purged cross-validation, with a trader's skepticism toward any signal that hasn't survived honest out-of-sample testing.",
              "Built and backtested trading strategies end to end — position sizing and risk budgeting with the Kelly criterion, real transaction-cost and slippage modeling, TWAP/VWAP execution — then set up the real-time side: kill switches around hard daily-loss and drawdown limits, alerts for softer anomalies, and continuous live-vs-backtest comparison to catch strategy decay before it becomes a real loss.",
              "Practiced the quant recruiting pipeline end to end — math/probability brainteasers, coding interviews, statistics/ML technical questions, market-knowledge and trading-desk interviews, and research-presentation case interviews — and learned how trading compensation and offers are actually structured when comparing firms.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "SR-5 — Sector Reversal Research & Trading Capstone",
            right: "2026",
            sub: "Quantitative Trader Destination — final research capstone, run from the trader's seat",
            bullets: [
              "Researched whether a dollar-neutral, cross-sectional 5-day reversal strategy across the 11 S&P 500 Select Sector SPDR ETFs — plus SPY and the VIX as a volatility-regime conditioner — generates risk-adjusted excess returns that survive realistic transaction costs and purged walk-forward out-of-sample validation, correctly handling a dynamic universe where two of the eleven sector ETFs didn't exist for the full 2007–2025 sample.",
              "Sized the strategy's positions and set its risk rules — leverage limits, per-trade and portfolio risk budgets — before a single trade was simulated, following the same discipline a real desk requires: universe, signal, position sizing, risk rules, and execution specified and defended in writing first.",
              "Reported gross and net performance side by side rather than leading with the bigger number: Sharpe fell from 0.76 gross to 0.42 net of realistic transaction costs, with net Sortino 0.58 and net Calmar 0.27 — the number a risk manager actually cares about.",
              "Ran a full risk analysis — VaR/CVaR at the 95th and 99th percentiles, beta to SPY — and stress-tested the strategy across four real historical windows (the 2020 COVID crash, the Q4 2018 selloff, the 2022 rate-hike bear market, and the August 2024 VIX spike), flagging a correlation-to-one risk: beta to SPY, normally near 0.04, spiked to roughly 0.25 during the COVID crash — exactly the kind of regime-dependent risk a trader has to be able to name before being asked about it.",
              "Designed the live-monitoring plan the strategy would need to actually trade — hard kill-switch limits on daily loss and drawdown, alerts for softer anomalies like unusual volume, and a continuous live-vs-backtest volatility comparison to catch decay early — then defended the full, net-of-costs result to a skeptical review audience instead of the more flattering gross number.",
            ],
          },
          {
            left: "ZQX Inc. Options Portfolio — Pricing & Delta Hedge",
            right: "2026",
            sub: "Financial Markets & Quantitative Finance — capstone",
            bullets: [
              "Priced a three-option portfolio on a fictional underlying with the Black-Scholes model, aggregated each leg's Greeks to the portfolio level, and sized a hedge trade in the underlying to flatten portfolio delta to zero — then reasoned through how that hedge would need to be revisited as gamma and vega shifted with the market.",
            ],
          },
          {
            left: "Momentum Strategy — Backtest & Stress Test",
            right: "2026",
            sub: "Algorithmic Trading & Backtesting — capstone",
            bullets: [
              "Specified a time-series momentum strategy's universe, signal, position sizing, risk rules, and execution assumption in writing before coding it, then built a vectorized backtest modeling real transaction costs, slippage, and market impact.",
              "Measured the strategy on risk-adjusted terms (Sharpe, Sortino, drawdown) and stress-tested it before calling the project finished, rather than stopping at a single headline return number.",
            ],
          },
          {
            left: "QuantPricer — C++ Pricing Library",
            right: "2026",
            sub: "C++ for Quantitative Developers — capstone",
            bullets: [
              "Built a C++ pricing library for European options and fixed-rate bonds, exposed to Python via pybind11 and benchmarked against a pure-Python baseline — the kind of low-latency pricing tool a trading desk relies on without rewriting on every call.",
            ],
          },
        ],
      },
      {
        heading: "Education",
        entries: [{ left: "High School Diploma — Washington High School", right: "Atlanta, GA · 2020" }],
      },
    ],
  },
};
