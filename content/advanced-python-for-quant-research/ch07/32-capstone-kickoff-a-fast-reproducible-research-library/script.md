# Script — Capstone Kickoff: A Fast, Reproducible Research Library

## Segment 1 (title)

Six chapters have each handed you one capability: vectorized NumPy and pandas, numerical computing, profiling and speedups, software engineering practices, research tooling, and database access. The capstone is where those stop being six separate skills and become one piece of work. You're going to build a small but real research library, the kind of thing a quant researcher keeps in a repo and reuses. This lesson is the kickoff.

## Segment 2 (steps)

The project is `qresearch`, a small package that takes a panel of historical prices, computes one factor signal, turns it into a long-short portfolio, and backtests it. It has to meet three standards. Fast means the core math is vectorized, with Numba reserved for the one rolling calculation that profiling actually shows as the hot path. Reproducible means every run is driven by a config file, any randomness is seeded, and the run's parameters and results get logged. Testable means a pytest suite checks the numbers against hand-computed expected values with assert_allclose, not just "it ran without crashing."

## Segment 3 (steps)

The architecture has three layers, and they only talk to each other in one direction. The data layer loads prices from Parquet and turns them into returns, and knows nothing about signals. The computation layer turns returns into a signal, and the signal into backtested returns — that's where the vectorized code and the Numba hot path live. The reporting layer takes that output and produces what a human or a test actually looks at.

## Segment 4 (steps)

Scope matters as much as architecture. In scope: one price panel, one momentum-style signal, one long-short backtest, one Numba-accelerated rolling calculation, a pytest suite, a Hydra config, logging, and one SQL-based path for ad-hoc exploration. Out of scope: multiple asset classes, live trading, a web UI, hyperparameter search, a multi-strategy portfolio. If you catch yourself building any of those, note it as future work instead.

## Segment 5 (code)

Here's the skeleton you'll fill in next lesson. A pyproject.toml makes the package installable. A config file under conf is the single source of truth for a reproducible run. Three modules — data, signals, backtest — are the three architecture layers, plus a run module as the Hydra entry point. And a tests folder is where correctness gets checked, not assumed.

## Segment 6 (outro)

That's the brief, the requirements, and the plan. Next lesson, we write every file in that skeleton.
