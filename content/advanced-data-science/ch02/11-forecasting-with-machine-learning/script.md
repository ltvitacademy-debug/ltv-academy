# Script — Forecasting With Machine Learning

## Segment 1 (title)

So far in this chapter you have used classic forecasting models. Now let's borrow the tools you already know from supervised learning, and see how random forests and gradient boosting can forecast a time series, and where they quietly go wrong.

## Segment 2 (steps)

The trick is a reframe. Turn the series into a table. Each day becomes a row. The target is that day's value. The features are things known about the past: yesterday's value, last week's value, a rolling average, the day of the week. And nothing from the future is allowed in.

## Segment 3 (code)

In pandas, the shift method builds lags. Notice the rolling average is computed on the series shifted by one day. Without that shift, today's own value sneaks into its own feature, which is leakage, and your test score becomes fiction.

## Segment 4 (code)

Now the split. We hold out the last sixty days as the test set, never a random sample. On our seeded, illustrative sales data, a naive forecast that repeats yesterday has a mean absolute error of about fifteen. Linear regression gets about eight and a half. Gradient boosting, the fancy model, scores worse than either: seventeen.

## Segment 5 (code)

Why? Sales trend upward, and the test period goes higher than anything in training. Tree models predict averages of values they have seen, so they cannot extrapolate. The fix is to predict the change from the rolling average instead of the level, then add the average back. Same model, and the error drops to about eight point eight.

## Segment 6 (steps)

For forecasts more than one day out, you have two options. Recursive forecasting feeds each prediction back in as a lag. Direct forecasting trains a separate model for each horizon. For validation, use TimeSeriesSplit, where training data always comes before test data, and never shuffle.

## Segment 7 (outro)

You now have a model, but how do you know if a forecast is any good? That's next, in lesson twelve: evaluating forecasts.
