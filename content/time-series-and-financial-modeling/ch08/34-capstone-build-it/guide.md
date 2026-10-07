# Capstone: Build It

Lesson 33 set up the universe — five fictional assets, a shared GARCH-driven factor, and asset-specific GARCH-driven idiosyncratic shocks, with realized annualized volatility from 13.6% to 38.4% and a correlation matrix that tracked each asset's factor beta. This lesson does the actual work: fit ARMA and GARCH(1,1) to each asset, estimate the factor-model covariance, and compare it to the sample covariance.

## What you'll learn

- Re-running Lesson 33's exact simulation so every number here is reproducible
- Fitting an ARMA model per asset by AIC search, with a Ljung-Box residual check
- Fitting GARCH(1,1) per asset and reading off alpha, beta, and persistence
- Estimating a one-factor covariance matrix and comparing it to the sample covariance
- Building one combined summary table across all five assets

## Rebuilding the universe

This block is identical to Lesson 33's — same seeds, same parameters — so the numbers below are exactly reproducible:

```python
import numpy as np
import pandas as pd
import warnings
warnings.filterwarnings("ignore")
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.stats.diagnostic import acorr_ljungbox
from arch import arch_model

np.random.seed(2024)

ASSETS = [
    ("QRBT", "Technology",       1.30, 0.018, 0.08, 0.88),
    ("HALC", "Technology",       1.15, 0.016, 0.07, 0.89),
    ("COBM", "Materials",        0.90, 0.014, 0.06, 0.90),
    ("PRAI", "Consumer Staples", 0.45, 0.009, 0.05, 0.90),
    ("VANU", "Utilities",        0.35, 0.008, 0.05, 0.90),
]
N = 1000
dates = pd.bdate_range("2021-01-04", periods=N)

def simulate_garch11(n, long_run_vol, alpha, beta, seed):
    rng = np.random.default_rng(seed)
    long_run_var = long_run_vol ** 2
    omega = long_run_var * (1 - alpha - beta)
    sigma2, eps = np.empty(n), np.empty(n)
    sigma2[0] = long_run_var
    z = rng.standard_normal(n)
    eps[0] = np.sqrt(sigma2[0]) * z[0]
    for t in range(1, n):
        sigma2[t] = omega + alpha * eps[t - 1] ** 2 + beta * sigma2[t - 1]
        eps[t] = np.sqrt(sigma2[t]) * z[t]
    return eps, np.sqrt(sigma2)

factor_returns, _ = simulate_garch11(N, long_run_vol=0.011, alpha=0.08, beta=0.88, seed=100)
returns = {}
betas_true = {}
for i, (ticker, sector, beta_mkt, idio_vol, idio_alpha, idio_beta) in enumerate(ASSETS):
    idio_eps, _ = simulate_garch11(N, long_run_vol=idio_vol, alpha=idio_alpha, beta=idio_beta, seed=200 + i)
    returns[ticker] = beta_mkt * factor_returns + idio_eps
    betas_true[ticker] = beta_mkt

returns_df = pd.DataFrame(returns, index=dates)
tickers = list(returns.keys())
```

## Step 1: ARMA per asset, with a Ljung-Box check

```python
arma_results = {}
for ticker in tickers:
    series = returns_df[ticker] * 100  # scale for numerical stability
    best_aic, best_order, best_fit = np.inf, (0, 0, 0), None
    for p in range(3):
        for q in range(3):
            try:
                fit = ARIMA(series, order=(p, 0, q)).fit()
                if fit.aic < best_aic:
                    best_aic, best_order, best_fit = fit.aic, (p, 0, q), fit
            except Exception:
                continue
    lb = acorr_ljungbox(best_fit.resid, lags=[10], return_df=True)
    arma_results[ticker] = {"order": best_order, "aic": best_aic,
                             "lb_stat": lb["lb_stat"].iloc[0], "lb_pvalue": lb["lb_pvalue"].iloc[0]}

for ticker, r in arma_results.items():
    print(f"{ticker}: order={r['order']}, AIC={r['aic']:.2f}, "
          f"Ljung-Box(10) p-value={r['lb_pvalue']:.3f}")
```

