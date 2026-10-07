# Script — Cointegration & Pairs

## Segment 1 (title)

Last lesson showed that financial prices behave like random walks, each individually non-stationary. This lesson covers a powerful idea built on top of that: even though two price series are each non-stationary, a particular linear combination of them can be stationary. That's cointegration, and it's the statistical foundation of pairs trading.

## Segment 2 (steps)

This is the single most common mix-up in this area. Correlation means two series' returns tend to move up and down together day to day. Cointegration is a different, stronger claim entirely: it means a specific linear combination of their price levels is itself stationary, so the gap between them reverts to a stable mean instead of drifting apart forever. Pairs trading needs that reverting spread — cointegration, not just correlation.

## Segment 3 (code)

The Engle-Granger method finds this in two steps. First, regress one price series on the other with ordinary least squares; the slope is the hedge ratio, beta. Second, take the regression residuals — that's the spread — and run an ADF test on them. If the spread rejects the unit-root null, the two series are cointegrated.

## Segment 4 (code)

Statsmodels wraps this whole procedure in one function, coint, which handles the regression and uses critical values correctly adjusted for the fact that you're testing regression residuals, not a raw series. Its null hypothesis is no cointegration, so again, a low p-value is the result you want. Once you've confirmed a stationary spread, standardize it into a rolling z-score and trade the reversion — short the spread when the z-score is too high, long it when too low.

## Segment 5 (outro)

Cointegration only works as a trading signal because the spread is genuinely stationary — without that, there's no stable mean to revert to. That closes chapter two's core toolkit. Next lesson pulls stationarity, ACF and PACF, and cointegration testing together into a single diagnostic workflow, and covers where each test can mislead you.
