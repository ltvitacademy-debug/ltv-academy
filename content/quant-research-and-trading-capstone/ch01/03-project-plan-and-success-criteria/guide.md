# Project Plan & Success Criteria

With the research question and hypothesis stated, the last thing to settle before touching the data is the plan itself: what order you'll do the work in, what tools you'll use, and — critically — what counts as success. That last part has to be decided now, before any results exist, or it stops meaning anything.

## What you'll learn

- The four-phase project plan this capstone follows, chapter by chapter
- The full tooling stack: Python, C++ via pybind11, Jupyter, Parquet, and Markdown-to-PDF
- Why success criteria are defined before looking at results — preregistration discipline
- Key terms: preregistration, walk-forward, Sharpe ratio (previewed here, defined fully in Chapter 4)

## The four-phase plan

The capstone runs in four phases, each its own chapter:

1. **Data & statistical analysis** (Chapter 2) — clean the Stooq data, explore it, and run formal statistical tests on the reversal hypothesis before building anything.
2. **Features, model & signal** (Chapter 3) — engineer features, train and validate a model, and turn model output into an actual tradable signal.
3. **Backtest & risk** (Chapter 4) — build the backtest, add realistic transaction costs, and run risk analysis and historical stress tests.
4. **Report & presentation** (Chapter 5) — write up the findings as a performance report and defend them in a presentation to a skeptical audience.

Each phase only starts once the previous one has produced a clear answer — there's no point engineering features in Chapter 3 if Chapter 2's statistics say the hypothesis is dead on arrival.

## The tooling stack

- **Python 3.11** (pandas, NumPy, scikit-learn, statsmodels, matplotlib) — the research language for everything from data cleaning to modeling to plotting.
- **C++17 performance core, `sr5_fast`**, exposed to Python via **pybind11** — used where Python alone is too slow: the rolling cross-sectional z-scores and the purged walk-forward retraining loop.

```cpp
// sr5_fast.cpp -- pybind11 module
#include <pybind11/pybind11.h>
#include <pybind11/eigen.h>

Eigen::MatrixXd rolling_zscore(const Eigen::MatrixXd& ret, int window) {
    // rolling cross-sectional z-score, computed in C++ for speed
    // ... (see Chapter: C++ for Quantitative Developers for the full build)
}

PYBIND11_MODULE(sr5_fast, m) {
    m.def("rolling_zscore", &rolling_zscore, "Rolling cross-sectional z-score");
}
```

- **Jupyter** for research notebooks, where exploration and iteration happen.
- **Parquet** for storing intermediate and final results — columnar, fast, and schema-stable across the pipeline.
- **Markdown, compiled to PDF**, for the final written report, and a **slide deck** for the presentation.

## Success criteria, defined before results exist

This is **preregistration** discipline, borrowed from clinical research: you write down what would count as a success or a failure before you know the answer, specifically so you can't quietly move the goalposts once you see favorable (or unfavorable) numbers. For SR-5, success means all of the following:

- The reversal effect is **statistically significant** in Chapter 2's tests, not just numerically present.
- The strategy shows a positive out-of-sample **walk-forward** Sharpe ratio — meaning the model is retrained and evaluated only on data that comes strictly after its training window, simulating how it would have performed in real time — net of realistic transaction costs. (**Sharpe ratio**, previewed here and defined fully in Chapter 4, measures risk-adjusted return: excess return divided by its volatility.)
- Maximum drawdown stays within an acceptable range for the strategy's risk budget.
- The strategy survives historical stress windows (the COVID crash, the 2018 selloff, the 2022 bear market) without catastrophic losses, even if it doesn't make money in all of them.

If the data had come back null, the honest move would have been to say so and pivot — not force a result. Lesson 6 covers exactly that scenario.

## Key terms

| Term | Meaning |
|---|---|
| Preregistration | Committing to success/failure criteria before seeing results, to prevent moving the goalposts |
| Walk-forward | Validation that only ever trains on the past and tests on data strictly after it, simulating real-time use |
| Sharpe ratio | Risk-adjusted return: excess return divided by its volatility (full definition in Chapter 4) |

## Recap

The plan is four phases — data and stats, features and model, backtest and risk, report and presentation — run with Python, a C++ performance core, Jupyter, Parquet, and Markdown-to-PDF. Success is defined now, before any results exist: a statistically significant effect, a positive net-of-cost walk-forward Sharpe, acceptable drawdown, and survival through real historical stress events. Chapter 2 starts the real work next: cleaning and exploring the market data.
