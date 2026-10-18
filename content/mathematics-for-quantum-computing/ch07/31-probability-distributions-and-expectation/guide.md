# Probability Distributions & Expectation

Every quantum circuit you build eventually ends in a measurement, and a measurement's outcome is random — governed by a probability distribution derived from the state's amplitudes. This lesson covers the probability concepts (distributions, expectation value) that let you reason precisely about what a quantum computer actually tells you, on average, across many runs.

## What you'll learn

- What a discrete probability distribution is, formally
- Expectation value: the precise meaning of "average outcome"
- Computing the expectation value of a qubit measurement in the Z basis
- Why expectation value is what quantum algorithms often actually compute

## A probability distribution, formally

A **discrete probability distribution** assigns a non-negative probability to each possible outcome, with all probabilities summing to 1. A qubit measured in the computational basis has exactly two possible outcomes — 0 and 1 — with probabilities `P(0) = |α|²` and `P(1) = |β|²` from the state `|ψ⟩ = α|0⟩ + β|1⟩`. This is the simplest possible probability distribution: two outcomes, and `P(0) + P(1) = 1` by the normalization condition you already know from Chapter 5.

## Expectation value: the precise meaning of "average"

The **expectation value** of a random variable is the sum of each possible outcome's value weighted by its probability: `E[X] = Σ x · P(x)`. This is the formal definition behind the everyday idea of "average" — not the average of outcomes you happened to observe, but the theoretical average you'd converge to given infinitely many samples from the true distribution.

For a qubit measured in the Z basis, it's conventional to assign the value `+1` to outcome `0` and `-1` to outcome `1` (this convention matches the Pauli-Z operator's eigenvalues, which you'll see directly in Qiskit and other tools). Consider a qubit with `P(0) = 0.64` and `P(1) = 0.36`:

```python
p0, p1 = 0.64, 0.36
expectation_z = p0 * 1 + p1 * (-1)
print(f"E[Z] = {expectation_z}")
```

```
E[Z] = 0.28
```

The expectation value is `0.28` — not one of the two possible individual outcomes (`+1` or `-1`), but their probability-weighted average. This is the honest, precise meaning of "this qubit leans toward outcome 0" — `0.28` is closer to `+1` (outcome 0's value) than to `-1`, reflecting that outcome 0 is indeed more likely (0.64 vs. 0.36).

## Why expectation value matters for quantum algorithms

Many real quantum algorithms — the variational algorithms you'll study later in this path, including VQE and QAOA — don't just want a single measurement outcome; they want the *expectation value* of some operator, computed by running the circuit many times and averaging the results. A single measurement is one noisy sample from the underlying probability distribution; the expectation value is the actual quantity the algorithm's math is built around, and it only converges to that value as the number of repeated measurements ("shots") grows large. This is exactly why Qiskit and other tools default to running a circuit hundreds or thousands of times rather than once — one shot gives you one random outcome, not the expectation value.

## Key terms

| Term | Meaning |
|---|---|
| Discrete probability distribution | An assignment of non-negative probabilities to each possible outcome, summing to 1 |
| Expectation value | The probability-weighted average of a random variable's possible values, E[X] = Σ x·P(x) |
| Shot | One repeated run of a quantum circuit, used to build up an estimate of a probability distribution or expectation value |

## Check yourself

A qubit has P(0) = 0.1 and P(1) = 0.9. Using the +1/-1 convention for the Z measurement, what is E[Z], and does its sign match your intuition about which outcome is more likely?
