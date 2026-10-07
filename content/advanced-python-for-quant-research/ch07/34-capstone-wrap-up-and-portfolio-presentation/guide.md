# Capstone: Wrap-Up & Portfolio Presentation

You built `qresearch` in the last lesson: a vectorized data and signal layer, one Numba hot path, a lookahead-safe backtest, a Hydra-driven and logged run, a pytest suite, and a SQL-based secondary access path. That is a working project. Whether it is a *good* project — in a hiring manager's eyes or your own — depends entirely on what you do next: how you back up your performance claims, how you write it up, and how you talk about it. This final lesson covers all three, and closes out the course.

## What you'll learn

- What a hiring manager or quant team actually checks for in a project like this
- How to make a performance claim that holds up to scrutiny instead of a vague "it's fast now"
- How to structure a repo and README for a portfolio
- How to talk about the project in an interview
- A recap of the course and where to go next

## What a reviewer actually checks

A reviewer who opens this repo is not looking for a cool idea. They are checking four specific things:

- **Correctness tests pass, and you can show it.** Run `pytest -v` and keep the output, or better, wire it into CI so it runs on every push. "It works" is a claim; a green test run is evidence.
- **Performance claims are backed by a real method.** "I made it fast with Numba" is a vibe. "The Numba version is roughly 40x faster than the pure-Python loop it replaced, median of 20 runs on this machine" is a claim someone can check.
- **The run is reproducible.** Someone else should be able to clone the repo, run one command, and get your numbers — not a story about environment setup that only works on your laptop.
- **The README is readable in two minutes.** If a reviewer has to read every source file to understand what the project does, the README has failed at its one job.

## Making a performance claim that survives scrutiny

A benchmark claim needs a stated baseline, a stated method, and a stated result — in that order. Never just "it's fast"; always "fast compared to what, measured how."

```python
import timeit

naive_time = timeit.timeit(naive_rolling_zscore, number=20) / 20
numba_time = timeit.timeit(numba_rolling_zscore, number=20) / 20

print(f"naive: {naive_time:.4f}s   numba: {numba_time:.4f}s   "
      f"speedup: {naive_time / numba_time:.1f}x")
```

Report the median or mean of several runs, not a single lucky measurement, and say what you compared against and on what data size:

| Implementation | Median time, 20 runs, 100k rows | Speedup vs. naive loop |
|---|---|---|
| Naive Python loop | *(your measured number)* | 1.0x (baseline) |
| Vectorized pandas | *(your measured number)* | *(your measured number)* |
| Numba hot path | *(your measured number)* | *(your measured number)* |

The actual numbers belong to whoever runs the benchmark on their own machine — that is the point of reproducibility. What makes the claim credible is stating the baseline, the sample size, and the number of trials alongside the result, not the specific number itself.

## Structuring the repo and README

```text
qresearch/
  README.md
  pyproject.toml
  conf/config.yaml
  src/qresearch/
  tests/
  outputs/          # gitignored — generated, not committed
```

A README that does its job, in order:

1. **What it does** — one paragraph: loads prices, computes a momentum signal, backtests a long/short portfolio.
2. **Architecture** — the three-layer split from the kickoff, in two or three sentences.
3. **How to run it** — one command (`python -m qresearch.run`), stating any config overrides.
4. **How to test it** — `pytest`, and what the suite actually checks.
5. **Benchmark methodology and results** — the table above, with your real numbers filled in.
6. **Known limitations** — what is out of scope, stated plainly rather than discovered by the reader.

## Talking about it in an interview

- Walk through the **architecture** top-down — data, computation, reporting — rather than narrating files in the order you wrote them.
- Lead with a **design decision and the reason for it**: "I profiled first and only compiled the rolling z-score with Numba, because that's what the profiler actually flagged" is a stronger sentence than "I used Numba."
- Be upfront about **scope**. "I deliberately left out live trading and a multi-asset universe to keep this one pipeline correct and well-tested" reads as judgment, not as a gap.
- Be ready to **run the tests and the benchmark live** if asked. A project you can only describe is a weaker signal than one you can demonstrate.

## What this course covered

- **High-performance NumPy & pandas** — vectorization, broadcasting, MultiIndex and time series, large datasets, Parquet/Arrow, Polars.
- **Numerical computing** — floating-point stability, SciPy, linear algebra, integration and root-finding, reproducible random number generation.
- **Profiling & speeding up Python** — profiling tools, algorithmic complexity, Numba, Cython, multiprocessing, and knowing when Python genuinely is too slow.
- **Software engineering for research** — OOP for quant code, type hints, testing numerical code, packaging, logging and reproducibility.
- **Research frameworks & tooling** — Jupyter-to-production workflows, experiment tracking, a research data layer, market data APIs, scheduling.
- **Databases & data access for quants** — SQL for time series, columnar and time-series databases, kdb+/q, caching and pipelines.
- **This capstone** — all of it, in one small, correctly-tested, reproducible library.

## Key terms

| Term | Meaning |
|---|---|
| Benchmark methodology | Baseline, sample size, and trial count stated alongside a performance number, so it can be checked |
| Portfolio project | A repo a reviewer can clone, run, test, and understand from the README alone |
| Scope statement | An explicit, upfront list of what a project does not do, stated as a design choice rather than discovered as a gap |

## Recap

A correct, fast, reproducible pipeline is necessary but not sufficient — the write-up and the benchmark methodology are what let someone else trust it without re-deriving it themselves. You have now gone from "does it run" to "is it fast, correct, and reproducible enough that another engineer could pick it up," which is the actual bar for research engineering work in this field. This also closes the Advanced Python for Quant Research course. The next step in the Quantitative Developer / Researcher path is C++ for Quantitative Developers, where the same instinct for profiling before optimizing carries over into the language most low-latency production trading systems are actually written in.
