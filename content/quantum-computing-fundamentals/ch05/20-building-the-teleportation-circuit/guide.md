# Building the Teleportation Circuit

Quantum teleportation moves an unknown qubit state from one place to another using nothing but a shared entangled pair, two classical bits, and gates you already know — CNOT and H. No quantum state travels through space; the circuit below is the whole trick, and it's worth building by hand once so "quantum magic" turns into arithmetic.

## What you'll learn

- The exact 3-qubit circuit for teleportation, gate by gate
- How to trace the full state vector through CNOT and H using a concrete example state
- Why Alice's two measurement outcomes map to Bob's four possible correction gates (I, X, Z, XZ)
- Why the classical bits are required and not just a formality
- What is actually destroyed, and what actually "teleports"

## The setup: three qubits, one shared secret

Teleportation involves three qubits. Qubit 1 (q1) holds the unknown state |ψ⟩ = a|0⟩ + b|1⟩ that Alice wants to send to Bob — she doesn't need to know a and b, and in fact the protocol works precisely because she never learns them. Qubits 2 and 3 are a Bell pair, (|00⟩+|11⟩)/√2, prepared in advance and split so Alice holds q2 and Bob holds q3, however far apart they are. This Bell pair is the pre-shared resource; without it already in place, nothing below works.

Using basis order |q1 q2 q3⟩ with index = 4·q1 + 2·q2 + q3, the combined 8-amplitude starting state is |ψ⟩ ⊗ Bell. For a concrete worked example, take a = 0.8, b = 0.6 (a real normalized state, since 0.8² + 0.6² = 1). Tensoring a|0⟩+b|1⟩ with (|00⟩+|11⟩)/√2 puts a/√2 ≈ 0.5657 at index 0 (|000⟩) and index 3 (|011⟩), and b/√2 ≈ 0.4243 at index 4 (|100⟩) and index 7 (|111⟩), with every other amplitude at zero. I confirmed this by building the 8-amplitude vector directly in `node`:

```
state[0]=a*h; state[3]=a*h; state[4]=b*h; state[7]=b*h;  // h = 1/sqrt(2)
// => [0.5657, 0, 0, 0.5657, 0.4243, 0, 0, 0.4243]
```

## The circuit

```
q1: |ψ⟩  ──●───[H]───[M]── c1 ──────────────┐
            │                                │
q2: |0⟩──[H]┬─[●]────[M]── c2 ───────┐       │
             (CNOT)                   │       │
q3: |0⟩────────────────────────────[X^c2][Z^c1]── |ψ⟩
```

Read it left to right: q2 and q3 start in |0⟩ and are pre-entangled into a Bell pair (that H+CNOT on the left is the *preparation* step, done before Alice even has |ψ⟩). Then Alice runs exactly two gates on her two qubits — CNOT(control=q1, target=q2), then H on q1 — and measures both q1 and q2. She sends her two classical measurement bits (c1, c2) to Bob over an ordinary channel. Bob applies X if c2=1, then Z if c1=1, to his qubit q3.

## Tracing it through: CNOT, then H

I ran the CNOT and H steps myself in `node` on the 8-amplitude vector above to confirm the trace rather than just quoting it.

**Step 1 — CNOT(q1→q2).** This flips q2 whenever q1=1, leaving q1 and q3 alone. The amplitudes sitting at index 4 (|100⟩) and 7 (|111⟩) move to index 5 (|101⟩) and 6 (|110⟩):

```
after CNOT: [0.5657, 0, 0, 0.5657, 0, 0.4243, 0.4243, 0]
```

**Step 2 — H on q1.** H sends |0⟩ → (|0⟩+|1⟩)/√2 and |1⟩ → (|0⟩−|1⟩)/√2 on q1, spreading each amplitude across the q1=0 and q1=1 halves of the vector with a sign that depends on the original q1 bit:

```
after H: [0.4, 0.3, 0.3, 0.4, 0.4, -0.3, -0.3, 0.4]
```

Both results match a direct hand computation and are exactly what the protocol predicts.

## Measuring: four equally likely outcomes

Alice now measures q1 and q2, collapsing the state to one of four outcomes, each with probability 25%. Grouping the post-H vector by (q1,q2) and reading off q3's two remaining amplitudes, then normalizing (every pair shares the same magnitude, 0.5, so normalizing just means dividing by 0.5):

| Alice measures | Bob's raw q3 amplitudes | Normalized | Correction |
|---|---|---|---|
| 00 | (0.4, 0.3) | (0.8, 0.6) = |ψ⟩ | I (nothing) |
| 01 | (0.3, 0.4) | (0.6, 0.8) = b,a swapped | X |
| 10 | (0.4, -0.3) | (0.8, -0.6) = sign flip on |1⟩ | Z |
| 11 | (-0.3, 0.4) | (-0.6, 0.8) | X then Z |

In the 01 case, X swaps the two amplitudes of (0.6, 0.8) back to (0.8, 0.6) = |ψ⟩. In the 10 case, Z flips the sign of the |1⟩ amplitude in (0.8, -0.6) back to (0.8, 0.6) = |ψ⟩. In the 11 case, X turns (-0.6, 0.8) into (0.8, -0.6), and Z then turns that into (0.8, 0.6) = |ψ⟩. Every branch, once corrected, lands exactly on the original |ψ⟩ — this is the standard 00→I, 01→X, 10→Z, 11→XZ correction table, now checked against real numbers instead of taken on faith.

## Why the classical bits aren't optional

Nothing about this is faster-than-light signaling. Bob's qubit sits in one of four different states depending on which outcome Alice got, and those four states (before correction) are physically different — Bob cannot extract |ψ⟩ from his qubit alone. He needs Alice's two classical bits to know *which* correction to apply, and those bits must physically travel to him at or below the speed of light, the same as any classical message. Until they arrive, Bob's qubit is just an unreadable half of what will become |ψ⟩.

## What actually teleports

What crosses from Alice to Bob is the *information* describing |ψ⟩ — not any particle, not any energy, and not a copy. The moment Alice measures q1, her original qubit collapses into a classical 0 or 1 and the superposition a|0⟩+b|1⟩ no longer exists anywhere on her side. There is never a point where both Alice and Bob hold |ψ⟩ at once — Lesson 22 makes this precise and connects it to the no-cloning theorem.

## Key terms

| Term | Meaning |
|---|---|
| Bell pair | The pre-shared entangled state (|00⟩+|11⟩)/√2 split between Alice and Bob before teleportation begins |
| Correction gate | The I/X/Z/XZ operation Bob applies to his qubit, chosen by Alice's two classical measurement bits |
| Classical channel | The ordinary, light-speed-limited channel Alice's 2 measurement bits travel over to reach Bob |
| No-cloning (preview) | The fact that Alice's original qubit is destroyed by measurement, so no copy of |ψ⟩ ever coexists with Bob's — covered fully in Lesson 22 |

## Check yourself

Suppose Alice measures q1=1 and q2=1 (the "11" outcome) but the classical message to Bob is lost in transit and never arrives. Using the raw, uncorrected amplitudes Bob is left holding, (-0.3, 0.4) before normalization, explain concretely what Bob can and can't determine about |ψ⟩ from his qubit alone, and why no correction he guesses at random fixes it reliably.
