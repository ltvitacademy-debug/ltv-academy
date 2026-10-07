# Numerical Optimization in Python

Four lessons have built the theory: critical points and gradient methods, Lagrange multipliers, convexity, and the QP/LP standard forms. This lesson closes Chapter 5 by surveying the actual Python toolkit — `scipy.optimize` — end to end, and by being honest about where the guarantees from Lesson 26 stop applying.

## What you'll learn

- The main `scipy.optimize.minimize` methods and when to reach for each one
- How to supply gradients and constraints correctly, and why that matters
- A full worked portfolio optimization combining bounds, equality constraints, and a nonconvex twist
- Practical pitfalls: local minima, poor scaling, and finite-difference gradient error

## The `scipy.optimize` toolkit

`scipy.optimize.minimize` is a single entry point to many underlying algorithms, selected with `method=`:

- **`"BFGS"` / `"L-BFGS-B"`**: quasi-Newton methods that build an approximate Hessian from gradient history — the default workhorse for smooth, unconstrained or bound-constrained problems. `L-BFGS-B` adds box bounds.
- **`"Nelder-Mead"`**: a derivative-free simplex method; slow but useful when gradients aren't available or the objective is noisy/non-smooth.
- **`"SLSQP"`**: Sequential Least Squares Programming, handling general equality and inequality constraints — the method used for the portfolio QPs in Lessons 25 and 27.
- **`"trust-constr"`**: a trust-region method for constrained problems, often more robust than SLSQP on harder constraint sets and able to use exact or approximate Hessians.
- **`scipy.optimize.linprog`**: a separate, dedicated LP solver (method `"highs"`), far faster than `minimize` for purely linear problems.

## Supplying gradients correctly

By default, `minimize` approximates the gradient with finite differences, which is slow and can be inaccurate near flat or steep regions. Supplying the analytic gradient via `jac=` both speeds convergence and improves accuracy — exactly the ∇f(x) derived by hand in Lesson 24.

```python
import numpy as np
from scipy.optimize import minimize

def neg_sharpe(w, mu, Sigma, rf):
    ret = w @ mu - rf
    vol = np.sqrt(w @ Sigma @ w)
    return -ret / vol

def neg_sharpe_grad(w, mu, Sigma, rf):
    ret = w @ mu - rf
    vol = np.sqrt(w @ Sigma @ w)
    d_ret = mu
    d_vol = (Sigma @ w) / vol
    # quotient rule on -(ret)/vol
    return -(d_ret * vol - ret * d_vol) / (vol ** 2)

rng = np.random.default_rng(3)
n = 5
M = rng.normal(size=(n, n))
Sigma = M @ M.T + n * np.eye(n)
mu = rng.normal(loc=0.08, scale=0.03, size=n)
rf = 0.02

cons = {"type": "eq", "fun": lambda w: w.sum() - 1}
bounds = [(0, 1)] * n   # long-only, fully invested

res = minimize(neg_sharpe, x0=np.ones(n) / n, args=(mu, Sigma, rf),
               jac=neg_sharpe_grad, constraints=[cons], bounds=bounds,
               method="SLSQP")
print(res.x.round(4), -res.fun)   # weights and the achieved Sharpe ratio
```

This maximizes the Sharpe ratio (by minimizing its negative) under a long-only, fully-invested constraint — exactly the nonconvex objective flagged at the end of Lesson 26. SLSQP still finds a good answer here, but unlike the pure minimum-variance QP, there is no proof this is the unique global optimum; a careful workflow checks multiple starting points.

## Pitfalls to watch for

- **Local minima on nonconvex objectives.** Unlike the convex QPs in Lesson 27, an objective like negative Sharpe ratio or a nonlinear calibration loss can have multiple local optima. Re-run from several random starting points (a **multi-start** strategy) and compare results.
- **Poor scaling.** If one variable's natural scale is thousands and another's is fractions of a percent, the Hessian condition number explodes and convergence slows or stalls. Rescale variables (e.g., work in percentage points, not decimals) before optimizing.
- **Finite-difference gradient error.** If `jac` isn't supplied, `minimize`'s numerical gradient can be noisy for objectives with floating-point cancellation (like the Sharpe ratio's division by a small volatility). Supplying an analytic gradient, as above, removes this source of error entirely.
- **Constraint tolerance.** Equality constraints are only satisfied up to a numerical tolerance (`ftol`/`eps` defaults); always sanity-check `res.x.sum()` is close enough to 1, not exactly 1.

## Key terms

| Term | Meaning |
|---|---|
| `scipy.optimize.minimize` | General-purpose entry point to multiple local optimization algorithms |
| `jac` | The analytic gradient function passed to a solver, avoiding finite-difference approximation |
| Multi-start | Re-running a nonconvex optimization from several starting points to guard against local minima |
| Condition number | A measure of how poorly scaled a problem is; large values slow convergence |

## Recap

`scipy.optimize` wraps BFGS, SLSQP, trust-constr, Nelder-Mead, and linprog behind one consistent interface, and supplying analytic gradients and well-scaled variables matters as much as choosing the right method. Unlike the convex portfolio problems in Lessons 25–27, nonconvex objectives like Sharpe-ratio maximization need multi-start checks because Lesson 26's global-optimum guarantee no longer applies. That closes Chapter 5. Chapter 6 turns from optimizing a fixed function to modeling randomness that evolves over time, starting with Lesson 29: random walks.
