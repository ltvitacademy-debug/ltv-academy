# What Qiskit Actually Is

Qiskit is IBM's open-source Python SDK for building, simulating, and eventually running quantum circuits — it is not a quantum computer, and it doesn't pretend to be one. Before you install anything, it's worth being precise about what the tool in front of you actually does.

## What you'll learn

- What Qiskit is (a circuit-construction, compilation, and execution framework) and what it is not (a quantum computer itself)
- The current package split: `qiskit`, `qiskit-aer`, `qiskit-ibm-runtime`, and community packages like `qiskit-algorithms`
- Why that split exists — what moved out of the core package as of Qiskit 1.0/2.0
- The standard workflow: write a circuit, simulate it locally, then run it on real hardware
- How to read a two-line circuit as your first concrete touchpoint with the API

## Qiskit as a framework, not a computer

A quantum computer is a physical device — supercooled superconducting loops, trapped ions, or some other hardware that can hold and manipulate qubits. Qiskit is software that runs on an ordinary laptop or cloud machine and does three distinct jobs around that hardware:

1. **Circuit construction** — a Python API for describing a sequence of quantum gates applied to qubits, in the same spirit as writing a program in any other SDK.
2. **Compilation (transpilation)** — rewriting that abstract circuit into the specific gate set, qubit connectivity, and timing constraints of a target backend, whether that backend is a simulator or a real chip.
3. **Execution and results** — submitting the compiled circuit to a backend, waiting for it to run, and giving you back the measurement data.

None of this requires a quantum computer to be useful. You can write, compile, and test circuits entirely on your own machine using a classical simulator, and only reach for real hardware once a circuit is actually ready for it.

## The package split: what lives where

Earlier Qiskit releases bundled almost everything — circuit building, simulators, and higher-level algorithm libraries — into one large `qiskit` package. As of Qiskit 1.0 and the subsequent 2.0 line, the project split into focused pieces, and that split is the shape you'll actually install and import from today:

- **`qiskit`** — the core package. `QuantumCircuit`, gate definitions, `transpile`, and the rest of the circuit-building and compilation machinery live here. This is the only piece required to construct and reason about a circuit.
- **`qiskit-aer`** — the local, high-performance simulator package (`AerSimulator`). This is what you use to run circuits on your own machine without touching any cloud service.
- **`qiskit-ibm-runtime`** — the client library for talking to IBM's cloud quantum hardware and its managed execution primitives. You only need this when you're ready to run on a real device (covered in depth in Chapter 5).
- **Community/algorithm packages** (e.g. `qiskit-algorithms`) — building blocks for specific algorithms (optimization, chemistry, machine learning routines) that used to live inside `qiskit.algorithms` and were moved out to their own standalone, independently versioned packages.

If you read older tutorials or Stack Overflow answers that import something like `qiskit.algorithms`, treat that as a sign the content predates the 1.0/2.0 reorganization — the functionality likely still exists, just in a separate package now.

## The standard workflow

Nearly everything in this course follows the same three-step loop:

1. **Write a circuit** using `qiskit`'s `QuantumCircuit` API.
2. **Simulate it locally** with `qiskit-aer` to check that it does what you expect, debug mistakes, and iterate quickly and for free.
3. **Run it on real hardware** through `qiskit-ibm-runtime` once you're confident the circuit is correct and you actually need a real device's results (not just a conceptual check).

Here's the smallest possible first touchpoint with the API — a single-qubit circuit with no gates applied yet:

```python
from qiskit import QuantumCircuit

qc = QuantumCircuit(1)
```

`QuantumCircuit(1)` allocates one qubit and gives you an empty circuit object you can start adding gates to. There's no simulation or execution happening here yet — this line alone just describes a circuit, which is the first job Qiskit does. The next lessons build this out into something you can actually install, configure, and run.

## Key terms

| Term | Meaning |
|---|---|
| Qiskit | IBM's open-source Python SDK for constructing, compiling, and executing quantum circuits — not a quantum computer itself |
| `qiskit` (core package) | Provides `QuantumCircuit`, gates, and `transpile` — the circuit-building and compilation layer |
| `qiskit-aer` | The local simulator package, built around `AerSimulator`, for running circuits without cloud hardware |
| `qiskit-ibm-runtime` | The client library for submitting circuits to IBM's real quantum hardware over the cloud |
| Transpilation | Rewriting an abstract circuit into the specific gate set and layout a target backend supports |

## Check yourself

If someone tells you "I ran my circuit in Qiskit and got the wrong answer, so the quantum computer must be broken," what two things would you want to check first, given that Qiskit is a software framework with both a local simulator and a real-hardware path?
