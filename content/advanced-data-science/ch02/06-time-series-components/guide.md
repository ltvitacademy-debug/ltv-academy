# Time Series Components

A time series is a set of measurements taken in time order, such as monthly sales, daily website visits, or hourly electricity use. The order matters: today's value depends on yesterday's, so the tools you used on shuffled, independent rows (random train/test splits, ordinary cross-validation) need rethinking. Before you forecast anything, you need to see what the series is made of. Nearly every series can be described as a combination of a few components, and separating them is the first step in understanding your data.

## What you'll learn

- The four components: trend, seasonality, cycles, and noise
- The difference between additive and multiplicative structure
- How to decompose a series with `seasonal_decompose` and `STL` from statsmodels
- What decomposition can and cannot tell you

## The components

- **Trend**: the long-run direction, up, down, or flat. Sales growing by about the same amount each month is a trend.
- **Seasonality**: a pattern that repeats at a fixed, known period, such as a holiday peak every December, or a weekend dip every seven days.
- **Cycles**: rises and falls that do not have a fixed length, such as business cycles lasting several years. They are easy to confuse with seasonality, but seasonality has a calendar period and cycles do not. With only a few years of data, cycles are often impossible to separate from the trend.
- **Noise (residual)**: what is left after the other components are removed. Ideally it looks random.

## An illustrative series

We generate five years of monthly sales, with a known trend of 1.5 units per month, a known seasonal pattern that peaks in November and December, and random noise. Because we built it, we can check whether decomposition recovers what we put in. The data is illustrative, not real.

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(7)
idx = pd.date_range("2019-01-01", periods=60, freq="MS")
t = np.arange(60)
season = np.array([-18, -15, -5, 0, 5, 10,
                   12, 8, 0, 8, 25, 40])[idx.month - 1]
sales = 200 + 1.5 * t + season + rng.normal(0, 4, 60)
s = pd.Series(sales, index=idx, name="sales")
```

Note the `DatetimeIndex` with monthly frequency (`"MS"` means month start). A proper date index is what lets time-series tools know the spacing between observations.

## Decomposing it

```python
from statsmodels.tsa.seasonal import seasonal_decompose

res = seasonal_decompose(s, model="additive", period=12)
```

Install statsmodels with `pip install statsmodels` if needed; I ran this with version 0.14. The result holds `res.trend`, `res.seasonal`, and `res.resid`. Here is what came back:

```
seasonal, Jan..Dec: -23.3 -18.1 -12.2 -6.1 -1.2 5.3
                     2.8   3.0  -6.7   0.0  21.4 35.1
trend NaNs: 12
slope per month: 1.56    (true value: 1.5)
residual std: 2.94       (true noise sd: 4)
```

The recovered slope is very close to the true 1.5, and the seasonal pattern has the right shape, with the big December peak, though individual months are off by a few units because noise leaks into the estimate. The trend has 12 missing values because the classical method uses a centered moving average, which cannot be computed within six months of either end. The video shows all four panels.

## Additive or multiplicative?

In an **additive** series, the seasonal swing has a constant size: `value = trend + seasonal + noise`. In a **multiplicative** series, the swing grows with the level: `value = trend × seasonal × noise`. A useful clue: if the peaks get taller as the series rises, think multiplicative.

To see the difference, we build a second series whose seasonality scales with its level and decompose it with `model="multiplicative"`:

```python
m = (100 + 3 * t) * (1 + season / 100) \
    * (1 + rng.normal(0, 0.01, 60))
m = pd.Series(m, index=idx)
rm = seasonal_decompose(m, model="multiplicative", period=12)
```

The seasonal output is now a set of **factors** near 1 (from about 0.77 in January to about 1.32 in December) rather than amounts to add. The yearly swing (max minus min) grew from about 100 in year 1 to about 189 in year 5, whereas in the additive series it stayed near 75. A common trick is to take logs, which turns a multiplicative series into an additive one.

## A more flexible option: STL

Classical decomposition assumes the seasonal pattern is identical every year and leaves gaps at the ends. `STL` (Seasonal-Trend decomposition using Loess) allows the seasonal pattern to change slowly, can be made robust to outliers, and returns values for every point:

```python
from statsmodels.tsa.seasonal import STL
stl = STL(s, period=12).fit()
```

On our series, `stl.trend` had no missing values. Check the statsmodels documentation for its options.

## What decomposition is for

Decomposition is a **diagnostic**, not a forecast. It helps you decide what the model must handle: does the series need a trend term, a seasonal term, a log transform? Two cautions. First, the period must be right: `period=12` for monthly data with a yearly pattern, `period=7` for daily data with a weekly pattern. Second, if the residual still shows visible structure, the decomposition has missed something.

## Recap

Series are built from trend, seasonality, cycles, and noise, combined additively or multiplicatively. `seasonal_decompose` and `STL` separate them so you can see the structure before modeling. Next, we look at two properties that most classical forecasting models care about: stationarity and autocorrelation.
