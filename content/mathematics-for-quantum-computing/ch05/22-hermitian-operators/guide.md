# Hermitian Operators

The inner product gave you a way to measure overlap between states. The next question is what kind of matrix is allowed to represent something you can actually *measure* — an energy, a spin, a position. The answer is a specific kind of matrix called Hermitian, and the "why" connects directly to a fact you already rely on every day: measurement results are real numbers, never complex ones.

## What you'll learn

- The definition of a Hermitian matrix: `A = A^dagger` (A equals its own conjugate transpose)
- How to check whether a specific 2x2 complex matrix is Hermitian, with a worked yes and a worked no
- Why Hermitian matrices always have real eigenvalues, demonstrated on a concrete example
- Why quantum observables (energy, spin, position) are represented by Hermitian operators
- A quick visual shortcut for spotting Hermitian matrices by eye

## The definition: `A = A^dagger`

For a matrix `A`, the **conjugate transpose** `A^dagger` (also written `A*` or `A^H` in some texts) is formed by transposing `A` and conjugating every entry. A matrix is **Hermitian** if it equals its own conjugate transpose: `A = A^dagger`. Concretely, for a 2x2 matrix this means two things have to hold at once:

1. The diagonal entries must be real (a complex number only equals its own conjugate if its imaginary part is zero).
2. The off-diagonal entries must be conjugates of each other: `A_12 = (A_21)*`.

## Worked example: verifying A IS Hermitian

Let `A = [[2, 1-2i], [1+2i, -1]]`.

**Check the diagonal:** `A_11 = 2` and `A_22 = -1` — both real. Pass.

**Check the off-diagonal pair:** `A_12 = 1-2i` and `A_21 = 1+2i`. Conjugating `A_12` gives `(1-2i)* = 1+2i`, which matches `A_21` exactly. Pass.

Both conditions hold, so `A` is Hermitian: `A = A^dagger`.

## Worked example: verifying B is NOT Hermitian

Let `B = [[1, 2+i], [3-i, 4]]`.

**Check the diagonal:** `B_11 = 1` and `B_22 = 4` — both real. Pass.

**Check the off-diagonal pair:** `B_12 = 2+i` and `B_21 = 3-i`. Conjugating `B_12` gives `(2+i)* = 2-i`. Compare to `B_21 = 3-i` — these are *not* equal (`2-i ≠ 3-i`). Fail.

Since the off-diagonal condition fails, `B ≠ B^dagger`, so `B` is not Hermitian — even though every diagonal entry was real. Both checks have to pass; a real diagonal alone is never enough.

## Hermitian matrices always have real eigenvalues

This is the property that makes Hermitian operators useful in physics, and it's worth confirming on the matrix above rather than taking it on faith. For a 2x2 matrix, the eigenvalues solve `lambda^2 - (trace)*lambda + det = 0`.

For `A = [[2, 1-2i], [1+2i, -1]]`:

- `trace = 2 + (-1) = 1`
- `det = (2)(-1) - (1-2i)(1+2i) = -2 - (1 + 4) = -2 - 5 = -7`

(Note `(1-2i)(1+2i) = 1^2 + 2^2 = 5`, since a complex number times its own conjugate always gives the sum of squares of real and imaginary parts.)

Solving `lambda^2 - lambda - 7 = 0` gives `lambda = (1 ± sqrt(1 + 28)) / 2 = (1 ± sqrt(29)) / 2`, i.e. `lambda_1 ≈ 3.1926` and `lambda_2 ≈ -2.1926`. Both are real numbers, even though `A` itself has complex off-diagonal entries. This isn't a coincidence of this particular matrix — it's a theorem: **every Hermitian matrix has only real eigenvalues**, no matter how complex its entries look.

## Why this matters for quantum computing: observables must be Hermitian

In quantum mechanics, every measurable physical quantity — energy, spin along an axis, position — is represented by an **observable**, and observables are modeled as Hermitian operators. The reason is now exactly the fact you just confirmed numerically: when you measure an observable, the possible outcomes are its eigenvalues, and a measurement result has to come out as an ordinary real number — you can't get "3+2i joules" off a real measuring device. Hermitian matrices are precisely the matrices guaranteed to have real eigenvalues no matter how complex-looking the matrix itself is, so they're the only matrices that can safely represent something you physically measure. A non-Hermitian matrix like `B` above could have complex eigenvalues, which makes it unusable as an observable, even though it's a perfectly fine matrix mathematically.

## A visual shortcut

Once you've seen a few, you can often tell Hermitian-ness by eye: the diagonal has to "look real" (no visible `i`), and the off-diagonal pair has to be mirror images across the diagonal with a flipped sign on the imaginary part. `A`'s off-diagonal pair `1-2i` and `1+2i` mirrors perfectly; `B`'s pair `2+i` and `3-i` doesn't — different real parts, which is an instant disqualifier.

## Key terms

| Term | Meaning |
|---|---|
| Conjugate transpose `A^dagger` | Transpose `A`, then conjugate every entry; also written `A*` or `A^H` |
| Hermitian matrix | A matrix satisfying `A = A^dagger`: real diagonal, and off-diagonal entries that are conjugates of each other |
| Eigenvalue | A scalar `lambda` such that `A v = lambda v` for some nonzero vector `v`; for 2x2 matrices found via `lambda^2 - (trace)lambda + det = 0` |
| Observable | A measurable physical quantity (energy, spin, position) represented in quantum mechanics by a Hermitian operator |

## Check yourself

The matrix `C = [[0, i], [-i, 0]]` has a purely real (zero) diagonal and off-diagonal entries `i` and `-i`. Is `C` Hermitian? Work through both conditions, and state what you can conclude about its eigenvalues without actually solving the characteristic equation.
