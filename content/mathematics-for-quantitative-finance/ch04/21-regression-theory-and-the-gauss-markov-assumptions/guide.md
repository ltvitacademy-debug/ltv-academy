# Regression Theory & the Gauss-Markov Assumptions

The single most-used tool in empirical finance is linear regression — estimating a stock's market beta, decomposing returns into factor exposures, testing whether a manager generates genuine alpha. This lesson derives Ordinary Least Squares (OLS) from first principles and states exactly when it's the *best* possible linear estimator — the Gauss-Markov theorem — so you know not just how to run a regression, but when to trust it.

## What you'll learn

- The linear regression model and the Ordinary Least Squares (OLS) estimator, derived from minimizing squared residuals
- The five Gauss-Markov assumptions, stated precisely
- The Gauss-Markov theorem: OLS is BLUE (Best Linear Unbiased Estimator) when those assumptions hold
- What breaks, and what doesn't, when each assumption fails
- A worked CAPM-style regression of an asset's returns on the market, in statsmodels

## The linear model and OLS

The model is y = Xβ + ε, where y is an n×1 vector of outcomes, X is an n×k matrix of regressors (including a constant column for the intercept), β is the k×1 vector of unknown coefficients, and ε is an n×1 vector of unobserved errors. **OLS** chooses β̂ to minimize the sum of squared residuals, Σᵢ(yᵢ − xᵢ'β)², which — using the matrix calculus you saw in Chapter 2 — gives the closed-form solution (the normal equations):

β̂ = (X'X)⁻¹ X'y

This requires X'X to be invertible, which is exactly the "no perfect collinearity" assumption below.

## The five Gauss-Markov assumptions

1. **Linearity in parameters**: the true model really is y = Xβ + ε (linear in β, though X can include nonlinear transforms of underlying variables).
2. **Strict exogeneity**: E[ε | X] = 0 — the errors have zero mean and are uncorrelated with every regressor, at every observation. This is usually the hardest assumption to justify in practice, since any omitted variable correlated with both X and y violates it.
3. **No perfect multicollinearity**: X has full column rank — no regressor is an exact linear combination of the others, so X'X is invertible and β̂ is unique.
4. **Homoscedasticity**: Var(εᵢ | X) = σ² for every i — the error variance is constant across observations, not larger for some X values than others.
5. **No autocorrelation**: Cov(εᵢ, εⱼ | X) = 0 for i ≠ j — errors at different observations are uncorrelated with each other.

## The Gauss-Markov theorem

Under assumptions 1–5, the Gauss-Markov theorem states that OLS is **BLUE**: the **Best Linear Unbiased Estimator**. Unpacking each word: it's **linear** in y, it's **unbiased** (E[β̂] = β), and among *all* linear unbiased estimators, it has the **smallest variance**. This is a genuinely strong guarantee — but it is conditional on all five assumptions holding. OLS remains unbiased under violations of homoscedasticity (4) or no-autocorrelation (5) alone, but it stops being BLUE: some other linear unbiased estimator does better, and critically, the *standard errors* OLS reports become wrong, leading to unreliable hypothesis tests (Lesson 20) unless you switch to heteroscedasticity-robust (White) or autocorrelation-robust (HAC/Newey-West) standard errors. A violation of exogeneity (2) is more serious: it biases β̂ itself, not just its reported uncertainty.

## CAPM as a regression

The Capital Asset Pricing Model gives regression its most famous financial application. Regress an asset's excess return on the market's excess return:

Rᵢ − Rf = α + β(Rₘ − Rf) + ε

Here **β** measures the asset's systematic (market) risk — how much it amplifies or dampens market moves — and **α** measures the average return *left over* after accounting for that market exposure: genuine outperformance, if statistically significant (tying directly back to the hypothesis testing machinery of Lesson 20). A fund manager's pitch of "we beat the market" is, formally, a claim that α̂ is positive and significantly different from zero.

## A worked example in code

```python
import numpy as np
import statsmodels.api as sm

rng = np.random.default_rng(79)
n = 500

market_excess = rng.normal(0.0004, 0.01, n)
true_alpha, true_beta = 0.0001, 1.2
asset_excess = true_alpha + true_beta * market_excess + rng.normal(0, 0.006, n)

X = sm.add_constant(market_excess)     # adds the intercept column
model = sm.OLS(asset_excess, X).fit()

alpha_hat, beta_hat = model.params
print(f"alpha_hat={alpha_hat:.5f} (true {true_alpha}), beta_hat={beta_hat:.3f} (true {true_beta})")
print(model.summary().tables[1])        # coefficients, std errors, t-stats, p-values
```

The fitted β̂ lands close to the true 1.2 (this asset amplifies market moves) and the t-statistic on α̂ tells you — exactly via the Lesson 20 machinery — whether that small intercept is distinguishable from zero or just sampling noise, which is precisely the question "is this manager's alpha real?" boils down to.

## Key terms

| Term | Meaning |
|---|---|
| OLS, β̂ | (X'X)⁻¹X'y; minimizes the sum of squared residuals |
| Exogeneity | E[ε\|X] = 0; errors uncorrelated with regressors |
| Homoscedasticity | Constant error variance across observations |
| No autocorrelation | Errors at different observations are uncorrelated |
| BLUE | Best Linear Unbiased Estimator (Gauss-Markov theorem) |
| CAPM alpha / beta | Intercept (abnormal return) / slope (systematic risk) from regressing excess returns on the market |

## Recap

OLS is the closed-form minimizer of squared residuals, and under the five Gauss-Markov assumptions it's provably the best linear unbiased estimator available — with CAPM's alpha and beta as the financial application you'll run constantly. Next up, Lesson 22: Multiple Testing & False Discovery, what happens to your p-values when you test dozens or thousands of strategies at once.
