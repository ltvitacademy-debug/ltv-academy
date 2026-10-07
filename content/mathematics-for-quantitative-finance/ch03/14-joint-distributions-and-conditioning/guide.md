# Joint Distributions & Conditioning

Real portfolios hold more than one asset, and their returns move together, not independently. To reason about a portfolio you need the **joint distribution** of several random variables at once, plus the machinery to ask "what do I know about X once I've observed Y?" That machinery — marginals, conditionals, covariance, and the laws of total expectation and total variance — is the subject of this lesson.

## What you'll learn

- Joint, marginal, and conditional distributions, and how they relate to one another
- Independence as a strict condition on the joint distribution, not just "uncorrelated"
- Covariance and correlation as measures of linear co-movement
- The law of total expectation and the law of total variance, and why both matter for conditioning on a market regime
- How to compute all of these on simulated two-asset return data

## Joint, marginal, and conditional distributions

For two discrete random variables X and Y, the **joint PMF** is p(x, y) = P(X = x, Y = y). For continuous variables, the **joint PDF** f(x, y) satisfies P(X ∈ A, Y ∈ B) = ∫∫_{A×B} f(x, y) dx dy. The **marginal distribution** of X alone is recovered by summing or integrating Y out: p(x) = Σ_y p(x, y), or f(x) = ∫ f(x, y) dy. This is how you "forget" one variable to get the distribution of the other on its own.

The **conditional distribution** of X given Y = y asks: once we know Y = y, how is X distributed?

f(x | y) = f(x, y) / f(y), provided f(y) > 0

This is the continuous analog of conditional probability, P(A | B) = P(A ∩ B) / P(B).

## Independence

X and Y are **independent** if and only if their joint density factors completely: f(x, y) = f(x) · f(y) for *every* pair (x, y). Independence is strictly stronger than "zero correlation" — two variables can have zero covariance yet still be dependent (for example, Y = X² when X is symmetric about 0 has zero covariance with X, but Y is completely determined by X). In finance, treating correlated assets as independent dramatically understates portfolio risk, which is exactly why covariance has to be modeled explicitly.

## Covariance and correlation

**Covariance** measures linear co-movement:

Cov(X, Y) = E[(X − μₓ)(Y − μᵥ)] = E[XY] − E[X]E[Y]

**Correlation** rescales covariance to live in [−1, 1]:

ρ(X, Y) = Cov(X, Y) / (σₓ σᵥ)

These feed directly into portfolio variance. For a two-asset portfolio with weights w₁, w₂:

Var(w₁X + w₂Y) = w₁²Var(X) + w₂²Var(Y) + 2w₁w₂·Cov(X, Y)

This is why diversification works: if Cov(X, Y) < 0 (or even just small and positive), the portfolio's variance can be lower than either asset's variance alone.

## The laws of total expectation and total variance

Conditioning on another random variable (say, a market regime indicator R ∈ {bull, bear}) lets you decompose both the mean and the variance of X:

**Law of total expectation**: E[X] = E[ E[X | R] ]
— average the conditional means over the distribution of R.

**Law of total variance**: Var(X) = E[ Var(X | R) ] + Var( E[X | R] )
— total variance splits into the *average within-regime variance* plus the *variance of the regime means themselves*. This decomposition is exactly why a strategy's returns can look deceptively calm within each regime while the overall unconditional variance is large: regime-switching mean and regime-switching variance both add to total risk.

## A worked example in code

```python
import numpy as np

rng = np.random.default_rng(23)
n = 100_000

# Two correlated asset returns via a bivariate normal
mean = [0.0006, 0.0004]
cov = [[0.0144, 0.0072], [0.0072, 0.0081]]   # implies corr = 0.0072/(0.12*0.09) = 0.667
X, Y = rng.multivariate_normal(mean, cov, n).T

cov_hat = np.cov(X, Y)[0, 1]
corr_hat = np.corrcoef(X, Y)[0, 1]
print(f"Cov(X,Y) hat={cov_hat:.5f}  Corr(X,Y) hat={corr_hat:.3f}")

# Condition on a regime: Y above or below its median
regime = (Y > np.median(Y)).astype(int)
cond_means = [X[regime == r].mean() for r in (0, 1)]
cond_vars = [X[regime == r].var() for r in (0, 1)]
total_var_check = np.mean(cond_vars) + np.var(cond_means)
print("Conditional means:", np.round(cond_means, 5))
print(f"Law of total variance: {total_var_check:.6f} vs actual Var(X)={X.var():.6f}")
```

The two sides of the total-variance identity line up (up to sampling noise), confirming the decomposition directly rather than taking it on faith.

## Key terms

| Term | Meaning |
|---|---|
| Joint distribution | p(x, y) or f(x, y); describes two (or more) random variables together |
| Marginal distribution | The distribution of one variable, with the others summed/integrated out |
| Conditional distribution | f(x \| y) = f(x, y) / f(y); X's distribution once Y is known |
| Independence | f(x, y) = f(x)f(y) for all x, y — strictly stronger than zero covariance |
| Covariance, Cov(X,Y) | E[XY] − E[X]E[Y]; measures linear co-movement |
| Correlation, ρ(X,Y) | Cov(X,Y) / (σₓσᵥ); covariance rescaled to [−1, 1] |
| Law of total expectation | E[X] = E[E[X \| Y]] |
| Law of total variance | Var(X) = E[Var(X \| Y)] + Var(E[X \| Y]) |

## Recap

Joint distributions let you describe several random variables at once, conditioning lets you update a distribution once you know something about another variable, and covariance is the single number portfolio math runs on. Next up, Lesson 15: the Law of Large Numbers and the Central Limit Theorem — what happens to sums and averages as the number of observations grows.
