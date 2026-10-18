# Dependency Management for Quantum SDKs

Quantum SDKs break more often, and more silently, than most classical dependencies. A circuit that computed one answer under Qiskit 0.45 can compute a numerically different answer under Qiskit 1.2 without raising a single error. Dependency management here is not a formality — it's how you prevent that.

## What you'll learn

- Why quantum SDKs churn faster than typical classical libraries, with a concrete historical example
- The difference between a breaking change that errors loudly and one that silently changes numerical output
- How to pin exact versions with a lockfile, and why ranges (`>=`) are riskier here than in most Python projects
- How to isolate incompatible SDKs (e.g., Qiskit and a Q#/QDK toolchain) using separate environments
- A practical checklist for upgrading a quantum SDK version without breaking existing results

## Why quantum SDKs churn faster

Qiskit's transition from the 0.x series to Qiskit 1.0 (released 2024) removed `qiskit.execute()`, restructured how backends are accessed, and deprecated or renamed large parts of the transpiler API — all changes that broke working code across the ecosystem. This wasn't a one-off: Qiskit has gone through several major restructurings as the field itself has moved from "exploratory SDK" to "production-grade toolchain." Cirq, PennyLane, and Microsoft's Q#/QDK have each had comparably disruptive version transitions. Compare this to a mature classical library like NumPy, where a 1.x-to-1.y upgrade rarely breaks working code — the quantum SDK ecosystem is still young enough that this stability doesn't yet exist.

## Loud breaks vs. silent breaks

There are two categories of SDK change, and the second is far more dangerous:

- **Loud breaks**: the old API is removed, so your code raises `AttributeError` or `ImportError` immediately. Annoying, but safe — you find out the moment you run anything.
- **Silent breaks**: the API still exists and still runs, but its numerical behavior changed. For example, a transpiler optimization level's default behavior changing between versions can produce a circuit with a different gate decomposition — same logical circuit, different depth, different noise sensitivity on real hardware, and potentially different measurement statistics if a default parameter (like a random seed used internally for layout selection) also changed.

Silent breaks are the ones that pinning protects you from, because they don't trigger an error for you to notice — your test suite (Chapter 2) running against a pinned, known-good environment is what catches them, by comparing against previously recorded, reproducible results (Chapter 4).

## Pin exact versions, and commit the lockfile

For most Python projects, `numpy>=1.26` is reasonable because minor/patch updates are safe. For quantum SDKs, prefer exact pins in `pyproject.toml` and commit a full lockfile:

```toml
[project]
dependencies = [
    "qiskit==1.2.4",
    "qiskit-aer==0.15.1",
    "qiskit-ibm-runtime==0.29.0",
]
```

Generate and commit a lockfile (`uv.lock`, `poetry.lock`, or `pip-compile`'s `requirements.txt` output) so that every contributor and every CI run gets the *exact* resolved dependency tree, not just versions that satisfy the constraints:

```bash
# using uv
uv lock
git add uv.lock pyproject.toml
```

Without a committed lockfile, two developers running `pip install qiskit==1.2.4` on the same day can still get different transitive dependency versions (e.g. different `rustworkx` or `symengine` versions that Qiskit depends on internally), which can change transpiler behavior under the hood.

## Isolating incompatible SDKs

A project that needs both Qiskit and Microsoft's Q#/QDK toolchain (common in a cross-SDK comparison, covered further in Chapter 3) should not install both into one environment. Q# runs on .NET/the QDK's own Python interop layer, has its own release cadence, and the two ecosystems' dependencies are not designed to coexist cleanly. The practical fix is separate environments per SDK, invoked as subprocesses or via a thin API boundary:

```
envs/
├── qiskit-env/        # python -m venv, qiskit==1.2.4 pinned
└── qsharp-env/        # separate venv, qsharp==1.9.0 pinned
```

A backend-abstraction layer (Chapter 3) then calls into whichever environment is appropriate, rather than importing both SDKs into a single process.

## A safe upgrade checklist

Before bumping a quantum SDK's pinned version in `pyproject.toml`:

1. Read the SDK's changelog for the specific version range you're crossing — not just the latest release notes, every version in between.
2. Run the full test suite (unit tests from Chapter 2) against the new version in an isolated branch; a loud break fails here immediately.
3. Re-run your statistical tests (Chapter 2) and compare against previously recorded, pinned-environment results (Chapter 4) to catch silent breaks in numerical behavior.
4. Check whether any transpiler optimization level, default random seed, or default backend configuration changed — these are the most common sources of silent breaks.
5. Only then update the lockfile and merge.

## Key terms

| Term | Meaning |
|---|---|
| Breaking change | Any SDK update that changes behavior visibly (loud) or invisibly (silent) relative to the previous version |
| Silent break | A version change where old code still runs without error but produces different numerical results |
| Lockfile | A file recording the exact resolved versions of every dependency (direct and transitive), ensuring reproducible installs |
| Exact pin | Specifying a dependency with `==` rather than a range like `>=`, locking it to one specific version |
| Transpiler | The component that converts an abstract circuit into one expressed in a backend's native gate set; its default behavior is a common source of silent breaks across SDK versions |

## Check yourself

Your team upgrades from `qiskit==1.1.0` to `qiskit==1.2.4`. No import errors occur, but a statistical test that previously passed now fails by a wide margin. Walk through which two things from this lesson's checklist you'd check first, and why a loud-break assumption would have missed this.
