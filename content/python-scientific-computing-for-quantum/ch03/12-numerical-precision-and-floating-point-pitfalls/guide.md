# Numerical Precision & Floating-Point Pitfalls

Every `==` comparison you've written so far in this course has been quietly risky. This lesson explains why, with a famous one-line proof, and shows the two tools — `math.isclose` / `np.isclose` and `np.allclose` — that quantum computing code uses everywhere instead of exact equality.

## What you'll learn

- Why `0.1 + 0.2 == 0.3` is `False` in Python, and why that is not a bug
- What IEEE-754 double-precision floating point actually guarantees (and doesn't)
- How to use `math.isclose`, `np.isclose`, and `np.allclose` with sensible tolerances
- Why checking "is this state vector normalized" or "is this matrix unitary" must use a tolerance, never `==`
- How default tolerances can silently hide a real bug if you're not careful

## The famous proof: `0.1 + 0.2 != 0.3`

Run this in any Python interpreter:

```python
print(0.1 + 0.2)
# 0.30000000000000004

print(0.1 + 0.2 == 0.3)
# False
```

This is not a Python bug, and it is not unique to Python — the exact same result (`0.30000000000000004`) shows up in JavaScript, C, Java, and every other language using IEEE-754 double-precision floats, because the underlying binary representation is identical everywhere. `0.1` and `0.2` cannot be represented *exactly* in binary floating point (the same way `1/3` cannot be written exactly as a finite decimal) — so Python stores the closest representable double for each, adds those, and gets a result that is off from the mathematically "true" `0.3` by about `4 x 10^-17`, which is enough to fail an exact `==` check.

## What double precision actually gives you

A Python `float` (and a NumPy `float64` / the real/imaginary parts of a `complex128`) has about **15-17 significant decimal digits** of precision. That's extremely accurate for almost any computation — the error in `0.1+0.2` was in the 17th digit — but it means two numbers that are mathematically identical can come out of two different computation paths differing by a tiny amount in that last digit or two. The lesson isn't "floating point is broken"; it's "exact equality is the wrong tool for comparing computed floats, full stop."

## `math.isclose` and `np.isclose`

Both compare two numbers within a tolerance instead of demanding exact equality:

```python
import math

print(math.isclose(0.1 + 0.2, 0.3))
# True

import numpy as np
print(np.isclose(0.1 + 0.2, 0.3))
# True
```

`np.isclose(a, b)` checks `abs(a - b) <= atol + rtol * abs(b)`, using default tolerances `atol=1e-8` and `rtol=1e-5`. Since `abs(0.30000000000000004 - 0.3)` is only about `4.44 x 10^-17` — vastly smaller than `1e-8` — the check passes easily.

## The quantum case: is this probability really 1.0?

Recall from Lesson 10 that the state `(|0> + j|1>) / sqrt(2)` gives measurement probabilities that sum to `0.9999999999999998`, not a clean `1.0`:

```python
s = 1 / np.sqrt(2)
p0 = abs(complex(s, 0)) ** 2
p1 = abs(complex(0, s)) ** 2
total = p0 + p1
print(total)
# 0.9999999999999998

print(total == 1.0)
# False

print(np.isclose(total, 1.0))
# True
```

`abs(total - 1.0)` comes out to about `2.22 x 10^-16` — again far below the default `atol=1e-8` — so `np.isclose` correctly reports that this state *is* properly normalized, while plain `==` would incorrectly reject every single normalized state you ever construct this way. This is exactly why no real quantum-computing code checks `norm == 1.0`; it checks `np.isclose(norm, 1.0)`.

## The matrix version: `np.allclose`

The same problem applies to whole matrices, which is why Lesson 11's `is_unitary` and `is_hermitian` functions used `np.allclose` instead of `np.array_equal`:

```python
Y = np.array([[0, -1j], [1j, 0]])
product = Y @ Y.conj().T

print(np.array_equal(product, np.eye(2)))
# True for this particular case, but don't rely on that

print(np.allclose(product, np.eye(2)))
# True
```

For Y specifically, the entries of `Y @ Y.conj().T` happen to come out as exact integers (`1+0j` and `0+0j`), so `np.array_equal` also passes here. But that's a property of this one matrix, not a general guarantee — a matrix built from `np.sqrt(2)`, trigonometric functions, or any chain of several floating-point operations will almost never produce bit-for-bit exact entries, even when it is mathematically perfectly unitary. `np.allclose` is the check that works unconditionally; `np.array_equal`/`==` is the one that only works by accident.

## A real pitfall: loose tolerances hide real bugs

Tolerances are a double-edged tool. `np.isclose(a, b, atol=0.5)` would call almost anything "close," including a genuinely broken computation. The default NumPy tolerances (`atol=1e-8`, `rtol=1e-5`) are tuned for typical double-precision rounding error, not as a free pass to ignore differences:

```python
broken_total = 0.85   # suppose a bug produced this instead of ~1.0
print(np.isclose(broken_total, 1.0))
# False -- correctly caught, because 0.15 >> 1e-8
```

A difference on the order of `1e-16` is floating-point noise and should be waved through; a difference on the order of `0.15` is a real bug and must fail the check. The whole point of using the *default* tolerance (rather than loosening it "to make the test pass") is that it draws exactly that line.

## Key terms

| Term | Meaning |
|---|---|
| IEEE-754 double precision | The standard binary floating-point format Python `float`, NumPy `float64`, and `complex128` all use; gives roughly 15-17 significant decimal digits |
| Floating-point rounding error | The small, unavoidable gap between a mathematically exact result and its nearest representable binary value |
| `np.isclose(a, b)` | Checks `abs(a-b) <= atol + rtol*abs(b)`; the correct replacement for `==` on computed floats |
| `np.allclose(A, B)` | The array/matrix version of `np.isclose`; checks every entry is within tolerance |
| Tolerance (`atol`, `rtol`) | The absolute and relative thresholds below which two floats are considered "the same" |

## Check yourself

Suppose a teammate's code checks `np.isclose(computed_norm, 1.0, atol=0.2)` instead of the NumPy default `atol=1e-8`, and argues "it still passes, so the code is fine." Using the `broken_total = 0.85` example from this lesson, explain concretely what kind of real bug that loosened tolerance would now fail to catch.
