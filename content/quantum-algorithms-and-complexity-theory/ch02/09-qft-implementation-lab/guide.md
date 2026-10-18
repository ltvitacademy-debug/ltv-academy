# QFT Implementation Lab

Time to stop taking the circuit's correctness on faith. This lab traces the 2-qubit QFT circuit gate by gate, by hand, and checks that it produces exactly the amplitudes from Lesson 6's worked example — no simulator, just the arithmetic.

## What you'll learn

- The exact gate sequence for the n = 2 QFT circuit
- How to track a 2-qubit state through each gate step by step
- A full hand-verification that the circuit applied to |1⟩ produces 0.5|0⟩ + 0.5i|1⟩ − 0.5|2⟩ − 0.5i|3⟩
- A second worked exercise applying the circuit to |2⟩, with the alternating-sign pattern explained
- How to recognize when your own hand-trace has gone wrong

## The n = 2 circuit

Following Lesson 7's general construction with n = 2 qubits (q_1, q_2, most significant first), the gate sequence is:

```
1. H(q_1)
2. Controlled-R_2(control = q_2, target = q_1)
3. H(q_2)
4. SWAP(q_1, q_2)
```

where R_2 = diag(1, e^(2πi/4)) = diag(1, i). This matches the general formula: n = 2 Hadamards, n(n−1)/2 = 1 controlled-phase gate, and ⌊n/2⌋ = 1 swap.

## Worked trace: applying the circuit to |1⟩

Write |1⟩ as |q_1=0, q_2=1⟩ (binary 01, matching index j = 2·q_1 + q_2 = 2(0)+1 = 1).

**Step 1 — H(q_1):** q_1 = |0⟩ becomes (|0⟩+|1⟩)/√2. State: (|0,1⟩ + |1,1⟩)/√2.

**Step 2 — Controlled-R_2(control=q_2, target=q_1):** q_2 = |1⟩, so the control fires: the |1⟩ component of q_1 picks up the phase i (and the |0⟩ component of q_1 is untouched). State: (|0,1⟩ + i|1,1⟩)/√2.

**Step 3 — H(q_2):** q_2 = |1⟩ becomes (|0⟩−|1⟩)/√2. Distributing: State = (1/2)[ |0,0⟩ − |0,1⟩ + i|1,0⟩ − i|1,1⟩ ].

**Step 4 — SWAP(q_1, q_2):** swap the qubit labels in every term: |0,0⟩→|0,0⟩, |0,1⟩→|1,0⟩, |1,0⟩→|0,1⟩, |1,1⟩→|1,1⟩. State = (1/2)[ |0,0⟩ − |1,0⟩ + i|0,1⟩ − i|1,1⟩ ].

**Converting back to index notation** (j = 2·q_1 + q_2): |0,0⟩ = |0⟩ (coefficient 0.5), |1,0⟩ = |2⟩ (coefficient −0.5), |0,1⟩ = |1⟩ (coefficient 0.5i), |1,1⟩ = |3⟩ (coefficient −0.5i).

**Result: 0.5|0⟩ + 0.5i|1⟩ − 0.5|2⟩ − 0.5i|3⟩**

This matches Lesson 6's verified result for QFT|1⟩ exactly. The circuit is correct, confirmed by direct hand computation, not just by citing the matrix.

## Your turn: trace the circuit applied to |2⟩

Write |2⟩ as |q_1=1, q_2=0⟩ (binary 10). Apply the same four steps:

1. H(q_1) on q_1=|1⟩ gives (|0⟩−|1⟩)/√2 (note the minus sign this time — Hadamard on |1⟩ flips the sign of the second term). State: (|0,0⟩ − |1,0⟩)/√2.
2. Controlled-R_2(control=q_2, target=q_1): q_2 = |0⟩ here, so the control does *not* fire — nothing changes. State stays (|0,0⟩ − |1,0⟩)/√2.
3. H(q_2) on q_2=|0⟩ gives (|0⟩+|1⟩)/√2. Distributing: State = (1/2)[ |0,0⟩ + |0,1⟩ − |1,0⟩ − |1,1⟩ ].
4. SWAP(q_1,q_2): |0,0⟩→|0,0⟩, |0,1⟩→|1,0⟩, |1,0⟩→|0,1⟩, |1,1⟩→|1,1⟩. State = (1/2)[ |0,0⟩ + |1,0⟩ − |0,1⟩ − |1,1⟩ ].

Converting to index notation: |0,0⟩=|0⟩ (0.5), |1,0⟩=|2⟩ (0.5), |0,1⟩=|1⟩ (−0.5), |1,1⟩=|3⟩ (−0.5).

**Result: 0.5|0⟩ − 0.5|1⟩ + 0.5|2⟩ − 0.5|3⟩** — matching Lesson 6's verified QFT|2⟩ exactly.

Notice why the signs strictly alternate (+,−,+,−) with no imaginary components at all, unlike the |1⟩ case: j = 2 means the defining formula's phase is e^(2πi·2k/4) = e^(πik) = (−1)^k — a phase that is always exactly +1 or −1, never a complex number off the real axis, because the exponent is always an integer multiple of π. That is a structural fact about j = 2 specifically (the "middle" frequency of a 4-element register, where the controlled-R_2 gate never even fires, because q_2 = 0 throughout).

## Key terms

| Term | Meaning |
|---|---|
| Gate-by-gate trace | Manually tracking a quantum state's amplitudes through each gate of a circuit in sequence, rather than trusting the final matrix |
| Hadamard on \|1⟩ | Produces (\|0⟩ − \|1⟩)/√2 — note the minus sign, distinct from Hadamard on \|0⟩ which produces (\|0⟩ + \|1⟩)/√2 |
| Control not firing | A controlled gate does nothing to the target when its control qubit is \|0⟩, as happened with q_2 = 0 in the \|2⟩ trace |
| Index notation | Converting a 2-qubit basis state \|q_1, q_2⟩ to its integer index j = 2·q_1 + q_2, to compare against the QFT\|j⟩ formula |

## Check yourself

Using the same four-step circuit (H(q_1), controlled-R_2, H(q_2), SWAP), hand-trace the circuit applied to |3⟩ = |q_1=1, q_2=1⟩, showing your work at each of the four steps, and state the final amplitude vector you get in the form a|0⟩ + b|1⟩ + c|2⟩ + d|3⟩.
