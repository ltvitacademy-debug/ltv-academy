# State-Vector Simulation From Scratch

Every gate matrix, Bell state, and teleportation trace in this course so far was computed by exactly the technique this lesson makes explicit: representing a quantum state as an array of numbers and multiplying small matrices into slices of that array. This is literally how a classical computer simulates a quantum circuit — no magic, just arithmetic on an array.

## What you'll learn

- How an n-qubit state is represented in memory: a flat array of 2^n amplitudes
- How to apply a single-qubit gate to one qubit inside a larger multi-qubit system, without ever building the full 2^n × 2^n matrix
- Why this "index-pairing" trick is what every real simulator (including Qiskit's and Q#'s) does under the hood
- How to verify a simulator function against a result you already know is correct

## The representation: one array, 2^n numbers

An n-qubit state vector is stored as a plain array of 2^n amplitudes, indexed by treating each index's binary representation as the qubit values it stands for. For 3 qubits, index 6 is binary `110`, meaning q1=1, q2=1, q3=0 — i.e. the amplitude at array position 6 is the amplitude of basis state |110⟩. This course has used this convention since Chapter 3 (index = 4·q1 + 2·q2 + q3 for 3 qubits); a simulator is just code that keeps this array up to date as gates are applied.

## Applying a single-qubit gate without building a giant matrix

The naive approach — build the full 2^n × 2^n matrix for "H on qubit 1 of a 3-qubit system" (an 8×8 matrix here) and multiply it into the 8-amplitude vector — works, but it wastes enormous amounts of memory for large n (most of that matrix is zero). The trick every real simulator uses instead: to apply a gate to one specific qubit, find every pair of basis-state indices that differ *only* in that qubit's bit, and apply the small 2×2 gate matrix directly to each pair's two amplitudes.

Here is the actual function, which I ran directly in `node` rather than just describing:

```js
function applySingleQubitGate(state, gate, qubit, numQubits) {
  const n = state.length;
  const out = new Array(n).fill(0);
  const bitPos = numQubits - 1 - qubit; // qubit 0 = leftmost/most-significant
  const mask = 1 << bitPos;
  for (let i = 0; i < n; i++) {
    if ((i & mask) === 0) {           // process each pair once, from its "bit=0" index
      const i0 = i, i1 = i | mask;    // i0 has this qubit=0, i1 has it=1
      const a0 = state[i0], a1 = state[i1];
      out[i0] = gate[0][0]*a0 + gate[0][1]*a1;
      out[i1] = gate[1][0]*a0 + gate[1][1]*a1;
    }
  }
  return out;
}
```

Running this on a 3-qubit system, applying H to qubit 1 (q1, the leftmost) of |000⟩, produced:

```
H on q1 of |000>: [0.7071, 0, 0, 0, 0.7071, 0, 0, 0]
```

That is amplitude 0.7071 at index 0 (|000⟩) and index 4 (|100⟩) — exactly (|000⟩+|100⟩)/√2, i.e. qubit 1 in superposition with qubits 2 and 3 untouched at |0⟩. This matches hand computation exactly, and it never built anything larger than the original 8-element array plus the fixed 2×2 gate.

## Checking it against a result you already trust

A simulator function is only useful if it's correct, so I didn't stop at one gate — I chained a CNOT(q1→q2) onto the same state using an analogous index-pairing function for two-qubit gates, and ran it:

```
H on q1 of |000>:        [0.7071, 0, 0, 0, 0.7071, 0, 0, 0]
then CNOT(q1->q2):       [0.7071, 0, 0, 0, 0, 0, 0.7071, 0]
```

After the CNOT, the amplitude that was at index 4 (|100⟩) moved to index 6 (|110⟩), because q1=1 flips q2. The result, (|000⟩+|110⟩)/√2, is exactly the Chapter 3 Bell state (|00⟩+|11⟩)/√2 on qubits 1–2, with qubit 3 sitting untouched as a spectator in |0⟩ — the same answer this course already derived by hand, now reproduced by running real code instead of matrix algebra on paper. That agreement is the actual test of whether a simulator function is implemented correctly: it must reproduce every result you can already verify independently.

## Key terms

| Term | Meaning |
|---|---|
| State vector | The array of 2^n complex (here, real) amplitudes representing an n-qubit system |
| Index pairing | The technique of applying a single-qubit gate by operating on pairs of array indices that differ only in that qubit's bit, instead of building a full 2^n × 2^n matrix |
| Basis index | An integer whose binary digits directly encode a specific computational-basis state, e.g. index 6 = `110` = |110⟩ |
| Spectator qubit | A qubit untouched by the gates being applied, which keeps its original bit value fixed across every nonzero amplitude |

## Check yourself

For a 4-qubit system (16 amplitudes, qubits numbered 1–4 left to right), you want to apply X to qubit 3. Using the index-pairing idea above, which bit position does the mask need to target, and which pairs of the 16 indices would get swapped? Work out at least two concrete index pairs by hand.
