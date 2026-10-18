# Mixed-Language Project Structure

A notebook with one `%%qsharp` cell is fine for a tutorial. A real project needs an actual repository layout — one that keeps "the quantum algorithm" and "the orchestration/analysis" as clearly separate concerns, each testable and reusable on its own.

## What you'll learn

- A realistic repo layout for a Q#-plus-Python project
- Why `qsharp.json` plus a `src/` folder is the right boundary for "the quantum library" part
- How Python code on the other side of that boundary stays decoupled from Q# implementation details
- A real gotcha: recompilation timing when `.qs` files change mid-session

## A realistic layout

```
my-quantum-project/
├── qsharp.json                  # Q# project manifest
├── src/
│   ├── Oracles.qs                # reusable Q# operations
│   ├── Diffusion.qs
│   └── Algorithms.qs
├── requirements.txt              # qsharp, azure-quantum, numpy, pandas, etc.
├── experiments/
│   ├── run_grover_sweep.py       # Python orchestration: parameter sweeps, result aggregation
│   └── plot_results.py
└── notebooks/
    └── exploration.ipynb         # interactive development, before code moves into src/
```

The `qsharp.json` manifest plus `src/*.qs` is the Q# project proper — it's independently compilable, independently testable (you can write Q#-only unit tests against operations in `src/`), and independently resource-estimable without any Python involved at all. Everything under `experiments/` is Python that *consumes* that project through the `qsharp` package, the way a Python script consumes any other library — it doesn't need to know how `Oracles.qs` implements its oracle, only what operation names and signatures it exposes.

## Why this boundary is worth keeping

This mirrors the operations-vs-functions discipline from Chapter 2, one level up at the project-structure level: just as Q#'s compiler enforces that pure classical logic (`function`) can't accidentally pick up quantum side effects, keeping the Q# project and the Python orchestration in physically separate folders makes it obvious, by directory structure alone, which code is "the algorithm, type-checked and resource-estimable" and which code is "the experiment-running glue." A reviewer (or you, six months later) can answer "is this logic quantum or classical orchestration?" just by which folder they're looking in.

## Referencing the project from Python

Once `qsharp.init()` is pointed at the project root (or run from within it), operations defined anywhere under `src/` become available to `qsharp.eval(...)` / `qsharp.run(...)` by their fully-qualified namespace name, exactly as if they'd been defined inline in a notebook cell:

```python
import qsharp
qsharp.init(project_root="./my-quantum-project")

results = qsharp.run("MyProject.Algorithms.RunGroverSearch()", shots=1000)
```

Namespaces matter here precisely because this is a multi-file project: `Oracles.qs` and `Algorithms.qs` can each declare their own `namespace` block, and Python code refers to operations by their full namespace path, not by which file they happen to live in.

## The recompilation gotcha

Inside an active `qsharp.init()` session, editing a `.qs` file under `src/` and re-running a Python cell that calls into it triggers automatic recompilation — you don't need to manually "rebuild" first. The gotcha is the reverse direction: if you have stale Python-side references (for example, a variable already holding a compiled callable from before the edit), that reference may still point at the old compiled version until you re-fetch it. When behavior doesn't match a `.qs` file you just edited, re-running the Python call (not just assuming the edit took effect automatically everywhere) is the first thing to check.

## Key terms

| Term | Meaning |
|---|---|
| `qsharp.json` | The Q# project manifest file marking a folder as a compilable Q# project |
| Project root | The folder `qsharp.init(project_root=...)` points at to make all `src/*.qs` operations available |
| Namespace path | The fully-qualified name (e.g. `MyProject.Algorithms.RunGroverSearch`) Python uses to call a specific operation |
| Recompilation | Automatic re-compiling of `.qs` files on change within an active qsharp session |

## Check yourself

Why does keeping Q# source under its own `src/` folder with a `qsharp.json` manifest, separate from the `experiments/` Python scripts, make it easier for someone else to independently resource-estimate or unit-test just the algorithm, without needing to run any Python at all?
