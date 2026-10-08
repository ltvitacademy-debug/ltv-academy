# Drawdown & Recovery

Sharpe and Sortino describe a return series statistically. Nobody who has actually traded a strategy experiences it that way — they experience the equity curve going down and staying down. **Drawdown** measures exactly that: how far below a prior peak you are, right now, and for how long. It's arguably the single most important number for whether a human (or a risk manager) can actually stick with a strategy through its worst stretch.

## What you'll learn

- How to compute a drawdown series from a return series, correctly
- Maximum drawdown, and why it matters as much as (or more than) average return
- Drawdown duration and recovery time — two numbers maximum drawdown alone hides
- Why a strategy can have a great Sharpe ratio and still be dangerous to hold
- The underwater curve as a visualization tool professionals use constantly

## Building the drawdown series

A **drawdown** at any point in time is how far the current equity value is below the highest equity value reached so far (the **running maximum**, or **high-water mark**). It's always zero or negative, expressed as a percentage:

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(9)
n_days = 504  # same illustrative synthetic series as Lesson 21
daily_returns = pd.Series(rng.normal(0.0006, 0.010, n_days))

equity = (1 + daily_returns).cumprod()
running_max = equity.cummax()
drawdown = equity / running_max - 1.0  # <= 0 everywhere

print(f"final equity         : {equity.iloc[-1]:.4f}")
print(f"current drawdown     : {drawdown.iloc[-1]:.4f}")
```

```
final equity         : 1.5146
current drawdown     : -0.0434
```

Every value in `drawdown` answers the same question: "if you had bought at the best possible prior moment and held to today, how much would you be down?" A drawdown of 0 means you're at a new equity high; anything negative means you're underwater.

## Maximum drawdown

**Maximum drawdown (max DD)** is simply the worst (most negative) value the drawdown series ever reaches — the single deepest hole the strategy ever dug for itself:

```python
max_dd = drawdown.min()
trough_idx = drawdown.idxmin()
peak_idx = equity.loc[:trough_idx].idxmax()

print(f"max drawdown          : {max_dd:.4f}")
print(f"peak reached on day   : {peak_idx}")
print(f"trough reached on day : {trough_idx}")
print(f"days peak -> trough   : {trough_idx - peak_idx}")
```

```
max drawdown          : -0.1184
peak reached on day   : 419
trough reached on day : 453
days peak -> trough    : 34
```

This strategy's worst stretch was an 11.8% peak-to-trough decline over 34 trading days. Max drawdown is one of the first numbers a risk manager or allocator asks about a strategy, often before Sharpe, because it's the number that answers "what's the worst I could realistically have lost, holding this exact strategy, at the worst possible moment to have started"?

## Recovery time: the number max drawdown hides

Two strategies can have the *same* max drawdown — say both lose 12% at their worst point — and be completely different to actually hold if one recovers in three weeks and the other takes eight months. **Recovery time** (or time underwater) measures exactly that gap:

```python
peak_value = equity.loc[peak_idx]
after_trough = equity.loc[trough_idx:]
recovered = after_trough[after_trough >= peak_value]

if len(recovered):
    recovery_idx = recovered.index[0]
    print(f"recovered on day {recovery_idx}, "
          f"{recovery_idx - trough_idx} days after the trough")
else:
    print("strategy had not recovered to its prior peak by the end of the sample")
```

```
strategy had not recovered to its prior peak by the end of the sample
```

This is a genuinely important, uncomfortable result worth sitting with: in this illustrative run, the strategy's worst drawdown had *not* fully recovered by the last day of the two-year sample. That's not a bug in the code — real strategies really do end backtests (and real trading periods) still underwater, and reporting only the max-drawdown percentage without checking whether it ever recovered paints an incomplete picture.

## The longest underwater streak

A related, separate number: not the deepest drawdown, but the *longest stretch of consecutive days* spent below any prior peak — which captures a different kind of pain (grinding sideways-to-down for a long time, even without ever hitting a dramatic new low):

```python
underwater = drawdown < 0
longest_streak = 0
current_streak = 0
for is_under in underwater:
    current_streak = current_streak + 1 if is_under else 0
    longest_streak = max(longest_streak, current_streak)

print(f"longest underwater streak: {longest_streak} trading days")
```

```
longest underwater streak: 84 trading days
```

Eighty-four trading days — about four calendar months — spent without a new equity high, somewhere in this series. Most human traders (and most investors in a fund) find a long underwater streak harder to tolerate than a sharp, short drawdown of similar depth, even though average return and Sharpe ratio don't directly see this at all.

## Why this matters beyond the backtest

A strategy's max drawdown in a backtest is a *floor*, not a ceiling, for what you should expect live — Chapter 4 showed several ways a backtest flatters itself, and every one of those biases (look-ahead, survivorship, underestimated costs) tends to understate how deep a real drawdown could go. Position sizing decisions from Chapter 2 (Lessons 9-10) should be made with a live drawdown assumption meaningfully worse than the backtested one, and risk limits should be set before you're in a drawdown, not renegotiated in the middle of one.

## Key terms

| Term | Meaning |
|---|---|
| Drawdown | Current equity's percentage distance below the running maximum (high-water mark) |
| High-water mark | The highest equity value reached so far |
| Maximum drawdown | The single worst (most negative) drawdown value over the whole series |
| Recovery time | Time from a drawdown's trough until equity reaches a new high above the prior peak |
| Underwater streak | Longest consecutive stretch spent below a prior equity peak |

## Recap

Drawdown measures how far below a prior peak the equity curve is; max drawdown measures the worst case, but recovery time and the longest underwater streak capture pain that max drawdown alone hides — including the uncomfortable case of a drawdown that simply hasn't recovered yet. Next, Lesson 23 builds on drawdown directly with risk-adjusted measures like the Calmar ratio that use it as their risk denominator.
