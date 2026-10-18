# The Shor Nine-Qubit Code

Combine the last two lessons' codes correctly, and you get something neither one alone could do: protection against an arbitrary single-qubit error. This was the first proof, in 1995, that quantum error correction was possible at all.

## What you'll learn

- How concatenating the bit-flip and phase-flip codes builds the 9-qubit Shor code
- Why 3×3=9 physical qubits are needed, and what each layer protects against
- Why this gives protection against an arbitrary single-qubit Pauli error, not just X or Z alone
- Why this historically important code isn't what real hardware roadmaps use today

## The concatenation idea

Lesson 10's bit-flip code fixes any single X error but is blind to Z errors. Lesson 11's phase-flip code fixes any single Z error but is blind to X errors. Neither alone is a complete solution. Shor's insight was to **concatenate** them: use the phase-flip code as an "outer" code, and then protect *each of its 3 qubits* using the bit-flip code as an "inner" code.

Concretely: take the phase-flip code's 3 logical blocks (each one protecting against Z errors at the block level) and encode **each individual qubit inside each block** using the 3-qubit bit-flip code. Since the outer code has 3 blocks, and each block's qubit is replaced by 3 physical qubits of an inner bit-flip code, the total physical qubit count is:

**3 (outer blocks) × 3 (inner qubits per block) = 9 physical qubits**, protecting 1 logical qubit.

## Why this covers an arbitrary single-qubit error

Any single-qubit error can be written (up to an overall phase) as some combination of a bit-flip (X), a phase-flip (Z), or both (Y = iXZ). The concatenated structure handles this directly:

- If the error is **X** on one of the 9 physical qubits: the inner bit-flip code covering that qubit's block detects and corrects it, exactly as in lesson 10, before it can affect the outer phase-flip code at all.
- If the error is **Z** on one of the 9 physical qubits: a Z error on any one of the 3 physical qubits within an inner block flips the *overall phase* of that inner block the same way, regardless of which of the 3 inner qubits it hits — so the outer phase-flip code (lesson 11) sees exactly one block affected and corrects it with its own X1X2/X2X3-style syndrome measurement, carried out at the level of the 3 blocks rather than individual qubits.
- If the error is **Y** (both X and Z on the same qubit): the X part is caught and fixed by the relevant inner bit-flip code, and the Z part is caught and fixed by the outer phase-flip code — independently and simultaneously, because the two correction layers operate on different, non-interfering information (bit values within a block vs. relative phase between blocks).

This is the historic result: a single code, built from two codes that each only handled half the problem, that corrects *any* single-qubit Pauli error (X, Y, or Z) on any one of its 9 physical qubits. It was the first concrete proof — answering a question that was genuinely open at the time — that the no-cloning theorem and the continuous nature of quantum errors (chapter 2) do not actually prevent quantum error correction from working.

## Why this isn't the code real hardware uses

9 physical qubits per logical qubit sounds modest — far better than, say, the thousands required by a high-distance surface code (chapter 6). But the Shor code's correction power is capped at exactly 1 arbitrary error; scaling it up to handle more simultaneous errors means going to higher levels of concatenation, which grows the physical-qubit cost **exponentially** (as you'll compute directly in chapter 6, comparing it against the Steane code's concatenation). It also doesn't match the local, nearest-neighbor-only connectivity that real superconducting or trapped-ion hardware has. The Shor code's importance is historical and pedagogical — it proved the concept — not that it's the code found in a real fault-tolerance roadmap.

## Key terms

| Term | Meaning |
|---|---|
| Concatenation | Building a code by using one code to protect each physical qubit of another code |
| Shor code | The historic [[9,1,?]] concatenated code: 9 physical qubits protecting 1 logical qubit against any single-qubit Pauli error |
| Outer code | The code operating at the block level (here, the phase-flip code, treating 3 blocks as its 3 "qubits") |
| Inner code | The code operating within each block (here, the bit-flip code, protecting 3 physical qubits per block) |

## Check yourself

The Shor code uses the phase-flip code as the outer layer and the bit-flip code as the inner layer. Would swapping that — bit-flip code outer, phase-flip code inner — still work to protect against an arbitrary single-qubit error? Think through what each layer is actually responsible for detecting.
