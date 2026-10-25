# Forecast Evaluation & Backtest Reference

A reusable reference built from Lessons 8, 9, 12, and the Capstone (Lessons 27-29): the four
forecast-accuracy metrics you'll be asked about, and the rolling-origin backtest harness that
belongs in every forecasting project before a model ships.

## The four metrics

```python
import numpy as np

def mae(y, f):
    return np.mean(np.abs(np.asarray(y) - np.asarray(f)))

def rmse(y, f):
    return np.sqrt(np.mean((np.asarray(y) - np.asarray(f)) ** 2))

def mape(y, f):
    y, f = np.asarray(y), np.asarray(f)
    return 100 * np.mean(np.abs((y - f) / y))

def mase(y, f, train, m=7):
    """m = season length of the naive benchmark (7 for weekly seasonality in daily data)."""
    train = np.asarray(train)
    scale = np.mean(np.abs(train[m:] - train[:-m]))
    return mae(y, f) / scale
```

| Metric | What it measures | Watch out for |
|---|---|---|
| **MAE** | Average size of the miss, in the series' own units | Easy to explain to a manager; doesn't penalize big misses extra |
| **RMSE** | Like MAE, but squares errors first | Never smaller than MAE on the same errors; a few big misses dominate it |
| **MAPE** | Error as a percentage of the actual value | Explodes or becomes undefined when actuals are near zero |
| **MASE** | Your MAE divided by a naive benchmark's MAE on the training data | Below 1.0 means you beat the benchmark; above 1.0 means you didn't |

## Always include a naive baseline

```python
naive = np.repeat(train.iloc[-1], h)                      # repeat the last value
seasonal_naive = np.tile(train.iloc[-m:].values, h // m)   # repeat the last full season
```

A model that cannot beat seasonal naive is not adding value, no matter how sophisticated it is.

## The rolling-origin backtest

A single train/test split can give the wrong answer — a model that wins one window can lose
others (see Lesson 12's own reversal, where a linear model won a single holdout but lost a
5-window backtest overall). Never ship on one split:

```python
import pandas as pd

def rolling_backtest(series, h, forecasters, min_train=None):
    """
    series: a pandas Series indexed by date
    h: forecast horizon per window
    forecasters: dict of {name: function(train_series, horizon) -> array of length h}
    min_train: minimum number of training observations before the first window
    """
    min_train = min_train or 5 * h
    rows = []
    for origin in range(min_train, len(series) - h + 1, h):
        tr, te = series.iloc[:origin], series.iloc[origin:origin + h]
        row = {"origin": te.index[0]}
        for name, fn in forecasters.items():
            fc = fn(tr, h)
            row[name] = mae(te.values, fc)
        rows.append(row)
    bt = pd.DataFrame(rows)
    return bt, bt.drop(columns="origin").mean()
```

Usage:

```python
forecasters = {
    "naive": lambda tr, h: np.repeat(tr.iloc[-1], h),
    "seasonal_naive": lambda tr, h: np.tile(tr.iloc[-7:].values, h // 7),
    # add your own model here, e.g. "holt_winters": lambda tr, h: ExponentialSmoothing(...).fit().forecast(h)
}
bt, averages = rolling_backtest(my_series, h=28, forecasters=forecasters)
print(bt.round(1))
print(averages.round(1))
```

## Rules before you trust a result

1. Match the backtest horizon to the horizon you actually need in production.
2. Use several origins and report the average **and** the spread — a model that's great on
   average but wildly inconsistent window to window is a different kind of risk than a model
   that's mediocre but stable.
3. Choose the order (`p, d, q` for ARIMA; `AIC` for model selection) on training data only —
   picking a model order by peeking at test-set error quietly leaks the test set.
4. Pick the metric that matches the business cost: MAE for plain units a manager will read, RMSE
   if big misses are disproportionately costly, MASE when comparing across several different
   series, and avoid MAPE whenever actuals can sit near zero.
5. Report a 95% (or similar) prediction interval, not just a point forecast, and check empirically
   how often the actual values actually fall inside it.
