# Your First Qiskit Circuit

Everything in the first three lessons was setup and context. This is where you actually build a circuit, run it, and look at real output for the first time — a single qubit, one gate, and a measurement.

## What you'll learn

- How to build a one-qubit circuit with `QuantumCircuit`
- What the Hadamard gate does: putting a qubit into equal superposition
- The modern run pattern: `transpile` then `backend.run(...)` on `AerSimulator`
- How to read `get_counts()` output, and why it isn't a perfect 50/50 split
- How to visualize results with `plot_histogram`

## Building the circuit

A single qubit, a Hadamard gate, and a measurement is about as small as a real circuit gets, and it's enough to see quantum randomness directly:

```python
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)
```

`QuantumCircuit(1, 1)` allocates one qubit and one classical bit — the classical bit is where the measurement result gets stored. `qc.h(0)` applies a Hadamard gate to qubit 0, and `qc.measure(0, 0)` measures qubit 0 into classical bit 0.

## What the Hadamard gate does

Before the Hadamard gate, a qubit starts in a definite state, conventionally written `|0⟩`. The Hadamard gate (`h`) puts it into an equal superposition of `|0⟩` and `|1⟩` — not "secretly one or the other," but a genuine quantum state where neither outcome is determined until you measure. For this specific gate, the ideal probabilities are exact: `P(0) = 0.5` and `P(1) = 0.5`. There's no approximation in that statement — it falls directly out of the Hadamard's definition.

That exactness matters, because it sets up a distinction you'll see again and again in this course: the *ideal probability* is exact and known in advance, but any single *run* of the circuit only gives you a finite sample drawn from that probability — and a finite sample practically never lands on a perfectly even split.

## Running it: the modern pattern

Qiskit's old `qiskit.execute()` convenience function has been removed. The current pattern transpiles the circuit for your chosen backend, then calls `.run()` on the backend directly:

```python
backend = AerSimulator()
compiled = transpile(qc, backend)
job = backend.run(compiled, shots=1024)
result = job.result()
counts = result.get_counts()
print(counts)
```

`transpile(qc, backend)` rewrites the circuit into the gate set and layout `AerSimulator` expects — for a circuit this simple it's close to a no-op, but doing it unconditionally means this exact code pattern also works unchanged against a real hardware backend later in the course. `shots=1024` tells the backend to run the circuit 1024 independent times and tally the outcomes.

## Reading the output

Running the exact code above (via a real seeded simulation) produces:

```python
{'0': 494, '1': 530}
```

Add those up and you get 1024, matching the shot count. Notice this isn't `{'0': 512, '1': 512}`, even though the underlying probability is exactly 50/50. That gap — 494 vs. 530 instead of a perfect even split — is ordinary statistical shot noise from drawing a finite sample, not a bug in your circuit, not a flaw in the simulator, and not evidence the Hadamard gate "didn't work." If you ran this same code again with a different random seed, you'd get a slightly different split again — something like 500/524 or 518/506 — each one a legitimate, different-looking sample from the exact same 50/50 distribution. That's expected behavior, and it's the same phenomenon you'll study in more depth in Chapter 3.

## Visualizing it

Qiskit's visualization helper turns that counts dictionary into a bar chart, which is often easier to read at a glance than the raw numbers:

```python
from qiskit.visualization import plot_histogram

plot_histogram(counts)
```

This renders two bars, one for `'0'` and one for `'1'`, at roughly — but not exactly — equal height, visually matching the 494/530 split from the run above.

## Key terms

| Term | Meaning |
|---|---|
| `QuantumCircuit(1, 1)` | Allocates one qubit and one classical bit for storing a measurement result |
| Hadamard gate (`h`) | A gate that puts a qubit into an exact equal superposition: `P(0) = 0.5`, `P(1) = 0.5` |
| `transpile(qc, backend)` | Rewrites a circuit into the gate set/layout a target backend supports, required before `.run()` |
| `backend.run(compiled, shots=1024)` | The modern way to execute a circuit, replacing the removed `qiskit.execute()` |
| Shot noise | The expected statistical variation between a finite sample's observed counts and the exact underlying probabilities |

## Check yourself

You run the Hadamard circuit above and get `{'0': 494, '1': 530}`. A classmate runs the exact same code on their own machine and gets `{'0': 503, '1': 521}` — a different split. Did one of you do something wrong? Explain what's actually going on using the idea of ideal probability versus a finite sample.
