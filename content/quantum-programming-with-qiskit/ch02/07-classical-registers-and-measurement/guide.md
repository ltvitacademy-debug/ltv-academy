# Classical Registers & Measurement

Every quantum circuit you actually want an answer from eventually has to cross back into the classical world. A qubit can hold a rich superposition, but the only thing you can ever read out of it is a classical bit — 0 or 1 — and that readout is where a classical register comes in.

## What you'll learn

- Why a quantum circuit needs an explicit classical register to receive measurement outcomes
- How to trigger measurement with `qc.measure(qubit, clbit)` and the `qc.measure_all()` shortcut
- Why measurement is a one-way, irreversible collapse of superposition, not a side-effect-free read
- How to run a measured circuit on `AerSimulator` using the modern `transpile` + `backend.run` pattern
- How to tell ordinary statistical shot noise apart from a real circuit or simulator problem

## Why you need a classical register at all

A qubit's state lives as complex amplitudes that you cannot directly inspect. The only operation that extracts a definite, readable value is measurement, and measurement needs somewhere to put that value: a classical bit. That's what `ClassicalRegister` (or the classical-bit count you pass to `QuantumCircuit(n_qubits, n_clbits)`) is for — it's ordinary classical memory attached to the circuit, existing purely to receive measurement outcomes.

You trigger a measurement with:

```python
qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)        # measure qubit 0 into classical bit 0
```

or, for every qubit at once:

```python
qc.measure_all()
```

`measure_all()` is a convenience that measures every qubit into a matching set of classical bits, and is the one you'll reach for most often during quick experiments.

## Measurement is irreversible

This is the part that trips people up coming from classical programming: measuring a qubit is not like reading a variable's value without side effects. Before measurement, a qubit in superposition genuinely holds both possibilities at once, weighted by its amplitudes. The act of measuring forces it to collapse to one definite classical outcome — and once that happens, the superposition is gone. You cannot measure a qubit, see the result, and then somehow "un-measure" it back into its prior superposition. Every circuit you design has to treat measurement as a one-way, destructive final step, not an inspection you can casually sprinkle in the middle of a computation without changing what happens next.

## Running a measured circuit on `AerSimulator`

Here's the full modern pattern, from circuit to counts:

```python
from qiskit import QuantumCircuit, transpile
from qiskit_aer import AerSimulator

qc = QuantumCircuit(1, 1)
qc.h(0)
qc.measure(0, 0)

backend = AerSimulator()
result = backend.run(transpile(qc, backend), shots=2048).result()
print(result.get_counts())
```

This circuit puts a single qubit into the `|+>` superposition with H, then measures it. The ideal probabilities are exactly P(0)=0.5 and P(1)=0.5 — the Hadamard splits the amplitude evenly between the two outcomes, so there's no reason to expect either result more than the other.

## Reading a real result

Running the exact circuit above with `shots=2048` on a real seeded simulation gives:

```python
{'0': 999, '1': 1049}
```

That's not a perfect 1024/1024 split, even though the ideal probability is exactly 50/50. The gap here is small — 999 versus 1049 is within about 1 percentage point of an even split (48.8%/51.2% versus the ideal 50%/50%) — and it's exactly the kind of statistical shot noise you should expect whenever you draw a finite number of samples from a true 50/50 distribution. It's not evidence of a bug, a miscalibrated gate, or anything wrong with the circuit. If you ran the same circuit again with a different random seed, you'd get a slightly different split, still clustered near 50/50.

## Key terms

| Term | Meaning |
|---|---|
| `ClassicalRegister` | Classical memory attached to a circuit, existing to receive measurement outcomes |
| `qc.measure(q, c)` | Measures qubit `q`, writing the result into classical bit `c` |
| `qc.measure_all()` | Measures every qubit in the circuit into a matching set of classical bits |
| Collapse | The irreversible transition of a qubit from superposition to one definite classical outcome upon measurement |
| Shot noise | Statistical variation in observed counts caused by drawing a finite number of samples, even when the true probability is exact |

## Check yourself

A Hadamard-then-measure circuit has an exact ideal probability of P(0)=0.5, P(1)=0.5, yet a real 2048-shot run produced `{'0': 999, '1': 1049}` rather than a perfect 1024/1024 split. Is the roughly 2.4 percentage-point imbalance between 999 and 1049 (out of 2048 total) something you should investigate as a possible circuit or simulator problem? Justify your answer using what you know about shot noise.
