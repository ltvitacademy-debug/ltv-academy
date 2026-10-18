# Quantum Dynamics Problem-Solving Lab

A worked-problem synthesis of Chapter 6: the Schrödinger equation, unitary time evolution, the Hamiltonian as energy, and gates as engineered evolution. Each problem is solved completely in the text.

## What you'll learn

- How to verify a gate matrix is unitary by direct computation
- How to find the energy eigenstates and eigenvalues of a given Hamiltonian
- How to distinguish a global phase effect from a relative phase effect
- How to connect "this gate is unitary" back to "this corresponds to real physical time evolution"

## Problem 1: Verify Hadamard is unitary

**Problem:** Confirm that the Hadamard matrix H=(1/√2)[[1,1],[1,−1]] is unitary.

**Solution:** For a real, symmetric matrix, unitarity (U†U=I) reduces to U·U=I. Direct matrix multiplication (verified in Lesson 28) confirms H·H=I exactly. So Hadamard is unitary, and therefore consistent with being a stretch of Schrödinger-equation time evolution under some engineered Hamiltonian.

## Problem 2: Find the energy eigenstates of H=(ħω/2)Z

**Problem:** What are the energy eigenstates and eigenvalues of the Hamiltonian H=(ħω/2)Z?

**Solution:** Since Z|0⟩=|0⟩ and Z|1⟩=−|1⟩ (verified), H|0⟩=(ħω/2)|0⟩ and H|1⟩=−(ħω/2)|1⟩. So |0⟩ and |1⟩ are the energy eigenstates, with eigenvalues +ħω/2 and −ħω/2 respectively (from Lesson 27).

## Problem 3: Global phase vs. relative phase

**Problem:** Under U(t)=diag(e^(−iπ/4), e^(iπ/4)), explain why the effect on |0⟩ is unobservable but the effect on |+⟩ is observable, even though both calculations use the same matrix.

**Solution:** U(t)|0⟩=e^(−iπ/4)|0⟩ — a single term multiplied by a phase is a global phase, invisible to any measurement (verified: P(0) stays 1). U(t)|+⟩ gives components (0.5−0.5i, 0.5+0.5i) — both terms are populated, and factoring out the common phase leaves a genuine relative phase of e^(iπ/2)=i between them (verified in Lesson 26) — physically real, even though both individual probabilities stay at 0.5.

## Problem 4: Why can't a gate matrix have a row with magnitude-squared entries summing to more than 1?

**Problem:** Explain, using the unitarity condition, why a hypothetical "gate" matrix that is not unitary cannot represent valid quantum time evolution.

**Solution:** Unitarity (U†U=I) is exactly the condition that preserves ⟨ψ(t)|ψ(t)⟩=1 for all t — total probability staying at exactly 1. A non-unitary matrix would make a normalized input evolve into a non-normalized output, meaning the total probability of all outcomes would no longer sum to 1 — a direct contradiction of what a probability distribution requires. This isn't an aesthetic rule for circuit design; it's forced by the Schrödinger equation itself (Lessons 25-26).

## Problem 5: Why does S²=Z make physical sense as time evolution?

**Problem:** The S gate (S=diag(1,i)) satisfies S²=Z (verified: i×i=−1, matching Z's second diagonal entry). What does this identity mean physically, in terms of time evolution?

**Solution:** If S corresponds to evolving a qubit under some engineered Hamiltonian for duration t, then applying S twice is the same physical process as evolving under that same Hamiltonian for duration 2t. The algebraic identity S²=Z says that evolving for twice as long under S's underlying Hamiltonian produces exactly the same effect as a single Pauli-Z gate — a concrete, verified example of how gate algebra and time-evolution duration are two ways of describing the same underlying physics.

## Key terms

| Term | Meaning |
|---|---|
| Unitarity check | Confirming U†U=I (or U·U=I for real symmetric matrices) to verify a matrix is a valid time-evolution operator |
| Energy eigenstate problem | Finding which states are eigenvectors of a given Hamiltonian, and reading off their eigenvalues as energies |
| Phase bookkeeping | Tracking whether a phase factor applies globally (unobservable) or creates a difference between components (observable, relative) |

## Check yourself

A hypothetical matrix M=[[1,1],[0,1]] is proposed as a possible quantum gate. Without computing M†M in full, explain what property you would need to check, and what it would mean physically if M turned out NOT to satisfy it.
