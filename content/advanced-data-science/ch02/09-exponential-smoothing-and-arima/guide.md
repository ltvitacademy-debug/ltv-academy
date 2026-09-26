# Exponential Smoothing & ARIMA

Baselines told us what a forecast costs when we try nothing clever. Exponential smoothing and ARIMA are the two classic statistical families that try to do better, and they are still workhorses in industry because they are fast, need no feature engineering, and give honest uncertainty ranges. Both model one series using only its own history. In this lesson we fit both with the `statsmodels` library on the same illustrative sales series and compare them to the seasonal naive baseline from Lesson 8.

## What you'll learn

- How simple exponential smoothing, Holt and Holt-Winters add a trend and a season step by step
- What the p, d, q of an ARIMA model mean, and where the seasonal part goes
- How to fit both in statsmodels, choose an order with AIC, and produce forecast intervals
- Why the same model family can be worse than the baseline until you give it the seasonality

## Setup (illustrative data)

Install with `pip install statsmodels`. The data is the seeded synthetic daily sales series from the rest of this chapter, and we hold out the last 28 days.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(42)
idx = pd.date_range("2023-01-01", periods=730, freq="D")
t = np.arange(len(idx))
sales = (200 + 0.3 * t
         + 25 * np.sin(2 * np.pi * idx.dayofweek / 7)
         + 30 * np.sin(2 * np.pi * t / 365.25)
         + rng.normal(0, 8, len(idx)))
s = pd.Series(sales, index=idx, name="sales")

h = 28
train, test = s.iloc[:-h], s.iloc[-h:]
train = train.asfreq("D")          # explicit daily frequency for statsmodels

def mae(y, f):
    return np.mean(np.abs(np.asarray(y) - np.asarray(f)))
```

## Exponential smoothing: three building blocks

The idea is a weighted average of the past in which recent points count more. The weight decays by a factor called the smoothing level, alpha. Simple exponential smoothing (SES) tracks a **level**. Holt's method adds a **trend**. Holt-Winters adds a **seasonal** pattern on top.

```python
from statsmodels.tsa.holtwinters import (
    SimpleExpSmoothing, Holt, ExponentialSmoothing)

ses = SimpleExpSmoothing(train, initialization_method="estimated").fit()
print("alpha:", round(ses.params["smoothing_level"], 3))
print("SES  MAE", round(mae(test, ses.forecast(h)), 2))

holt = Holt(train, initialization_method="estimated").fit()
print("Holt MAE", round(mae(test, holt.forecast(h)), 2))

hw = ExponentialSmoothing(train, trend="add", seasonal="add",
                          seasonal_periods=7,
                          initialization_method="estimated").fit()
hw_fc = hw.forecast(h)
print("Holt-Winters MAE", round(mae(test, hw_fc), 2))
```

Output:

```
alpha: 1.0
SES  MAE 17.75
Holt MAE 16.63
Holt-Winters MAE 6.86
```

Read that carefully. The fitted alpha is 1.0, which means "use only the latest value", so SES collapses into the naive forecast (17.75, identical to Lesson 8). Holt lands on the drift baseline's 16.63. Only when we tell the model about the weekly cycle with `seasonal_periods=7` does the error drop, to 6.86, against 16.13 for seasonal naive.

## ARIMA in one paragraph

ARIMA(p, d, q) combines three parts. **AR(p)** regresses the series on its own last p values. **I(d)** differences the series d times to remove a trend so the rest is stationary (Lesson 7). **MA(q)** regresses on the last q forecast errors. A seasonal ARIMA adds a second set, `seasonal_order=(P, D, Q, m)`, with m the season length (7 for weekly patterns in daily data).

```python
from statsmodels.tsa.arima.model import ARIMA

for order, seas in [((1, 1, 1), (0, 0, 0, 0)),
                    ((1, 1, 1), (0, 1, 1, 7)),
                    ((2, 1, 2), (0, 1, 1, 7))]:
    res = ARIMA(train, order=order, seasonal_order=seas).fit()
    fc = res.forecast(h)
    print(order, seas, "AIC", round(res.aic, 1),
          "MAE", round(mae(test, fc), 2))
```

Output (statsmodels may also print convergence warnings on some orders):

```
(1, 1, 1) (0, 0, 0, 0) AIC 5986.4 MAE 22.7
(1, 1, 1) (0, 1, 1, 7) AIC 4979.1 MAE 10.91
(2, 1, 2) (0, 1, 1, 7) AIC 4938.4 MAE 6.72
```

A plain ARIMA(1,1,1) scores 22.7, worse than every baseline, because it knows nothing about the weekly cycle. Adding a seasonal difference and seasonal MA term helps a lot, and two extra non-seasonal terms help more. Notice how we would choose the order: by **AIC**, a training-data score that rewards fit but penalises extra parameters, where lower is better. Picking an order by test-set error would quietly leak the test data. Here the lowest AIC (4938.4) also has the lowest test MAE, but that agreement is not guaranteed.

## Forecast intervals

Statistical models give a range, not just a line:

```python
best = ARIMA(train, order=(2, 1, 2), seasonal_order=(0, 1, 1, 7)).fit()
pred = best.get_forecast(h)
sarima_fc = pred.predicted_mean
ci = pred.conf_int(alpha=0.05)
print(ci.round(1).head(3))
```

```
            lower sales  upper sales
2024-12-03        396.3        428.9
2024-12-04        402.2        435.2
2024-12-05        388.4        421.4
```

On this window, 96 percent of the 28 actual values fell inside the 95 percent interval, which is what a well-calibrated interval should do. The interval widens as the horizon grows, since uncertainty accumulates.

## Plot the forecasts

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

snaive = np.tile(train.iloc[-7:].values, h // 7)
fig, ax = plt.subplots(figsize=(8, 4.5))
tail = s.iloc[-56:]
ax.plot(tail.index, tail.values, color="#1E1A16", lw=1.6, label="actual")
ax.plot(test.index, snaive, color="#C4952E", lw=1.4, ls="--", label="seasonal naive")
ax.plot(test.index, hw_fc.values, color="#5E0F0F", lw=1.6, ls="--", label="Holt-Winters")
ax.plot(test.index, sarima_fc.values, color="#8E1C1C", lw=1.6, ls="--",
        label="SARIMA (2,1,2)(0,1,1,7)")
ax.fill_between(test.index, ci.iloc[:, 0], ci.iloc[:, 1],
                color="#8E1C1C", alpha=0.10, label="SARIMA 95% interval")
ax.axvline(test.index[0], color="#6B6259", lw=0.8)
ax.set_title("Forecasts vs. actual, last 28 days (illustrative data)")
ax.set_ylabel("sales")
ax.legend(loc="upper left", fontsize=8)
fig.autofmt_xdate()
fig.tight_layout()
fig.savefig("smoothing_arima.png", dpi=150)
```

## A caution

One 28-day window is a single test. As Lesson 12 shows, a model that wins one window can lose others, so confirm with a rolling-origin backtest before you trust these numbers. Also remember the data is synthetic and cleaner than most real sales.

## Recap

- Exponential smoothing builds up: level (SES), plus trend (Holt), plus season (Holt-Winters).
- ARIMA(p, d, q) is autoregression, differencing and moving-average errors; the seasonal order adds the same for the season.
- Both need the seasonality stated explicitly, or they can lose to a baseline.
- Choose orders with AIC on training data, not by peeking at the test set.
- Next lesson: Prophet, a forecasting library designed to make this workflow easier.
