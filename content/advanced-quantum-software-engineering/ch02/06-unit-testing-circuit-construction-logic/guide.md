# Unit-Testing Circuit-Construction Logic

Before a circuit ever touches a backend, you can verify a great deal about it: qubit count, gate sequence, parameter wiring, and decomposition structure. These checks are ordinary deterministic unit tests, and they should make up the majority of a quantum test suite — they're fast, they never flake, and they catch the most common class of real bugs.

## What you'll learn

- How to inspect a Qiskit `QuantumCircuit` object's internal structure without running it
- Patterns for testing parameterized circuits (correct parameter binding, correct gate count per layer)
- How to test a decomposition or transpilation step deterministically
- Using `pytest.mark.parametrize` to test a circuit-building function across many inputs efficiently
- Why construction tests should run in CI on every commit, with no backend or network dependency

## Inspecting a circuit without running it

A `QuantumCircuit` object exposes its gate sequence, qubit count, and classical register structure directly — no execution required. The `circuit.data` attribute is a list of `CircuitInstruction` objects, each with a gate name, the qubits it acts on, and any parameters:

```python
from qiskit import QuantumCircuit

def build_ghz_circuit(n_qubits: int) -> QuantumCircuit:
    qc = QuantumCircuit(n_qubits)
    qc.h(0)
    for i in range(1, n_qubits):
        qc.cx(0, i)
    return qc

def test_ghz_circuit_structure():
    qc = build_ghz_circuit(4)
    assert qc.num_qubits == 4
    gate_names = [instr.operation.name for instr in qc.data]
    assert gate_names == ["h", "cx", "cx", "cx"]
    # every cx must have qubit 0 as control
    cx_controls = {instr.qubits[0]._index for instr in qc.data if instr.operation.name == "cx"}
    assert cx_controls == {0}
```

This test runs in milliseconds, needs no simulator or hardware, and will catch a real class of bugs: an off-by-one in the loop range, a `cx` applied with qubits swapped, a missing Hadamard.

## Testing parameterized circuits

A variational circuit (used in VQE, QAOA) typically takes a vector of parameters and builds a circuit with that many rotation gates. Testing that the right number of parameters are bound, and bound to the right gates, is a construction test even though the circuit's *results* would need the statistical testing from Lesson 7:

```python
from qiskit.circuit import Parameter

def build_ansatz_layer(n_qubits: int, params: list) -> QuantumCircuit:
    qc = QuantumCircuit(n_qubits)
    for i, theta in enumerate(params):
        qc.ry(theta, i)
    return qc

def test_ansatz_layer_binds_correct_parameter_count():
    params = [Parameter(f"theta_{i}") for i in range(3)]
    qc = build_ansatz_layer(3, params)
    ry_gates = [instr for instr in qc.data if instr.operation.name == "ry"]
    assert len(ry_gates) == 3
    bound_params = {instr.operation.params[0] for instr in ry_gates}
    assert bound_params == set(params)
```

## Testing decomposition and transpilation deterministically

When a circuit gets transpiled to a target backend's native gate set, the output gate count and depth are deterministic *for a fixed transpiler seed and optimization level* — which means they're testable:

```python
from qiskit import transpile
from qiskit.providers.fake_provider import FakeManilaV2

def test_bell_circuit_transpiles_within_depth_budget():
    qc = build_bell_pair()
    backend = FakeManilaV2()
    transpiled = transpile(qc, backend=backend, optimization_level=1, seed_transpiler=42)
    assert transpiled.depth() <= 6
    assert transpiled.num_qubits == backend.num_qubits
```

Note the fixed `seed_transpiler=42` — without pinning it, optimization level 1+ can use randomized heuristics for qubit layout, making depth vary between otherwise-identical runs. Pinning the seed here is the same reproducibility principle Chapter 4 covers for whole experiments, applied to a single test.

## Parametrizing tests across many inputs

`pytest.mark.parametrize` lets one test function cover many circuit sizes without duplicating code — valuable for construction tests because a bug like an off-by-one often only appears at specific sizes:

```python
import pytest

@pytest.mark.parametrize("n_qubits", [2, 3, 5, 8])
def test_ghz_circuit_structure_across_sizes(n_qubits):
    qc = build_ghz_circuit(n_qubits)
    assert qc.num_qubits == n_qubits
    cx_count = sum(1 for instr in qc.data if instr.operation.name == "cx")
    assert cx_count == n_qubits - 1
```

## Why these belong in every CI run

Construction tests have no backend dependency, no network call, and no randomness (once seeds are pinned), which means they should run on every single commit in CI, typically in well under a second for a whole suite. Statistical tests (Lesson 7) are slower and need a shot budget, so many teams run construction tests on every push and reserve statistical tests for merges to a main branch or a nightly job — a tiering decision Lesson 9's lab puts into practice.

## Key terms

| Term | Meaning |
|---|---|
| `circuit.data` | The list of gate instructions making up a `QuantumCircuit`, inspectable without execution |
| Parametrized test | A single test function run against multiple input cases via `pytest.mark.parametrize`, avoiding duplicated test code |
| `seed_transpiler` | A fixed seed controlling randomized heuristics (like qubit layout) in Qiskit's transpiler, needed to make transpiled output deterministic for testing |
| Circuit depth | The number of sequential gate "layers" in a circuit along its longest path; a common construction-test target when testing transpilation output |

## Check yourself

Write (in words, not full code) a construction test for a function `build_qft_circuit(n_qubits)` that should contain exactly one Hadamard gate per qubit plus a specific pattern of controlled-phase gates. What would you assert, and why would none of those assertions require actually running the circuit?
