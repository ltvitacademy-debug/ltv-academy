# Bell States

The four Bell states are the maximally entangled basis for two qubits — the states you'll see constructed, measured, and referenced constantly across the rest of this course. This lesson shows you exactly how to build one with real gates and exactly what you get when you measure it.

## What you'll learn

- The four Bell states and how they relate to each other
- The exact circuit recipe for building |Φ+⟩ from |00⟩: Hadamard then CNOT
- How to track amplitudes through each gate by hand
- The precise measurement correlation a Bell state produces
- Why "maximally entangled" is a meaningful, not just a rhetorical, label

## The four Bell states

Starting from the four two-qubit computational basis states |00⟩, |01⟩, |10⟩, |11⟩, you can build four corresponding maximally entangled states, called the **Bell states**:

- |Φ+⟩ = (|00⟩ + |11⟩) / √2
- |Φ−⟩ = (|00⟩ − |11⟩) / √2
- |Ψ+⟩ = (|01⟩ + |10⟩) / √2
- |Ψ−⟩ = (|01⟩ − |10⟩) / √2

Each one is normalized (two amplitudes of magnitude 1/√2, squared and summed: 1/2 + 1/2 = 1), and each is entangled by exactly the same non-factorizability argument you worked through in lesson 16 for |Φ+⟩ — none of the four admits a tensor-product decomposition into two single-qubit states. Together, these four states form a complete orthonormal basis for the two-qubit space — the **Bell basis** — an alternative to the computational basis {|00⟩,|01⟩,|10⟩,|11⟩} that measurement can be performed in, which becomes important for teleportation and superdense coding in chapter 5.

## Building |Φ+⟩ with real gates

You don't need to take the existence of |Φ+⟩ on faith — here's the standard circuit that produces it, starting from two qubits both initialized to |0⟩, i.e., the state |00⟩.

**Step 1 — Hadamard on qubit 1.** Apply H to the first qubit only. Recall H|0⟩ = (|0⟩+|1⟩)/√2 = |+⟩. Applied to just qubit 1 while qubit 2 stays |0⟩, the two-qubit state becomes:

(|0⟩+|1⟩)/√2 ⊗ |0⟩ = (|00⟩ + |10⟩) / √2

This is still a product state — qubit 1 is in |+⟩, qubit 2 is still |0⟩, and they're independent of each other. No entanglement yet.

**Step 2 — CNOT with qubit 1 as control, qubit 2 as target.** CNOT flips the target qubit if and only if the control qubit is |1⟩, and leaves it alone if the control is |0⟩. Apply it term by term to (|00⟩ + |10⟩)/√2:

- The |00⟩ term: control qubit is 0, so the target is left alone → stays |00⟩
- The |10⟩ term: control qubit is 1, so the target flips from 0 to 1 → becomes |11⟩

Putting the two terms back together: (|00⟩ + |11⟩) / √2 — which is exactly |Φ+⟩. That's the whole recipe: **Hadamard on qubit 1, then CNOT(qubit 1 → qubit 2)**, starting from |00⟩. This H+CNOT pattern is the standard entangling circuit you'll see used throughout this course and in every quantum SDK (Qiskit, Cirq, Q#) whenever a Bell pair needs to be prepared.

## What measurement on |Φ+⟩ actually gives you

Here's where the entanglement becomes experimentally visible. Measure qubit 1 of |Φ+⟩ = (|00⟩+|11⟩)/√2 in the computational basis. By the Born rule from chapter 3, the probability of each outcome comes from the squared amplitudes of the terms consistent with it:

- P(qubit 1 = 0) = 0.5, and in that branch the state is exactly |00⟩ — qubit 2 is 0 as well
- P(qubit 1 = 1) = 0.5, and in that branch the state is exactly |11⟩ — qubit 2 is 1 as well

So on its own, qubit 1's outcome is a perfect coin flip — exactly like measuring a single |+⟩ qubit. There is nothing special about qubit 1's marginal statistics by themselves. The remarkable part is the relationship between the two qubits' outcomes: **P(00) = P(11) = 0.5, and P(01) = P(10) = 0, exactly.** Once you learn qubit 1's result, qubit 2's result is no longer a probability at all — it's determined with certainty. Measure qubit 1 and get 0, and qubit 2 is guaranteed 0. Measure qubit 1 and get 1, and qubit 2 is guaranteed 1. This holds even though, before either qubit is measured, neither one individually "has" a definite value — there's no hidden fact about what qubit 2 "already was." The correlation is created at measurement, not revealed by it. (Lesson 18 unpacks exactly why this is different from shared classical randomness, and lesson 19 gives you the numeric test that proves the difference.)

## Why "maximally entangled" is a precise label

The four Bell states aren't just "some examples of entanglement" — they're the extremal case. For a two-qubit system, no state can produce stronger per-measurement correlation between its two qubits than a Bell state does. That's why they're the default building block anywhere two qubits need to be linked for a protocol: teleportation and superdense coding (chapter 5) both start by preparing a Bell pair exactly the way this lesson just built one.

## Key terms

| Term | Meaning |
|---|---|
| Bell states | The four maximally entangled two-qubit states: \|Φ+⟩, \|Φ−⟩, \|Ψ+⟩, \|Ψ−⟩ |
| Bell basis | The orthonormal basis formed by the four Bell states, as an alternative to the computational basis |
| Entangling circuit | A gate sequence (here, Hadamard then CNOT) that converts a product state into an entangled state |
| CNOT (controlled-NOT) | A two-qubit gate that flips the target qubit if and only if the control qubit is \|1⟩ |
| Perfect correlation | The property that once one qubit of a Bell pair is measured, the other qubit's outcome is determined with certainty |

## Check yourself

Starting from |00⟩, suppose you instead apply CNOT first (qubit 1 as control, qubit 2 as target) and only then apply the Hadamard to qubit 1. Track the amplitudes through both steps. Do you still end up with |Φ+⟩? Explain what happens and why gate order matters here.
