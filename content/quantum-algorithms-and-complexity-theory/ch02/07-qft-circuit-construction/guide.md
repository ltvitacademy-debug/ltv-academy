# QFT Circuit Construction

The product-form derivation from the last lesson showed that the QFT output factors into a tensor product of single-qubit states. This lesson turns that algebraic fact into an actual sequence of gates — the circuit a real quantum computer runs.

## What you'll learn

- The controlled phase rotation gate R_k and why it's the workhorse of this circuit
- The exact gate-by-gate construction, worked explicitly for n = 3 qubits
- The total gate count formula and why it comes out to O(n²)
- Why a final swap network is required, and where it comes from

## The building block: controlled phase rotation

Define the single-qubit phase rotation gate R_k = diag(1, e^(2πi/2^k)) — it leaves |0⟩ alone and multiplies |1⟩ by the phase e^(2πi/2^k). A **controlled-R_k** gate applies R_k to a target qubit only when a control qubit is |1⟩, otherwise does nothing — the standard controlled-gate pattern. R_1 is just the Z gate (or, acting as a controlled gate, giving a controlled-Z); R_2, R_3, ... give progressively finer phase rotations. These controlled rotations are exactly what's needed to build the phase e^(2πi·0.j_l j_{l+1}...j_n) that Lesson 6 showed each output qubit must carry — each bit j_m of the input contributes one controlled rotation into that phase.

## Building the circuit, qubit by qubit

Label the n input qubits q_1 (most significant bit) through q_n (least significant bit). The construction proceeds qubit by qubit:

1. Apply a **Hadamard** to q_1. This puts q_1 into an equal superposition and seeds the phase that the first bit of the output will carry.
2. Apply a **controlled-R_2** gate to q_1, controlled by q_2.
3. Apply a **controlled-R_3** gate to q_1, controlled by q_3.
4. ...continue through a **controlled-R_n** gate on q_1, controlled by q_n.
5. Move to q_2: apply a **Hadamard** to q_2, then a controlled-R_2 from q_3, a controlled-R_3 from q_4, and so on — one fewer controlled rotation than the previous qubit required.
6. Repeat this pattern, shrinking by one controlled rotation each time, until q_n gets only a Hadamard and no controlled rotations at all.
7. Finish with a **swap network**: reverse the order of all n qubits (swap q_1 with q_n, q_2 with q_{n−1}, and so on).

Step 7 is necessary because of how the product-form derivation in Lesson 6 falls out: the circuit built by steps 1–6 naturally produces the output qubits in *bit-reversed* order relative to the standard QFT|j⟩ formula — the qubit that should hold the most-significant output bit comes out of the circuit holding the least-significant one. Swapping qubit pairs at the end undoes that reversal with no additional phase gates, just wire relabeling.

## Worked circuit: n = 3 qubits, gate by gate

For 3 qubits (q_1, q_2, q_3), the full gate sequence is:

```
1. H(q_1)
2. Controlled-R_2(control=q_2, target=q_1)
3. Controlled-R_3(control=q_3, target=q_1)
4. H(q_2)
5. Controlled-R_2(control=q_3, target=q_2)
6. H(q_3)
7. SWAP(q_1, q_3)
```

That's 3 Hadamards, 3 controlled-phase gates (R_2 and R_3 combinations), and 1 swap — 7 gates total to transform a full 8-dimensional (N = 2^3 = 8) amplitude vector.

## Gate count: why it's O(n²)

Counting across all n qubits: qubit 1 gets (n−1) controlled rotations, qubit 2 gets (n−2), ..., down to qubit n−1 getting 1, and qubit n getting 0. That sum is (n−1) + (n−2) + ... + 1 + 0 = **n(n−1)/2** controlled-phase gates. Add **n** Hadamards (one per qubit) and up to **⌊n/2⌋** swaps (to reverse the full qubit order), and the total gate count is:

**n Hadamards + n(n−1)/2 controlled-phase gates + up to n/2 swaps = O(n²) total gates**

This is a count of *quantum gates acting on n qubits* — each gate is a fixed, small operation (one or two qubits), and there are order-n² of them. It is tempting to immediately compare this to the classical FFT's O(N log N), but that comparison mixes units: one counts gates on qubits, the other counts arithmetic operations on classical numbers, and N = 2^n. Lesson 8 works through exactly what can and cannot be concluded from that comparison — it's more subtle than "exponentially faster" sounds.

## Key terms

| Term | Meaning |
|---|---|
| Phase rotation gate R_k | The single-qubit gate diag(1, e^(2πi/2^k)) that leaves \|0⟩ alone and applies a phase to \|1⟩ |
| Controlled-R_k | R_k applied to a target qubit only when a specified control qubit is \|1⟩ |
| Swap network | The final sequence of qubit swaps that reverses qubit order, undoing the bit-reversal produced by the main construction |
| Gate count | The total number of elementary gates in a circuit; here, n Hadamards + n(n−1)/2 controlled-phase gates + up to n/2 swaps = O(n²) |

## Check yourself

For n = 4 qubits, use the gate-count formulas from this lesson to compute: (a) the number of Hadamard gates, (b) the number of controlled-phase gates (using n(n−1)/2), and (c) the number of swaps (using ⌊n/2⌋). Show your arithmetic for each.
