# Capstone: the Quantum Error Correction Laboratory

One closing worked scenario, pulling every chapter of this course into a single argument — and a last chance to size a real system end to end, honestly.

## What you'll learn

- How every chapter's idea connects into one coherent chain, from noise to fault tolerance
- How to size a hypothetical fault-tolerant system for a named task, end to end
- Why the final number is simultaneously a triumph of theory and a reminder of how far engineering still has to go

## The chain, in order

**Chapter 1** established the problem: real qubits decohere (T1, T2) and suffer gate errors, which is why quantum hardware can't just "run longer" to get reliable answers — noise is the reason error correction is necessary at all.

**Chapter 2** showed why the classical fix (repeat and vote) doesn't transfer: you can't measure a qubit without collapsing it, and the no-cloning theorem forbids copying an unknown quantum state outright. Quantum codes need a fundamentally different mechanism.

**Chapter 3** built that mechanism concretely: the 3-qubit bit-flip and phase-flip codes use entanglement (not copying) and syndrome measurement (which reveals the error, never the data) to correct one error type each, and the Shor code combined both into protection against any single-qubit error — the first proof that quantum error correction is possible at all.

**Chapter 4** generalized this into the stabilizer formalism and the CSS construction, producing the Steane [[7,1,3]] code — same single-error protection as Shor's code, fewer physical qubits, and transversal gates as a bonus.

**Chapter 5** showed why the surface code, not Steane or Shor, is the leading practical candidate: nearest-neighbor-only connectivity, a comparatively favorable threshold, and low-weight local stabilizers — at the cost of a much larger, but tunable, physical-qubit overhead (2d² − 1 per logical qubit).

**Chapter 6** quantified that overhead precisely, and paired it with the threshold theorem's promise: below threshold, each step up in distance buys exponentially better logical error suppression for only quadratically more physical qubits — the real, computed justification for why scaling up the surface code is worth doing.

**Chapter 7** closed the gap between "having a code" and "having a fault-tolerant computer": fault-tolerant gadgets to contain single faults, magic-state distillation to supply the one gate (T) that transversal Clifford gates can't provide, and an honest accounting of where real hardware stands today — genuine small-scale milestones, still firmly in the NISQ era, with useful-scale fault tolerance remaining a forward-looking engineering goal.

## Capstone scenario: sizing a 50-logical-qubit system at distance 21

Suppose you're asked to size a fault-tolerant system for a hypothetical algorithm needing **50 logical qubits**, each protected at code distance **d = 21** (chosen, in this scenario, because the algorithm's target reliability requires it).

**Step 1 — per-logical-qubit cost:** using the verified surface-code formula from chapters 5-6, total = 2d² − 1 = 2(441) − 1 = **881 physical qubits per logical qubit**.

**Step 2 — total physical qubits:** 50 logical qubits × 881 physical qubits per logical qubit = **44,050 physical qubits**, just for the base error-correcting code — before adding magic-state distillation overhead (chapter 7, lesson 29) for any T gates the algorithm needs, which would add still more on top of this figure.

**Step 3 — the threshold condition:** none of this protection materializes unless the hardware's actual physical error rate sits below the surface code's threshold p_th (chapter 6, lesson 25) — distance alone doesn't help if that condition isn't met.

**Step 4 — the honest conclusion:** 44,050 physical qubits (before distillation overhead) is far beyond any current NISQ-era device's qubit count. This single scenario is the whole course in miniature: the theory (threshold theorem) says scaling up is worth it, the arithmetic (2d²−1, computed directly) says exactly what it costs, and the honest assessment (chapter 7) says current hardware isn't there yet — all three things are true at once, and holding all three together, rather than collapsing into either "it's hopeless" or "it's basically solved," is the actual, defensible professional position in this field today.

## Key terms

| Term | Meaning |
|---|---|
| End-to-end sizing | Combining code-cost arithmetic, the threshold condition, and current-hardware honesty into one real system estimate |
| Course arc | The chain from noise (ch1) through no-cloning (ch2), concrete codes (ch3), generalization (ch4), the surface code (ch5), resource math (ch6), to fault tolerance (ch7) |

## Check yourself

If this same 50-logical-qubit algorithm instead only needed code distance d=9 (161 physical qubits per logical qubit) because its reliability requirement was looser, how many total physical qubits would the base code require, and how does that figure change the "how far from NISQ-era hardware is this" conclusion compared to the d=21 case?