```
QRBT: order=(1, 0, 0), AIC=4605.84, Ljung-Box(10) p-value=0.774
HALC: order=(2, 0, 2), AIC=4268.23, Ljung-Box(10) p-value=0.202
COBM: order=(0, 0, 0), AIC=3904.55, Ljung-Box(10) p-value=0.506
PRAI: order=(0, 0, 0), AIC=2864.73, Ljung-Box(10) p-value=0.220
VANU: order=(1, 0, 1), AIC=2531.74, Ljung-Box(10) p-value=0.877
```

Every Ljung-Box p-value is well above 0.05, so none of the fitted models leaves significant autocorrelation behind in its residuals — a clean pass on the residual diagnostic. The chosen orders themselves are worth reading carefully, though: COBM and PRAI came back as **white noise, ARMA(0,0)** — no autoregressive or moving-average structure at all — while QRBT, HALC, and VANU picked up small AR/MA terms (1,0), (2,2), and (1,1) respectively. Since this universe was simulated with no true mean-level autocorrelation in any asset (the factor and idiosyncratic shocks are GARCH in *variance*, not in the mean), those small nonzero orders for QRBT, HALC, and VANU are almost certainly **model-selection noise** — AIC occasionally rewards a spurious lag parameter on a finite sample even when the true process has none. This is a genuinely realistic outcome, not a sign of a bug, and Lesson 35 comes back to what it implies.

## Step 2: GARCH(1,1) per asset

```python
garch_results = {}
for ticker in tickers:
    am = arch_model(returns_df[ticker] * 100, vol="Garch", p=1, q=1, mean="constant", dist="normal")
    res = am.fit(disp="off")
    omega, alpha, beta = res.params["omega"], res.params["alpha[1]"], res.params["beta[1]"]
    garch_results[ticker] = {"omega": omega, "alpha": alpha, "beta": beta, "persistence": alpha + beta}

for ticker, r in garch_results.items():
    print(f"{ticker}: alpha={r['alpha']:.4f}, beta={r['beta']:.4f}, persistence={r['persistence']:.4f}")
```

```
QRBT: alpha=0.0425, beta=0.9034, persistence=0.9459
HALC: alpha=0.0265, beta=0.9015, persistence=0.9280
COBM: alpha=0.0599, beta=0.7044, persistence=0.7643
PRAI: alpha=0.0471, beta=0.9072, persistence=0.9543
VANU: alpha=0.0382, beta=0.9137, persistence=0.9520
```

Four of the five assets fit a persistence (alpha + beta) above 0.92, consistent with the simulation's 0.95-0.96 target persistence for most assets. COBM's fitted persistence (0.76) sits meaningfully below its 0.96 simulation target — a reminder that GARCH parameters, especially beta, are notoriously hard to pin down precisely from a single ~1,000-day sample, even when the data-generating process is known exactly (as it is here, since we built it). All five stationarity conditions (alpha + beta < 1) hold comfortably.

## Step 3: one-factor covariance vs. sample covariance

```python
sample_cov = returns_df.cov()

factor_series = pd.Series(factor_returns, index=dates)
betas_est, resid_var = {}, {}
for ticker in tickers:
    y, x = returns_df[ticker].values, factor_series.values
    beta_hat = np.cov(x, y, bias=True)[0, 1] / np.var(x)
    resid_var[ticker] = (y - beta_hat * x).var()
    betas_est[ticker] = beta_hat

beta_vec = np.array([betas_est[t] for t in tickers])
factor_model_cov = np.outer(beta_vec, beta_vec) * factor_series.var() + np.diag([resid_var[t] for t in tickers])
factor_model_cov_df = pd.DataFrame(factor_model_cov, index=tickers, columns=tickers)

print((sample_cov * 252 * 10000).round(1))          # annualized, scaled for readability
print((factor_model_cov_df * 252 * 10000).round(1))
```

