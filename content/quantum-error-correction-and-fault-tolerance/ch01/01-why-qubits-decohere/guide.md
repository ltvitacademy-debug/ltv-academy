# Why Qubits Decohere

A classical bit sitting in memory just sits there — it doesn't care how long you wait before reading it. A qubit does care. The moment it's created, it starts leaking its quantum information into its environment, and that leak is the single biggest reason quantum computers need error correction at all.

## What you'll learn

- What decoherence actually is, physically, and why it's different from a classical bit flip
- The two decoherence timescales every qubit has: T1 (energy relaxation) and T2 (dephasing)
- How to turn a gate duration and a T1 value into an actual decoherence probability
- Why decoherence alone explains why today's quantum hardware can't just "run longer" to get better answers

## A qubit is a fragile two-level system

A physical qubit — a superconducting circuit, a trapped ion, a photon polarization state — is a real physical object engineered to behave like an idealized two-level quantum system, with basis states |0⟩ and |1⟩ and the ability to hold an arbitrary superposition α|0⟩ + β|1⟩. That superposition is the whole point: it's what lets quantum algorithms explore exponentially many possibilities at once. But it only exists as long as the qubit stays **isolated** from its surroundings. In reality, no qubit is ever fully isolated. It sits in a dilution refrigerator, next to control wiring, bathed in stray electromagnetic fields, coupled — weakly, but never at exactly zero — to every nearby degree of freedom in the lab.

**Decoherence** is what happens when that coupling lets quantum information leak out of the qubit and into the environment. It isn't that the qubit "breaks" in the way a wire snaps. It's that the environment effectively "measures" the qubit a tiny bit at a time, without anyone intending it to, and each of those tiny measurements destroys a piece of the superposition. Once enough information has leaked out, the qubit's state has collapsed into something close to a classical, definite 0-or-1 state — the superposition is gone, and so is whatever quantum advantage it was providing.

## T1: energy relaxation

**T1**, the energy relaxation time, describes how long a qubit prepared in the excited state |1⟩ takes to decay back down to the ground state |0⟩ by losing energy to the environment — the quantum analog of a tuning fork's ringing dying out. T1 is usually the headline number quoted for a given qubit technology (tens to hundreds of microseconds for today's superconducting qubits is typical). The longer T1 is, the longer you can hold a qubit in an excited state before it spontaneously relaxes and destroys whatever information was encoded there.

## T2: dephasing

**T2**, the dephasing time, describes something subtler: how long a superposition retains the correct *relative phase* between its |0⟩ and |1⟩ components. A qubit can keep its energy (not decay via T1) while still losing track of phase — small, random fluctuations in the qubit's environment (stray magnetic fields, nearby charge noise) randomly shift the phase of the superposition over time, scrambling it even though no energy was lost. T2 is always less than or equal to 2×T1, and in practice it's often the more restrictive limit on how long a superposition survives usefully.

## Turning T1 into a number: a worked example

Treating decoherence as a simple exponential decay process, the probability that a qubit has decohered by the time a gate of duration *t* finishes, given a relaxation time T1, is:

**decayProb = 1 − e^(−t / T1)**

Using an illustrative (not any specific vendor's measured) T1 of 100 microseconds for a superconducting qubit, here's what that probability looks like across realistic single-gate durations:

| Gate duration (t) | Decoherence probability |
|---|---|
| 20 ns | ≈ 1.9998 × 10⁻⁴ (about 0.02%) |
| 50 ns | ≈ 4.9988 × 10⁻⁴ (about 0.05%) |
| 200 ns | ≈ 1.9980 × 10⁻³ (about 0.2%) |
| 1,000 ns (1 µs) | ≈ 9.9502 × 10⁻³ (about 1.0%) |

Two things jump out. First, for gate times much shorter than T1, decoherence probability scales almost linearly with time — doubling the gate duration roughly doubles the risk, which is exactly why gate speed matters so much in qubit engineering. Second, even a "slow" 1-microsecond operation on this illustrative qubit still only carries about a 1% chance of decohering on its own — individually tiny. The real danger shows up once you chain together the hundreds or thousands of gates a real algorithm needs: tiny per-gate probabilities compound into a near-certainty of at least one error somewhere in the circuit, which is precisely the motivation for quantum error correction covered later in this course.

## Why this matters: NISQ hardware is not fault-tolerant on its own

Today's quantum processors are often called **NISQ** devices — Noisy Intermediate-Scale Quantum. The "noisy" is not a hedge; it's the central engineering fact of this era. Decoherence (and the gate errors covered in Lesson 4) mean that current hardware cannot run a long, deep circuit and trust the output without help. This isn't a solved problem that this chapter is reviewing for completeness — it's the open problem that makes the rest of this course necessary. Error correction and fault tolerance exist specifically because decoherence cannot be engineered away to zero with physical qubits alone; it has to be actively detected and corrected using redundancy, which later chapters build from scratch.

## Key terms

| Term | Meaning |
|---|---|
| Decoherence | The loss of quantum information from a qubit into its environment, destroying superposition |
| T1 (relaxation time) | The characteristic time for a qubit to decay from the excited state back to the ground state |
| T2 (dephasing time) | The characteristic time for a superposition to lose its correct relative phase; always ≤ 2×T1 |
| NISQ | Noisy Intermediate-Scale Quantum — today's era of quantum hardware, too error-prone to be fault-tolerant on its own |

## Check yourself

Using the decayProb = 1 − e^(−t/T1) formula and an illustrative T1 of 100 microseconds, roughly how would the decoherence probability change if a gate's duration were cut in half, from 200 ns to 100 ns? Why does that relationship break down if gate durations start approaching T1 itself rather than staying much smaller than it?
