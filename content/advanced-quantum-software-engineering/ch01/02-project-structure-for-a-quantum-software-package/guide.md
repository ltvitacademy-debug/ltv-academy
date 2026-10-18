# Project Structure for a Quantum Software Package

Most quantum tutorials live in a single flat script. A real quantum package needs the same kind of structure as any Python library — plus a few quantum-specific additions, like a place to keep noise models and backend configs separate from circuit logic.

## What you'll learn

- A standard `src/`-layout package structure adapted for quantum code
- Why circuit-construction code, execution code, and analysis code belong in separate modules
- Where to put backend configuration, noise models, and calibration data so they don't get hardcoded into circuits
- How `pyproject.toml` replaces the old `setup.py` for a modern installable quantum package
- A worked example layout for a small Grover's-search package

## A baseline layout

A quantum package should follow the same `src/`-layout convention recommended for any modern Python package, with quantum-specific subpackages added underneath:

```
grover-toolkit/
├── pyproject.toml
├── README.md
├── src/
│   └── grover_toolkit/
│       ├── __init__.py
│       ├── circuits/
│       │   ├── __init__.py
│       │   ├── oracle.py          # pure circuit-construction logic
│       │   └── diffuser.py
│       ├── backends/
│       │   ├── __init__.py
│       │   ├── base.py            # abstract backend interface (Chapter 3)
│       │   ├── simulator.py
│       │   └── ibm_hardware.py
│       ├── analysis/
│       │   ├── __init__.py
│       │   └── statistics.py      # counts -> statistical verdict (Chapter 2)
│       └── config/
│           ├── default_shots.yaml
│           └── noise_models/
│               └── fake_manila.json
└── tests/
    ├── test_oracle.py
    ├── test_diffuser.py
    ├── test_statistics.py
    └── test_integration.py
```

The names matter less than the separation of concerns: **circuit construction**, **execution/backend**, and **result analysis** are three different responsibilities, and mixing them in one module is the single most common structural mistake in quantum codebases.

## Why circuits, backends, and analysis need separate modules

In a typical tutorial script, circuit-building, `.run()`, and `print(counts)` all happen in the same ten lines. That's fine for a demo. In a real package it causes three concrete problems:

- **You can't unit-test circuit logic without executing a circuit.** If `build_oracle()` and `run_and_collect_counts()` are the same function, you cannot verify the oracle has the right gate sequence without actually running it — which means every "unit test" is secretly an integration test, and a flaky backend makes your whole suite flaky.
- **You can't swap backends without touching algorithm code.** If `oracle.py` calls `IBMProvider().get_backend(...)` directly, switching to a local simulator for CI means editing the oracle file itself. Chapter 3 builds the fix: a `backends/` module with a shared interface, injected into circuit code rather than imported by it.
- **You can't reuse analysis logic across algorithms.** The statistical test that checks "is this count distribution consistent with the expected one" (Chapter 2) is the same code whether you're testing Grover's search, a Bell state, or a VQE result. It belongs in its own `analysis/` module, not copy-pasted into each algorithm's script.

## Keep configuration out of code

Noise models, default shot counts, and backend names change far more often than circuit logic does, and they differ between a laptop, CI, and production hardware runs. Put them in `config/` as YAML or JSON rather than as constants inside `.py` files:

```python
# src/grover_toolkit/backends/simulator.py
import yaml
from pathlib import Path

def load_default_shots() -> int:
    config_path = Path(__file__).parent.parent / "config" / "default_shots.yaml"
    with open(config_path) as f:
        return yaml.safe_load(f)["shots"]
```

This means a CI job can override `default_shots.yaml` to use fewer shots for speed, while a production run uses a higher-fidelity count, without anyone editing `simulator.py`.

## `pyproject.toml`, not `setup.py`

Modern Python packaging (and every current quantum SDK's own tooling) expects a `pyproject.toml`:

```toml
[project]
name = "grover-toolkit"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = [
    "qiskit==1.2.4",
    "qiskit-aer==0.15.1",
    "numpy>=1.26,<2.0",
]

[project.optional-dependencies]
test = ["pytest>=8.0", "pytest-cov>=5.0"]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

Exact-pinning the quantum SDKs (`==`, not `>=`) here is deliberate — Chapter 4 explains why quantum dependencies need tighter pinning than most classical ones.

## Key terms

| Term | Meaning |
|---|---|
| `src/` layout | A package layout where importable code lives under `src/<package_name>/`, preventing accidental imports of an uninstalled local copy during testing |
| Separation of concerns | Keeping circuit construction, backend execution, and result analysis in distinct modules so each can be tested and changed independently |
| `pyproject.toml` | The modern, standard configuration file declaring a Python package's metadata, dependencies, and build system |
| Noise model | A configuration describing simulated or real hardware error characteristics, kept as data rather than hardcoded into circuit logic |
| Backend | The simulator or real device a circuit is executed against; abstracted in `backends/` so it can be swapped without touching circuit code |

## Check yourself

A teammate's module `bell_state.py` contains a function that builds the circuit, calls `backend.run()`, and returns the parsed counts, all in one function. Explain which two of this course's structural recommendations that function violates, and rewrite its signature (not its body) to fix both.
