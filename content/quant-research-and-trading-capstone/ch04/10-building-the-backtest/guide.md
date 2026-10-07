# Building the Backtest

The signal exists. This lesson builds the machine that runs it through eighteen years of history: the architecture first, with costs and risk metrics coming in the next two lessons. The theme here is the same one that's run through every phase of this capstone — speed where it's needed, honesty about lookahead everywhere else.

## What you'll learn

- The two-language architecture: a Python research layer plus a C++ performance core
- Why the rolling cross-sectional z-score and the purged walk-forward retrain loop are the parts that need C++
- How `pybind11` exposes that C++ core back to Python as an ordinary import
- The vectorized, point-in-time-aligned weekly backtest loop, and its three required outputs

## Python for research, C++ where speed matters

The research layer — feature engineering, model fitting, exploratory analysis — stays pure Python: pandas, NumPy, and Jupyter notebooks, chosen because they're fast to iterate on. But two loops run thousands of times over the full 2007–2025 history: the **rolling cross-sectional z-score** (recomputed for every feature, every day, every sector) and the **purged walk-forward retraining loop** (re-fitting Ridge at every one of the ~180 OOS periods). Both get pushed into **`sr5_fast`**, a C++17 performance core, and exposed back to Python through **pybind11** so the rest of the codebase calls it like any other Python function.

```cpp
// sr5_fast.cpp -- pybind11 module
#include <pybind11/pybind11.h>
#include <pybind11/eigen.h>

Eigen::MatrixXd rolling_zscore(const Eigen::MatrixXd& ret, int window) {
    // rolling cross-sectional z-score, computed in C++ for speed
}

PYBIND11_MODULE(sr5_fast, m) {
    m.def("rolling_zscore", &rolling_zscore, "Rolling cross-sectional z-score");
}
```

The Python research code barely changes — it calls `sr5_fast.rolling_zscore(...)` instead of a pandas rolling-apply, and gets the identical answer dramatically faster, which matters once you're re-running the full walk-forward loop dozens of times while iterating on features.

## A vectorized, point-in-time backtest loop

```python
equity = 1.0
for friday in rebalance_dates:
    scores = model.predict(X.loc[friday])
    weights = build_weights(scores, inv_vol.loc[friday])
    fwd_ret = (weights * next_week_returns).sum()
    equity *= (1 + fwd_ret)
```

The backtest loop stays weekly and deliberately simple: for every Friday rebalance date, the model's prediction and that Friday's inverse-volatility weights are the *only* inputs allowed to touch that week's decision; `next_week_returns` is the realized return over the week that follows. **Point-in-time alignment** is the entire discipline here — nothing dated after the rebalance Friday is allowed to leak into that Friday's decision, the same principle as Lesson 7's embargo and Lesson 9's execution lag, now enforced at the backtest-engine level.

## What every run produces

Every backtest run writes three outputs to **Parquet**:

- **Equity curve** — the compounding path of the portfolio over the full history, not just a single final number
- **Holdings log** — every position held, at every rebalance date, for auditing exactly what was held and why
- **Turnover** — how much of the portfolio actually changed hands at each weekly rebalance

That last one matters more than it looks: turnover is the number that drives the entire cost story in Lesson 11.

## Key terms

| Term | Meaning |
|---|---|
| Vectorized backtest | A backtest expressed as array operations rather than an explicit bar-by-bar loop |
| Point-in-time alignment | Ensuring no data dated after a decision point can influence that decision |
| Turnover | The fraction of the portfolio's notional that trades at each rebalance |
| pybind11 | A library that exposes C++ functions as callable Python objects |

## Recap

The backtest engine splits cleanly: Python for research and orchestration, a C++17 `sr5_fast` core (via pybind11) for the two loops that actually need speed — rolling z-scores and walk-forward retraining — and a vectorized, point-in-time-aligned weekly loop that produces an equity curve, a holdings log, and a turnover series, all saved to Parquet. Next, Lesson 11 asks what happens to these results once trading actually costs something.
