# Position Sizing & the Kelly Criterion

Having a real edge is not enough — sizing it wrong can turn a genuinely profitable strategy into one that goes bankrupt anyway. The Kelly criterion is the classic framework for sizing a bet to maximize long-run growth, and it comes with a sharp, important warning about estimation error that every quant needs to internalize before using it.

## What you'll learn

- The discrete (binary-outcome) Kelly formula and what each term means
- The continuous form of Kelly used for strategies with normally-distributed returns
- Why full Kelly is extremely volatile in practice, and what "fractional Kelly" means
- The sampling-error problem: why your estimate of edge is noisier than you think
- Why over-levering a Kelly estimate is a realistic way to blow up a good strategy

## The discrete Kelly formula

For a simple bet with probability `p` of winning `b` units per unit risked, and probability `q = 1 - p` of losing 1 unit, the Kelly fraction that maximizes long-run expected log growth is:

```
f* = (b*p - q) / b
```

- `f*` — the fraction of capital to risk on the bet
- `b` — the payout odds (win `b` units per unit risked)
- `p` — probability of winning; `q = 1 - p`

```python
def kelly_discrete(p: float, b: float) -> float:
    q = 1 - p
    return (b * p - q) / b

# Example: 55% win probability, even-money payout (b = 1)
f_star = kelly_discrete(p=0.55, b=1.0)  # = 0.10
```

If `f*` is negative, the bet has negative expected value at those odds — Kelly correctly tells you to take no position (or, if shorting is available, to bet the other way).

## The continuous form for a trading strategy

Real trading strategies don't have a single win/loss outcome — they have a continuous stream of returns. For a strategy whose returns are approximately normally distributed with mean `mu` and variance `sigma^2` (both typically annualized), the continuous-time Kelly fraction that maximizes expected log growth is:

```
f* = mu / sigma^2
```

```python
import numpy as np

# returns: daily strategy return Series
mu = returns.mean() * 252        # annualized expected return
sigma2 = returns.var() * 252     # annualized variance
f_star = mu / sigma2
```

Intuitively: the higher the expected return relative to its variance, the more you should size the bet — but because variance is in the denominator, a strategy with high *and* volatile returns gets sized down fast, which is the formula correctly penalizing uncertainty.

## Why full Kelly is almost never used as-is

Full Kelly maximizes long-run geometric growth, but it does so by accepting very large short-term swings — a full-Kelly bettor can see drawdowns of 50% or more along the way, even when the underlying edge is completely real. Most practitioners use **fractional Kelly**, scaling the Kelly fraction down by a constant (commonly 0.25 to 0.5):

```python
fractional_kelly = 0.5 * f_star
```

Fractional Kelly gives up some long-run growth in exchange for a dramatically smoother ride and far less sensitivity to the next problem.

## The real danger: your edge estimate has sampling error

The Kelly formula assumes you know `mu` and `sigma^2` exactly. In practice, `mu` — the expected return — is estimated from a finite, noisy sample, and that estimate's own uncertainty (its standard error) is often large relative to `mu` itself, especially over the sample lengths available in a backtest. Plugging an *overestimated* `mu` into the Kelly formula produces an *oversized* position, and because the Kelly formula has no built-in awareness that `mu` might be wrong, a strategy that looks like it should bet 40% of capital on a backtest's estimated edge can be betting on an edge that's really half that size (or zero) once estimation error and the honest confidence interval around `mu` are accounted for. This is exactly why fractional Kelly is standard practice, not caution for its own sake: it's a direct, practical hedge against the fact that you never truly know `mu` and `sigma^2`, only estimates of them — and it's a theme the Realism in Backtests chapter later in this course returns to from a different angle.

## Key terms

| Term | Meaning |
|---|---|
| Kelly criterion | A position-sizing rule that maximizes long-run expected log growth |
| Discrete Kelly | `f* = (b*p - q) / b` for a simple win/lose bet with payout odds `b` |
| Continuous Kelly | `f* = mu / sigma^2` for a strategy with approximately normal returns |
| Fractional Kelly | Scaling the Kelly fraction down (commonly by half or a quarter) to reduce volatility and estimation-error risk |
| Sampling error | The uncertainty in an estimated parameter (like `mu`) due to using a finite historical sample |

## Recap

Kelly sizing maximizes long-run growth given a known edge, but the edge is never actually known — it's estimated with real sampling error, which is exactly why fractional Kelly, not full Kelly, is the practical default. Next, Lesson 10 zooms out from a single position to the whole portfolio: risk budgeting and leverage.
