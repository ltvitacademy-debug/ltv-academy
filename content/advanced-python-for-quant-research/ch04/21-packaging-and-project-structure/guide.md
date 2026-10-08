# Packaging & Project Structure

A folder of loose scripts that import each other with relative paths works fine right up until it doesn't: a notebook that only runs if you launch it from exactly one directory, a helper function copy-pasted into three different scripts because nobody wanted to deal with imports, a colleague who can't reproduce your result because half the "setup" lived in commands you ran once and never wrote down. This lesson covers a project layout that avoids all of that — not because it's more elegant, but because it's the layout that makes "someone else can run this" actually true.

## What you'll learn

- The `src/` layout and why it's preferred over a flat package-at-repo-root layout
- `pyproject.toml` as the modern, standard project metadata and build file
- `pip install -e .` (editable installs) and why they solve the "which directory do I run this from" problem
- Separating library code from notebooks and one-off scripts
- Why this structure matters specifically for reproducible research, not just "best practice" for its own sake

## A sane research-repo layout

```
quant-research/
├── pyproject.toml
├── requirements.txt
├── README.md
├── src/
│   └── quant_research/
│       ├── __init__.py
│       ├── returns.py
│       ├── backtest/
│       │   ├── __init__.py
│       │   ├── engine.py
│       │   └── strategy.py
│       └── risk/
│           ├── __init__.py
│           └── position_book.py
├── tests/
│   ├── test_returns.py
│   └── backtest/
│       └── test_engine.py
├── notebooks/
│   └── explore_signal.ipynb
└── scripts/
    └── run_daily_backtest.py
```

The core idea: `src/quant_research/` is the actual library — the tested, importable, reusable code — and `notebooks/` and `scripts/` are *consumers* of that library, not places where new logic quietly accumulates. A function that started life in a notebook cell, proved useful, and then got promoted into `src/quant_research/returns.py` with a real test in `tests/` is the right direction of travel; logic that never leaves a notebook is logic nobody else can import, test, or trust.

## Why `src/`, not a flat layout

Putting the package under `src/quant_research/` instead of directly at the repo root (`quant_research/` next to `pyproject.toml`) prevents a specific, confusing bug class: with a flat layout, running a test or script from the repo root can accidentally import the *uninstalled* local package directly off the filesystem (because Python adds the current directory to its import path), which can mask real packaging problems — an import that works when you run it from the repo root but breaks the moment someone installs the package properly and runs it from elsewhere. The `src/` layout forces every import to go through the actually-installed package, so "it works on my machine because I happen to be in this exact directory" stops being possible.

## `pyproject.toml`: the modern project file

`pyproject.toml` is the standard, tool-agnostic place for project metadata, dependencies, and build configuration — the modern replacement for a bare `setup.py`:

```toml
[build-system]
requires = ["setuptools>=68"]
build-backend = "setuptools.build_meta"

[project]
name = "quant-research"
version = "0.1.0"
description = "Internal research library: returns, backtesting, risk"
requires-python = ">=3.10"
dependencies = [
    "numpy>=1.24",
    "pandas>=2.0",
    "scipy>=1.10",
]

[project.optional-dependencies]
dev = ["pytest>=8.0", "mypy>=1.10", "hypothesis>=6.0"]

[tool.setuptools.packages.find]
where = ["src"]
```

`dependencies` lists what's needed to *use* the library; `optional-dependencies.dev` lists what's needed to *develop* it (testing, type checking) — installed with `pip install -e ".[dev]"` when you're working on the library itself, and skipped for a teammate who just wants to `import quant_research` and use it.

## Editable installs: `pip install -e .`

Running `pip install -e .` from the repo root (where `pyproject.toml` lives) installs the package in **editable mode**: Python's import machinery is pointed at your `src/quant_research/` directory directly, so edits to the source take effect immediately — no reinstalling after every change — while still importing exactly the way a real install would (`import quant_research.returns`), from any directory, not just the repo root. This solves the directory-dependence problem directly: a script in `scripts/`, a notebook in `notebooks/`, and a test in `tests/` can all `import quant_research` identically, regardless of which directory they're launched from, because the import is resolved through the installed package metadata, not through relative path guessing.

## Requirements files and lockfiles

`requirements.txt` (or a proper lockfile from a tool like `pip-tools`, `poetry`, or `uv`) pins exact versions of every dependency actually used in a run, which `pyproject.toml`'s loosely-versioned `dependencies` list deliberately does not do — the project file says "numpy 1.24 or later works," while a lockfile says "this exact run used numpy 1.26.4," which is what you need to reproduce a specific research result six months later after numpy has released several new versions. Keeping both is standard: loose ranges in `pyproject.toml` for flexibility, a pinned lockfile for actually reproducing a specific result.

## Why this matters for reproducible research specifically

A folder of scripts that "worked when I ran it" is not reproducible — reproducibility (the theme that ran through Chapter 2's discussion of random seeds) requires that someone else, or you in six months, can get the *same* environment and the *same* code path, not just approximately similar ones. The `src/` layout plus `pyproject.toml` plus an editable install directly supports that: the library's code is in one place, under version control, with a declared and installable dependency set — not scattered across notebook cells, with dependencies that exist only as "whatever happened to be in my environment that day."

## Key terms

| Term | Meaning |
|---|---|
| `src/` layout | Library code lives under `src/<package>/`, separate from the repo root, preventing accidental filesystem-path imports |
| `pyproject.toml` | Standard, tool-agnostic file for project metadata, dependencies, and build configuration |
| Editable install (`pip install -e .`) | Installs a package pointing at its source directory, so edits take effect without reinstalling |
| Lockfile | Pins exact dependency versions actually used in a run, for reproducing a specific result later |
| Library vs. script/notebook | Tested, importable, reusable code (`src/`) vs. code that consumes that library (`notebooks/`, `scripts/`) |

## Recap

A `src/`-layout package with a `pyproject.toml`, installed in editable mode with `pip install -e .`, lets library code, tests, scripts, and notebooks all import consistently regardless of which directory they're run from — the structural foundation that makes "someone else can reproduce this" actually achievable, rather than aspirational. Next lesson closes Chapter 4 with logging, configuration, and reproducibility — recording exactly what was run, with what settings and seed, so a research result can be traced back and repeated.
