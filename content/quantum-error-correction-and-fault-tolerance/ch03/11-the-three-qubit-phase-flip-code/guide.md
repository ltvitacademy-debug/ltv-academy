# The Three-Qubit Phase-Flip Code

The bit-flip code's exact mirror image: same structure, same syndrome logic, but built in a rotated basis to catch the one error type the bit-flip code misses entirely.

## What you'll learn

- How to build a phase-flip-protecting code by changing basis, not by inventing new machinery
- The stabilizers X1X2 and X2X3, and why they're the "Hadamard-rotated" version of Z1Z2 and Z2Z3
- The verified syndrome table for Z (phase-flip) errors
- Why this code, like the bit-flip code, is only half the story

## The trick: do everything in the Hadamard basis

Recall the X-basis states |+⟩ = (|0⟩+|1⟩)/√2 and |−⟩ = (|0⟩−|1⟩)/√2. A **phase-flip (Z) error** does to |+⟩ and |−⟩ exactly what a **bit-flip (X) error** does to |0⟩ and |1⟩: it swaps them (Z|+⟩ = |−⟩ and Z|−⟩ = |+⟩). This is not a coincidence — it's the defining relationship between the X and Z bases, and it means you can build a phase-flip code by taking the bit-flip code's entire construction and rotating it into the Hadamard basis.

**Encoding:** |0⟩_L = |+++⟩ and |1⟩_L = |−−−⟩. You get there by first applying a Hadamard gate to the data qubit (turning |0⟩ or |1⟩ into |+⟩ or |−⟩), then running the exact same two-CNOT encoding circuit as the bit-flip code. The result is a 3-qubit state where a Z error on any one qubit flips that qubit between |+⟩ and |−⟩, exactly mirroring how an X error flips a qubit between |0⟩ and |1⟩ in the earlier code.

## Stabilizers: X1X2 and X2X3

Where the bit-flip code measured Z1Z2 and Z2Z3 to catch disagreements in the computational basis, the phase-flip code measures **X1X2** and **X2X3** to catch disagreements in the Hadamard basis. Both stabilizers read +1 on the valid encoded states, and flip to -1 exactly when a Z error has hit one of the 3 qubits.

## The verified syndrome table

Representing |+⟩ as "0" and |−⟩ as "1" for compactness, injecting a single Z error at each qubit position (starting from logical |0⟩_L = |+++⟩, i.e. "000" in this representation) gives this verified syndrome table:

| Error location | State after error (+ = 0, − = 1) | Syndrome (X1X2, X2X3) | Correction |
|---|---|---|---|
| None | 000 | 00 | none needed |
| Qubit 1 | 100 | 10 | apply Z to qubit 1 |
| Qubit 2 | 010 | 11 | apply Z to qubit 2 |
| Qubit 3 | 001 | 01 | apply Z to qubit 3 |

This is structurally the identical table to the bit-flip code's — same correction logic, same guarantee of 100% correct identification for any single error — just with every "X error / Z1Z2,Z2Z3 / flip the qubit" replaced by "Z error / X1X2,X2X3 / apply Z to the qubit." The symmetry is exact because the X and Z bases play perfectly swapped roles under the Hadamard transform.

## What this code cannot do

Exactly as the bit-flip code was blind to Z errors, this phase-flip code is blind to **X errors**: an X error on one qubit leaves both X1X2 and X2X3 unchanged (they commute with X errors), so the syndrome reads 00 even though the logical state has been corrupted. Neither 3-qubit code alone is a general-purpose quantum error-correcting code — each protects against exactly one error type. The next lesson shows how combining both ideas (not just picking one) gives a code that handles an arbitrary single-qubit error.

## Key terms

| Term | Meaning |
|---|---|
| Hadamard basis (X-basis) | The basis \|+⟩, \|−⟩, related to the computational basis by a Hadamard gate |
| Phase-flip (Z) error | An error that swaps \|+⟩ ↔ \|−⟩, leaving computational-basis values unchanged |
| X1X2, X2X3 | The stabilizer generators of the phase-flip code, measuring agreement in the Hadamard basis |
| Basis duality | The symmetric relationship where Z errors look like X errors once you change which basis you're working in |

## Check yourself

If you applied BOTH an X error and a Z error to the same qubit in this code (equivalent to a Y error, up to phase), what would happen to each of the two codes individually — would the bit-flip code's stabilizers catch it, would the phase-flip code's stabilizers catch it, neither, or both?
