# The Cost & Mixer Hamiltonians

Lesson 6 named H_C and H_B without defining them precisely. Here you'll write both out explicitly as sums of Pauli operators, see exactly why the mixer is almost always built from Pauli-X, and confirm — with a direct calculation — why the two unitaries can't simply be merged into one.

## What you'll learn

- The explicit Pauli-operator form of the Max-Cut cost Hamiltonian H_C
- Why the standard mixer Hamiltonian H_B = ΣX_i is the default choice, and what it physically does
- Why H_C and H_B do not commute, and why that non-commutation is essential, not a flaw
- How the per-qubit mixer unitary factors into a simple single-qubit rotation
- The link from this lesson's operators back to the exact single-edge simulation in Lesson 6

## The cost Hamiltonian, in Pauli form

Recall from Chapter 1 that the Ising form of a Max-Cut edge term is ½(1 - s_i s_j), where s_i = 1-2x_i is a spin taking values ±1. On a quantum computer, the Pauli-Z operator acting on qubit i has exactly those two eigenvalues (+1 for |0⟩, -1 for |1⟩) — so s_i is literally replaced by the operator Z_i. The full cost Hamiltonian for a Max-Cut graph with edge set E is:

**H_C = Σ_{(i,j)∈E} ½(I - Z_i Z_j)**

This is a sum of commuting terms (every Z_iZ_j term commutes with every other Z_kZ_l term, since all Z operators are diagonal in the computational basis), which is exactly why U_C(γ) = e^(-iγH_C) is well-defined as a simple product of per-edge phase gates — no term ordering ambiguity, no approximation needed to implement it.

## The mixer Hamiltonian, and why Pauli-X

The standard choice for the mixer is:

**H_B = Σ_i X_i**

— a sum of single-qubit Pauli-X operators, one per qubit, with no interaction terms between qubits. Why X specifically? Because X is the operator that *doesn't commute* with Z: physically, X flips a qubit's computational-basis state (|0⟩ ↔ |1⟩), which is exactly the kind of move needed to move probability amplitude between different candidate bitstrings. Z-based phases alone (from H_C) can never change measurement probabilities on their own — only an operator that "rotates" between |0⟩ and |1⟩ can actually redistribute where the measurement probability mass sits. Since H_B has no cross-qubit terms, e^(-iβH_B) factors cleanly into independent single-qubit rotations — one R_x(2β)-style rotation per qubit — which is both why it's cheap to implement and why it generalizes trivially to any number of qubits.

## Why H_C and H_B must not commute

If H_C and H_B commuted, applying them in either order (or merging them into one combined unitary) would produce the exact same operator — there would be no point alternating them at all. They don't commute precisely because Z and X don't commute on a single qubit ([Z, X] = 2iY ≠ 0). This non-commutation is what makes the "alternating" structure in Lesson 6 meaningful: each cost layer imprints problem-specific phase information, and each mixer layer converts some of that phase information into redistributed probability, and repeating this interplay across p layers is what lets higher depth (Lesson 9) sculpt the final distribution more and more precisely toward high-cost bitstrings.

## Connecting back to the exact simulation

In Lesson 6's single-edge example, the explicit per-basis-state cost values (0, 1, 1, 0 for |00⟩, |01⟩, |10⟩, |11⟩) came directly from evaluating H_C = ½(I - Z_0Z_1) in the computational basis: Z_0Z_1 has eigenvalue +1 on |00⟩ and |11⟩ (same spin direction) and -1 on |01⟩ and |10⟩ (opposite spin directions), so ½(1-(+1))=0 and ½(1-(-1))=1 — matching exactly. The mixer unitary used in that simulation, u = [[cos β, -i sin β], [-i sin β, cos β]] applied independently to each qubit, is precisely e^(-iβX) written out as a 2×2 matrix — confirming the "single-qubit rotation per qubit" structure described above is exactly what was simulated, not a simplification.

## Key terms

| Term | Meaning |
|---|---|
| Cost Hamiltonian (H_C) | Σ over edges of ½(I - Z_iZ_j); encodes the Max-Cut objective as a sum of commuting two-qubit terms |
| Mixer Hamiltonian (H_B) | Σ_i X_i; a sum of single-qubit Pauli-X operators with no cross-qubit interaction |
| Commutator | [A,B] = AB - BA; measures whether two operators can be freely reordered. [Z,X] ≠ 0, which is why cost and mixer layers must alternate |
| Pauli-X operator | The "bit-flip" operator, swapping |0⟩ and |1⟩; the source of amplitude mixing between basis states |
| e^(-iβH_B) factorization | Because H_B has no cross-qubit terms, its unitary factors into independent single-qubit rotations, one per qubit |

## Check yourself

Explain, using the fact that H_C is diagonal (built entirely from Z operators) in the computational basis, why applying U_C(γ) alone — with no mixer step at all — to the uniform superposition state would leave every basis state's measurement *probability* completely unchanged, even though the quantum state itself would be different before and after.
