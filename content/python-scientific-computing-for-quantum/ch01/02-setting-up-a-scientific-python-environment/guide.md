# Setting Up a Scientific Python Environment

Before any of the NumPy, visualization, or quantum-SDK work in this course will run reliably, you need an isolated, reproducible Python environment — one where installing a package for this course never silently breaks some other project on your machine. This lesson covers the setup you'll use for the rest of the course.

## What you'll learn

- Why scientific Python work should always live in an isolated virtual environment, never the system Python
- The difference between `venv` and `conda`, and when each is the better choice for quantum computing work
- How to create an environment and install the core scientific stack with `pip`
- What a `requirements.txt` file is for and why it matters for reproducibility
- How to confirm your environment is set up correctly before moving on

## Why isolation matters

Your computer's "system" Python is used by the operating system itself in many cases, and other projects you work on may depend on different, sometimes conflicting, versions of the same package. If you `pip install numpy` directly into the system Python, you risk upgrading or downgrading a version that something else quietly depends on. A **virtual environment** solves this by creating a private, self-contained copy of Python and its installed packages for a single project. Every package you install while that environment is active is invisible to every other environment on the machine. For this course, that means the exact NumPy/SciPy/Matplotlib versions you install will not interfere with, or be interfered with by, anything else — including a future quantum SDK environment with different requirements.

## `venv`: the built-in option

Python ships with a virtual environment tool called `venv`. It's lightweight, requires no extra installation, and is enough for everything in this course:

```bash
# Create a new environment in a folder called .venv
python -m venv .venv

# Activate it (macOS/Linux)
source .venv/bin/activate

# Activate it (Windows PowerShell)
.venv\Scripts\Activate.ps1
```

Once activated, your shell prompt usually changes to show the environment's name, and any `pip install` command only affects that environment. You deactivate with the `deactivate` command, which returns you to the system Python.

## `conda`: the alternative for heavier scientific stacks

**conda** (via Anaconda or the smaller Miniconda) is a second, widely used option in scientific computing specifically because it manages more than just Python packages — it can also install non-Python dependencies (compiled BLAS/LAPACK libraries, compilers) that some scientific packages need underneath. For this course, `venv` plus `pip` is sufficient, but it's worth knowing conda exists because many quantum-computing and physics research groups standardize on it:

```bash
conda create -n quantum-env python=3.11
conda activate quantum-env
conda install numpy scipy matplotlib jupyter
```

Neither tool is strictly "better" — `venv` is simpler and ships with Python itself; `conda` is heavier but handles non-Python dependencies more gracefully. This course uses plain `pip` install commands so the instructions work the same way regardless of which one you choose.

## Installing the core scientific stack

With a `venv` environment activated, installing the libraries this course depends on is a single command:

```bash
pip install numpy scipy matplotlib jupyter
```

This installs four packages: NumPy and SciPy for numerical computing, Matplotlib for plotting, and Jupyter for the notebook interface covered in the next lesson. Quantum SDKs like Qiskit are intentionally *not* installed in this chapter — they come later in the course, once the plain-Python foundation is solid.

## Pinning versions with `requirements.txt`

A `requirements.txt` file records exactly which packages, and ideally which versions, a project depends on, so that environment can be recreated identically on another machine (or by another person) later:

```text
numpy==2.1.0
scipy==1.14.0
matplotlib==3.9.0
jupyter==1.1.0
```

You install from a file like this with:

```bash
pip install -r requirements.txt
```

Pinning exact versions (using `==` rather than leaving versions unspecified) matters more in scientific computing than in most software: a different NumPy minor version can occasionally change default behavior in ways that silently alter a numerical result, which is exactly the kind of bug that is hard to notice in a quantum simulation. You won't always pin every version this strictly in day-to-day work, but you should know the mechanism exists and why reproducibility-focused teams rely on it.

## Confirming the environment works

Before trusting an environment, verify the packages actually import and report sane version strings:

```python
import numpy
import scipy
import matplotlib
import sys

print("Python:", sys.version)
print("NumPy:", numpy.__version__)
print("SciPy:", scipy.__version__)
print("Matplotlib:", matplotlib.__version__)
```

If every import line runs without an `ImportError`, and the printed versions match what you expect from your `requirements.txt` (or at least look like plausible recent versions), your environment is ready for the rest of this course.

## Key terms

| Term | Meaning |
|---|---|
| Virtual environment | An isolated, self-contained Python installation and package set for a single project, so installs don't affect other projects or the system Python |
| `venv` | Python's built-in virtual environment tool; lightweight, no separate install required |
| conda | A third-party environment/package manager that can also install non-Python dependencies, common in scientific computing |
| `requirements.txt` | A text file listing a project's dependencies (optionally pinned to exact versions) so the environment can be recreated reproducibly |
| Pinning | Specifying an exact package version (e.g. `numpy==2.1.0`) rather than letting any version be installed |

## Check yourself

A labmate says "it works on my machine" about a quantum simulation script, but it crashes on yours with a different NumPy-related error. Using what you learned about virtual environments and `requirements.txt`, explain the most likely cause and how you'd fix it.
