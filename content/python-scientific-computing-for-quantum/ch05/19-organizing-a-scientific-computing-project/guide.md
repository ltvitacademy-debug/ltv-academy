# Organizing a Scientific Computing Project

A notebook with forty cells, run in a different order every time you reopen it, is how a correct quantum simulation quietly turns into one nobody — including you, in six months — can trust or rerun. Project structure is what keeps exploratory code and trustworthy results from becoming the same tangled file.

## What you'll learn

- Why "it worked in my notebook" and "it's a reliable piece of research code" are different bars
- A concrete, standard folder layout for a small quantum-computing Python project
- The separation between reusable library code, one-off exploration, and final results
- Where tests belong, and why scientific code needs them as much as any other software
- What to put in version control and what to deliberately keep out

## The problem notebooks alone don't solve

A Jupyter notebook is excellent for exploration: trying an idea, plotting a result, iterating fast. It's a poor place to leave code you depend on, because notebook cells can be run out of order, variables can linger from a cell you've since deleted, and there's no straightforward way to reuse a function you wrote in notebook A from notebook B without copy-pasting it. The fix isn't "stop using notebooks" — it's separating code that needs to be *correct and reusable* (gates, state-vector math, measurement simulation) from code that's just *exploring* (a notebook that imports and uses that reusable code).

## A standard layout

A small but real quantum-simulation project typically looks like this:

```
quantum-toolkit/
  src/
    gates.py          # gate matrices and gate-application functions
    simulate.py        # state-vector simulation, measurement sampling
    visualize.py        # Bloch sphere / histogram plotting helpers
  tests/
    test_gates.py       # unit tests for src/gates.py
    test_simulate.py     # unit tests for src/simulate.py
  notebooks/
    01-explore-bell-state.ipynb   # exploratory use of src/, not depended on by anything
  results/
    bell_state_fidelity.json      # a specific numeric result, saved once computed
  requirements.txt
  README.md
  .gitignore
```

The key idea: `src/` holds code other code depends on and must stay correct; `notebooks/` holds exploration that depends on `src/` but that nothing else depends on; `results/` holds specific numeric outputs worth keeping, separated from the code that produced them.

## Importing your own code instead of copy-pasting it

Once gate logic lives in `src/gates.py`, a notebook or script can import it directly instead of redefining it inline, which means a bug fix in one place fixes every place that uses it:

```python
# src/gates.py
import numpy as np

HADAMARD = (1 / np.sqrt(2)) * np.array([[1, 1],
                                          [1, -1]])

def apply_gate(gate, state):
    return gate @ state
```

```python
# notebooks/01-explore-bell-state.ipynb
import sys
sys.path.append("../src")
from gates import HADAMARD, apply_gate

ket0 = np.array([1, 0])
result = apply_gate(HADAMARD, ket0)
```

(In a real installable package you'd use a proper `pyproject.toml`/`pip install -e .` setup instead of `sys.path.append`, but the structural idea — reusable code in one place, imported rather than duplicated — is the same either way.)

## Tests aren't optional for numerical code

It's tempting to think testing is for "software engineering" projects and not for research code, but numerical code is exactly where a silent bug is most dangerous — a sign error in a gate matrix won't crash your program, it will just quietly produce a wrong-but-plausible-looking answer. A test like this catches a known, exactly-computable fact and fails loudly if it ever stops being true:

```python
# tests/test_gates.py
import numpy as np
from gates import HADAMARD, apply_gate

def test_hadamard_on_zero_gives_equal_superposition():
    ket0 = np.array([1, 0])
    result = apply_gate(HADAMARD, ket0)
    expected = np.array([1 / np.sqrt(2), 1 / np.sqrt(2)])
    assert np.allclose(result, expected)
```

This test encodes a fact you can verify by hand: applying the Hadamard matrix `[[1,1],[1,-1]] / sqrt(2)` to `[1,0]` must give `[1/sqrt(2), 1/sqrt(2)]`, since matrix-vector multiplication of the first column of `H` by 1 (and the second column by 0) just picks out `H`'s first column. If a future edit to `gates.py` breaks this, the test fails immediately instead of silently shipping a wrong simulation.

## What belongs in version control, and what doesn't

Source code, tests, notebooks, and small final results belong in git. Large generated files generally don't: a `.gitignore` that excludes bulky, regeneratable output keeps the repository small and keeps git's history about *code changes*, not multi-megabyte data dumps:

```
# .gitignore
__pycache__/
*.pyc
.ipynb_checkpoints/
results/large_sweep_output/
*.npy
```

The exception is a small, specific, important numeric result (like one JSON file recording a single experiment's measured fidelity) — that's worth committing precisely because it's small and it's exactly the kind of result someone will want to compare against later.

## Key terms

| Term | Meaning |
|---|---|
| `src/` layout | A project structure where reusable code lives in its own directory, separate from exploration and results |
| Exploratory code | Code (often in a notebook) used to try ideas quickly, which other code should not depend on |
| Unit test | A small, automated check that a specific piece of code produces a known-correct result, used to catch regressions |
| `.gitignore` | A file listing patterns of files git should not track, typically large or regeneratable output |
| `pip install -e .` | Installs a local project in "editable" mode so its modules can be imported from anywhere without path hacks |

## Check yourself

Your project has a `gates.py` module with a `cnot_matrix()` function, a notebook that uses it to build a Bell state, and a results file recording the Bell state's measured fidelity as 0.9987. Which of these three things should have an automated test written against it, and what specific fact would that test check?
