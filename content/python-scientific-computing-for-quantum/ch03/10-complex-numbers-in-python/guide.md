# Complex Numbers in Python

Every qubit amplitude you will ever compute is a complex number, and Python has a complex number type built into the language itself — no import required. This lesson is the toolkit: how to write, combine, and interpret complex numbers in plain Python before NumPy enters the picture in the next two lessons.

## What you'll learn

- How to write complex literals in Python (`3 + 4j`, not `3 + 4i`) and read `.real` / `.imag`
- How to add, multiply, conjugate, and take the modulus of a complex number
- How to convert between rectangular and polar form with `cmath.polar` and `cmath.rect`
- Why quantum amplitudes are complex numbers and how `abs(amplitude) ** 2` becomes a measurement probability
- Why a probability computed from complex amplitudes can come out as `0.9999999999999998` instead of a clean `1.0`

## Python's built-in complex type

Python uses `j` (not `i`) as the imaginary unit suffix, and `complex` numbers are a native type — `type(3+4j)` is `complex`, same tier as `int` and `float`:

```python
z = 3 + 4j
print(z)        # (3+4j)
print(z.real)   # 3.0
print(z.imag)   # 4.0
print(type(z))  # <class 'complex'>
```

You can also build one explicitly with the `complex(real, imag)` constructor — useful when the real and imaginary parts come from variables: `complex(3, 4)` is identical to `3 + 4j`.

## Arithmetic: addition and multiplication

Complex addition adds real and imaginary parts separately; complex multiplication uses the distributive rule with `j**2 == -1`. Take `z1 = 3+4j` and `z2 = 1-2j`:

```python
z1 = 3 + 4j
z2 = 1 - 2j

print(z1 + z2)   # (4+2j)
print(z1 * z2)   # (11-2j)
```

Both were hand-verified first: `(3+4j)+(1-2j) = (3+1) + (4-2)j = 4+2j`, and `(3+4j)*(1-2j) = 3(1) + 3(-2j) + 4j(1) + 4j(-2j) = 3 - 6j + 4j - 8j^2 = 3 - 2j + 8 = 11 - 2j` (since `j^2 = -1`). Python's own arithmetic gives exactly those results — the kind of basic check worth running once so you trust the type going forward.

## Conjugate and modulus

The **conjugate** flips the sign of the imaginary part (`.conjugate()` method); the **modulus** (`abs()`) is the distance from the origin in the complex plane, `sqrt(real**2 + imag**2)`:

```python
z1 = 3 + 4j

print(z1.conjugate())   # (3-4j)
print(abs(z1))          # 5.0
```

`abs(3+4j)` is a 3-4-5 right triangle in disguise: `sqrt(3**2 + 4**2) = sqrt(9+16) = sqrt(25) = 5.0`. This is the exact same `abs()` you already use on real numbers — Python overloads it to mean "modulus" for `complex`.

## Polar form with `cmath`

Every complex number can also be written as `r * (cos(theta) + j*sin(theta))`, where `r` is the modulus and `theta` is the angle from the positive real axis. The `cmath` module converts both ways:

```python
import cmath

z1 = 3 + 4j
r, theta = cmath.polar(z1)
print(r)       # 5.0
print(theta)   # 0.9272952180016122  (radians)

# converting back
back = cmath.rect(r, theta)
print(back)    # (3.0000000000000004+4j)
```

`cmath.polar` returns `(5.0, 0.9272952180016122)` — the same modulus `5.0` computed above, and an angle of about `0.9273` radians (roughly `53.13`<sup>o</sup>, since `3-4-5` triangles have that angle between the real axis and the hypotenuse). `cmath.rect` converting back lands on `3.0000000000000004+4j` rather than an exact `3+4j` — a first hint of the floating-point rounding that Lesson 12 covers in depth.

## Why this matters: quantum amplitudes are complex numbers

A qubit's state is a pair of complex numbers called **amplitudes**. For the state `(|0> + j|1>) / sqrt(2)`, the two amplitudes are:

```python
import math

s = 1 / math.sqrt(2)
amp0 = complex(s, 0)   # amplitude of |0>
amp1 = complex(0, s)   # amplitude of |1>

print(amp0)   # (0.7071067811865475+0j)
print(amp1)   # 0.7071067811865475j
```

The **measurement probability** of each outcome is the modulus of its amplitude, squared — `abs(amplitude) ** 2`:

```python
p0 = abs(amp0) ** 2
p1 = abs(amp1) ** 2
print(p0)         # 0.4999999999999999
print(p1)         # 0.4999999999999999
print(p0 + p1)    # 0.9999999999999998
```

Each number here was confirmed, not guessed: `s = 1/sqrt(2) = 0.7071067811865475`, and squaring it gives `0.4999999999999999` — not a perfectly clean `0.5`, because `s` itself is already a rounded floating-point value before it's even squared. Adding the two probabilities gives `0.9999999999999998`, not exactly `1.0`. Physically the probabilities must sum to exactly 1 (the qubit is measured as `|0>` or `|1>` with certainty); numerically, in double-precision floating point, they come out a hair short. This gap — real, reproducible, and completely expected — is exactly why quantum code never compares a computed probability or norm to `1.0` with `==`, which Lesson 12 covers next.

## Key terms

| Term | Meaning |
|---|---|
| `j` | Python's imaginary unit suffix (`4j` means `4i` in math notation); Python never uses `i` for this |
| Modulus (`abs()`) | The distance of a complex number from the origin, `sqrt(real**2 + imag**2)` — physically, the amplitude's magnitude |
| Conjugate (`.conjugate()`) | Flips the sign of the imaginary part only; leaves the real part unchanged |
| Polar form | A complex number written as `(r, theta)` — modulus and angle — instead of `(real, imag)`; converted with `cmath.polar` / `cmath.rect` |
| Amplitude | A complex number attached to a quantum basis state; `abs(amplitude) ** 2` gives the probability of measuring that state |

## Check yourself

For the state `(|0> - j|1>) / sqrt(2)`, the two amplitudes are `amp0 = 1/sqrt(2)` and `amp1 = -j/sqrt(2)`. Without running any code, what do you expect `abs(amp1) ** 2` to equal, and why does the minus sign in front of `j` not change that answer at all?
