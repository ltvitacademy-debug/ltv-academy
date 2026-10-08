# Strategy Decay & Retirement

Every lesson in this chapter has assumed a strategy that works. This one closes Chapter 6 with the question every systematic strategy eventually faces: edges fade. Markets adapt, other participants find and crowd the same patterns, and regimes change. This lesson covers how to detect that fading honestly, using the monitoring tools from Lesson 29, and how to decide when a strategy should actually be retired rather than nursed along.

## What you'll learn

- Why strategy decay is the normal end state, not a sign of failure
- The common causes: crowding, regime change, and structural market shifts
- How to detect gradual decay with a rolling-window Sharpe ratio, rather than reacting to any single bad period
- A simple, pre-committed rule for flagging a strategy for retirement review
- Why "retirement" doesn't have to mean "delete the code"

## Why edges decay

A real, exploitable pattern in market prices is, by definition, something other participants have not yet fully priced in or acted on. Once a strategy (yours or someone else's) is deployed against that pattern at scale, three things tend to happen over time: **crowding** (other participants find and trade the same pattern, competing away the edge and often making entries/exits worse for everyone trading it), **regime change** (the market structure or macro environment that made the pattern exist in the first place shifts), and sometimes **structural change** (a market microstructure or regulatory change removes the mechanical reason the edge existed at all — tick-size changes and decimalization are classic historical examples). None of this means the original research was wrong; it means edges have a shelf life, and professional expectations should be set accordingly from day one.

## Detecting gradual decay with a rolling Sharpe ratio

A strategy rarely breaks all at once; it typically fades gradually, which means a single snapshot Sharpe ratio (Lesson 21) computed over the whole history can hide a strategy that worked great for its first half and has been flat or negative for a while now. A **rolling-window Sharpe ratio** — recomputing Sharpe over a moving window, refreshed regularly — surfaces this directly:

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(30)
n_days = 756  # 3 illustrative trading years
# Illustrative synthetic daily returns: a real edge for the first ~1.5 years,
# then a gradual decay toward zero edge -- modeling crowding or regime
# change rather than a sudden cliff
mean_schedule = np.concatenate([
    np.full(378, 0.0009),
    np.linspace(0.0009, 0.0000, 378),
])
daily_returns = pd.Series(rng.normal(mean_schedule, 0.010, n_days))

window = 126  # ~6 months
rolling_mean = daily_returns.rolling(window).mean()
rolling_std = daily_returns.rolling(window).std(ddof=1)
rolling_sharpe = rolling_mean / rolling_std * np.sqrt(252)

print(f"rolling Sharpe at day 400: {rolling_sharpe.iloc[400]:.3f}")
print(f"rolling Sharpe at day 700: {rolling_sharpe.iloc[700]:.3f}")
```

```
rolling Sharpe at day 400: 2.349
rolling Sharpe at day 700: 0.166
```

The rolling Sharpe fell from a strong 2.35 to a weak 0.17 over the back half of this illustrative three-year sample — a clear, visible decay the single whole-period number would have blended into an unremarkable overall average. This is exactly the live-vs-expected comparison from Lesson 29, run as a self-comparison across the strategy's own history instead of against a backtest.

## A pre-committed rule for flagging retirement review

The same discipline from Lesson 29's kill switch applies here: decide the rule *before* you're in the middle of a decay, not while staring at a discouraging number and looking for reasons to keep going. A simple, defensible pattern checks the rolling Sharpe on a fixed cadence and flags a review once it's stayed below a threshold for several consecutive checks — multiple checks, not one, specifically to avoid reacting to a single noisy bad window (Lesson 25's sampling-uncertainty warning applies to rolling windows exactly as much as it does to a single backtest):

```python
THRESHOLD = 0.3
MIN_CONSECUTIVE = 3
check_points = rolling_sharpe.iloc[window - 1::21]  # a monthly check cadence

below = check_points < THRESHOLD
consecutive = 0
flag_day = None
for idx, is_below in below.items():
    consecutive = consecutive + 1 if is_below else 0
    if consecutive >= MIN_CONSECUTIVE:
        flag_day = idx
        break

print(f"retirement-review flag triggered at day {flag_day} "
      f"({MIN_CONSECUTIVE} consecutive monthly checks below Sharpe {THRESHOLD})")
```

```
retirement-review flag triggered at day 608 (3 consecutive monthly checks below Sharpe 0.3)
```

The rule flagged a review at day 608 — well after decay began (around day 378 in this synthetic schedule), but well before three full years had passed. That gap is intentional: the rule is tuned to avoid over-reacting to short-term noise while still catching a real, sustained decline within a reasonable window. This is a design decision with a real tradeoff (react faster and risk false alarms on short-lived rough patches, vs. react slower and give up more capital to a genuinely decayed strategy), and it should be set deliberately, the same way the Lesson 29 kill-switch thresholds were.

## Retirement doesn't have to mean deletion

"Retirement review" is not the same as "immediately stop trading forever." A flagged strategy might be: paused and re-paper-tested (Lesson 26) once conditions seem to have normalized; reduced in size rather than fully shut off, while the cause of the decay is investigated; or genuinely retired — turned off, documented, and archived, with the research write-up kept as a record of what worked, for how long, and why it stopped (valuable both for the researcher's own development and as an honest input the next time a similar idea comes up). What it should never be is ignored — a strategy that's been quietly flagged and left running unchanged, on the hope that the decay reverses itself, is exactly the failure mode continuous monitoring exists to prevent.

## Key terms

| Term | Meaning |
|---|---|
| Alpha decay | The gradual erosion of a strategy's edge over time, typically due to crowding or regime change |
| Crowding | Other market participants finding and trading the same pattern, competing away the edge |
| Rolling-window Sharpe ratio | Sharpe ratio recomputed over a moving window of recent data, refreshed on a regular cadence |
| Retirement review | A pre-committed trigger point for formally evaluating whether to reduce, pause, or shut down a decaying strategy |

## Recap

Edges decay for structural reasons (crowding, regime change) that have nothing to do with the original research being wrong, and a rolling-window Sharpe ratio, checked against a pre-committed, multi-check threshold rule, catches that decay far more reliably than staring at one whole-period number. Retirement is a deliberate, documented decision — pause, resize, or shut down — not something to leave unaddressed. That closes Chapter 6. The capstone in Chapter 7 now asks you to run this entire course's process yourself, end to end, on one strategy of your own design.
