# Interoperability Lab

This lab puts the whole chapter together: write a Q# operation, call it many times from Python, aggregate the results, and compare the empirical distribution against a theoretical one you compute independently — exactly the workflow a real mixed-language project uses to validate that code is doing what it's supposed to.

## What you'll learn

- How to write and call a 3-qubit entangling operation across the Q#/Python boundary
- How to aggregate multi-qubit measurement results in Python
- A verified theoretical distribution to check an empirical run against
- Why comparing empirical results to independently-verified theory (not just "it ran without errors") is the actual test of correctness

## The operation: a GHZ state

A GHZ state extends the 2-qubit Bell state to three qubits — maximal entanglement across all three, prepared with one Hadamard and two CNOTs:

```qsharp
operation PrepareGHZ() : (Result, Result, Result) {
    use (q0, q1, q2) = (Qubit(), Qubit(), Qubit());
    H(q0);
    CNOT(q0, q1);
    CNOT(q0, q2);
    return (M(q0), M(q1), M(q2));
}
```

## Calling it many times from Python

```python
import qsharp
from collections import Counter

results = qsharp.run("PrepareGHZ()", shots=1000)
counts = Counter(results)
print(counts)
```

Each element of `results` is a tuple of three `Result` values — Python's `Counter` tallies them exactly as it would tally any other hashable value, with no quantum-specific aggregation logic needed on the Python side.

## The verified theoretical distribution to check against

Before looking at the empirical output, it's worth computing what you *should* see. Building the 3-qubit state explicitly (an 8-dimensional state vector) and applying `H` on the first qubit followed by `CNOT(q0,q1)` and `CNOT(q0,q2)` via matrix computation gives a state with nonzero amplitude on exactly two of the eight possible outcomes: `|000⟩` and `|111⟩`, each with amplitude `1/√2`, and therefore probability exactly `0.5` each. Every other one of the eight possible 3-bit outcomes — `001`, `010`, `011`, `100`, `101`, `110` — has probability exactly **0**.

## Comparing empirical results to theory

A correct real run over 1000 shots should show counts clustering near 500 for `('Zero','Zero','Zero')`, near 500 for `('One','One','One')`, and **zero** occurrences of any of the other six possible tuples — not approximately zero, but exactly zero, since those outcomes have no amplitude at all in the theoretical state. If a run showed even a handful of, say, `('Zero','One','Zero')` outcomes, that would be a real signal to investigate — on an ideal simulator, those outcomes aren't just unlikely, they're impossible given this exact circuit, so their appearance would point to either a bug in `PrepareGHZ` (the CNOTs not wired to the qubits you think they are) or noise if this were run on real hardware instead of a simulator.

## Why this comparison is the actual test

Running the lab and seeing *some* output that "looks reasonable" is a weak check — most wrong circuits still produce output that looks plausible at a glance. Running the lab and checking the empirical counts against a distribution you derived independently, gate by gate, is a real correctness test: it catches the specific, falsifiable claim "only `000` and `111` are possible," not just "the code executed without throwing an error."

## Key terms

| Term | Meaning |
|---|---|
| GHZ state | A maximally entangled 3-qubit state, `(|000⟩+|111⟩)/√2`, extending the 2-qubit Bell state |
| `qsharp.run(shots=N)` | Runs an operation N times, returning a Python list of result tuples |
| Impossible outcome | A measurement outcome with exactly zero theoretical amplitude, as opposed to merely unlikely |
| Empirical-vs-theoretical check | Comparing observed shot counts against an independently derived theoretical distribution, the real test of circuit correctness |

## Check yourself

If a 1000-shot run of `PrepareGHZ()` on a real (noisy) hardware target showed a small number of outcomes like `('Zero','One','Zero')` that the ideal theory says should be impossible, what would that tell you, and how would it differ from the same outcomes appearing on a noiseless simulator run?
