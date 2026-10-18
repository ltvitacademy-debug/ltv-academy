# Mean-Variance Optimization and the Efficient Frontier

Chapter 5 built the two inputs this chapter needs: expected returns from factor models, and a well-estimated, shrunk covariance matrix. This lesson puts them to work — turning a set of assets' expected returns and covariances into an actual portfolio, using the Markowitz mean-variance framework that still underlies most real portfolio construction, directly or as a baseline to improve on.

## What you'll learn

- The two mean-variance portfolios worth knowing by name: minimum-variance and tangency (max Sharpe)
- How to compute both directly from a covariance matrix and expected returns, with real matrix algebra
- What the efficient frontier actually is, and why it's a curve, not a point
- Why Lesson 25's shrinkage work matters even more once you're about to invert this exact matrix

## The minimum-variance portfolio

The **minimum-variance portfolio** is the one combination of assets with the lowest possible overall volatility, regardless of expected return. It has a closed-form solution directly from the covariance matrix:

```
w_minvar = (Σ⁻¹ · 1) / (1' · Σ⁻¹ · 1)

where:
  Σ    = the covariance matrix (Lesson 24-25)
  1    = a vector of ones
  Σ⁻¹  = the inverse of the covariance matrix
```

```python
import numpy as np

vols = np.array([0.15, 0.20, 0.25])
corr = np.array([
    [1.0, 0.3, 0.1],
    [0.3, 1.0, 0.4],
    [0.1, 0.4, 1.0],
])
cov = corr * np.outer(vols, vols)   # convert correlation + vols into a covariance matrix

ones = np.ones(3)
cov_inv = np.linalg.inv(cov)

w_minvar = cov_inv @ ones / (ones @ cov_inv @ ones)
print("Min-variance weights:", np.round(w_minvar, 4))
print("Weights sum to:", w_minvar.sum())

minvar_vol = np.sqrt(w_minvar @ cov @ w_minvar)
print(f"Min-variance portfolio volatility: {minvar_vol:.4f}")
```

```
Min-variance weights: [0.6407 0.1905 0.1688]
Weights sum to: 1.0
Min-variance portfolio volatility: 0.1295
```

Notice the portfolio volatility (12.95%) is *lower* than even the least volatile individual asset (15%) — this is diversification working exactly as intended: combining imperfectly-correlated assets can produce a portfolio safer than any single holding, purely from the covariance structure, with no view on expected returns required at all.

## The tangency (maximum Sharpe) portfolio

The **tangency portfolio** is the one combination of risky assets that maximizes the Sharpe ratio — the best risk-adjusted return achievable from this asset set, given a risk-free rate:

```
w_tangency ∝ Σ⁻¹ · (μ - rf · 1)   (then normalized so weights sum to 1)

where:
  μ   = expected returns for each asset (from Chapter 5's factor models)
  rf  = the risk-free rate
```

```python
mu = np.array([0.08, 0.11, 0.14])   # expected annual returns
rf = 0.03

excess_mu = mu - rf
w_raw = cov_inv @ excess_mu
w_tangency = w_raw / w_raw.sum()
print("Tangency weights:", np.round(w_tangency, 4))

tangency_return = w_tangency @ mu
tangency_vol = np.sqrt(w_tangency @ cov @ w_tangency)
tangency_sharpe = (tangency_return - rf) / tangency_vol
print(f"Tangency portfolio: return {tangency_return:.4f}, vol {tangency_vol:.4f}, Sharpe {tangency_sharpe:.4f}")
```

```
Tangency weights: [0.4105 0.2441 0.3453]
Tangency portfolio: return 0.1080, vol 0.1410, Sharpe 0.5537
```

## The efficient frontier: why it's a curve, not a point

Neither the minimum-variance portfolio nor the tangency portfolio is "the" answer — they're two specific points on the **efficient frontier**: the full curve of portfolios that deliver the maximum possible return for every achievable level of risk. Every portfolio *on* the frontier is optimal for its own risk level; every portfolio *below* the curve for a given volatility is leaving return on the table for no reason. Where an actual investor should sit on that curve is a risk-tolerance question outside what the covariance matrix and expected returns alone can answer — the math gives you the frontier, not a single required point on it.

## Why this is exactly where Lesson 25's shrinkage work pays off

Both formulas above require **inverting** the covariance matrix — and Lesson 25 already covered why a raw sample covariance matrix, especially with many assets and limited history, is often poorly conditioned or outright singular, making that inversion numerically unstable or impossible. A shrunk, well-conditioned covariance matrix isn't just "more statistically honest" in the abstract — it's the specific, practical thing that makes `np.linalg.inv(cov)` in this lesson's own code produce a trustworthy result instead of wildly unstable weights that happen to satisfy the math while being nonsensical in practice (extreme long/short positions that flip entirely with tiny changes in the input data is the classic symptom of optimizing on an ill-conditioned covariance matrix).

## Key terms

| Term | Meaning |
|---|---|
| Minimum-variance portfolio | The asset combination with the lowest possible volatility, independent of expected return |
| Tangency portfolio | The asset combination maximizing the Sharpe ratio, given a risk-free rate |
| Efficient frontier | The curve of portfolios offering the maximum return for every achievable level of risk |

## Check yourself

Why does the minimum-variance portfolio's computation require no expected-return estimates at all, while the tangency portfolio's computation does?
