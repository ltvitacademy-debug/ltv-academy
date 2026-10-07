# Script — Capstone: Build It

## Segment 1 (title)

In the kickoff you planned qresearch: a data layer, a computation layer, a reporting layer, built to be fast, reproducible, and testable. This lesson writes every file in that skeleton, in order, so by the end you have a small, installable package that actually runs and passes its own tests.

## Segment 2 (code)

Start with pyproject.toml. It names the package, pins the Python version, and lists every dependency explicitly — numpy, pandas, numba, hydra, pyarrow for the core, pytest and duckdb for development. That one file is what makes "pip install dash e dot" work, and it's what stops a project from quietly depending on something nobody wrote down.

## Segment 3 (code)

The data layer has two jobs only: load prices from Parquet, and turn prices into returns with pct_change. The signal is where vectorization earns its keep. A momentum signal needs a trailing compounded return, and the naive way calls dot apply once per window. Instead, convert to log returns first — now a rolling sum replaces a rolling product, and the whole thing runs in pandas' compiled code with no per-window Python call at all.

## Segment 4 (code)

A rolling z-score is the one calculation that doesn't have a clean vectorized form, because at every point it needs a trailing mean and standard deviation computed fresh. That's the hot path profiling would flag, so it's the one function wrapped in Numba's njit — everything else in the package stays plain vectorized pandas and NumPy.

## Segment 5 (code)

The backtest ranks the signal cross-sectionally each day, goes long the top quantile and short the bottom quantile, and then applies yesterday's weights to today's return with a shift. That lag is what keeps the backtest from trading on information it couldn't have had yet.

## Segment 6 (code)

Hydra reads one config file for the lookback window, the quantile count, the backtest lag, and the seed, so every parameter lives in one place. The run function seeds a NumPy generator, runs the pipeline, logs the seed and the resulting Sharpe ratio, and saves the output. Run it twice with the same config and you get the same logged number and the same file — that's what reproducible actually looks like in code, not just in a plan.

## Segment 7 (code)

The tests check real numbers, not just that the script didn't crash. One test compounds three trailing returns by hand and compares it to the signal function's output with assert_allclose, because the log-sum-exp path and the manual product are mathematically equal but not bit-identical. Another checks that the rolling z-score has exactly window-minus-one missing values at the start, which is exactly what should happen before a full window exists.

## Segment 8 (outro)

Every file from the skeleton now exists and the tests pass. Next lesson, we turn this into something you can actually hand to a reviewer.
