# Feature Stationarity & Normalization

Lesson 30 fixed a timing problem — making sure a fundamental feature only becomes visible on the day it was actually reported. This lesson fixes a different problem with the same engineered features: many of them, by their very construction, drift in mean or variance over time, exactly like the raw prices Lesson 1 and Lesson 6 moved away from.

## What you'll learn

- Why raw price levels, cumulative fundamentals, and rolling-sum indicators are often non-stationary
- Differencing and percent-change as the direct fix, reusing Lesson 1's log-return logic
- Rolling z-scores as a fix for features that can't simply be differenced
- Why a single *global* z-score leaks future distributional information and drifts across regimes
- Rank/percentile transforms as a robust, outlier-resistant alternative common in equity factor work
- Confirming the fix with the ADF test from Lesson 6

## Why engineered features are often non-stationary

Lesson 6 defined weak stationarity as constant mean, constant variance, and autocovariance that depends only on lag — and showed that raw price levels fail this badly, which is why Chapter 1 worked in returns instead. The same problem resurfaces inside feature engineering itself. A raw price level used directly as a feature inherits all of price's non-stationarity. A cumulative fundamental quantity (trailing twelve-month revenue, say) drifts upward with company growth. A rolling-sum indicator built on a quantity like trading volume drifts whenever the underlying level of market activity shifts to a new regime. None of these are exotic cases — they're the default behavior of anything built by summing or levels-tracking a series that itself trends.

## Fix 1: differencing and percent-change

For a feature that behaves like a price level, the Lesson 1 fix applies directly: difference it, or take its percent-change, exactly as was done to go from price to returns. This is the right tool whenever the feature's non-stationarity comes from a trending level.

## Fix 2: rolling z-scores, not a single global z-score

For features where simple differencing doesn't make sense (a bounded ratio, a rolling-window indicator that's already a "rate" rather than a level), the common fix is a **rolling z-score** — subtracting a *rolling* mean and dividing by a *rolling* standard deviation, each computed only from a trailing window:

```
z_t = (x_t - rolling_mean_t) / rolling_std_t
```

This is deliberately different from a **global z-score**, which subtracts the mean and divides by the standard deviation computed once, over the *entire* dataset (training and test alike). A global z-score has two serious problems for financial time series: it uses information from the future relative to any point earlier in the sample (a classic leakage pattern, covered in full in Lesson 32), and it assumes the feature's distribution is stable across the whole sample — an assumption that breaks down across a genuine regime change (Chapter 6's regime-switching models exist precisely because that assumption often fails). A rolling z-score re-centers and re-scales using only the recent past, which adapts to a drifting mean or a changing volatility regime instead of silently ignoring it.

## Fix 3: rank / percentile transforms

A third option, common in cross-sectional equity factor work, is converting a feature into its **rank or percentile** within some reference group (e.g., where does this stock's P/E rank among all stocks in the universe today?). Rank transforms are stationary by construction — a rank is always between 0 and 1 (or 1 and N) regardless of how the underlying raw values drift — and they're robust to outliers, since one extreme value only shifts a rank by one position rather than distorting a mean or standard deviation.

## Worked example: ADF before and after a rolling z-score

```python
import numpy as np
import pandas as pd
from statsmodels.tsa.stattools import adfuller

np.random.seed(11)
n = 600
log_rets = np.random.normal(0.0004, 0.013, n)
price = 80 * np.exp(np.cumsum(log_rets))
dates = pd.bdate_range("2022-01-03", periods=n)
prices = pd.Series(price, index=dates)

# Volume with a gradually shifting liquidity regime (activity picks up over the window)
liquidity_regime_drift = np.linspace(0, 1.2, n)
volume = np.random.lognormal(mean=11, sigma=0.3, size=n) * np.exp(liquidity_regime_drift)
volume = pd.Series(volume, index=dates)

raw_price_level = prices
rolling_sum_volume_20 = volume.rolling(20).sum()

def run_adf(series, label):
    stat, pval, *_ = adfuller(series.dropna(), autolag="AIC")
    print(f"{label}: ADF stat = {stat:.4f}, p-value = {pval:.4f}")

run_adf(raw_price_level, "raw_price_level (before)")
run_adf(rolling_sum_volume_20, "rolling_sum_volume_20 (before)")

def rolling_zscore(series, window=60):
    roll_mean = series.rolling(window).mean()
    roll_std = series.rolling(window).std()
    return (series - roll_mean) / roll_std

price_level_rollz = rolling_zscore(raw_price_level, 60)
volume_sum_rollz = rolling_zscore(rolling_sum_volume_20, 60)
global_z_price_level = (raw_price_level - raw_price_level.mean()) / raw_price_level.std()

run_adf(price_level_rollz, "raw_price_level, 60d rolling z-score (after)")
run_adf(volume_sum_rollz, "rolling_sum_volume_20, 60d rolling z-score (after)")
run_adf(global_z_price_level, "raw_price_level, GLOBAL z-score (for contrast)")
```

Output:

```
raw_price_level (before): ADF stat = -1.8509, p-value = 0.3555
rolling_sum_volume_20 (before): ADF stat = -0.5354, p-value = 0.8849
raw_price_level, 60d rolling z-score (after): ADF stat = -3.6314, p-value = 0.0052
rolling_sum_volume_20, 60d rolling z-score (after): ADF stat = -6.4058, p-value = 0.0000
raw_price_level, GLOBAL z-score (for contrast): ADF stat = -1.8509, p-value = 0.3555
```

Both raw features fail to reject the unit-root null before any transform (p = 0.3555 and p = 0.8849 — non-stationary, as expected from a trending price level and a volume series riding a liquidity-regime drift). After the 60-day rolling z-score, both reject decisively (p = 0.0052 and p < 0.0001 — stationary). The global z-score row makes the key point concrete: its ADF statistic and p-value are **identical** to the untransformed price level, because a global z-score is just a fixed linear rescaling of the raw series — it shifts and stretches the data once, but does nothing to remove a trend, so it cannot fix non-stationarity no matter how tidy the resulting numbers look.

## Key terms

| Term | Meaning |
|---|---|
| Rolling z-score | `(x_t - rolling_mean) / rolling_std`, computed from a trailing window only |
| Global z-score | A z-score using the full-sample mean/std; leaks future information and ignores regime shifts |
| Rank/percentile transform | Converting a feature to its rank within a reference group; stationary by construction, outlier-robust |
| Liquidity regime drift | A gradual shift in the general level of trading activity, which can make volume-based features non-stationary |
| ADF test | Augmented Dickey-Fuller test (Lesson 6); low p-value rejects the unit-root null, indicating stationarity |

## Recap

Engineered features inherit the same non-stationarity problems raw prices have, and the fix depends on the feature: differencing for level-like quantities, a rolling (never global) z-score for quantities that need re-scaling without peeking at the future, or a rank transform for robustness to outliers and regime shifts — with the ADF test as the way to confirm any of these actually worked. Next, Lesson 32 closes Chapter 7 by generalizing the leakage warning buried in this lesson's global-z-score example into a full treatment of every way a time-aware feature can accidentally see the future.
