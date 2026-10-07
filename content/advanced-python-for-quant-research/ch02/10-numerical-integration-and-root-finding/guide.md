# Numerical Integration & Root Finding

Two quant problems that look different on the surface — "what discount rate makes this bond's cash flows equal its price" and "what volatility makes this option's Black-Scholes price match its market price" — are both root-finding problems: find the input to a function that makes it equal (or equal zero against) a target. This lesson covers `scipy.integrate` for when you need an integral numerically, and `scipy.optimize`'s root-finding routines, with bond yield-to-maturity and implied volatility as the running examples.

## What you'll learn

- `scipy.integrate.quad` for a definite integral
- `scipy.integrate.solve_ivp` for an ODE, briefly
- `scipy.optimize.brentq` for bracketed root-finding — the right default
- `scipy.optimize.newton` when you have a derivative (or want the secant method)
- `scipy.optimize.root` for systems of equations
- Solving for bond yield-to-maturity and option implied volatility

## scipy.integrate.quad

`quad` numerically integrates a function over a range using adaptive quadrature — it refines the subdivisions automatically until a target precision is reached, rather than using a fixed grid:

```python
from scipy import integrate
import numpy as np

# Present value of a continuous cash flow stream, discounted continuously
def discounted_flow(t, rate=0.04, cash_rate=100):
    return cash_rate * np.exp(-rate * t)

pv, error_estimate = integrate.quad(discounted_flow, 0, 5)
print(f"PV: {pv:.2f}, error estimate: {error_estimate:.2e}")
```

`quad` returns a tuple: the estimated value and an estimate of the absolute error, which is worth checking when precision matters rather than assuming the first number is exact.

## scipy.integrate.solve_ivp, briefly

For a differential equation — a stochastic process without randomness, or the deterministic part of a model — `solve_ivp` integrates `dy/dt = f(t, y)` forward from an initial condition:

```python
def mean_reversion(t, y, kappa=0.5, theta=0.03):
    return kappa * (theta - y)   # drift of an Ornstein-Uhlenbeck-style process

sol = integrate.solve_ivp(mean_reversion, t_span=[0, 10], y0=[0.08])
print(sol.t[-1], sol.y[0, -1])   # time and value at the end of the integration
```

This lesson only needs `solve_ivp` well enough to recognize it; full treatment of stochastic and differential-equation models is outside this course's scope.

## Root-finding: brentq is the right default

`brentq` finds a root of a function within a bracketing interval `[a, b]` where the function changes sign — it combines bisection's reliability with faster methods' speed, and it's the recommended default whenever you can bracket the root:

```python
from scipy import optimize

def bond_price_minus_target(y, cashflows, times, target_price):
    pv = sum(cf / (1 + y) ** t for cf, t in zip(cashflows, times))
    return pv - target_price

cashflows = [5, 5, 5, 5, 105]      # 5% coupon, 5 annual periods, face 100
times = [1, 2, 3, 4, 5]
target_price = 98.5

ytm = optimize.brentq(bond_price_minus_target, 0.001, 0.5,
                       args=(cashflows, times, target_price))
print(f"Yield to maturity: {ytm:.4%}")
```

The function passed to `brentq` must return the quantity you want to be zero at the answer — here, "model price minus target price" — and you need a bracket `[a, b]` where that quantity is positive at one end and negative at the other. `brentq` is guaranteed to converge as long as the bracket genuinely contains a sign change.

## Root-finding without a bracket: newton

`optimize.newton` implements Newton-Raphson (with a derivative) or the secant method (without one) — useful when you have a good starting guess but no convenient bracket:

```python
def implied_vol_error(sigma, market_price, S, K, T, r):
    from scipy.stats import norm
    d1 = (np.log(S / K) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    bs_price = S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
    return bs_price - market_price

iv = optimize.newton(implied_vol_error, x0=0.25,
                      args=(12.50, 100, 100, 0.5, 0.03))
print(f"Implied volatility: {iv:.4%}")
```

`newton` can fail to converge (or converge to the wrong root) with a bad starting guess, since it has no bracket to stay within — for implied volatility specifically, `brentq` with a bracket like `[0.001, 5.0]` is often the more robust choice in production code, since volatility is always positive and rarely needs to search outside that range.

## scipy.optimize.root for systems

`optimize.root` solves a *system* of nonlinear equations — several unknowns, several equations — rather than one function of one variable:

```python
def system(vars):
    x, y = vars
    return [x**2 + y**2 - 25, x - y - 1]   # circle intersect line

sol = optimize.root(system, x0=[3, 3])
print(sol.x, sol.success)
```

Use `root` when the quantities you're solving for are coupled — for example, jointly calibrating two linked model parameters against two market observables — rather than running two independent single-variable root-finds.

## Key terms

| Term | Meaning |
|---|---|
| `quad` | Adaptive numerical integration of a definite integral, with an error estimate |
| `solve_ivp` | Numerically integrates an ODE forward from an initial condition |
| `brentq` | Bracketed root-finder; the recommended default when a sign-changing interval is known |
| `newton` | Newton-Raphson / secant root-finder; needs a good starting guess, no bracket required |
| `root` | Solves a system of several nonlinear equations in several unknowns |

## Recap

Bond yield-to-maturity and option implied volatility are both root-finding problems in disguise: find the input that makes a model's output match an observed price. `brentq` is the robust default whenever you can bracket the root; `newton` trades that safety for speed when you only have a starting guess; and `root` extends the idea to coupled systems of equations. Next lesson: random number generation and reproducibility — the Monte Carlo foundation these pricing models often sit on top of.
