# Q-Sphere & State-City Plots

The Bloch sphere from the last lesson has a hard limit: it only describes one qubit at a time, and it breaks down entirely for entangled states. The Q-sphere and state-city plots exist precisely to cover that gap.

## What you'll learn

- How to call `plot_state_qsphere` and `plot_state_city`
- How to read a Q-sphere: blob position, size, and color
- How state-city shows real and imaginary amplitude components as 3D bars
- Verified real Q-sphere output for the 2-qubit Bell state
- Verified real Q-sphere output for the 3-qubit GHZ state, and why the same pattern scales up

## Two new plots, one shared purpose

```python
from qiskit.quantum_info import Statevector
from qiskit.visualization import plot_state_qsphere, plot_state_city

state = Statevector(qc)
plot_state_qsphere(state)
plot_state_city(state)
```

The Q-sphere places every computational basis state (`00`, `01`, `10`, `11` for two qubits; `000` through `111` for three) at a fixed position on a sphere. Each basis state that has nonzero probability in your statevector appears as a blob: the blob's **size** encodes its probability, and its **color** encodes its relative phase. Basis states with zero probability simply don't appear, the same absence-means-zero convention you already saw with `plot_histogram`.

`plot_state_city` takes a different approach to the same underlying data: it draws a 3D bar chart with one pair of bars per basis state, one bar for the real component of that basis state's amplitude and one for the imaginary component. Where the Bloch sphere collapses a state down to a single arrow, state-city shows you the raw amplitude structure across every basis state at once — which is exactly the information you need to see relative phase relationships that a Bloch sphere, even per-qubit, cannot represent for an entangled system.

![A real plot_state_qsphere rendering from Qiskit's own documentation](/courses/quantum-programming-with-qiskit/ch04/18-qsphere-and-state-city-plots/qsphere-example.png)
*plot_state_qsphere's actual output: every computational basis state at a fixed position, blobs only where probability is nonzero.*

## The real Bell-state Q-sphere

Take the familiar Bell state from `qc.h(0); qc.cx(0,1)`. Its amplitudes are 0.7071068 on `00`, 0.7071068 on `11`, and exactly 0 on `01` and `10`. Feed this statevector into `plot_state_qsphere` and here is exactly what renders:

- Two blobs, at the `00` and `11` positions on the sphere, and nothing anywhere else
- Both blobs are the **same size**, because both basis states carry equal probability: |0.7071068|² = 0.5 for each
- Both blobs are the **same color**, because both amplitudes are the same positive real number — there is no relative phase difference between them

This is the direct visual signature of the Bell state's entanglement: only two of the four possible outcomes ever occur, they occur with equal probability, and they occur in phase with each other. A single-qubit Bloch sphere has no way to show this at all, because neither qubit individually "has" a definite state here — the entanglement lives in the correlation between the two qubits, which is exactly what the Q-sphere's basis-state-by-basis-state layout is built to show.

## The real GHZ-state Q-sphere: the same idea at three qubits

Extend to three qubits with `qc.h(0); qc.cx(0,1); qc.cx(1,2)`, producing the GHZ state with amplitudes 0.7071068 on `000` and `111`, and exactly 0 on all six other three-bit strings. The Q-sphere scales up without changing the underlying logic:

- Two blobs, at `000` and `111`, nothing at the other six positions (`001`, `010`, `011`, `100`, `101`, `110`)
- Both blobs the same size (equal 0.5 probability each)
- Both blobs the same color (equal positive real phase, no relative phase difference)

Nothing conceptually new happened going from 2 qubits to 3 — the Q-sphere simply has more possible basis-state positions available (8 instead of 4), and the GHZ state happens to populate exactly two of them, just as the Bell state populated exactly two of its four. This is the real value of the Q-sphere over the Bloch sphere: it scales cleanly to any number of qubits because it's built around basis states and their relative phases rather than around a single 3D arrow that only has meaning for one qubit at a time.

## Key terms

| Term | Meaning |
|---|---|
| `plot_state_qsphere` | Plots every computational basis state as a sphere position; blob size = probability, blob color = relative phase |
| `plot_state_city` | 3D bar chart of real and imaginary amplitude components across all basis states |
| Blob absence | A basis state with zero amplitude produces no blob at all on the Q-sphere |
| Bell state Q-sphere | Two equal-size, equal-color blobs at `00` and `11`; nothing at `01`/`10` |
| GHZ state Q-sphere | Same pattern scaled to 3 qubits: two equal-size, equal-color blobs at `000` and `111`; nothing elsewhere |

## Check yourself

Why can't a single-qubit Bloch sphere — even drawn separately for each of the two qubits in the Bell state — correctly represent what the Q-sphere shows in one picture, and what specifically about entanglement is lost when you try?
