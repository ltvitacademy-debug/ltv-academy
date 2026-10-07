# Ordinary Differential Equations Basics

An ordinary differential equation (ODE) describes how a quantity changes by relating it to its own derivative, rather than giving you a direct formula. This sounds abstract, but it is exactly how continuously compounded interest, the Vasicek short-rate model, and the deterministic part of the Black-Scholes partial differential equation are all expressed. This lesson covers first-order linear ODEs — the type you can usually solve by hand — and a numerical method for the rest.

## What you'll learn

- What an ODE is, and the difference between a general and a particular solution
- How to solve first-order linear ODEs of the form $y' + p(t) y = q(t)$ using an integrating factor
- The exponential growth/decay equation $y' = ky$, and why it describes continuous compounding
- Euler's method, the simplest way to solve an ODE numerically when no closed form exists

## What an ODE is

An ODE is an equation involving a function and its derivative(s), such as $y'(t) = f(t, y(t))$. A **solution** is a function $y(t)$ that satisfies the equation for all $t$ in some interval. Because differentiation loses the constant of integration, solving an ODE generally produces a **general solution** with one free constant per order of the equation; pinning down that constant requires an **initial condition**, such as $y(0) = y_0$, giving a **particular solution**.

## The exponential equation: continuous compounding

The simplest and most important ODE in finance is:

$$y'(t) = k \, y(t), \qquad y(0) = y_0$$

Separating variables, $\frac{dy}{y} = k\, dt$, and integrating both sides gives $\ln|y| = kt + C$, so

$$y(t) = y_0 e^{kt}$$

If $y(t)$ is the value of a bank account and $k=r$ is the continuously compounded interest rate, this is exactly the continuous-compounding growth formula you likely already use. The same equation with $k < 0$ describes exponential decay — radioactive decay, or the decay of a bond's remaining time value in certain simplified models.

## First-order linear ODEs and the integrating factor

The general first-order linear ODE has the form:

$$y'(t) + p(t)\, y(t) = q(t)$$

The standard technique multiplies both sides by an **integrating factor** $\mu(t) = e^{\int p(t)\, dt}$, chosen specifically so that the left side becomes the derivative of a product:

$$\frac{d}{dt}\big[\mu(t)\, y(t)\big] = \mu(t)\, q(t)$$

Integrating both sides and dividing by $\mu(t)$ solves for $y(t)$.

**Worked example — the Vasicek short-rate model (deterministic part).** The Vasicek model for the instantaneous interest rate $r(t)$ has drift $dr = a(b - r)\,dt + \dots$; looking only at the deterministic ODE $r'(t) = a(b - r(t))$, rewrite it as $r'(t) + a\, r(t) = ab$. Here $p(t) = a$ (constant) and $q(t)=ab$, so $\mu(t) = e^{\int a\, dt} = e^{at}$. Then:

$$\frac{d}{dt}\big[e^{at} r(t)\big] = ab\, e^{at} \;\Longrightarrow\; e^{at} r(t) = b\, e^{at} + C \;\Longrightarrow\; r(t) = b + C e^{-at}$$

Using $r(0) = r_0$ gives $C = r_0 - b$, so

$$r(t) = b + (r_0 - b) e^{-at}$$

This says the rate **mean-reverts**: it decays exponentially from its starting value $r_0$ toward the long-run mean $b$, at a speed controlled by $a$ — precisely the behavior the Vasicek model is designed to capture, and exactly why $a$ is called the mean-reversion speed.

## Euler's method: solving numerically

Most ODEs that show up in practice (anything with randomness, or nonlinear drift) have no closed form. **Euler's method** approximates the solution by taking small steps along the direction given by the derivative itself:

$$y_{n+1} = y_n + h \cdot f(t_n, y_n)$$

where $h$ is a small step size. This is literally a rearrangement of the derivative's definition — treating $y' \approx \Delta y / h$ and solving for $\Delta y$.

```python
import numpy as np

a, b, r0 = 0.5, 0.03, 0.08   # Vasicek mean-reversion speed, long-run mean, start
h = 0.01
n_steps = 1000

r = r0
path = [r]
for _ in range(n_steps):
    r = r + h * a * (b - r)   # Euler step: r_{n+1} = r_n + h f(t, r_n)
    path.append(r)

exact_at_T = b + (r0 - b) * np.exp(-a * (n_steps * h))
print(f"Euler estimate: {path[-1]:.6f}   exact: {exact_at_T:.6f}")
# Euler estimate: 0.030333   exact: 0.030337
```

With a small enough step size $h$, Euler's method tracks the exact solution closely — the same numerical idea scales up to the stochastic differential equations used to simulate interest rates and stock prices under randomness.

## Key terms

| Term | Meaning |
|---|---|
| Ordinary differential equation (ODE) | An equation relating a function to its own derivative(s) |
| General / particular solution | A solution family with a free constant / one pinned down by an initial condition |
| Integrating factor | $\mu(t)=e^{\int p(t)dt}$, used to solve first-order linear ODEs |
| Mean reversion | A quantity that decays exponentially toward a long-run level, as in Vasicek's $r(t)$ |
| Euler's method | Numerically stepping an ODE forward using $y_{n+1}=y_n+h f(t_n,y_n)$ |

## Recap

An ODE relates a function to its own derivative, and the simplest case, $y'=ky$, is exactly continuous compounding; the integrating factor solves the broader first-order linear case, revealing the mean-reverting shape behind the Vasicek short-rate model. When no closed form exists, Euler's method steps forward numerically using nothing more than the derivative's own definition. This closes Chapter 1 on calculus; next up, Chapter 2 begins with Lesson 6: Vectors, Matrices & Linear Maps.
