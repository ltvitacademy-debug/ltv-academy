# Building Multi-Qubit Circuits

Single-qubit gates are useful, but the real power of quantum computing shows up the moment two or more qubits start interacting. This lesson builds the single most important two-qubit circuit in the entire field — the Bell state — and uses it to make entanglement concrete instead of abstract.

## What you'll learn

- How to build a 2-qubit circuit and apply a two-qubit gate
- What `qc.cx(control, target)` actually does, and why control/target order matters
- The exact statevector and probabilities of the Bell state
- Why two of the four possible outcomes have exactly zero probability, not just a small one
- How a real simulated run compares to the ideal result

## The CX (CNOT) gate

The controlled-X gate, called with `qc.cx(control, target)`, is the workhorse two-qubit gate. It flips the target qubit's state, but only conditionally: if the control qubit is `|1>`, the target gets flipped; if the control qubit is `|0>`, the target is left alone. Applied to a qubit that's already in superposition, this conditional behavior is exactly what creates entanglement — the two qubits become linked in a way that has no classical analogue.

Control and target order matters: `qc.cx(0, 1)` uses qubit 0 as control and qubit 1 as target, while `qc.cx(1, 0)` swaps that relationship entirely. These produce different circuits with different behavior, so always double-check which qubit you intend as the "decider" and which as the "follower."

## Building the Bell state

The canonical way to create entanglement from scratch:

```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(2)
qc.h(0)      # put qubit 0 into superposition
qc.cx(0, 1)  # entangle qubit 1 with qubit 0
```

Reading this step by step: `h(0)` puts qubit 0 into an equal superposition of `|0>` and `|1>`. Then `cx(0, 1)` says "if qubit 0 is `|1>`, flip qubit 1." Because qubit 0 is in superposition rather than a definite value, this entangles the two qubits together into a single combined state rather than two independent ones.

## The exact result: statevector and probabilities

The resulting state is exactly `(|00> + |11>)/sqrt(2)` — a superposition over only two of the four possible 2-qubit outcomes. Concretely, the amplitude on `00` is `0.7071068`, the amplitude on `11` is `0.7071068`, and the amplitudes on `01` and `10` are exactly zero. That gives ideal probabilities of P(00)=0.5, P(11)=0.5, and P(01)=P(10)=0.

This is the heart of entanglement: once you measure qubit 0 and get, say, `1`, you know with absolute certainty that qubit 1 is also `1` — there is no way to observe `01` or `10` from this circuit, ever. The two qubits aren't just correlated the way two coins glued together might be; the correlation exists even though neither qubit had a definite value before measurement.

## Running it and comparing to the ideal

```python
from qiskit import transpile
from qiskit_aer import AerSimulator

qc.measure_all()
backend = AerSimulator()
result = backend.run(transpile(qc, backend), shots=1024).result()
print(result.get_counts())
```

A real seeded run at `shots=1024` gives:

```python
{'00': 503, '11': 521, '01': 0, '10': 0}
```

Look carefully at the two different kinds of "zero" and "not quite even" happening here. The `00`/`11` split (503 vs. 521) isn't a perfect 512/512 — that's ordinary statistical shot noise, the same kind you saw with the single-qubit Hadamard circuit, and it would shift slightly on a different run. But `01` and `10` are not "close to zero" — they are exactly zero, every single time you run this circuit, no matter how many shots you use or how many times you repeat the experiment. That's because the Bell state has genuinely zero amplitude on those outcomes; there's no statistical process that could ever produce them. Don't mistake a true structural zero for a result that merely happened to land on zero this time — they're fundamentally different claims about the circuit.

## Key terms

| Term | Meaning |
|---|---|
| `qc.cx(control, target)` | The controlled-X (CNOT) gate: flips the target qubit only if the control qubit is `\|1>` |
| Entanglement | A correlation between qubits that cannot be explained by either qubit having a definite value beforehand |
| Bell state | The canonical maximally-entangled 2-qubit state, here `(\|00> + \|11>)/sqrt(2)` |
| Structural zero | An outcome with exactly zero probability by the circuit's mathematics, not merely a result that happened not to occur in one run |
| Shot noise | Statistical variation between the ideal probability and an observed count from a finite number of shots |

## Check yourself

A Bell-state circuit run at 1024 shots gave `{'00': 503, '11': 521, '01': 0, '10': 0}`. Explain why the 503-vs-521 gap and the 0-vs-0 outcomes represent two fundamentally different kinds of "not what you'd naively expect," and what would happen to each if you reran the circuit with a different random seed.
