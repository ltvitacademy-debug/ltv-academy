# Convex Optimization

The minimum-variance portfolio in Lesson 25 had a single, clean, closed-form answer with no worry about other, better solutions hiding elsewhere. That was not luck — it is a consequence of **convexity**. This lesson makes that property precise, shows why it guarantees a unique global minimum, and checks it directly on a real covariance matrix.

## What you'll learn

- The formal definitions of a convex set and a convex function
- First-order and second-order tests for convexity, including the Hessian test
- Why convexity guarantees that any local minimum is the global minimum
- Why portfolio variance is convex (because covariance matrices are positive semi-definite) and why maximizing Sharpe ratio is not naturally convex

## Convex sets and convex functions

A set C ⊆ Rⁿ is **convex** if the line segment between any two points in C stays inside C: for all x, y ∈ C and θ ∈ [0,1], θx + (1−θ)y ∈ C. A function f: C → R (defined on a convex set) is **convex** if, for all x, y ∈ C and θ ∈ [0,1]:

f(θx + (1−θ)y) ≤ θf(x) + (1−θ)f(y)

In words: the function value at any point on the segment between x and y never exceeds the straight-line interpolation between f(x) and f(y) — the graph of f curves upward (or is flat), never dips below its own chords. If the inequality is strict whenever x ≠ y, f is **strictly convex**.

## Testing for convexity

For a twice-differentiable f, two equivalent tests are standard:

- **First-order condition**: f is convex on a convex set iff f(y) ≥ f(x) + ∇f(x)ᵀ(y−x) for all x, y — every tangent plane lies below the graph.
- **Second-order condition**: f is convex iff its Hessian ∇²f(x) is positive semi-definite for every x in the domain. Strict convexity follows (sufficiently, not necessarily) from a positive definite Hessian everywhere.

This is exactly the test used in Lesson 24 to classify critical points, now applied globally rather than just at one candidate point.

## Why convexity matters for optimization

The reason convexity is the single most valuable property in optimization is this theorem: **for a convex function over a convex feasible set, every local minimum is a global minimum**, and the set of minimizers is itself convex (a single point, if f is strictly convex). There is no risk of gradient descent or Newton's method getting trapped in a worse local minimum — any point satisfying the first-order condition ∇f(x*) = 0 (or the KKT conditions, under convex constraints) is guaranteed optimal. This is precisely why the Lagrangian approach in Lesson 25 could stop at the first stationary point it found and declare victory.

## Portfolio variance is convex

Portfolio variance is f(w) = wᵀΣw, a quadratic form. Its Hessian is simply 2Σ (constant everywhere), and Σ, a covariance matrix, is always symmetric positive semi-definite by construction — every variance is non-negative, so wᵀΣw ≥ 0 for all w. A positive semi-definite Hessian everywhere means f is convex; if Σ is strictly positive definite (no asset is a perfect linear combination of the others), f is strictly convex, giving a unique minimizer. The budget and return constraints in Lesson 25 are affine (linear equalities), which keeps the feasible set convex, so the whole minimum-variance problem is a convex program with a guaranteed unique, globally optimal solution.

```python
import numpy as np

rng = np.random.default_rng(1)
n = 6
M = rng.normal(size=(n, n))
Sigma = M @ M.T + n * np.eye(n)        # guaranteed PSD by construction

eigvals = np.linalg.eigvalsh(Sigma)
print(eigvals.min() >= 0)              # True: Hessian 2*Sigma is PSD, so f is convex

# Numerical check of the convexity inequality itself
w1, w2 = rng.normal(size=n), rng.normal(size=n)
theta = 0.3
lhs = (theta * w1 + (1 - theta) * w2) @ Sigma @ (theta * w1 + (1 - theta) * w2)
rhs = theta * (w1 @ Sigma @ w1) + (1 - theta) * (w2 @ Sigma @ w2)
print(lhs <= rhs + 1e-12)              # True, confirms the convexity inequality
```

## Where convexity breaks down: Sharpe ratio maximization

Not every natural finance objective is convex. Maximizing the Sharpe ratio, (μᵀw − r_f) / sqrt(wᵀΣw), is a ratio of a linear and a convex-square-root term, and is **not** concave in w in general (equivalently, minimizing its negative is not convex) — gradient-based solvers can be led astray without care. In practice, quants work around this with a known transformation: for a fixed budget normalization, Sharpe-ratio maximization over long-only weights can be reformulated as a convex quadratic program, which is why the numerical techniques in Lesson 27 matter — not every objective is convex by default, but many can be *made* convex with the right reformulation.

## Key terms

| Term | Meaning |
|---|---|
| Convex set | A set where the segment between any two members stays inside the set |
| Convex function | f(θx+(1−θ)y) ≤ θf(x)+(1−θ)f(y) for all x,y and θ∈[0,1] |
| Positive semi-definite (PSD) | A symmetric matrix with all eigenvalues ≥ 0; the Hessian test for convexity |
| Convex program | Minimizing a convex function over a convex feasible set — guarantees global optimality |

## Recap

A function is convex if its Hessian is positive semi-definite everywhere, and convexity guarantees that any local minimum found by gradient descent or the Lagrangian method is the global minimum. Portfolio variance is convex because covariance matrices are PSD by construction, which is why the minimum-variance problem always has one clean answer. Next, Lesson 27 turns this convex structure into the standard quadratic and linear programming forms solvers expect.
