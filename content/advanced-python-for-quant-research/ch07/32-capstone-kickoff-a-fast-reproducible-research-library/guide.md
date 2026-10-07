# Capstone Kickoff: A Fast, Reproducible Research Library

Six chapters have each handed you one capability: vectorized NumPy and pandas, numerical computing with SciPy, profiling and Numba/Cython speedups, software engineering practices, research tooling, and SQL/columnar data access. The capstone is where those stop being six separate skills and become one piece of work. Over these three lessons you will design, build, and present a small but real **research library** — the kind of thing a quant researcher actually keeps in a git repo and reuses, not a one-off notebook. This lesson is the kickoff: the brief, the requirements, and the architecture plan. Lesson 2 builds it; lesson 3 wraps it up for a portfolio.

## What you'll learn

- The capstone brief: a small factor-research and signal-backtesting toolkit
- The three non-negotiable requirements — fast, reproducible, testable — and what each one means in code
- A simple three-layer architecture: data layer, computation layer, results/reporting layer
- What is explicitly in scope and out of scope, and why scoping tightly matters more than scoping ambitiously
- The project skeleton you will fill in next lesson

## The brief

You are building `qresearch`, a small Python package that takes a panel of historical prices, computes one factor signal, turns that signal into a long/short portfolio, and backtests it. That is the whole project. It is small on purpose — a capstone that tries to be a full trading platform ends up being nothing well, while one clean, correctly-tested signal-to-backtest pipeline demonstrates every skill from this course at once.

## Three requirements, not just "make it work"

A research library that merely runs is not what this course has been building toward. Three properties have to hold, each tracing back to an earlier chapter:

- **Fast.** The core calculations are vectorized (Chapter 1), and the one place a pure Python loop is unavoidable — a rolling calculation with no clean pandas equivalent — is compiled with Numba (Chapter 3) after profiling confirms it is actually the hot path.
- **Reproducible.** Every run is driven by a config file, not hand-edited constants (Chapter 5), any randomness uses a seeded NumPy `Generator` (Chapter 2), and each run's parameters and key results are logged (Chapter 4) so a run from last week can be explained today.
- **Testable.** A `pytest` suite checks the numerical calculations against hand-computed or independently-derived expected values using `np.testing.assert_allclose`, not just "the script didn't crash" (Chapter 4).

## Architecture: three layers

Keep the responsibilities separated so each one can be tested and reasoned about on its own:

1. **Data layer** — reads a price panel from Parquet into a pandas DataFrame and turns prices into returns. It knows nothing about signals or backtesting.
2. **Computation layer** — turns returns into a factor signal, then turns the signal into portfolio weights and a backtested return series. This is where the vectorized code and the one Numba hot path live.
3. **Results/reporting layer** — takes the backtest output and produces the numbers and artifacts a human or a test actually looks at: a results table, a log line, a saved file.

Data flows one direction only: data layer to computation layer to reporting layer. Nothing reaches backward to re-read raw prices from inside the computation layer, and nothing in the data layer knows what a "signal" is. That separation is what makes each layer independently testable next lesson.

## Scope: what is in, what is out

- **In scope:** one price panel, one momentum-style factor signal, one long/short backtest, one Numba-accelerated rolling calculation, a pytest suite, a Hydra config, basic logging, and one secondary SQL-based access path for ad-hoc exploration.
- **Out of scope:** multiple asset classes, a live trading connection, a web UI, hyperparameter search, and a multi-strategy portfolio. If you find yourself building any of these, you have wandered outside the capstone's scope — note it as a "future work" line in the README instead of building it now.

## The project skeleton

The package you will fill in next lesson has this shape:

```text
qresearch/
  pyproject.toml
  conf/
    config.yaml
  src/
    qresearch/
      __init__.py
      data.py        # load prices, compute returns
      signals.py      # momentum signal + Numba rolling z-score
      backtest.py     # weights + backtested returns
      run.py          # Hydra entry point, logging
  tests/
    test_signals.py
  README.md
```

Every file in that tree maps to a requirement from this lesson: `pyproject.toml` makes the package installable and its dependencies explicit (Chapter 4), `conf/config.yaml` is the single source of truth for a reproducible run (Chapter 5), `data.py`/`signals.py`/`backtest.py` are the three architecture layers, and `tests/test_signals.py` is where correctness gets checked, not assumed.

## Key terms

| Term | Meaning |
|---|---|
| Research library | A small, reusable, tested package — not a notebook — that encodes one research workflow |
| Hot path | The specific calculation a profiler identifies as dominating runtime; the only place that should be hand-optimized |
| Data / computation / reporting layers | The three-way split that keeps loading, calculating, and presenting independently testable |
| Reproducible run | A run whose parameters are config-driven, whose randomness is seeded, and whose outcome is logged |

## Recap

The capstone is one small, well-built pipeline — load prices, compute a signal, backtest it — built to three standards: fast, reproducible, testable. The architecture splits data loading from computation from reporting, and the scope is deliberately narrow so every piece can be done well. Next lesson, you build every file in that skeleton.
