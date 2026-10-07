# Unconstrained Optimization & Gradient Methods

Chapter 4 ended with resampling methods for understanding how uncertain a statistic is. Chapter 5 turns to a different problem: given a function that measures error, risk, or loss, how do you systematically find the input that makes it smallest? This lesson covers the simplest version of that question — optimization with no constraints at all, just a function on R^n and the search for its lowest point. Everything here — gradients, Hessians, gradient descent, Newton's method — is the machinery every later lesson in this chapter builds on, including the constrained portfolio problems in Lesson 25.

## What you'll learn

- The first-order and second-order conditions that define an unconstrained minimum
- How gradient descent turns the first-order condition into an iterative algorithm
- How Newton's method uses curvature (the Hessian) to converge faster
- A worked example minimizing a quadratic loss, solved both ways and checked against the closed-form answer

## What makes a point a minimum

Consider minimizing a differentiable function f: R^n → R with no constraints on x. A point x* is a **critical point** if the gradient vanishes there:

∇f(x*) = 0

This is the **first-order necessary condition**: at a smooth local minimum, there is no direction you can step in that decreases f, so every partial derivative must be zero. But a zero gradient alone is not enough — it is also satisfied at local maxima and at saddle points. The **second-order condition** resolves this using the Hessian matrix ∇²f(x*), the matrix of second partial derivatives:

- If ∇²f(x*) is positive definite (all eigenvalues > 0), x* is a strict local minimum.
- If ∇²f(x*) is positive semi-definite, x* is at least a local minimum candidate (possibly a flat direction).
- If the Hessian has both positive and negative eigenvalues, x* is a saddle point, not a minimum.

Checking the gradient and the Hessian together is exactly how you verify a candidate is genuinely a minimum rather than a flat spot or a saddle — a distinction that matters the moment a loss surface isn't a simple bowl.

## Gradient descent

Gradient descent turns the first-order condition into an algorithm. Since ∇f(x) points toward the direction of steepest increase, stepping a small distance in the opposite direction decreases f (for a small enough step). The update rule is:

x_{k+1} = x_k − α ∇f(x_k)

where α > 0 is the **step size** (or learning rate). Too large a step size can overshoot and diverge; too small converges reliably but slowly. For a convex function with a Lipschitz-continuous gradient, a suitably small fixed or diminishing step size guarantees convergence to the global minimum.

## Newton's method

Newton's method also uses the Hessian, not just the gradient, modeling f locally as a quadratic and jumping straight to that quadratic's minimum:

x_{k+1} = x_k − [∇²f(x_k)]^{-1} ∇f(x_k)

Near the true optimum, Newton's method converges quadratically — far faster than gradient descent's linear convergence — but each step is more expensive, since it requires forming and inverting (or solving a linear system with) the Hessian. On a genuinely quadratic function, Newton's method reaches the exact minimum in a single step, because the curvature never changes.

## Worked example: a quadratic loss

Let f(x) = ½ xᵀAx − bᵀx, where A is symmetric positive definite (think of A as a covariance-like matrix and this as a simplified calibration loss before any budget constraint is added). Its gradient and Hessian are:

∇f(x) = Ax − b, ∇²f(x) = A

Setting the gradient to zero gives the closed-form minimizer x* = A⁻¹b. This lets us check both iterative methods against a known answer.

```python
import numpy as np

rng = np.random.default_rng(0)
n = 5
M = rng.normal(size=(n, n))
A = M @ M.T + n * np.eye(n)        # symmetric positive definite
b = rng.normal(size=n)

def grad(x):
    return A @ x - b

# Gradient descent
x = np.zeros(n)
alpha = 1.0 / np.linalg.eigvalsh(A).max()   # safe step size
for _ in range(500):
    x = x - alpha * grad(x)

# Newton's method: one step, since f is exactly quadratic
x_newton = np.zeros(n) - np.linalg.solve(A, grad(np.zeros(n)))

x_star = np.linalg.solve(A, b)
print(np.allclose(x, x_star, atol=1e-3))      # gradient descent converges
print(np.allclose(x_newton, x_star))           # Newton: exact in one step
```

Gradient descent needs hundreds of small, cheap steps to approach x*; Newton's method needs one step that costs a full linear solve. That trade-off — many cheap steps versus few expensive ones — is the central design question behind every numerical optimizer you'll meet in Lesson 28.

## Key terms

| Term | Meaning |
|---|---|
| Critical point | A point where the gradient of f is zero |
| Hessian | The matrix of second partial derivatives, used to classify critical points |
| Gradient descent | Iterative update x_{k+1} = x_k − α∇f(x_k) |
| Step size (learning rate) | The scalar α controlling how far each gradient descent step moves |
| Newton's method | Iterative update using the Hessian for faster, curvature-aware convergence |

## Recap

An unconstrained minimum needs a zero gradient and a positive semi-definite Hessian. Gradient descent walks downhill using only first-order information; Newton's method uses curvature to converge faster at a higher per-step cost. Next, Lesson 25 adds the constraint every real portfolio faces — weights that must sum to one — using Lagrange multipliers.
