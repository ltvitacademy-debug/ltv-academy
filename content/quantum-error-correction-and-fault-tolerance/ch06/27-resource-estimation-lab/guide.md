# Resource-Estimation Lab

Two new scenarios, computed directly using the same method as the last lesson — this time you do the multiplication alongside the walkthrough.

## What you'll learn

- How to size a physical-qubit budget for a new hypothetical algorithm from scratch
- How code distance choice directly drives total cost, holding logical-qubit count fixed
- How to reuse the lesson 24 cost table as a lookup for any new scenario

## Scenario 1: 50 logical qubits at distance 11

From lesson 24's verified table, a distance-11 surface code costs **241 physical qubits per logical qubit**. For an algorithm needing 50 logical qubits at this distance:

**50 × 241 = 12,050 physical qubits**

## Scenario 2: 20 logical qubits at distance 27

From the same table, a distance-27 surface code costs **1,457 physical qubits per logical qubit** — a much higher distance, chosen here because this hypothetical algorithm needs a lower target logical error rate per qubit than Scenario 1. For 20 logical qubits at this distance:

**20 × 1,457 = 29,140 physical qubits**

## Comparing the two scenarios

Scenario 2 needs fewer *logical* qubits (20 vs. 50) but ends up costing more than twice as many *physical* qubits (29,140 vs. 12,050). The driver isn't the logical-qubit count at all — it's the code distance. Distance 27 costs over 6x as much per logical qubit as distance 11 (1,457 / 241 ≈ 6.05), which more than offsets having fewer logical qubits to protect. This is the practical lesson underneath the arithmetic: **the target logical error rate (which sets the required distance) typically dominates the total physical-qubit budget far more than the raw logical-qubit count does.** An algorithm that needs very high per-qubit reliability will cost far more than one needing many logical qubits at a looser tolerance, even if the second algorithm sounds "bigger" by logical-qubit count alone.

## The reusable method

Both scenarios, and the worked example in the previous lesson, follow the identical two-step method:

1. Look up (or compute via total = 2d² − 1) the physical-qubit cost per logical qubit at the chosen code distance.
2. Multiply by however many logical qubits the target algorithm needs.

This is exactly the "first-order estimate" named in the previous lesson — simple, reusable, and the right first step before reaching for a fuller, literature-grade estimate (like the Gidney & Ekerå figure) that accounts for additional overheads such as magic-state distillation, covered next in chapter 7.

## Key terms

| Term | Meaning |
|---|---|
| Distance-driven cost | The observation that required code distance (driven by target logical error rate), not logical-qubit count alone, often dominates total physical-qubit cost |
| Two-step estimate | Look up per-logical-qubit cost at the chosen distance, then multiply by the number of logical qubits needed |

## Check yourself

A third hypothetical algorithm needs 200 logical qubits at distance 9 (161 physical qubits per logical qubit, from lesson 24's table). Compute the total physical-qubit cost yourself, and compare it to both scenarios above — does it land closer to Scenario 1's or Scenario 2's total, and what does that tell you about the relative influence of logical-qubit count versus distance in this specific case?
