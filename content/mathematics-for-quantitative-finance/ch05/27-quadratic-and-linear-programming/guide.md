# Quadratic & Linear Programming

The last two lessons derived the minimum-variance portfolio by hand using the Lagrangian, which only works cleanly for equality constraints. The moment you add a realistic inequality — no short selling, weights capped at 20%, sector limits — the closed-form algebra breaks down, and you need to hand the problem to a solver in a **standard form**. This lesson covers the two standard forms every optimization solver expects: quadratic programs (QP) and linear programs (LP).

## What you'll learn

- The standard form of a quadratic program and how it generalizes the minimum-variance problem
- The standard form of a linear program and when a finance problem reduces to one
- How adding a no-short-selling constraint (w ≥ 0) turns Lesson 25's closed-form problem into a QP with no closed form
- How to solve both forms in Python with `scipy.optimize`

## The quadratic program

A **quadratic program** minimizes a quadratic objective subject to linear constraints:

minimize ½xᵀQx + cᵀx subject to Ax ≤ b, Ex = e

where Q is symmetric. If Q is positive semi-definite, the QP is convex and Lesson 26's guarantee applies: any solution found is globally optimal. The minimum-variance portfolio from Lesson 25 is a QP with Q = Σ, c = 0, and only equality constraints (E=[1ᵀ; μᵀ], e=[1; r_target]) — which is exactly why it had a closed form. Add a no-short-selling constraint w ≥ 0 (equivalently −w ≤ 0, fitting the Ax ≤ b form), and the problem is still a convex QP, but the Lagrangian's stationarity equations no longer solve algebraically in general, because the active set of binding inequality constraints (which weights are pinned at exactly zero) isn't known in advance.

## The linear program

A **linear program** has a linear objective and linear constraints:

minimize cᵀx subject to Ax ≤ b, x ≥ 0

LPs show up in finance wherever risk is measured linearly rather than quadratically — for example, minimizing transaction costs (a linear function of trade sizes) subject to linear exposure and budget constraints, or minimizing mean absolute deviation (MAD) as a risk proxy instead of variance, which can be formulated entirely with linear constraints by introducing auxiliary variables for the absolute values. LPs are solved exactly (up to numerical tolerance) by algorithms like the simplex method or interior-point methods, both far cheaper than general nonlinear solvers.

## Worked example: no-short-selling portfolio (a QP)

```python
import numpy as np
from scipy.optimize import minimize, LinearConstraint

rng = np.random.default_rng(2)
n = 5
M = rng.normal(size=(n, n))
Sigma = M @ M.T + n * np.eye(n)
mu = rng.normal(loc=0.08, scale=0.03, size=n)
r_target = 0.09

lin_cons = LinearConstraint(
    np.vstack([np.ones(n), mu]), lb=[1.0, r_target], ub=[1.0, r_target])
bounds = [(0, None) for _ in range(n)]   # w >= 0: no short selling

res = minimize(lambda w: 0.5 * w @ Sigma @ w, x0=np.ones(n) / n,
               constraints=[lin_cons], bounds=bounds, method="SLSQP")
print(res.x.round(4), res.success)
```

Whenever the unconstrained-sign solution from Lesson 25 happened to be non-negative anyway, this QP gives the identical answer. But if the closed-form solution wanted to short an asset, the `w ≥ 0` bound now binds, that weight is pinned at exactly zero, and the remaining weights redistribute — a genuinely different, no-closed-form answer that only a QP solver finds correctly.

## Worked example: a linear program

```python
from scipy.optimize import linprog

# Minimize total transaction cost of trades x (buy quantities),
# subject to a budget and a minimum total-exposure requirement.
cost = np.array([0.002, 0.004, 0.001, 0.003, 0.0025])  # cost per $ traded
A_ub = [[1, 1, 1, 1, 1], [-1, -1, -1, -1, -1]]
b_ub = [100_000, -60_000]           # spend <= 100k, and total exposure >= 60k
bounds = [(0, 40_000)] * n          # per-trade cap

res = linprog(cost, A_ub=A_ub, b_ub=b_ub, bounds=bounds, method="highs")
print(res.x.round(2), res.fun)
```

`scipy.optimize.linprog` with `method="highs"` wraps a modern interior-point/simplex solver and reliably finds the global optimum, since LPs (like convex QPs) have no bad local minima to worry about.

## Key terms

| Term | Meaning |
|---|---|
| Quadratic program (QP) | minimize ½xᵀQx + cᵀx subject to linear constraints |
| Linear program (LP) | minimize cᵀx subject to linear constraints |
| Active set | The subset of inequality constraints that are binding (tight) at the optimum |
| Interior-point / simplex method | Standard algorithms for solving LPs and convex QPs exactly and efficiently |

## Recap

QPs generalize the minimum-variance problem to include inequality constraints like no-short-selling, where the closed-form Lagrangian algebra breaks down but convexity still guarantees a global optimum. LPs handle linear risk measures and cost objectives and are solved exactly by simplex or interior-point methods. Next, Lesson 28 surveys the numerical tools — `scipy.optimize` and beyond — that solve these problems in practice, including nonconvex cases with no such guarantee.
