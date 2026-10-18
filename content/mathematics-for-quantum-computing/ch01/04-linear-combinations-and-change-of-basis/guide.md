# Linear Combinations & Change of Basis

You can now test whether a set of vectors is a valid basis, and you know how to measure a vector's length. This lesson closes the loop: given a valid basis, how do you actually find the specific numbers that express a vector in terms of it — and what happens to those numbers when you switch to a different basis?

## What you'll learn

- How to express a specific vector as a linear combination of two basis vectors by solving a system of equations
- How to build a change-of-basis matrix from a set of basis vectors
- How to use the inverse of that matrix to find a vector's coordinates in the new basis
- How to verify a change-of-basis result by multiplying back
- Why this is exactly what's happening when a quantum state is rewritten in a different measurement basis

## Expressing a vector as a linear combination: solving by hand

Suppose you have a basis for R^2 made of **b₁** = [1, 1] and **b₂** = [1, -1] (you can quickly check independence: determinant = (1)(-1) - (1)(1) = -2 ≠ 0, so this is a valid basis). Given a target vector **v** = [5, 1], how do you find coefficients a and b such that a·**b₁** + b·**b₂** = **v**?

Write out the combination coordinate by coordinate:

a·[1, 1] + b·[1, -1] = [a + b, a - b]

Setting this equal to [5, 1] gives two equations:

a + b = 5
a - b = 1

Adding the two equations eliminates b: 2a = 6, so **a = 3**. Substituting back into the first equation: 3 + b = 5, so **b = 2**.

*Verify by plugging back in:* 3·[1, 1] + 2·[1, -1] = [3 + 2, 3 - 2] = **[5, 1]** — exactly matches the target vector. So [5, 1], written in the {**b₁**, **b₂**} basis, has coordinates (3, 2).

## The change-of-basis matrix

Rather than solving a fresh system of equations every time, you can package the basis vectors into a matrix and use matrix inversion instead. Build the **change-of-basis matrix** P by placing the basis vectors as columns:

P = [[1, 1], [1, -1]]  (columns **b₁** = [1,1] and **b₂** = [1,-1])

To go from standard coordinates to {**b₁**, **b₂**}-coordinates, you need P⁻¹. For a 2×2 matrix [[p, q], [r, s]], the inverse is (1/det)·[[s, -q], [-r, p]], where det = ps - qr.

Here det(P) = (1)(-1) - (1)(1) = **-2**, so:

P⁻¹ = (1/-2)·[[-1, -1], [-1, 1]] = **[[0.5, 0.5], [0.5, -0.5]]**

## Applying the change-of-basis matrix

Multiply P⁻¹ by the target vector **v** = [5, 1]:

Row 1: (0.5)(5) + (0.5)(1) = 2.5 + 0.5 = **3**
Row 2: (0.5)(5) + (-0.5)(1) = 2.5 - 0.5 = **2**

P⁻¹**v** = [3, 2]

This matches the (a, b) = (3, 2) found by solving the system directly above — two different methods, same verified answer.

**Verify in the other direction.** Multiply the original matrix P by the result [3, 2] and confirm it returns the original vector:

Row 1: (1)(3) + (1)(2) = 5
Row 2: (1)(3) + (-1)(2) = 1

P[3, 2] = [5, 1] — exactly the original **v**, confirming the round trip is consistent.

## Why this matters for quantum computing

A qubit is routinely described in more than one basis. The computational basis {|0⟩, |1⟩} is one choice; another common one is the {|+⟩, |−⟩} basis, built from combinations of |0⟩ and |1⟩. A measurement performed "in the |+⟩/|−⟩ basis" instead of the computational basis is, mathematically, exactly the change-of-basis operation you just practiced: the same physical qubit state gets different coordinate numbers depending on which basis you express it in, and converting between them uses exactly this matrix-inverse procedure. Later chapters on quantum gates will show that applying a gate is also just matrix multiplication against a state vector — the mechanics you just practiced by hand are the same mechanics a quantum circuit simulator runs internally.

## Common mistake: putting basis vectors in rows instead of columns

When building the change-of-basis matrix P, the basis vectors must go in as **columns**, not rows. Transposing the matrix by mistake (putting them in as rows) gives a different, incorrect matrix, and the inverse you compute from it will not correctly convert coordinates.

## Key terms

| Term | Meaning |
|---|---|
| Linear combination | A sum of scalar multiples of vectors, e.g. a·b₁ + b·b₂ |
| Change-of-basis matrix | A matrix whose columns are a set of basis vectors, used to convert coordinates between bases |
| Matrix inverse | For a matrix P, the matrix P⁻¹ such that P⁻¹P = the identity matrix; used here to convert from standard coordinates into the new basis's coordinates |
| 2x2 inverse formula | For P = [[p,q],[r,s]], P⁻¹ = (1/(ps-qr))·[[s,-q],[-r,p]], provided det = ps-qr ≠ 0 |

## Check yourself

Using basis vectors **b₁** = [1, 1] and **b₂** = [1, -1] as in this lesson, what coefficients (a, b) express the vector [4, 0] in this basis, and how would you verify your answer?
