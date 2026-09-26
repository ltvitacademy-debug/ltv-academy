# Forecasting With Machine Learning

Classic forecasting models such as exponential smoothing and ARIMA model a single series on its own. Machine-learning models take a different route: you convert the series into an ordinary supervised-learning table and reuse everything you learned in Applied Machine Learning, from regression to random forests to gradient boosting. That approach is flexible, since it accepts extra features like promotions or weather, but it has a few traps that only show up with time-ordered data. This lesson walks through the recipe and the biggest trap.

## What you'll learn

- How to reshape a time series into features and a target
- How to build lag, rolling and calendar features without leaking the future
- Why tree-based models can fail on trending data, and how to fix it
- Recursive vs. direct multi-step forecasting, and time-aware validation

## The data (illustrative)

Everything here uses a seeded, synthetic daily sales series: an upward trend, a weekly pattern, a yearly wave and some noise, for 730 days starting 2023-01-01. It is illustrative, not real store data.

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
```

## Step 1: build features from the past

Each row is one day. The target is that day's sales. The features must be known *before* that day.

```python
df = pd.DataFrame({"y": s})
df["lag_1"] = s.shift(1)                       # yesterday
df["lag_7"] = s.shift(7)                       # same weekday last week
df["roll7"] = s.shift(1).rolling(7).mean()     # 7-day average up to yesterday
df["dow"] = df.index.dayofweek                 # calendar feature
df = df.dropna()                               # early rows lack a full history
```

The `shift(1)` before `rolling(7)` matters. `s.rolling(7).mean()` would include today's own value in today's feature: leakage. Whenever you build a rolling or expanding statistic, ask, "Could I have computed this on the morning of the forecast?"

## Step 2: split by time, never at random

```python
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error

train, test = df.iloc[:-60], df.iloc[-60:]     # last 60 days held out
X = ["lag_1", "lag_7", "roll7", "dow"]
gbr = GradientBoostingRegressor(random_state=0).fit(train[X], train["y"])
lin = LinearRegression().fit(train[X], train["y"])
print("naive MAE  ", mean_absolute_error(test["y"], test["lag_1"]))
print("linear MAE ", mean_absolute_error(test["y"], lin.predict(test[X])))
print("GBR MAE    ", mean_absolute_error(test["y"], gbr.predict(test[X])))
```

Output on this seeded data (rounded to two decimals):

```
naive MAE   15.07
linear MAE  8.4
GBR MAE     17.16
```

The naive forecast simply repeats yesterday's value. Linear regression beats it comfortably, but gradient boosting does *worse* than the naive baseline. The reason: the test period reaches values around 438, while the highest value in training was about 417. A tree can only output averages of values it saw in training, so it cannot follow a trend into new territory.

## Step 3: model the change, not the level

Predict how far today's value is from the recent average, then add the average back:

```python
gd = GradientBoostingRegressor(random_state=0)
gd.fit(train[X], train["y"] - train["roll7"])
pred = test["roll7"] + gd.predict(test[X])
print("GBR on change MAE", mean_absolute_error(test["y"], pred))
```

The error drops to about 8.79. The model is unchanged; only the target became stationary-ish, which trees handle well. Differencing or detrending first are the same idea.

## Multi-step forecasts and honest validation

To forecast several days ahead you have two strategies. **Recursive**: predict day 1, append that prediction to the history, use it as a lag for day 2, and so on. Errors can compound, but one model is enough. **Direct**: train a separate model for each horizon (t+1, t+2, ...), which avoids compounding at the cost of more models.

For cross-validation, use `TimeSeriesSplit`, where every training window comes before its test window:

```python
from sklearn.model_selection import TimeSeriesSplit
tscv = TimeSeriesSplit(n_splits=3, test_size=60)
for tr, te in tscv.split(df):
    print(df.index[tr[-1]].date(), "->", df.index[te[0]].date())
```

Shuffled K-fold would train on the future to predict the past, giving flattering but meaningless scores.

## Recap

- Reshape the series into a table: lags, shifted rolling statistics and calendar features are the inputs.
- Shift before you roll, or you leak the target into its own features.
- Split by time. Compare against a naive baseline every time.
- Trees cannot extrapolate a trend; model the change (or detrend) first.
- Recursive and direct are the two multi-step strategies; validate with `TimeSeriesSplit`.

Next lesson: how to evaluate forecasts properly.
