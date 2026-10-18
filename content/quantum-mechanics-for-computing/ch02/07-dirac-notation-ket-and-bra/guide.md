# Dirac Notation: Ket and Bra

Every piece of quantum computing literature — papers, textbooks, Qiskit documentation — uses the same compact notation for vectors and their "conjugate partners." Learning to read and manipulate it fluently is as foundational as learning to read array/matrix notation was for ordinary programming.

## What you'll learn

- What a ket |ψ⟩ and a bra ⟨ψ| actually are as mathematical objects
- How to compute an inner product ⟨φ|ψ⟩ and what it represents
- Why ⟨0|0⟩=1, ⟨1|1⟩=1, and ⟨0|1⟩=0 (orthonormality)
- A worked, verified example of computing ⟨0|+⟩ and interpreting the result
- Why this notation exists at all, rather than just using plain column vectors

## The ket: a column vector

A **ket**, written |ψ⟩, is just a column vector. For the computational basis states:

|0⟩ = [1, 0]ᵗ  and  |1⟩ = [0, 1]ᵗ

(written as column vectors; the transpose symbol ᵗ here just means "write this horizontally, but treat it as a column.") A general qubit state |ψ⟩ = a|0⟩+b|1⟩ is the column vector [a, b]ᵗ. Nothing exotic yet — this is the same column-vector idea you'd use in any linear algebra library.

## The bra: a row vector, conjugated

A **bra**, written ⟨ψ|, is the *conjugate transpose* of the corresponding ket: take the column vector, lay it on its side as a row, and take the complex conjugate of each entry. For |ψ⟩=[a,b]ᵗ, the bra is ⟨ψ| = [a*, b*] (where a* means the complex conjugate of a — flip the sign of its imaginary part; if a is real, a*=a). The reason the conjugate matters will become clear in a moment: it's exactly what's needed to make lengths and probabilities come out as real, non-negative numbers instead of possibly-complex ones.

## The inner product ⟨φ|ψ⟩

Putting a bra next to a ket — ⟨φ|ψ⟩ — forms the **inner product**, computed by multiplying corresponding entries and summing: for ⟨φ|=[c*,d*] and |ψ⟩=[a,b]ᵗ, ⟨φ|ψ⟩ = c*a + d*b. This single number is the mathematical heart of quantum mechanics: its squared magnitude, |⟨φ|ψ⟩|², is a probability (the full Born-rule treatment comes in Chapter 3) — specifically, the probability that a system prepared in state |ψ⟩ will be measured as |φ⟩ when measuring in a basis that includes |φ⟩.

## Orthonormality of the computational basis

Compute the four basic inner products of |0⟩ and |1⟩ with themselves and each other:

- ⟨0|0⟩ = 1·1 + 0·0 = 1
- ⟨1|1⟩ = 0·0 + 1·1 = 1
- ⟨0|1⟩ = 1·0 + 0·1 = 0
- ⟨1|0⟩ = 0·1 + 1·0 = 0

Each basis vector has inner product 1 with itself (it's normalized) and 0 with the other (they're orthogonal — perpendicular, in the geometric sense this generalizes). Together, "orthogonal and each individually normalized" is what "orthonormal basis" means. These four results are definitional consequences of how |0⟩ and |1⟩ are written as vectors, not something that requires deeper computation to verify.

## A worked example: ⟨0|+⟩

Now a less trivial case. Recall |+⟩ = (|0⟩+|1⟩)/√2 = [1/√2, 1/√2]ᵗ. First, confirm |+⟩ is normalized: ⟨+|+⟩ = (1/√2)(1/√2) + (1/√2)(1/√2) = 1/2 + 1/2 = 1 (verified: (1/√2)² + (1/√2)² = 1). Now compute ⟨0|+⟩: with ⟨0|=[1,0], this is 1·(1/√2) + 0·(1/√2) = 1/√2 ≈ 0.707. Squaring this magnitude gives |⟨0|+⟩|² = (1/√2)² = 0.5 (verified) — exactly the probability of measuring |+⟩ as 0 in the computational basis, which matches what you'd compute directly from the amplitudes. The inner product ⟨0|+⟩ is doing real mathematical work here: it's projecting |+⟩ onto |0⟩ and reading off the overlap.

## What this means for computing

Dirac notation isn't decoration — it's the notation every quantum SDK's underlying math maps onto directly (state vectors, unitary matrix multiplication, and inner products for computing measurement probabilities). Reading a circuit diagram or a paper fluently requires being able to go from |ψ⟩ to its vector representation and back, and to immediately recognize that ⟨φ|ψ⟩ is "the overlap between these two states, whose square tells you a probability."

## Key terms

| Term | Meaning |
|---|---|
| Ket | |ψ⟩ — a column vector representing a quantum state |
| Bra | ⟨ψ| — the conjugate transpose (row vector, entries complex-conjugated) of the corresponding ket |
| Inner product | ⟨φ\|ψ⟩ — multiply corresponding entries of bra and ket and sum; its squared magnitude is a measurement probability |
| Orthonormal basis | A set of basis vectors that are each normalized (inner product with themselves = 1) and mutually orthogonal (inner product with each other = 0) |

## Check yourself

Compute ⟨1|+⟩ for |+⟩=(|0⟩+|1⟩)/√2, and explain what the squared magnitude of your answer represents physically.
