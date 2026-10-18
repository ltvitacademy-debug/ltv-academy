# The CNOT Gate

**Chapter 3 · Multi-Qubit & Entangling Gates · Lesson 10 of 14**

Every gate you've met so far — X, Y, Z, H, S, T, the rotations — acts on exactly one qubit. CNOT is the first gate that genuinely needs two: it's where "two independent single-qubit circuits running side by side" stops being an accurate picture of what a quantum computer does.

## What you'll learn

- The precise rule that defines CNOT: control qubit, target qubit, conditional flip
- CNOT's 4×4 matrix in the two-qubit basis |00⟩, |01⟩, |10⟩, |11⟩
- How CNOT acts on each of the four basis states, confirmed by direct matrix-vector computation
- Why CNOT is its own inverse (CNOT² = I)
- Why CNOT is not the same operation as applying X to both qubits, and why CNOT alone never entangles a basis state

## Defining the CNOT gate

**CNOT** (Controlled-NOT) acts on two qubits: a **control** and a **target**. The rule is simple and purely conditional:

- If the control qubit is |1⟩, apply X (bit-flip) to the target qubit.
- If the control qubit is |0⟩, do nothing to the target qubit (apply identity).

The control qubit itself is never changed by CNOT — only the target is, and only when the control says so. This is the quantum analogue of a classical XOR-based logic gate, but because it's built from a unitary matrix, it's fully reversible, unlike a generic classical gate.

## The matrix, basis state by basis state

This chapter orders a 2-qubit basis as |q1 q2⟩, with index = 2·q1 + q2, giving the ordering |00⟩, |01⟩, |10⟩, |11⟩ at indices 0, 1, 2, 3. Taking q1 as the control and q2 as the target, CNOT's 4×4 matrix is:

```
        |00⟩ |01⟩ |10⟩ |11⟩
|00⟩ [   1    0    0    0  ]
|01⟩ [   0    1    0    0  ]
|10⟩ [   0    0    0    1  ]
|11⟩ [   0    0    1    0  ]
```

Reading the matrix as "what each input basis state maps to" (apply the matrix to each basis vector):

- CNOT|00⟩ = |00⟩ — control is 0, target untouched
- CNOT|01⟩ = |01⟩ — control is 0, target untouched
- CNOT|10⟩ = |11⟩ — control is 1, target flips from 0 to 1
- CNOT|11⟩ = |10⟩ — control is 1, target flips from 1 to 0

Computing this directly as matrix-vector products (`node -e` multiplying the 4×4 CNOT matrix by each basis column vector) reproduces exactly these four results, including the two nontrivial cases |10⟩ → |11⟩ and |11⟩ → |10⟩. Only the target's bit (the second coordinate) ever changes, and only in the two rows where the control bit is 1.

## CNOT squared is the identity

Multiplying the CNOT matrix by itself gives back the 4×4 identity matrix exactly. That matches the gate-level intuition: flipping the target conditionally, then flipping it conditionally again under the exact same condition, undoes the first flip. CNOT is therefore its own inverse — applying it twice in a row to any state, basis or superposition, returns you to where you started. This is a general feature of any gate built as "conditionally apply an involution" (X, like Z, satisfies X² = I), and it's why CNOT shows up so often as a building block in reversible circuits: you always know exactly how to undo it.

## CNOT vs. "X on both qubits"

It's tempting to think of CNOT as "a two-qubit version of X," but that's not right, and the distinction matters. Applying X to both qubits independently is the fixed operation X⊗X — it flips q1 and flips q2, unconditionally, on every input. CNOT flips only the target, and only when the control happens to be |1⟩. On |10⟩, X⊗X gives |01⟩, while CNOT gives |11⟩ — different gates, different outputs on the same input. X⊗X is a product of two independent single-qubit gates (it factors as X on qubit 1 tensor X on qubit 2); CNOT cannot be factored that way at all — there is no pair of single-qubit gates U1, U2 such that U1⊗U2 reproduces CNOT's action on every state. That non-factorizability is exactly what makes CNOT capable of producing entanglement, which no product of single-qubit gates can ever do.

## Basis states in, basis states out — no entanglement yet

Here's a detail worth sitting with before the next lesson: CNOT applied to any of the four basis states |00⟩, |01⟩, |10⟩, |11⟩ always outputs another single basis state, never a superposition. A basis state like |10⟩ is already a product state — qubit 1 is definitely |1⟩, qubit 2 is definitely |0⟩, with no correlation to speak of because there's no uncertainty to be correlated. CNOT|10⟩ = |11⟩ is still just as separable: qubit 1 is |1⟩, qubit 2 is |1⟩, full stop. So CNOT by itself, fed a basis state, does **not** create entanglement — it just relabels which basis state you're in. Entanglement only appears when CNOT acts on a *superposition* across the control qubit, which is exactly the setup Lesson 13 builds toward.

## Key terms

| Term | Meaning |
|---|---|
| Control qubit | The qubit CNOT reads but never modifies; determines whether the target flips |
| Target qubit | The qubit CNOT conditionally flips with X |
| CNOT | Controlled-NOT: flips the target iff the control is \|1⟩ |
| Involution | An operation that is its own inverse (U² = I), e.g. X, Z, CNOT |
| Separable (product) state | A multi-qubit state expressible as a tensor product of single-qubit states, with no entanglement |

## Check yourself

Starting from the basis state |11⟩, apply CNOT with control = q1, target = q2, and then immediately apply a second CNOT — this time with control = q2, target = q1 — to the result. Using the basis-state flip rule from this lesson (not full matrix multiplication), what is the final 2-qubit state, and is it the same as the state you'd get from just leaving |11⟩ untouched?
