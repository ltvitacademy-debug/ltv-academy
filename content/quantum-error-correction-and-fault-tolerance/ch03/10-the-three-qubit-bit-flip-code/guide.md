# The Three-Qubit Bit-Flip Code

This is the first real quantum error-correcting code in the course — small enough to trace by hand completely, and the direct ancestor of every stabilizer code that follows.

## What you'll learn

- How to encode one logical qubit into 3 physical qubits against bit-flip (X) errors
- The exact stabilizer measurements used to detect which qubit (if any) flipped
- The verified syndrome table for all 4 possible cases: no error, or an X error on qubit 1, 2, or 3
- Why this code protects against X errors only, not phase errors

## Encoding: spreading one qubit across three

The 3-qubit bit-flip code encodes a logical qubit's two basis states as:

**|0⟩_L = |000⟩**  and  **|1⟩_L = |111⟩**

Given an unknown data qubit |ψ⟩ = α|0⟩ + β|1⟩ and two ancilla qubits prepared in |0⟩, the encoding circuit is just two CNOT gates: **CNOT(qubit 1 → qubit 2)**, then **CNOT(qubit 1 → qubit 3)**. Each CNOT copies qubit 1's computational-basis value onto the target — not cloning the full quantum state (that would violate no-cloning from the last chapter), but entangling the three qubits so the joint state becomes α|000⟩ + β|111⟩. This is a genuinely entangled 3-qubit state, not three independent copies of |ψ⟩; no single qubit, taken alone, holds α and β.

## Stabilizers: Z1Z2 and Z2Z3

The code's protection comes from two **stabilizer** measurements: **Z1Z2** (compare qubits 1 and 2) and **Z2Z3** (compare qubits 2 and 3). Both α|000⟩ and α|111⟩ are +1 eigenstates of both operators — measuring either one on an error-free encoded state always returns "+1, no disagreement," without revealing α or β, because both terms of the superposition agree on the outcome.

## The verified syndrome table

Injecting a single X (bit-flip) error at each of the 3 qubit positions and measuring both stabilizers gives this exact table, verified by direct simulation, starting from logical |0⟩_L = |000⟩:

| Error location | State after error | Syndrome (Z1Z2, Z2Z3) | Correction |
|---|---|---|---|
| None | 000 | 00 | none needed |
| Qubit 1 | 100 | 10 | flip qubit 1 |
| Qubit 2 | 010 | 11 | flip qubit 2 |
| Qubit 3 | 001 | 01 | flip qubit 3 |

(The identical pattern holds starting from logical |1⟩_L = |111⟩ — e.g. an X error on qubit 1 gives state 011, syndrome 10, and flipping qubit 1 restores 111.) Every one of these 4 cases decodes correctly, 100% of the time: the two-bit syndrome uniquely identifies which qubit (if any) was hit, without ever needing to know α or β. That uniqueness is exactly what makes this code *useful*, not just correct — the syndrome alone, a purely classical 2-bit outcome, tells you exactly which correction to apply.

## What this code cannot do

This code corrects any single X error perfectly, but it provides **zero protection against a Z (phase-flip) error**. A Z error on any one of the 3 qubits changes the relative phase of the encoded superposition without flipping any computational-basis bit value, so it produces no disagreement in either Z1Z2 or Z2Z3 — the syndrome reads 00 (as if nothing happened) while the logical state has actually been corrupted. Protecting against phase errors requires a different, complementary code — built next.

## Key terms

| Term | Meaning |
|---|---|
| Logical qubit | The single qubit's worth of information being encoded and protected |
| Stabilizer | An operator (here, Z1Z2 or Z2Z3) whose measurement outcome is always +1 on a valid encoded state, and flips to -1 exactly when a detectable error occurs |
| Syndrome | The pattern of stabilizer measurement outcomes, used to identify which correction to apply |
| Ancilla qubit | A qubit (starting in a known state, here \|0⟩) used to help build the encoded state |

## Check yourself

Using the verified syndrome table, what syndrome would you expect if X errors hit *both* qubit 1 and qubit 2 at the same time? Would the code's correction procedure (built for single errors) get this case right or wrong, and why?
