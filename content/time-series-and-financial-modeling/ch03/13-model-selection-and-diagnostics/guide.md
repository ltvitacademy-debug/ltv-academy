# Model Selection & Diagnostics

Lessons 11 and 12 gave you the AR, MA, ARMA, ARIMA, and SARIMA model families. This lesson is about choosing specific orders (p, d, q, and their seasonal counterparts) for a real series, and then verifying the fitted model actually did its job. The classical workflow for this is the Box-Jenkins methodology: identify, estimate, diagnose.

## What you'll learn

- The Box-Jenkins methodology: identify, estimate, diagnose
- Reading ACF and PACF plots to suggest starting values for p and q
- Comparing candidate models with AIC and BIC
- Using the Ljung-Box test to check whether residuals are white noise

## Step 1: Identify, using ACF and PACF

Lesson 7 introduced the autocorrelation function (ACF) and partial autocorrelation function (PACF). They give rough signatures for simple model types:

- A pure AR(p) process has a PACF that cuts off sharply after lag p, while its ACF decays gradually.
- A pure MA(q) process has an ACF that cuts off sharply after lag q, while its PACF decays gradually.
- A mixed ARMA(p,q) process typically has both ACF and PACF decaying gradually, with no clean cutoff in either — a sign to try small p and q together rather than searching for a cutoff that isn't there.

These plots suggest *starting* candidates, not a final answer — in practice you fit several nearby candidates and let information criteria and diagnostics decide.

## Step 2: Estimate, then compare with AIC and BIC

Both the Akaike Information Criterion (AIC) and Bayesian Information Criterion (BIC) balance fit against complexity, penalizing a model for every extra parameter it uses:

- **AIC** penalizes complexity moderately. It tends to favor slightly larger models and is often preferred when the goal is forecasting accuracy.
- **BIC** penalizes complexity more heavily (the penalty grows with the log of the sample size), and tends to favor smaller, more parsimonious models. BIC is often preferred when the goal is to identify the "true" underlying model.

Lower is better for both. A common workflow fits a small grid of (p, q) combinations and picks the one that minimizes AIC or BIC:

```python
import itertools
from statsmodels.tsa.arima.model import ARIMA

best_bic, best_order = float("inf"), None
for p, q in itertools.product(range(4), range(4)):
    try:
        fit = ARIMA(returns, order=(p, 0, q)).fit()
        if fit.bic < best_bic:
            best_bic, best_order = fit.bic, (p, 0, q)
    except Exception:
        continue

print(best_order, best_bic)
```

## Step 3: Diagnose, using residual checks

A correctly specified model should leave residuals that look like white noise — no remaining autocorrelation, no obvious pattern. Three standard checks:

1. **Residual ACF plot** — should show no significant spikes at any lag.
2. **Ljung-Box test** — a formal hypothesis test for leftover autocorrelation in the residuals up to a chosen lag. The null hypothesis is "no autocorrelation"; a small p-value (conventionally < 0.05) means the residuals are *not* white noise, and the model needs more AR/MA terms.
3. **Visual inspection** — residuals plotted over time should show no visible trend, cycle, or change in spread.

```python
from statsmodels.stats.diagnostic import acorr_ljungbox

lb = acorr_ljungbox(fit.resid, lags=[10, 20], return_df=True)
print(lb)   # look at the lb_pvalue column
```

If the Ljung-Box test rejects the white-noise null, go back to Step 1 — the chosen (p, d, q) is under-specified.

## Key terms

| Term | Meaning |
|---|---|
| Box-Jenkins methodology | Identify → estimate → diagnose workflow for ARIMA model building |
| AIC | Information criterion; moderate complexity penalty, favors forecasting accuracy |
| BIC | Information criterion; heavier complexity penalty, favors simpler "true" models |
| Ljung-Box test | Hypothesis test for leftover autocorrelation in model residuals |
| White noise residuals | Residuals with no remaining autocorrelation — the sign of a well-specified model |

## Recap

Use ACF/PACF shapes to suggest starting orders, compare nearby candidates with AIC/BIC, and never trust a fitted model until its residuals pass a Ljung-Box check for leftover autocorrelation. Next, Lesson 14 turns a diagnosed model into forecasts and shows how to actually evaluate forecast quality out of sample.
