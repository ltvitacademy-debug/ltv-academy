# The Qiskit Aer Simulator

Every circuit you've built so far has been a plan on paper — gates applied to qubits, with no result to look at. `qiskit_aer`'s `AerSimulator` is where that plan actually runs. It's the standard local, high-performance backend for executing circuits without touching real quantum hardware, and it's the backend you'll reach for in almost every lesson from here forward.

## What you'll learn

- Why `AerSimulator` replaced the legacy `qiskit.BasicAer` as the standard local backend
- The simulation methods `AerSimulator` can run under (`automatic`, `statevector`, `density_matrix`, `stabilizer`, `matrix_product_state`)
- The modern run pattern: `transpile` then `backend.run(...)`, not the removed `qiskit.execute`
- How to pull measurement counts out of a finished job's result
- A verified real example: simulating a Bell-state circuit at 1024 shots

## From `BasicAer` to `AerSimulator`

Older Qiskit code and tutorials sometimes reference `qiskit.BasicAer`, a pure-Python reference simulator. It still works for tiny circuits, but it's slow and limited. `qiskit_aer.AerSimulator` is the real, actively maintained successor: a C++-backed simulator that's dramatically faster and supports multiple internal simulation strategies, noise modeling (covered in a later lesson), and larger circuits. If you see `BasicAer` in something you're reading, treat `AerSimulator` as the modern equivalent.

## Simulation methods: how Aer decides to compute your circuit

`AerSimulator` doesn't just run one algorithm internally — it supports several, selectable with the `method` argument:

```python
from qiskit_aer import AerSimulator

backend = AerSimulator(method="automatic")  # the default
```

- `"automatic"` (the default) — Aer inspects your circuit and picks the fastest valid method itself.
- `"statevector"` — tracks the full complex amplitude vector exactly. Exact but memory-expensive; doubles in cost with every added qubit.
- `"density_matrix"` — tracks a density matrix instead of a pure state vector, needed once you're modeling mixed states (e.g. under noise).
- `"stabilizer"` — an efficient method restricted to Clifford-only circuits (H, S, CNOT, Pauli gates — no T gate, no arbitrary rotations). Can simulate far more qubits than statevector methods because it never builds the full exponential state.
- `"matrix_product_state"` — exploits limited entanglement structure to simulate certain large, sparse circuits that would otherwise be intractable.

You won't need to hand-pick a method for most circuits in this course — `"automatic"` is the right default — but knowing these exist matters once you start pushing qubit counts up and need to know why a circuit that "should" be too big to simulate still runs fine.

## The modern run pattern

Qiskit removed the old `qiskit.execute()` convenience function. The current pattern is explicit: transpile the circuit for your target backend, then call `.run()` directly on the backend:

```python
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

backend = AerSimulator()
result = backend.run(transpile(qc, backend), shots=1024).result()
counts = result.get_counts()
```

This is a Bell-state circuit: `h(0)` puts qubit 0 into superposition, `cx(0, 1)` entangles qubit 1 with it, and the two `measure` calls record both qubits to classical bits 0 and 1. `transpile(qc, backend)` rewrites the circuit into the gate set and layout the target backend actually supports — on `AerSimulator` this is mostly a no-op for simple circuits, but it's good habit to always transpile before running, since the same code then works unchanged against a real hardware backend.

## Reading the result: counts, not amplitudes

`result.get_counts()` returns a dictionary mapping each observed bitstring to how many of the shots produced it. For the Bell-state circuit above, the only two possible outcomes are `00` and `11` — the entanglement means the two qubits are never observed to disagree. The exact ideal probabilities are `P(00) = 0.5`, `P(11) = 0.5`, and `P(01) = P(10) = 0` exactly, since no path through the circuit can ever land on a mismatched pair.

Running the circuit above with a real seeded simulation at `shots=1024` gives:

```python
{'00': 503, '11': 521, '01': 0, '10': 0}
```

Notice this isn't a perfect 512/512 split, even though the underlying probabilities are exactly 0.5/0.5. That gap is sampling noise from drawing a finite number of shots — not a bug, not hardware error, and not evidence the circuit is wrong. The next few lessons dig into exactly why that gap exists and how to reason about its size.

## Key terms

| Term | Meaning |
|---|---|
| `AerSimulator` | Qiskit's standard local, high-performance simulator backend, replacing the legacy `BasicAer` |
| `method` | The internal simulation strategy `AerSimulator` uses: `automatic`, `statevector`, `density_matrix`, `stabilizer`, `matrix_product_state` |
| `transpile` | Rewrites a circuit into the gate set/layout a target backend supports, required before `.run()` |
| `backend.run(...)` | The modern way to execute a circuit on a backend, replacing the removed `qiskit.execute()` |
| `get_counts()` | Returns a dict of observed bitstring to occurrence count from a completed job's result |

## Check yourself

The Bell-state circuit's ideal probabilities are exactly `P(00) = 0.5` and `P(11) = 0.5`, yet a real 1024-shot run produced `{'00': 503, '11': 521}` instead of `{'00': 512, '11': 512}`. Is this difference evidence that something is wrong with the circuit or the simulator? Why or why not?
