# Classical vs. Quantum Information Lab

Time to put exact numbers side by side. This lab walks through classical and quantum information using the same small system size, n=3, so you can see precisely where they match, where they diverge, and why that divergence is the single idea the rest of this course keeps coming back to.

## What you'll learn

- A direct, numeric side-by-side of n classical bits vs. n qubits at the same system size
- Why n qubits need 2ⁿ amplitudes to describe their state, yet still yield only n classical bits on readout
- A fully worked 3-qubit example: 8 amplitudes, confirmed to sum to probability 1
- Why this exponential-representation-vs-linear-readout gap is the central tension in quantum computing — the thing that makes it powerful AND the thing that makes it hard to simulate or use

## Classical side: n=3 bits

Three classical bits need exactly 3 bits of physical memory. Their state space has 2³ = 8 possible configurations: 000, 001, 010, 011, 100, 101, 110, 111. But — as Lesson 1 established — the system is only ever in exactly one of those 8 at any instant. Describing the system's actual current state takes exactly 3 bits of information: whichever one of the 8 strings it currently is. Memory cost and description cost are the same thing here, and both scale as n (linear in storage per configuration you're actually representing, though the space you're choosing from scales as 2ⁿ).

## Quantum side: n=3 qubits

Three qubits are a system whose state vector lives in a 2³ = 8-dimensional complex vector space. The general 3-qubit state is:

|ψ⟩ = c₀|000⟩ + c₁|001⟩ + c₂|010⟩ + c₃|011⟩ + c₄|100⟩ + c₅|101⟩ + c₆|110⟩ + c₇|111⟩

That's 8 complex amplitudes (c₀ through c₇), one for every possible 3-bit string, constrained by the generalized Born rule: |c₀|² + |c₁|² + ... + |c₇|² = 1. To fully specify this state classically — to write down every one of those 8 numbers — you need far more than 3 bits of information (each complex amplitude alone takes real-valued precision to describe). This is already the first half of the central tension: **representing** a general n-qubit state takes resources that grow as 2ⁿ, exponentially in n, not linearly.

## Worked example: the uniform 3-qubit superposition

Let's build a concrete state and check the numbers exactly. Take the uniform superposition over all 8 basis states — every amplitude equal, each set to 1/√8:

|ψ⟩ = (1/√8)(|000⟩ + |001⟩ + |010⟩ + |011⟩ + |100⟩ + |101⟩ + |110⟩ + |111⟩)

Verifying the key numbers with plain arithmetic (`node -e`):

```
2^3 = 8
amplitude per basis state = 1/√8 = 0.35355339059327373
probability per basis state = (1/√8)^2 = 0.12499999999999997  (≈ 1/8)
sum over 8 states = 8 × (1/8) = 0.9999999999999998  (≈ 1, correct up to floating-point rounding)
```

So this is a valid, correctly normalized state: 8 amplitudes, each contributing a 1/8 measurement probability, summing to 1 as required. Measuring this 3-qubit system gives you one of the 8 possible 3-bit strings, each with equal 1/8 probability — a genuinely random 3-bit outcome, structurally identical in its *output statistics* to just flipping 3 fair coins.

## The gap: exponential representation, linear readout

Here is the tension, stated as precisely as possible, because it is the single most important idea in this chapter and it reappears directly when this course covers simulation limits later on:

- **To represent** the state of n qubits in full generality, you need 2ⁿ complex amplitudes. This grows explosively — 10 qubits need 1,024 amplitudes, 50 qubits need over a quadrillion, far beyond what any classical computer could ever store or manipulate directly.
- **To read out** that system, a single measurement gives you exactly n classical bits — one definite string, sampled according to the probabilities those 2ⁿ amplitudes encode. No more, no less, regardless of how large n gets.

This gap is not a flaw to be engineered away — it's the structural fact that defines what quantum computers can and can't do. It's *why* quantum computers are potentially powerful: an n-qubit system carries exponentially richer structure (those 2ⁿ interfering amplitudes) than n classical bits ever could, which is the resource that algorithms like Shor's and Grover's exploit through interference (Lesson 3). It's also *why* quantum computers are hard to simulate classically: a classical computer trying to track all 2ⁿ amplitudes exactly hits that same exponential wall from the representation side, which is exactly the problem covered later in this course under quantum simulation. And it's why algorithm design is hard in the first place: you have exponential internal structure to work with, but you only ever get a linear (n-bit) glimpse of it per run, so every useful algorithm has to be engineered so that glimpse is actually informative.

## Key terms

| Term | Meaning |
|---|---|
| State space (classical) | For n classical bits, the 2ⁿ possible configurations; the system occupies exactly one at a time, describable in n bits |
| State vector dimension (quantum) | For n qubits, the state lives in a 2ⁿ-dimensional complex vector space, requiring 2ⁿ amplitudes to specify fully |
| Exponential representation | The fact that fully describing a general n-qubit state requires resources growing as 2ⁿ |
| Linear readout | The fact that a single measurement of n qubits yields exactly n classical bits, regardless of how many amplitudes the state has |
| Uniform superposition | The specific n-qubit state where all 2ⁿ amplitudes are equal (each 1/√2ⁿ), giving each measurement outcome equal probability 1/2ⁿ |

## Check yourself

For a 4-qubit uniform superposition (all 16 amplitudes equal), what is each amplitude's numeric value, what is each outcome's measurement probability, and do those 16 probabilities sum to 1? Show the arithmetic, then explain in your own words why having 16 amplitudes to work with doesn't mean a single measurement reveals more than 4 bits of information.
