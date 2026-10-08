# Jupyter to Production Workflows

Jupyter is where almost all quantitative research starts — it is genuinely the fastest way to look at data, plot something, and iterate on an idea in seconds. It is also where a surprising number of "it worked yesterday" bugs come from, because a notebook's biggest strength (you can run cells in any order) is also its biggest liability. This lesson covers Jupyter's real strengths, its real traps, the tools that bridge a notebook into something repeatable, and the practical pattern of graduating logic out of a notebook and into tested library code once it stops being purely exploratory.

## What you'll learn

- Why Jupyter is genuinely good for exploratory research: fast iteration, inline plots, immediate feedback
- The hidden-state trap: execution order, and notebooks that don't reproduce top-to-bottom
- Why `.ipynb` files are miserable to diff and merge in version control
- `nbconvert` and `papermill` for turning a notebook into a script, a report, or a parameterized batch job
- The graduation pattern: when and how to pull logic out of a notebook into a tested module

## What Jupyter is actually good at

A notebook interleaves code, output, and prose in one document, and each cell keeps its own state in memory between runs. That is exactly what exploratory research needs: load a price panel once, then try five different ways of computing a signal against it without reloading the data each time, with the plot rendered right next to the code that made it. For the "what does this data actually look like" phase of research, nothing beats that loop.

## The hidden-state trap

The problem is that a notebook's visible cell order and its *actual execution order* are two different things, and only the kernel remembers the second one. You can define a variable in cell 12, delete cell 12, and the variable is still sitting in memory — the notebook on disk no longer shows where it came from, but every cell below it still runs fine, until someone (including future-you) restarts the kernel and runs top to bottom:

```python
# Cell 3 (defines something used much later)
adj_factor = 1.0025

# ... twenty cells later, after adj_factor was edited interactively
# and that edit was never re-run in this exact order ...
prices_adj = prices * adj_factor
```

If `adj_factor` was redefined in a cell that got deleted or reordered, `prices_adj` still "works" in the current kernel session but will not reproduce if the notebook is run fresh. This is the single most common reason a result "can't be reproduced" a week later — not a code bug, but an execution-order bug that the notebook file itself doesn't record. The fix is procedural, not technical: periodically restart the kernel and run all cells top to bottom (*Kernel → Restart & Run All*), and treat a notebook that can't survive that as untrustworthy.

## `.ipynb` files and version control

A `.ipynb` file is JSON containing the code, the markdown, *and* the output of every cell, including embedded base64 image data for any plot. Two researchers editing the same notebook produce a diff that is mostly noise — changed cell-execution counters and re-rendered plot bytes, not the one line of logic that actually changed — and a real merge conflict in that JSON is painful to resolve by hand. `nbstripout` (strips outputs before committing) and tools like `jupytext` (pairs a notebook with a plain `.py` representation) both exist specifically to make notebooks less hostile to git; even without adopting either, it's worth knowing this is a known, structural problem with the format, not a tooling gap on your end.

## Turning a notebook into a script or report

Two standard tools bridge the gap between "a notebook I ran interactively" and "something that runs the same way every time":

- **`nbconvert`** converts a notebook to another format — a plain `.py` script, or an executed HTML/PDF report. `jupyter nbconvert --to script research.ipynb` extracts just the code; `jupyter nbconvert --to notebook --execute research.ipynb` re-runs the whole notebook fresh and saves the output, which is the command-line equivalent of "Restart & Run All" and a good smoke test for whether a notebook is actually reproducible.
- **`papermill`** executes a notebook as a *parameterized* batch job: `papermill research.ipynb output.ipynb -p universe "SP500" -p lookback 60` re-runs the notebook with different parameter values injected into a designated "parameters" cell, which is how a notebook becomes a repeatable job you can run for ten different universes without hand-editing it ten times.

## Graduating logic out of the notebook

The practical pattern: a notebook is for finding out whether an idea works at all. Once it does, and you're going to rely on the calculation again — in a backtest, in another notebook, in a scheduled job — pull it out of the notebook and into a plain function in a `.py` module, with a test. The notebook keeps the exploration (plots, scratch work, dead ends); the module keeps the thing that has to keep working.

```python
# signal_lib.py -- extracted from a notebook cell, now a real function
import pandas as pd

def momentum_signal(prices: pd.Series, lookback: int = 5) -> pd.Series:
    """Simple price-momentum signal: % return over `lookback` periods."""
    if lookback < 1:
        raise ValueError("lookback must be >= 1")
    return prices.pct_change(lookback)
```

```python
# test_signal_lib.py
import pandas as pd
import numpy as np
from signal_lib import momentum_signal

def test_momentum_signal_matches_hand_computed_value():
    prices = pd.Series([100.0, 102.0, 101.0, 105.0, 110.0, 108.0])
    result = momentum_signal(prices, lookback=2)
    expected = pd.Series([np.nan, np.nan, 0.01, 105/102 - 1, 110/101 - 1, 108/105 - 1])
    pd.testing.assert_series_equal(result, expected, check_exact=False, rtol=1e-10)
```

```text
$ pytest -v test_signal_lib.py
test_signal_lib.py::test_momentum_signal_matches_hand_computed_value PASSED
test_signal_lib.py::test_momentum_signal_rejects_bad_lookback PASSED
2 passed in 1.68s
```

Once `momentum_signal` lives in `signal_lib.py` with a real test, the notebook imports it (`from signal_lib import momentum_signal`) instead of redefining it inline. The notebook stays the fast, disposable workspace it's good at being; the logic that matters now lives somewhere a test suite actually protects it, and a new notebook — or a scheduled script, as you'll build in lesson 27 — can reuse it without copy-pasting a cell.

## Key terms

| Term | Meaning |
|---|---|
| Hidden state | Variables still in kernel memory from a deleted or reordered cell, invisible in the saved notebook |
| Restart & Run All | The standard check for whether a notebook actually reproduces top to bottom |
| `nbconvert` | Converts a notebook to a script, or re-executes it to an HTML/PDF report |
| `papermill` | Executes a notebook as a parameterized, repeatable batch job |
| Graduation pattern | Moving logic from an exploratory notebook cell into a tested library function once it's relied upon |

## Recap

Jupyter is the right tool for fast, visual, exploratory research, but its hidden execution-order state means a notebook that "runs" in your current kernel session is not the same claim as a notebook that reproduces top to bottom — check with Restart & Run All, bridge to repeatable runs with `nbconvert`/`papermill`, and graduate any logic you actually rely on into a tested module. Next lesson: experiment tracking and data versioning, for when the question becomes "why can't I reproduce last week's result at all."
