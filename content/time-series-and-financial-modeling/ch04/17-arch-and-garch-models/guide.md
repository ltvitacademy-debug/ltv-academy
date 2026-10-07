# ARCH & GARCH Models

Lesson 16 showed how to measure volatility after the fact. ARCH and GARCH models do something more ambitious: they treat volatility as a quantity with its own dynamics — one that depends on the recent past and can therefore be forecast forward. This lesson covers both models and how to fit them with the `arch` package.

## What you'll learn

- Why ordinary ARMA residuals aren't constant-variance, motivating conditional heteroskedasticity
- The ARCH(q) model: conditional variance as a function of past squared shocks
- The GARCH(1,1) model: adding a persistence term, and the stationarity condition alpha + beta < 1
- How to fit a GARCH(1,1) model with Python's `arch` package

## Conditional heteroskedasticity

An ordinary ARMA model (Lesson 11) assumes constant variance in its error term. Real financial returns violate this: their variance clearly changes over time (that's volatility clustering again). "Conditional heteroskedasticity" just means the variance, conditional on the past, is not constant — and ARCH stands for **Autoregressive Conditional Heteroskedasticity**, the model family built specifically to capture it.

## ARCH(q)

An ARCH(q) model specifies the conditional variance of the error term `eps_t` as a function of its own past squared values:

sigma_t^2 = omega + alpha_1*eps_(t-1)^2 + alpha_2*eps_(t-2)^2 + ... + alpha_q*eps_(t-q)^2

where `omega > 0` and `alpha_i >= 0` for all i (so variance can never go negative). A large shock yesterday (`eps_(t-1)^2` large) directly raises today's expected variance. ARCH captures volatility clustering, but in practice often needs a large q to fit real data well — which is the main motivation for GARCH.

## GARCH(1,1): adding memory of past variance

**GARCH** (Generalized ARCH) adds lagged values of the conditional variance itself to the equation, letting one or two lags do the work that ARCH might need a dozen lags for. GARCH(1,1), by far the most widely used specification in practice, is:

sigma_t^2 = omega + alpha*eps_(t-1)^2 + beta*sigma_(t-1)^2

- `omega > 0`, `alpha >= 0`, `beta >= 0`
- **alpha + beta < 1** is required for the process to be (covariance) stationary with a well-defined long-run average variance
- `alpha` measures how strongly a fresh shock moves volatility; `beta` measures how persistent volatility is, i.e. how much of yesterday's variance carries into today

A high `beta` (common in real equity data, often 0.85-0.95) means volatility shocks decay slowly — a turbulent week can leave the market jumpy for a long stretch afterward.

## Fitting GARCH(1,1) with the arch package

```python
from arch import arch_model

# returns: percentage returns work best numerically (e.g., returns * 100)
am = arch_model(returns, vol="Garch", p=1, q=1, mean="constant", dist="normal")
res = am.fit(disp="off")
print(res.summary())
print(res.params)   # omega, alpha[1], beta[1]

# forecast conditional variance forward
fcast = res.forecast(horizon=10)
print(fcast.variance.tail())
```

In `arch_model`, `p` is the number of lagged conditional-variance terms (the GARCH part) and `q` is the number of lagged squared-residual terms (the ARCH part) — note this is the opposite convention from ARIMA's (p,d,q), which is a common source of confusion worth remembering explicitly.

## Key terms

| Term | Meaning |
|---|---|
| Conditional heteroskedasticity | Variance that changes over time, conditional on past information |
| ARCH(q) | Conditional variance as a function of q lagged squared shocks |
| GARCH(1,1) | Adds a lagged conditional-variance term; the standard volatility model in practice |
| alpha (ARCH term) | How strongly a fresh shock moves conditional variance |
| beta (GARCH term) | Persistence — how much of yesterday's variance carries into today |
| Stationarity condition | alpha + beta < 1 for GARCH(1,1) |

## Recap

ARCH models conditional variance from past squared shocks; GARCH adds a memory term for past variance itself, usually fitting real data far better with just one lag of each. Next, Lesson 18 covers GARCH extensions — EGARCH and GJR-GARCH — that fix GARCH's blind spot around the direction of a shock.
