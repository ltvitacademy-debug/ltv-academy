# Complex Exponentials & Oscillation

This final piece of calculus review brings together complex numbers (Chapter 3) and the exponential function: `e^(iθ)`, the complex exponential, is the mathematical object behind every phase you'll ever encounter in a quantum circuit — rotation gates, interference, and the oscillating behavior of a quantum state under time evolution all come back to this one formula.

## What you'll learn

- Euler's formula, verified numerically
- Why `e^(iθ)` traces out a circle, not a line
- Complex exponentials as the natural language for phase and rotation
- How this connects directly to rotation gates and quantum state evolution

## Euler's formula, verified

**Euler's formula** states `e^(iθ) = cos(θ) + i·sin(θ)` — a genuinely surprising identity connecting the exponential function to trigonometry through the imaginary unit. Verify it numerically at `θ = π/4`:

```python
import math

theta = math.pi / 4
print(f"cos(pi/4) = {math.cos(theta)}")
print(f"sin(pi/4) = {math.sin(theta)}")
```

```
cos(pi/4) = 0.7071067811865476
sin(pi/4) = 0.7071067811865475
```

So `e^(iπ/4) = 0.7071... + 0.7071...i` — the same `1/√2` value you've already seen repeatedly as the Hadamard gate's amplitude, now appearing as the real and imaginary parts of a complex exponential. This is not a coincidence: rotation gates are literally built from complex exponentials.

## Why `e^(iθ)` traces a circle

For a real number `x`, `e^x` grows without bound as `x` increases — it's a curve that shoots upward. For a purely imaginary exponent `iθ`, something completely different happens: since `cos(θ)` and `sin(θ)` are each always between `-1` and `1`, and `cos²(θ) + sin²(θ) = 1` for every `θ`, the point `(cos(θ), sin(θ))` always sits at distance exactly `1` from the origin in the complex plane — regardless of `θ`. As `θ` increases, `e^(iθ)` doesn't grow at all; it just moves around the unit circle. This is precisely the geometric picture behind every quantum phase: a phase is a position on the unit circle, not a magnitude.

## Complex exponentials as the language of rotation

Any rotation by angle `θ` — in the complex plane, or as you'll soon see, as a quantum gate's action on a qubit state — can be written using `e^(iθ)`. The phase gates from earlier courses (`S`, `T`) are defined exactly this way: `S = diag(1, e^(iπ/2))` and `T = diag(1, e^(iπ/4))`, meaning they multiply the `|1⟩` amplitude by a specific point on the unit circle, leaving its magnitude (and therefore the measurement probability) completely unchanged while shifting its phase. This is why phase gates are invisible to a measurement in the computational basis alone — they move a point around the unit circle, which doesn't change the point's distance from the origin, only its angle.

## The connection to quantum state evolution

A quantum state evolving under a constant energy `Ĥ` for time `t` picks up a phase factor of the form `e^(-iĤt/ℏ)` — the same complex exponential, now with the Hamiltonian operator in the exponent instead of a plain angle. This is the precise mathematical sense in which a quantum state "oscillates" over time: each energy component of the state rotates around the unit circle at a rate set by its own energy, and the resulting interference between different components is what produces the rich, structured dynamics quantum systems display — all built from the same `e^(iθ) = cos(θ) + i·sin(θ)` identity verified at the top of this lesson.

## Key terms

| Term | Meaning |
|---|---|
| Euler's formula | The identity e^(iθ) = cos(θ) + i·sin(θ), connecting the exponential function to trigonometry |
| Unit circle | The set of complex numbers at distance exactly 1 from the origin; e^(iθ) always lands here for real θ |
| Phase factor | A complex exponential e^(iθ) that changes a number's angle on the complex plane without changing its magnitude |

## Check yourself

Why does multiplying a quantum amplitude by a phase factor e^(iθ) never change the measurement probability associated with that amplitude, no matter what θ is?