Estimated betas track the true simulation betas closely:

```
QRBT: beta_hat=1.325  (true=1.30)
HALC: beta_hat=1.123  (true=1.15)
COBM: beta_hat=0.828  (true=0.90)
PRAI: beta_hat=0.410  (true=0.45)
VANU: beta_hat=0.341  (true=0.35)
```

And the two covariance matrices (annualized, scaled by 10,000 for readability) are close but not identical:

```
Sample covariance:                    One-factor-model covariance:
       QRBT   HALC   COBM   PRAI VANU         QRBT   HALC   COBM   PRAI VANU
QRBT  1472.3  428.8 293.5 170.5 139.3   QRBT  1471.4  444.7 327.8 162.3 135.0
HALC   428.8 1054.1 283.3 152.1 114.8   HALC   444.7 1053.4 277.7 137.5 114.3
COBM   293.5  283.3 730.0  99.1  76.1   COBM   327.8  277.7 729.5 101.4  84.3
PRAI   170.5  152.1  99.1 258.1  40.3   PRAI   162.3  137.5 101.4 257.9  41.7
VANU   139.3  114.8  76.1  40.3 185.3   VANU   135.0  114.3  84.3  41.7 185.2
```

The diagonal entries (each asset's own variance) match almost exactly between the two matrices — that's expected, since the factor model's diagonal is built using the same asset's own residual variance plus its own factor contribution. The larger differences show up off-diagonal: the sample covariance between QRBT and COBM is 293.5, while the factor model says 327.8 — a gap of about 34, the largest single discrepancy in the matrix. That gap is the factor model's whole simplifying assumption made visible: it assumes *all* cross-asset co-movement runs through the single common factor, while the sample covariance also picks up whatever correlation shows up by chance between two assets' idiosyncratic shocks over this particular 1,000-day sample, even though the simulation built those shocks to be independent in population.

## Step 4: combined summary table

```python
summary = pd.DataFrame({
    "sector": [a[1] for a in ASSETS],
    "arma_order": [str(arma_results[t]["order"]) for t in tickers],
    "garch_persistence": [round(garch_results[t]["persistence"], 3) for t in tickers],
    "factor_beta_hat": [round(betas_est[t], 3) for t in tickers],
    "ann_vol": [round(returns_df[t].std() * np.sqrt(252), 3) for t in tickers],
}, index=tickers)
print(summary)
```

```
                sector arma_order  garch_persistence  factor_beta_hat  ann_vol
QRBT        Technology  (1, 0, 0)              0.946            1.325    0.384
HALC        Technology  (2, 0, 2)              0.928            1.123    0.325
COBM         Materials  (0, 0, 0)              0.764            0.828    0.270
PRAI  Consumer Staples  (0, 0, 0)              0.954            0.410    0.161
VANU         Utilities  (1, 0, 1)              0.952            0.341    0.136
```

One table, five assets, every tool from this course represented in a single row each.

## Key terms

| Term | Meaning |
|---|---|
| Ljung-Box test | Tests whether residuals still have significant autocorrelation left over after a model fit |
| GARCH persistence | alpha + beta; how slowly a GARCH volatility shock decays |
| Factor-model covariance | A covariance matrix built from estimated betas and residual variances rather than the raw sample |
| Model-selection noise | A spurious nonzero order chosen by an information criterion like AIC on a finite sample, even when the true process has no such structure |

## Recap

Every asset passed its Ljung-Box residual check, GARCH persistence came back high (0.76-0.95) and consistent with real equity volatility behavior, estimated factor betas landed close to their true simulation values, and the factor-model covariance matched the sample covariance closely on the diagonal while diverging modestly off-diagonal — most notably a 34-point gap between QRBT and COBM. Next, Lesson 35 closes the course by interpreting all of these numbers honestly, including what the ARMA orders' apparent structure and the factor model's off-diagonal gaps actually mean, and by covering how to present this project well.
