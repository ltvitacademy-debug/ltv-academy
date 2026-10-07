# Forecasting & Forecast Evaluation

A model that passes Lesson 13's diagnostics still has to prove itself at the one thing it's for: forecasting data it hasn't seen. This lesson covers how to produce forecasts from a fitted ARIMA model, how to evaluate forecast quality honestly using out-of-sample data, and why a model that fits beautifully in-sample can still forecast worse than doing almost nothing.

## What you'll learn

- The difference between in-sample fit and out-of-sample forecast accuracy
- Walk-forward (rolling-origin) validation for time series
- The standard error metrics: RMSE, MAE, and MAPE
- Why every forecast should be compared against a naive random-walk benchmark

## In-sample fit is not forecast accuracy

A model's AIC, BIC, and R-squared-like fit statistics from Lesson 13 are all computed **in-sample** — on the same data used to estimate the parameters. A model can fit the training data closely by overfitting noise, then fall apart on new data. The only trustworthy measure of forecasting skill is performance on data the model never saw during estimation: the **out-of-sample** period.

## Walk-forward (rolling-origin) validation

Unlike a typical machine learning train/test split, time series data can't be shuffled — the order matters. **Walk-forward validation** (also called rolling-origin evaluation) respects this:

1. Fit the model using data up through time T.
2. Forecast one (or several) steps ahead, past T.
3. Compare the forecast to the actual value once it's observed.
4. Move the origin forward by one step (to T+1), refit or update, and repeat.

This simulates how the model would actually have been used in production — making a forecast with only the information available at that point in time — and produces a whole series of forecast errors to evaluate rather than a single number from one fixed holdout.

```python
import numpy as np
from statsmodels.tsa.arima.model import ARIMA

errors = []
for t in range(train_size, len(series) - 1):
    history = series.iloc[:t]
    fit = ARIMA(history, order=(1, 1, 1)).fit()
    pred = fit.forecast(steps=1).iloc[0]
    actual = series.iloc[t]
    errors.append(actual - pred)

errors = np.array(errors)
```

## Standard forecast error metrics

Given a set of forecast errors (actual minus predicted):

- **RMSE** (root mean squared error): `sqrt(mean(errors**2))` — penalizes large errors disproportionately, in the original units of the data.
- **MAE** (mean absolute error): `mean(abs(errors))` — treats all error sizes proportionally, more robust to outliers than RMSE.
- **MAPE** (mean absolute percentage error): `mean(abs(errors / actual)) * 100` — expresses error as a percentage, useful for comparing across series of different scales, but undefined or unstable when actual values are near zero (a real concern for things like log returns).

```python
rmse = np.sqrt(np.mean(errors**2))
mae = np.mean(np.abs(errors))
mape = np.mean(np.abs(errors / actual_values)) * 100
```

## Always benchmark against the naive forecast

The single most important habit in forecast evaluation: compare your model's out-of-sample error against a trivially simple **naive (random-walk) forecast** — "tomorrow's price equals today's price," or for seasonal data, "this period equals the same period last cycle." Financial prices in particular are notoriously close to a random walk (Lesson 8), which means a sophisticated ARIMA model can easily fail to beat this naive baseline out-of-sample, even while looking impressive in-sample. If your model can't beat the naive benchmark on RMSE or MAE, it isn't adding forecasting value, regardless of how good its AIC looked.

## Key terms

| Term | Meaning |
|---|---|
| In-sample fit | How well a model fits the data used to estimate it — not a measure of forecasting skill |
| Out-of-sample evaluation | Testing forecasts against data the model never saw during estimation |
| Walk-forward (rolling-origin) validation | Repeatedly fitting on data up to time T and forecasting just past it, moving T forward |
| RMSE / MAE / MAPE | Standard forecast error metrics, in units / absolute terms / percentage terms respectively |
| Naive (random-walk) benchmark | "Tomorrow equals today" forecast that every real model should be compared against |

## Recap

Diagnostics from Lesson 13 tell you a model is well-specified in-sample; only walk-forward validation against a naive benchmark tells you whether it actually forecasts well. Next, Lesson 15 moves from modeling one series at a time to modeling several series jointly with vector autoregression.
