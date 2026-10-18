# Multi-Qubit Gates Problem-Solving Lab

**Chapter 3 · Multi-Qubit & Entangling Gates · Lesson 14 of 14**

Time to apply CNOT, CZ, and the Bell-state recipe to specific problems and compute real answers — including a couple of results that aren't what intuition predicts until you actually do the arithmetic.

## What you'll learn

- How to apply a "reversed" CNOT (control and target swapped) to an entangled state and get a genuinely different result than the standard CNOT would
- How to build the (|01⟩ + |10⟩)/√2 Bell state starting from |10⟩, using a different gate sequence than Lesson 13's
- How CZ can convert one Bell state into a different one via a relative-phase flip
- How to check your own worked gate sequences against the matrices from this chapter

## Problem 1: Does swapping control and target change the outcome?

**Problem:** Apply CNOT with control = q2, target = q1 (the reverse of the usual control = q1, target = q2 convention) to the Bell state (|00⟩ + |11⟩)/√2. Does the reversed gate leave this particular state unchanged, the way you might guess from the state "looking symmetric" in its two qubits?

**Solution:** The reversed-CNOT flips q1 iff q2 is |1⟩, giving the basis-state mapping |00⟩→|00⟩, |01⟩→|11⟩, |10⟩→|10⟩, |11⟩→|01⟩. Applying this as a matrix-vector product to (|00⟩ + |11⟩)/√2 = [0.7071, 0, 0, 0.7071] gives [0.7071, 0.7071, 0, 0] — that is, **(|00⟩ + |01⟩)/√2**, not the original state.

**Interpretation:** The symmetric look of (|00⟩ + |11⟩)/√2 is deceptive — it does not make the state a fixed point of every "symmetric-looking" two-qubit gate. The reversed CNOT acts on the |11⟩ term (flipping q1: 1→0, giving |01⟩) while leaving the |00⟩ term alone, which changes the superposition's content entirely rather than preserving it. It's worth actually running the matrix multiplication here rather than reasoning from symmetry — the "intuitive" guess that this Bell state is invariant under either CNOT direction is wrong, and the computation is what catches that.

## Problem 2: Building (|01⟩ + |10⟩)/√2 starting from |10⟩

**Problem:** Starting from the basis state |10⟩, find a sequence of H and CNOT gates that produces the Bell state (|01⟩ + |10⟩)/√2, and verify the result.

**Solution:** Apply H to qubit 2 (not qubit 1) first. H on qubit 2 of |10⟩ gives [0, 0, 0.7071, 0.7071] — that's (|10⟩ + |11⟩)/√2, with qubit 1 still fixed at |1⟩ and qubit 2 in superposition. Then apply CNOT with control = q2, target = q1 (the reversed CNOT from Problem 1). On the |10⟩ term, the control (q2) is 0, so q1 passes through unchanged, staying |10⟩. On the |11⟩ term, the control (q2) is 1, so q1 flips from 1 to 0, turning |11⟩ into |01⟩. The computed result is [0, 0.7071, 0.7071, 0] — exactly **(|01⟩ + |10⟩)/√2**, matching the target state.

**Interpretation:** This is the same Bell state Lesson 13 reached by starting from |01⟩ with a standard-direction CNOT — but here, starting from a different basis state (|10⟩), the gate sequence that gets you there uses H on the *other* qubit and the *reversed* CNOT. There's more than one valid gate recipe for a given Bell state; which one you need depends on which basis state and which CNOT direction you're starting from.

## Problem 3: Using CZ to flip between Bell states

**Problem:** What does CZ do to the Bell state (|00⟩ + |11⟩)/√2?

**Solution:** CZ = diag(1, 1, 1, −1) in the |00⟩, |01⟩, |10⟩, |11⟩ basis. Applied to [0.7071, 0, 0, 0.7071], the |00⟩, |01⟩, |10⟩ amplitudes are untouched and the |11⟩ amplitude is multiplied by −1, giving [0.7071, 0, 0, −0.7071] — that's **(|00⟩ − |11⟩)/√2**, which is the third Bell state from Lesson 13's table.

**Interpretation:** CZ doesn't change the measurement probabilities here (both outcomes are still 50/50 on |00⟩ and |11⟩), but it does change which Bell state you're in, because it flips the relative phase between the |00⟩ and |11⟩ terms. This is the same relative-phase mechanism from Lesson 11's uniform-superposition example, now applied to move between two members of the Bell-state family rather than just flagging that a phase changed.

## Key terms

| Term | Meaning |
|---|---|
| Reversed CNOT | CNOT with control and target swapped relative to the "default" convention; a genuinely different gate |
| Gate-sequence verification | Checking a proposed circuit by computing its actual output vector, not by assuming symmetry |
| Bell-state interconversion | Moving between Bell states using extra gates (like CZ) after the basic H+CNOT recipe |

## Check yourself

Starting from |00⟩, apply CNOT with control = q1, target = q2 first, and only *then* apply H to qubit 1 (the reverse order from Lesson 13's recipe). Compute the resulting state step by step. Is it the same Bell state Lesson 13 produced, a different one, or not an entangled state at all?
