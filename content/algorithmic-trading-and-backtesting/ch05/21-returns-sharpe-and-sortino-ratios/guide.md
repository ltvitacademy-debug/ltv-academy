# Returns, Sharpe & Sortino Ratios

Chapter 4 was about making sure a backtest's trades could actually have happened. Assume they could have — you now have an honest series of returns. This lesson gives you the standard vocabulary professionals use to describe what those returns are actually worth: not just "did it go up," but how much return you got for how much pain, measured two different ways.

## What you'll learn

- Simple vs. log returns, and why compounding makes the distinction matter
- How to annualize a daily return series correctly
- The Sharpe ratio: return per unit of total volatility
- The Sortino ratio: return per unit of *downside* volatility only, and why that's often the fairer measure
- Why a single Sharpe number from one backtest run is a start, not a verdict

## Simple returns, log returns, and compounding

A **simple return** over one period is `r_t = (P_t - P_{t-1}) / P_{t-1}`. A **log return** is `ln(P_t / P_{t-1})`. For small daily moves the two are nearly identical, but log returns have a property simple returns don't: they add across time instead of compounding multiplicatively, which makes them convenient for statistics (summing log returns gives total log return) while simple returns are what actually determines your account balance. In practice: use log returns for statistical work (means, variances, Sharpe ratios), and compound simple returns when you need an actual equity curve or dollar P&L. Both conventions are standard; what matters is being consistent and saying which one you used.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(9)
n_days = 504  # 2 trading years of illustrative synthetic daily returns
# Labeled synthetic data: NOT a real traded strategy, just illustrative
daily_returns = pd.Series(rng.normal(0.0006, 0.010, n_days))

mean_daily = daily_returns.mean()
std_daily = daily_returns.std(ddof=1)
# Geometric (compounded) annualized return, not mean * 252
ann_return = (1 + daily_returns).prod() ** (252 / n_days) - 1
ann_vol = std_daily * np.sqrt(252)

print(f"mean daily return : {mean_daily:.6f}")
print(f"daily volatility   : {std_daily:.6f}")
print(f"annualized return  : {ann_return:.4f}")
print(f"annualized vol     : {ann_vol:.4f}")
```

```
mean daily return : 0.000651
daily volatility   : 0.010221
annualized return  : 0.1629
annualized vol     : 0.1623
```

Notice the annualized return is the *compounded* result of 504 days of returns, not simply `mean_daily * 252` — compounding and simple scaling give close but not identical numbers, and for anything beyond a quick sanity check you should compound. Volatility, by contrast, is conventionally scaled by `sqrt(252)` (the square-root-of-time rule, which assumes returns are roughly independent day to day — a simplification, but the market standard one).

## The Sharpe ratio: return per unit of total risk

The **Sharpe ratio** is the single most quoted number in the industry:

```
Sharpe = (mean_return - risk_free_rate) / volatility
```

computed on whatever period your returns are in, then annualized by multiplying by `sqrt(252)` for daily data (or `sqrt(12)` for monthly). It answers: for every unit of return volatility you took on, how much excess return did you get? A Sharpe of 1.0 is considered solid for a systematic strategy; above 2.0 is very good and should make you suspicious enough to re-check for the biases from Chapter 4 before believing it; below 0.5 is weak, even if the raw return number looks attractive, because it means you're being paid little for a lot of bumpiness.

```python
rf_daily = 0.0  # assume a zero risk-free rate for this illustration
sharpe_ann = (mean_daily - rf_daily) / std_daily * np.sqrt(252)
print(f"Sharpe ratio : {sharpe_ann:.3f}")
```

```
Sharpe ratio : 1.012
```

The Sharpe ratio's main weakness: it penalizes upside volatility exactly as much as downside volatility. A strategy with occasional large *gains* and otherwise steady small losses gets the same volatility penalty as one with occasional large *losses* — even though only one of those return patterns is actually something you'd want to avoid.

## The Sortino ratio: only punish the downside

The **Sortino ratio** fixes that asymmetry by replacing total volatility with **downside deviation** — the standard deviation computed using only returns below a target (usually zero, or the risk-free rate):

```python
downside = daily_returns[daily_returns < rf_daily]
downside_dev_daily = np.sqrt((downside ** 2).mean())
sortino_ann = (mean_daily - rf_daily) / downside_dev_daily * np.sqrt(252)

print(f"down days          : {len(downside)} / {n_days}")
print(f"downside dev (daily): {downside_dev_daily:.6f}")
print(f"Sortino ratio       : {sortino_ann:.3f}")
```

```
down days          : 229 / 504
downside dev (daily): 0.010305
Sortino ratio       : 1.003
```

In this illustrative, roughly symmetric synthetic series, Sharpe and Sortino come out almost identical — which makes sense, since downside deviation and total deviation are nearly the same when returns have no particular skew. The two ratios diverge most, and matter most, for strategies with genuinely asymmetric return patterns: a trend-following strategy with small frequent losses and rare large gains will show a *much* higher Sortino than Sharpe, while a strategy that sells options or otherwise collects small steady premiums against rare large losses will show the opposite — a Sortino noticeably *lower* than its Sharpe, which is exactly the warning sign you want that ratio to surface.

## Reading one Sharpe number honestly

A Sharpe ratio computed from one historical run, especially a short one, has real estimation error — Lesson 25 later in this chapter puts a number on exactly how much. For now, the practical discipline: always report the sample period and length alongside the ratio, never compare Sharpe ratios computed over different horizons as if they were equally reliable, and treat Lesson 19's overfitting warning as doubly true here — a Sharpe ratio that was itself the selection criterion in a parameter search is not a trustworthy estimate of anything going forward.

## Key terms

| Term | Meaning |
|---|---|
| Simple return | `(P_t - P_{t-1}) / P_{t-1}`; what actually determines account balance |
| Log return | `ln(P_t / P_{t-1})`; additive across time, convenient for statistics |
| Sharpe ratio | Annualized excess return divided by total return volatility |
| Sortino ratio | Annualized excess return divided by downside-only return volatility |
| Downside deviation | Standard deviation computed using only returns below a target threshold |

## Recap

Sharpe measures return per unit of total volatility; Sortino measures return per unit of downside-only volatility, and the gap between the two tells you something real about a strategy's return shape. Neither number means much as a single point estimate from a short run. Next, Lesson 22 turns to the measure traders feel the most: drawdown — how deep the losses get and how long recovery takes.
