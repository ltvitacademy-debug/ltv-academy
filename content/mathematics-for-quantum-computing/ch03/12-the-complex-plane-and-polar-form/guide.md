# The Complex Plane & Polar Form

You now know how to add, subtract, and multiply complex numbers algebraically — but `a + bi` form hides something important: complex numbers have a natural picture, and that picture is exactly how physicists talk about a qubit's phase.

## What you'll learn

- How to plot a complex number `a + bi` as a point on the complex plane
- What modulus (`r`) and argument (`theta`) mean, and how to compute them from `a` and `b`
- How to convert a complex number between rectangular form (`a + bi`) and polar form (`r, theta`) in both directions
- Euler's formula, `e^(i*theta) = cos(theta) + i*sin(theta)`
- How polar form previews the idea of "phase" in a qubit state

## Plotting a complex number

A complex number `a + bi` can be plotted as a point on a 2D plane: the horizontal axis is the real part (`a`), and the vertical axis is the imaginary part (`b`). This is called the **complex plane**. The number `3 + 4i`, for instance, is the point 3 units right and 4 units up from the origin — exactly like plotting the point `(3, 4)` on an ordinary `x`-`y` grid, just with the axes relabeled "real" and "imaginary."

## Modulus and argument: the polar picture

Instead of describing that same point by how far right and how far up it is, you can describe it by:
- **Modulus (`r`)**: the straight-line distance from the origin to the point — how far the complex number is from zero
- **Argument (`theta`)**: the angle the line from the origin to the point makes with the positive real axis

These two numbers, `(r, theta)`, are called the **polar form** of the complex number, and they carry exactly the same information as `a + bi` — just organized as "how far, and in what direction" instead of "how far right, and how far up."

**Formulas** (from rectangular to polar):
```
r = sqrt(a^2 + b^2)
theta = atan2(b, a)
```
(`atan2` is just the ordinary arctangent, adjusted to give the correct angle in every quadrant — your calculator or any programming language has this function built in.)

**Formulas** (from polar back to rectangular):
```
a = r * cos(theta)
b = r * sin(theta)
```

## Worked example: rectangular to polar

Take `z = 3 + 4i` — the same number from the previous lesson.

```
r = sqrt(3^2 + 4^2) = sqrt(9 + 16) = sqrt(25) = 5
theta = atan2(4, 3) ≈ 0.9273 radians ≈ 53.13 degrees
```

So `z = 3 + 4i` in polar form is `r = 5`, `theta ≈ 53.13°`. You can sanity-check this: `5 * cos(53.13°) ≈ 3` and `5 * sin(53.13°) ≈ 4`, which recovers the original rectangular coordinates.

## Worked example: polar to rectangular

Now go the other direction. Take `r = 2`, `theta = 60°`.

```
a = 2 * cos(60°) = 2 * 0.5 = 1
b = 2 * sin(60°) = 2 * (sqrt(3)/2) ≈ 1.732
```

So the polar number `(r = 2, theta = 60°)` is `1 + 1.732i` (exactly, `1 + i*sqrt(3)`) in rectangular form.

## Euler's formula

There is a famous identity connecting the exponential function to sine and cosine, called **Euler's formula**:

**e^(i*theta) = cos(theta) + i*sin(theta)**

This says that `e^(i*theta)` is a complex number with modulus exactly 1 (it always lands on the unit circle, since `cos^2(theta) + sin^2(theta) = 1` for every angle), sitting at angle `theta` on the complex plane. You don't need to prove this identity right now — just recognize it on sight, because it is the standard shorthand physicists use to write a polar-form complex number of modulus 1: instead of writing `cos(theta) + i*sin(theta)`, they just write `e^(i*theta)`.

## Connecting to qubit phase

A general single-qubit state looks like `alpha|0> + beta|1>`, where `alpha` and `beta` are complex amplitudes (you'll formalize this fully in Lesson 14). Because each amplitude is a complex number, each one has its own modulus and argument — and the argument is exactly what physicists call **phase**.

Two useful distinctions, stated informally here and built on later in the course:
- **Global phase**: multiplying the *entire* state by a single `e^(i*theta)` factor (rotating both `alpha` and `beta` by the same angle). This turns out to be unobservable — it has no effect on any measurement you can perform on the qubit.
- **Relative phase**: a difference in angle *between* `alpha` and `beta` specifically (not a rotation applied to both equally). This one is physically real and observable — it's the angle difference that makes interference effects possible, and it's a big part of why quantum computing can do things classical bits cannot.

You don't need to compute with these yet — just notice that polar form is what makes "phase" a meaningful, measurable quantity in the first place. Without the angle `theta`, there would be no such thing as phase to talk about.

## Key terms

| Term | Meaning |
|---|---|
| Complex plane | A 2D plane where a complex number `a + bi` is plotted as the point with horizontal coordinate `a` and vertical coordinate `b` |
| Modulus (r) | The distance from the origin to a complex number's point on the complex plane; `r = sqrt(a^2 + b^2)` |
| Argument (theta) | The angle a complex number's point makes with the positive real axis, measured from the origin |
| Polar form | Writing a complex number as `(r, theta)` instead of `a + bi` |
| Euler's formula | The identity `e^(i*theta) = cos(theta) + i*sin(theta)`, describing a modulus-1 complex number at angle theta |
| Phase | The argument of a complex amplitude in a quantum state; distinguished into global phase (unobservable) and relative phase (observable) |

## Check yourself

Convert `z = -5 + 12i` to polar form (find `r` and `theta`), and briefly explain why its argument does not come out between 0° and 90° even though it is computed with the same formulas as `3 + 4i`.
