# Multivariable Calculus & Gradients

A single stock's price is a function of one variable, time. A portfolio of fifty stocks, or an option priced off five inputs, is not. This lesson extends derivatives to functions of several variables — partial derivatives, the gradient, the Jacobian, and the Hessian — the machinery behind portfolio sensitivity, multi-asset Greeks, and the optimizers used everywhere in quant finance.

## What you'll learn

- Partial derivatives: differentiating with respect to one variable while holding the others fixed
- The gradient vector, and why it points in the direction of steepest increase
- The Jacobian (for vector-valued functions) and the Hessian (second derivatives), and what each is used for
- How gradient descent, the core engine of numerical optimization, uses all of this

## Partial derivatives

For a function of several variables $f(x_1, x_2, \dots, x_n)$, the **partial derivative** with respect to $x_i$, written $\frac{\partial f}{\partial x_i}$, treats every other variable as a constant and differentiates as usual.

**Example.** Let $V(S, \sigma)$ be an option's value as a function of the stock price $S$ and volatility $\sigma$. Then $\frac{\partial V}{\partial S}$ (delta) tells you the sensitivity to price with volatility held fixed, and $\frac{\partial V}{\partial \sigma}$ (vega) tells you the sensitivity to volatility with price held fixed. Each Greek is exactly one partial derivative of the pricing function.

## The gradient

Stack all the partial derivatives of a scalar-valued function $f : \mathbb{R}^n \to \mathbb{R}$ into a vector, and you get the **gradient**:

$$\nabla f(\mathbf{x}) = \left( \frac{\partial f}{\partial x_1}, \frac{\partial f}{\partial x_2}, \dots, \frac{\partial f}{\partial x_n} \right)$$

The gradient has a crucial geometric property: **it points in the direction of steepest increase** of $f$ at that point, and its magnitude is the rate of increase in that direction. Moving in the direction $-\nabla f(\mathbf{x})$ therefore decreases $f$ fastest — the entire idea behind gradient descent.

**Worked example.** Consider a simple two-asset portfolio variance function $f(w_1, w_2) = w_1^2 \sigma_1^2 + w_2^2 \sigma_2^2 + 2 w_1 w_2 \rho \sigma_1 \sigma_2$, where $w_i$ are weights, $\sigma_i$ are volatilities, and $\rho$ is correlation. Then:

$$\frac{\partial f}{\partial w_1} = 2 w_1 \sigma_1^2 + 2 w_2 \rho \sigma_1 \sigma_2, \qquad \frac{\partial f}{\partial w_2} = 2 w_2 \sigma_2^2 + 2 w_1 \rho \sigma_1 \sigma_2$$

Setting $\nabla f = \mathbf{0}$ and solving (with a budget constraint $w_1+w_2=1$) is exactly how the minimum-variance portfolio weights are derived.

## The Jacobian: when the output is also a vector

If $\mathbf{f} : \mathbb{R}^n \to \mathbb{R}^m$ maps $n$ inputs to $m$ outputs (for example, $n$ risk factors driving $m$ instrument prices), the **Jacobian** $J$ is the $m \times n$ matrix of all first partial derivatives:

$$J_{ij} = \frac{\partial f_i}{\partial x_j}$$

Row $i$ of $J$ is the gradient of output $i$ with respect to all inputs. In risk management, the Jacobian of a vector of instrument P&Ls with respect to a vector of risk factors is exactly the sensitivity matrix used to aggregate risk across a book.

## The Hessian: curvature

The **Hessian** $H$ of a scalar function $f$ is the $n \times n$ matrix of all second partial derivatives:

$$H_{ij} = \frac{\partial^2 f}{\partial x_i \partial x_j}$$

The Hessian describes curvature, and by Clairaut's/Schwarz's theorem it is symmetric ($H_{ij} = H_{ji}$) whenever $f$'s second partials are continuous. A Hessian that is **positive definite** at a point where $\nabla f = \mathbf{0}$ confirms that point is a local minimum — exactly the condition optimizers check, and exactly how a convex portfolio-variance function guarantees a unique minimum-variance solution. Option traders know the Hessian of value with respect to price by another name: **gamma**, $\frac{\partial^2 V}{\partial S^2}$.

## Gradient descent in code

```python
import numpy as np

def f(w):          # toy "risk" surface: (w - target)^2
    return np.sum((w - np.array([0.3, 0.7]))**2)

def grad_f(w):
    return 2 * (w - np.array([0.3, 0.7]))

w = np.array([0.0, 0.0])
lr = 0.1
for step in range(50):
    w = w - lr * grad_f(w)   # move opposite the gradient

print(w)   # converges toward [0.3, 0.7]
```

Each iteration nudges $\mathbf{w}$ in the direction $-\nabla f(\mathbf{w})$, shrinking $f$ a little at a time — the same loop, with far more variables, that calibrates yield curves and fits volatility surfaces.

## Key terms

| Term | Meaning |
|---|---|
| Partial derivative | Derivative with respect to one variable, others held fixed |
| Gradient $\nabla f$ | Vector of all partial derivatives; points toward steepest increase |
| Jacobian | Matrix of partial derivatives for a vector-valued function |
| Hessian | Matrix of second partial derivatives; describes curvature |
| Gradient descent | Iterative minimization by stepping opposite the gradient |

## Recap

Partial derivatives isolate the effect of one variable at a time; stacked together they form the gradient, which always points toward steepest increase, and whose negative drives gradient descent. The Jacobian generalizes this to vector outputs, and the Hessian captures curvature, including the gamma that tells an option trader how delta itself will change. Next up, Lesson 3: Integration & Expectation, where we turn these ideas toward areas, sums, and probability.
