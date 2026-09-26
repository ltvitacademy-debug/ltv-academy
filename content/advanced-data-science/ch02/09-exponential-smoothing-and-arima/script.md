# Script — Exponential Smoothing & ARIMA

## Segment 1 (title)

Baselines told us the cost of trying nothing clever. Exponential smoothing and ARIMA are the two classic statistical families that try to do better. They model one series using only its own history, and both are fast and still widely used.

## Segment 2 (steps)

Exponential smoothing is a weighted average of the past, where recent points count more. Simple smoothing tracks a level. Holt adds a trend. Holt-Winters adds a seasonal pattern on top. Each step gives the model one more thing to remember.

## Segment 3 (code)

In statsmodels, each is a single class. Watch the results on our illustrative sales. Simple smoothing fits an alpha of one, which means it copies the latest value, so it collapses into the naive forecast. Holt matches the drift baseline. But Holt-Winters, told the season is seven days, drops the error from sixteen to about six point nine.

## Segment 4 (steps)

ARIMA has three parts. The A R part regresses on the last p values. The I part differences the series to remove a trend. The M A part regresses on the last q forecast errors. A seasonal order adds the same idea for the weekly cycle.

## Segment 5 (code)

A plain ARIMA one-one-one scores twenty-two point seven, worse than every baseline, because it does not know about the week. Add a seasonal difference and moving-average term and it improves. Two extra terms improve it again, to six point seven. We choose the order by AIC on training data, not by peeking at the test set.

## Segment 6 (code)

These models also give you a range, not just a line. Here, ninety-six percent of the held-out days fell inside the ninety-five percent interval. Let's plot everything against the actual sales.

## Segment 7 (screenshot)

Both statistical models track the weekly wave and the trend, while seasonal naive sits low. One caution: a single window is one test, so confirm with a rolling backtest before trusting these numbers.

## Segment 8 (outro)

Next up is Prophet, a library built to make this whole workflow easier.
