# Documenting Numerical Results Honestly

"Fidelity = 0.9987" is a claim. "Fidelity = 0.9987, computed via `np.allclose` at `atol=1e-8` against the ideal Bell state, averaged over 10,000 simulated shots with seed 42" is a result someone else can actually check, challenge, or reproduce. The difference between those two sentences is most of what "honest documentation" means in scientific computing.

## What you'll learn

- Why a bare number isn't a reproducible scientific claim
- How to report precision and tolerance alongside a result, not instead of it
- Why `==` is often the wrong way to compare floating-point numbers, and what to say instead
- How to document a result's inputs (seed, shot count, tolerance) so someone else can rerun it
- The difference between rounding for readability and silently hiding precision limits

## A number without context isn't a result

Suppose you compute the overlap between a simulated state `psi = [0.6, 0.8]` and a reference state `phi = [1, 0]`, and report "fidelity = 0.36." That number is correct — `0.6*1 + 0.8*0 = 0.6`, and fidelity is the squared overlap, `0.6^2 = 0.36`, both computed directly — but reported alone it tells a reader nothing about *how* it was computed, what `psi` and `phi` actually were, or whether 0.36 is good or bad for this experiment. Honest documentation means writing the claim with enough surrounding information that someone else could, in principle, recompute 0.36 themselves and get the same answer:

```python
import numpy as np

psi = np.array([0.6, 0.8])
phi = np.array([1.0, 0.0])

overlap = np.dot(phi, psi)
fidelity = overlap ** 2
print(fidelity)
# 0.36
```

"Fidelity between the simulated state `psi = [0.6, 0.8]` and reference state `phi = [1, 0]` is 0.36, computed as the squared inner product `|<phi|psi>|^2`" is a documented result. "Fidelity = 0.36" alone is just a number.

## Floating-point numbers don't compare with `==`

A subtle but common documentation mistake is implying exact equality where floating-point arithmetic can't actually deliver it. This is not a quantum-specific quirk — it's a basic property of how computers represent decimal numbers in binary (IEEE-754 double precision), and it shows up immediately even in simple addition:

```python
print(0.1 + 0.2)
# 0.30000000000000004
print(0.1 + 0.2 == 0.3)
# False
```

Both lines were confirmed directly: adding 0.1 and 0.2 in double-precision floating point produces `0.30000000000000004`, not exactly `0.3`, because neither 0.1 nor 0.2 has an exact finite binary representation. If your code checks whether a computed quantum state is "normalized" (its probabilities sum to 1) or whether a matrix is "unitary," comparing with `==` will frequently fail even when the math is correct, purely from this kind of rounding. The honest fix is to say what you actually mean — "equal within a stated tolerance" — and to use a tolerance-based comparison and *document the tolerance*:

```python
norm_squared = 0.1 + 0.2 + 0.7   # should be exactly 1.0 mathematically
print(np.isclose(norm_squared, 1.0, atol=1e-8))
# True -- equal within a tolerance of 1e-8, not exactly bit-for-bit equal
```

## Report rounding as rounding, not as precision you don't have

Rounding a result for readability is fine — "fidelity ≈ 0.999" is easier to read than sixteen digits — but it should be labeled as rounding, not presented as if that's genuinely how precisely the quantity is known. Given a raw computed value like `0.99872345`, rounding to 4 decimal places gives `0.9987`, and rounding to 3 significant figures gives `0.999` — both of these are different, legitimate ways to round the *same* underlying number, which is exactly why the rounding method should be stated:

```python
measured = 0.99872345

rounded_4dp = round(measured, 4)
print(rounded_4dp)
# 0.9987

rounded_3sf = float(f"{measured:.3g}")
print(rounded_3sf)
# 0.999
```

"Fidelity = 0.9987" and "fidelity = 0.999" are both honest *if* each one states how it was rounded — they become dishonest only if presented as if they were different underlying measurements, or as more precise than the computation actually supports.

## What to include so a result is actually reproducible

A well-documented numerical result in a quantum-computing project typically states: the exact computation performed (e.g. "squared inner product with the ideal Bell state"), any random seed used (so sampled results can be regenerated exactly), the number of samples/shots (since more shots reduce statistical noise), and the comparison tolerance (since "equal" almost always means "equal within this tolerance" for floating-point results). Skipping any of these doesn't make the number wrong — it makes it unverifiable, which in research code is almost as bad.

## Key terms

| Term | Meaning |
|---|---|
| Fidelity | A measure (here, squared inner product) of how close a simulated quantum state is to a reference state; 1.0 means identical |
| Floating-point tolerance | A small allowed margin of error (e.g. `atol=1e-8`) used instead of exact `==` comparison for numbers computed with rounding error |
| `np.isclose(a, b, atol=...)` | Compares two floating-point values for equality within a stated absolute tolerance, rather than exact bit-for-bit equality |
| Reproducible documentation | Recording a result alongside enough detail (seed, shot count, tolerance, exact computation) that someone else can regenerate the same number |
| Significant figures vs. decimal places | Two different, equally valid rounding conventions that can produce different-looking roundings of the same underlying value |

## Check yourself

A colleague's lab notebook says only "Bell state fidelity = 1.0." What three pieces of missing information would you ask them to add before trusting that number as a reproducible result?
