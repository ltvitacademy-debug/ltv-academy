# Complex Conjugates & Magnitude

You can already compute a complex number's modulus directly from its real and imaginary parts using `sqrt(a^2 + b^2)`. There's a second way to get the same answer — multiplying a complex number by its "mirror image" — and that second route is the exact calculation quantum computing uses to turn amplitudes into probabilities.

## What you'll learn

- What the complex conjugate of a number is, and how to find it
- Why `z * conjugate(z)` always produces a real, non-negative number
- The identity `|z|^2 = z* \cdot z` (verified numerically, not just stated)
- Why this exact calculation is how Born-rule probabilities will be computed later in the course

## The complex conjugate

The **complex conjugate** of `z = a + bi`, written `z*` (or sometimes `z̄`), is formed by flipping the sign of the imaginary part only:

**z* = a - bi**

Geometrically, this reflects the point across the real axis on the complex plane — same real part, opposite imaginary part. For example, the conjugate of `3 + 4i` is `3 - 4i`, and the conjugate of `2 - 5i` is `2 + 5i`. Conjugating twice gets you back where you started: `(z*)* = z`.

## Why z * z* is always real

Multiply a complex number by its own conjugate and watch what happens to the imaginary part. Using `z = a + bi` and `z* = a - bi` in general:

```
z * z* = (a + bi)(a - bi)
       = a^2 - abi + abi - b^2 i^2
       = a^2 - b^2(-1)
       = a^2 + b^2
```

The cross terms (`-abi` and `+abi`) cancel exactly, and the `i^2` term flips sign and becomes positive. The result, `a^2 + b^2`, is a real number — no `i` left at all — and it's always zero or positive, since it's a sum of two squares.

## Worked numerical example

Take `z = 3 + 4i` again, so `z* = 3 - 4i`. Multiply them directly:

```
(3 + 4i)(3 - 4i) = 3(3) + 3(-4i) + 4i(3) + 4i(-4i)
                 = 9 - 12i + 12i - 16i^2
                 = 9 - 16(-1)
                 = 9 + 16
                 = 25
```

Now compare that to computing `|z|^2` the way you learned in the previous lesson: `|z| = sqrt(3^2 + 4^2) = sqrt(25) = 5`, so `|z|^2 = 25`. Both routes give exactly 25 — confirming the identity:

**|z|^2 = z* · z**

This matches for every complex number, not just this one: squaring the modulus and multiplying by the conjugate are two different-looking calculations that always produce the identical real number.

## Why this matters for quantum computing (preview)

A qubit's amplitude, say `alpha`, is a complex number. Later in this course (in the chapter on measurement) you'll learn the **Born rule**: the probability of measuring a particular outcome is `|alpha|^2` — the squared modulus of the amplitude. You now know exactly how that squared modulus gets computed in practice: multiply the amplitude by its own conjugate, `alpha* · alpha`, and the result is guaranteed to be a real, non-negative number — which is exactly the property a probability needs to have (you can't have a probability that's negative, or one that's a complex number). This lesson isn't teaching you probability yet — that's a later chapter — but it is giving you the one piece of complex-number machinery that makes the Born rule's arithmetic work at all.

**Common mistake:** confusing `|z|` (the modulus, a single non-negative real number) with `z*` (the conjugate, which is itself a full complex number, just with the imaginary part negated). They're related — `|z|^2 = z* \cdot z` — but they are not the same kind of object.

## Key terms

| Term | Meaning |
|---|---|
| Complex conjugate (z*) | The number formed from `z = a + bi` by negating only the imaginary part: `z* = a - bi` |
| Modulus (\|z\|) | The non-negative real number `sqrt(a^2 + b^2)`, representing distance from the origin |
| \|z\|^2 = z* · z | The identity showing that squaring the modulus and multiplying by the conjugate give the same real result |
| Born rule (preview) | The quantum rule that a measurement probability equals the squared modulus of the corresponding amplitude; formalized in a later chapter |

## Check yourself

Let `z = 1 - i`. Find `z*`, then compute `z* · z` by hand and compare it to `|z|^2` computed directly from `sqrt(a^2+b^2)` squared. Do the two numbers match?
