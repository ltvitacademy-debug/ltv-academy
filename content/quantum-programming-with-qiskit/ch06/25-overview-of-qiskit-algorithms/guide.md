# Overview of Qiskit Algorithms

Every circuit you've built so far — superposition, entanglement, measurement, running on a simulator or real hardware — has been a building block. This chapter shows you where those blocks go when you assemble them into named, well-known quantum algorithms, and the first thing you need to know is that the library providing them is not where older tutorials say it is.

## What you'll learn

- Why `qiskit-algorithms` is a separate, installable package from core `qiskit`, and what changed in Qiskit 1.0+
- The four families of algorithm this chapter covers: amplitude amplification (Grover), the Quantum Fourier Transform, variational algorithms (VQE/QAOA), and amplitude estimation
- Why `QFT` is a core `qiskit` circuit, not a `qiskit-algorithms` algorithm
- The general pattern every algorithm in this library follows: circuits you already know, plus a primitive, plus (sometimes) a classical optimizer

## The package split: `qiskit` vs. `qiskit-algorithms`

If you've read older Qiskit tutorials, Stack Overflow answers, or textbooks, you may have seen code like `from qiskit.algorithms import VQE`. That import no longer works. As of Qiskit 1.0, the `qiskit.algorithms` module was removed from the core `qiskit` package entirely. The algorithm implementations didn't disappear — they moved into a separate, still-actively-maintained community package called `qiskit-algorithms`, which you install on its own:

```bash
pip install qiskit-algorithms
```

```python
from qiskit_algorithms import Grover, AmplificationProblem, VQE
from qiskit_algorithms.optimizers import COBYLA
```

Why the split? Core `qiskit` is deliberately kept lean: it's the circuit-building and transpilation layer that every Qiskit user needs, regardless of whether they ever run a named algorithm. `qiskit-algorithms` is maintained separately so algorithm research and implementations can move at their own pace without churning the stable core API. This means that when you see `qiskit.algorithms.Grover` in anything you read online, you're looking at pre-1.0 code — the current, correct import is `from qiskit_algorithms import Grover`.

## What `qiskit-algorithms` actually provides

This chapter covers four things you'll find in the library:

- **Amplitude amplification and search** — `Grover` and `AmplificationProblem`, which generalize Grover's algorithm to amplify the probability of measuring a "marked" outcome in an unsorted search space (Lesson 26).
- **Variational algorithms** — `VQE` (Variational Quantum Eigensolver) and `QAOA` (Quantum Approximate Optimization Algorithm), which pair a parameterized circuit with a classical optimizer in a hybrid loop (Lesson 28).
- **Amplitude estimation** — algorithms like `IterativeAmplitudeEstimation` that estimate an unknown probability more efficiently than classical sampling, building on the same amplification mechanics as Grover.

Notably absent from that list: the Quantum Fourier Transform.

## The exception: `QFT` lives in core `qiskit`

It's tempting to assume every named quantum algorithm lives in `qiskit-algorithms`, but the QFT is a circuit, not a search or optimization routine — so it ships as part of core `qiskit`'s circuit library:

```python
from qiskit.circuit.library import QFT

qft_circuit = QFT(num_qubits=3)
```

This matters because the QFT isn't really "an algorithm" in the same sense as Grover or VQE — it's a reusable circuit building block that other algorithms (most famously Shor's algorithm and quantum phase estimation) call as a subroutine. Lesson 27 covers it in depth.

## The pattern underneath every algorithm here

It's easy to look at names like "Grover's algorithm" or "VQE" and assume they're a separate magic system bolted onto Qiskit. They aren't. Every algorithm in `qiskit-algorithms` is built from exactly the same pieces you already know:

1. **Circuits you build with `QuantumCircuit`** — gates, entanglement, measurement, exactly as in Chapters 1–4.
2. **A primitive for execution** — `Sampler` (for algorithms that need measurement outcome probabilities, like Grover) or `Estimator` (for algorithms that need an expectation value of some operator, like VQE), from `qiskit.primitives` or `qiskit_aer.primitives` for simulation.
3. **Sometimes, a classical optimizer** — only for variational algorithms, which iterate between quantum circuit evaluation and classical parameter updates.

Grover's algorithm, stripped down, is a circuit with an oracle and a diffuser run through a `Sampler`. VQE is a parameterized circuit run through an `Estimator`, wrapped in a classical optimization loop. Nothing in this chapter requires new quantum mechanics beyond what you already have — it requires combining familiar pieces in a specific, well-studied way.

## Key terms

| Term | Meaning |
|---|---|
| `qiskit-algorithms` | A separate, pip-installable package providing Grover, VQE, QAOA, amplitude estimation, and related algorithm implementations; not part of core `qiskit` since version 1.0 |
| `QFT` | The Quantum Fourier Transform circuit, provided by core `qiskit.circuit.library` (not `qiskit-algorithms`) |
| Amplitude amplification | The family of techniques, including Grover's algorithm, that boost the measurement probability of a marked outcome |
| Variational algorithm | An algorithm (VQE, QAOA) that pairs a parameterized circuit with a classical optimizer in a hybrid quantum-classical loop |
| `Sampler` / `Estimator` | The core `qiskit` primitives used to execute circuits within an algorithm — `Sampler` for outcome probabilities, `Estimator` for expectation values |

## Check yourself

A colleague shows you a code snippet with `from qiskit.algorithms import QFT` and says it's from a tutorial they found. Name two things wrong with that import, and what the corrected versions would be.
