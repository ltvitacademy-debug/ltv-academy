# Capstone: Build Documentation & Examples

Code that passes tests is necessary but not sufficient for a library someone else can actually use. This lesson writes `quantumlib`'s documentation — docstrings following Lesson 4's standard, a README, and a worked example notebook — closing the gap Lesson 21 deliberately deferred from the requirements document.

## What you'll learn

- Writing complete docstrings for all three capstone modules following Lesson 4's quantum-specific template
- Writing a README that documents validated backends and pinned SDK versions, not just installation steps
- Building a worked example script that a new user could run end to end
- Documenting the capstone's own reproducibility setup (tags, lockfile, experiment records) as a model for users of the library
- A documentation completeness review against Lesson 4's standard

## Docstrings following Lesson 4's template

```python
def build_ghz_circuit(n_qubits: int) -> QuantumCircuit:
    """Builds an n-qubit GHZ state circuit.

    Circuit: H(0), then CX(0, i) for i in 1..n_qubits-1.

    Args:
        n_qubits: Number of qubits (must be >= 2).

    Qubit roles:
        Qubit 0 is the control for every CX; qubits 1..n_qubits-1 are targets.
        All qubits are symmetric in the final GHZ state.

    Expected measurement distribution:
        Ideally, only '0'*n_qubits and '1'*n_qubits appear, each ~50%.
        See tests/test_bell_ghz.py::test_ghz_measurement_distribution
        (z-test, 99% confidence).

    Validated against:
        qiskit 1.2.4, qiskit-aer 0.15.1 (LocalSimulatorBackend).
        Not yet validated against real hardware -- see docs/roadmap.md.
    """
```

Note the honest "Not yet validated against real hardware" line — Lesson 4 argued documentation should state what's actually been checked, and overstating validation coverage here would be exactly the kind of undocumented claim that lesson warned against.

## README: more than installation steps

```markdown
# quantumlib

A small, test-first quantum software library implementing Bell/GHZ state
preparation, Grover's search, and QAOA, built to demonstrate production
software-engineering discipline applied to quantum code.

## Targeted SDKs
- qiskit==1.2.4, qiskit-aer==0.15.1 (see pyproject.toml / uv.lock for the
  full pinned, lockfile-captured environment)

## Validated against
- qiskit-aer LocalSimulatorBackend: all three modules, full test suite
- Real IBM hardware: not yet validated (tracked in docs/roadmap.md)

## Running the tests
    pytest -m construction   # fast, every commit
    pytest -m statistical    # slower, pre-merge

## Reproducing a specific reported result
Every reported result in docs/results.md has a git tag (e.g.
`exp-ghz-5q-...`) and a committed experiment record under results/.
See docs/reproducibility.md for the exact steps.
```

## A worked example script

```python
# examples/run_ghz_demo.py
"""End-to-end example: build, run, and statistically validate a GHZ state.

Run with: python examples/run_ghz_demo.py
"""
from quantumlib.circuits.bell_ghz import build_ghz_circuit
from quantumlib.backends.simulator import LocalSimulatorBackend
import math

def main():
    qc = build_ghz_circuit(n_qubits=3)
    backend = LocalSimulatorBackend(seed=42)
    shots = 1024
    counts = backend.run(qc, shots=shots)

    print(f"Counts: {counts}")
    k = counts.get("000", 0)
    z = (k / shots - 0.5) / math.sqrt(0.5 * 0.5 / shots)
    print(f"z-score vs expected 50/50 split: {z:.3f}")
    print("PASS" if abs(z) < 2.58 else "FAIL", "(99% confidence)")

if __name__ == "__main__":
    main()
```

This script deliberately prints the z-score and the explicit confidence threshold used, rather than just "PASS/FAIL" — a new user reading the output learns not just the verdict but the standard it was judged against, consistent with every statistical test built across Chapter 2.

## Documenting the capstone's own reproducibility setup

As a model for users of the library, `docs/reproducibility.md` should walk through exactly what Lesson 17's reproducibility lab demonstrated: tag an experiment, commit the lockfile, save an experiment record, and show the fire-drill reproduction steps — so anyone extending `quantumlib` with their own experiments has a template to follow rather than reinventing the practice from scratch.

## Documentation completeness review

- [ ] Every public function has a docstring with Circuit/Qubit roles/Expected distribution/Validated against (Lesson 4)
- [ ] README states targeted SDK versions and actual validated backends, including honest gaps
- [ ] At least one runnable, end-to-end example script exists per module
- [ ] A reproducibility walkthrough exists, modeling Lessons 14-17's practices for library users

## Key terms

| Term | Meaning |
|---|---|
| Honest validation documentation | Explicitly stating what has and hasn't been checked (e.g. "not yet validated on real hardware"), rather than implying broader coverage than actually exists |
| Worked example script | A small, runnable, end-to-end script demonstrating a library's intended usage pattern for a new user |
| Reproducibility walkthrough | Documentation modeling how to tag, lock, and record an experiment, serving as a template for a library's future users |

## Check yourself

The README's "Validated against" section states real IBM hardware validation hasn't happened yet. A user wants to run `quantumlib`'s Grover module on real hardware anyway. Based on this lesson and Chapter 4, what's the minimum they'd need to add (not already provided by the library) to report a trustworthy, reproducible result from that run?
