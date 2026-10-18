# Operators Problem-Solving Lab

No new theory in this lesson — just four fresh problems that make you run the exact tools from the last four lessons on numbers you haven't seen before: an inner product, a Hermitian check, a unitary check, and a probability-style inner product. Work each one with pencil and paper before reading the solution.

## What you'll learn

- How to compute a complex inner product on a fresh pair of vectors, start to finish
- How to run the full Hermitian test on a new matrix, including a classic quantum-gate example
- How to run the full unitary test on a new matrix, including spotting why normalization matters
- How to connect an inner product computation back to a measurement-probability interpretation

## Problem 1: compute the inner product

Let `|a> = (2-i, i)` and `|b> = (1+i, 3)`. Find `<a|b>`.

**Solution.** Conjugate the entries of `|a>` first: `(2-i)* = 2+i` and `(i)* = -i`.

- Term 1: `(2+i)(1+i) = 2 + 2i + i + i^2 = 2 + 3i - 1 = 1 + 3i`
- Term 2: `(-i)(3) = -3i`

Sum: `<a|b> = (1 + 3i) + (-3i) = 1`. Everything imaginary cancelled, leaving a real result: `<a|b> = 1`. (As a sanity check using the conjugate-symmetry rule from Lesson 21, `<b|a>` must equal `<a|b>* = 1* = 1` — and indeed it works out to 1 as well, since a real number is its own conjugate.)

## Problem 2: is this matrix Hermitian?

Let `M = [[0, -i], [i, 0]]` — this is the **Pauli Y matrix**, one of the three single-qubit Pauli operators you'll meet again when you study quantum gates. Determine whether `M` is Hermitian.

**Solution.** Check the diagonal: `M_11 = 0` and `M_22 = 0` — both real. Pass. Check the off-diagonal pair: `M_12 = -i`, and `M_21 = i`. Conjugating `M_12`: `(-i)* = i`, which matches `M_21` exactly. Pass. Both conditions hold, so `M` is Hermitian.

Since `M` is Hermitian, its eigenvalues must be real. Confirming: `trace(M) = 0 + 0 = 0`, and `det(M) = (0)(0) - (-i)(i) = 0 - (-i^2) = 0 - 1 = -1`. Solving `lambda^2 - 0*lambda - 1 = 0` gives `lambda = ±1` — real, as expected.

## Problem 3: is this matrix unitary?

Let `N = (1/sqrt(2)) * [[1, i], [i, 1]]`. Determine whether `N` is unitary by checking `N^dagger N = I`.

**Solution.** First find `N^dagger`: transpose `N` (which swaps nothing here, since the off-diagonal entries are equal) and conjugate every entry: `N^dagger = (1/sqrt(2)) * [[1, -i], [-i, 1]]`.

Now multiply `N^dagger N`:

- Entry (1,1): `(1/2)[(1)(1) + (-i)(i)] = (1/2)[1 - i^2] = (1/2)[1+1] = 1`
- Entry (1,2): `(1/2)[(1)(i) + (-i)(1)] = (1/2)[i - i] = 0`
- Entry (2,1): `(1/2)[(-i)(1) + (1)(i)] = (1/2)[-i + i] = 0`
- Entry (2,2): `(1/2)[(-i)(i) + (1)(1)] = (1/2)[1 + 1] = 1`

`N^dagger N = [[1, 0], [0, 1]] = I`. `N` is unitary.

**A warning this problem is built to catch:** if you had forgotten the `1/sqrt(2)` normalizing factor and tested `N_unnormalized = [[1, i], [i, 1]]` directly, you'd get `N_unnormalized^dagger N_unnormalized = [[2, 0], [0, 2]] = 2I`, not `I` — a matrix that looks almost identical but fails the unitary test entirely. Always carry the normalization through the whole computation, and always check the result equals `I` exactly, not just "a multiple of the identity."

## Problem 4: connect an inner product to a measurement probability

Let `|psi> = (1/sqrt(2))(1, 1)` (an equal superposition of `|0>` and `|1>`) and `|phi> = (1, 0) = |0>`. Compute `<psi|phi>` and `|<psi|phi>|^2`.

**Solution.** `<psi|phi> = (1/sqrt(2))*(1)*(1) + (1/sqrt(2))*(1)*(0) = 1/sqrt(2) ≈ 0.7071`, a real number here since every entry involved was real. Squaring its magnitude: `|<psi|phi>|^2 = (1/sqrt(2))^2 = 1/2`.

As previewed in Lesson 21 and sharpened in Lesson 24, this is exactly the shape of a measurement-probability calculation: if a qubit is prepared in the equal-superposition state `|psi>`, the probability of measuring it in state `|0>` works out to `|<0|psi>|^2 = 1/2` — a clean 50/50 result, matching the intuition that "equal superposition" should mean "equal chance" when measured in the standard basis. The full justification (the Born rule) is still ahead in Chapter 7, but the computation itself is something you can already do with full confidence.

## Key terms

| Term | Meaning |
|---|---|
| Inner product check | Conjugate the first vector's entries, multiply term by term with the second vector's entries, and sum |
| Hermitian check | Real diagonal, and off-diagonal entries that are conjugates of each other (`A_12 = (A_21)*`) |
| Unitary check | Compute `U^dagger` (conjugate transpose), multiply by `U`, and confirm the result is exactly `I` |
| Pauli Y | The matrix `[[0,-i],[i,0]]`, Hermitian with eigenvalues `±1`; one of the three single-qubit Pauli operators |

## Check yourself

Take `|c> = (i, 1-i)` and `|d> = (2, i)`. Compute `<c|d>` from scratch, then state whether the result is real, purely imaginary, or neither, and explain what that tells you about `<d|c>` using the conjugate-symmetry rule.
