# Script — Building Trading Signals

## Segment 1 (title)

Chapter one gave you the vocabulary and the major strategy families. Chapter two is where you actually build — turning raw data into a clean, comparable, lag-safe signal a backtest engine can use. This lesson is the construction pipeline every family from chapter one ultimately reuses.

## Segment 2 (steps)

Almost every signal goes through the same three stages. Transform computes the raw quantity — a return, a spread, a ratio. Normalize puts it on a comparable scale, either against its own history over time, or against its peers at a single point in time. And lag shifts the finished signal forward so today's position only ever uses information you actually had.

## Segment 3 (code)

Those first two normalization choices aren't interchangeable. A cross-sectional rank asks "is this cheaper than its peers right now." A time-series z-score asks "is this high relative to how it usually behaves." The same raw return produces a meaningfully different signal depending on which one you pick.

## Segment 4 (code)

Two habits matter before any signal goes near a backtest. Winsorizing caps extreme outliers at a chosen z-score instead of deleting them, so one bad data point or one crash day doesn't single-handedly dominate everything downstream. And shifting the signal forward by at least one bar is mechanical, non-negotiable hygiene against lookahead bias — using today's close to trade as if you knew it this morning.

## Segment 5 (outro)

A clean signal is disciplined, not clever: transform, normalize, lag, with outliers capped along the way. Up next, lesson seven: what happens once you have more than one signal and need to combine them without one noisy signal taking over.
