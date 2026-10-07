# Taylor Series & Approximation

Most functions you care about in finance — option prices, bond prices, exponential growth — are not polynomials, yet polynomials are the only functions a computer can evaluate exactly in finitely many steps. The Taylor series is the bridge: it approximates any sufficiently smooth function near a point using its derivatives at that point. This lesson builds the Taylor expansion, states its remainder term precisely, and shows the second-order approximation that underlies delta-gamma hedging.

## What you'll learn

- How to build the Taylor polynomial of a function from its derivatives at a point
- The exact form of the remainder term, so you know how good (or bad) a truncated approximation is
- The second-order (quadratic) approximation and its use in finance: delta-gamma-theta
- How to verify an approximation numerically in Python

## Building the Taylor polynomial

For a function $f$ that is $n+1$ times differentiable near a point $a$, the **Taylor polynomial of degree $n$** centered at $a$ is:

$$P_n(x) = f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + \cdots + \frac{f^{(n)}(a)}{n!}(x-a)^n$$

Each term uses one more derivative at $a$, matched so that $P_n$ and $f$ agree in value and in their first $n$ derivatives at $a$. When $a=0$, this is called a **Maclaurin series**.

**Example.** For $f(x) = e^x$ around $a=0$: every derivative of $e^x$ is $e^x$ itself, so $f^{(k)}(0) = 1$ for all $k$, giving

$$e^x \approx 1 + x + \frac{x^2}{2!} + \frac{x^3}{3!} + \cdots$$

This is why continuously compounded growth, $e^{rt}$, is so often approximated as $1 + rt$ for small $rt$: it is just the first-order Taylor approximation.

## The remainder: how good is the truncation

Truncating the series at degree $n$ introduces an error. **Taylor's theorem with the Lagrange remainder** states that for some $c$ between $a$ and $x$:

$$f(x) = P_n(x) + R_n(x), \qquad R_n(x) = \frac{f^{(n+1)}(c)}{(n+1)!}(x-a)^{n+1}$$

The remainder shrinks quickly whenever $(x-a)$ is small and the $(n+1)$-th derivative stays bounded — which is why Taylor approximations work well for *local* moves (small changes in the stock price, small changes in yield) and can fail badly for large moves.

## Second-order approximation: delta-gamma

Truncate at $n=2$ and you get the **quadratic approximation**, the one used constantly in risk management:

$$f(x) \approx f(a) + f'(a)(x-a) + \frac{f''(a)}{2}(x-a)^2$$

For an option value $V(S)$ as a function of the stock price, writing $\Delta S = S - S_0$:

$$V(S) \approx V(S_0) + \underbrace{\frac{\partial V}{\partial S}}_{\text{delta}} \Delta S + \frac{1}{2} \underbrace{\frac{\partial^2 V}{\partial S^2}}_{\text{gamma}} (\Delta S)^2$$

This is the **delta-gamma approximation**: delta hedges the linear (first-order) move, and gamma corrects for the fact that the option's value curves rather than moving in a straight line. Add a time term $\theta \, \Delta t$ (theta, the first partial with respect to time) and you have the full delta-gamma-theta approximation used to explain almost all of an option's P&L over a short interval without repricing the full model.

## Checking a Taylor approximation numerically

```python
import numpy as np

S0 = 100.0
sigma = 0.0  # placeholder; using a simple illustrative function instead
def V(S):
    return S**0.5  # stand-in "value function" with curvature, like sqrt(S)

def dV(S):
    return 0.5 * S**(-0.5)

def d2V(S):
    return -0.25 * S**(-1.5)

dS = 5.0  # a $5 move in the underlying
exact = V(S0 + dS)
first_order = V(S0) + dV(S0) * dS
second_order = first_order + 0.5 * d2V(S0) * dS**2

print(f"exact: {exact:.6f}  1st-order: {first_order:.6f}  2nd-order: {second_order:.6f}")
# exact: 10.246951  1st-order: 10.250000  2nd-order: 10.246875
```

Notice the second-order (delta-gamma-style) approximation is far closer to the exact value than the first-order one alone — the gamma term is correcting for curvature exactly as advertised.

## Key terms

| Term | Meaning |
|---|---|
| Taylor polynomial | Polynomial built from a function's derivatives at a point, approximating it nearby |
| Maclaurin series | A Taylor series centered at $a=0$ |
| Lagrange remainder | The exact leftover error term when a Taylor series is truncated |
| Delta-gamma approximation | Second-order Taylor expansion of option value in the underlying price |
| Theta | First partial derivative of option value with respect to time |

## Recap

A Taylor polynomial reconstructs a function locally from its derivatives at a single point, and the Lagrange remainder tells you exactly how much error truncation introduces. Keeping the first two terms gives the delta-gamma approximation risk desks use every day to explain P&L without repricing, and the error shrinks fast for small moves but grows for large ones. Next up, Lesson 5: Ordinary Differential Equations Basics, where derivatives themselves become the unknowns we solve for.
