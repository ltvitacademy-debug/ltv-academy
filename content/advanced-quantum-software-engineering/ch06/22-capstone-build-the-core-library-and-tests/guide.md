# Capstone: Build the Core Library & Tests

This lesson writes the actual code for `quantumlib`'s three modules against the requirements from Lesson 21, applying the architecture pattern from Chapter 3 and the testing discipline from Chapter 2 together, for real, on all three algorithms at once.

## What you'll learn

- Implementing all three capstone modules (Bell/GHZ, Grover, QAOA) following the backend-abstraction pattern
- Writing the matching tiered test suite (construction, statevector, statistical) for each module
- Implementing the resource-estimation functions from Lesson 19 as real, tested code rather than one-off scratch calculations
- Verifying the Grover iteration-count formula is implemented correctly against the known value from Lesson 19
- How this lesson's output satisfies Lesson 21's requirements document line by line

## Bell/GHZ module

```python
# src/quantumlib/circuits/bell_ghz.py
from qiskit import QuantumCircuit

def build_ghz_circuit(n_qubits: int) -> QuantumCircuit:
    if n_qubits < 2:
        raise ValueError("GHZ state requires at least 2 qubits")
    qc = QuantumCircuit(n_qubits)
    qc.h(0)
    for i in range(1, n_qubits):
        qc.cx(0, i)
    qc.measure_all()
    return qc
```

```python
# tests/test_bell_ghz.py
import math, pytest
from qiskit.quantum_info import Statevector
from quantumlib.circuits.bell_ghz import build_ghz_circuit
from quantumlib.backends.simulator import LocalSimulatorBackend

@pytest.mark.construction
@pytest.mark.parametrize("n", [2, 3, 5, 6])
def test_ghz_structure(n):
    qc = build_ghz_circuit(n)
    gates = [i.operation.name for i in qc.data if i.operation.name != "measure"]
    assert gates[0] == "h" and gates[1:].count("cx") == n - 1

@pytest.mark.construction
def test_ghz_statevector_exact():
    qc = build_ghz_circuit(3).remove_final_measurements(inplace=False)
    probs = Statevector.from_instruction(qc).probabilities_dict()
    assert set(probs.keys()) == {"000", "111"}

@pytest.mark.statistical
def test_ghz_measurement_distribution():
    counts = LocalSimulatorBackend(seed=42).run(build_ghz_circuit(3), shots=1024)
    k, n, p0 = counts.get("000", 0), 1024, 0.5
    z = (k / n - p0) / math.sqrt(p0 * (1 - p0) / n)
    assert abs(z) < 2.58
```

## Grover's search module, with a tested resource-estimation function

```python
# src/quantumlib/estimation/resource.py
import math

def grover_iteration_count(n_items: int) -> int:
    """Approximate optimal Grover iterations for n_items marked-item search space."""
    return round((math.pi / 4) * math.sqrt(n_items))
```

```python
# tests/test_estimation.py
from quantumlib.estimation.resource import grover_iteration_count

def test_grover_iteration_count_matches_known_value():
    # Verified in Lesson 19: (pi/4)*sqrt(1024) = 25.1327..., rounds to 25
    assert grover_iteration_count(1024) == 25
```

This test is not a throwaway sanity check — it's the exact numeric claim from Lesson 19, now locked into the test suite so a future refactor of `grover_iteration_count` can't silently drift from the verified value.

## QAOA module, with backend injected and a shot-budget estimator

```python
# src/quantumlib/circuits/qaoa.py
from qiskit import QuantumCircuit
from qiskit.circuit import Parameter

def build_qaoa_layer(n_qubits: int, gamma: Parameter, beta: Parameter) -> QuantumCircuit:
    qc = QuantumCircuit(n_qubits)
    for i in range(n_qubits - 1):
        qc.rzz(gamma, i, i + 1)
    for i in range(n_qubits):
        qc.rx(beta, i)
    return qc

def run_qaoa_layer(circuit, backend, shots: int) -> dict:  # Lesson 11's injected backend
    return backend.run(circuit, shots=shots)
```

```python
# src/quantumlib/estimation/resource.py (continued)
def qaoa_shot_budget(n_layers: int, n_iterations: int, shots_per_eval: int) -> int:
    """Total shots for a full parameter-shift-rule training run."""
    params = 2 * n_layers
    evals_per_gradient = params * 2
    return evals_per_gradient * n_iterations * shots_per_eval
```

```python
def test_qaoa_shot_budget_matches_lesson_19_example():
    # Verified in Lesson 19: p=3, 100 iterations, 2000 shots/eval -> 2,400,000
    assert qaoa_shot_budget(n_layers=3, n_iterations=100, shots_per_eval=2000) == 2_400_000
```

## Satisfying Lesson 21's requirements, line by line

Each module above maps directly onto a Lesson 21 requirement: construction tests parametrized across sizes (satisfied for Bell/GHZ), a statevector check (satisfied), a statistical test with documented confidence level (satisfied, `2.58` for 99%), a tested resource-estimation function matching the exact verified formula (satisfied for both Grover and QAOA), and backend injection via the shared interface rather than a hardcoded import (satisfied — `run_qaoa_layer` takes `backend` as a parameter, never imports a concrete backend class).

## Key terms

| Term | Meaning |
|---|---|
| Resource-estimation function | A tested, reusable function (like `grover_iteration_count`) implementing a resource formula, rather than a one-off manual calculation |
| Regression-locked value | A specific verified numeric result (like 25 iterations for N=1024) encoded directly into a test, so future code changes can't silently drift from it |

## Check yourself

The capstone's `qaoa_shot_budget` function doesn't account for the classical optimizer's own internal randomness (a separate seed, per Lesson 16). Is this a gap in the current implementation relative to Lesson 21's stated requirements, or out of scope for this specific function? Justify your answer by referring to what the function is actually meant to estimate.
