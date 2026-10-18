# The SWAP & Toffoli Gates

**Chapter 3 · Multi-Qubit & Entangling Gates · Lesson 12 of 14**

Not every multi-qubit gate is "controlled-something." SWAP exchanges two qubits outright, and Toffoli extends the controlled idea to *two* controls at once on a third qubit — the quantum gate that finally gives you a reversible version of classical AND.

## What you'll learn

- SWAP's exact action and its explicit 4×4 matrix
- How SWAP decomposes into three CNOTs, verified by multiplying the matrices together
- Toffoli (CCNOT): a 3-qubit, 8×8 gate that flips its target iff *both* controls are |1⟩
- Why Toffoli gives you reversible classical AND logic inside a quantum circuit
- Why Toffoli can't be built from single- and two-qubit gates alone, without extra tricks

## The SWAP gate

**SWAP** does exactly what it says: it exchanges the states of two qubits, leaving everything else about the system alone. In the |00⟩, |01⟩, |10⟩, |11⟩ basis, its 4×4 matrix is:

```
        |00⟩ |01⟩ |10⟩ |11⟩
|00⟩ [   1    0    0    0  ]
|01⟩ [   0    0    1    0  ]
|10⟩ [   0    1    0    0  ]
|11⟩ [   0    0    0    1  ]
```

Direct matrix-vector computation confirms the action on each basis state: SWAP|01⟩ = |10⟩ and SWAP|10⟩ = |01⟩ — the two states where the qubits disagree get exchanged — while SWAP|00⟩ = |00⟩ and SWAP|11⟩ = |11⟩ are left untouched, since swapping two identical bits changes nothing.

## SWAP from three CNOTs

Real quantum hardware frequently doesn't offer a native SWAP gate between arbitrary qubit pairs — but it does offer CNOT. SWAP can be built entirely out of three CNOTs in sequence, alternating which qubit is the control:

**CNOT(control=q1, target=q2) → CNOT(control=q2, target=q1) → CNOT(control=q1, target=q2)**

Multiplying these three 4×4 CNOT matrices together in that order (as real matrices, via `node -e`) produces a product that is exactly equal, entry for entry, to the SWAP matrix above. This is the standard decomposition used whenever a circuit needs to move a qubit's state across a connection that only supports CNOT directly — three two-qubit operations instead of one, but built entirely from gates the hardware already has.

## The Toffoli (CCNOT) gate

**Toffoli**, also written CCNOT (controlled-controlled-NOT), is a 3-qubit gate: two control qubits and one target. The rule: flip the target iff *both* controls are |1⟩; otherwise leave everything alone. With three qubits, the basis has 2³ = 8 states, ordered |q1 q2 q3⟩ with index = 4·q1 + 2·q2 + q3, so Toffoli is an 8×8 matrix.

That matrix is the 8×8 identity everywhere, *except* it swaps the two basis states where both controls are 1 — |110⟩ (index 6, both controls 1, target 0) and |111⟩ (index 7, both controls 1, target 1). Computing this directly confirms it: Toffoli·|110⟩ gives exactly |111⟩, and Toffoli·|111⟩ gives exactly |110⟩ — the target bit flips in both cases, and only in those two rows. As a check that the "both controls" condition really is enforced, Toffoli·|100⟩ (only one control set) comes back unchanged as |100⟩ — with just one control at |1⟩, the target is left alone exactly as the rule requires.

## Toffoli and reversible classical logic

Toffoli is the standard way to embed classical AND logic inside a quantum circuit while keeping the whole operation reversible. If you fix the target qubit to start at |0⟩, Toffoli computes target = control1 AND control2 and writes that result into the target position — classical AND, exactly. But unlike a classical AND gate (which is not invertible — you can't recover both inputs from the single output bit), Toffoli is a unitary matrix, so it's automatically its own clean inverse: apply it twice and you're back to the original 3-qubit state. This matters because every gate in a quantum circuit must be reversible; Toffoli is how "throw away information the way classical AND does" gets replaced with "keep everything, just relocate it."

One limitation worth flagging now: Toffoli genuinely needs three qubits acting together, and it turns out you **cannot** build it out of single-qubit gates plus two-qubit gates like CNOT alone — not without extra ("ancilla") qubits and a longer sequence of gates. Chapter 4's lesson on gate decomposition covers exactly how that's done in practice.

## Key terms

| Term | Meaning |
|---|---|
| SWAP | A gate that exchanges the states of two qubits |
| SWAP-from-CNOTs decomposition | Three alternating CNOTs that reproduce SWAP exactly |
| Toffoli (CCNOT) | 3-qubit gate: flips the target iff both of two controls are \|1⟩ |
| Reversible logic | A gate/circuit where every output uniquely determines its input; required of all quantum gates |
| Ancilla qubit | An extra helper qubit used temporarily to build gates like Toffoli from simpler ones |

## Check yourself

A classmate claims that because SWAP exchanges two qubits' states, applying SWAP twice in a row must always bring you back to the original state — so SWAP is its own inverse. Using either the explicit matrix or the three-CNOT decomposition from this lesson, is that claim correct? Justify your answer.
