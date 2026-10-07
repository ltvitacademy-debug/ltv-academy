# Autocorrelation & Partial Autocorrelation

Once a series is stationary (Lesson 6), the next question is: how exactly does it depend on its own past? The Autocorrelation Function (ACF) and Partial Autocorrelation Function (PACF) are the two standard tools for answering that, and their combined shape is the classical method for identifying what order of AR or MA model (Chapter 3) might fit a series. This lesson covers how each is defined, why they differ, and how to read their plots.

## What you'll learn

- The Autocorrelation Function (ACF): correlation between `X_t` and `X_(t-k)`, including indirect paths
- The Partial Autocorrelation Function (PACF): correlation between `X_t` and `X_(t-k)` after removing the effect of the lags in between
- Why ACF and PACF cut off differently for AR vs. MA processes — the classical identification rule
- Computing and plotting both with statsmodels
- Confidence bands and what "significant" means on these plots

## The Autocorrelation Function (ACF)

The ACF at lag `k` is the correlation between `X_t` and `X_(t-k)`:

```
ACF(k) = Cov(X_t, X_(t-k)) / Var(X_t)
```

Crucially, this is the *total* correlation at lag `k`, including correlation that flows **indirectly** through the intermediate lags. If `X_t` depends on `X_(t-1)`, and `X_(t-1)` depends on `X_(t-2)`, then `X_t` and `X_(t-2)` will show up correlated in the ACF even if there's no *direct* relationship between them two steps back — the correlation is being transmitted through lag 1.

## The Partial Autocorrelation Function (PACF)

The PACF at lag `k` is the correlation between `X_t` and `X_(t-k)` **after removing the linear effect of all the intermediate lags** `X_(t-1), ..., X_(t-k+1)`. It isolates the *direct* relationship at exactly lag `k`, stripped of anything transmitted through shorter lags. Formally, it's the coefficient on `X_(t-k)` in the regression of `X_t` on `X_(t-1), ..., X_(t-k)` — or computed more efficiently via the Durbin-Levinson recursion.

## Why this distinction matters: AR vs. MA identification

This is the classical "Box-Jenkins" identification rule, foundational for Chapter 3:

- A pure **AR(p)** process has an ACF that **decays gradually** (tails off, often exponentially or in a damped sine wave), but a PACF that **cuts off sharply after lag p** — because by construction there's no *direct* dependence beyond lag p once you've conditioned on the lags in between.
- A pure **MA(q)** process has the opposite signature: an ACF that **cuts off sharply after lag q**, but a PACF that **decays gradually**.

So: ACF cuts off → think MA. PACF cuts off → think AR. Both decay gradually → think mixed ARMA (or that differencing/further modeling is needed).

## Computing and plotting in statsmodels

```python
import numpy as np
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from statsmodels.tsa.stattools import acf, pacf

log_returns = np.log(prices).diff().dropna()

acf_values = acf(log_returns, nlags=20)
pacf_values = pacf(log_returns, nlags=20, method="ywm")

plot_acf(log_returns, lags=20)
plot_pacf(log_returns, lags=20, method="ywm")
```

`plot_acf`/`plot_pacf` draw a shaded confidence band (95% by default) around zero. A bar extending outside the band at lag `k` is "statistically significant" at that lag — evidence of real autocorrelation rather than sampling noise, under the (standard, large-sample) assumption that the true process has no dependence at that lag.

## Applying this to Chapter 1's stylized facts

Recall from Lesson 3: raw log returns typically show an ACF that's essentially flat/insignificant at every lag beyond the very shortest — consistent with little linear predictability in returns themselves. But running the same ACF on **squared** or **absolute** log returns reveals strong, slowly decaying autocorrelation — the signature of volatility clustering that GARCH models (Chapter 4) are built to capture. ACF/PACF aren't just for identifying ARMA orders; they're a general diagnostic for *any* dependence structure, applied to whatever transformed series you're interested in.

## Key terms

| Term | Meaning |
|---|---|
| ACF | Total correlation between X_t and X_(t-k), including indirect paths through intermediate lags |
| PACF | Correlation between X_t and X_(t-k) after removing the effect of intermediate lags — the direct relationship |
| AR(p) signature | ACF decays gradually; PACF cuts off sharply after lag p |
| MA(q) signature | ACF cuts off sharply after lag q; PACF decays gradually |
| Confidence band | Shaded region on ACF/PACF plots; bars outside it are statistically significant |

## Recap

ACF measures total (direct + indirect) correlation at each lag; PACF strips out the indirect part to isolate the direct relationship at exactly that lag — and their contrasting decay/cutoff patterns are the classical way to tell an AR process from an MA process before you even fit one. Next, Lesson 8 looks closely at the two simplest and most important benchmark processes in this framework: white noise and the random walk.
