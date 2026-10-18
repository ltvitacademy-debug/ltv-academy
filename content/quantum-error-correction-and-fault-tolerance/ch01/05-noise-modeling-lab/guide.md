# Noise-Modeling Lab

Time to combine everything from this chapter into one concrete number. This lab walks through a small, illustrative three-gate circuit and computes an actual total error probability estimate by combining decoherence and depolarizing noise — exactly the kind of back-of-envelope calculation that justifies why error correction is necessary before you've written a single line of a correction code.

## What you'll learn

- How to combine a decoherence probability and a depolarizing probability into one per-gate error estimate
- How to compose per-gate error probabilities across a multi-gate circuit
- How to read a worked numeric example end to end, with every intermediate number shown
- Why even "small" per-gate error rates compound quickly across realistic circuit depths

## The scenario

Consider an illustrative three-gate circuit running sequentially on a single qubit, on hardware with an illustrative T1 of 100 microseconds (same as Lessons 1 and 4) and an illustrative fixed depolarizing gate-error probability of p = 0.001 per gate (same order of magnitude used in Lesson 4's discussion). The three gates have different native durations:

| Gate | Duration | Decoherence prob. (idle) | Depolarizing prob. (gate error) |
|---|---|---|---|
| Gate 1 | 20 ns | ≈ 1.9998 × 10⁻⁴ | 0.001 |
| Gate 2 | 50 ns | ≈ 4.9988 × 10⁻⁴ | 0.001 |
| Gate 3 | 200 ns | ≈ 1.9980 × 10⁻³ | 0.001 |

Each gate therefore has *two* independent ways it can go wrong: it can decohere while executing (time-dependent, from Lesson 1), or it can suffer a depolarizing gate error (roughly time-independent, from Lessons 3 and 4). Treating these as independent events, the probability that a given gate comes through *clean* (survives both error sources) is the product of each source's individual survival probability:

**P(survive this gate) = (1 − decoherence_prob) × (1 − depolarizing_prob)**

Equivalently, the probability that *something* goes wrong on that gate (either source) is:

**P(error on this gate) = decoherence_prob + depolarizing_prob − (decoherence_prob × depolarizing_prob)**

## Step 1: compute each gate's combined error probability

Working this out gate by gate (computed directly, not estimated):

- **Gate 1** (20 ns): decoherence ≈ 1.9998×10⁻⁴, depolarizing = 1.0×10⁻³ → combined error ≈ **1.1998×10⁻³**, survival ≈ 0.998800
- **Gate 2** (50 ns): decoherence ≈ 4.9988×10⁻⁴, depolarizing = 1.0×10⁻³ → combined error ≈ **1.4994×10⁻³**, survival ≈ 0.998501
- **Gate 3** (200 ns): decoherence ≈ 1.9980×10⁻³, depolarizing = 1.0×10⁻³ → combined error ≈ **2.9960×10⁻³**, survival ≈ 0.997004

Notice Gate 3's combined error is almost exactly the sum of its two component probabilities (1.998×10⁻³ + 1.0×10⁻³ ≈ 2.998×10⁻³ ≈ the actual 2.9960×10⁻³) — that's expected, since both probabilities are small, and the correction term (their product) is tiny enough to be negligible at this scale.

## Step 2: compose across all three gates

Treating the three gates as independent events in sequence, the circuit survives cleanly only if *all three* gates individually survive. The overall survival probability is the product of the three per-gate survival probabilities:

**P(circuit survives) = 0.998800 × 0.998501 × 0.997004 ≈ 0.994315**

Which means the overall probability that *at least one* error occurred somewhere across the three gates is:

**P(total error) = 1 − 0.994315 ≈ 5.6853 × 10⁻³ (about 0.57%)**

## Reading the result

A roughly 0.57% chance of an error somewhere across just three gates might not sound alarming on its own. But notice how fast this compounds: this tiny three-gate circuit already has a worse-than-1-in-200 chance of carrying at least one undetected error. Scale this same illustrative error rate up to a real algorithm's circuit — hundreds or thousands of gates deep — and the probability of *zero* errors across the whole circuit collapses toward zero. That's not a flaw in this particular calculation; it's the central, unavoidable fact that motivates everything in the rest of this course. Raw physical qubits, even reasonably good ones, cannot run a long computation error-free on their own. The only way to run deep circuits reliably is to detect and correct errors *as they happen*, using redundancy across multiple physical qubits — which is exactly what the error-correcting codes in Chapter 3 are built to do, starting from the X and Z error types defined back in Lesson 2.

## A note on this exercise

Every number in this lab is explicitly **illustrative**: a chosen T1, a chosen depolarizing rate, and a simple independent-event composition model, not a measurement from any specific real quantum processor and not a claim that real multi-gate circuits combine errors in exactly this simple way (real circuits also have correlated errors, leakage, and readout errors not modeled here at all). The value of the exercise isn't the exact digits — it's the method: breaking a circuit into gates, estimating each error source per gate, and composing them to see how quickly small numbers add up.

## Key terms

| Term | Meaning |
|---|---|
| Combined per-gate error probability | The probability that either the decoherence source or the depolarizing source (or both) causes an error on a single gate |
| Independent-event composition | Multiplying per-gate survival probabilities together to get the probability that an entire sequence of gates all succeed |
| Circuit depth | The number of sequential gate operations a qubit passes through in a circuit; a key driver of total accumulated error |

## Check yourself

If this same three-gate circuit were extended to 10 gates of similar durations and error rates instead of 3, would you expect the total circuit error probability to stay below 2%, stay around 2%, or exceed 2%? Walk through roughly why, using the composition method from this lab rather than just guessing.
