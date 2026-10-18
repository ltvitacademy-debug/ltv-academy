# Surface Code Lattice Structure

Build the surface code's actual 2D layout from scratch, with the verified qubit-count formulas worked out explicitly for a small case you can picture completely.

## What you'll learn

- How data qubits and stabilizer (ancilla) qubits are arranged on a 2D lattice
- How X-type and Z-type stabilizers alternate across the lattice
- The verified formulas: data = d², ancilla = d²−1, total = 2d²−1
- How to count qubits directly on the smallest practical case, d=3

## The rotated layout: data qubits on a grid

The rotated surface code of code distance *d* places **data qubits** on a d×d square grid — d² of them. Between and around those data qubits, **ancilla (measure) qubits** sit at the centers of alternating lattice faces, each one responsible for measuring one stabilizer that touches its 4 neighboring data qubits (fewer at the lattice's boundary, where a stabilizer only has 2 or 3 neighbors to touch).

The lattice faces are colored in a **checkerboard pattern**: faces of one color host **X-type stabilizers** ("plaquettes"), faces of the other color host **Z-type stabilizers** ("vertices" or "stars"). This alternating pattern is exactly the CSS structure from chapter 4 — X-type stabilizers from one classical structure, Z-type from another — laid out geometrically instead of abstractly listed as rows of a matrix.

## Counting qubits directly: d=3

For the smallest practical case, d=3: the data-qubit grid is 3×3 = **9 data qubits**. The number of ancilla qubits needed to measure all the stabilizers works out to **d² − 1 = 8** — you can see this by counting the interior and boundary lattice faces of a 3×3 grid of data qubits: there are 8 distinct 4-qubit (or boundary 2-qubit) groupings that need their own stabilizer measurement, alternating between X-type and Z-type as you move across the lattice. Total physical qubits: 9 data + 8 ancilla = **17**, matching the verified formula total = 2d² − 1 = 2(9) − 1 = 17 exactly.

## The verified formulas at larger distances

The same two formulas — **data qubits = d²**, **ancilla qubits = d² − 1**, **total = 2d² − 1** — were verified directly for a range of distances:

| d | Data qubits | Ancilla qubits | Total qubits |
|---|---|---|---|
| 3 | 9 | 8 | 17 |
| 5 | 25 | 24 | 49 |
| 7 | 49 | 48 | 97 |
| 9 | 81 | 80 | 161 |
| 11 | 121 | 120 | 241 |
| 15 | 225 | 224 | 449 |

Notice the ancilla count is always exactly one less than the data count — a direct consequence of the general stabilizer-code rule from chapter 4 (n − k generators for an n-qubit, k-logical-qubit code): here n = 2d² − 1 total physical qubits, k = 1 logical qubit, so the number of stabilizer generators (one ancilla per generator) is (2d² − 1) − 1 = 2d² − 2 = 2(d² − 1), which splits evenly into (d² − 1) X-type and (d² − 1)... wait — more precisely, the d²−1 ancilla count already *is* the total number of independent stabilizer generators for this particular lattice construction, split roughly evenly between X-type and Z-type across the checkerboard.

## Why distance scales this way

Increasing *d* by 2 (the surface code's distance is conventionally odd) grows the data-qubit grid from d×d to (d+2)×(d+2) — a quadratic, not linear, growth in area, which is exactly why total qubit count grows as d² rather than d. This quadratic growth, contrasted against the Steane-style concatenation's exponential growth (chapter 6), is part of why the surface code remains more practical at larger target distances even though it needs more qubits than the Steane code at the smallest distance.

## Key terms

| Term | Meaning |
|---|---|
| Rotated surface code | A surface-code layout placing data qubits on a d×d grid with ancillas on alternating lattice faces |
| Plaquette / vertex | The two types of lattice faces hosting X-type and Z-type stabilizers respectively |
| Boundary stabilizer | A stabilizer at the lattice edge, touching only 2 or 3 data qubits instead of the bulk's 4 |
| Quadratic qubit scaling | Total qubit count growing as d², a consequence of the 2D grid's area scaling with distance |

## Check yourself

Using the verified formula total = 2d² − 1, how many total physical qubits would a distance-19 surface code need? Compute it directly, and compare the growth from d=15 (449 qubits) to d=19 against the growth from d=3 (17) to d=7 (97) — is the absolute qubit increase the same, larger, or smaller at higher distances?
