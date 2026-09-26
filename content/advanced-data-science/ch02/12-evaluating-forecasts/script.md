# Script — Evaluating Forecasts

## Segment 1 (title)

You have built forecasts. Now the harder question: how do you know a forecast is any good? Evaluating forecasts has its own rules, and breaking them is the easiest way to fool yourself.

## Segment 2 (steps)

Start with the metrics. Mean absolute error, or MAE, is the average miss in your own units, so it's easy to explain. Root mean squared error, RMSE, punishes big misses harder. Mean absolute percentage error, MAPE, is intuitive, but it blows up when actual values are near zero. And MASE scales your error against a naive forecast, so a score under one means you beat the baseline.

## Segment 3 (code)

In NumPy, each of these is a line or two. Compute the errors, take absolute values or squares, and average. For MASE, divide your MAE by the average error a seasonal naive forecast makes on the training data.

## Segment 4 (code)

On our seeded, illustrative sales series, we hold out twenty-eight days. The seasonal naive baseline, which just repeats the last week, has an MAE of sixteen point one. A model with a trend and day-of-week effects gets seven point nine. Its MASE is zero point eight seven, so it beats the baseline. Case closed?

## Segment 5 (steps)

Not quite. One split is one roll of the dice. A better test is a rolling-origin backtest. Pick an origin date, train only on the past, and forecast the next window. Then slide the origin forward, refit, and repeat. Finally, look at the average error and how much it varies.

## Segment 6 (code)

Here we collect an MAE for each origin into a table and draw it as a grouped bar chart. Same two models, five windows.

## Segment 7 (screenshot)

And the story flips. In the first three windows, the simple seasonal naive forecast wins by a wide margin, because the trend line ignores the yearly wave. Averaged across all five windows, the baseline scores about eleven point eight, and the model about eighteen. The single split was flattering the model.

## Segment 8 (outro)

That's forecasting evaluated honestly. Next we start a new chapter, natural language processing, beginning with lesson thirteen: text cleaning and tokenization.
