# Dot Products & Norms

You now know how to build and test sets of reference directions. The next question is one of the most consequential in all of quantum computing: how "big" is a vector, and why does quantum mechanics insist that a valid state vector always has a specific size?

## What you'll learn

- How to compute the dot product of two real vectors
- How the dot product gives you the Euclidean norm (length) of a vector
- How to normalize a vector by hand, with a fully worked numeric example
- Why every valid quantum state vector must have norm exactly 1
- Why this lesson's real-number version is a deliberate stepping stone toward complex inner products in Chapter 5

## The dot product: combining two vectors into one number

The **dot product** of two real vectors takes two vectors and returns a single number, computed by multiplying matching coordinates and adding the results. For **u** = [u₁, u₂] and **v** = [v₁, v₂]:

**u** · **v** = u₁v₁ + u₂v₂

*Worked example.* Take **u** = [1, 2] and **v** = [3, 4]:

**u** · **v** = (1)(3) + (2)(4) = 3 + 8 = **11**

The dot product shows up constantly in linear algebra because it's the foundation for both "length" and "angle between vectors" — this lesson focuses on length.

## The norm: the length of a vector

A vector's **norm** (its Euclidean length) is defined using the dot product of the vector with itself:

‖**v**‖ = √(**v** · **v**)

For a 2D vector [v₁, v₂], this expands to the familiar Pythagorean formula ‖**v**‖ = √(v₁² + v₂²) — the length of the hypotenuse of a right triangle with legs v₁ and v₂.

*Worked example.* Take **v** = [3, 4]:

**v** · **v** = (3)(3) + (4)(4) = 9 + 16 = 25

‖**v**‖ = √25 = **5**

This is the classic 3-4-5 right triangle, now viewed as a vector length rather than a geometry problem.

## Normalizing a vector: scaling it to length 1

To **normalize** a vector means to find a new vector that points in the same direction but has norm exactly 1. You do this by dividing every coordinate by the vector's norm.

*Worked example, continuing from above.* **v** = [3, 4] has ‖**v**‖ = 5. Divide each coordinate by 5:

**v**_normalized = [3/5, 4/5] = **[0.6, 0.8]**

Check the result by computing its norm directly: (0.6)² + (0.8)² = 0.36 + 0.64 = 1, so √1 = **1**. The normalized vector genuinely has length 1, confirmed by direct calculation, not approximation.

## Why this matters: quantum states must have norm 1

In quantum mechanics, a qubit's state vector [c₀, c₁] is only physically valid if ‖[c₀, c₁]‖ = 1. This isn't an arbitrary convention — the squared magnitude of each coefficient, |c₀|² and |c₁|², is interpreted as the *probability* of measuring the qubit in state |0⟩ or |1⟩ respectively, and probabilities across all outcomes must sum to exactly 1. A state vector with norm 1 is called **normalized**, and it is the linear-algebra expression of "the total probability of all possible measurement outcomes is 100%."

The [0.6, 0.8] example above is not just an arbitrary normalization drill — a real qubit state of exactly [0.6, 0.8] (if those were the actual amplitudes) would mean a 0.6² = 36% chance of measuring |0⟩ and 0.8² = 64% chance of measuring |1⟩, and 36% + 64% = 100%, exactly matching the norm-1 requirement.

## Why "real" norms are a stepping stone, not the final answer

Everything in this lesson uses real-number dot products and norms. Real qubit amplitudes are actually *complex* numbers in general, and the true quantum norm uses a **complex inner product** (involving complex conjugates) rather than the plain dot product used here. Chapter 5 builds that machinery properly. The reason to learn the real version first: the complex version is a direct generalization of exactly these same ideas — length, normalization, and the norm-1 requirement — and every intuition you build here (normalize by dividing by the length, length-1 means "valid probability total") carries over unchanged. You are not learning a disposable simplification; you're learning the real special case of the general rule.

## Common mistake: dividing by the norm squared instead of the norm

A frequent slip is normalizing by dividing by ‖**v**‖² (25 in the example above) instead of ‖**v**‖ (5). Dividing [3,4] by 25 gives [0.12, 0.16], which has norm 0.2 — not 1. Always divide by the norm itself, not its square.

## Key terms

| Term | Meaning |
|---|---|
| Dot product | For real vectors u and v, the sum of the products of matching coordinates: u·v = u₁v₁ + u₂v₂ + ... |
| Norm (‖v‖) | The length of a vector, computed as the square root of the vector dotted with itself |
| Normalize | Scale a vector by dividing every coordinate by its norm, producing a vector with norm exactly 1 in the same direction |
| Normalized quantum state | A state vector with norm 1, required because squared amplitudes must sum to a total probability of 1 |

## Check yourself

A vector [c₀, c₁] = [0.6, 0.8] is proposed as a qubit state. Using the norm-1 requirement, explain in your own words why this is a valid quantum state, and what the two numbers 0.36 and 0.64 represent physically.
