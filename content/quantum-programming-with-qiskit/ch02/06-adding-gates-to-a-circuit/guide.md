# Adding Gates to a Circuit

A `QuantumCircuit` with no gates on it is just an empty container. Gates are what actually do something — they're the operations that rotate and transform the quantum state of each qubit. Qiskit gives every common single-qubit gate a short method you call directly on the circuit object, and this lesson is about knowing which one does what, and how to check the exact result.

## What you'll learn

- The core fixed single-qubit gates: X, Y, Z, H, S, T
- The parameterized rotation gates RX, RY, RZ, and how an angle changes their effect
- How to read a circuit's exact statevector with `Statevector(qc)`
- Three verified, exactly-computed examples: H, X, and RX(π/2) starting from `|0>`
- Why RX and H can give the same measurement probabilities yet produce physically different states

## The fixed single-qubit gates

Qiskit exposes the most common single-qubit gates as methods you call directly on a circuit, passing the qubit index:

```python
qc = QuantumCircuit(1)
qc.x(0)   # Pauli-X: bit-flip, |0> <-> |1>
qc.y(0)   # Pauli-Y: bit-flip + phase-flip combined
qc.z(0)   # Pauli-Z: phase-flip, leaves |0> alone, flips sign of |1>
qc.h(0)   # Hadamard: creates an equal superposition
qc.s(0)   # S gate: a quarter-turn phase gate
qc.t(0)   # T gate: an eighth-turn phase gate
```

X, Y, and Z are the three Pauli gates — fixed, self-inverse operations with no adjustable parameter. H is the workhorse of quantum computing: applied to `|0>`, it produces an equal superposition of `|0>` and `|1>`, which is the starting point for almost every interesting quantum algorithm. S and T are smaller phase rotations used heavily once you get into algorithms that need fine-grained phase control.

## The rotation gates: RX, RY, RZ

Unlike the fixed gates above, the rotation gates take an explicit angle (in radians) as their first argument, letting you rotate a qubit's state by any amount you choose:

```python
import math
qc = QuantumCircuit(1)
qc.rx(math.pi / 2, 0)   # rotate around the X-axis by pi/2
qc.ry(math.pi / 2, 0)   # rotate around the Y-axis by pi/2
qc.rz(math.pi / 2, 0)   # rotate around the Z-axis by pi/2
```

These are the gates that make variational algorithms (covered in Chapter 6) possible: you can treat the angle as a tunable parameter and let an optimizer search over it, which is exactly what the next lesson on parameterized circuits builds toward.

## Reading the exact state with `Statevector`

For small circuits, you don't need to run thousands of shots to know what a circuit produces — you can ask Qiskit to compute the exact mathematical statevector directly:

```python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector

qc = QuantumCircuit(1)
qc.h(0)

sv = Statevector(qc)
print(sv)
```

This gives you the complex amplitude for every basis state, with no sampling noise involved at all — it's the ideal mathematical answer.

## Three verified examples

Starting every circuit from `|0>`:

**`qc.h(0)`** produces the statevector `[0.7071068+0j, 0.7071068+0j]` — the famous `|+>` state. Both amplitudes are real and equal, giving measurement probabilities P(0)=0.5 and P(1)=0.5.

**`qc.x(0)`** produces the statevector `[0+0j, 1+0j]` — a clean, deterministic flip to `|1>`. There's no superposition here at all: X is a classical-style bit-flip, and measuring this state gives `1` with certainty every single time.

**`qc.rx(math.pi/2, 0)`** produces the statevector `[0.7071068+0j, 0-0.7071068j]`. Look closely at that second amplitude: it's `-0.7071068j`, an imaginary number, not the plain real `0.7071068` that H produced. The measurement probabilities work out the same as H — P(0)=0.5, P(1)=0.5 — because probability only depends on the squared magnitude of each amplitude, and `|0.7071068|² = |-0.7071068j|²`. But the states are not identical: RX introduced a relative phase (a 90° rotation into the imaginary axis) that H never does. This distinction between "same measurement statistics" and "same quantum state" becomes critical once you start combining gates, because downstream operations are sensitive to that phase even though a single measurement right now can't see it.

## Key terms

| Term | Meaning |
|---|---|
| Pauli gates (X, Y, Z) | Fixed single-qubit gates with no adjustable parameter; X flips the bit, Z flips the phase of `\|1>` |
| Hadamard (H) | Creates an equal superposition; applied to `\|0>` gives the `\|+>` state |
| S, T gates | Fixed fractional phase rotations (quarter-turn and eighth-turn respectively) |
| RX, RY, RZ | Parameterized rotation gates around the X/Y/Z axis by an angle you choose, in radians |
| `Statevector(qc)` | Computes a circuit's exact complex amplitudes with no sampling involved |
| Relative phase | A complex-number difference between amplitudes that doesn't change measurement probabilities but does change the physical state |

## Check yourself

`qc.h(0)` and `qc.rx(math.pi/2, 0)` both give measurement probabilities P(0)=0.5, P(1)=0.5 starting from `|0>`. Given that their exact statevectors are `[0.7071068+0j, 0.7071068+0j]` and `[0.7071068+0j, 0-0.7071068j]` respectively, explain why these are not the same quantum state despite matching on measurement probabilities.
