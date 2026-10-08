# Capstone: Build It

Lesson 31 specified the strategy and built the signal and sizing logic. This lesson turns that into a complete, cost-aware vectorized backtest with a drawdown kill switch, runs the full Chapter 5 performance suite on it, and then runs both planned stress tests. Build this against your own chosen signal if you're doing the capstone yourself — the pipeline below is what to replicate, not the specific numbers.

## What you'll learn

- How to turn a signal and a sizing rule into a complete vectorized backtest with turnover-based costs
- How to add a backtested drawdown kill switch, consistent with Lesson 29's live-monitoring version
- How to run the full Chapter 5 performance suite in one pass
- How to implement both stress tests from Lesson 31 and read their results honestly
- Why this capstone's own result is a good example of exactly what Lesson 1 warned you about

## The complete backtest function

This extends Lesson 31's signal and sizing code with turnover-based transaction costs (Lesson 16) and a drawdown-triggered kill switch (Lesson 29), then returns the full Chapter 5 metric suite:

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(31)
n_days = 1000
daily_ret = rng.normal(0.0004, 0.011, n_days)
price = 100 * (1 + pd.Series(daily_ret)).cumprod()  # same illustrative series as Lesson 31

LOOKBACK, VOL_TARGET, VOL_LOOKBACK = 20, 0.10, 20
COST_PER_UNIT_TURNOVER = 0.0005   # illustrative 5 bps per unit of position change
MAX_DD_LIMIT = -0.20               # risk rule: kill switch at -20% drawdown

def momentum_signal(price_series, lookback=LOOKBACK):
    mom = price_series.pct_change(lookback)
    return np.sign(mom).fillna(0.0)

def vol_target_size(returns, vol_target=VOL_TARGET, lookback=VOL_LOOKBACK):
    realized_vol = returns.rolling(lookback).std(ddof=1) * np.sqrt(252)
    return (vol_target / realized_vol).clip(upper=3.0)

def run_backtest(price_series, cost_per_turnover=COST_PER_UNIT_TURNOVER, dd_limit=MAX_DD_LIMIT):
    raw_returns = price_series.pct_change()
    signal = momentum_signal(price_series)
    size_scale = vol_target_size(raw_returns)
    target_position = (signal * size_scale).shift(1).fillna(0.0)

    turnover = target_position.diff().abs().fillna(0.0)
    gross_return = target_position * raw_returns
    cost = turnover * cost_per_turnover
    net_return = (gross_return - cost).fillna(0.0)

    equity = (1 + net_return).cumprod()
    drawdown = equity / equity.cummax() - 1.0

    # Kill switch: once the drawdown limit is breached, flatten for the rest
    # of the sample -- the backtested version of Lesson 29's live risk rule
    breach = drawdown <= dd_limit
    if breach.any():
        breach_idx = breach.idxmax()
        net_return = net_return.copy()
        net_return.loc[breach_idx + 1:] = 0.0
        equity = (1 + net_return).cumprod()
        drawdown = equity / equity.cummax() - 1.0

    n = len(net_return)
    mean_d, std_d = net_return.mean(), net_return.std(ddof=1)
    ann_return = equity.iloc[-1] ** (252 / n) - 1
    sharpe = mean_d / std_d * np.sqrt(252) if std_d > 0 else np.nan
    downside = net_return[net_return < 0]
    sortino = mean_d / np.sqrt((downside**2).mean()) * np.sqrt(252) if len(downside) else np.nan
    max_dd = drawdown.min()
    calmar = ann_return / abs(max_dd) if max_dd < 0 else np.nan

    return {"ann_return": ann_return, "sharpe": sharpe, "sortino": sortino,
            "max_dd": max_dd, "calmar": calmar, "total_cost": cost.sum(),
            "equity_final": equity.iloc[-1]}

base = run_backtest(price)
for k, v in base.items():
    print(f"  {k:12s}: {v:.4f}")
```

```
  ann_return  : 0.0070
  sharpe      : 0.1188
  sortino     : 0.1133
  max_dd      : -0.1913
  calmar      : 0.0366
  total_cost  : 0.0607
  equity_final: 1.0281
