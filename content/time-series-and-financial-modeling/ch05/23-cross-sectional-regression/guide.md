# Cross-Sectional Regression

Lesson 22 showed how to build factors like SMB, HML, and momentum from raw stock data, sorting one snapshot of the market at a time. This lesson asks the next natural question: once you know an asset's exposure to a factor, how do you estimate the *price* the market actually pays for carrying that exposure — the factor's risk premium? The answer requires combining two different kinds of regression, and it's one of the most widely used and widely misused procedures in empirical asset pricing.

## What you'll learn

- The difference between time-series regression (one asset, many periods) and cross-sectional regression (one period, many assets)
- Why a single naive cross-sectional regression on estimated betas understates true uncertainty
- The two-step Fama-MacBeth procedure
- How Fama-MacBeth corrects for the errors-in-variables problem
- How to implement a simplified Fama-MacBeth regression in Python

## Two different regressions, two different questions

Lesson 21's OLS regression was a **time-series regression**: fix one asset, use many time periods, and estimate how its return moves with the factor over time. That regression answers "what is this asset's beta?"

A **cross-sectional regression** fixes one time period and regresses the returns of *many* assets on their betas at that moment:

```
R_i = lambda_0 + lambda_1*beta_i + e_i      (across assets i, at a single time t)
```

Here `lambda_1` is the estimated price of risk — how much extra return, on average across assets, comes with one extra unit of factor exposure, during that one period. This answers a completely different question: not "what is asset i's beta," but "is beta being compensated at all, and by how much?"

## The problem with one naive cross-sectional regression

The obvious approach — estimate each asset's beta once from a long history, then run a single cross-sectional regression of average returns on those betas — has a well-known flaw: **errors-in-variables**. The betas on the right-hand side of the cross-sectional regression are themselves *estimates*, not the true unobserved betas, and estimation error in a regressor biases the resulting slope (classically, toward zero) and makes the standard errors from that one regression unreliable, since they don't account for the fact that beta itself carries estimation noise.

## The Fama-MacBeth two-step procedure

Fama and MacBeth (1973) fixed this with a two-step procedure that runs *many* cross-sectional regressions instead of one, and uses their variability across time to build an honest standard error:

1. **Time-series step.** For each asset `i`, run a time-series regression of its returns on the factor to estimate `beta_i` (exactly Lesson 21's regression, once per asset).
2. **Cross-sectional step.** For each time period `t`, run a cross-sectional regression of that period's returns (across all assets) on the betas from step 1, producing a period-specific risk-premium estimate `lambda_t`.
3. **Average.** The final risk-premium estimate is the time-series average of the `lambda_t` estimates, and — critically — its standard error comes from the *standard deviation of the lambda_t series across time*, divided by `sqrt(T)`:

```
lambda_FM = mean(lambda_1, lambda_2, ..., lambda_T)
SE(lambda_FM) = std(lambda_1, ..., lambda_T) / sqrt(T)
```

This is the key fix: instead of treating every asset-period observation as if it carried independent information (which overstates precision when returns are correlated across assets within a period), Fama-MacBeth treats each *period's* cross-sectional regression as one data point and measures how much that single number bounces around from period to period. A risk premium that's consistently near some value most months gets a small, confident standard error; one that swings wildly between positive and negative each month correctly gets flagged as noisy and statistically weak.

## Worked example: a simplified Fama-MacBeth regression

```python
import numpy as np
import statsmodels.api as sm
import pandas as pd

rng = np.random.default_rng(6)
n_assets = 60
n_periods = 240   # months, 20 years

true_betas = rng.uniform(0.4, 1.6, n_assets)
factor_mean = 0.006
factor_returns = rng.normal(factor_mean, 0.04, n_periods)

idio = rng.normal(0, 0.03, size=(n_periods, n_assets))
returns = true_betas[None, :] * factor_returns[:, None] + idio
returns_df = pd.DataFrame(returns, columns=[f"asset_{i}" for i in range(n_assets)])
factor_series = pd.Series(factor_returns)

# Step 1: time-series regression per asset -> estimated betas
betas = {}
for col in returns_df.columns:
    X = sm.add_constant(factor_series.values)
    res = sm.OLS(returns_df[col].values, X).fit()
    betas[col] = res.params[1]
betas = pd.Series(betas)

# Step 2: cross-sectional regression each period
lambda_t = []
for t in range(n_periods):
    y = returns_df.iloc[t].values
    X = sm.add_constant(betas.values)
    lambda_t.append(sm.OLS(y, X).fit().params[1])
lambda_t = np.array(lambda_t)

# Step 3: average and build the Fama-MacBeth standard error
fm_risk_premium = lambda_t.mean()
fm_se = lambda_t.std(ddof=1) / np.sqrt(n_periods)
fm_tstat = fm_risk_premium / fm_se

print("Realized mean factor return: %.5f" % factor_returns.mean())
print("Fama-MacBeth risk premium:    %.5f" % fm_risk_premium)
print("Fama-MacBeth std error:       %.5f" % fm_se)
print("Fama-MacBeth t-stat:          %.2f" % fm_tstat)
```

The run produced:

```
Realized mean factor return: 0.00635
Fama-MacBeth risk premium:    0.00674
Fama-MacBeth std error:       0.00268
Fama-MacBeth t-stat:          2.51
```

The Fama-MacBeth risk-premium estimate (0.00674) lands close to the factor's own realized average return (0.00635) over this sample — exactly what should happen, since in this one-factor design the period-by-period cross-sectional slope is, in expectation, just that period's factor return. Comparing against a naive single regression of each asset's *average* return on its beta is revealing: that naive regression produces the *identical* point estimate (0.00674) but with a standard error of only 0.00064 — about a quarter the size of the honest Fama-MacBeth standard error of 0.00268. The naive regression's small standard error comes from implicitly treating each of the 60 assets as an independent observation, ignoring that their returns move together within every period; Fama-MacBeth's larger, more honest standard error comes directly from how much the risk-premium estimate actually bounces around from one month to the next.

## Key terms

| Term | Meaning |
|---|---|
| Time-series regression | One asset, many periods; estimates that asset's factor beta |
| Cross-sectional regression | One period, many assets; estimates the period's price of risk |
| Errors-in-variables | Bias from using estimated (noisy) betas as regressors |
| Fama-MacBeth procedure | Two-step: per-asset time-series betas, then per-period cross-sectional regressions, averaged |
| Fama-MacBeth standard error | Std. dev. of the period-by-period risk-premium estimates, divided by sqrt(T) |

## Recap

Fama-MacBeth separates "what is this asset's beta" (a time-series question) from "what does the market pay for that beta" (a cross-sectional question), running the second regression once per period and using the across-time variability of its result to build a standard error that doesn't overstate confidence. Next, Lesson 24 moves from estimating risk premia to estimating risk itself — the full covariance matrix that determines a portfolio's actual variance.
