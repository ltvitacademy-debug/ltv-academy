# Vector Autoregression

Every model in this chapter so far has analyzed one series at a time. But markets are full of series that move together: stock and bond returns, exchange rates and interest rates, a stock and its sector index. Vector autoregression (VAR) extends the AR idea from Lesson 11 to several series at once, modeling each one as a function of lagged values of *all* the series in the system. This closes out Chapter 3 before Chapter 4 turns to modeling volatility itself.

## What you'll learn

- How VAR generalizes AR(p) to a system of k series
- Granger causality testing: does one series help predict another?
- Impulse response functions: tracing the effect of a shock through the system over time
- How to fit a VAR model with `statsmodels`

## From one series to a system

Recall AR(p) for a single series: x_t depends on its own lags. A VAR(p) model stacks k series into a vector and lets *each* series depend on lagged values of *every* series in the system:

y_t = c + A_1*y_(t-1) + A_2*y_(t-2) + ... + A_p*y_(t-p) + eps_t

Here `y_t` is a vector of k series (say, stock returns and bond returns), each `A_i` is a k-by-k coefficient matrix, and `eps_t` is a vector of (possibly correlated) innovations. Every equation in the system includes lags of every variable — stock returns depend on lagged stock returns *and* lagged bond returns, and vice versa. This is what makes VAR genuinely multivariate rather than just several separate AR models bolted together.

## Fitting a VAR model

```python
import pandas as pd
from statsmodels.tsa.api import VAR

# df: a DataFrame with columns like ['stock_ret', 'bond_ret'], already stationary
model = VAR(df)
lag_order = model.select_order(maxlags=10)   # suggests p via AIC/BIC
fit = model.fit(lag_order.aic)
print(fit.summary())

forecast = fit.forecast(df.values[-fit.k_ar:], steps=5)
```

As with ARIMA, inputs to VAR need to be stationary (Lesson 6) — if the raw series are not, difference them first, or consider a cointegration-aware alternative like a vector error correction model (VECM) when the series share a long-run equilibrium relationship (Lesson 9).

## Granger causality: does one series help predict another?

**Granger causality** is a specific, testable claim: series A "Granger-causes" series B if past values of A help predict B *beyond* what B's own past already predicts. It is explicitly not causality in the physical or economic sense — it's a statistical statement about predictive content, and the name is a known source of confusion. In a fitted VAR, you test this directly:

```python
from statsmodels.tsa.stattools import grangercausalitytests

grangercausalitytests(df[['bond_ret', 'stock_ret']], maxlag=5)
# tests whether stock_ret's lags help predict bond_ret
```

## Impulse response functions

An **impulse response function (IRF)** traces how a one-time shock to one variable propagates through the whole system over subsequent periods, holding everything else fixed at the shock's moment. IRFs are the standard way to answer "if bond yields jump today, what happens to stock returns over the next 10 days?" — a question a single-equation AR model can't even ask, because it only has one series to begin with.

```python
irf = fit.irf(periods=10)
irf.plot(orth=False)
```

## Key terms

| Term | Meaning |
|---|---|
| VAR(p) | A system where each of k series depends on p lags of every series, including itself |
| Granger causality | A statistical test for whether one series' past values improve another's forecast |
| Impulse response function (IRF) | Traces how a shock to one variable propagates through the system over time |
| VECM | A VAR variant for cointegrated series sharing a long-run equilibrium |

## Recap

VAR extends the single-series AR idea to a full system of related series, letting each equation see lags of every variable, and unlocks Granger causality tests and impulse response functions that single-equation models can't offer. That closes Chapter 3's linear models. Chapter 4 turns from modeling the level of a series to modeling its volatility, starting with realized and historical volatility.
