# The Postulates of Quantum Mechanics

Everything you've seen so far — blackbody radiation, the photoelectric effect, spectral lines, double-slit interference — are experimental facts that quantum mechanics has to explain. The postulates below are the actual rulebook: five precise statements that, taken together, define what quantum mechanics *is* as a mathematical theory. Every quantum algorithm you'll study later is just these five rules applied to finite-dimensional systems called qubits.

## What you'll learn

- Postulate 1: what it means for a quantum state to be a normalized vector in a Hilbert space
- Postulate 2: why observables are represented by Hermitian operators
- Postulate 3: the Born rule — how measurement outcomes and their probabilities are determined
- Postulate 4: what "collapse" precisely means after a measurement
- Postulate 5: why time evolution of a closed quantum system must be unitary
- How to apply the Born rule to a concrete, verified two-outcome example

## Postulate 1: the state is a normalized vector in a Hilbert space

Every physical state a quantum system can be in is represented by a vector in a complex vector space called a **Hilbert space**, and that vector must be **normalized** — its length, computed the quantum way, must equal 1. For a software engineer, the easiest on-ramp is the finite-dimensional case used throughout quantum computing: a single qubit's state is a vector in a 2-dimensional complex vector space, written in Dirac notation as |ψ⟩ = a|0⟩ + b|1⟩, where a and b are complex numbers (amplitudes) and normalization requires |a|² + |b|² = 1. This is the mathematical object that replaces "the system has some definite classical configuration" — the full description of a quantum system's state is this vector, nothing more and nothing less, and nothing in the theory requires it to describe a definite, pre-existing classical value underneath.

## Postulate 2: observables are Hermitian operators

Every measurable physical quantity — position, momentum, energy, or (in the qubit case) which basis you're measuring in — is represented mathematically by a **Hermitian operator** acting on the Hilbert space. A Hermitian operator is one that equals its own conjugate transpose. This isn't an arbitrary mathematical restriction: Hermitian operators are guaranteed to have only real-number eigenvalues, which matters enormously, because postulate 3 says those eigenvalues are exactly the possible outcomes you can get when you measure that quantity — and a measured quantity like energy or a bit value had better come out as a real number, not a complex one. So "what can this measurement possibly return?" is answered entirely by which Hermitian operator represents it and what its eigenvalues are.

## Postulate 3: measurement outcomes and the Born rule

When you measure the observable represented by a given Hermitian operator, the result you get is always one of that operator's **eigenvalues** — never anything in between, and never anything outside that fixed list. Which particular eigenvalue you get on any single trial is generally not predictable in advance; quantum mechanics only predicts the *probability* of each possible outcome. That probability is given by the **Born rule**: the probability of getting a particular outcome equals the squared magnitude of the amplitude (the overlap between the state and the corresponding eigenstate) associated with that outcome.

Here is the Born rule made concrete, with a fully verified example. Take the single-qubit state |ψ⟩ = 0.6|0⟩ + 0.8|1⟩. First, check it's a valid state under postulate 1: 0.6² + 0.8² = 0.36 + 0.64 = 1, so it's correctly normalized. Now measure it in the computational basis ({|0⟩, |1⟩}). The Born rule says the probability of measuring outcome 0 is the squared amplitude on |0⟩: P(0) = 0.6² = 0.36. The probability of measuring outcome 1 is the squared amplitude on |1⟩: P(1) = 0.8² = 0.64. These two probabilities sum to 1 (0.36 + 0.64 = 1), exactly as probabilities must. Notice that the amplitudes themselves (0.6 and 0.8) are not the probabilities — you square them to get probabilities. This single rule, applied over and over to larger and larger qubit registers, is how every quantum algorithm's output probabilities are calculated.

## Postulate 4: collapse — the state after measurement

Immediately after a measurement yields a particular outcome, the system's state is no longer the pre-measurement superposition — it has **collapsed** to the specific eigenstate corresponding to the outcome you actually got. For the |ψ⟩ = 0.6|0⟩ + 0.8|1⟩ example: if you measure and get outcome 0 (which happens with probability 0.36), the state immediately becomes |0⟩, full stop — every trace of the 0.8|1⟩ component is gone. If you instead get outcome 1 (probability 0.64), the state becomes |1⟩. Measure again immediately afterward in the same basis, and you'll get the same outcome again with certainty — the superposition has been destroyed by the act of measuring, replaced with the definite outcome you observed. This is the mathematical statement of what the double-slit "which-path" measurement did to the interference: it collapsed a two-path amplitude down to one definite path.

## Postulate 5: closed-system time evolution is unitary

As long as a quantum system is **closed** — not being measured, not interacting in an information-leaking way with an external environment — its state evolves smoothly and deterministically over time according to the Schrödinger equation, and the mathematical operation that takes the state at one time to the state at a later time is always a **unitary** operator. A unitary operator is, informally, a linear transformation that preserves the normalization condition from postulate 1 — it never lets the total probability drift away from 1, and it's always reversible (every unitary operator has an inverse that is also unitary, so you can always undo it). This is the postulate that directly explains why quantum logic gates are unitary matrices: a gate is nothing but a chunk of closed-system time evolution, and postulate 5 says closed-system evolution has no choice but to be unitary.

## How the postulates work together, and why they matter for computing

Read in sequence, the five postulates tell a complete story: a system's full description is a normalized vector (1); physical quantities you could measure correspond to Hermitian operators (2); measuring one of those quantities yields one of its eigenvalues, with probability set by the Born rule (3); the act of measuring collapses the state to match whatever outcome you got (4); and in between measurements, while the system is left alone, it evolves deterministically and reversibly via a unitary operator (5). For a software engineer, this maps almost one-to-one onto how you'll think about qubits for the rest of this course: postulate 1 is "what a qubit's state is," postulate 5 is "what a quantum gate does to it," and postulates 2–4 together are "what happens when you read the qubit out." There is no sixth postulate hiding some extra classical mechanism underneath — this is the complete rulebook, and it is exactly what every later lesson in this course builds on.

## Key terms

| Term | Meaning |
|---|---|
| Hilbert space | The complex vector space whose normalized vectors represent possible quantum states |
| Hermitian operator | The mathematical object representing a measurable physical quantity (observable); guarantees real eigenvalues |
| Born rule | The rule that the probability of a measurement outcome equals the squared magnitude of its amplitude |
| Collapse | The instantaneous change of the state to the eigenstate matching the measurement outcome actually obtained |
| Unitary evolution | The reversible, normalization-preserving way a closed quantum system's state changes over time between measurements |

## Check yourself

Using the state |ψ⟩ = 0.6|0⟩ + 0.8|1⟩ from this lesson: suppose a measurement in the computational basis is performed and the outcome is 1. Using postulate 3, state the probability that outcome was going to occur before the measurement happened. Then, using postulate 4, state exactly what the qubit's state is immediately afterward, and explain why a second immediate measurement in the same basis is now guaranteed to produce a specific result rather than being probabilistic.
