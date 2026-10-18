# Designing a Circuit From a Specification

Everything so far in this chapter has been about reading and measuring circuits someone else built. This lesson flips the direction: starting from a plain-English target state, you work forward to a verified circuit that produces it — the actual day-to-day skill of writing quantum programs.

## What you'll learn

- A repeatable design workflow: target state → known recipe → identify the gap → verify → diagram
- How to adapt the Bell-state recipe to hit a specific target with a relative minus sign
- Why inserting one extra gate at exactly the right point in the sequence matters
- A full node-verified computation confirming the final circuit's output state
- How to draw the finished circuit as a diagram, matching Lesson 15's notation

## The specification

Here is the spec: design a 2-qubit circuit that takes |00⟩ to the entangled state (|00⟩ − |11⟩)/√2. This looks almost identical to the standard Bell state (|00⟩ + |11⟩)/√2 from Chapter 3 — same two basis states involved, same equal magnitudes — except for one relative minus sign on the |11⟩ term. That similarity is the whole key to the design.

## Step 1: start from the known recipe

The Chapter 3 recipe — H on qubit 1, then CNOT with qubit 1 as control and qubit 2 as target, starting from |00⟩ — produces (|00⟩ + |11⟩)/√2. That's *almost* the target; only the sign on |11⟩ is wrong. The design question becomes: what single additional gate, inserted somewhere in this sequence, flips exactly that one sign and nothing else?

## Step 2: identify where the sign flip needs to happen

A sign flip restricted to one specific term (here, the |11⟩ term) is exactly what a Z gate does — Z leaves |0⟩ alone and multiplies |1⟩'s amplitude by −1. Applying Z to qubit 1 *after* the Hadamard puts qubit 1 into the state (|0⟩ − |1⟩)/√2 instead of (|0⟩ + |1⟩)/√2 — flipping the sign on exactly the term where qubit 1 is |1⟩. Since CNOT only acts when its control is |1⟩, and qubit 1 being |1⟩ is precisely the condition under which the |11⟩ term gets produced, applying Z to qubit 1 *before* the CNOT (right after the H) is the natural candidate: it should carry that minus sign through the CNOT and land specifically on the |11⟩ term.

## Step 3: verify, don't assume

Before presenting this as the answer, the sequence needs to be checked directly. Starting from |00⟩ = [1, 0, 0, 0] in the |00⟩,|01⟩,|10⟩,|11⟩ basis:

Apply H to qubit 1: the state becomes [0.7071, 0, 0.7071, 0] — that's (|00⟩ + |10⟩)/√2.

Apply Z to qubit 1: Z flips the sign of every basis component where qubit 1 reads 1 (the |10⟩ and |11⟩ components), giving [0.7071, 0, −0.7071, 0] — that's (|00⟩ − |10⟩)/√2.

Apply CNOT with control = q1, target = q2: this swaps the amplitudes of the |10⟩ and |11⟩ components (since CNOT flips qubit 2 whenever qubit 1 is 1), giving [0.7071, 0, 0, −0.7071].

That final vector is exactly (|00⟩ − |11⟩)/√2 — the specification, confirmed term by term rather than assumed from the pattern-matching in Step 2. The design intuition from Step 2 was correct, but it only became a trustworthy answer once the actual amplitudes were traced through all three gates and matched against the target.

## Step 4: draw the circuit

With the verified gate sequence in hand — H on q1, then Z on q1, then CNOT(control=q1, target=q2) — the diagram, in the same notation as Lesson 15, is:

```
q1: ──H──Z──●──
             │
q2: ────────X──
```

Reading this left to right reproduces exactly the design process in reverse: H and Z both apply to qubit 1 before anything touches qubit 2, and the CNOT is the final operation, tying the two wires together. This is the complete answer to the specification — not just a state vector, but something you could hand to someone else to build.

## The general workflow

This lesson modeled the actual shape of circuit design work: start from a target state written in plain language or as a ket expression; recognize which known recipe gets you *close*; identify precisely what gap remains between the recipe's natural output and the target (a missing sign, a swapped basis state, an extra qubit); propose the smallest gate insertion that should close that gap; and then verify the full sequence numerically before trusting it. Skipping that last step is exactly how circuit-design mistakes get shipped — the reasoning in Step 2 was sound here, but reasoning alone is not verification, and this lesson's whole point is to build the habit of checking.

## Key terms

| Term | Meaning |
|---|---|
| Target state | The specific quantum state a circuit is being designed to produce from a given starting state |
| Relative sign (relative phase) | A sign or phase difference between two terms of a superposition that changes the state's physical identity even though measurement probabilities alone wouldn't reveal it |
| Gap identification | The design step of pinpointing exactly how a known recipe's natural output differs from the target |
| Verification | Tracing a proposed gate sequence's effect on the actual amplitudes, term by term, rather than trusting pattern-matched intuition |

## Check yourself

Using the same workflow (start from a known recipe, identify the gap, propose a gate, verify numerically), what single gate change to the verified sequence above — H, Z, then CNOT — would instead produce (|00⟩ + |11⟩)/√2 again? You don't need to run new node code; reason from what Z does and check your answer against Chapter 3's original result.
