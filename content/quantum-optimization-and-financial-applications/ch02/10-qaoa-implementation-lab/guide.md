# QAOA Implementation Lab

Everything in Chapter 2 so far has used two reference graphs: a single edge and a 4-cycle. This lab hands you a third, slightly different graph — a 3-node path — and walks you through simulating depth-1 QAOA on it yourself, reading the resulting probability distribution, and connecting what you see back to the cost and mixer Hamiltonians from Lesson 7.

## What you'll learn

- How to set up a QAOA simulation for a new, previously-unseen graph
- How to read a full measurement-probability table and connect it back to cut values
- Why QAOA's output is a *probability distribution* over bitstrings, not a single deterministic answer
- How approximation ratio behaves on an odd-sized graph (3 nodes, not a clean bipartition)
- The practical workflow you'd follow with real quantum hardware or a simulator SDK

## The lab graph

Three nodes {0, 1, 2}, connected in a path: edges E = {(0,1), (1,2)} — node 1 is connected to both node 0 and node 2, but node 0 and node 2 are not directly connected to each other.

**First, find the true optimum by direct reasoning.** With only 2 edges and 3 nodes, the maximum possible cut is 2 (both edges cut simultaneously). This is achievable: put node 1 in one group and nodes 0 and 2 in the other, e.g., x = (0, 1, 0) or x = (1, 0, 1) — since both edges touch node 1, putting node 1 alone on one side cuts both of them. Brute-force checking all 8 possible assignments confirms the true maximum cut is **2**.

## Running the depth-1 simulation

Building the cost Hamiltonian from the per-edge terms (Lesson 7) and running an exact state-vector simulation across the (γ, β) landscape (same exhaustive-scan method as Lessons 6 and 9), the best depth-1 result found is:

**Best expected cost ≈1.6495, at γ ≈ 1.052, β ≈ 0.393**

Against the true optimum of 2, that's an approximation ratio of **≈0.8248** — notably better than the 4-cycle's depth-1 ratio of ≈0.75 (Lesson 9), because this smaller, simpler graph is easier for a single QAOA layer to handle well.

## Reading the full probability table

Here is the complete measurement-probability distribution at those optimal depth-1 angles, across all 8 possible 3-qubit basis states (computed by direct simulation, not estimated):

| Bits (x0,x1,x2) | Cut value | Probability |
|---|---|---|
| (0,0,0) | 0 | 0.0098 |
| (1,0,0) | 1 | 0.0778 |
| (0,1,0) | 2 | **0.3345** |
| (1,1,0) | 1 | 0.0778 |
| (0,0,1) | 1 | 0.0778 |
| (1,0,1) | 2 | **0.3345** |
| (0,1,1) | 1 | 0.0778 |
| (1,1,1) | 0 | 0.0098 |

Notice the shape: the two optimal assignments, (0,1,0) and (1,0,1) — both cutting both edges — each carry the highest probability, 0.3345, a combined 66.9% of all measurement outcomes. The two "do nothing" assignments, (0,0,0) and (1,1,1) — cutting zero edges — are suppressed to the smallest probability, 0.0098 each. The four cost-1 assignments sit in between at 0.0778 each. This is exactly what a well-tuned QAOA circuit is supposed to do: it doesn't guarantee a single deterministic optimal answer (there's still roughly a 1-in-3 chance of measuring something suboptimal), but it skews the odds heavily toward the good answers and away from the bad ones.

## What this means practically

If you ran this circuit on real hardware with, say, 1000 measurement shots at these angles, you'd expect roughly 334 or 335 shots to land on each of the two optimal bitstrings, roughly 78 shots on each of the four cost-1 bitstrings, and only about 10 shots on each all-same-group bitstring. The practical workflow — and this generalizes to every QAOA application in this course, including the finance problems in Chapter 4 — is: run many shots, keep a running tally of the best (lowest-cost or highest-cut) bitstring actually measured, and report that as your answer, while using the measured expectation value ⟨H_C⟩ as the signal the classical optimizer uses to keep improving γ and β (Lesson 8). You never trust a single shot; you trust the best-of-many-shots result, informed by a distribution that a well-tuned circuit has deliberately skewed in your favor.

## Key terms

| Term | Meaning |
|---|---|
| Path graph | A graph where nodes are connected in a line, each (except the endpoints) connected to exactly two neighbors |
| Measurement-probability distribution | The full table of probabilities QAOA assigns to every possible bitstring at a given set of parameters |
| Best-of-many-shots | The practical QAOA readout strategy: run many measurement shots and report the best (highest-cut) bitstring actually observed |
| Probability skew | How strongly a tuned QAOA circuit biases measurement outcomes toward good solutions versus the uniform baseline |

## Check yourself

In the uniform superposition before any cost or mixer unitary is applied (p=0, pure Hadamards), every one of the 8 basis states would have equal probability 1/8 = 0.125. Compare that baseline to the tuned depth-1 distribution in this lesson's table, and explain in your own words what "QAOA improved the distribution" concretely means in terms of these specific probability numbers — which states gained probability, which lost it, and by roughly how much.
