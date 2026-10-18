# The Qubit as a Quantum State

A classical bit is either 0 or 1, full stop — one of two switch positions, nothing in between. A qubit is something genuinely richer: a vector in a 2-dimensional complex vector space. This lesson is where that abstraction becomes concrete enough to compute with.

## What you'll learn

- Why a qubit is defined as a vector, not a value
- The general form of a single-qubit state and what each symbol means
- Why the coefficients must be complex numbers, not just real probabilities
- How the normalization condition constrains every valid qubit state
- The difference between "the qubit's state" and "what you get when you measure it"

## From bit to qubit

A classical bit's entire state is captured by a single symbol: 0 or 1. There's no in-between, and no way to combine the two — a bit is never "a little bit 1." A qubit's state lives in a 2-dimensional complex vector space with a fixed orthonormal basis, written |0⟩ and |1⟩ (read "ket zero" and "ket one"). The general state of a single qubit is

|ψ⟩ = a|0⟩ + b|1⟩

where a and b are complex numbers called **amplitudes**. This is a genuinely different kind of object than a bit: it's a single vector that simultaneously has a component along |0⟩ and a component along |1⟩, not a choice between the two.

## Why complex numbers, not just probabilities

It would be tempting to think a and b are just probabilities — "60% chance of 0, 40% chance of 1." They're not. They're complex numbers, and the actual probabilities come later, via the Born rule (covered fully in Chapter 3), as |a|² and |b|². The reason amplitudes need to be complex rather than plain non-negative probabilities is that complex numbers carry a *phase*, and phase is what lets amplitudes interfere — add together and partially or fully cancel, or reinforce — in ways that plain probabilities mathematically cannot. That interference is not a side detail; it's the mechanism every quantum algorithm actually exploits, and it's the reason a qubit cannot be modeled as "a bit with some hidden randomness."

## A concrete, verified example

Take the state |ψ⟩ = 0.6|0⟩ + 0.8|1⟩. Here a = 0.6 and b = 0.8 are both real (no imaginary part needed for this example, though in general they can have one). Check that this is a legal quantum state: the normalization condition requires |a|² + |b|² = 1. Here, 0.6² + 0.8² = 0.36 + 0.64 = 1 — exactly 1, so this is a valid state. If you changed 0.8 to, say, 0.9 without changing 0.6, the state would no longer be physically valid, because 0.6² + 0.9² = 0.36 + 0.81 = 1.17 ≠ 1. The amplitudes aren't free to be anything — they're locked together by this single constraint.

## Normalization is not optional

Every valid qubit state must satisfy |a|² + |b|² = 1. This isn't a stylistic convention — it's required because (as Chapter 3 will make precise) |a|² and |b|² are the probabilities of measuring 0 and 1 respectively, and probabilities of all possible outcomes have to sum to exactly 1. A vector that doesn't satisfy this constraint isn't describing a physically possible qubit state at all; it's just an arbitrary pair of numbers.

## What this means for computing

A single classical bit holds exactly one of two values, and an n-bit register holds exactly one of 2ⁿ possible values at a time. A single qubit, by contrast, holds a full continuum of possible (a, b) pairs — subject only to the normalization constraint — and n qubits together span a 2ⁿ-dimensional complex vector space. This is the root of why qubits are not "better bits": a qubit's state is a richer mathematical object from the start, and everything quantum computing does — superposition, interference, entanglement — is built directly on this vector-space structure, not bolted on top of classical bits.

## Key terms

| Term | Meaning |
|---|---|
| Qubit | The basic unit of quantum information: a vector in a 2-dimensional complex vector space, written as a|0⟩+b|1⟩ |
| Amplitude | A complex coefficient (like a or b) attached to a basis state; its squared magnitude gives a measurement probability |
| Computational basis | The standard basis {\|0⟩, \|1⟩} used to write down and read out qubit states |
| Normalization | The requirement that \|a\|² + \|b\|² = 1 for any valid qubit state |

## Check yourself

Is ψ = 0.5|0⟩ + 0.5|1⟩ a valid quantum state? Show your work using the normalization condition, and if it isn't valid, explain what would need to change about it to make it valid.
