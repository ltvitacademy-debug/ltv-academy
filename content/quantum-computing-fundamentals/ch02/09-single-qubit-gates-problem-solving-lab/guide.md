# Single-Qubit Gates Problem-Solving Lab

This lesson is practice, not new theory. You have six fixed gates and three rotation families from this chapter — now it's time to chain them together, compute real numbers at every step, and build the habit of never assuming how a multi-gate sequence turns out.

## What you'll learn

- How to chain multiple single-qubit gates step by step, carrying exact amplitudes forward at each stage
- A fully worked example of H → S → H applied to |0⟩, with every intermediate state computed
- Direct proof that gate order matters: X then Z does not give the same result as Z then X
- How to read a "does this differ by only a global phase" question correctly
- A general method for approaching any single-qubit gate-sequence problem in this course

## Problem 1: H, then S, then H, applied to |0⟩

**Setup.** Start from |0⟩ = [1, 0]ᵀ. Apply H, then S, then H again, tracking the exact state after each step.

**Step 1 — apply H.** H|0⟩ = (1/√2, 1/√2) ≈ (0.707107, 0.707107), confirmed by the same matrix-vector multiplication used in the Hadamard lesson.

**Step 2 — apply S to that result.** S = diag(1, i), so it leaves the first amplitude alone and multiplies the second by i. Computing this directly in `node -e` (representing i as [0,1] and carrying out complex multiplication on the second amplitude): 0.707107 stays 0.707107 on the |0⟩ term, and 0.707107 becomes 0.707107·i on the |1⟩ term. The state after step 2 is (0.707107, 0.707107i) — numerically [0.707107, [0, 0.707107]] in [real, imag] form.

**Step 3 — apply H again.** Multiplying the Hadamard matrix by that two-term complex vector in `node -e` gives a final state of **(0.5 + 0.5i, 0.5 − 0.5i)**. Squaring each amplitude's magnitude — (0.5² + 0.5²) = 0.5 for both terms — gives measurement probabilities of **0.5 and 0.5** for outcomes 0 and 1.

**What this shows.** The final probabilities (0.5/0.5) happen to match what a single H alone would have given you on |0⟩ — but the state itself is different: it carries complex amplitudes (0.5+0.5i and 0.5−0.5i) rather than the purely real (1/√2, 1/√2) that H|0⟩ alone produces. The S gate in the middle left its fingerprint on the phase of the final state even though the final measurement statistics on this particular circuit look unchanged. This is exactly the kind of result you must compute rather than guess — nothing about "H, then a phase gate, then H" is obvious by inspection, and a different phase gate in the middle (say T instead of S) would land on different final amplitudes entirely.

## Problem 2: Does gate order matter? X then Z vs. Z then X, both starting from |0⟩

**Setup.** Compare applying X then Z to |0⟩, against applying Z then X to |0⟩. "X then Z" means Z(X|0⟩); "Z then X" means X(Z|0⟩).

**X then Z.** X|0⟩ = |1⟩ = [0, 1]. Applying Z to that: Z|1⟩ = −|1⟩ = [0, −1], confirmed by direct matrix-vector multiplication. So **(X then Z)|0⟩ = −|1⟩**.

**Z then X.** Z|0⟩ = |0⟩ = [1, 0] (Z leaves |0⟩ untouched, as established in the Pauli-gates lesson). Applying X to that: X|0⟩ = |1⟩ = [0, 1]. So **(Z then X)|0⟩ = |1⟩**.

**Comparing the two results directly:** −|1⟩ versus |1⟩. These are not the same vector — they differ by an overall sign. Computed and compared exactly, the two gate orders do **not** produce the same state.

**What this shows.** X and Z do not commute (applying them in opposite orders gives different results), which matches a general fact about the Pauli matrices: XZ = −ZX. In this particular case, the difference between the two orders is only an overall sign on the whole result — and since |1⟩ and −|1⟩ are each a single term scaled by an overall factor of magnitude 1, that sign is a global phase here, so a measurement after either sequence would read "1" with probability 1 either way. But don't over-generalize that last point: the lesson is that you must compute both orders and compare them directly, because the sign (or phase) difference you get from swapping gate order is not always a harmless global phase — on a superposition state, a relative phase introduced by swapping gate order can absolutely change downstream measurement probabilities once another interfering gate is applied. Never assume two gates commute; multiply it out.

## A general method for these problems

Every problem in this lab followed the same three-step discipline, and it's the one to carry forward into every later chapter:

1. **Write the starting state as an explicit vector** (or [real, imag] pair per amplitude, if complex numbers are involved).
2. **Apply one gate at a time**, computing the full intermediate state after each gate — never skip ahead to the end, and never substitute a shortcut you haven't verified for this specific input.
3. **Only after reaching the final state**, compute |amplitude|² for the actual measurement probabilities, and separately ask whether any phase difference you're looking at is global (unmeasurable, multiplies the whole vector) or relative (measurable once combined with an interfering gate).

Every multi-qubit, multi-gate circuit in the rest of this course — CNOT chains, teleportation, superdense coding — is this same three-step process, just with more qubits and more gates in the sequence.

## Key terms

| Term | Meaning |
|---|---|
| Gate sequence | Multiple gates applied to a qubit one after another; order matters unless the gates happen to commute |
| Commute | Two gates A and B commute if AB = BA (order doesn't matter); the Pauli gates generally do not commute with each other |
| Intermediate state | The exact state vector after some, but not all, of a gate sequence has been applied — must be computed explicitly, not assumed |
| Global vs. relative phase (recap) | Global phase multiplies the whole state and is unmeasurable; relative phase differs between amplitudes and can affect measurement once combined with an interfering gate |

## Check yourself

Using the same three-step method from this lesson, compute what happens when you apply S, then H, then S again, to the state |0⟩ (note: this is a different order than Problem 1's H-S-H sequence). Work out the exact intermediate state after each gate, then the final amplitudes and measurement probabilities, and compare your final result to Problem 1's final answer — are the two sequences equivalent, or genuinely different circuits?
