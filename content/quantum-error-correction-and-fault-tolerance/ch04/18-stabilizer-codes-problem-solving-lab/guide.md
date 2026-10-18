# Stabilizer Codes Problem-Solving Lab

Two worked problems applying this chapter's tools directly to the Steane code: verifying the commutation condition, and computing a syndrome from a specific injected error.

## What you'll learn

- How to verify self-orthogonality on specific rows of the Steane code's parity-check matrix
- How to compute a syndrome for a specific single-qubit error on the Steane code
- How the same commutation logic from lesson 15 scales up cleanly to a 6-stabilizer code
- Why this problem-solving pattern is what you'll reuse on the surface code in chapter 5

## Problem 1: verifying self-orthogonality on two specific rows

Recall the Steane code's parity-check matrix:

```
Row 1 = [0,0,0,1,1,1,1]
Row 2 = [0,1,1,0,0,1,1]
Row 3 = [1,0,1,0,1,0,1]
```

Take row 2 and row 3. Their entrywise product is [0×1, 1×0, 1×1, 0×0, 0×1, 1×0, 1×1] = [0,0,1,0,0,0,1]. Summing those products mod 2: 0+0+1+0+0+0+1 = 2 ≡ **0 (mod 2)**. This was directly verified computationally (alongside all other row pairs, including each row with itself) — confirming row 2 and row 3 overlap in an even number of positions (exactly 2: positions 3 and 7), satisfying the self-orthogonality condition that chapter 4's Steane-code lesson relies on.

## Problem 2: computing a syndrome for a specific error

Suppose an **X error hits qubit 3** of the Steane code. By the anticommutation rule (lesson 15), this X error anticommutes with exactly the Z-type stabilizers whose support includes qubit 3 — i.e., whichever rows of H have a 1 in column 3. Reading column 3 of H directly: row 1 has 0, row 2 has 1, row 3 has 1. So the Z-type syndrome is **(0, 1, 1)** — rows 2 and 3 flip, row 1 doesn't. This was verified directly by checking column 3 against all three rows of H.

Now suppose instead a **Z error hits qubit 5**. By the same rule, it anticommutes with whichever X-type stabilizers (same row structure, different Pauli type) have a 1 in column 5: row 1 has 1, row 2 has 0, row 3 has 1. So the X-type syndrome is **(1, 0, 1)**. And for completeness, an **X error on qubit 7** (column 7 of H is [1,1,1]) gives Z-type syndrome **(1,1,1)** — all three Z-stabilizers flip, since qubit 7 is involved in every row of H.

| Error | Type of syndrome triggered | Syndrome (rows 1,2,3) |
|---|---|---|
| X on qubit 3 | Z-type | (0,1,1) |
| Z on qubit 5 | X-type | (1,0,1) |
| X on qubit 7 | Z-type | (1,1,1) |

In every case, the rule is the same: **read the relevant column of H** (column = qubit number) to see which stabilizer generators that qubit participates in, and those are exactly the ones that flip.

## Why this scales

Notice this "read the column of H" shortcut didn't require simulating the full 7-qubit quantum state at all — it's a purely classical lookup, directly inherited from the classical Hamming(7,4) code's structure. This is the practical payoff of the CSS construction (lesson 17): because the stabilizers are built directly from a classical parity-check matrix, syndrome computation for CSS codes reduces to classical linear algebra over H, something that scales to much larger codes (including the surface code's lattice in chapter 5) without ever needing to track quantum amplitudes directly.

## Key terms

| Term | Meaning |
|---|---|
| Column lookup | Reading which stabilizer generators (rows of H) a given qubit participates in, directly from H's column for that qubit |
| Entrywise product (mod 2) | The bitwise AND, summed mod 2, used to check orthogonality between two rows of a parity-check matrix |
| Classical syndrome computation | Determining a quantum code's syndrome using only classical linear algebra on its parity-check matrix, inherited from the CSS construction |

## Check yourself

Using column lookup on H, what Z-type syndrome would a Z error on qubit 1 produce as an X-type error, versus what would an X error on qubit 1 produce as a Z-type syndrome? (Hint: column 1 of H is [0,0,1].)
