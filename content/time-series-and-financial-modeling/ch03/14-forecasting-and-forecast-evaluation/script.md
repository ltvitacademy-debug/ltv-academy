# Script — Forecasting & Forecast Evaluation

## Segment 1 (title)

A model that passes diagnostics still has to prove itself at the one thing it's for: forecasting data it hasn't seen. This lesson covers producing forecasts from a fitted model, evaluating them honestly out of sample, and why a beautiful in-sample fit can still forecast worse than doing almost nothing.

## Segment 2 (steps)

AIC, BIC, and residual checks are all computed in-sample, on the same data used to fit the model, so they don't measure forecasting skill on their own. Walk-forward, or rolling-origin, validation fixes that: fit using data up through time T, forecast just past it, compare to the actual value once it arrives, then move the origin forward and repeat. That produces a whole series of real forecast errors instead of one number from a single fixed holdout.

## Segment 3 (code)

In code, that's a loop: at each step, fit the model on history up to t, forecast one step ahead, and record the error between that forecast and the actual value once it's known. Once you've collected all of those errors, root mean squared error, or RMSE, is just the square root of their mean squared value.

## Segment 4 (steps)

RMSE penalizes large errors disproportionately; mean absolute error is more robust to outliers; mean absolute percentage error expresses error as a scale-free percentage. But the single most important habit is comparing all of that against a naive benchmark — tomorrow equals today, or this period equals the same period last cycle. Financial prices sit close to a random walk, so a sophisticated ARIMA model can easily fail to beat that naive forecast out of sample, even while its AIC looked great in-sample.

## Segment 5 (outro)

Diagnostics tell you a model is well specified in-sample; only walk-forward validation against a naive benchmark tells you whether it forecasts well. Next, lesson fifteen moves from one series at a time to modeling several series jointly with vector autoregression.
