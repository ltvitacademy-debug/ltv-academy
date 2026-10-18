# Basis, Span & Linear Independence

Lesson 1 showed that a vector's coordinates are only meaningful relative to a chosen set of reference directions. This lesson makes that precise: which sets of vectors actually qualify as a valid set of reference directions, and how to test a specific set by hand instead of guessing.

## What you'll learn

- What "span" means: every vector you can reach by combining a given set of vectors
- What a basis is, and why the computational basis {|0⟩, |1⟩} is the standard basis for a qubit
- How to test whether a specific set of vectors is linearly independent, using a determinant
- A worked example of an independent set and a worked example of a dependent set
- Why linear independence is exactly what guarantees a basis doesn't waste or duplicate information

## Span: everywhere you can reach from a set of vectors

The **span** of a set of vectors is the set of every vector you can build from them using only addition and scalar multiplication — every "linear combination." For example, the span of {[1, 0], [0, 1]} in R^2 is *all* of R^2, because any vector [a, b] can be written as a·[1, 0] + b·[0, 1]. The span of a single nonzero vector [1, 2] is just the line through the origin in that direction — every scalar multiple of [1, 2], and nothing else.

## Basis: a minimal spanning set

A **basis** for a vector space is a set of vectors that (1) spans the entire space, and (2) is linearly independent — meaning no vector in the set is redundant; none of them can be built from the others. A basis is the smallest possible "reference kit" that still reaches every point in the space.

R^2's **standard basis** is {[1, 0], [0, 1]}: two vectors, spanning all of R^2, with neither one reachable from the other. R^3's standard basis adds a third direction: {[1, 0, 0], [0, 1, 0], [0, 0, 1]}.

C^2's standard basis — called the **computational basis** in quantum computing — is exactly the same structure, with the quantum notation |0⟩ = [1, 0] and |1⟩ = [0, 1]. Every qubit state, no matter how it's written, is some combination c₀|0⟩ + c₁|1⟩ for complex numbers c₀, c₁ — which is just saying every vector in C^2 is a linear combination of the basis vectors, exactly as [a, b] = a[1,0] + b[0,1] in R^2.

## Linear independence: the test that makes a basis valid

A set of vectors is **linearly independent** if no vector in the set can be written as a combination of the others — equivalently, the only way to combine them to get the zero vector is to use all-zero coefficients. If a set *is* dependent, at least one vector is redundant: it adds no new reachable directions, and removing it doesn't shrink the span.

**For two vectors in R^2**, there's a fast test: form a 2×2 matrix from them and check whether the determinant is zero.

*Worked example — independent set.* Take **u** = [1, 2] and **v** = [3, 4]. Form the determinant:

det = (1)(4) − (2)(3) = 4 − 6 = **−2**

Since −2 ≠ 0, {[1, 2], [3, 4]} is linearly independent — neither vector is a scalar multiple of the other, and together they span all of R^2.

*Worked example — dependent set.* Take **u** = [1, 2] and **v** = [2, 4]. Form the determinant:

det = (1)(4) − (2)(2) = 4 − 4 = **0**

The determinant is zero, so this set is linearly **dependent** — and indeed, [2, 4] = 2·[1, 2]: the second vector is just a scalar multiple of the first. Both vectors point along the exact same line through the origin, so together they span only that line, not all of R^2 — one of them is entirely redundant.

**For three vectors in R^3**, the same idea extends to a 3×3 determinant. Take **u** = [1, 0, 1], **v** = [0, 1, 1], **w** = [1, 1, 0]:

det = 1·(1·0 − 1·1) − 0·(0·0 − 1·1) + 1·(0·1 − 1·1) = 1·(−1) − 0·(−1) + 1·(−1) = −1 − 0 − 1 = **−2**

Since −2 ≠ 0, these three vectors are linearly independent and form a valid basis for R^3.

## Why this matters for quantum computing

Every quantum gate you'll study is a matrix that transforms one basis representation into another. Before any of that is meaningful, you need to trust that the basis you're expressing a state in — {|0⟩, |1⟩}, or later a rotated basis like {|+⟩, |−⟩} — actually spans the space and wastes no information. A "basis" that's secretly dependent wouldn't let you uniquely decompose every qubit state, and uniqueness of a state's decomposition is something the whole theory depends on.

## Common mistake: assuming more vectors always means more span

Adding vectors to a set never shrinks its span, but it also doesn't guarantee a bigger one — if the new vector is already in the span of the others (dependent), the span doesn't grow at all. "More vectors" is not the same thing as "more reachable directions."

## Key terms

| Term | Meaning |
|---|---|
| Span | The set of all vectors reachable from a set of vectors via linear combinations |
| Basis | A linearly independent set of vectors that spans the entire space |
| Linear independence | No vector in the set can be written as a combination of the others; only the all-zero combination gives the zero vector |
| Computational basis | The standard basis {\|0⟩, \|1⟩} for a single qubit's state space C^2 |
| Determinant test | For n vectors in R^n, independence holds exactly when the determinant of the matrix formed from them is nonzero |

## Check yourself

Vectors **a** = [1, 1] and **b** = [2, 2] are both nonzero, but their determinant is (1)(2) − (1)(2) = 0. What does that tell you about the span of {**a**, **b**}, and why is this set unsuitable as a basis for R^2?
