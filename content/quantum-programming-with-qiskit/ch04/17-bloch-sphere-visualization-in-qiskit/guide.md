# Bloch Sphere Visualization in Qiskit

A single qubit's state is two complex numbers, which is hard to picture. The Bloch sphere maps that state to a single 3D arrow, and once you can read that arrow, every single-qubit gate you've learned becomes a visible rotation instead of an abstract matrix.

## What you'll learn

- How to generate a Bloch sphere plot with `plot_bloch_multivector` and `Statevector`
- The formula mapping amplitudes α|0⟩ + β|1⟩ to a 3D vector (x, y, z)
- Five verified real Bloch vectors covering identity, X, H, RY, and RX
- Why H lands on the equator and X flips pole to pole
- Why RY rotates in the X-Z plane and RX rotates in the Y-Z plane

## Generating the plot

For a circuit with no measurement yet applied, you can get the exact statevector and plot it directly on a Bloch sphere:

```python
from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector
from qiskit.visualization import plot_bloch_multivector

qc = QuantumCircuit(1)
qc.h(0)

state = Statevector(qc)
plot_bloch_multivector(state)
```

For a multi-qubit circuit where the qubits are not entangled with each other, `plot_bloch_multivector` draws one small sphere per qubit, each showing that qubit's own individual state. If the qubits are entangled, this per-qubit picture breaks down — that's exactly the limitation the next lesson's Q-sphere exists to solve.

![A real plot_bloch_multivector rendering from Qiskit's own documentation](/courses/quantum-programming-with-qiskit/ch04/17-bloch-sphere-visualization-in-qiskit/bloch-multivector-example.png)
*plot_bloch_multivector's actual output: each qubit's state as its own 3D arrow on its own sphere.*

## The real mapping: amplitudes to a 3D arrow

Any single-qubit pure state can be written α|0⟩ + β|1⟩. That pair of complex numbers maps to a point (x, y, z) on the unit sphere via:

```
x = 2 · Re(ᾱβ)
y = 2 · Im(ᾱβ)
z = |α|² − |β|²
```

You don't need to compute this by hand in practice — `plot_bloch_multivector` does it for you — but knowing the formula is what lets you predict, before you even draw the plot, roughly where a gate will send the arrow.

## Five real examples, verified by direct computation

These five Bloch vectors were computed directly from the exact statevector amplitudes of five simple one-gate circuits:

| Circuit | Resulting state | Bloch vector (x, y, z) | Where it sits |
|---|---|---|---|
| No gates | `\|0⟩` | (0, 0, 1) | North pole |
| `qc.x(0)` | `\|1⟩` | (0, 0, -1) | South pole |
| `qc.h(0)` | `\|+⟩` | (1, 0, 0) | Equator, along +x |
| `qc.ry(math.pi/3, 0)` | tilted state | (0.866025, 0, 0.5) | 60° from north pole, toward +x |
| `qc.rx(math.pi/2, 0)` | tilted state | (0, -1, 0) | Equator, along -y |

Read these as a set and the pattern is immediate. `|0⟩` and `|1⟩` sit at exact opposite poles — applying `X` doesn't nudge the arrow, it flips it straight through the center of the sphere, pole to pole. `H` doesn't go to a pole at all; it lands exactly on the equator along the +x axis, which is the geometric picture of what "equal superposition" means on this sphere — maximally far from both poles.

## Why RY and RX rotate in different planes

The `RY(π/3)` result, (0.866025, 0, 0.5), has y = 0 — it never leaves the x-z plane. That's not a coincidence: `RY(θ)` is defined to rotate the Bloch vector within the x-z plane by angle θ, starting from the north pole. Starting at (0,0,1) and rotating 60° toward +x lands you exactly at (sin 60°, 0, cos 60°) = (0.866025, 0, 0.5), which matches the verified number exactly.

The `RX(π/2)` result, (0, -1, 0), has x = 0 — it never leaves the y-z plane. `RX(θ)` rotates the Bloch vector within the y-z plane. Starting from (0,0,1) and rotating 90° around the x-axis sends the vector to the equator along -y rather than +y, landing at (0, -1, 0) as verified.

The practical takeaway: once you know which axis a rotation gate is named after, you know which plane of the Bloch sphere it moves the vector within, and that turns the Bloch sphere from a pretty picture into an actual debugging tool — if a gate's output doesn't land in the plane you expected, something in your circuit isn't doing what you think it is.

## Key terms

| Term | Meaning |
|---|---|
| Bloch sphere | A unit sphere on which every pure single-qubit state maps to exactly one point |
| `plot_bloch_multivector` | Qiskit function that plots a `Statevector` as one Bloch sphere per qubit |
| North/south pole | `\|0⟩` sits at (0,0,1); `\|1⟩` sits at (0,0,-1) |
| Equator | States of equal `\|0⟩`/`\|1⟩` probability, like `\|+⟩` from `H`, sit on the equator (z = 0) |
| RY / RX rotation plane | `RY(θ)` rotates within the x-z plane; `RX(θ)` rotates within the y-z plane |

## Check yourself

If you applied `qc.ry(math.pi/3, 0)` and then separately applied `qc.rx(math.pi/2, 0)` to a fresh qubit starting at `|0⟩`, would you expect the two resulting Bloch vectors to land in the same plane of the sphere, and why or why not?
