# Script — Baselines & Naive Forecasts

## Segment 1 (title)

Before you fit anything clever, build the dumbest forecast that could possibly work. A baseline gives every later model a bar to clear. If a fancy model cannot beat a one-line forecast, it is not earning its complexity.

## Segment 2 (steps)

There are four classic baselines. The mean repeats the average of all history. Naive repeats the last value: tomorrow looks like today. Drift is naive plus the average change per step, so it follows a steady trend. And seasonal naive repeats the last full season: this Tuesday looks like last Tuesday.

## Segment 3 (code)

Each one is a line or two of pandas and NumPy. First we hold out the last twenty-eight days, splitting by time. Then we forecast the whole horizon using only the training data. For seasonal naive, the season length is seven, because our illustrative sales repeat weekly.

## Segment 4 (code)

Now score them with mean absolute error. The mean baseline misses by nearly one hundred, because sales have climbed far above their historical average. Naive, drift and seasonal naive land close together, and seasonal naive wins at sixteen point one. That number is the one every later model has to beat.

## Segment 5 (code)

Then look at the forecasts, not just the score. A few lines of matplotlib draw the recent history, and each baseline over the held-out window.

## Segment 6 (screenshot)

The seasonal naive line is the only one that wiggles with the weekly pattern. But notice it never catches the upward drift in the actual sales. That gap is exactly what a real model can fill.

## Segment 7 (outro)

In the next lesson we meet the classic statistical models that try to beat this baseline: exponential smoothing and ARIMA.
