# Cointegration & Pairs

Lesson 8 showed that financial prices behave like random walks — non-stationary, with no mean to revert to individually. This lesson covers a genuinely powerful idea that gets built on top of that fact: even though two price series are each individually non-stationary, a particular *linear combination* of them can be stationary. When that happens, the two series are **cointegrated**, and that stationary combination is tradeable — it's the statistical foundation of pairs trading.

## What you'll learn

- The precise definition of cointegration, and how it differs from ordinary correlation
- The Engle-Granger two-step method for testing and estimating a cointegrating relationship
- The `statsmodels.tsa.stattools.coint` test and how to interpret its output
- Why correlation and cointegration are not the same thing, and why that distinction matters for pairs trading
- A worked pairs-trading sketch: spread construction and z-score signals

## Cointegration, precisely

Two non-stationary series `X_t` and `Y_t`, each integrated of order 1 (`I(1)`, per Lesson 8 — meaning each needs one difference to become stationary), are **cointegrated** if there exists a constant `β` such that the linear combination:

```
spread_t = Y_t - β*X_t
```

is itself stationary (`I(0)`). Intuitively: `X_t` and `Y_t` can each wander arbitrarily far from where they started (like any random walk), but they wander *together* — the gap between them (scaled by `β`) keeps reverting to a stable mean rather than drifting apart indefinitely. This is a much stronger, more specific condition than correlation.

## Correlation is not cointegration

This is the single most common conceptual mistake in this area. Two series can be highly correlated in their *returns* (they tend to move up and down together day to day) without being cointegrated in their *levels* (the gap between their price levels can still drift arbitrarily far apart over time, with no tendency to revert). Conversely, two series can show fairly low return correlation day-to-day while still being cointegrated — their short-term moves are noisy, but the long-run relationship between their levels is stable. Pairs trading needs cointegration, not correlation: you're betting on the *spread* reverting, which requires the stationary-combination property, not just co-movement.

## The Engle-Granger two-step method

1. **Step 1 — estimate the relationship.** Regress `Y_t` on `X_t` (ordinary least squares): `Y_t = α + β*X_t + u_t`. The estimated `β` is the **hedge ratio**.
2. **Step 2 — test the residuals for stationarity.** Take the residuals `û_t = Y_t - α - β*X_t` (this is the spread) and run an ADF test (Lesson 6) on them. If the residuals reject the unit-root null, `X_t` and `Y_t` are cointegrated with cointegrating vector `(1, -β)`.

```python
import numpy as np
import statsmodels.api as sm
from statsmodels.tsa.stattools import coint, adfuller

X = sm.add_constant(x_prices)
model = sm.OLS(y_prices, X).fit()
beta = model.params[1]
spread = y_prices - beta * x_prices

adf_p = adfuller(spread)[1]   # low p-value => spread is stationary => cointegrated
```

## The direct test: `statsmodels.tsa.stattools.coint`

statsmodels provides the Engle-Granger test directly, which handles the regression and the adjusted critical values for you (critical values for testing residuals differ from a standalone ADF test, because the residuals come from an estimated regression):

```python
from statsmodels.tsa.stattools import coint

score, p_value, crit_values = coint(y_prices, x_prices)
if p_value < 0.05:
    print("Reject H0 of no cointegration -> evidence of cointegration")
```

Like the ADF test, `coint`'s null hypothesis is the "no relationship" case — here, **H0: no cointegration**. A low p-value is again the result you want if you're hoping for a tradeable cointegrating relationship.

## From cointegration to a pairs trade

Once a stationary spread is confirmed, the classic pairs-trading signal standardizes it into a z-score and trades mean reversion:

```python
spread_mean = spread.rolling(60).mean()
spread_std = spread.rolling(60).std()
zscore = (spread - spread_mean) / spread_std

# classic signal: short the spread when it's too high, long when too low
long_signal = zscore < -2
short_signal = zscore > 2
exit_signal = zscore.abs() < 0.5
```

This only works because the spread is stationary — a non-stationary spread has no stable mean to revert to, and the whole strategy depends on that mean existing.

## Key terms

| Term | Meaning |
|---|---|
| Cointegration | Two (or more) I(1) series have a linear combination that is stationary, I(0) |
| Hedge ratio (β) | The coefficient relating the two series in the cointegrating regression |
| Spread | The stationary linear combination, `Y_t - β*X_t`, that is actually traded |
| Engle-Granger method | Two-step approach: OLS regression, then ADF test on the residuals |
| `coint()` | statsmodels function implementing the Engle-Granger cointegration test; H0 = no cointegration |

## Recap

Cointegration is a stronger, more specific property than correlation: it means a particular linear combination of two non-stationary series is itself stationary, giving the pair a stable spread to trade. The Engle-Granger method finds that combination by regression and then ADF-tests the residuals, and statsmodels' `coint` wraps the whole procedure with correctly adjusted critical values. Next, Lesson 10 closes the chapter by pulling stationarity, ACF/PACF, and cointegration testing together into a single diagnostic workflow, plus a look at the pitfalls each test has on its own.
