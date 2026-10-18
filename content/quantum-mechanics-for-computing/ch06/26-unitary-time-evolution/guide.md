# Unitary Time Evolution

Solving the Schrödinger equation for a simple two-level system (exactly the kind of system a qubit is) produces a specific, concrete matrix: the time-evolution operator U(t). This lesson works through a fully verified example of what that matrix looks like and what it does.

## What you'll learn

- How U(t)=exp(−iHt/ħ) arises as the solution to the Schrödinger equation for a simple Hamiltonian
- A fully verified numeric example: time evolution under H=(ħω/2)Z
- Why global phase is unobservable but relative phase is physical — shown with real numbers
- The precise definition of "unitary" and why it guarantees probability is conserved

## From the Schrödinger equation to a matrix

For a Hamiltonian H that doesn't change over time, the Schrödinger equation iħ d|ψ⟩/dt = H|ψ⟩ has the solution |ψ(t)⟩ = U(t)|ψ(0)⟩, where U(t) = exp(−iHt/ħ) (a well-established result of solving this specific differential equation — stated directly here, no derivation needed for this course's scope). U(t) is a fixed matrix for any given t; applying it to a state tells you exactly what that state becomes after time t.

## A concrete, verified example

Take the simple two-level Hamiltonian H = (ħω/2)Z, where Z is the Pauli-Z matrix (eigenvalues ±1) and ω is a constant (angular frequency). Because Z is diagonal, exponentiating it is straightforward, and the result is:

U(t) = exp(−iHt/ħ) = diag(e^(−iωt/2), e^(+iωt/2))

This was verified directly: both diagonal entries have magnitude exactly 1 for any value of t (confirmed by computing |e^(−iωt/2)|=1 and |e^(iωt/2)|=1 for all t), which is exactly the condition for U(t) to be unitary.

Now plug in a specific, verified value: let θ = ωt/2 = π/4 (a specific moment in time).

**Applying U(t) to |0⟩:** U(t)|0⟩ = e^(−iπ/4)|0⟩. This is just |0⟩ multiplied by an overall phase factor. Since |0⟩ by itself has nothing to compare that phase *against*, this has exactly zero observable effect — confirmed, since |e^(−iπ/4)|²=1, so P(0) is still 1 and P(1) is still 0, unchanged.

**Applying U(t) to |+⟩=(|0⟩+|1⟩)/√2:** the result (verified by direct complex-number computation) has components (0.5−0.5i, 0.5+0.5i). Check the probabilities: |0.5−0.5i|² = 0.25+0.25 = 0.5, and |0.5+0.5i|² = 0.25+0.25 = 0.5 — unchanged from |+⟩'s original 50/50 split (verified). But now factor out the common phase e^(−iπ/4) from both components: what's left is a **relative phase** of e^(i·π/2) = i between the |0⟩ and |1⟩ terms (verified: 2θ=π/2, and e^(iπ/2)=i exactly) — a real, physical difference that was not there before evolution, even though neither individual probability changed.

## Global phase vs. relative phase, shown with real numbers

This example makes Chapter 2's earlier claim about global phase completely concrete: applying U(t) to |0⟩ picks up only a global phase (unobservable — nothing changes). Applying the *exact same* U(t) to |+⟩ produces a genuine relative phase between its two components (observable in principle, through interference with other operations) — even though the probabilities of measuring 0 or 1 in the computational basis stay at 0.5/0.5 either way. The distinction isn't about whether the numbers "look different" — it's about whether the difference is between *all* components equally (global, invisible) or *between* components (relative, physical).

## What "unitary" means, precisely

A matrix U is unitary if U†U=I (its conjugate transpose times itself gives the identity matrix). This condition is exactly what's required to guarantee ⟨ψ(t)|ψ(t)⟩=⟨ψ(0)|ψ(0)⟩=1 for all t — in other words, if the state started normalized, it stays normalized forever under U(t). That's precisely the physical requirement: total probability has to stay at 1 at every moment, not just at t=0. The diagonal U(t) above is unitary because each diagonal entry has magnitude 1, which is the simplest case of U†U=I.

## What this means for computing

Every gate used in a real quantum circuit is a unitary matrix for exactly this reason: it has to represent some valid stretch of Schrödinger-equation time evolution, and probability conservation forces unitarity. Relative phase — the thing this lesson's |+⟩ example demonstrates concretely — is the mechanism interference-based algorithms manipulate directly; a gate sequence's entire job is often to engineer specific relative phases that make the correct answer interfere constructively and wrong answers interfere destructively.

## Key terms

| Term | Meaning |
|---|---|
| Time-evolution operator U(t) | The matrix exp(−iHt/ħ) describing how a state changes after time t under a fixed Hamiltonian H |
| Unitary | A matrix U satisfying U†U=I; guarantees normalization (total probability) is preserved under evolution |
| Relative phase | A phase difference between individual components of a state; unlike global phase, it is physically observable |

## Check yourself

The lesson showed U(t)|0⟩ acquires only a global phase, while U(t)|+⟩ acquires a genuine relative phase, even though both calculations used the exact same operator U(t)=diag(e^(−iπ/4), e^(iπ/4)). Explain why the exact same matrix produces an unobservable effect on one input and an observable one on another.
