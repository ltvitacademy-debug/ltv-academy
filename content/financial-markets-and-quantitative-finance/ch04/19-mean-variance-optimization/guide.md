# Mean-Variance Optimization

Lesson 18 showed that combining imperfectly correlated assets can produce a portfolio less risky than its parts. That raises an obvious question: out of every possible combination of weights, which one is actually *best*? Harry Markowitz answered that in 1952 with a framework that's still the starting point for portfolio construction today — choose weights to minimize risk for a given target return, and do that at every possible target return.

## What you'll learn

- The Markowitz mean-variance optimization problem, in both matrix and plain-language form
- The efficient frontier and what it represents
- The minimum-variance portfolio
- Why this framework needs expected returns, variances, and correlations as inputs

## The optimization problem

In matrix notation, for a vector of portfolio weights **w**, a covariance matrix **Σ**, and a vector of expected returns **μ**:

```
minimize   w' * Sigma * w
subject to w' * mu = target_return
           w' * 1 = 1
```

In plain language: **find the portfolio weights that produce the lowest possible variance, among all portfolios that achieve a given target expected return, with the weights summing to 100%.** w'Σw is just the matrix way of writing the full portfolio variance formula from Lesson 18, generalized from two assets to however many you're holding — it expands out to the same weighted-variance-plus-cross-terms structure, just with every pairwise covariance included at once. w'μ = target_return pins down the expected return you want; w'1 = 1 just says the weights have to add up to a fully invested portfolio (negative weights are allowed if short-selling is permitted, representing a short position).

## The efficient frontier

Solve that minimization problem once for every possible target return, and plot the resulting (risk, return) pairs. The result is the **efficient frontier**: the set of portfolios that deliver the lowest possible risk for each level of expected return — equivalently, the highest possible expected return for each level of risk. Any portfolio *not* on this frontier is dominated: there exists some portfolio with the same return and less risk, or the same risk and more return, so no rational mean-variance investor would ever hold it.

The frontier is a curve, not a straight line, because of exactly the diversification effect from Lesson 18 — correlations below 1 let you push risk down faster than a simple linear blend of the individual assets would suggest.

## The minimum-variance portfolio

One special point on the frontier doesn't require picking a target return at all: the **minimum-variance portfolio** is the single portfolio (among all portfolios satisfying w'1 = 1, with no return target) with the lowest possible variance overall. It sits at the very left tip of the efficient frontier. Every other point on the frontier trades some of that minimum risk for more expected return.

## What the framework needs as inputs

Mean-variance optimization is only as good as its inputs: a vector of expected returns (μ) for every asset, a full variance-covariance matrix (Σ) capturing every asset's own variance and every pairwise covariance. For N assets, that's N expected returns and N(N+1)/2 distinct covariance terms — the number of required covariance estimates grows roughly with the square of the number of assets, which is one of the most cited practical criticisms of the pure Markowitz approach: expected returns, in particular, are notoriously hard to estimate accurately, and small errors in μ can swing the "optimal" weights dramatically. (You'll see factor models in Lesson 21 as one common way practitioners simplify Σ's estimation.)

## Worked example: three-asset minimum-variance intuition

Consider three assets with returns [8%, 10%, 6%] and a covariance matrix built from volatilities [15%, 25%, 10%] and modest pairwise correlations around 0.2-0.3. Numerically:

```python
import numpy as np

mu = np.array([0.08, 0.10, 0.06])
sigma = np.array([0.15, 0.25, 0.10])
corr = np.array([[1.0, 0.3, 0.2],
                  [0.3, 1.0, 0.25],
                  [0.2, 0.25, 1.0]])
Sigma = np.outer(sigma, sigma) * corr

ones = np.ones(3)
Sigma_inv = np.linalg.inv(Sigma)
w_minvar = Sigma_inv @ ones / (ones @ Sigma_inv @ ones)
# weights sum to 1, tilted toward the lowest-volatility, lowest-correlation asset
```

The closed-form minimum-variance weights are w = Σ⁻¹**1** / (**1**'Σ⁻¹**1**) — this comes directly from solving the constrained minimization with only the budget constraint (w'1 = 1) active, using Lagrange multipliers. Running this with the numbers above tilts the portfolio toward the lowest-volatility, lowest-correlation asset (here, the 10%-volatility asset), exactly as intuition would suggest, but the exact weights also depend on how that asset is correlated with the others — which is the whole reason this needs a matrix calculation rather than a guess.

## Key terms

| Term | Meaning |
|---|---|
| Mean-variance optimization | Choosing portfolio weights to minimize variance for a target return (Markowitz, 1952) |
| Covariance matrix (Sigma) | Matrix of every asset's variance and every pairwise covariance |
| Efficient frontier | The set of portfolios with lowest risk for each level of expected return |
| Minimum-variance portfolio | The single portfolio with the lowest possible variance, regardless of return |
| Dominated portfolio | A portfolio for which another exists with equal return and less risk (or vice versa) |

## Recap

Mean-variance optimization minimizes portfolio variance w'Σw subject to hitting a target return and keeping weights summed to one; solving it across every target return traces out the efficient frontier, with the minimum-variance portfolio at its leftmost point. The framework is only as good as its inputs — expected returns and a full covariance matrix — which is a real practical limitation. Next up, Lesson 20: the Capital Asset Pricing Model, which builds directly on this framework to explain how risk should be priced in equilibrium.
