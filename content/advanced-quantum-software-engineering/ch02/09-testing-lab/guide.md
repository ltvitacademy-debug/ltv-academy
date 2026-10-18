# Testing Lab

Hands-on lab: build a complete, tiered test suite for a small quantum function — construction tests, a statevector check, and a statistical test — and organize them the way a real CI pipeline would run them.

## What you'll learn

- How to structure a `tests/` directory mixing fast construction tests and slower statistical tests
- How to use `pytest` markers to tier tests by speed/cost, so CI can run the cheap ones on every push
- Writing a complete test file for a non-trivial circuit: a 3-qubit GHZ state
- Interpreting a full pytest run's output, including a deliberately-introduced failing case
- A checklist for reviewing whether a quantum test suite is actually complete

## The circuit under test

This lab builds a full test suite for a 3-qubit GHZ-state function, combining every technique from this chapter:

```python
# src/my_lib/circuits/ghz.py
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

## Tiering tests with pytest markers

Register custom markers in `pyproject.toml` so fast and slow tests can be selected separately:

```toml
[tool.pytest.ini_options]
markers = [
    "construction: fast, deterministic, no backend needed",
    "statistical: requires running shots on a simulator or backend",
]
```

```bash
pytest -m construction        # runs on every push, sub-second
pytest -m statistical          # runs on merge to main / nightly
```

## The full test file

```python
# tests/test_ghz.py
import math
import pytest
from qiskit.quantum_info import Statevector
from qiskit_aer import AerSimulator
from my_lib.circuits.ghz import build_ghz_circuit

# --- Construction tests (Lesson 6) ---

@pytest.mark.construction
@pytest.mark.parametrize("n_qubits", [2, 3, 5, 8])
def test_ghz_gate_sequence(n_qubits):
    qc = build_ghz_circuit(n_qubits)
    gate_names = [instr.operation.name for instr in qc.data if instr.operation.name != "measure"]
    assert gate_names[0] == "h"
    assert gate_names[1:].count("cx") == n_qubits - 1

@pytest.mark.construction
def test_ghz_rejects_single_qubit():
    with pytest.raises(ValueError):
        build_ghz_circuit(1)

# --- Statevector check (Lesson 8 debugging technique, used proactively) ---

@pytest.mark.construction
def test_ghz_statevector_is_exact():
    qc = build_ghz_circuit(3)
    qc_no_measure = qc.remove_final_measurements(inplace=False)
    sv = Statevector.from_instruction(qc_no_measure)
    probs = sv.probabilities_dict()
    assert set(probs.keys()) == {"000", "111"}
    assert abs(probs["000"] - 0.5) < 1e-9
    assert abs(probs["111"] - 0.5) < 1e-9

# --- Statistical test (Lesson 7) ---

@pytest.mark.statistical
def test_ghz_measurement_distribution():
    qc = build_ghz_circuit(3)
    sim = AerSimulator(seed_simulator=42)
    shots = 1024
    result = sim.run(qc, shots=shots).result()
    counts = result.get_counts()

    assert set(counts.keys()) <= {"000", "111"}, "GHZ state produced an impossible outcome"

    k = counts.get("000", 0)
    p0, n = 0.5, shots
    se = math.sqrt(p0 * (1 - p0) / n)
    z = (k / n - p0) / se
    assert abs(z) < 2.58, f"z={z:.3f} exceeds 99% confidence threshold for 000/111 split"
```

Notice the ordering mirrors Lesson 8's debugging priority: construction tests and the statevector check run first and fastest, and are the ones most likely to catch a real logic bug; the statistical test runs last and is the one that can occasionally fail by chance even on correct code (Lesson 5), which is why it carries an explicit, documented confidence threshold rather than an exact assertion.

## A deliberately broken case, to practice the debugging order

Suppose someone edits the loop to `qc.cx(i, 0)` (swapping control and target) for `i in range(1, n_qubits)`. Run `pytest -m construction` first: `test_ghz_gate_sequence` still passes (it only counts gate names, not which qubit is control), but `test_ghz_statevector_is_exact` fails immediately, because the resulting entangled state is structurally different. This is exactly the Lesson 8 debugging order in action — the statevector check catches the logic bug before you'd ever need to run a single shot.

## Test-suite completeness checklist

Before considering a quantum function's test coverage "done," confirm:

- [ ] Construction tests cover gate sequence, qubit count, and parameter wiring, parametrized across multiple sizes
- [ ] Edge cases (invalid input, minimum size) have explicit tests
- [ ] A statevector test exists to catch logic bugs with zero sampling noise
- [ ] A statistical test exists with an explicit, documented confidence level and shot count
- [ ] Tests are marked/tiered so CI can run the fast ones on every push
- [ ] A fixed simulator/transpiler seed is used anywhere randomness could otherwise make a test flaky (Lesson 6)

## Key terms

| Term | Meaning |
|---|---|
| Pytest marker | A label (e.g. `@pytest.mark.statistical`) used to categorize tests so a subset can be selected for a given CI stage |
| `seed_simulator` | A fixed seed controlling a simulator's internal randomness, used so a statistical test's specific numeric result is reproducible for debugging |
| Test tiering | Organizing tests by cost/speed so fast, deterministic tests run on every commit and slower, statistical tests run less frequently |
| Test-suite completeness | Having coverage across construction, statevector, and statistical layers, not just one of the three |

## Check yourself

In the deliberately broken `cx(i, 0)` example, explain in your own words why `test_ghz_gate_sequence` passes even though the circuit is logically wrong, and why that's not a flaw in that specific test but a reason the suite needs the statevector test too.
