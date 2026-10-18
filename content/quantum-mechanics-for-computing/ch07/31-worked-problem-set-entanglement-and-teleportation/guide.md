# Worked Problem Set: Entanglement & Teleportation

A synthesis problem set spanning Chapters 4-5: entanglement, Bell states, the CHSH inequality, no-cloning, teleportation, and superdense coding. Every number here was already verified earlier in the course.

## What you'll learn

- How to build a Bell state from scratch using two gates
- How to prove a 2-qubit state is entangled by attempting (and failing) to factor it
- What the CHSH violation actually proves, precisely
- How to trace through the full teleportation correction table
- Why teleportation and no-cloning are consistent, not contradictory

## Problem 1: Build |Φ+⟩ from |00⟩

**Problem:** Walk through building the Bell state |Φ+⟩=(|00⟩+|11⟩)/√2 starting from |00⟩, using only Hadamard and CNOT.

**Solution:** Step 1: apply Hadamard to qubit 1. Since H|0⟩=|+⟩=(|0⟩+|1⟩)/√2, the 2-qubit state becomes (|00⟩+|10⟩)/√2. Step 2: apply CNOT with qubit 1 as control, qubit 2 as target. CNOT flips qubit 2 whenever qubit 1 is 1: the |00⟩ term is unaffected (control is 0), and the |10⟩ term becomes |11⟩ (control is 1, target flips). Result: (|00⟩+|11⟩)/√2 — exactly |Φ+⟩ (verified by direct amplitude tracking through both gates).

## Problem 2: Prove |Φ+⟩ is entangled

**Problem:** Show that |Φ+⟩=(|00⟩+|11⟩)/√2 cannot be written as a product of two single-qubit states.

**Solution:** Suppose, for contradiction, |Φ+⟩=(a|0⟩+b|1⟩)⊗(c|0⟩+d|1⟩)=ac|00⟩+ad|01⟩+bc|10⟩+bd|11⟩. Matching coefficients against |Φ+⟩'s actual amplitudes requires ac=1/√2, ad=0, bc=0, bd=1/√2. From ad=0: either a=0 or d=0. If a=0, then ac=0, contradicting ac=1/√2≠0. If d=0, then bd=0, contradicting bd=1/√2≠0. Either way, contradiction — no such factorization exists. |Φ+⟩ is genuinely entangled.

## Problem 3: What the CHSH violation proves

**Problem:** Using angles a=0°, a′=90°, b=45°, b′=135°, the CHSH value comes out to |S|=2√2≈2.828 (verified), exceeding the classical bound of |S|≤2. What does this actually prove?

**Solution:** It proves that no local-hidden-variable theory — no model where each qubit secretly carries pre-determined, fixed answers for every possible measurement angle, with no instantaneous influence between the two distant qubits — can reproduce the correlations quantum mechanics predicts (and that real experiments, Aspect/Zeilinger/Clauser et al., have confirmed). It does *not* prove faster-than-light signaling is possible, and it does *not* mean "anything goes" — it specifically rules out the classical-shared-randomness explanation for the strength of these correlations, nothing more and nothing less.

## Problem 4: Full teleportation walk-through

**Problem:** Alice teleports |ψ⟩=0.6|0⟩+0.8|1⟩ to Bob. Walk through all four possible outcomes and confirm Bob recovers |ψ⟩ exactly in each case.

**Solution:** Using the verified table from Chapter 5: outcome Φ+ (prob 0.25) leaves Bob's qubit at (0.6,0.8) — apply I, done. Outcome Φ− (prob 0.25) leaves (0.6,−0.8) — apply Z: flips the sign of the second amplitude, giving (0.6,0.8). Outcome Ψ+ (prob 0.25) leaves (0.8,0.6) — apply X: swaps the amplitudes, giving (0.6,0.8). Outcome Ψ− (prob 0.25) leaves (−0.8,0.6) — apply X first (swap): (0.6,−0.8), then Z (sign flip on second amplitude): (0.6,0.8). All four cases converge to exactly (0.6,0.8), each with probability 0.25, summing to a combined probability of 1 that Bob successfully recovers |ψ⟩ after applying the outcome-matched correction.

## Problem 5: Why teleportation doesn't violate no-cloning

**Problem:** Explain why Bob ending up with |ψ⟩ doesn't contradict the no-cloning theorem from Chapter 5.

**Solution:** No-cloning forbids a second, independent copy of |ψ⟩ coming into existence *while the first one still exists*. In teleportation, Alice's Bell measurement collapses and destroys her original qubit's state in the very act of extracting the classical outcome needed to complete the protocol. At no point do both Alice and Bob simultaneously hold |ψ⟩ — the state is relocated, not duplicated. This is fully consistent with, not an exception to, no-cloning.

## Key terms

| Term | Meaning |
|---|---|
| Entanglement proof by contradiction | Assuming a state factors into a product, then showing the required coefficients are mathematically inconsistent |
| Local hidden variable | A hypothetical pre-determined, non-communicating explanation for correlation, ruled out for entangled states by CHSH violation |

## Check yourself

In Problem 1's circuit, what would the result be if you applied CNOT (qubit 1 control, qubit 2 target) to |00⟩ directly, without first applying Hadamard to qubit 1? Is the result entangled? Explain using the same factoring approach as Problem 2.
