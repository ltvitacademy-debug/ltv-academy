# Separating Circuit Logic From Execution Backend

A function that builds a circuit and a function that runs it are two different responsibilities with two different reasons to change. Keeping them separate is the single architectural decision that makes everything else in this chapter — backend abstraction, multi-SDK support, testability — possible.

## What you'll learn

- Why mixing circuit construction and execution in one function creates hidden coupling
- The dependency-injection pattern applied to quantum backends
- How to refactor a "does everything" function into construction + execution + analysis
- Why this separation is what makes Lesson 6's construction tests possible at all
- A before/after refactor of a real function

## The coupling problem, concretely

Here's a common pattern in quantum tutorials and, unfortunately, in a lot of real research code:

```python
def run_bell_experiment():
    from qiskit_aer import AerSimulator
    qc = QuantumCircuit(2)
    qc.h(0)
    qc.cx(0, 1)
    qc.measure_all()
    sim = AerSimulator()
    result = sim.run(qc, shots=1024).result()
    counts = result.get_counts()
    print(counts)
    return counts
```

This function has three responsibilities glued together: it builds the circuit, it decides which backend to run on, and it decides how many shots to use — and it does all three with no way to change any of them independently. Three concrete costs follow directly from this:

- **You cannot unit-test the circuit construction** without actually instantiating `AerSimulator` and running it, because the two are in the same function. There's no way to write a fast, deterministic construction test (Lesson 6) against this code as written.
- **You cannot run this on a different backend** — a different simulator, or real IBM hardware — without editing this function's source code every time.
- **You cannot reuse the circuit-building logic** in a different context (e.g. a batch experiment that builds many Bell pairs and runs them together) without copy-pasting the circuit-construction lines out.

## The fix: inject the backend, don't import it

Dependency injection means the function receives the thing it depends on (the backend) as a parameter, rather than reaching out and constructing it internally:

```python
from qiskit import QuantumCircuit
from qiskit.providers import BackendV2

def build_bell_pair() -> QuantumCircuit:
    """Pure circuit construction. No backend, no execution, no I/O."""
    qc = QuantumCircuit(2)
    qc.h(0)
    qc.cx(0, 1)
    qc.measure_all()
    return qc

def run_circuit(circuit: QuantumCircuit, backend: BackendV2, shots: int = 1024) -> dict:
    """Pure execution. Takes a circuit and a backend; knows nothing about what the circuit is for."""
    result = backend.run(circuit, shots=shots).result()
    return result.get_counts()
```

Now the caller decides the backend:

```python
from qiskit_aer import AerSimulator

qc = build_bell_pair()
counts = run_circuit(qc, backend=AerSimulator(), shots=1024)
```

And a test can exercise `build_bell_pair()` alone, with zero backend involvement:

```python
def test_bell_pair_structure():
    qc = build_bell_pair()
    gate_names = [instr.operation.name for instr in qc.data]
    assert gate_names == ["h", "cx", "measure", "measure"]
```

## Why this unlocks everything else in this chapter

This separation is a prerequisite, not just a nice-to-have, for three things covered later in this chapter and course:

- **The backend-abstraction pattern (Lesson 11)** formalizes `backend` into a shared interface so swapping a simulator for real hardware, or for a different SDK entirely, requires changing one argument, not rewriting circuit code.
- **Multi-SDK support (Lesson 12)** is only tractable if circuit-construction code for one SDK doesn't assume a specific execution path — the same `build_bell_pair()`-style function should be callable regardless of which backend eventually runs it.
- **CI test speed (Lesson 9's lab)** depends on construction tests never touching a backend; that's only possible if construction and execution are different functions in the first place.

## A refactoring checklist

When you encounter a function mixing construction and execution, split it using this checklist:

1. Extract every line that builds the circuit (gate calls, parameter binding) into its own function returning a `QuantumCircuit`.
2. Extract every line that executes the circuit (`backend.run()`, result parsing) into a separate function taking the circuit and backend as parameters.
3. Make the backend a parameter with no default pointing at a specific real backend — a default of `None` requiring the caller to supply one is safer than silently defaulting to, say, real hardware.
4. Write a construction test against the first function alone, with no backend import anywhere in that test file.

## Key terms

| Term | Meaning |
|---|---|
| Dependency injection | Passing a dependency (like a backend) into a function as a parameter, rather than having the function construct or import it internally |
| Coupling | The degree to which two pieces of code are tangled together such that changing one requires changing the other |
| Pure circuit-construction function | A function that builds and returns a `QuantumCircuit` with no execution, I/O, or backend dependency inside it |
| Separation of concerns | Keeping distinct responsibilities (construction, execution, analysis) in distinct functions or modules (introduced in Lesson 2, applied architecturally here) |

## Check yourself

A function `def measure_entanglement(n_qubits, shots=2048): ...` builds a GHZ circuit, runs it on `AerSimulator()`, and returns a computed correlation statistic. Using this lesson's refactoring checklist, describe the three functions you'd split this into and what each one would take as parameters.
