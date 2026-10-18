# Vectors & Vector Spaces

Every quantum algorithm you will eventually study — Grover's search, Shor's factoring, a variational circuit — is, underneath the physics vocabulary, just linear algebra operating on vectors. Before any of that makes sense, you need a precise, comfortable grip on what a vector actually is and what a vector space guarantees you can do with it.

## What you'll learn

- What a vector space is, and why its axioms matter more than its "arrow" picture
- How real vectors in R^n and complex vectors in C^2 are built the same way
- How to add vectors and multiply them by scalars, with real numbers worked by hand
- Why a single qubit's state is nothing more than a vector in C^2
- The difference between a vector space over the reals and one over the complex numbers

## A vector is not an arrow — it's a list that obeys rules

In introductory math, a vector is often drawn as an arrow with a length and direction. That picture works fine in R^2 or R^3, but it breaks down the moment you need a vector in C^2 (pairs of complex numbers) — there is no "arrow" in a complex plane pair that you can sketch the same way. The picture that survives every case is algebraic: a vector is an ordered list of numbers, and a **vector space** is any collection of such lists where two operations — addition and scalar multiplication — behave in specific, guaranteed ways.

A set V is a vector space (over a field like the real numbers R or the complex numbers C) if, for any vectors **u**, **v**, **w** in V and any scalars a, b:

- **Closure**: **u** + **v** is still in V, and a**u** is still in V
- **Commutativity of addition**: **u** + **v** = **v** + **u**
- **Associativity**: (**u** + **v**) + **w** = **u** + (**v** + **w**)
- **Zero vector**: there's a **0** in V with **v** + **0** = **v**
- **Scalar distributivity**: a(**u** + **v**) = a**u** + a**v**, and (a + b)**v** = a**v** + b**v**

That's it — no mention of arrows, angles, or geometry. Any set of objects satisfying these rules is a vector space, which is exactly why the same linear-algebra toolkit works whether the "vectors" are columns of real numbers, columns of complex numbers, polynomials, or quantum states.

## R^n: the space you already know

R^2 is the set of all ordered pairs of real numbers, written as columns: a vector like **v** = [2, 3] (read as "2 on top, 3 below" when stacked vertically; written inline here for readability). R^3 adds a third real coordinate, R^n adds n of them. Addition and scalar multiplication work coordinate-by-coordinate:

**Vector addition.** Add [2, 3] and [4, -1] by adding matching coordinates:

[2, 3] + [4, -1] = [2 + 4, 3 + (-1)] = **[6, 2]**

**Scalar multiplication.** Multiply [2, 3] by the scalar 3 by scaling every coordinate:

3 · [2, 3] = [3·2, 3·3] = **[6, 9]**

Both results were checked by direct calculation — nothing here is approximate or hand-wavy; it is exactly coordinate-wise arithmetic, every time.

## C^2: the space a qubit actually lives in

A classical bit is either 0 or 1. A **qubit** is a vector in C^2 — the space of ordered pairs of complex numbers. The two "pure" computational states are themselves vectors:

|0⟩ = [1, 0]  and  |1⟩ = [0, 1]

(The "|·⟩" notation is standard quantum notation for a state vector — called a "ket" — and you'll see it constantly from here on; for now, just read |0⟩ and |1⟩ as the names of two specific vectors in C^2.) Notice this is structurally identical to the standard basis vectors of R^2, [1, 0] and [0, 1] — the only difference is that the *entries are allowed to be complex numbers*, which is what lets a qubit represent superposition states like [0.6, 0.8] or ones involving the imaginary unit i, which you'll meet formally in Chapter 3. Every rule you learn in this chapter for real vectors — addition, span, independence, dot products — has a direct, almost identical counterpart once we extend to complex vector spaces.

## Why the axioms matter, not just the arithmetic

It would be easy to treat "vector space" as a formality and skip straight to computing. The reason it's worth knowing the axioms explicitly: later, you'll be told that the set of valid qubit states is a vector space (specifically C^2), and every theorem you prove about "generic" vector spaces — how many independent directions exist, how to change coordinates, how lengths work — applies automatically to qubits without re-deriving it from scratch. The axioms are the reason linear algebra generalizes instead of being a pile of separate tricks for each new context.

## Common mistake: confusing a vector with its coordinates in one basis

A vector like [2, 3] is really a shorthand — it means "2 times the first standard direction, plus 3 times the second standard direction." Change which directions you measure against (a *change of basis*, which Lesson 4 covers in depth) and the same underlying vector gets written with different numbers. Don't treat the list of numbers as the vector's only identity; it's the vector's identity *relative to a chosen basis*.

## Key terms

| Term | Meaning |
|---|---|
| Vector space | A set of objects (vectors) with addition and scalar multiplication obeying a fixed list of axioms (closure, commutativity, associativity, a zero vector, distributivity) |
| R^n | The vector space of ordered n-tuples of real numbers |
| C^2 | The vector space of ordered pairs of complex numbers; the space a single qubit's state lives in |
| Scalar | A number (real or complex) used to scale a vector via scalar multiplication |
| Ket (\|·⟩) | Standard quantum-computing notation for a state vector, e.g. \|0⟩ = [1, 0] |

## Check yourself

Why does it matter, specifically for quantum computing, that a qubit's state space (C^2) is defined over the *complex* numbers rather than the real numbers — what does that let a qubit's coordinates do that R^2's coordinates can't?
