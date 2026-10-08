# Logging, Configuration & Reproducibility

This closing lesson of Chapter 4 ties together two practical habits — proper logging instead of scattered `print()` calls, and deliberate configuration management instead of hardcoded values — and connects both back to the reproducibility theme that started in Chapter 2 with random seeds. A research result is only as reproducible as the record of exactly what produced it: what config, what seed, what library versions, run at what time. Logging and configuration are how that record gets written down automatically, instead of relying on memory.

## What you'll learn

- Python's `logging` module: levels, handlers, formatters, and why it beats scattered `print()`
- Configuration management: env vars, `.env` files, YAML/TOML config, and avoiding hardcoded paths/secrets
- How to log the exact config, seed, and library versions behind a research run
- A real runnable logging example with real console output, including an error with full traceback

## Why `logging`, not `print()`

`print()` always writes, always to the same place, with no record of severity or origin. The `logging` module fixes all three: messages have a **level** (`DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`) so you can filter by importance, a **handler** controls *where* output goes (console, a file, both), and a **formatter** controls *how* each line looks, including automatic timestamps and the logger's name:

```python
import logging
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)-7s %(name)s: %(message)s",
    datefmt="%H:%M:%S",
    stream=sys.stdout,
)
logger = logging.getLogger("backtest")
```

Once configured, `logger.info(...)`, `logger.warning(...)`, and `logger.error(...)` all route through the same formatting and filtering, and — critically — can be turned down (`level=logging.WARNING` to silence `INFO` noise) or redirected (to a file, for a long unattended run) without touching a single call site, unlike `print()` statements that would all need editing or deleting by hand.

## A real example, with real output

```python
import numpy as np

def run_backtest(seed: int, n_sims: int) -> float:
    logger.info("starting backtest run: seed=%d n_sims=%d numpy=%s", seed, n_sims, np.__version__)
    rng = np.random.default_rng(seed)
    returns = rng.normal(0.0005, 0.01, n_sims)
    if (returns < -0.5).any():
        logger.warning("extreme negative return detected in simulation")
    sharpe = returns.mean() / returns.std() * np.sqrt(252)
    logger.info("finished backtest run: annualized_sharpe=%.4f", sharpe)
    return sharpe

try:
    run_backtest(seed=42, n_sims=5000)
    run_backtest(seed=-1, n_sims=-5)   # deliberately invalid
except Exception:
    logger.exception("backtest run failed")
```

Real console output from running this:

```
19:48:55 INFO    backtest: starting backtest run: seed=42 n_sims=5000 numpy=1.23.1
19:48:55 INFO    backtest: finished backtest run: annualized_sharpe=0.4785
19:48:55 INFO    backtest: starting backtest run: seed=-1 n_sims=-5 numpy=1.23.1
19:48:55 ERROR   backtest: backtest run failed
Traceback (most recent call last):
  File "logging_demo.py", line 28, in <module>
    run_backtest(seed=-1, n_sims=-5)
  File "logging_demo.py", line 16, in run_backtest
    rng = np.random.default_rng(seed)
ValueError: expected non-negative integer
```

`logger.exception(...)`, called from inside an `except` block, automatically attaches the full traceback to the log record at `ERROR` level — you get both a clear, searchable message ("backtest run failed") and the complete diagnostic detail, in one call, without manually formatting the traceback yourself. Notice also that the first run logged the exact `numpy` version alongside the seed and simulation count — exactly the kind of detail that matters when you're trying to reproduce a result later and need to know not just *what* was run, but *with what*.

## Lazy formatting: `logger.info("...%s", value)`, not an f-string

The example above passes `seed` and `n_sims` as separate arguments to `logger.info`, with `%d`/`%s` placeholders, rather than building an f-string up front (`logger.info(f"...{seed}...")`). This is a deliberate, if minor, performance habit: with the placeholder form, the string is only actually formatted if the log record passes the configured level filter, whereas an f-string is built every single time the line executes, filtered or not. It's a small cost per call, but one that's easy to avoid entirely just by using the placeholder form as a default habit.

## Configuration management

Hardcoding a file path, an API key, or a parameter value directly into a script is the single most common thing that breaks "someone else runs this on their machine." The standard alternatives, roughly in order of how much structure they add:

- **Environment variables**, read via `os.environ.get("DATA_DIR", "./data")` — simple, standard for secrets and deployment-specific values, but easy to lose track of which variables a script actually needs.
- **`.env` files** (loaded with a library like `python-dotenv`) — a checked-in-nowhere file of `KEY=value` pairs for local development, keeping secrets out of the codebase while still being easy to set up.
- **YAML or TOML config files** — for structured settings beyond simple key-value pairs (a backtest's date range, universe, parameter grid), checked into version control (for non-secret settings) so a specific run's configuration is itself part of the reproducible record.

The unifying rule: never hardcode a path, credential, or environment-specific value directly into library or script code; read it from one of these layers instead, so the same code runs correctly (and without exposing secrets) on a teammate's machine, in CI, or in production.

## Tying it back to reproducibility

Chapter 2 established that a Monte Carlo result depends on the exact seed used, not just its expected value. The practical consequence for a real research pipeline: log the seed, the resolved configuration (not just "loaded config from file," but the actual values used), and the key library versions, every single run — exactly as the example above logged `seed`, `n_sims`, and `numpy.__version__` together in one line. Six months later, when someone asks "can you reproduce the Sharpe ratio from that report," the honest answer requires having written down, at the time, everything that would be needed to run it again identically — and a disciplined logging habit is what makes that answer "yes" instead of "I don't remember what config I used."

## Key terms

| Term | Meaning |
|---|---|
| Log level | Severity classification (`DEBUG`/`INFO`/`WARNING`/`ERROR`/`CRITICAL`) controlling what gets shown or filtered |
| Handler | Controls where log output goes (console, file, etc.) |
| Formatter | Controls how each log line is rendered, including timestamps |
| `logger.exception(...)` | Logs a message at `ERROR` level with the full current exception traceback attached automatically |
| Lazy formatting | Passing values as separate args to a log call so formatting only happens if the level filter passes |

## Recap

Structured `logging` (levels, handlers, formatters) replaces scattered `print()` calls with filterable, redirectable, timestamped output — the real example showed both a normal `INFO` run and a real `ERROR` with full traceback from `logger.exception` — and disciplined configuration management (env vars, `.env`, YAML/TOML) plus logging the exact seed and library versions used is what actually makes a research result reproducible months later. That closes Chapter 4 on software engineering practices. Chapter 5 turns to Jupyter to production workflows, starting with the first lesson on taking notebook-based research and turning it into something that runs reliably outside a notebook.
