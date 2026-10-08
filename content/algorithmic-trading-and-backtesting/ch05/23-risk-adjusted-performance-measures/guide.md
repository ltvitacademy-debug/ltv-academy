# Risk-Adjusted Performance Measures

Sharpe, Sortino, and now drawdown give you three different lenses on the same return series. This lesson rounds out the toolkit with three more measures you'll see constantly in tear sheets and fund marketing materials: the Calmar ratio (return per unit of drawdown), the Omega ratio (a threshold-based measure that uses the whole return distribution, not just its mean and variance), and the Information ratio (performance relative to a benchmark, not in isolation).

## What you'll learn

- The Calmar ratio: annualized return divided by maximum drawdown
- The Omega ratio: a distribution-based measure that doesn't assume returns are normally distributed
- The Information ratio: how to score a strategy against a benchmark, not an absolute zero
- Why no single ratio is "the" right one — each answers a different question
- How to read a tear sheet's ratio section without being fooled by whichever number looks best

## Calmar ratio: reward over worst-case pain

The **Calmar ratio** directly combines the two most-quoted numbers from the last two lessons:

```
Calmar = annualized_return / abs(max_drawdown)
```

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(9)
n_days = 504  # same illustrative synthetic series as Lessons 21-22
daily_returns = pd.Series(rng.normal(0.0006, 0.010, n_days))

equity = (1 + daily_returns).cumprod()
drawdown = equity / equity.cummax() - 1.0
max_dd = drawdown.min()
ann_return = equity.iloc[-1] ** (252 / n_days) - 1

calmar = ann_return / abs(max_dd)
print(f"annualized return : {ann_return:.4f}")
print(f"max drawdown      : {max_dd:.4f}")
print(f"Calmar ratio       : {calmar:.3f}")
```

```
annualized return : 0.1629
max drawdown      : -0.1184
Calmar ratio       : 1.376
```

A Calmar of 1.376 means the strategy earned about 1.4x its worst peak-to-trough decline, annualized. Unlike Sharpe, which penalizes *all* volatility, Calmar only cares about the single worst drawdown — which makes it a favorite with allocators who care most about "how bad could my worst year with this manager be," but also means it's driven by one event in the sample and can be unstable with a short history (a single bad week can dominate the whole ratio).

## Omega ratio: use the whole distribution, not just mean and variance

Sharpe and Sortino both reduce a return series to a couple of summary numbers (mean, and either total or downside standard deviation), which silently assumes those numbers tell the whole story. The **Omega ratio** instead uses the full distribution, split at a chosen threshold `L` (often zero):

```
Omega(L) = sum of (returns above L, net of L) / sum of (L minus returns below L)
```

```python
threshold = 0.0
gains = (daily_returns[daily_returns > threshold] - threshold).sum()
losses = (threshold - daily_returns[daily_returns <= threshold]).sum()
omega = gains / losses
print(f"Omega ratio (threshold=0): {omega:.3f}")
```

```
Omega ratio (threshold=0): 1.171
```

An Omega above 1.0 means the weighted gains above the threshold outweigh the weighted losses below it — this strategy returns about $1.17 of upside for every $1.00 of downside relative to a zero daily return. Because Omega doesn't assume a particular distribution shape (normal, symmetric, or otherwise), it's more sensitive to skew and fat tails than Sharpe or Sortino, which makes it genuinely more informative for strategies with option-like or asymmetric payoffs — at the cost of being less standardized and less often quoted outside specialist contexts.

## Information ratio: performance relative to a benchmark

Every measure so far has treated the strategy's returns in isolation. The **Information ratio (IR)** instead asks: how much *better* than a benchmark did you do, and how consistently?

```
active_return = strategy_return - benchmark_return
IR = mean(active_return) / std(active_return)   # then annualized
```

The denominator here is called **tracking error** — the volatility of the *difference* between the strategy and its benchmark, not the strategy's own volatility.

```python
rng2 = np.random.default_rng(99)
# Illustrative synthetic benchmark series (e.g., a market index proxy)
benchmark_returns = pd.Series(rng2.normal(0.0003, 0.009, n_days))

active_returns = daily_returns - benchmark_returns
tracking_error_ann = active_returns.std(ddof=1) * np.sqrt(252)
ir_ann = active_returns.mean() / active_returns.std(ddof=1) * np.sqrt(252)

print(f"tracking error (ann): {tracking_error_ann:.4f}")
print(f"Information ratio   : {ir_ann:.3f}")
```

```
tracking error (ann): 0.2175
Information ratio   : 0.165
```

An IR of 0.165 is modest — the strategy beat its illustrative benchmark on average, but not by much relative to how much the gap between the two bounced around. The IR matters enormously for any strategy that's marketed or evaluated *relative to a benchmark* (most long-only equity strategies, for instance) rather than on an absolute return basis, because a strategy can have a perfectly fine Sharpe ratio while adding almost nothing versus simply holding the benchmark — which the IR, and only the IR, will tell you directly.

## Reading a tear sheet without being fooled

A real performance tear sheet typically shows Sharpe, Sortino, Calmar, and sometimes Omega or IR side by side — and it is common, even among professionals, to quietly anchor on whichever one looks most favorable. The discipline: know in advance which question you're actually trying to answer (total risk-adjusted return → Sharpe; downside-only → Sortino; worst-case drawdown → Calmar; distribution shape → Omega; versus a benchmark → IR) before you look at the numbers, rather than picking the ratio after the fact that happens to flatter the result.

## Key terms

| Term | Meaning |
|---|---|
| Calmar ratio | Annualized return divided by the absolute value of maximum drawdown |
| Omega ratio | Ratio of weighted gains to weighted losses relative to a threshold, using the full return distribution |
| Information ratio | Mean active return (strategy minus benchmark) divided by tracking error |
| Tracking error | The volatility of the difference between a strategy's returns and its benchmark's returns |
| Active return | Strategy return minus benchmark return over the same period |

## Recap

Calmar relates return to worst-case drawdown, Omega uses the full return distribution instead of just mean and variance, and the Information ratio measures consistency of outperformance versus a specific benchmark — each answers a genuinely different question, and none of them is "the" correct ratio in isolation. Next, Lesson 24 moves from describing performance to explaining it: performance attribution, which breaks a strategy's total return down into where it actually came from.
