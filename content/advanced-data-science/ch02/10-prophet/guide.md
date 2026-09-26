# Prophet

Prophet is an open-source forecasting library, originally released by Meta (Facebook), designed for business time series with strong seasonal patterns and holidays. Where ARIMA asks you to pick orders, Prophet asks you to describe the series in business terms: a trend that can bend, repeating weekly and yearly patterns, and optional holidays. It fits that description with a Bayesian model and returns forecasts with uncertainty intervals. This lesson uses it on the same illustrative sales series as the rest of the chapter, and shows one gotcha that trips up almost everyone.

## What you'll learn

- How Prophet models a series as trend plus seasonality plus holidays
- The data format it expects and the fit, `make_future_dataframe`, `predict` workflow
- Why a default Prophet can badly miss a yearly pattern, and how to fix it
- How to add holidays, run Prophet's built-in cross-validation, and read its component plots

## Setup

Prophet is installed with `pip install prophet`. It uses a compiled Stan backend, which on some machines is the fiddly part of installation, so check the current install notes in the official documentation if it fails. Everything below was run with prophet 1.3.0.

The series is the seeded synthetic daily sales from earlier lessons (illustrative, not real store data), with the last 28 days held out.

```python
import numpy as np
import pandas as pd
from prophet import Prophet

rng = np.random.default_rng(42)
idx = pd.date_range("2023-01-01", periods=730, freq="D")
t = np.arange(len(idx))
sales = (200 + 0.3 * t
         + 25 * np.sin(2 * np.pi * idx.dayofweek / 7)
         + 30 * np.sin(2 * np.pi * t / 365.25)
         + rng.normal(0, 8, len(idx)))
s = pd.Series(sales, index=idx, name="sales")

h = 28
df = s.reset_index()
df.columns = ["ds", "y"]          # Prophet needs exactly these two names
train, test = df.iloc[:-h], df.iloc[-h:]

def mae(y, f):
    return np.mean(np.abs(np.asarray(y) - np.asarray(f)))
```

Prophet insists on a DataFrame with a date column called `ds` and a numeric column called `y`. No index tricks, no frequency setting.

## Fit, extend, predict

```python
m = Prophet()                                  # defaults
m.fit(train)
fc = m.predict(m.make_future_dataframe(periods=h))
print(list(m.seasonalities))
print("default MAE", round(mae(test["y"], fc["yhat"].iloc[-h:]), 2))
```

`make_future_dataframe(periods=h)` returns the training dates plus `h` more days, and `predict` returns a DataFrame with the forecast in `yhat`, interval bounds in `yhat_lower` and `yhat_upper`, and one column per component (`trend`, `weekly`, and so on).

Output:

```
['weekly']
default MAE 24.2
```

That is worse than the seasonal naive baseline (16.13), and the first line tells you why. Only a `weekly` seasonality was fitted.

## The gotcha: yearly seasonality is 'auto'

By default Prophet decides which seasonalities to include. It switches on yearly seasonality only if the training history spans at least two years. Our training data is 702 days, just short of that, so the yearly wave was silently left out. You can force it:

```python
m2 = Prophet(yearly_seasonality=True)
m2.fit(train)
fc2 = m2.predict(m2.make_future_dataframe(periods=h))
print(list(m2.seasonalities))
print("yearly=True MAE", round(mae(test["y"], fc2["yhat"].iloc[-h:]), 2))
```

```
['yearly', 'weekly']
yearly=True MAE 6.71
```

One argument moves the error from 24.2 to 6.71, better than seasonal naive and in the same range as Holt-Winters and SARIMA from Lesson 9. Always print `m.seasonalities` and check that the model contains what you believe your series contains. Prophet's default intervals cover 80 percent (the `interval_width` argument, default 0.80); on this window roughly 8 in 10 actuals landed inside, though the bounds are simulated and vary slightly from run to run.

## Holidays and cross-validation

Holidays are added by name or country. This synthetic series has no holiday effects, so do not expect a real gain here; the point is the API.

```python
m3 = Prophet(yearly_seasonality=True)
m3.add_country_holidays(country_name="US")
m3.fit(train)
fc3 = m3.predict(m3.make_future_dataframe(periods=h))
print("with US holidays MAE", round(mae(test["y"], fc3["yhat"].iloc[-h:]), 2))
```

```
with US holidays MAE 6.48
```

The difference from 6.71 is noise, not a holiday effect, since we invented no holidays. On real retail data with genuine holiday spikes, the effect can be large.

Prophet also ships a rolling-origin backtest, the idea from Lesson 12:

```python
from prophet.diagnostics import cross_validation, performance_metrics

cv = cross_validation(m2, initial="400 days", period="90 days",
                      horizon="28 days", disable_tqdm=True)
print(cv["cutoff"].nunique(), "cutoffs")
pm = performance_metrics(cv, rolling_window=1)
print(pm[["horizon", "mae", "rmse", "mape"]].round(3))
```

```
4 cutoffs
  horizon    mae   rmse  mape
0 28 days  7.305  8.989  0.02
```

Here `initial` is the first training window, `period` is the spacing between cutoffs and `horizon` is how far each forecast reaches. Averaged over four cutoffs, MAE is 7.31, consistent with the single window's 6.71. Note that `cross_validation` uses only the history the model was fitted on. It also refits the model at each cutoff, so it takes noticeably longer than a single fit.

## Reading the components

Prophet can plot what it learned:

```python
import matplotlib
matplotlib.use("Agg")
fig = m2.plot_components(fc2)
fig.savefig("prophet_components.png", dpi=110)
```

The plot shows the trend (rising about 0.3 per day, the value we built in), the weekly shape and the yearly wave. This interpretability is a large part of Prophet's appeal.

## Recap

- Prophet needs a `ds` and `y` DataFrame, then `fit`, `make_future_dataframe` and `predict`.
- It models trend, seasonality and optional holidays, and returns `yhat` with `yhat_lower` and `yhat_upper`.
- Yearly seasonality is off by default for histories under two years: check `m.seasonalities`.
- `add_country_holidays` and `cross_validation` cover holidays and honest backtesting.
- Next lesson: forecasting with machine learning, where lags and calendar features feed models you already know.
