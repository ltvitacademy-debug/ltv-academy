# Building Trading Signals

Chapter 1 gave you the vocabulary and the major strategy families. Chapter 2 is where you actually build: turning raw data into a clean, comparable, lag-safe signal that a backtest engine can consume. This lesson covers the signal construction pipeline every family from Chapter 1 ultimately reuses.

## What you'll learn

- The standard raw-data-to-signal pipeline: transform, normalize, lag
- Cross-sectional ranking vs. time-series normalization, and when to use each
- Winsorizing and why unclipped outliers quietly wreck signals
- The single most common bug in signal construction: lookahead through a misplaced shift
- How to sanity-check a signal before it ever reaches a backtest

## The standard pipeline

Almost every signal, regardless of family, goes through the same three stages:

1. **Transform** — compute the raw quantity (a return, a spread, a ratio, a fundamental metric).
2. **Normalize** — put it on a comparable scale, either across time (a rolling z-score against its own history) or across instruments at a point in time (a cross-sectional rank or z-score against peers).
3. **Lag** — shift the finished signal so that today's position only ever uses information available at or before today's close.

## Cross-sectional vs. time-series normalization

A **time-series** z-score compares a value to its own history — "is this stock's volatility high relative to how it usually behaves?" A **cross-sectional** rank or z-score compares instruments to each other at the same point in time — "is this stock cheaper than its peers right now?" Mixing these up is a common mistake: a momentum strategy that ranks stocks against each other cross-sectionally behaves very differently from one that z-scores each stock against its own history, even using the identical raw return.

```python
import pandas as pd

# returns: DataFrame, columns = tickers, index = dates
raw = returns.rolling(252).sum()  # 12-month momentum, raw

# Cross-sectional: rank each day across all tickers, 0 to 1
cross_sectional_signal = raw.rank(axis=1, pct=True)

# Time-series: z-score each ticker against its own history
ts_mean = raw.rolling(504).mean()
ts_std = raw.rolling(504).std()
time_series_signal = (raw - ts_mean) / ts_std
```

## Winsorizing: clipping outliers before they dominate

A single data error or a genuine extreme event (a stock halving overnight) can produce a raw value so large it dwarfs every other observation, and — especially after z-scoring, which doesn't bound its output — can single-handedly dominate a combined signal (Lesson 7) or a sizing decision (Lesson 9). **Winsorizing** caps extreme values at a chosen percentile or a fixed number of standard deviations instead of deleting them, keeping the ordering information without letting one outlier drive the result.

```python
def winsorize(s: pd.Series, z_cap: float = 3.0) -> pd.Series:
    mean, std = s.mean(), s.std()
    z = (s - mean) / std
    return (z.clip(-z_cap, z_cap) * std) + mean
```

## The single most common bug: lookahead through a misplaced shift

If you compute a signal using today's close and then trade at today's close assuming you "knew" the signal at the start of the day, you've leaked the future into the past — a subtle version of the lookahead bias covered formally in Chapter 4. The fix is mechanical and should be a habit, not an afterthought: shift every finished signal forward by at least one bar before it's allowed to generate a position.

```python
signal = cross_sectional_signal.shift(1)  # yesterday's signal,
                                           # trades at today's open/close
```

## Sanity-checking before the signal reaches a backtest

Before a signal goes anywhere near a backtest, check: does it have a sensible distribution (no single outlier swamping the rest)? Does its coverage make sense (missing values where you'd expect missing data, not everywhere)? And does it visibly change over time rather than being frozen or constant for long stretches, which usually means a bug in the rolling window, not a real feature of the market.

## Key terms

| Term | Meaning |
|---|---|
| Cross-sectional normalization | Comparing instruments to each other at the same point in time (e.g., a daily rank) |
| Time-series normalization | Comparing a value to its own history (e.g., a rolling z-score) |
| Winsorizing | Capping extreme values at a threshold instead of deleting them, to limit outlier influence |
| Lookahead bias | Letting information from the future leak into a signal available "as of" an earlier date |
| Signal pipeline | Transform → normalize → lag, the standard three-stage construction every signal goes through |

## Recap

A clean signal is built in three disciplined stages — transform, normalize, lag — with outliers capped and lookahead mechanically prevented by a forward shift. Next, Lesson 7 covers what happens once you have more than one signal: how to combine them without one noisy signal quietly dominating the rest.
