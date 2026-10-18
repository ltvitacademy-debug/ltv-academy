# Basic QEC Implementation Lab

A hands-on trace through both 3-qubit codes end to end, reusing the verified tables from this chapter — the goal is to be able to do this by hand, confidently, before moving to the more abstract stabilizer formalism in chapter 4.

## What you'll learn

- How to trace the bit-flip code's full encode → error → syndrome → correct pipeline manually
- How to do the same trace for the phase-flip code
- How to recognize, from a syndrome alone, exactly which correction a decoder should apply
- Why tracing small cases by hand builds the intuition the stabilizer formalism will generalize

## Trace 1: bit-flip code, error on qubit 2

Start from logical |1⟩_L = |111⟩. Suppose an X error strikes qubit 2.

1. **State after error:** flipping the middle bit of 111 gives **101**.
2. **Measure Z1Z2:** compares qubits 1 and 2 → 1 vs 0 → disagreement → outcome **1**.
3. **Measure Z2Z3:** compares qubits 2 and 3 → 0 vs 1 → disagreement → outcome **1**.
4. **Syndrome:** (1,1).
5. **Look up the verified table from lesson 10:** syndrome (1,1) → correction = flip qubit 2.
6. **Apply correction:** flip qubit 2 of 101 → **111**. Fully restored.

This matches the lesson 10 table exactly (errorPos=1 → syndrome=11 → correction flips qubit 2), just walked through starting from logical |1⟩_L instead of |0⟩_L, confirming the table's logic is symmetric in which logical state was encoded — the syndrome only ever depends on *where* the error hit, never on α or β.

## Trace 2: phase-flip code, error on qubit 3

Start from logical |0⟩_L = |+++⟩ (written as "000" in the +/− shorthand from lesson 11). Suppose a Z error strikes qubit 3.

1. **State after error:** flipping the third position of 000 gives **001**.
2. **Measure X1X2:** compares qubits 1 and 2 → 0 vs 0 → agreement → outcome **0**.
3. **Measure X2X3:** compares qubits 2 and 3 → 0 vs 1 → disagreement → outcome **1**.
4. **Syndrome:** (0,1).
5. **Look up the verified table from lesson 11:** syndrome (0,1) → correction = apply Z to qubit 3.
6. **Apply correction:** applying Z to the third qubit flips it back from "1" (i.e. |−⟩) to "0" (i.e. |+⟩), giving **000** again. Fully restored.

## Why this exercise matters beyond these two codes

Notice both traces follow the identical 6-step shape: state the error → compute each stabilizer's outcome directly from the physical bits touched → assemble the syndrome → look up the unique correction → apply it → verify. That 6-step shape is exactly what generalizes, unchanged, to every stabilizer code in this course — the Steane code's 6 stabilizers (chapter 4) and the surface code's many 4-qubit stabilizers (chapter 5) are traced through this same procedure, just with more stabilizers and larger syndromes to read.

## Key terms

| Term | Meaning |
|---|---|
| Trace | Manually stepping through encode → error → syndrome → correct for a specific case |
| Stabilizer outcome | The +1/-1 (or 0/1) result of measuring one stabilizer generator against a specific physical state |
| Lookup table | The fixed mapping from syndrome to correction, built once per code and reused for every error instance |

## Check yourself

Trace the bit-flip code by hand starting from logical |0⟩_L = |000⟩ with an X error on qubit 3. What syndrome do you compute for (Z1Z2, Z2Z3), and does it match the lesson 10 table's entry for errorPos=2?
