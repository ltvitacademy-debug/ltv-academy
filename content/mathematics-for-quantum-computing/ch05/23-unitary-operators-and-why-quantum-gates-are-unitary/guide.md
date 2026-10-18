# Unitary Operators & Why Quantum Gates Are Unitary

Hermitian operators represent things you measure. Unitary operators represent something different but just as fundamental: the ways a quantum state is allowed to *evolve* over time, including every gate in a quantum circuit. If you've ever wondered why quantum computing textbooks insist every gate matrix satisfy a specific algebraic condition, this lesson is the answer.

## What you'll learn

- The definition of a unitary matrix: `U^dagger U = I`
- Why unitary operators preserve inner products and norms
- A full worked verification that the Hadamard matrix is unitary
- Why quantum gates must be unitary: reversibility and probability conservation
- How to spot a non-unitary matrix that looks deceptively similar to a unitary one

## The definition: `U^dagger U = I`

A matrix `U` is **unitary** if its conjugate transpose is also its inverse: `U^dagger U = I` (the identity matrix). Equivalently, `U U^dagger = I` as well — for a unitary matrix, both products with its own dagger give the identity. This is the complex-number generalization of an orthogonal matrix from real linear algebra (where "conjugate transpose" is just "transpose," since real numbers are their own conjugates).

## Why unitary matrices preserve inner products (and therefore norms)

Take any two vectors `|psi>` and `|phi>`, and compute the inner product of their images after applying `U`: `<U psi|U phi>`. Using the conjugate-transpose relationship, `<U psi|U phi> = (U psi)^dagger (U phi) = psi^dagger U^dagger U phi = psi^dagger I phi = psi^dagger phi = <psi|phi>`. The inner product is completely unchanged. Setting `phi = psi` shows norms are preserved too: `||U psi|| = ||psi||`. A unitary transformation can rotate a vector around in the space, but it can never stretch, shrink, or change the angle (overlap) between two vectors.

## Worked example: verifying the Hadamard matrix is unitary

The **Hadamard matrix** is `H = (1/sqrt(2)) * [[1, 1], [1, -1]]` — one of the most common single-qubit gates in quantum computing. Verify `H^dagger H = I`.

**Step 1 — find `H^dagger`.** Every entry of `H` is already real, so conjugating changes nothing; and `H` is symmetric (transposing swaps nothing, since the off-diagonal entries are equal), so `H^dagger = H` here:

```
H^dagger = (1/sqrt(2)) * [[1, 1], [1, -1]]
```

**Step 2 — multiply `H^dagger H`.** Since `H^dagger = H`, this is `H * H`:

- Entry (1,1): `(1/sqrt(2))(1/sqrt(2))[(1)(1) + (1)(1)] = (1/2)(2) = 1`
- Entry (1,2): `(1/2)[(1)(1) + (1)(-1)] = (1/2)(0) = 0`
- Entry (2,1): `(1/2)[(1)(1) + (-1)(1)] = (1/2)(0) = 0`
- Entry (2,2): `(1/2)[(1)(1) + (-1)(-1)] = (1/2)(2) = 1`

```
H^dagger H = [[1, 0], [0, 1]] = I
```

It checks out exactly: `H^dagger H = I`, confirming `H` is unitary. (Direct computation also confirms `H H^dagger = I`, the same result, since `H^dagger = H` here.)

## Confirming norm preservation numerically

Take `|v> = (1+i, 2)`, with `||v|| = sqrt(|1+i|^2 + |2|^2) = sqrt(2 + 4) = sqrt(6) ≈ 2.4495`. Applying `H`: `H|v> = (1/sqrt(2))((1+i) + 2, (1+i) - 2) = (1/sqrt(2))(3+i, -1+i)`. Computing its norm: `||H v|| = sqrt(|3+i|^2 + |-1+i|^2) / sqrt(2) = sqrt(10 + 2)/sqrt(2) = sqrt(12)/sqrt(2) = sqrt(6) ≈ 2.4495`. Same norm, exactly as the theorem guarantees — the Hadamard gate moved the vector but didn't change its length.

## Why quantum gates must be unitary

Two physical requirements force every quantum gate to be a unitary matrix:

**Reversibility.** Quantum evolution (outside of measurement) has to be reversible — in principle, you can always run a gate backward and recover the input exactly. A matrix is invertible with its inverse equal to its own conjugate transpose precisely when it's unitary, so `U^dagger` is always available as the "undo" operation for any gate `U`. A non-invertible matrix would destroy information, which real quantum evolution doesn't do.

**Probability conservation.** A valid quantum state vector has norm 1 (its total measurement probability sums to 100%, a fact made precise by the Born rule in Chapter 7). If a gate changed a state's norm, applying it would produce a vector that no longer represents a valid probability distribution over outcomes — probabilities would stop summing to 1. Because unitary matrices preserve norms exactly, applying any quantum gate to a valid state always produces another valid state. This is the real reason every gate matrix you'll meet — Hadamard, Pauli X/Y/Z, CNOT, phase gates — is unitary: it's not a stylistic choice, it's required for the output to still mean anything as a quantum state.

## A near-miss: a matrix that looks unitary but isn't

Consider `N = [[1, i], [i, 1]]` (no normalizing factor). Computing `N^dagger N` gives `[[2, 0], [0, 2]] = 2I`, not `I` — so `N` is *not* unitary, even though its structure closely resembles the matrix from the Hadamard-style check above. The lesson: always carry through the normalization factor, and always verify `U^dagger U = I` exactly, rather than assuming a plausible-looking matrix qualifies.

## Key terms

| Term | Meaning |
|---|---|
| Unitary matrix | A matrix `U` satisfying `U^dagger U = I` (equivalently `U U^dagger = I`); its inverse is its own conjugate transpose |
| Norm preservation | Unitary matrices satisfy `\|\|U psi\|\| = \|\|psi\|\|` for every vector `psi` — lengths never change |
| Hadamard matrix | `H = (1/sqrt(2)) [[1,1],[1,-1]]`, a common single-qubit gate; verified unitary since `H^dagger H = I` |
| Reversibility | The requirement that quantum evolution can always be undone; guaranteed because a unitary's inverse (`U^dagger`) always exists |

## Check yourself

Using the fact that `H^dagger H = I` for the Hadamard matrix, explain in your own words why applying `H` twice in a row to any qubit state returns you exactly to the original state. (Hint: what is `H^dagger` in terms of `H` itself here?)
