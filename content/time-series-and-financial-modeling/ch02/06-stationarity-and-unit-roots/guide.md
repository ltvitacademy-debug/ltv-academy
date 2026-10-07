# Stationarity & Unit Roots

Chapter 1 built clean, correctly-computed returns. Chapter 2 starts the formal time series toolkit those returns feed into — and the very first concept every model in this course leans on is **stationarity**. Almost every technique ahead (ARMA in Chapter 3, GARCH in Chapter 4, cointegration later in this chapter) either assumes stationarity outright or exists specifically to handle its absence. This lesson defines stationarity precisely and introduces the standard test for it: the Augmented Dickey-Fuller test.

## What you'll learn

- Strict stationarity vs. weak (covariance) stationarity — the definition actually used in practice
- What a unit root is, and why it means non-stationary
- The random walk as the canonical unit-root process
- The Augmented Dickey-Fuller (ADF) test: what its null hypothesis actually is
- Running and interpreting `statsmodels.tsa.stattools.adfuller`

## Weak (covariance) stationarity

A time series is **strictly stationary** if its entire joint probability distribution is unchanged under time shifts — a condition almost never checked directly because it's too strong to verify in practice. What's actually used is **weak stationarity** (also called covariance stationarity), which requires only three things, for all `t`:

1. **Constant mean**: `E[X_t] = μ`, not a function of `t`
2. **Constant variance**: `Var(X_t) = σ²`, not a function of `t`
3. **Autocovariance depends only on lag, not on time**: `Cov(X_t, X_(t+k))` depends on `k` but not on `t`

A series that's trending upward over time, or whose volatility is clearly expanding (both common in raw price levels), fails this definition immediately — which is exactly why Chapter 1 converted prices into returns before any of this analysis begins.

## Unit roots

Consider the simplest autoregressive model, `X_t = φ*X_(t-1) + ε_t`, where `ε_t` is white noise (defined precisely in Lesson 8). Whether this process is stationary depends entirely on `φ`:

- If `|φ| < 1`, the process is stationary — shocks decay over time, and the series reverts toward its mean.
- If `φ = 1`, the process has a **unit root**: `X_t = X_(t-1) + ε_t`, which is a **random walk**. Shocks never decay — every past shock has a permanent, undiminished effect on the current level, and the variance of `X_t` grows without bound as `t` increases. This is the textbook case of non-stationarity.

"Unit root" refers to the characteristic equation of the AR process having a root exactly on the unit circle. Practically, for this course: **a unit root means non-stationary**, and testing for a unit root is how you test for (non-)stationarity in practice.

## The Augmented Dickey-Fuller test

The ADF test is the standard tool for detecting a unit root. It's easy to misstate its null hypothesis, so memorize this precisely:

> **H0 (null): the series has a unit root (it is non-stationary).**
> **H1 (alternative): the series does not have a unit root (it is stationary).**

This means a **low p-value lets you reject the null — i.e., evidence of stationarity**. A high p-value means you fail to reject the null — i.e., the series looks non-stationary (or you simply don't have enough evidence against non-stationarity). This direction trips up almost everyone the first time: a *small* p-value is the *good* outcome if you want stationarity.

```python
from statsmodels.tsa.stattools import adfuller
import numpy as np

log_returns = np.log(prices).diff().dropna()

result = adfuller(log_returns, autolag="AIC")
adf_stat, p_value, used_lag, n_obs, crit_values, icbest = result

print(f"ADF statistic: {adf_stat:.4f}")
print(f"p-value: {p_value:.4f}")
print(f"Critical values: {crit_values}")

if p_value < 0.05:
    print("Reject H0: series appears stationary")
else:
    print("Fail to reject H0: series appears non-stationary")
```

`autolag="AIC"` lets `adfuller` automatically choose how many lagged difference terms to include, which is what "Augmented" refers to (the original Dickey-Fuller test uses no lag terms; the Augmented version adds enough to remove residual autocorrelation).

## Why financial log returns are (usually) stationary while prices are not

Running `adfuller` on raw price levels will almost always fail to reject the unit-root null — prices behave like a random walk (more on this in Lesson 8). Running it on log returns will almost always reject the null decisively, confirming what Chapter 1 assumed all along: returns, not prices, are the stationary series worth modeling directly.

## Key terms

| Term | Meaning |
|---|---|
| Weak (covariance) stationarity | Constant mean, constant variance, autocovariance depends only on lag |
| Unit root | A root of the AR characteristic equation on the unit circle; implies non-stationarity |
| Random walk | `X_t = X_(t-1) + ε_t`; the canonical unit-root, non-stationary process |
| ADF test | Augmented Dickey-Fuller test; H0 = unit root (non-stationary), H1 = stationary |
| `adfuller()` | statsmodels function implementing the ADF test |

## Recap

Stationarity — constant mean, constant variance, lag-only autocovariance — is the assumption nearly every model in this course rests on, and a unit root is the formal signature of its absence. The ADF test checks for a unit root with its null hypothesis set to "non-stationary," so a low p-value is the result you want when you need a stationary series. Next, Lesson 7 covers the ACF and PACF — the tools used to characterize exactly *how* a stationary series depends on its own past, which is the first step toward choosing a model for it.
