# Vector Spaces Problem-Solving Lab

No new theory today — this lab is four fully worked problems that reuse everything from this chapter (vectors and vector spaces, basis and independence, dot products and norms, and change of basis) on fresh numbers, explained step by step like worked solutions you'd see in a textbook answer key.

## What you'll learn

- How to carry an independence test through to its physical conclusion (what the dependent vectors actually represent)
- How to normalize a vector that is itself a famous quantum state in disguise
- How to solve a fresh change-of-basis problem end to end
- How to run a 3-vector independence test in R^3 and interpret a nonzero determinant

## Problem 1: Is {[2, 1], [4, 2]} linearly independent?

**Setup.** Form the determinant of the 2×2 matrix built from the two vectors:

det = (2)(2) − (1)(4) = 4 − 4 = **0**

**Conclusion.** The determinant is zero, so the set is linearly **dependent**. Checking directly: [4, 2] = 2·[2, 1] — the second vector is exactly twice the first. Both vectors point along the same line through the origin, so this pair cannot serve as a basis for R^2; it spans only a 1-dimensional line, not the full plane.

## Problem 2: Normalize the vector [1, 1]

**Setup.** Compute the norm first:

‖[1, 1]‖ = √(1² + 1²) = √2 ≈ **1.4142**

**Normalize.** Divide each coordinate by √2:

[1, 1] / √2 = **[1/√2, 1/√2] ≈ [0.7071, 0.7071]**

**Verify.** (1/√2)² + (1/√2)² = 1/2 + 1/2 = 1 — confirmed norm of exactly 1.

**Why this is worth noticing.** [1/√2, 1/√2] is exactly the quantum state commonly written |+⟩ = (1/√2)(|0⟩ + |1⟩) — one of the most frequently used states in quantum computing, the equal superposition of |0⟩ and |1⟩. Normalizing [1, 1] by hand is literally deriving the |+⟩ state's coordinates from scratch, and confirming it genuinely satisfies the norm-1 requirement from Lesson 3 (giving a 50%/50% measurement split between |0⟩ and |1⟩, since (1/√2)² = 0.5 for each).

## Problem 3: Express [4, 2] in the basis {b₁ = [1, 1], b₂ = [1, -1]}

**Setup.** Solve a·[1, 1] + b·[1, -1] = [4, 2], which gives two equations:

a + b = 4
a - b = 2

**Solve.** Adding the equations: 2a = 6, so **a = 3**. Substituting into the first equation: 3 + b = 4, so **b = 1**.

**Verify.** 3·[1, 1] + 1·[1, -1] = [3 + 1, 3 - 1] = **[4, 2]** — matches the target vector exactly. So [4, 2] has coordinates (3, 1) in the {b₁, b₂} basis.

*Compare to Lesson 4's worked example:* there, [5, 1] mapped to coordinates (3, 2) in the same basis. Here, a different target vector, [4, 2], correctly produces a different coordinate pair, (3, 1) — a reminder that the change-of-basis relationship is specific to each vector, not a fixed shortcut you can reuse across different targets.

## Problem 4: Is {[1, 2, 0], [0, 1, 3], [2, 0, 1]} linearly independent in R^3?

**Setup.** Compute the 3×3 determinant. For rows **a** = [1, 2, 0], **b** = [0, 1, 3], **c** = [2, 0, 1], expand along the first row:

det = 1·[(1)(1) − (3)(0)] − 2·[(0)(1) − (3)(2)] + 0·[(0)(0) − (1)(2)]

det = 1·(1 − 0) − 2·(0 − 6) + 0·(0 − 2)

det = 1·(1) − 2·(−6) + 0 = 1 + 12 + 0 = **13**

**Conclusion.** The determinant is 13, which is nonzero, so this set of three vectors is linearly **independent** — it forms a valid basis for R^3. None of the three vectors can be written as a combination of the other two.

## Putting it together

Across these four problems you: caught a dependent pair by determinant (Problem 1), normalized a vector into a named quantum state and confirmed the norm-1 condition (Problem 2), solved a fresh change-of-basis problem by hand and verified it (Problem 3), and ran the determinant test at the R^3 scale (Problem 4). These four moves — independence testing, normalization, basis-coordinate solving, and verifying by substitution — are the complete toolkit Chapter 2 assumes you have before it introduces matrices as linear transformations.

## Key terms

| Term | Meaning |
|---|---|
| Dependent pair | Two vectors where one is a scalar multiple of the other; determinant of the pair is 0 |
| \|+⟩ state | The equal-superposition qubit state (1/√2)(\|0⟩ + \|1⟩) = [1/√2, 1/√2], giving a 50/50 measurement split |
| Basis coordinates | The specific (a, b) coefficients that express a given vector as a linear combination of basis vectors |
| 3x3 determinant expansion | Expanding along the first row: for rows a, b, c, det = a₁(b₂c₃−b₃c₂) − a₂(b₁c₃−b₃c₁) + a₃(b₁c₂−b₂c₁) |

## Check yourself

In Problem 2, normalizing [1, 1] produced the |+⟩ state. What vector would you need to normalize to produce the related state |−⟩ = (1/√2)(|0⟩ − |1⟩), and what would its norm be before normalization?
