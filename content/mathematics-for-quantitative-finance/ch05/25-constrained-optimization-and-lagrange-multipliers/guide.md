# Constrained Optimization & Lagrange Multipliers

Lesson 24 minimized a function with no restrictions on x. Real portfolios are never that free — weights must sum to one, a target return must be hit, short positions might be banned. This lesson introduces the classical tool for handling equality constraints exactly: the method of Lagrange multipliers, built around the Markowitz mean-variance portfolio, the single most important constrained optimization problem in finance.

## What you'll learn

- How to form the Lagrangian for a minimization problem with equality constraints
- The KKT conditions, including how inequality constraints extend the idea
- The full derivation of the minimum-variance portfolio subject to a budget and return target
- How to verify the analytic solution numerically with `scipy.optimize.minimize`

## The Lagrangian

Consider minimizing f(x) subject to equality constraints g(x) = 0 (a vector of m constraint functions). The **Lagrangian** combines the objective and the constraints using a vector of **Lagrange multipliers** λ:

L(x, λ) = f(x) + λᵀ g(x)

At a constrained optimum, the gradient of L with respect to x must vanish, alongside the constraints themselves:

∇_x L = ∇f(x) + Jg(x)ᵀ λ = 0, g(x) = 0

Geometrically, this says ∇f(x) is parallel to the constraint gradients at the optimum — there is no way to move along the constraint surface that still decreases f. When inequality constraints h(x) ≤ 0 are added, this generalizes to the **Karush-Kuhn-Tucker (KKT) conditions**: stationarity of the Lagrangian, primal feasibility (g=0, h≤0), dual feasibility (multipliers on inequalities ≥ 0), and **complementary slackness** (multiplier times constraint equals zero for every inequality) — meaning a constraint that isn't tight at the optimum has a zero multiplier.

## Worked example: minimum-variance portfolio

Let w be a vector of portfolio weights, Σ the covariance matrix of asset returns (symmetric positive definite), μ the vector of expected returns, and 1 a vector of ones. The classic problem is:

minimize ½ wᵀΣw subject to 1ᵀw = 1 and μᵀw = r_target

(The ½ is a convenience that cancels cleanly; it doesn't change the minimizer.) Form the Lagrangian with two multipliers, λ for the budget constraint and γ for the return target:

L(w, λ, γ) = ½ wᵀΣw − λ(1ᵀw − 1) − γ(μᵀw − r_target)

Setting ∇_w L = 0 gives Σw = λ1 + γμ, so w = Σ⁻¹(λ1 + γμ). Substituting back into the two constraints turns this into a small 2×2 linear system for λ and γ, which can be solved directly, giving the closed-form efficient-frontier weights for any target return. This is exactly the derivation behind the efficient frontier you may have seen stated without proof: it falls straight out of the first-order condition of the Lagrangian.

```python
import numpy as np
from scipy.optimize import minimize

rng = np.random.default_rng(0)
n = 4
M = rng.normal(size=(n, n))
Sigma = M @ M.T + n * np.eye(n)       # covariance, symmetric PD
mu = rng.normal(loc=0.08, scale=0.03, size=n)
r_target = 0.09
ones = np.ones(n)

# Analytic solution via the 2x2 system for (lambda, gamma)
Sigma_inv = np.linalg.inv(Sigma)
A = ones @ Sigma_inv @ ones
B = ones @ Sigma_inv @ mu
C = mu @ Sigma_inv @ mu
rhs = np.array([1.0, r_target])
M2 = np.array([[A, B], [B, C]])
lam, gam = np.linalg.solve(M2, rhs)
w_analytic = Sigma_inv @ (lam * ones + gam * mu)

# Numerical check with SLSQP
cons = (
    {"type": "eq", "fun": lambda w: w.sum() - 1},
    {"type": "eq", "fun": lambda w: w @ mu - r_target},
)
res = minimize(lambda w: 0.5 * w @ Sigma @ w, x0=ones / n,
               constraints=cons, method="SLSQP")

print(np.allclose(w_analytic, res.x, atol=1e-4))   # True
```

Both routes agree, because SLSQP is itself solving the KKT system numerically. The multipliers λ and γ also have an economic reading: they are the **shadow prices** of each constraint, i.e. how much the minimized variance would change per unit relaxation of the budget or the return target — the same marginal-value interpretation multipliers carry in every constrained problem, not just portfolios.

## Key terms

| Term | Meaning |
|---|---|
| Lagrangian | L(x,λ) = f(x) + λᵀg(x), combining the objective and equality constraints |
| Lagrange multiplier | The scalar attached to each constraint; also its shadow price |
| KKT conditions | Stationarity, primal/dual feasibility, and complementary slackness for problems with inequality constraints |
| Efficient frontier | The set of minimum-variance portfolios for each achievable target return |

## Recap

Lagrange multipliers turn an equality-constrained problem into an unconstrained stationarity condition on the Lagrangian, and the KKT conditions extend this to inequalities. The minimum-variance portfolio with a budget and return constraint is a clean, closed-form example of exactly this machinery. Next, Lesson 26 asks why this problem was solvable in closed form at all: because it's convex.
