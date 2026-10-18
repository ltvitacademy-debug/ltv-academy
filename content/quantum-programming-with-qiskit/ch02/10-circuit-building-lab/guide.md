# Circuit-Building Lab

Reading about circuits is not the same skill as predicting what one will do before you run it. This lab closes out the chapter by having you build a 3-qubit entangled state from scratch, commit to a prediction in advance, and then check that prediction against a real simulated run — the same workflow you'll use for every circuit you design from here on.

## What you'll learn

- How to extend a Bell-state pattern to 3 qubits to build a GHZ state
- How to predict a circuit's outcome distribution before running it
- The exact ideal statevector and probabilities for a 3-qubit GHZ state
- How to compare a real simulated run against your prediction and interpret the match
- Why predicting first, then checking, is the core professional habit this lab is building

## The task: build a 3-qubit GHZ state

The GHZ state generalizes the 2-qubit Bell state you built in the previous lesson to three qubits, using the same core idea — superposition on one qubit, then entangle the rest onto it in a chain:

```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(3, 3)
qc.h(0)        # superposition on qubit 0
qc.cx(0, 1)    # entangle qubit 1 with qubit 0
qc.cx(1, 2)    # entangle qubit 2 with qubit 1
qc.measure([0, 1, 2], [0, 1, 2])
```

Before you read any further: based on what you learned building the Bell state, pause and predict which of the 8 possible 3-bit outcomes (`000` through `111`) you expect to see, and roughly in what proportion. Write your prediction down — you'll check it against the real result below.

## Working out the prediction

Trace through the logic the same way you did for the Bell state. `h(0)` splits qubit 0 into an equal superposition of `|0>` and `|1>`. `cx(0, 1)` then says "if qubit 0 is `1`, flip qubit 1" — so qubit 1 now always matches qubit 0. `cx(1, 2)` says "if qubit 1 is `1`, flip qubit 2" — so qubit 2 now always matches qubit 1, and therefore also always matches qubit 0. The chain of CX gates propagates one qubit's superposition out to all three, locking them together so that all three qubits are always observed to agree.

That reasoning should lead you to predict exactly two possible outcomes, `000` and `111`, each roughly half the time, with the other six 3-bit combinations (`001`, `010`, `011`, `100`, `101`, `110`) never appearing at all.

## The exact ideal result

The math confirms this directly. The circuit produces the exact statevector `(|000> + |111>)/sqrt(2)`: amplitude `0.7071068` on `000`, amplitude `0.7071068` on `111`, and exactly zero amplitude on all six other 3-qubit combinations. That gives ideal probabilities of P(000)=0.5, P(111)=0.5, and zero probability on everything else.

## Running it and checking your prediction

```python
from qiskit import transpile
from qiskit_aer import AerSimulator

backend = AerSimulator()
result = backend.run(transpile(qc, backend), shots=2048).result()
print(result.get_counts())
```

A real seeded run at `shots=2048` gives:

```python
{'000': 1069, '111': 979}
```

with all six other outcomes at exactly `0`. Check this against the prediction you wrote down: did you correctly rule out the six impossible outcomes? Did you expect something close to an even split between `000` and `111`?

The 1069-vs-979 split isn't a perfect 1024/1024 — that gap is ordinary shot noise, the same statistical variation you've now seen in every measured circuit this chapter. But the six missing outcomes staying at exactly `0`, with no exceptions, is the structural signature of a genuinely entangled state: there is zero amplitude there, so no number of shots and no random seed will ever produce them. If your real run ever showed a nonzero count on one of those six, that would be a sign of a bug in your circuit (wrong qubit order, a mistyped gate) or genuine hardware noise (covered in Chapter 7) — not something to shrug off as "probably fine."

## The habit this lab is building

The real skill here isn't the GHZ state itself — it's the discipline of predicting a result before you run anything, and then treating any mismatch between prediction and reality as a signal worth investigating rather than ignoring. That habit scales directly to every circuit you'll build for the rest of this course, especially once circuits get too large to trace by hand and you have to rely on exactly this kind of sanity check to catch mistakes.

## Key terms

| Term | Meaning |
|---|---|
| GHZ state | The 3-qubit generalization of the Bell state, here `(\|000> + \|111>)/sqrt(2)`, built by chaining CX gates off one superposed qubit |
| Chained entanglement | Using successive CX gates (`cx(0,1)`, `cx(1,2)`, ...) to propagate one qubit's superposition out to additional qubits |
| Predict-then-run | The practice of committing to an expected outcome distribution before executing a circuit, then checking the real result against it |
| Structural zero | An outcome with exactly zero probability by the circuit's own mathematics, which stays exactly zero on every run regardless of shots or seed |

## Check yourself

Before running the GHZ circuit, you predict only `000` and `111` are possible, each near 50%. The real 2048-shot run gives `{'000': 1069, '111': 979}` with all other outcomes at exactly 0. Suppose a classmate's run of the same circuit instead showed `{'000': 1041, '111': 1003, '101': 4}`. Using what you know about structural zeros versus shot noise, what would you tell them to go check first, and why?
