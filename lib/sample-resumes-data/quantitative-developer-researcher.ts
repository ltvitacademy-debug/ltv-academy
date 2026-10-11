import type { PathResumes } from "../sampleResumeTypes";

const CONTACT = ["Atlanta, GA", "(404) 555-0182", "john.doe@example.com", "linkedin.com/in/johndoe-biexample"];

export const RESUMES: PathResumes = {
  "quantitative-analyst": {
    levelLabel: "Quantitative Analyst",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Quantitative Analyst with a from-scratch mathematical, programming, and markets foundation for quantitative " +
      "finance — probability, stochastic calculus, and optimization; fast research-grade Python and performance-" +
      "critical C++; derivatives pricing, portfolio theory, and risk measurement; time-series and volatility " +
      "modeling; and machine learning built and validated the way financial data actually demands. Built on a prior " +
      "data science and cloud data engineering foundation. Seven connected capstones — a calibrated asset-price " +
      "model, a Python research library, a C++ pricing library exposed to Python, a delta-hedged options portfolio, " +
      "a multi-asset returns-and-risk model, a validated ML return-prediction pipeline, and a cost-aware backtested " +
      "trading strategy — stand behind every skill claimed here. Bringing that foundation to a Quantitative Analyst " +
      "role.",
    skills: [
      "Calculus, Linear Algebra & Probability for Finance (MLE, Bayesian Inference, Regression Theory)",
      "Stochastic Processes & Monte Carlo Simulation (Random Walks, Brownian Motion, Itô's Lemma)",
      "Optimization (Convex, Constrained/Lagrangian, Quadratic & Linear Programming)",
      "High-Performance Research Python (Vectorization, NumPy/pandas/SciPy/Polars, Numba/Cython, Profiling)",
      "Research Software Engineering (OOP, Type Hints, Testing, Packaging, Experiment Tracking)",
      "Modern C++ (C++17/20) for Performance-Critical Pricing Code",
      "C++/Python Interop with pybind11",
      "Concurrency & Performance Tuning (Threads, Atomics, Benchmarking, CPU Cache Awareness)",
      "Derivatives Pricing & the Greeks (Black-Scholes, Binomial Model, Implied Volatility)",
      "Portfolio Theory & Risk Measurement (CAPM, Factor Models, VaR/CVaR, Stress Testing)",
      "Financial Time-Series Modeling (ARIMA, GARCH, Vector Autoregression, Kalman Filter)",
      "Machine Learning for Financial Data (Regularized Models, Gradient Boosting, Hierarchical Risk Parity)",
      "Rigorous Model Validation (Walk-Forward, Purged/Embargoed Cross-Validation, Deflated Sharpe Ratio)",
      "Algorithmic Trading & Backtesting (Signal Construction, Position Sizing, Transaction-Cost Modeling)",
      "Performance & Risk Reporting (Sharpe/Sortino/Calmar, Drawdown, Stress-Test Windows)",
      "SQL for Time-Series & Market Data",
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
            sub: "Quantitative Developer / Researcher Destination — Quantitative Core · Atlanta, GA",
            bullets: [
              "Completed the Data Scientist apprenticeship and a Snowflake-based cloud data engineering specialization beforehand; this destination adds the quantitative-finance-specific coursework below on top of that foundation.",
              "Built fluency in calculus for finance (limits, derivatives, multivariable gradients, Taylor series, basic ODEs) and linear algebra (matrix decompositions, eigenvalues/eigenvectors, singular value decomposition, covariance matrices and PCA, NumPy linear-algebra routines), then worked probability and statistical inference end to end — joint distributions, the Law of Large Numbers and Central Limit Theorem, maximum-likelihood and Bayesian estimation, regression theory under the Gauss-Markov assumptions, multiple-testing correction, and bootstrap resampling — and practiced constrained and unconstrained optimization and stochastic processes (random walks, Markov chains, Brownian motion, martingales, an introduction to Itô's lemma, and Monte Carlo simulation), plus the probability brainteasers and mental-math estimation used in quant-desk screening interviews.",
              "Wrote fast, memory-aware research code: vectorized NumPy/pandas instead of row-wise loops, pandas MultiIndex and time-series indexing, Parquet/Arrow columnar storage, and Polars as a modern DataFrame alternative; used SciPy for numerical integration and root-finding; profiled and sped up research code with Numba JIT compilation, basic Cython, and multiprocessing; and applied software-engineering discipline to research code — OOP design, type hints, unit tests for numerical functions, a src/ project layout with pyproject.toml packaging, structured logging/configuration, and experiment tracking — plus a research data layer pulling from market-data vendor APIs and SQL against time-series/columnar databases.",
              "Learned modern C++ (C++17/20) for performance-critical finance code — the type system, stack/heap and object lifetime, smart pointers with RAII, move semantics, classes, inheritance, operator overloading, and templates — worked with the STL and concurrency primitives (threads, mutexes, atomics, thread pools), measured and improved performance with benchmarking and an understanding of CPU caches, and bridged C++ to Python with pybind11 to expose vectorized numerical functions to NumPy.",
              "Learned how markets actually work — asset classes, exchanges/brokers/market participants, order types and the limit order book, market microstructure, liquidity and market impact, equities, fixed income and yield curves, bond pricing/duration/convexity, futures/forwards, and FX — then priced and analyzed options (payoffs, put-call parity, the binomial model, Black-Scholes, the Greeks, implied volatility and the volatility surface) and applied portfolio theory (mean-variance optimization, CAPM, factor models, performance attribution) and risk measurement (VaR, expected shortfall, stress testing, hedging strategies).",
              "Worked with real financial time-series mechanics — log returns, the stylized facts of financial returns, survivorship and other data biases — tested for stationarity, cointegration, and autocorrelation, fit AR/MA/ARMA, ARIMA, and vector autoregression models with proper out-of-sample forecast evaluation, modeled volatility with ARCH/GARCH, built factor models and risk models with shrinkage/robust covariance, and used state-space/Kalman-filter and regime-switching models, while deliberately avoiding look-ahead leakage in time-aware features.",
              "Addressed the specific failure modes of financial ML — low signal-to-noise, non-stationarity, and the overfitting problem in finance — trained and compared regularized linear models, tree-based models, gradient boosting, and neural networks on financial features, applied unsupervised methods (clustering regimes, dimensionality reduction, hierarchical risk parity), and validated every model the way quant research actually requires: walk-forward validation, purged and embargoed cross-validation, and the deflated Sharpe ratio for multiple-testing correction, instead of a plain random train/test split.",
              "Learned what actually makes a trading strategy — alpha vs. beta vs. edge, strategy families (momentum, mean reversion, carry, statistical arbitrage) — and the discipline of writing a strategy's five components (universe, signal, position sizing, risk rules, execution) down before coding it; built both vectorized and event-driven backtests modeling real transaction costs, slippage, and market impact; guarded against look-ahead bias, survivorship bias, and data snooping; and evaluated strategies on risk-adjusted terms (Sharpe, Sortino, drawdown, statistical significance) alongside the operational side — paper trading, TWAP/VWAP execution, and recognizing strategy decay.",
            ],
          },
        ],
      },
      {
        heading: "Projects",
        entries: [
          {
            left: "A Mathematical Model of Asset Prices — Capstone Project",
            right: "2026",
            sub: "Mathematics for Quantitative Finance — capstone",
            bullets: [
              "Calibrated a geometric Brownian motion model to a real-shaped daily price history by estimating drift and volatility with log-returns and maximum-likelihood estimation.",
              "Used the fitted model and Monte Carlo simulation to generate and summarize the distribution of simulated future prices one year out — the same choose-it/fit-it/forecast-with-it pipeline used on a first real quant assignment.",
            ],
          },
          {
            left: "qresearch — Python Research Library",
            right: "2026",
            sub: "Advanced Python for Quant Research — capstone",
            bullets: [
              "Designed and built a three-layer (data / computation / reporting) Python package that loads a historical price panel, computes a factor signal, converts it into a long/short portfolio, and backtests it.",
              "Held the library to three non-negotiable requirements — fast (vectorized, profiled, selectively Numba-accelerated), reproducible (seeded, versioned, src/ layout with pyproject.toml), and testable (unit tests on the computation layer) — instead of leaving it as a one-off notebook.",
            ],
          },
          {
            left: "QuantPricer — C++ Pricing Library",
            right: "2026",
            sub: "C++ for Quantitative Developers — capstone",
            bullets: [
              "Built a C++ pricing library pricing European options (closed-form Black-Scholes plus a Monte Carlo cross-check) and fixed-rate bonds (discounted cash flow), exposed to Python via pybind11 as vectorized, whole-array functions.",
              "Benchmarked the compiled library against a pure-Python baseline and packaged it as a distributable Python extension.",
            ],
          },
          {
            left: "ZQX Inc. Options Portfolio — Pricing & Delta Hedge",
            right: "2026",
            sub: "Financial Markets & Quantitative Finance — capstone",
            bullets: [
              "Priced a three-option portfolio on a fictional underlying with the Black-Scholes model, aggregated each leg's Greeks to the portfolio level, and sized a hedge trade in the underlying to flatten portfolio delta to zero.",
            ],
          },
          {
            left: "Five-Asset Returns & Risk Model",
            right: "2026",
            sub: "Time Series & Financial Modeling — capstone",
            bullets: [
              "Fit an ARMA model to each asset's log returns across a five-asset, four-sector universe, checked residual diagnostics, and fit a GARCH(1,1) model to each asset's volatility dynamics.",
              "Estimated a one-factor covariance matrix across the universe and compared it against the plain sample covariance to show where the factor structure actually mattered.",
            ],
          },
          {
            left: "ML Return-Prediction Pipeline",
            right: "2026",
            sub: "Machine Learning for Quant Finance — capstone",
            bullets: [
              "Built an end-to-end pipeline predicting a future return-related outcome from financial features, choosing a leakage-safe label and locking in a purged, walk-forward validation plan before training any model.",
              "Reported genuine out-of-sample signal strength rather than an inflated in-sample result, treating that honest answer as the actual deliverable.",
            ],
          },
          {
            left: "Momentum Strategy — Backtest & Stress Test",
            right: "2026",
            sub: "Algorithmic Trading & Backtesting — capstone",
            bullets: [
              "Specified a time-series momentum strategy's universe, signal, position sizing, risk rules, and execution assumption in writing before coding it, then built a vectorized backtest modeling real transaction costs.",
              "Measured the strategy on risk-adjusted terms and stress-tested it before calling the project finished.",
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
  "quantitative-developer-researcher": {
    levelLabel: "Quantitative Developer / Researcher",
    name: "John Doe",
    contact: CONTACT,
    summary:
      "Quantitative Developer / Researcher who has carried a research question through the entire pipeline this " +
      "program teaches, start to finish: raw market data, a precisely stated hypothesis, statistical analysis, " +
      "feature engineering, a validated model, a trading signal, a cost-aware backtest, formal risk analysis, and a " +
      "defended performance report. Built that pipeline on the mathematics, Python, C++, financial-markets, time-" +
      "series, and ML foundation below, plus a prior data science and cloud data engineering background. Bringing " +
      "that full research-to-presentation pipeline to a Quantitative Developer, Quantitative Researcher, Quant ML " +
      "Researcher, or Low-Latency / High-Frequency Trading Engineer role.",
    skills: [
      "Calculus, Linear Algebra & Probability for Finance (MLE, Bayesian Inference, Regression Theory)",
      "Stochastic Processes & Monte Carlo Simulation (Random Walks, Brownian Motion, Itô's Lemma)",
      "Optimization (Convex, Constrained/Lagrangian, Quadratic & Linear Programming)",
      "High-Performance Research Python (Vectorization, NumPy/pandas/SciPy/Polars, Numba/Cython, Profiling)",
      "Research Software Engineering (OOP, Type Hints, Testing, Packaging, Experiment Tracking)",
      "Modern C++ (C++17/20) for Performance-Critical Pricing Code",
      "C++/Python Interop with pybind11",
      "Concurrency & Performance Tuning (Threads, Atomics, Benchmarking, CPU Cache Awareness)",
      "Derivatives Pricing & the Greeks (Black-Scholes, Binomial Model, Implied Volatility)",
      "Portfolio Theory & Risk Measurement (CAPM, Factor Models, VaR/CVaR, Stress Testing)",
      "Financial Time-Series Modeling (ARIMA, GARCH, Vector Autoregression, Kalman Filter)",
      "Machine Learning for Financial Data (Regularized Models, Gradient Boosting, Hierarchical Risk Parity)",
      "Rigorous Model Validation (Walk-Forward, Purged/Embargoed Cross-Validation, Deflated Sharpe Ratio)",
      "Algorithmic Trading & Backtesting (Signal Construction, Position Sizing, Transaction-Cost Modeling)",
      "Performance & Risk Reporting (Sharpe/Sortino/Calmar, Drawdown, Stress-Test Windows)",
      "SQL for Time-Series & Market Data",
      "Git/GitHub for Reproducible Research",
      "Quant Interview Preparation (Probability, Coding, Market Knowledge, Case Interviews)",
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
            sub: "Quantitative Developer / Researcher Destination · Atlanta, GA",
            bullets: [
              "Completed the Data Scientist apprenticeship and a Snowflake-based cloud data engineering specialization beforehand, then this destination's quantitative core — mathematics, advanced Python, C++, financial markets, time-series modeling, machine learning for finance, and algorithmic trading and backtesting — before the research capstone below.",
              "Built fluency in calculus, linear algebra, probability and statistical inference, optimization, and stochastic processes (random walks, Brownian motion, martingales, an introduction to Itô's lemma, Monte Carlo simulation) as the mathematical base for every later course, plus the probability brainteasers used in quant-desk screening interviews.",
              "Wrote fast, memory-aware, reproducible Python research code (vectorized NumPy/pandas, Numba/Cython profiling, unit-tested packages with pyproject.toml) and modern C++ (C++17/20, smart pointers, concurrency primitives, performance benchmarking) bridged to Python with pybind11 for performance-critical pricing code.",
              "Learned how markets, derivatives pricing (Black-Scholes, the Greeks, implied volatility), portfolio theory (CAPM, factor models), and risk measurement (VaR, expected shortfall, stress testing) actually work, then modeled financial time series (ARIMA, GARCH, factor models, state-space/Kalman-filter models) and trained machine learning models on financial data validated with walk-forward and purged cross-validation instead of a plain random split.",
              "Built and backtested trading strategies with real transaction-cost and slippage modeling, risk-adjusted performance measurement (Sharpe, Sortino, drawdown), and safeguards against look-ahead bias, survivorship bias, and data snooping.",
              "Practiced the quant recruiting pipeline end to end — math/probability brainteasers, C++ and coding interviews, statistics/ML technical questions, market-knowledge and trading-desk interviews, and research-presentation case interviews — and learned how quant compensation and offers are actually structured when comparing firms.",
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
            sub: "Quantitative Developer / Researcher Destination — final research capstone",
            bullets: [
              "Researched whether a dollar-neutral, cross-sectional 5-day reversal strategy across the 11 S&P 500 Select Sector SPDR ETFs — plus SPY and the VIX as a volatility-regime conditioner — generates risk-adjusted excess returns that survive realistic transaction costs and purged walk-forward out-of-sample validation, correctly handling a dynamic universe where two of the eleven sector ETFs didn't exist for the full 2007–2025 sample.",
              "Validated three candidate models — a naive rank-reversal baseline, a Ridge regression production model, and a Random Forest benchmark — with purged, embargoed walk-forward cross-validation scored by Information Coefficient, and selected Ridge after it beat Random Forest honestly (out-of-sample mean IC 0.045, t≈2.1, vs. 0.018, t≈0.9 — not significant) rather than picking the more complex-looking model.",
              "Turned the model's output into a backtested, cost-aware trading signal and reported gross and net performance side by side: Sharpe fell from 0.76 gross to 0.42 net of realistic transaction costs, with net Sortino 0.58 and net Calmar 0.27.",
              "Ran a full risk analysis — VaR/CVaR at the 95th and 99th percentiles, beta to SPY — and stress-tested the strategy across four real historical windows (the 2020 COVID crash, the Q4 2018 selloff, the 2022 rate-hike bear market, and the August 2024 VIX spike), where it meaningfully outperformed SPY every time, while flagging a correlation-to-one risk: beta to SPY, normally near 0.04, spiked to roughly 0.25 during the COVID crash.",
              "Wrote a full performance report (abstract, data & methodology, results, risk analysis, limitations, appendix) that led with the net result instead of the larger gross number, named the research's genuine limitations plainly, and defended the findings to a skeptical review audience.",
            ],
          },
          {
            left: "A Mathematical Model of Asset Prices — Capstone Project",
            right: "2026",
            sub: "Mathematics for Quantitative Finance — capstone",
            bullets: [
              "Calibrated a geometric Brownian motion model to a real-shaped daily price history using log-returns and maximum-likelihood estimation, then used Monte Carlo simulation to summarize the one-year-ahead price distribution.",
            ],
          },
          {
            left: "qresearch — Python Research Library",
            right: "2026",
            sub: "Advanced Python for Quant Research — capstone",
            bullets: [
              "Built a fast, reproducible, tested three-layer Python package that loads a price panel, computes a factor signal, builds a long/short portfolio, and backtests it.",
            ],
          },
          {
            left: "QuantPricer — C++ Pricing Library",
            right: "2026",
            sub: "C++ for Quantitative Developers — capstone",
            bullets: [
              "Built a C++ pricing library for European options and fixed-rate bonds, exposed to Python via pybind11 and benchmarked against a pure-Python baseline.",
            ],
          },
          {
            left: "ML Return-Prediction Pipeline",
            right: "2026",
            sub: "Machine Learning for Quant Finance — capstone",
            bullets: [
              "Built and honestly validated an end-to-end ML return-prediction pipeline, locking in a purged, walk-forward validation plan before training any model.",
            ],
          },
        ],
      },
      {
        heading: "GitHub Portfolio",
        entries: [
          {
            left: "github.com/johndoe-biexample/sr5-sector-reversal",
            right: "2026",
            sub: "SR-5 capstone — public research repository",
            bullets: [
              "Published the SR-5 data pipeline and point-in-time universe handling, the purged walk-forward validation code, the transaction-cost model, and the full performance report — limitations section intact — so a reviewer can check the 0.42 net Sharpe claim directly instead of taking it on faith.",
              "Wrote the capstone's resume bullets naming the method and an honestly-qualified result rather than an oversold claim — the same 'name the method, name a real result, never overclaim' pattern this program's own resume-and-portfolio lesson teaches quant candidates to use.",
            ],
          },
          {
            left: "github.com/johndoe-biexample/qresearch",
            right: "2026",
            sub: "Factor-research and signal-backtesting toolkit",
            bullets: [
              "Published the qresearch library with its test suite and pyproject.toml packaging intact, letting a reviewer verify the 'fast, reproducible, testable' claim directly rather than take it on faith.",
            ],
          },
          {
            left: "github.com/johndoe-biexample/quantpricer",
            right: "2026",
            sub: "C++ options & bond pricing library with Python bindings",
            bullets: [
              "Published QuantPricer's C++ source, pybind11 bindings, and benchmark results against the pure-Python baseline.",
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
