# Controlled Gates in General

**Chapter 3 · Multi-Qubit & Entangling Gates · Lesson 11 of 14**

CNOT isn't a one-off trick — it's the first instance of a general recipe: take any single-qubit gate U, and build a two-qubit "controlled-U" gate that applies U to the target iff the control is |1⟩. That recipe is how most of the two-qubit gates on real quantum hardware get built.

## What you'll learn

- The general controlled-U construction and its 4×4 block form
- How to write down controlled-Z (CZ) explicitly from the recipe
- Why CZ is symmetric between its two qubits, unlike CNOT
- The difference between a global phase and a genuine relative phase, demonstrated with CZ on a superposition
- That controlled-H, controlled-rotations, and other controlled gates all follow the same pattern

## The controlled-U recipe

For any single-qubit unitary U (2×2 matrix), the **controlled-U** gate acts on a control qubit and a target qubit as:

- If the control is |0⟩: apply identity to the target — do nothing.
- If the control is |1⟩: apply U to the target.

In the |00⟩, |01⟩, |10⟩, |11⟩ basis (control = q1, target = q2), this gate has a clean block-diagonal 4×4 form:

```
Controlled-U = [ I   0 ]
               [ 0   U ]
```

where each block is 2×2: the top-left block is the identity I (covering the control = 0 subspace, rows/columns for |00⟩ and |01⟩), and the bottom-right block is U itself (covering the control = 1 subspace, rows/columns for |10⟩ and |11⟩). CNOT is exactly this recipe with U = X, since X sitting in the bottom-right block is precisely what flips the target whenever the control is |1⟩.

## Controlled-Z: a concrete example

Recall Z = diag(1, −1) — it leaves |0⟩ alone and flips the sign of |1⟩. Plugging U = Z into the block-form recipe gives controlled-Z (**CZ**):

```
        |00⟩ |01⟩ |10⟩ |11⟩
|00⟩ [   1    0    0    0  ]
|01⟩ [   0    1    0    0  ]
|10⟩ [   0    0    1    0  ]
|11⟩ [   0    0    0   -1  ]
```

CZ is diagonal: it leaves |00⟩, |01⟩, |10⟩ untouched and multiplies |11⟩ by −1. Computing CZ · |11⟩ directly (matrix-vector product) gives exactly −|11⟩, confirming the sign flip on that one basis state.

Notice something CNOT doesn't have: CZ's matrix is **symmetric** in its two qubits. "Control = q1, target = q2" and "control = q2, target = q1" give the *same* matrix for CZ, because the condition "both qubits are |1⟩" doesn't care which qubit you call the control. CNOT has no such symmetry — swapping control and target gives a genuinely different gate (control = q2, target = q1 flips q1 instead of q2, which is a different 4×4 matrix entirely).

## From a sign flip to a real relative phase

On a single basis state, "multiply by −1" looks like nothing more than a global phase — and a global phase on the whole system has no physical effect on measurement probabilities. But CZ's −1 only lands on the |11⟩ term specifically, and once that term is part of a superposition with other terms, the −1 becomes a genuine, measurable **relative phase** rather than a global one.

Take the uniform 2-qubit superposition (|00⟩ + |01⟩ + |10⟩ + |11⟩)/2 — every amplitude equal to 1/2. Applying CZ (matrix-vector product with this vector) gives:

```
(|00⟩ + |01⟩ + |10⟩ − |11⟩) / 2
```

Only the |11⟩ term flipped sign; the other three amplitudes are untouched. The measurement probabilities are still 1/4 on each of the four outcomes — CZ doesn't change *what* you'd measure here — but the relative phase between |11⟩ and the rest of the superposition is now real and would show up in any interference experiment (for example, if this state were later recombined with Hadamards). That's the key distinction: a phase on one term out of a superposition is physical in a way that an overall phase on the entire state vector never is.

## Other controlled gates: CH, controlled-rotations

The same block-form recipe builds a controlled version of *any* single-qubit gate. **Controlled-H** (CH) puts the Hadamard matrix in the bottom-right block instead of X or Z — it applies H to the target only when the control is |1⟩, which is genuinely useful for building certain superposition-generation circuits conditionally. **Controlled-rotation gates** (controlled-Rx, controlled-Ry, controlled-Rz) do the same with a rotation matrix in that block, and they're the standard building blocks for parameterized circuits used in variational quantum algorithms. All of these share the same 4×4 shape — identity in the control = 0 block, the chosen single-qubit gate in the control = 1 block — so once you've internalized CNOT and CZ, you already know the pattern for the rest.

## Key terms

| Term | Meaning |
|---|---|
| Controlled-U | A two-qubit gate that applies single-qubit unitary U to the target iff the control is \|1⟩ |
| Block form | Writing a controlled-U's 4×4 matrix as [[I,0],[0,U]] in 2×2 blocks |
| CZ (controlled-Z) | Controlled-U with U = Z; diagonal, symmetric between its two qubits |
| Global phase | A phase factor on the entire state vector; has no effect on measurement probabilities |
| Relative phase | A phase that differs between terms of a superposition; physically measurable via interference |

## Check yourself

Using the block-form recipe from this lesson, write out the full 4×4 matrix for controlled-Y (control = q1, target = q2), where Y is the Pauli-Y gate from Chapter 2. Then predict, term by term, what this gate does to the basis state |10⟩.
