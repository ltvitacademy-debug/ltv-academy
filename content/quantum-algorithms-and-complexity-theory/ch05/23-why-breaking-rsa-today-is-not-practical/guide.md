# Why Breaking RSA Today Is Not Practical

Lessons 20 through 22 proved that Shor's algorithm is mathematically sound and runs in polynomial time. This lesson draws the single most important distinction in the chapter: being correct and polynomial on paper is not the same as being runnable today. The gap between those two is pure hardware engineering, and this lesson states it honestly rather than either overhyping or dismissing the threat.

## What you'll learn

- Why Shor's algorithm being polynomial-time doesn't mean RSA is breakable right now
- The widely cited Gidney & Ekerå 2019 estimate for what breaking RSA-2048 would actually require
- How that estimate compares to real quantum hardware available in the 2024–2026 era
- Why the blocker is qubit count and error rates (engineering), not the algorithm (math)

## The algorithm is sound — that was never in question

Lessons 20–22 established, with full proof and a verified numeric example, that Shor's algorithm correctly reduces factoring to period-finding and that the quantum circuit correctly performs that period-finding in polynomial time. This is settled, published mathematics, not a hopeful claim. In fact, Shor's algorithm has been physically demonstrated on real quantum hardware — successfully factoring small numbers like 15 and 21. Those demonstrations prove the algorithm works as described. What they do not prove is that scaling the same approach up to RSA-2048 is currently achievable, because the resource requirements scale very differently from the small toy cases.

## The widely cited estimate: Gidney & Ekerå (2019)

A widely cited 2019 analysis by Craig Gidney and Martin Ekerå, titled "How to factor 2048 bit RSA integers in 8 hours using 20 million noisy qubits," estimated what it would actually take to break RSA-2048 using an improved, optimized version of Shor's algorithm. The headline number — **20 million noisy (physical) qubits**, running for roughly **8 hours**, to factor a single RSA-2048 modulus — is a literature estimate from that paper, not a figure computed in this lesson. It's worth citing explicitly as sourced, external, published literature, because the number is large enough that stating it without attribution could look like an invented scare figure rather than what it actually is: a specific, peer-reviewed engineering estimate for a specific algorithmic approach.

## Comparing that estimate to real hardware

Real quantum computers built in the 2024–2026 era have qubit counts in the range of tens to low hundreds, and in a few of the largest announced systems, low thousands of physical qubits — several orders of magnitude short of the 20-million-qubit estimate above. On top of the raw qubit count gap, those physical qubits are **noisy**: today's quantum hardware has error rates per operation that are far too high to run the deep, precise circuits Shor's algorithm needs at RSA-2048 scale without error correction. Building a single reliable **logical** (error-corrected) qubit out of noisy physical qubits commonly requires overhead ratios cited in the literature in the hundreds-to-thousands of physical qubits per logical qubit, depending on the error-correction scheme and target error rate. Both of these gaps — raw count and per-qubit reliability — compound, rather than one making up for the other.

## The blocker is engineering, not math

The honest conclusion sits precisely between two kinds of overclaiming. It is wrong to say "Shor's algorithm doesn't really work" — it has been correctly run and verified on real hardware for small N. It is equally wrong to say "RSA is already broken, or about to be imminently" — the resource gap between today's hardware and the Gidney & Ekerå estimate is enormous, measured in orders of magnitude on both qubit count and error rate. The correct framing: the **algorithm** (the math proven in Lessons 20–22) is not the obstacle. The **hardware** — enough physical qubits, with low enough error rates, sustained for long enough — is the obstacle, and closing that gap is a long-term engineering problem, not a missing insight.

## Key terms

| Term | Meaning |
|---|---|
| Logical qubit | An error-corrected qubit built from many noisy physical qubits, reliable enough for long computations |
| Physical qubit | An actual hardware qubit, subject to real noise and error rates |
| Gidney & Ekerå estimate (2019) | A widely cited literature estimate: ~20 million noisy qubits, ~8 hours, to factor RSA-2048 |
| Error-correction overhead | The ratio of physical qubits needed per reliable logical qubit, commonly cited in the hundreds to thousands |

## Check yourself

A classmate argues: "Shor's algorithm has already factored numbers on real quantum computers, so RSA-2048 must be close to breakable." Using the distinction between the algorithm's correctness and the hardware's current scale from this lesson, explain what's wrong with that reasoning.
