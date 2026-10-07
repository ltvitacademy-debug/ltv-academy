# Capstone Kickoff: Model Returns and Volatility for a Universe of Assets

This is it — the capstone, and the final chapter of Time Series & Financial Modeling. Lesson 32 closed Chapter 7 by hardening every feature in this course's toolkit against leakage. The next three lessons put the *modeling* half of that toolkit to work on a single connected project: build a small returns-and-risk model for a universe of assets, using nothing from outside this course. This lesson sets up the project and generates the data. Lesson 34 does the actual fitting. Lesson 35 interprets the results and covers how to present the finished work.

## What you'll learn

- The capstone's goal and its four concrete deliverables
- The fictional five-asset universe this project uses, across four sectors
- How the universe's returns are simulated — a common factor plus asset-specific GARCH-style idiosyncratic volatility — with every parameter stated explicitly
- Why "fit ARMA, fit GARCH, estimate a factor covariance" is the right scope for this course's capstone, and what's deliberately left out

## The project, in one sentence

Build a small returns-and-risk model for a five-asset universe: fit an ARMA model to each asset's log returns and check the residual diagnostics, fit a GARCH(1,1) model to each asset's returns for its volatility dynamics, and estimate a one-factor covariance matrix across the universe to compare against the plain sample covariance.

## The universe

To keep the numbers concrete and reproducible, this capstone uses five fictional tickers spread across four sectors — a deliberate mix of a high-beta pair and a couple of defensive, low-beta names, the same way a real cross-sectional study would want some dispersion in risk characteristics to actually see the factor model do something:

| Ticker | Company (fictional) | Sector | Factor beta |
|---|---|---|---|
| QRBT | Quill Robotics | Technology | 1.30 |
| HALC | Halcyon Software | Technology | 1.15 |
| COBM | Cobalt Minerals | Materials | 0.90 |
| PRAI | Prairie Foods | Consumer Staples | 0.45 |
| VANU | Vantage Utilities | Utilities | 0.35 |

## How the universe is simulated

Every asset's daily log return is built from two pieces: a shared **common factor** (think of it as a market-wide return series) and an **asset-specific idiosyncratic shock**, exactly the structure a one-factor model assumes:

```
r_i,t = beta_i * f_t + eps_i,t
```

Both the common factor `f_t` and each idiosyncratic shock `eps_i,t` are generated from their own GARCH(1,1) process, so the simulated universe has realistic volatility clustering built in from the start — not just correlated levels of risk, but risk that clusters in time the way Chapter 4 described.

```python
import numpy as np
import pandas as pd

np.random.seed(2024)

ASSETS = [
    # ticker, sector,          beta,  idio long-run daily vol, idio alpha, idio beta (GARCH)
    ("QRBT", "Technology",       1.30, 0.018, 0.08, 0.88),
    ("HALC", "Technology",       1.15, 0.016, 0.07, 0.89),
    ("COBM", "Materials",        0.90, 0.014, 0.06, 0.90),
    ("PRAI", "Consumer Staples", 0.45, 0.009, 0.05, 0.90),
    ("VANU", "Utilities",        0.35, 0.008, 0.05, 0.90),
]
N = 1000  # trading days, roughly 4 years
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

# Common factor: GARCH(1,1), long-run daily vol 1.10%, alpha=0.08, beta=0.88 (persistence 0.96)
factor_returns, factor_sigma = simulate_garch11(N, long_run_vol=0.011, alpha=0.08, beta=0.88, seed=100)

returns = {}
for i, (ticker, sector, beta_mkt, idio_vol, idio_alpha, idio_beta) in enumerate(ASSETS):
    idio_eps, idio_sigma = simulate_garch11(N, long_run_vol=idio_vol, alpha=idio_alpha, beta=idio_beta, seed=200 + i)
    returns[ticker] = beta_mkt * factor_returns + idio_eps

returns_df = pd.DataFrame(returns, index=dates)
print(returns_df.std().mul(np.sqrt(252)).round(4))      # realized annualized vol
print(returns_df.corr().round(3))                        # realized correlation matrix
```

Running this produces a realized annualized volatility and correlation structure consistent with the betas above:

```
Realized annualized volatility:
QRBT    0.3837
HALC    0.3247
COBM    0.2702
PRAI    0.1606
VANU    0.1361

Realized correlation matrix:
       QRBT   HALC   COBM   PRAI   VANU
QRBT  1.000  0.344  0.283  0.277  0.267
HALC  0.344  1.000  0.323  0.292  0.260
COBM  0.283  0.323  1.000  0.228  0.207
PRAI  0.277  0.292  0.228  1.000  0.184
VANU  0.267  0.260  0.207  0.184  1.000
```

The pattern is exactly what a one-factor model predicts: the two tech names, which share the highest betas (1.30 and 1.15), have the highest pairwise correlation in the whole matrix (0.344); the two defensive names, with the lowest betas (0.45 and 0.35), have the lowest (0.184). Realized annualized volatility ranges from 13.6% (Vantage Utilities) to 38.4% (Quill Robotics) — a realistic spread between a defensive utility and a volatile small-cap tech name. Because the random seed is fixed throughout (`np.random.seed(2024)` plus the specific per-asset seeds), re-running this exact code block reproduces these exact numbers, which is what lets Lesson 34 build directly on top of them.

## What Lesson 34 will actually compute

1. An **ARMA model** fit to each asset's log returns, with the order chosen by AIC, plus a Ljung-Box test on the residuals to check that no autocorrelation is left unexplained.
2. A **GARCH(1,1) model** fit to each asset's returns, reporting the fitted alpha, beta, and persistence (alpha + beta).
3. A **one-factor covariance matrix**, estimated by regressing each asset's returns on the common factor, compared directly against the plain sample covariance matrix computed straight from the data.
4. A **combined summary table** — one row per asset, with its ARMA order, GARCH persistence, estimated factor beta, and annualized volatility side by side.

## Scope: what this capstone does and doesn't do

Everything above uses only tools from this course: log returns (Chapter 1), ARMA (Chapter 3), GARCH (Chapter 4), and a factor-model covariance estimate (Chapter 5). Chapter 6's regime-switching lens is worth keeping in mind conceptually — a sustained shift in the common factor's volatility level, if it happened, is exactly the kind of structural break a regime-switching model is built to flag — but this capstone doesn't fit one; it stays within the ARMA/GARCH/factor toolkit built across Chapters 1 through 7. This capstone deliberately does **not** build a trading strategy, backtest a signal, or apply any machine-learning model — those belong to other courses in this catalog. The goal here is narrower and more fundamental: can you take a universe of assets, model each one's return dynamics and volatility correctly, and produce a sensible covariance estimate for the group?

## Key terms

| Term | Meaning |
|---|---|
| One-factor return model | `r_i,t = beta_i * f_t + eps_i,t`; a common factor plus an asset-specific idiosyncratic shock |
| Factor beta | How sensitive an asset's return is to the common factor |
| Idiosyncratic shock | The asset-specific portion of a return, left over after removing the factor's contribution |
| Realized correlation | The correlation actually observed in a simulated or historical sample, as opposed to a population target |

## Recap

The universe is set — five fictional assets across four sectors, simulated from a shared GARCH-driven factor plus asset-specific GARCH-driven idiosyncratic shocks, with realized annualized volatility from 13.6% to 38.4% and correlations that track each asset's beta exactly as a one-factor model predicts. Next, Lesson 34: Capstone — Build It, where ARMA and GARCH actually get fit to each of these five return series and the factor-model covariance gets estimated and compared to the sample covariance.
