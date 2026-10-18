# Orthonormal Bases & Projections

You've checked whether individual vectors are unit length and whether pairs of vectors are orthogonal. This lesson puts both ideas to work at once — a basis that is simultaneously all of those things — and introduces the operator that does exactly what "picking out one component" means in quantum mechanics: the projection.

## What you'll learn

- The two-part test for an orthonormal basis: unit norm, and zero inner product between distinct vectors
- A worked orthonormality check on a specific basis of C^2
- The projection operator `|0><0|` built as an outer product
- A worked example applying a projection to a specific vector and verifying the result
- Why projections are the mathematical object behind "the component of a state along a given direction"

## The orthonormal basis test

A set of vectors `{e_1, e_2, ..., e_n}` is an **orthonormal basis** if two conditions hold for every pair:

1. **Unit norm:** `<e_i|e_i> = 1` for every `i` (each vector has length 1).
2. **Orthogonality:** `<e_i|e_j> = 0` whenever `i ≠ j` (every distinct pair is "perpendicular" in the inner-product sense).

Both conditions get checked using the same inner product you already know how to compute — there's no new machinery here, just a specific pair of properties to verify.

## Worked example: testing a basis for orthonormality

Let `e_1 = (1/sqrt(2))(1, 1)` and `e_2 = (1/sqrt(2))(1, -1)` — the two columns of the Hadamard matrix from the previous lesson, which makes this basis directly relevant to how that gate acts.

**Check `<e_1|e_1>`:** `(1/sqrt(2))(1/sqrt(2))[1*1 + 1*1] = (1/2)(2) = 1`. Pass.

**Check `<e_2|e_2>`:** `(1/2)[1*1 + (-1)*(-1)] = (1/2)(2) = 1`. Pass.

**Check `<e_1|e_2>`:** `(1/2)[1*1 + 1*(-1)] = (1/2)(1 - 1) = 0`. Pass.

All three conditions hold, so `{e_1, e_2}` is an orthonormal basis of C^2.

## The projection operator as an outer product: `|0><0|`

An **outer product** `|a><b|` (as opposed to the inner product `<a|b|>`) builds a *matrix* out of two vectors: `(|a><b|)_ij = a_i * (b_j)*`. The projection operator onto the standard basis vector `|0> = (1, 0)` is `P_0 = |0><0|`. Working out the outer product entry by entry:

```
P_0 = |0><0| = [[1*1, 1*0], [0*1, 0*0]] = [[1, 0], [0, 0]]
```

`P_0` is itself just a 2x2 matrix — but one with a very specific job: applied to any vector, it keeps only the "amount of `|0>`" in that vector and zeroes out everything else.

## Worked example: applying `P_0` to a specific vector

Let `|psi> = (0.6, 0.8i)` — check first that it's a valid normalized state: `||psi||^2 = 0.6^2 + |0.8i|^2 = 0.36 + 0.64 = 1`. Good, it's normalized.

Apply `P_0`:

```
P_0 |psi> = [[1, 0], [0, 0]] * (0.6, 0.8i) = (1*0.6 + 0*0.8i, 0*0.6 + 0*0.8i) = (0.6, 0)
```

Notice what happened: the second component (the `|1>` part) was zeroed out, and the first component passed through unchanged. Compare this to computing `<0|psi>` directly: `<0|psi> = (1)*(0.6) + (0)*(0.8i) = 0.6`. The projection result `(0.6, 0)` is exactly `<0|psi>` times `|0>` — this is the general pattern: `P_0|psi> = <0|psi> |0>`, always. The number `<0|psi>` is the "amount of `|0>`" inside `|psi>`, and the projection operator is the matrix that extracts exactly that piece and discards the rest.

## Why this matters for quantum computing

When a qubit in state `|psi> = a|0> + b|1>` is measured in the standard basis, the projection operators `|0><0|` and `|1><1|` are exactly the mathematical objects that isolate each possible outcome's component. `<0|psi>` is the amplitude for the `|0>` outcome, and — tying straight back to the inner product preview from Lesson 21 — `|<0|psi>|^2` is the probability of actually measuring `|0>`. Orthonormal bases matter here too: measurement only makes clean probabilistic sense when you're projecting onto the directions of an orthonormal basis, because then the projections of a state onto each basis direction don't "double count" any part of it, and their outcome probabilities add up correctly to 1.

## Key terms

| Term | Meaning |
|---|---|
| Orthonormal basis | A basis where every vector has norm 1 and every distinct pair has inner product 0 |
| Outer product `\|a><b\|` | A matrix with entries `a_i * (b_j)*`; distinct from the inner product, which produces a number, not a matrix |
| Projection operator | `P = \|e><e\|` for a unit vector `\|e>`; applied to any vector, it extracts the component along `\|e>` and zeroes out the rest |
| Amplitude | The number `<e\|psi>` produced when projecting `\|psi>` onto a basis direction `\|e>`; its magnitude-squared gives a measurement probability |

## Check yourself

Using `P_1 = |1><1|` where `|1> = (0, 1)`, compute `P_1` as a matrix, then apply it to the same `|psi> = (0.6, 0.8i)` used above. What do you get, and how does it relate to `P_0|psi>` and the original vector `|psi>`?
