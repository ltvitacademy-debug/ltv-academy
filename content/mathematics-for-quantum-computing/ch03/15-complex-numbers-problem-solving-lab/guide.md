# Complex Numbers Problem-Solving Lab

No new theory in this lesson — just four fully worked problems that put Lessons 11 through 14 to work on fresh numbers, so the arithmetic becomes automatic before you move into eigenvalues and tensor products later in the course.

## What you'll learn

- How to multiply two complex numbers you haven't seen before, start to finish
- How to convert a new complex number from rectangular to polar form
- How to verify |z|^2 = z* · z for a number you haven't checked yet
- How to test whether a new pair of qubit amplitudes is normalized, and fix it if it isn't

## Problem 1: Multiply two complex numbers

**Problem:** Compute `z1 * z2` where `z1 = 2 + 3i` and `z2 = -1 + 4i`.

**Solution:** Distribute, then substitute `i^2 = -1`:
```
(2 + 3i)(-1 + 4i)
= 2(-1) + 2(4i) + 3i(-1) + 3i(4i)
= -2 + 8i - 3i + 12i^2
= -2 + 5i + 12(-1)
= -2 + 5i - 12
= -14 + 5i
```
**Answer:** `z1 * z2 = -14 + 5i`.

## Problem 2: Convert to polar form

**Problem:** Convert `z = 8 - 6i` to polar form (find `r` and `theta`).

**Solution:**
```
r = sqrt(8^2 + (-6)^2) = sqrt(64 + 36) = sqrt(100) = 10
theta = atan2(-6, 8) ≈ -36.87 degrees
```
**Answer:** `r = 10`, `theta ≈ -36.87°`. The angle comes out negative because the point `(8, -6)` sits below the real axis (positive real part, negative imaginary part) — a quick check: `10 * cos(-36.87°) ≈ 8` and `10 * sin(-36.87°) ≈ -6`, which recovers the original number.

## Problem 3: Verify |z|^2 = z* · z

**Problem:** For `z = -2 + 3i`, find `z*`, then compute `z* · z` and compare it to `|z|^2`.

**Solution:** The conjugate is `z* = -2 - 3i`. Multiplying:
```
(-2 - 3i)(-2 + 3i) = (-2)(-2) + (-2)(3i) + (-3i)(-2) + (-3i)(3i)
                    = 4 - 6i + 6i - 9i^2
                    = 4 + 9
                    = 13
```
Comparing to the modulus route: `|z| = sqrt((-2)^2 + 3^2) = sqrt(4 + 9) = sqrt(13)`, so `|z|^2 = 13`.

**Answer:** Both routes give `13` — the identity `|z|^2 = z* · z` checks out again on a number we hadn't used before.

## Problem 4: Check whether a qubit amplitude pair is normalized

**Problem (a):** Is `alpha = sqrt(3)/2`, `beta = (1/2)i` a valid, normalized qubit state?

**Solution:**
```
|alpha|^2 = (sqrt(3)/2)^2 = 3/4
|beta|^2  = (1/2)^2 = 1/4
|alpha|^2 + |beta|^2 = 3/4 + 1/4 = 1
```
**Answer:** Yes — this pair sums to exactly 1, so it's a valid, normalized qubit state.

**Problem (b):** Is `alpha = 2/3`, `beta = 2/3` normalized? If not, how would you fix it?

**Solution:**
```
|alpha|^2 = (2/3)^2 = 4/9
|beta|^2  = (2/3)^2 = 4/9
|alpha|^2 + |beta|^2 = 4/9 + 4/9 = 8/9
```
`8/9` does not equal 1, so this pair is **not normalized**. To fix it, divide both amplitudes by `sqrt(8/9)`, which would scale the total back up to exactly 1.

**Answer:** Not normalized (`8/9 ≠ 1`); dividing both amplitudes by `sqrt(8/9)` would correct it.

## Key terms

| Term | Meaning |
|---|---|
| Rectangular form | Writing a complex number as `a + bi`, using real and imaginary parts |
| Polar form | Writing a complex number as `(r, theta)`, using modulus and argument |
| Conjugate check | Verifying `|z|^2 = z* · z` by computing both sides independently and confirming they match |
| Normalization check | Computing `|alpha|^2 + |beta|^2` for a candidate qubit state and confirming it equals 1 |

## Check yourself

Work through a fifth problem on your own: is `alpha = 3/5`, `beta = -4i/5` a normalized qubit state? Compute `|alpha|^2 + |beta|^2` and state your conclusion. (Hint: compare this to a modulus calculation from an earlier lesson in this chapter — the numbers should look familiar.)
