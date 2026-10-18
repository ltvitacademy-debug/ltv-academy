# Teleportation & Coding Lab

The only way to be sure you actually understand these two circuits — not just recognize the diagrams — is to run the numbers on a state you haven't seen worked yet. This lab does exactly that: a fresh teleportation trace with the amplitude roles flipped, and a diagnosis of what goes wrong if Bob skips a step in superdense coding.

## What you'll learn

- How to run a full teleportation trace, start to finish, on a new state
- How to confirm all four correction branches converge to the same original state
- How to diagnose a broken protocol by tracing what happens when a required gate is skipped
- How small, mechanical node scripts let you verify circuit claims instead of trusting them

## Problem 1: full teleportation trace for |ψ⟩ = 0.6|0⟩ + 0.8|1⟩

This is the same protocol as Lesson 20, but with a and b swapped from the earlier worked example (a=0.6, b=0.8 instead of 0.8, 0.6) — so if your mental shortcuts were secretly relying on a &gt; b, this will catch it. The state is still normalized: 0.6² + 0.8² = 0.36 + 0.64 = 1.

**Initial state.** Tensoring 0.6|0⟩+0.8|1⟩ with the Bell pair (|00⟩+|11⟩)/√2 on q2,q3, computed in `node`:

```
h = 1/sqrt(2)
state[0] = 0.6*h; state[3] = 0.6*h; state[4] = 0.8*h; state[7] = 0.8*h;
// => [0.4243, 0, 0, 0.4243, 0.5657, 0, 0, 0.5657]
```

Notice this is the Lesson-20 vector with the roles of the "0.5657" and "0.4243" blocks swapped — exactly what you'd expect from swapping a and b.

**After CNOT(q1→q2):**

```
[0.4243, 0, 0, 0.4243, 0, 0.5657, 0.5657, 0]
```

**After H on q1:**

```
[0.3, 0.4, 0.4, 0.3, 0.3, -0.4, -0.4, 0.3]
```

**The four measurement outcomes.** Grouping by (q1,q2) and reading Bob's q3 amplitudes, then normalizing (common magnitude 0.5 again):

| Alice measures | Bob's raw amplitudes | Normalized | Correction | After correction |
|---|---|---|---|---|
| 00 | (0.3, 0.4) | (0.6, 0.8) | I | (0.6, 0.8) |
| 01 | (0.4, 0.3) | (0.8, 0.6) | X (swap) | (0.6, 0.8) |
| 10 | (0.3, -0.4) | (0.6, -0.8) | Z (flip sign of 2nd) | (0.6, 0.8) |
| 11 | (-0.4, 0.3) | (-0.8, 0.6) | X then Z | (0.6, 0.8) |

I confirmed the correction arithmetic directly in `node`:

```
X(v) = [v[1], v[0]]
Z(v) = [v[0], -v[1]]
'00' -> I  -> [0.6, 0.8]
'01' -> X(0.8,0.6) -> [0.6, 0.8]
'10' -> Z(0.6,-0.8) -> [0.6, 0.8]
'11' -> Z(X(-0.8,0.6)) -> X gives [0.6,-0.8], Z gives [0.6, 0.8]
```

All four branches converge to exactly (0.6, 0.8) — the original |ψ⟩ — confirming the correction table is a general fact of the protocol, not an artifact of the specific a=0.8,b=0.6 example from Lesson 20. Whatever a and b are, as long as Alice tells Bob which of the four outcomes she got, Bob's corrected qubit always ends up as |ψ⟩.

## Problem 2: what happens if Bob forgets the H gate in superdense coding?

Here's a diagnostic exercise in what *failure* looks like. Suppose Alice encodes the message "10" using Z (per Lesson 21's table), sends her qubit to Bob, and Bob applies CNOT(q1→q2) correctly — but forgets the final H on q1 before measuring.

**Encoding "10" with Z** on the Bell pair (0.7071, 0, 0, 0.7071):

```
applyZ1([0.7071, 0, 0, 0.7071]) -> [0.7071, 0, -0, -0.7071]
```

**Bob applies CNOT(q1→q2) (correctly):**

```
applyCNOT12([0.7071, 0, 0, -0.7071]) -> [0.7071, 0, -0.7071, 0]
```

**Bob skips H and measures directly.** Reading off probabilities as amplitude² on this vector: index 0 (|00⟩) = 0.7071² ≈ 0.5, index 2 (|10⟩) = (-0.7071)² ≈ 0.5, and indices 1 and 3 are exactly 0.

So Bob measures "00" half the time and "10" half the time, at random, and *never* measures "01" or "11". Two things have gone wrong at once: the second bit (q2) always reads 0, no matter what Alice actually sent, so Bob has permanently lost access to the information that was supposed to be encoded there; and the first bit (q1) comes out as a 50/50 coin flip instead of the deterministic value "1" that correct decoding would have given. Skipping H doesn't corrupt the message partially — it destroys the deterministic readout entirely, turning a protocol that should work with probability 1 into one that gives Bob no reliable information at all. This is exactly why both gates in the decode step are load-bearing: CNOT un-spreads the entanglement across the two qubits, and H is what converts that into a basis Bob can read deterministically by direct measurement. Skip either one and the "double the classical capacity" guarantee collapses.

## Key terms

| Term | Meaning |
|---|---|
| Correction branch | One of the 4 (Alice outcome, Bob correction) pairs in teleportation; all 4 converge to the same |ψ⟩ regardless of a, b |
| Deterministic readout | A measurement outcome that occurs with probability 1, guaranteed by the circuit, as opposed to a random guess |
| Decode step | Superdense coding's CNOT-then-H sequence; both gates are required for Bob to recover the message deterministically |
| General fact vs. specific example | A claim verified across more than one numeric example (here, both a=0.8,b=0.6 and a=0.6,b=0.8) is far more trustworthy than one checked only once |

## Check yourself

Using the same method as Problem 1, trace what happens to the |+⟩ = (1/√2)|0⟩ + (1/√2)|1⟩ state through the teleportation circuit — note that because a = b here, two of the four correction branches will look identical in their raw (unnormalized) amplitudes before correction. Work out all four branches and confirm each still corrects to exactly |+⟩.
