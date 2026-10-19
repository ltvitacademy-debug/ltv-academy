# Installing Qiskit & IBM Quantum Setup

Before you write a single gate, you need a working Python environment with the right packages installed, plus an IBM Quantum account if you ever want to leave the simulator and touch real hardware. This lesson walks through both, step by step.

## What you'll learn

- How to install Qiskit's core packages into an isolated virtual environment
- How to verify the install actually worked
- How to create a free IBM Quantum Platform account and get credentials
- How to save those credentials locally with `QiskitRuntimeService.save_account`
- Why the exact cloud auth details are worth double-checking against current docs rather than memorizing

## Setting up an isolated environment

Install Qiskit into a dedicated virtual environment rather than your system Python — this avoids version conflicts with other projects and makes it easy to reproduce your setup later.

Using `venv` (built into Python):

```bash
python -m venv qiskit-env
source qiskit-env/bin/activate      # macOS/Linux
qiskit-env\Scripts\activate         # Windows
```

Or using `conda`:

```bash
conda create -n qiskit-env python=3.11
conda activate qiskit-env
```

Either approach gives you a clean, isolated environment. Once it's active, install the packages:

```bash
pip install qiskit qiskit-aer qiskit-ibm-runtime
```

This installs the three packages from the previous lesson: the core circuit-building library, the local Aer simulator, and the IBM Runtime client for cloud hardware access. You don't need anything else to start building and simulating circuits.

## Verifying the install

Open a Python shell (or a new Jupyter cell) inside your activated environment and check that Qiskit imports cleanly and report its version:

```python
import qiskit
print(qiskit.__version__)
```

If this prints a version number without errors, your core install is good. You can do the same sanity check for the other two packages:

```python
import qiskit_aer
import qiskit_ibm_runtime
print(qiskit_aer.__version__)
print(qiskit_ibm_runtime.__version__)
```

If any of these raise an `ImportError`, double check you installed into the environment you're actually running Python from — a common mistake is activating one environment but running a Jupyter kernel tied to another.

![The IBM Quantum Platform header, with an account switcher and a region switcher](/courses/quantum-programming-with-qiskit/ch01/02-installing-qiskit-and-ibm-quantum-setup/ibm-quantum-platform-header.png)
*The Platform's own header — the account switcher matters once you have more than one, and the region switcher controls where a job runs and where its data is kept.*

## Creating an IBM Quantum Platform account

To eventually run circuits on real hardware (covered in depth in Chapter 5), you need a free IBM Quantum Platform account:

1. Go to the IBM Quantum Platform site and sign up for a free account.
2. Once logged in, find your API token and instance identifier (often shown as an instance CRN) on your account dashboard.
3. Keep that token private — treat it like a password. Don't commit it to a public repository or paste it into shared notebooks.

## Saving your credentials locally

`qiskit-ibm-runtime` can store your credentials on disk so you don't have to paste your token into every script. The general pattern looks like this:

```python
from qiskit_ibm_runtime import QiskitRuntimeService

QiskitRuntimeService.save_account(
    channel="ibm_quantum_platform",
    token="YOUR_API_TOKEN",
    overwrite=True,
)
```

Replace `"YOUR_API_TOKEN"` with the token from your account dashboard — never hardcode a real token into a script you'll share or commit. Once saved, later sessions can just call `QiskitRuntimeService()` with no arguments and it will pick up the stored credentials automatically.

A genuine caveat worth stating plainly: IBM has changed its cloud authentication flow and channel naming more than once as the platform has evolved. The `channel` value and the exact token/instance flow shown above reflect the current setup, but IBM's own documentation is the source of truth — check the current IBM Quantum Platform docs before you save your account, rather than treating any tutorial's exact snippet (including this one) as permanently frozen.

## Picking a development environment

Most Qiskit work happens in one of two places:

- **Jupyter notebooks** — convenient for interleaving code, circuit diagrams, and plots like histograms as you experiment.
- **VS Code** (with the Python extension) — better suited to larger scripts, version control, and anything that will grow beyond a single notebook.

Either is a completely normal choice for this course. Use whichever you're already comfortable with.

## Key terms

| Term | Meaning |
|---|---|
| Virtual environment | An isolated Python environment (via `venv` or `conda`) that keeps a project's package versions separate from your system Python |
| `qiskit.__version__` | The quickest way to confirm the core package installed and imports correctly |
| IBM Quantum Platform account | A free account giving you an API token and instance identifier needed to access real IBM hardware |
| `QiskitRuntimeService.save_account` | Stores your IBM Quantum credentials locally so you don't re-enter them every session |
| `channel` | The auth channel argument passed to `save_account`; its exact name can change as IBM updates its platform, so verify against current docs |

## Check yourself

You just ran `pip install qiskit qiskit-aer qiskit-ibm-runtime` successfully, but `import qiskit` in your Jupyter notebook still raises `ModuleNotFoundError`. What's the most likely explanation, and what would you check first?
