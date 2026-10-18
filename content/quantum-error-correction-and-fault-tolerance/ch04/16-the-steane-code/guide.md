# The Steane Code

A 7-qubit code that beats the Shor code's overhead while keeping the same single-error protection — built directly from a classical code you could study in an undergraduate coding theory class.

## What you'll learn

- How the Steane code is built from the classical Hamming(7,4) code
- The verified self-orthogonality property that makes the construction work
- Why it has 6 stabilizer generators (3 X-type, 3 Z-type) for 7 physical qubits
- Why 7 qubits (not 9) is a meaningful efficiency gain over the Shor code

## Starting point: the classical Hamming(7,4) code

The Steane code repurposes the classical Hamming(7,4) code — a well-known classical error-correcting code with 7 bits, 4 of them carrying information, able to correct 1 bit error — via its parity-check matrix H (3 rows × 7 columns):

```
H = [0,0,0,1,1,1,1]
    [0,1,1,0,0,1,1]
    [1,0,1,0,1,0,1]
```

Each row says which of the 7 bit positions must have even parity for a valid classical codeword. This matrix was verified directly (computing every pairwise mod-2 dot product among its 3 rows, including each row with itself) to be **self-orthogonal**: every one of those 9 dot products — including each row dotted with itself — comes out to 0 mod 2. That property is exactly the technical condition the CSS construction (next lesson) needs to turn one classical code into a valid quantum code.

## Building the quantum code: 6 stabilizer generators

Because H is self-orthogonal, the *same* matrix can generate both the X-type and the Z-type stabilizers of the quantum code:

- **3 X-type stabilizers**, one per row of H: e.g. row 1 ([0,0,0,1,1,1,1]) becomes **X4X5X6X7** (X on whichever of the 7 qubits have a 1 in that row).
- **3 Z-type stabilizers**, the same 3 rows, but with Z instead of X: e.g. row 1 becomes **Z4Z5Z6Z7**.

That's **6 total stabilizer generators** on **7 physical qubits**, encoding **1 logical qubit** — written in the standard [[n,k,d]] notation as the **[[7,1,3]] code**: n=7 physical qubits, k=1 logical qubit, and minimum distance d=3 (meaning, exactly as in chapter 2's distance lesson, it corrects any single-qubit error — X, Z, or Y — since d=3 gives ⌊(3−1)/2⌋ = 1 correctable error).

## Why self-orthogonality is what makes this valid

For a stabilizer code to be consistent, every pair of stabilizer generators must **commute** with each other (otherwise they couldn't have simultaneous +1 eigenstates at all). An X-type stabilizer built from row *i* and a Z-type stabilizer built from row *j* commute exactly when those two rows overlap in an even number of positions — which is precisely what "dot product ≡ 0 mod 2" verifies. Because every pair of rows of H (including a row with itself) satisfies this, every X-stabilizer commutes with every Z-stabilizer, and the whole 6-generator set is consistent. This is not a coincidence specific to this one matrix — it's the general CSS requirement, covered fully in the next lesson.

## Why 7 beats 9

The Shor code (chapter 3) used 9 physical qubits to protect against an arbitrary single-qubit error. The Steane code does the same job — correcting any single X, Z, or Y error — using only 7. That's a real, meaningful efficiency gain, and it comes with a bonus the Shor code doesn't have as cleanly: the Steane code's logical Hadamard, X, Z, and CNOT gates can all be applied **transversally** — qubit-by-qubit, independently, with no interaction between the 7 physical qubits during the logical gate itself. That property turns out to matter enormously for fault tolerance, previewed here and built out fully in chapter 7.

## Key terms

| Term | Meaning |
|---|---|
| Hamming(7,4) code | A classical code: 7 bits, 4 information bits, corrects 1 bit error; its parity-check matrix underlies the Steane code |
| Self-orthogonal matrix | A matrix whose rows all have even pairwise overlap (dot product ≡ 0 mod 2), including each row with itself |
| [[7,1,3]] | Standard notation: 7 physical qubits, 1 logical qubit, minimum distance 3 |
| Transversal gate | A logical gate applied by acting independently on each physical qubit, with no qubit-to-qubit interaction needed |

## Check yourself

The Steane code's 6 stabilizer generators come from just 3 rows of H, reused once for X-type and once for Z-type. Why does reusing the same 3 rows (rather than needing 6 independent rows) depend specifically on H being self-orthogonal?
