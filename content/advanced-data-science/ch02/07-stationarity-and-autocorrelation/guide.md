# Stationarity & Autocorrelation

Many forecasting methods, especially the classical ones like ARIMA that we meet soon, quietly assume that the statistical behavior of the series does not change over time. Two ideas let you check that assumption and describe how a series depends on its own past: **stationarity** and **autocorrelation**. This lesson explains both, runs the standard tests on illustrative data, and shows how differencing turns a trending series into a usable one.

## What you'll learn

- What a stationary series is, and why models care
- How to read the ADF and KPSS tests, and why their null hypotheses are opposite
- What autocorrelation and the ACF plot show
- How differencing and seasonal differencing remove trend and seasonality

## Stationarity

A series is (weakly) **stationary** if its mean and variance stay constant over time and the correlation between two points depends only on how far apart they are, not on when they occur. White noise is the classic example. A series with a trend, or with seasonality, is not stationary, because its mean depends on the calendar. A model fitted to one stretch of a non-stationary series may describe a different world than the stretch you want to forecast.

A **random walk**, where each value is the last one plus a random step, is non-stationary too. It wanders with no fixed level to return to. Its steps, the first differences, are stationary.

## Testing: ADF and KPSS

The **Augmented Dickey-Fuller (ADF)** test has the null hypothesis that the series has a unit root, meaning it is non-stationary. A small p-value (say below 0.05) is evidence against that null, so you conclude the series is stationary. **KPSS** flips it: its null is that the series is stationary, so a small p-value points to non-stationarity. Running both is common.

Both come from `statsmodels.tsa.stattools`. First, white noise versus a random walk (300 points, seeded, illustrative):

```python
rng = np.random.default_rng(11)
noise = pd.Series(rng.normal(0, 1, 300))
walk = noise.cumsum()
for name, x in [("noise", noise), ("walk", walk),
                ("walk diff", walk.diff().dropna())]:
    stat, p = adfuller(x)[:2]
```

What I got:

```
noise      ADF stat -17.00  p = 0.000
walk       ADF stat  -1.95  p = 0.307
walk diff  ADF stat -17.04  p = 0.000
```

The test rejects non-stationarity for the noise and for the walk's differences, and fails to reject for the walk itself. Differencing the walk made it stationary.

## Autocorrelation

**Autocorrelation** is the correlation of a series with a shifted copy of itself. The lag-1 autocorrelation compares each value to the previous one; lag 12 compares each value to the same month a year earlier. The **ACF plot** shows autocorrelation at each lag, with a shaded band showing the range you would expect from a series with no autocorrelation. On our walk, autocorrelations were 0.97, 0.95, 0.92 and so on, a slow decay. For the white noise they were near zero (0.01, -0.04, 0.07).

## The monthly sales series

Now the trend-plus-season sales series from Lesson 6 (60 months, illustrative):

```python
print("sales ADF p:", round(adfuller(s)[1], 3))
print("sales KPSS p:",
      kpss(s, regression="c", nlags="auto")[1])
```

Results: ADF p = 0.999 (cannot reject non-stationarity) and KPSS p = 0.01 (reject stationarity). Both agree: not stationary. KPSS also warned that the true p-value is smaller than the table's lower limit of 0.01, so 0.01 is a bound.

## Differencing

**Differencing** subtracts each value from the next: `s.diff()`. It removes a steady trend. **Seasonal differencing**, `s.diff(12)` for monthly data, subtracts the value from a year earlier and removes a stable seasonal pattern.

```python
d1 = s.diff().dropna()
d1_12 = s.diff().diff(12).dropna()
```

The ADF p-value fell to 0.000 for both. But look at what the ADF test misses. After only the first difference, the ACF at lag 12 is 0.70, far outside the band: the seasonal pattern is still there, even though the test says "stationary". After both differences the lag-12 value is -0.31 and the slow decay is gone. Some negative spikes remain, notably about -0.45 at lag 1, which is typical because differencing itself induces negative correlation. A model in the next lessons will account for that. On a series this short (60 points), treat the tests as a guide, and always look at the ACF plot too.

## Recap

Stationary series have a stable mean, spread, and dependence structure. ADF (null: non-stationary) and KPSS (null: stationary) test it, and differencing, including seasonal differencing, is the main fix. The ACF shows how a series relates to its own past, revealing trend as slow decay and seasonality as spikes at the seasonal lag. Next, before building fancy models, we set the bar with simple baselines and naive forecasts.
