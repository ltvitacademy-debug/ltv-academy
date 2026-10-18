# Capstone: Build the Circuit & Simulation Layer

With the five requirements laid out, it's time to write real code. This lesson builds requirements #2 and #3 from the kickoff — translating a plain circuit spec into a `QuantumCircuit`, then running it both exactly and via shots — and proves the result matches the known-correct answer for the GHZ test case.

## What you'll learn

- How to write a `build_circuit` function that turns a gate-tuple spec into a real `QuantumCircuit`
- How to run the exact statevector layer with `Statevector(qc)`
- How to run the shot-based layer with `AerSimulator` using current, post-2.0 Qiskit syntax
- How to confirm both layers agree with the independently-known correct answer for the GHZ case

## Translating a spec into a circuit

The first piece of real code is a small function that reads the plain-Python spec and builds the matching circuit:

```python
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator
from qiskit.quantum_info import Statevector

def build_circuit(spec, n_qubits):
    qc = QuantumCircuit(n_qubits, n_qubits)
    for gate in spec:
        name = gate[0]
        if name == 'h':
            qc.h(gate[1])
        elif name == 'cx':
            qc.cx(gate[1], gate[2])
        # extend with more gate types as needed
    return qc
```

Notice the shape of this function: it loops over the spec once, reads each tuple's first element as the gate name, and dispatches to the matching `QuantumCircuit` method. This is intentionally minimal — only `h` and `cx` are handled, which is all the GHZ test case needs — but the `# extend with more gate types as needed` comment marks exactly where you'd add `x`, `cz`, `rz`, or any other gate your spec format needs to support later. A quantum circuit is a sequence of simple gate names paired with qubit indices, so a loop-and-dispatch function like this scales to arbitrarily complex specs without changing its core structure.

Applying it to the GHZ test case from the kickoff:

```python
spec = [('h', 0), ('cx', 0, 1), ('cx', 1, 2)]
qc = build_circuit(spec, 3)
```

This produces a 3-qubit, 3-classical-bit circuit with the Hadamard and CX chain applied in order — exactly the circuit you built by hand back in Chapter 2.

## Layer one: the exact statevector

Before any measurement or shot-based noise enters the picture, you want the *exact* mathematical answer. `Statevector` computes this directly from the circuit's unitary operations:

```python
exact_sv = Statevector(qc)
```

`exact_sv` now holds the exact amplitude for every one of the circuit's 2³ = 8 basis states. There's no sampling and no randomness here — it's the literal result of applying the circuit's gates to the all-zero starting state, computed in closed form. This is your ground truth for the comparison layer you'll build in the next lesson.

## Layer two: the shot-based simulation

The second layer simulates what you'd actually observe if you ran the circuit on a real device (or a realistic simulator) and measured it many times. Because measurement is destructive, this needs its own copy of the circuit with measurement operations added:

```python
qc_meas = qc.copy()
qc_meas.measure(range(3), range(3))

backend = AerSimulator()
job = backend.run(transpile(qc_meas, backend), shots=2048)
counts = job.result().get_counts()
```

Two details are worth noticing. First, `qc.copy()` keeps the original, measurement-free circuit intact so `exact_sv` stays valid — you don't want the statevector layer polluted by the act of measuring. Second, this is current post-2.0 Qiskit syntax: there's no `qiskit.execute` function anymore. You transpile the circuit for the target backend with `transpile(qc_meas, backend)`, then call `backend.run(...)` directly on the transpiled circuit, with `shots=2048` controlling how many times the circuit is sampled.

## Confirming both layers agree with the known answer

Here's where the validation discipline from the kickoff lesson pays off. The GHZ circuit's exact answer is already established: the final state is `(|000⟩ + |111⟩)/√2`, meaning `exact_sv` should show an amplitude of 0.7071068 on both `000` and `111`, and exactly 0 on all six other basis states — giving exact probabilities P(000) = 0.5, P(111) = 0.5, and 0 everywhere else.

A real seeded run of the shot-based layer at `shots=2048` produced:

```
counts = {'000': 1069, '111': 979}
```

with all six other possible outcomes landing at exactly 0 count. Check this against the exact prediction: 1069/2048 ≈ 0.522 and 979/2048 ≈ 0.478, both reasonably close to the predicted 0.5 each, and critically, *no* counts at all appear on any of the six outcomes the exact statevector says should be impossible. That's the shape of a correctly working tool: the empirical distribution clusters around the exact prediction, with the deviation small enough to look like ordinary shot noise rather than a sign of a bug. (The next lesson builds the actual statistical test for "small enough.")

This is the moment the kickoff lesson was building toward: you now have independent confirmation, from a case whose correct answer was never in doubt, that both layers of your tool are working. That confidence is what lets you point this same code at a circuit you don't already know the answer to.

## Key terms

| Term | Meaning |
|---|---|
| `build_circuit(spec, n_qubits)` | The dispatch function that reads a gate-tuple spec and constructs the matching `QuantumCircuit` |
| `Statevector(qc)` | Computes the exact, closed-form amplitudes of a circuit's final state with no sampling involved |
| `qc.copy()` | Duplicates a circuit so measurement can be added to one copy without affecting the measurement-free original |
| `backend.run(transpile(qc, backend), shots=...)` | The current post-2.0 Qiskit pattern for running a shot-based simulation (replaces the removed `qiskit.execute`) |
| `counts` | The dictionary of observed bitstring outcomes and their occurrence counts returned by a shot-based run |

## Check yourself

The shot-based run returned zero counts for all six basis states the exact statevector predicts should have exactly zero probability. If even one of those six states had shown up with a nonzero count, would that necessarily mean your `build_circuit` function has a bug — or could there be another explanation? What would you check first?