```

Read this honestly, the way Lesson 25 insisted on: a Sharpe of 0.12, after realistic costs, over roughly four illustrative years, is a weak result — not a disaster, but nowhere near the "Sharpe of 1 is solid" benchmark from Lesson 21. Total cost drag of about 6% of capital over the period is a real, material bite on a strategy with this little gross edge to begin with. This is a perfectly legitimate capstone outcome: the point of the exercise is running the pipeline correctly and reading the result honestly, not manufacturing an impressive number.

## Stress test 1: cost shock

```python
stressed_cost = run_backtest(price, cost_per_turnover=COST_PER_UNIT_TURNOVER * 3)
for k, v in stressed_cost.items():
    print(f"  {k:12s}: {v:.4f}")
```

```
  ann_return  : -0.0484
  sharpe      : -0.4427
  sortino     : -0.4009
  max_dd      : -0.2070
  calmar      : -0.2336
  total_cost  : 0.1822
  equity_final: 0.8214
```

Tripling the per-trade cost assumption — still a realistic range for a less liquid instrument or a worse execution algorithm (Lesson 27) — flips the strategy from a weak positive Sharpe to a clearly negative one. This is exactly the fragility Lesson 16 and Lesson 17 warned about: a strategy whose edge is this thin is extremely exposed to how optimistic its cost assumptions are, and "the strategy worked at my assumed cost level" is a much weaker claim than it sounds.

## Stress test 2: adverse regime

```python
rng2 = np.random.default_rng(999)
adverse_returns = daily_ret.copy()
# Splice a high-volatility, trending-down period into the final 100 days
adverse_returns[-100:] = rng2.normal(-0.0020, 0.025, 100)
adverse_price = 100 * (1 + pd.Series(adverse_returns)).cumprod()

stressed_regime = run_backtest(adverse_price)
for k, v in stressed_regime.items():
    print(f"  {k:12s}: {v:.4f}")
```

```
  ann_return  : -0.0092
  sharpe      : -0.0344
  sortino     : -0.0331
  max_dd      : -0.1730
  calmar      : -0.0533
  total_cost  : 0.0602
  equity_final: 0.9639
```

Replacing the final 100 days with a simulated high-volatility downtrend also flips the result negative — interestingly, here the drawdown kill switch never actually triggers (max drawdown of -17.3% stays inside the -20% limit), yet the strategy still loses money over the regime-shifted period, because trend-following-style momentum sizing can get repeatedly wrong-footed by a choppy, high-volatility decline rather than a smooth one. That distinction — "did the kill switch save it, or did the strategy genuinely underperform within its own risk limits" — is exactly the kind of detail a stress test is supposed to surface, and exactly the kind of detail a one-line "stress test passed" summary would hide.

## Reading the two stress tests together

Neither stress test alone tells the whole story: the base case already had a thin, unimpressive edge; the cost shock shows that edge is highly cost-sensitive; the regime test shows it's also sensitive to volatility and trend characteristics outside its typical historical sample. Combined, the honest conclusion for this particular illustrative run is that this specific momentum specification, on this data, is not a strategy worth deploying as-is — which is a completely legitimate, useful capstone finding. A capstone that concludes "this simple specification doesn't survive stress-testing, here specifically is why" demonstrates the course's actual skill far better than one that reports an unstressed, flattering Sharpe ratio and stops there.

## Key terms

| Term | Meaning |
|---|---|
| Turnover-based cost | Transaction cost modeled as proportional to the change in position size each period |
| Backtested kill switch | A drawdown-triggered rule inside the backtest itself that flattens the position for the remainder of the sample, mirroring a live risk control |
| Cost shock | Re-running a backtest with cost assumptions multiplied up to test sensitivity |
| Adverse regime splice | Replacing part of a historical sample with a simulated worse-than-typical period to test robustness |

## Recap

The complete backtest combined Lesson 31's signal and sizing with turnover costs and a drawdown kill switch, and both stress tests revealed real fragility in this particular specification — a thin base-case edge that turns negative under higher costs or a tougher regime. That's a legitimate, honestly-reported result, not a failed assignment. Next, Lesson 33 covers how to write this result up and present it the way a hiring manager or research lead would actually want to see it.
