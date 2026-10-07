# Risk Models & Covariance Estimation

Lesson 23 showed how to estimate the *price* the market pays for a factor exposure. This lesson switches from pricing to risk: given a portfolio of many assets, how much variance does it actually have? The honest answer requires the full covariance matrix of every asset with every other asset — and estimating that matrix well turns out to be a genuinely hard statistical problem once the number of assets grows, which is exactly where the factor-model machinery from this chapter earns its keep.

## What you'll learn

- Why portfolio variance depends on the full covariance matrix, not just individual asset variances
- The curse of dimensionality in sample covariance estimation
- Why a sample covariance matrix becomes singular or near-singular when assets outnumber observations
- Factor-model-based covariance estimation as the practical fix
- How to compare sample vs. factor-model covariance matrices using condition numbers and eigenvalues

## Portfolio variance needs the whole matrix

For a portfolio with weights `w` (a vector) and asset covariance matrix `Sigma`, portfolio variance is:

```
Var(portfolio) = w' * Sigma * w
```

Expanded out, this is a sum over every pair of assets `i, j`: `sum_i sum_j w_i * w_j * Sigma_ij`. The diagonal terms (`Sigma_ii`, each asset's own variance) matter, but so does every off-diagonal covariance term — two highly correlated assets held together don't diversify each other away, no matter how small either one's individual variance is. Ignoring the off-diagonal structure and just summing individual variances badly understates risk for a concentrated or correlated portfolio, and badly overstates it for a genuinely diversified one.

## The curse of dimensionality in sample covariance

The obvious estimator is the sample covariance matrix, computed directly from a window of historical returns. The problem is dimensionality: estimating the full covariance matrix of `N` assets requires estimating `N*(N+1)/2` distinct numbers (variances plus unique covariances). With 500 assets, that's over 125,000 parameters — and if the number of historical observations `T` is anywhere near or below `N`, the sample covariance matrix becomes **singular** (if `T <= N`) or merely very noisy (if `T` is only moderately larger than `N`). A singular covariance matrix can't be inverted at all, which is fatal for anything built on top of it — mean-variance portfolio optimization, for instance, needs `Sigma^(-1)` directly.

## Factor-model covariance as the fix

The practical fix reuses exactly the factor-model machinery from Lessons 21-23. If each asset's return is driven by a small number `k` of common factors plus idiosyncratic noise (as in Lesson 21), the covariance matrix decomposes as:

```
Sigma = B * Sigma_F * B' + D
```

- `B` is the `N x k` matrix of factor loadings (estimated once per asset by regression, exactly as in Lesson 21)
- `Sigma_F` is the small `k x k` covariance matrix of the factors themselves
- `D` is a diagonal matrix of idiosyncratic variances (assumed uncorrelated across assets, by construction of the factor model)

This collapses the estimation problem from `N*(N+1)/2` free parameters down to roughly `N*k` (the loadings) plus `k*(k+1)/2` (the factor covariance) plus `N` (idiosyncratic variances) — dramatically fewer numbers to estimate, at the cost of assuming the factor structure is a good description of how returns actually co-move.

## Worked example: sample vs. factor-model covariance

```python
import numpy as np
import pandas as pd

rng = np.random.default_rng(10)
n_assets = 150
n_obs = 100   # fewer observations than assets -- the classic problem

n_factors = 3
factor_cov = np.diag([0.012, 0.004, 0.003]) ** 2
factor_returns = rng.multivariate_normal(np.zeros(n_factors), factor_cov, size=n_obs)

B = rng.normal(1.0, 0.4, size=(n_assets, 1))
B = np.column_stack([B, rng.normal(0.2, 0.3, size=(n_assets, 1)), rng.normal(0.0, 0.3, size=(n_assets, 1))])
idio_var = rng.uniform(0.0004, 0.0016, size=n_assets)
idio_shocks = rng.normal(0, 1, size=(n_obs, n_assets)) * np.sqrt(idio_var)

returns = factor_returns @ B.T + idio_shocks
returns_df = pd.DataFrame(returns, columns=[f"a{i}" for i in range(n_assets)])

sample_cov = returns_df.cov().values
sample_eigs = np.linalg.eigvalsh(sample_cov)
print("Sample covariance rank:", np.linalg.matrix_rank(sample_cov), "of", n_assets)

# estimate the factor-model covariance: B_hat * F_hat * B_hat' + diag(idio_var_hat)
F_hat = np.cov(factor_returns, rowvar=False)
X = np.column_stack([np.ones(n_obs), factor_returns])
B_hat = np.zeros((n_assets, n_factors))
resid_var_hat = np.zeros(n_assets)
for i in range(n_assets):
    coef, *_ = np.linalg.lstsq(X, returns[:, i], rcond=None)
    resid = returns[:, i] - X @ coef
    B_hat[i, :] = coef[1:]
    resid_var_hat[i] = resid.var(ddof=X.shape[1])

factor_model_cov = B_hat @ F_hat @ B_hat.T + np.diag(resid_var_hat)
fm_eigs = np.linalg.eigvalsh(factor_model_cov)

true_cov = B @ factor_cov @ B.T + np.diag(idio_var)
print("Mean abs error vs. true covariance -- sample: %.6f, factor model: %.6f" % (
    np.abs(sample_cov - true_cov).mean(), np.abs(factor_model_cov - true_cov).mean()))
```

With 150 assets and only 100 observations, the results were stark:

```
n_assets=150, n_obs=100
Sample covariance rank: 99 of 150                 (singular -- cannot be inverted)
Factor-model covariance rank: 150 of 150          (full rank)
Factor-model condition number: 93.4
Mean abs error vs. true covariance -- sample: 0.000090, factor model: 0.000049
```

The sample covariance matrix comes out rank-99 (its smallest eigenvalues are numerically zero) — mechanically singular, because with only 100 observations you cannot estimate more than 99 independent directions of variance. The factor-model covariance, built from just 3 factors, is automatically full rank (150) because the added diagonal idiosyncratic-variance term guarantees invertibility, has a modest condition number of 93.4, and is also noticeably closer to the true covariance matrix used to generate the data (mean absolute error roughly half that of the sample covariance).

## Key terms

| Term | Meaning |
|---|---|
| Portfolio variance | `w' * Sigma * w`; depends on the full covariance matrix, not just individual variances |
| Curse of dimensionality | Covariance matrix parameters grow as `N*(N+1)/2`, quickly outrunning available data |
| Singular matrix | A matrix with zero eigenvalues; not invertible, fatal for mean-variance optimization |
| Factor-model covariance | `Sigma = B*Sigma_F*B' + D`; collapses parameters using a small number of common factors |
| Condition number | Ratio of largest to smallest eigenvalue; large values signal a numerically unstable matrix |

## Recap

Portfolio risk depends on the full covariance matrix, and the sample covariance matrix becomes singular or dangerously noisy once the number of assets approaches the number of observations; a factor-model covariance estimate fixes this by expressing risk through a small number of common factors plus diagonal idiosyncratic variance. Next, Lesson 25 closes this chapter with shrinkage estimation — a middle-ground approach that blends the noisy sample covariance with a more structured target.
