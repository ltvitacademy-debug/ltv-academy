# The Schrödinger Equation, Conceptually

Every quantum state you've worked with so far — |0⟩, |+⟩, the Bell states — has been treated as fixed, a snapshot in time. Real qubits evolve continuously, and exactly one equation governs how. This lesson introduces it conceptually, without solving it, so the next lesson can work a fully verified concrete example.

## What you'll learn

- The time-dependent Schrödinger equation and what each symbol means
- Why the Hamiltonian is "the thing that generates time evolution"
- Why the equation being linear is essential, not incidental
- The direct link between this linearity and the no-cloning proof from Chapter 5

## The equation

The time-dependent Schrödinger equation is written:

iħ d|ψ⟩/dt = H|ψ⟩

In words: the rate of change of the state vector |ψ⟩ over time is determined entirely by applying an operator H — the **Hamiltonian** — to the current state (with a constant iħ out front; ħ is the reduced Planck constant, a fixed physical constant, and i is the imaginary unit). This course will not solve this equation for realistic multi-level physical systems — that's genuine physics-major territory (hydrogen atoms, harmonic oscillators, and the rest), explicitly out of scope per Chapter 1's framing lesson. What matters here is the *structure* of the equation and what it implies.

## The Hamiltonian is the generator of time evolution

H is the operator that encodes everything about *how* a system changes — if you know H, you know everything about the system's future evolution (given its current state). It's a Hermitian operator (introduced as a postulate in Chapter 1): its eigenvalues are the possible energies the system can have, and its eigenvectors are the states of definite energy. Lesson 27 works through a concrete example of exactly this interpretation. For now, think of H as the rulebook — fixed by the physical system (or, for engineered qubits, by how the hardware is built) — and the Schrödinger equation as the statement that the state's motion through time is always governed by that same fixed rulebook.

## Why linearity matters

The Schrödinger equation is a **linear** differential equation in |ψ⟩: if |ψ₁⟩ and |ψ₂⟩ are both valid solutions (both satisfy the equation under the same H), then any superposition a|ψ₁⟩+b|ψ₂⟩ is also a valid solution. This is not a minor technical footnote — it is the single fact that guarantees superposition survives time evolution instead of being destroyed by it. A system that starts in a superposition stays in a superposition (generally a different one) as it evolves; linear evolution never collapses a superposition into a single definite state on its own. Only measurement does that (Chapter 3) — ordinary time evolution under the Schrödinger equation is a completely separate process from measurement, and it's deterministic and linear where measurement is probabilistic and state-collapsing.

## The same linearity, reused

This is the identical linearity property used directly in Chapter 5's proof of the no-cloning theorem: the argument there depended on showing that a hypothetical cloning operation, if it were unitary (and therefore consistent with the kind of evolution the Schrödinger equation produces), would have to act linearly on superpositions — and that linear action was precisely what produced a contradiction. Seeing the same mathematical property show up in two different proofs (no-cloning, and "superposition survives evolution") is not a coincidence; it's the same underlying structural fact about how quantum operators work, appearing in different contexts.

## What this means for computing

Every quantum gate you'll study in later courses in this path is, physically, a snapshot of Schrödinger-equation evolution under some particular, deliberately engineered Hamiltonian, applied for a precise duration. Lesson 26 makes this completely concrete with verified numbers; Lesson 28 ties it directly to why every gate matrix has to be unitary. The high-level point to carry forward from this lesson: a quantum computer's gates are not an abstraction layered on top of physics — they ARE physics, specifically Schrödinger-equation time evolution, engineered to implement a chosen computation.

## Key terms

| Term | Meaning |
|---|---|
| Schrödinger equation | iħ d\|ψ⟩/dt = H\|ψ⟩; the equation governing how a quantum state changes over time |
| Hamiltonian (H) | The Hermitian operator that generates time evolution; its eigenvalues are the system's possible energies |
| Linearity (of evolution) | The property that a superposition of solutions is itself a solution; guarantees that ordinary time evolution preserves superposition rather than collapsing it |

## Check yourself

Explain, in your own words, why the fact that the Schrödinger equation is linear is what guarantees a qubit prepared in superposition doesn't spontaneously collapse into a definite |0⟩ or |1⟩ just from sitting there evolving in time, and why measurement is a genuinely different kind of process from this ordinary evolution.
