# Baselines & Naive Forecasts

Before you fit anything clever, build the dumbest forecast that could possibly work. A baseline gives every later model a bar to clear: if a gradient-boosted model or an ARIMA cannot beat a forecast you wrote in one line of pandas, it is not earning its complexity. Baselines are also surprisingly hard to beat on real business series, which is exactly why they matter. This lesson builds four of them, scores them, and shows how to read the results.

## What you'll learn

- The four classic baselines: mean, naive, drift and seasonal naive
- How to hold out the end of a series and forecast a whole horizon at once
- How to score baselines with MAE and pick the right one to beat
- Why a baseline is the first model in every forecasting project

## The data (illustrative)

We use the same seeded, synthetic daily sales series as the rest of this chapter: an upward trend, a weekly pattern, a yearly wave and some noise, 730 days from 2023-01-01. It is illustrative, not real store data.

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

h = 28                                   # forecast horizon: 4 weeks
train, test = s.iloc[:-h], s.iloc[-h:]   # hold out the END of the series
```

We split by time, never at random. The model sees only `train` and must forecast all 28 days of `test` in one go.

## Four baselines

```python
# 1. Mean: the average of all history, repeated
mean_fc = np.repeat(train.mean(), h)

# 2. Naive: the last observed value, repeated
naive = np.repeat(train.iloc[-1], h)

# 3. Drift: the last value plus the average historical change per step
slope = (train.iloc[-1] - train.iloc[0]) / (len(train) - 1)
drift = train.iloc[-1] + slope * np.arange(1, h + 1)

# 4. Seasonal naive: repeat the last full season (7 days)
snaive = np.tile(train.iloc[-7:].values, h // 7)
```

- **Mean** assumes nothing ever changes. It is fine for a flat, noisy series and terrible for anything with a trend.
- **Naive** says "tomorrow looks like today". It is the standard baseline for series that wander, like prices.
- **Drift** is naive plus a straight line through the first and last training points. It follows a steady trend.
- **Seasonal naive** says "this Tuesday looks like last Tuesday". The season length here is 7 because the pattern repeats weekly. For monthly data with a yearly cycle it would be 12.

## Scoring them

```python
def mae(y, f):
    return np.mean(np.abs(y - f))

fcs = {"mean": mean_fc, "naive": naive,
       "drift": drift, "seasonal naive": snaive}
for name, f in fcs.items():
    print(f"{name:15s} MAE {mae(test.values, f):6.2f}")
```

Output:

```
mean            MAE  99.54
naive           MAE  17.75
drift           MAE  16.63
seasonal naive  MAE  16.13
```

The mean baseline is off by nearly 100 units a day because sales have climbed well above their historical average. The other three land close together, and seasonal naive is best. That 16.13 is now the number to beat: a fancier model must score clearly lower to justify itself. (Lesson 12 on evaluation reuses this figure and adds scaled metrics such as MASE.)

## Look at them

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(8, 4.5))
tail = s.iloc[-70:]
ax.plot(tail.index, tail.values, color="#1E1A16", lw=1.6, label="actual")
cols = {"mean": "#6B6259", "naive": "#C4952E",
        "drift": "#5E0F0F", "seasonal naive": "#8E1C1C"}
for name, f in fcs.items():
    ax.plot(test.index, f, color=cols[name], lw=1.6, ls="--", label=name)
ax.axvline(test.index[0], color="#6B6259", lw=0.8)
ax.set_title("Four baselines on the last 28 days (illustrative data)")
ax.set_ylabel("sales")
ax.legend(loc="upper left", fontsize=8, ncol=2)
fig.autofmt_xdate()
fig.tight_layout()
fig.savefig("baselines.png", dpi=150)
```

The seasonal naive line is the only one that wiggles with the weekly pattern, and it never catches the upward drift, which is the gap a real model can fill.

## Choosing and using a baseline

- Pick the baseline that matches the series: trending series call for drift, strongly seasonal ones for seasonal naive.
- A useful rule of thumb is to report the **best** simple baseline, not the weakest. Beating the mean baseline proves nothing.
- Match the horizon: forecasting 28 days ahead is a different job than forecasting 1 day ahead, and baseline errors grow with horizon.
- Keep the baseline in every later comparison, so the results table always has a row that costs almost nothing to run.

## Recap

- Baselines are one-liners: mean, naive, drift and seasonal naive.
- Split by time and forecast the whole horizon from the training data only.
- On our illustrative series, seasonal naive scored an MAE of 16.13, the target for the models ahead.
- Next lesson: exponential smoothing and ARIMA, the classic statistical models that try to beat that number.
