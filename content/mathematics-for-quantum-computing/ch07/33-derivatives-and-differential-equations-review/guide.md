# Derivatives & Differential Equations Review

Quantum states evolve continuously over time, governed by a differential equation — the Schrödinger equation, which you'll meet formally in the Quantum Mechanics for Computing course. Before that, this lesson reviews exactly the calculus you need: derivatives as rates of change, and what a differential equation actually is, grounded in a real quantum-flavored example.

## What you'll learn

- Derivatives as instantaneous rate of change, reviewed with a real example
- Verifying a derivative numerically before trusting an analytic formula
- What a differential equation is, and why "the rate of change depends on the current state" is the pattern behind quantum evolution
- Why this calculus review matters specifically for understanding unitary time evolution later

## The derivative: instantaneous rate of change

A **derivative** measures how fast a function's output changes as its input changes, at a specific point — the slope of the function's graph at that exact point, not an average slope over some interval. Consider the function `f(θ) = cos(θ/2)²`, which is exactly the form of the measurement probability you'll see when studying single-qubit rotation gates (it's the probability of measuring `|0⟩` after a rotation by angle `θ`).

```python
import math

def f(theta):
    return math.cos(theta / 2) ** 2

theta = math.pi / 3
print(f"f(pi/3) = {f(theta)}")
```

```
f(pi/3) = 0.7500000000000001
```

## Verifying a derivative numerically before trusting the formula

The analytic derivative of `cos(θ/2)²` (using the chain rule) is `-sin(θ/2)cos(θ/2) = -0.5·sin(θ)`. Rather than trusting that formula blindly, verify it numerically using the definition of a derivative — a tiny step `h`, and the slope between `f(θ+h)` and `f(θ-h)`:

```python
h = 1e-6
theta = math.pi / 3

numerical_derivative = (f(theta + h) - f(theta - h)) / (2 * h)
analytic_derivative = -0.5 * math.sin(theta)

print(f"Numerical derivative: {numerical_derivative}")
print(f"Analytic derivative:  {analytic_derivative}")
```

```
Numerical derivative: -0.43301270186146823
Analytic derivative:  -0.4330127018922193
```

The two values agree to about 9 decimal places (the tiny remaining difference is the expected numerical approximation error from using a finite `h` rather than a true infinitesimal). This numerical-verification habit — checking an analytic formula against a direct numerical computation — is exactly the same discipline used throughout this course, now applied to calculus itself.

## What a differential equation actually is

A **differential equation** is an equation relating a function to its own derivative (or higher derivatives). The defining pattern that matters for quantum mechanics is: *the rate of change of a system depends on the system's own current state* — not on some external, time-varying input, but on where the system already is right now. A simple, familiar example: exponential decay, `dN/dt = -kN`, says "the rate at which a quantity decreases is proportional to how much of it currently remains" — which is exactly the shape of the mathematics behind radioactive decay, and structurally the same shape as the Schrödinger equation, which says the rate of change of a quantum state depends on the state itself (via the Hamiltonian operator).

## Why this matters for what's coming

In the Quantum Mechanics for Computing course, you'll meet the Schrödinger equation `iℏ d|ψ⟩/dt = Ĥ|ψ⟩` — at first glance, an intimidating piece of notation. Stripped to its calculus bones, it's saying exactly the pattern from this lesson: the state's rate of change (`d|ψ⟩/dt`) is determined by applying an operator (`Ĥ`, the Hamiltonian) to the state's current value (`|ψ⟩`). Recognizing that shape — "rate of change depends on current state, via some operator" — is what makes that equation approachable instead of mysterious.

## Key terms

| Term | Meaning |
|---|---|
| Derivative | The instantaneous rate of change of a function at a specific point |
| Differential equation | An equation relating a function to its own derivative(s) |
| Numerical derivative | Approximating a derivative directly from the function's definition, using a small step size, as a check against an analytic formula |

## Check yourself

Why is checking an analytic derivative formula against a numerical approximation a genuinely useful habit, rather than just extra unnecessary work, when you already "know" the calculus rule?
