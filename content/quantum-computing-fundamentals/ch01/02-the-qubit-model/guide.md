# The Qubit Model

A qubit is not "a bit that's secretly both 0 and 1." That framing shows up everywhere in pop science, and it will actively mislead you once you start working with circuits. This lesson gives you the real object: a vector in a two-dimensional complex space, governed by one precise rule connecting it to what you actually observe.

## What you'll learn

- The qubit as a state vector |ψ⟩ = α|0⟩ + β|1⟩, with |0⟩ and |1⟩ as explicit column vectors
- The normalization constraint |α|² + |β|² = 1 (the Born rule) and why it must hold
- The precise distinction between an amplitude and a probability
- A worked example: computing exact measurement probabilities from a concrete state
- Why "superposition" is a specific mathematical claim, not a claim about secretly being in two places at once

## Dirac notation and the two basis states

Quantum computing uses a compact notation called Dirac notation (or "bra-ket" notation), where a quantum state is written as |ψ⟩ — read "ket psi." For a single qubit, there are two special reference states that play the same role 0 and 1 play for a classical bit. They are written |0⟩ and |1⟩, and as vectors they are:

|0⟩ = [1, 0]ᵀ   and   |1⟩ = [0, 1]ᵀ

(the ᵀ means "transpose" — these are column vectors, written sideways here for readability: |0⟩ has a 1 in the top slot and 0 in the bottom; |1⟩ has 0 on top and 1 on the bottom). These two vectors form a basis for a two-dimensional space — every possible single-qubit state can be written as some combination of them. This pair, {|0⟩, |1⟩}, is called the computational basis, and it's the one that corresponds directly to the classical bit values 0 and 1 when you measure.

## The general qubit state

A qubit's state is written as a linear combination of the two basis vectors:

|ψ⟩ = α|0⟩ + β|1⟩

Here α and β are complex numbers called **amplitudes**. As a column vector, this state is [α, β]ᵀ. This is the whole object — a single qubit's complete physical state is nothing more or less than this pair of complex numbers, subject to one constraint described next. Nothing about this vector says the qubit "is" 0 or "is" 1, and nothing says it's "both at once" in the classical sense either. It's a different kind of object entirely, and the only way to connect it to an actual 0-or-1 outcome is the rule in the next section.

## The Born rule: amplitudes are not probabilities

The constraint on α and β is:

|α|² + |β|² = 1

This is called normalization, and the rule connecting it to real-world outcomes is the **Born rule**: if you measure the qubit in the computational basis, you get outcome "0" with probability |α|² and outcome "1" with probability |β|². Three things in that sentence need to be precise:

First, amplitudes and probabilities are not the same thing, and this is the single most common point of confusion for newcomers. α and β can be negative, and in general they're complex numbers — they can have a phase. Probabilities, by contrast, must be real numbers between 0 and 1. You get from an amplitude to a probability by taking its squared magnitude: |α|². An amplitude of −0.6 and an amplitude of +0.6 give the *exact same probability* (0.36) but are physically different states — that minus sign (relative phase) has real, measurable consequences once you combine qubits or apply gates, even though it's invisible if you only ever look at single-qubit measurement probabilities.

Second, measurement is not optional or passive. Before you measure, the qubit's state is the full vector [α, β]ᵀ. The instant you measure in the computational basis, the qubit **collapses**: it becomes either |0⟩ or |1⟩ outright, with the odds given by the Born rule, and all the information that used to be encoded in the precise values of α and β (beyond that one bit of outcome) is gone. You do not get to read out α and β directly from a single qubit — you only get one classical sample, governed by those probabilities.

Third, superposition is the name for a state where both α and β are nonzero — not "the qubit is 0 and 1 simultaneously," but "the qubit is in a single, well-defined vector state whose two components will each produce a different classical outcome with their own specific, calculable probability upon measurement." That is the entire technical content of the word. It's precise and it's less exciting-sounding than the pop-science version, but it's the version you can actually compute with.

## A worked example

Take the state |ψ⟩ = (1/√2)|0⟩ + (1/√2)|1⟩, so α = β = 1/√2 ≈ 0.7071. Check normalization and compute the measurement probabilities:

- P(0) = |α|² = (1/√2)² = 1/2 = 0.5
- P(1) = |β|² = (1/√2)² = 1/2 = 0.5
- Sum check: 0.5 + 0.5 = 1 ✓ (confirmed numerically: `(1/Math.sqrt(2))**2 + (1/Math.sqrt(2))**2 = 0.9999999999999998`, which is 1 up to floating-point rounding)

So this particular qubit, if measured, comes out 0 half the time and 1 half the time across many identical preparations — exactly like a fair coin's statistics, which is part of why the pop-science shorthand is tempting. But the underlying object is not a coin with hidden knowledge of its outcome; it's a vector with two equal, specific amplitude components, and that vector is what gates will manipulate (next chapter) before any measurement ever happens.

## Key terms

| Term | Meaning |
|---|---|
| State vector \|ψ⟩ | The complete description of a qubit's state: α\|0⟩ + β\|1⟩, a vector in 2D complex space |
| Amplitude | A complex number (α or β) describing a basis component's contribution; can be negative or complex, not itself a probability |
| Born rule | The rule that converts amplitudes into measurement probabilities: P(outcome) = \|amplitude\|² |
| Normalization | The constraint \|α\|² + \|β\|² = 1, required for the Born rule's probabilities to sum to 1 |
| Computational basis | The reference pair {\|0⟩, \|1⟩} that measurement outcomes are expressed in |
| Collapse | What happens to a qubit's state vector upon measurement: it becomes exactly \|0⟩ or \|1⟩, discarding the rest of the amplitude information |

## Check yourself

A qubit is prepared as |ψ⟩ = (√3/2)|0⟩ − (1/2)|1⟩. Verify this state is properly normalized, then state the probability of measuring 0 and the probability of measuring 1. What role does the minus sign on the second amplitude play in this calculation, and why might it still matter physically even though it doesn't affect either of those two probabilities?
