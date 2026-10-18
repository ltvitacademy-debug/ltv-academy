# Portfolio Rebalancing: Turnover vs. Optimality

Lessons 36-38 all assumed a portfolio's weights were a one-time decision. In reality, weights drift away from their target on their own, every single day, purely because different assets earn different returns — no trading required for the drift to happen. This lesson covers the practical question every real portfolio manager faces repeatedly: when is it worth trading back to target, and when does the cost of trading outweigh the benefit of staying close to it?

## What you'll learn

- Why portfolio weights drift away from target even with zero trading
- Calendar rebalancing vs. band (threshold) rebalancing, compared with real simulated numbers
- Why more frequent rebalancing isn't automatically better — it has a real, measurable cost
- How to think about the turnover-vs-tracking-error tradeoff like a practitioner, not just a formula

## Why weights drift without any trading at all

If three assets start at target weights 40% / 35% / 25% and then earn different returns over the following months, their dollar values grow at different rates — so their weights drift away from 40/35/25 purely from price movement, with zero trades involved. The longer a portfolio goes untouched, the further its actual weights can wander from the target the investor originally chose (and from the risk/return tradeoff that target was supposed to deliver, per Lesson 36).

## Two rebalancing rules, measured against the same drifting portfolio

**Calendar rebalancing** trades back to target on a fixed schedule (e.g., every 21 trading days, roughly monthly), regardless of how far weights have actually drifted. **Band (threshold) rebalancing** only trades when a weight drifts beyond a pre-set tolerance (e.g., more than 3 percentage points from target), regardless of how much time has passed. Simulating a 3-asset portfolio (target 40/35/25) over 252 trading days of realistic daily returns, and tracking **tracking error** (total absolute deviation from target weights) and **turnover** (total trading required to get back to target) for each rule:

```python
import numpy as np

def simulate(returns, target, rebalance_rule):
    """
    returns: array of shape (n_days, n_assets)
    target:  target weight vector
    rebalance_rule: function(day_index, current_weights) -> bool
    """
    values = np.array(target, dtype=float)
    total_turnover = 0.0
    tracking_errors = []
    rebalance_count = 0

    for t in range(len(returns)):
        values *= (1 + returns[t])
        total = values.sum()
        weights = values / total

        tracking_errors.append(np.abs(weights - target).sum())

        if rebalance_rule(t, weights):
            rebalance_count += 1
            total_turnover += np.abs(np.array(target) - weights).sum() / 2
            values = np.array(target) * total

    return {
        "total_turnover": total_turnover,
        "avg_tracking_error": np.mean(tracking_errors),
        "max_tracking_error": np.max(tracking_errors),
        "num_rebalances": rebalance_count,
    }

never_rule     = lambda t, w: False
calendar_rule  = lambda t, w: (t + 1) % 21 == 0
band3_rule     = lambda t, w: np.any(np.abs(w - target) > 0.03)
band5_rule     = lambda t, w: np.any(np.abs(w - target) > 0.05)
```

```
NEVER:       turnover=0.0000  avg_TE=10.03%  max_TE=19.15%  rebalances=0
CALENDAR-21: turnover=0.2288  avg_TE=2.89%   max_TE=8.54%   rebalances=12
BAND-3%:     turnover=0.2209  avg_TE=3.32%   max_TE=6.83%   rebalances=7
BAND-5%:     turnover=0.0532  avg_TE=4.85%   max_TE=10.64%  rebalances=1
```

## Reading the real tradeoff in these numbers

Three genuinely useful lessons sit in this output:

1. **Never rebalancing is bad on both dimensions at once.** Zero turnover sounds appealing, but the portfolio drifts to an average tracking error of 10% and a worst-case of nearly 19% — meaning for long stretches, the investor is holding a meaningfully different risk/return profile than the one they chose in Lesson 36.
2. **Band rebalancing can beat calendar rebalancing on BOTH turnover and tracking error at once.** The 3%-band rule achieved a *lower* maximum tracking error (6.83% vs. 8.54%) than monthly calendar rebalancing, while requiring almost half as many rebalances (7 vs. 12) and essentially the same total turnover. It rebalanced exactly when drift actually warranted it, instead of on a fixed calendar that sometimes trades when drift is small and sometimes lets drift run between scheduled dates.
3. **Widening the band trades tracking error for turnover, predictably.** Going from a 3% to a 5% band cut turnover by roughly 75% (0.0532 vs. 0.2209) but let average tracking error rise from 3.32% to 4.85% — a real, measurable cost-vs-precision dial, not a free lunch in either direction.

## Why this tradeoff matters, not just in theory

Every rebalancing trade has a real-world cost — bid-ask spread, commissions, market impact (Lesson 18's execution-cost material), and potentially taxes on realized gains outside a tax-advantaged account. A rule that rebalances more often than the actual benefit justifies is quietly eroding returns through unnecessary trading costs; a rule that rebalances too rarely is quietly running a different risk profile than the one actually chosen. There is no universally correct band width or calendar frequency — the right choice depends on each asset's trading costs, the portfolio's size, and how much tracking error the investor is actually willing to tolerate before it matters.

## Key terms

| Term | Meaning |
|---|---|
| Rebalancing | Trading a portfolio back toward its target weights after they've drifted |
| Calendar rebalancing | Rebalancing on a fixed schedule, regardless of how far weights have drifted |
| Band (threshold) rebalancing | Rebalancing only when a weight drifts beyond a pre-set tolerance, regardless of elapsed time |
| Tracking error | Here, the total deviation between actual and target portfolio weights |
| Turnover | The total amount of trading required to execute a rebalance |

## Check yourself

Why did the 3%-band rule achieve a lower maximum tracking error than monthly calendar rebalancing while using fewer total rebalances — what does that say about fixed calendar schedules?
