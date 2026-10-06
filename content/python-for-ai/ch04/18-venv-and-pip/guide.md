# venv & pip

**Chapter 4 · Virtual Environments & Package Management · Lesson 18 of 37**

Every real Python project — including every AI project you'll build — depends on third-party libraries: `requests`, `openai`, `anthropic`, `pandas`. This lesson covers the two tools that make installing those libraries safe and project-specific: `venv`, which creates an isolated environment, and `pip`, which installs packages into it.

## What you'll learn

- Why installing packages globally causes problems across projects
- Creating a virtual environment with `python -m venv`
- Activating and deactivating a virtual environment
- Installing, listing, and uninstalling packages with `pip`

## The problem: one shared global Python

Without a virtual environment, every `pip install` goes into your single, system-wide Python installation. If Project A needs `requests` version 2.25 and Project B needs version 2.31, they can't both get what they want from one shared install — installing one upgrades (or breaks) the other.

## The fix: a virtual environment per project

A **virtual environment** is a self-contained folder with its own copy of the Python interpreter and its own `site-packages` directory for installed libraries. Create one with the built-in `venv` module:

```
python -m venv .venv
```

This creates a `.venv` folder in your project directory. Nothing is installed into it yet beyond the Python standard library — it's an empty, isolated starting point.

## Activating it

Activating puts that environment's Python and `pip` first on your shell's search path, so commands use the isolated copies instead of the system ones.

```
# Windows (PowerShell)
.venv\Scripts\Activate.ps1

# macOS / Linux
source .venv/bin/activate
```

Your prompt typically changes to show `(.venv)` at the start once it's active. Run `deactivate` (no arguments) to leave the virtual environment and return to your system Python.

## Installing packages with pip

With the environment active, `pip install` puts packages only into this project's isolated environment — never system-wide.

```
pip install requests
pip install requests==2.31.0   # pin an exact version
pip list                        # see what's installed, and at what version
pip uninstall requests          # remove a package
```

Pinning an exact version (`==2.31.0`) matters for reproducibility: it guarantees you and a teammate — or you today and you in six months — get the identical version, not "whatever's newest right now."

## Checking which Python you're actually using

A common beginner mistake is installing a package, then running code that still can't find it — usually because the virtual environment was never activated, or a different one got activated by mistake.

```
# with the venv active, this should point inside .venv, not your system Python
python -c "import sys; print(sys.executable)"
```

## Recap

- Without a virtual environment, every project shares one global Python — version conflicts are inevitable.
- `python -m venv .venv` creates an isolated environment; activate it before installing anything.
- `pip install`, `pip list`, and `pip uninstall` manage packages inside the active environment only.
- Pin exact versions (`package==1.2.3`) for reproducible installs.
- Next lesson: `requirements.txt`, which records and reproduces an entire environment's packages in one file.
