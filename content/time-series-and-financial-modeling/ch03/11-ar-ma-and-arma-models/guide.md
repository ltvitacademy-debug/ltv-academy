# AR, MA & ARMA Models

Chapter 2 established whether a series is stationary. Chapter 3 is about modeling a stationary series once you have one. The three building blocks — autoregressive (AR), moving average (MA), and their combination (ARMA) — are the foundation that ARIMA, SARIMA, and even the GARCH family in Chapter 4 all build on. This lesson defines each model precisely, shows how to fit one in Python, and explains the two conditions (stationarity and invertibility) that make the math behave.

## What you'll learn

- The AR(p) model: how today's value depends on its own recent past
- The MA(q) model: how today's value depends on recent shocks, not recent levels
- ARMA(p,q): combining both into a single compact model
- Why stationarity and invertibility matter, and what "roots outside the unit circle" means in practice
- How to fit an ARMA model with `statsmodels`

## The autoregressive model: AR(p)

An AR(p) model says today's value is a weighted sum of the last p values, plus noise:

x_t = c + phi_1*x_(t-1) + phi_2*x_(t-2) + ... + phi_p*x_(t-p) + eps_t

where `eps_t` is white noise (mean zero, constant variance, uncorrelated over time). An AR(1) model, x_t = c + phi_1*x_(t-1) + eps_t, is the simplest case: next period's value is pulled toward a fraction `phi_1` of today's value. If `|phi_1| < 1`, shocks decay over time and the series is stationary. If `phi_1 = 1`, you're back to the random walk from Lesson 8 — a unit root, and not stationary.

AR models are a natural fit for series with momentum or mean reversion: interest rates, inflation, and many macro series show AR-like behavior, where deviations from a long-run level fade out gradually rather than instantly.

## The moving average model: MA(q)

An MA(q) model says today's value depends on recent *shocks*, not recent *levels*:

x_t = mu + eps_t + theta_1*eps_(t-1) + ... + theta_q*eps_(t-q)

Each eps term is an unobserved white-noise innovation. An MA(1) process has a short memory by construction: a shock affects today and exactly q periods afterward, then vanishes completely from the model. That's the key practical difference from AR — AR effects decay gradually and in principle never fully disappear, while MA effects cut off sharply after q lags.

## Combining both: ARMA(p,q)

ARMA(p,q) keeps both pieces in one equation:

x_t = c + phi_1*x_(t-1) + ... + phi_p*x_(t-p) + eps_t + theta_1*eps_(t-1) + ... + theta_q*eps_(t-q)

In practice, a short ARMA(p,q) with small p and q often fits real financial and economic series about as well as a much longer pure-AR or pure-MA model, because it captures both the gradual-decay and sharp-cutoff behaviors with fewer parameters. This is the same parsimony argument you'll see formalized with AIC/BIC in Lesson 13.

## Stationarity and invertibility

Two separate technical conditions keep an ARMA model well-behaved:

- **Stationarity** (a condition on the AR side): the roots of the AR characteristic polynomial must lie outside the unit circle. In plain terms, the AR coefficients can't let shocks blow up or persist forever — this is the same unit-root idea from Lesson 6, now applied to a general AR(p).
- **Invertibility** (a condition on the MA side): the roots of the MA characteristic polynomial must also lie outside the unit circle. This guarantees the MA model can be rewritten as an equivalent (infinite) AR model, which is what lets estimation algorithms recover a unique set of theta coefficients.

You rarely check these roots by hand — `statsmodels` estimation will warn you, or simply fail to converge cleanly, when a fitted model violates them.

## Fitting an ARMA model in Python

```python
import pandas as pd
from statsmodels.tsa.arima.model import ARIMA

# returns: a stationary pandas Series of, e.g., daily log returns
model = ARIMA(returns, order=(1, 0, 1))  # (p, d, q) with d=0 is plain ARMA(1,1)
fit = model.fit()
print(fit.summary())
print(fit.params)        # phi_1, theta_1, sigma^2, const
```

`statsmodels` doesn't expose a separate "ARMA" class anymore — `ARIMA` with `d=0` *is* ARMA, which is a convenient way to remember that ARMA is just ARIMA applied to a series that's already stationary.

## Key terms

| Term | Meaning |
|---|---|
| AR(p) | Today's value as a weighted sum of its own last p values plus noise |
| MA(q) | Today's value as today's shock plus a weighted sum of the last q shocks |
| ARMA(p,q) | An AR(p) and MA(q) combined in one equation |
| White noise eps_t | Uncorrelated innovations with mean zero and constant variance |
| Stationarity condition | AR characteristic roots lie outside the unit circle |
| Invertibility condition | MA characteristic roots lie outside the unit circle |

## Recap

AR models capture gradual, momentum-like dependence on past levels; MA models capture short, sharp dependence on past shocks; ARMA blends both with fewer parameters than either alone usually needs. Next, Lesson 12 extends ARMA to non-stationary and seasonal series with ARIMA and SARIMA.
