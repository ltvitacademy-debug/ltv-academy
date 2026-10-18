# Capstone: Building a Portfolio Optimizer vs. a Benchmark

This closing lesson pulls together everything in this chapter into one hands-on build: compute all three portfolio-construction methods from Lessons 36-37 on the same inputs, simulate a real multi-year return path with monthly rebalancing (Lesson 39), and compare each one's actual realized performance — return, volatility, Sharpe, and max drawdown (Lesson 38) — against a simple equal-weight benchmark. The honest result below is more useful than a cherry-picked one: it shows exactly why a single backtest, on its own, is a much weaker form of evidence than the mean-variance theory in Lesson 36 might suggest.

## What you'll learn

- How to build one optimizer function that produces min-variance, tangency, and risk-parity weights from the same inputs
- How to backtest multiple portfolios against each other with consistent rebalancing rules
- Why a single simulated (or historical) path is not strong evidence that one method is "better," even when the numbers look decisive
- How this connects directly back to Chapter 4's lesson on data snooping and overfitting

## Building the optimizer

Using the same three-asset inputs from Lesson 36 (volatilities, correlations, expected returns) and Lesson 37 (inverse-volatility weighting):

```python
import numpy as np

vols = np.array([0.15, 0.20, 0.25])
corr = np.array([
    [1.0, 0.3, 0.1],
    [0.3, 1.0, 0.4],
    [0.1, 0.4, 1.0],
])
mu = np.array([0.08, 0.11, 0.14])
rf = 0.03

cov = corr * np.outer(vols, vols)
cov_inv = np.linalg.inv(cov)
ones = np.ones(3)

def min_variance_weights():
    w = cov_inv @ ones
    return w / w.sum()

def tangency_weights():
    w = cov_inv @ (mu - rf)
    return w / w.sum()

def risk_parity_weights():
    inv_vols = 1 / vols
    return inv_vols / inv_vols.sum()

equal_weights = np.array([1/3, 1/3, 1/3])

print("Min-variance:  ", np.round(min_variance_weights(), 4))
print("Tangency:      ", np.round(tangency_weights(), 4))
print("Risk-parity:   ", np.round(risk_parity_weights(), 4))
print("Equal-weight:  ", np.round(equal_weights, 4))
```

```
Min-variance:   [0.6407 0.1905 0.1688]
Tangency:       [0.4105 0.2441 0.3453]
Risk-parity:    [0.4255 0.3191 0.2553]
Equal-weight:   [0.3333 0.3333 0.3333]
```

These are exactly Lesson 36 and 37's weights — the optimizer function is just the formulas from this chapter, called four ways on the same covariance and return inputs.

## Backtesting all four against each other

Using correlated daily returns generated from the same `mu`/`vols`/`corr` inputs (756 trading days — 3 simulated years), with monthly (21-trading-day) rebalancing back to each strategy's target weights (Lesson 39's calendar approach):

```python
def backtest(weights, daily_returns, rebalance_every=21):
    values = weights.copy()
    equity_curve = [1.0]
    for t in range(len(daily_returns)):
        values *= (1 + daily_returns[t])
        total = values.sum()
        equity_curve.append(total)
        if (t + 1) % rebalance_every == 0:
            values = weights * total
    return np.array(equity_curve)

def annualized_stats(equity_curve, rf):
    daily_rets = equity_curve[1:] / equity_curve[:-1] - 1
    n = len(daily_rets)
    ann_ret = (equity_curve[-1] / equity_curve[0]) ** (252 / n) - 1
    ann_vol = daily_rets.std() * np.sqrt(252)
    sharpe = (ann_ret - rf) / ann_vol
    running_peak = np.maximum.accumulate(equity_curve)
    max_dd = ((equity_curve - running_peak) / running_peak).min()
    return ann_ret, ann_vol, sharpe, max_dd
```

```
Equal-weight (benchmark):  final=1.0248  annRet=0.82%   annVol=14.28%  Sharpe=-0.153  maxDD=-23.54%
Min-variance:              final=1.4171  annRet=12.32%  annVol=12.66%  Sharpe=0.736   maxDD=-12.40%
Tangency:                  final=1.0785  annRet=2.55%   annVol=13.80%  Sharpe=-0.033  maxDD=-19.45%
Risk-parity (inv-vol):     final=1.1502  annRet=4.78%   annVol=13.41%  Sharpe=0.132   maxDD=-17.58%
```

## Stop and interpret this before reading on

At first glance, this looks like a clean win for minimum-variance: highest return, lowest volatility, best Sharpe, and the shallowest drawdown, all at once. **Resist the urge to conclude "minimum-variance is the best method" from this table.**

<details>
<summary>Why this single result is weaker evidence than it looks</summary>

Lesson 36 built the tangency portfolio specifically to maximize *expected* Sharpe ratio, given the true `mu` and `cov` inputs — and in this framework, those inputs ARE the true, known data-generating parameters (this is a simulation, not real historical data with estimation error layered on top). So why did tangency underperform here? Because **one simulated 3-year path is one random draw**, and realized returns over any single finite path can and do deviate substantially from their expected values — exactly the kind of sampling noise Chapter 4's data-snooping lesson warned about, just showing up here in portfolio returns instead of a backtested trading signal's Sharpe ratio.

Minimum-variance "won" this particular draw partly because it's a structurally lower-volatility, more defensive portfolio (which tends to look good when nothing unusual happens over the simulated path) and partly because of this specific random seed's realized path. A different random seed — a different 3-year "universe" drawn from the exact same `mu`, `vols`, and `corr` — would very plausibly show a different ranking. Rerunning this exact backtest across hundreds of different random seeds, and looking at the *average* ranking and the *spread* of outcomes across all of them, is the only way to honestly tell which method is structurally better versus which one happened to get lucky on this one path — the same walk-forward, out-of-sample discipline Chapter 4 built, applied here to portfolio construction instead of a trading rule.

</details>

## The honest takeaway

A mean-variance optimizer is only as good as the `mu` estimate it's fed, and even with the exactly correct `mu`, a single realized path is still just one noisy draw from a distribution — not a guarantee. This is precisely why Lesson 37's risk parity (needing no `mu` at all) is a genuinely defensible alternative when return forecasts are weak, and why any single backtest — simulated or historical — deserves the same skepticism this course has applied to every other one-shot result since Chapter 4.

## Key terms

| Term | Meaning |
|---|---|
| Optimizer | Here, the set of functions computing min-variance, tangency, and risk-parity weights from the same covariance/return inputs |
| Benchmark | A simple reference portfolio (here, equal-weight) that a strategy is compared against |
| Realized vs. expected performance | What actually happened on one specific path, versus what the method targets on average across many possible paths |

## Check yourself

Why does minimum-variance "winning" this one simulated backtest NOT prove it's structurally superior to the tangency portfolio, even though the tangency portfolio was built from the exact correct expected returns?
