# Evaluating Forecasts

A forecast that looks good on the data you built it from means nothing. What matters is how it performs on periods it has never seen, measured with the right metric, against a sensible baseline, over more than one test window. This lesson covers the four metrics you will meet most, and then the practice that separates careful forecasters from lucky ones: the rolling-origin backtest.

## What you'll learn

- What MAE, RMSE, MAPE and MASE measure, and when each one misleads
- Why a naive baseline is part of every evaluation
- How to run a rolling-origin backtest
- Why a single train/test split can give the wrong answer

## The series and two contenders (illustrative)

We reuse the seeded synthetic daily sales series from the previous lesson (trend, weekly pattern, yearly wave and noise). We compare two forecasters over a 28-day horizon: a **seasonal naive** baseline that repeats the last seven days, and a linear model with a trend and day-of-week effects.

```python
import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression

rng = np.random.default_rng(42)
idx = pd.date_range("2023-01-01", periods=730, freq="D")
t = np.arange(len(idx))
sales = (200 + 0.3 * t
         + 25 * np.sin(2 * np.pi * idx.dayofweek / 7)
         + 30 * np.sin(2 * np.pi * t / 365.25)
         + rng.normal(0, 8, len(idx)))
s = pd.Series(sales, index=idx, name="sales")

def design(index, start):
    X = pd.get_dummies(index.dayofweek).reindex(columns=range(7), fill_value=0)
    X["trend"] = np.arange(start, start + len(index))
    return X.values.astype(float)
```

## The metrics

```python
def mae(y, f):
    return np.mean(np.abs(y - f))

def rmse(y, f):
    return np.sqrt(np.mean((y - f) ** 2))

def mape(y, f):
    return 100 * np.mean(np.abs((y - f) / y))

def mase(y, f, train, m=7):
    scale = np.mean(np.abs(train[m:].values - train[:-m].values))
    return mae(y, f) / scale
```

- **MAE** is the average size of the miss, in the same units as sales. Easy to explain to a manager.
- **RMSE** squares errors before averaging, so large misses count for more. It is never smaller than MAE on the same errors.
- **MAPE** expresses error as a percentage of the actual value. It is popular but unstable: if actuals are near zero the percentage explodes, and at zero it is undefined.
- **MASE** divides your MAE by the average error a naive benchmark made on the training data (here the seasonal naive, with period `m=7`). Below 1 means your forecast errors are smaller than that benchmark's; above 1 means larger.

## One holdout window

```python
train, test = s.iloc[:-28], s.iloc[-28:]

snaive = np.tile(train.iloc[-7:].values, 4)          # repeat the last week
lin = LinearRegression().fit(design(train.index, 0), train.values)
lin_fc = lin.predict(design(test.index, len(train)))

for name, fc in [("seasonal naive", snaive), ("trend + weekday", lin_fc)]:
    print(f"{name:16s} MAE {mae(test.values, fc):5.2f}  RMSE {rmse(test.values, fc):5.2f}  "
          f"MAPE {mape(test.values, fc):4.1f}%  MASE {mase(test.values, fc, train):4.2f}")
```

Output:

```
seasonal naive   MAE 16.13  RMSE 20.16  MAPE  3.9%  MASE 1.79
trend + weekday  MAE  7.90  RMSE 10.08  MAPE  1.9%  MASE 0.87
```

On this single window the model wins on every metric, and its MASE is below 1. Ship it? Not yet.

## Rolling-origin backtest

Pick an origin date, train only on data before it, forecast the next 28 days, record the error, then slide the origin forward and repeat:

```python
h = 28
rows = []
for origin in range(len(s) - 5 * h, len(s), h):
    tr, te = s.iloc[:origin], s.iloc[origin:origin + h]
    sn = np.tile(tr.iloc[-7:].values, h // 7)
    m = LinearRegression().fit(design(tr.index, 0), tr.values)
    fc = m.predict(design(te.index, len(tr)))
    rows.append({"origin": te.index[0].date(),
                 "snaive_mae": mae(te.values, sn),
                 "linear_mae": mae(te.values, fc)})
bt = pd.DataFrame(rows)
print(bt.round(2))
print(bt[["snaive_mae", "linear_mae"]].mean().round(2))
```

Output:

```
       origin  snaive_mae  linear_mae
0  2024-08-13        8.95       27.56
1  2024-09-10        8.74       25.82
2  2024-10-08        9.56       21.29
3  2024-11-05       15.41        8.26
4  2024-12-03       16.13        7.90
snaive_mae    11.76
linear_mae    18.17
```

The verdict flips. The linear model wins the final two windows but loses badly on the first three, because its straight-line trend ignores the yearly wave in this series. Averaged over five windows, the "dumb" seasonal naive forecast is better. The single holdout happened to land on a window that flattered the model. Visualise it:

```python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

ax = bt.set_index("origin").plot.bar(
    figsize=(8, 4.5), color=["#C4952E", "#8E1C1C"])
ax.set_ylabel("MAE per 28-day window")
ax.set_title("Rolling-origin backtest (illustrative data)")
plt.xticks(rotation=0)
plt.tight_layout()
plt.savefig("backtest.png", dpi=150)
```

## Practical rules

- Always report a naive or seasonal-naive baseline. A model that cannot beat it is not adding value.
- Match the backtest horizon to the horizon you need in production.
- Use several origins and report the average *and* the spread.
- Choose metrics that fit the business cost: MAE for plain units, RMSE if big misses hurt, MASE to compare across series, and avoid MAPE near zero.

## Recap

MAE, RMSE, MAPE and MASE each answer a slightly different question. Compare against a baseline, and never trust a single split: a rolling-origin backtest showed that a model that won one window lost overall.

Next lesson: we start NLP with text cleaning and tokenization.
