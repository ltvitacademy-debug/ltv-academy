# Capstone: Build It

In the kickoff you planned `qresearch`: a data layer, a computation layer, a reporting layer, wired together to be fast, reproducible, and testable. This lesson writes every file in that skeleton, in order. Follow along and you will end with a small, installable package that loads prices, computes a signal, backtests it, logs the run, and passes its own tests.

## What you'll learn

- How to lay out an installable package with `pyproject.toml`
- How to write a vectorized data-loading layer over Parquet
- How to write a vectorized factor signal, plus one Numba-accelerated rolling calculation as the hot path
- How to write a lookahead-safe backtest
- How to wire up a Hydra config and basic logging for a reproducible run
- How to test the numerical code with `pytest` and `np.testing.assert_allclose`
- How to add a short SQL-based secondary access path for ad-hoc exploration

## Step 1: the package layout and `pyproject.toml`

```text
qresearch/
  pyproject.toml
  conf/
    config.yaml
  src/
    qresearch/
      __init__.py
      data.py
      signals.py
      backtest.py
      run.py
  tests/
    test_signals.py
```

```toml
# pyproject.toml
[project]
name = "qresearch"
version = "0.1.0"
requires-python = ">=3.10"
dependencies = [
    "numpy>=1.26",
    "pandas>=2.1",
    "numba>=0.59",
    "hydra-core>=1.3",
    "pyarrow>=14.0",
]

[project.optional-dependencies]
dev = ["pytest>=8.0", "duckdb>=0.10"]

[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
```

`pyproject.toml` is the single file that makes the package installable (`pip install -e .`) and makes its dependencies explicit — no more "works on my machine" because of an untracked `pip install` someone ran once.

## Step 2: the data layer

`data.py` has exactly two responsibilities: load prices, and turn prices into returns. Nothing about signals belongs here.

```python
# src/qresearch/data.py
from pathlib import Path
import pandas as pd


def load_prices(path: str | Path) -> pd.DataFrame:
    """Load a wide price panel (dates as the index, one column per ticker)."""
    prices = pd.read_parquet(path)
    return prices.sort_index()


def to_returns(prices: pd.DataFrame) -> pd.DataFrame:
    """Simple daily returns, vectorized across every column at once."""
    return prices.pct_change().dropna(how="all")
```

Reading Parquet instead of CSV matters at research scale: Parquet is columnar and typed, so `pd.read_parquet` reads only the bytes it needs and never has to guess a column's dtype the way `read_csv` does.

## Step 3: the vectorized signal

A trailing-return momentum signal is the classic "don't reach for a loop" case. The naive approach multiplies trailing prices together with `.rolling().apply()`, which calls a Python function once per window — not vectorized. The fix: convert to log returns first, so a rolling **sum** replaces a rolling **product**, and `.rolling().sum()` runs entirely in pandas' compiled code.

```python
# src/qresearch/signals.py
import numpy as np
import pandas as pd


def momentum_signal(returns: pd.DataFrame, lookback: int = 60) -> pd.DataFrame:
    """Trailing cumulative return over `lookback` days, fully vectorized.

    Uses log1p/expm1 so a rolling sum replaces what would otherwise be a
    rolling product computed one window at a time with .apply().
    """
    log_returns = np.log1p(returns)
    cum_log_returns = log_returns.rolling(lookback).sum()
    return np.expm1(cum_log_returns)
```

## Step 4: the one Numba hot path

A rolling z-score has no clean vectorized pandas equivalent once you want it computed against a *trailing* mean and standard deviation at every point — `.rolling().apply()` would call Python once per row. This is the one calculation profiling (Chapter 3) flags as the hot path, so it is the one calculation worth hand-compiling:

```python
# src/qresearch/signals.py (continued)
from numba import njit


@njit(cache=True)
def _rolling_zscore(values: np.ndarray, window: int) -> np.ndarray:
    n = values.shape[0]
    out = np.full(n, np.nan)
    for i in range(window - 1, n):
        w = values[i - window + 1 : i + 1]
        mu = w.mean()
        sd = w.std()
        if sd > 0:
            out[i] = (values[i] - mu) / sd
    return out


def rolling_zscore(series: pd.Series, window: int = 60) -> pd.Series:
    """Numba-accelerated rolling z-score — the toolkit's one hot path."""
    z = _rolling_zscore(series.to_numpy(dtype=np.float64), window)
    return pd.Series(z, index=series.index, name=f"{series.name}_z")
```

Everything else in the package stays plain vectorized pandas/NumPy. One hot path, one `@njit`, exactly as planned in the kickoff.

## Step 5: the backtest, without lookahead

Portfolio weights are ranked cross-sectionally each day; the backtest then applies **yesterday's** weights to **today's** return, so the signal never trades on information it could not have had at the time.

```python
# src/qresearch/backtest.py
import numpy as np
import pandas as pd


def long_short_weights(signal: pd.DataFrame, n_quantiles: int = 5) -> pd.DataFrame:
    """Equal-weight long the top quantile, short the bottom quantile, per day."""
    ranks = signal.rank(axis=1, pct=True)
    long = ranks >= (1 - 1 / n_quantiles)
    short = ranks <= (1 / n_quantiles)

    weights = pd.DataFrame(0.0, index=signal.index, columns=signal.columns)
    weights[long] = 1.0 / long.sum(axis=1).replace(0, np.nan).to_numpy()[:, None]
    weights[short] = -1.0 / short.sum(axis=1).replace(0, np.nan).to_numpy()[:, None]
    return weights.fillna(0.0)


def backtest_returns(weights: pd.DataFrame, returns: pd.DataFrame, lag: int = 1) -> pd.Series:
    """Apply (lagged) weights to returns so the backtest can't look ahead."""
    pnl = (weights.shift(lag) * returns).sum(axis=1)
    return pnl.rename("strategy_return")
```

## Step 6: config, logging, and a reproducible entry point

Hydra reads `conf/config.yaml`, so every parameter in the pipeline — the lookback window, the number of quantiles, the backtest lag, the seed — lives in one file instead of scattered through code:

```yaml
# conf/config.yaml
data:
  prices_path: data/prices.parquet
signal:
  lookback: 60
  n_quantiles: 5
backtest:
  lag: 1
seed: 7
```

```python
# src/qresearch/run.py
import logging
import hydra
import numpy as np
from omegaconf import DictConfig

from qresearch.data import load_prices, to_returns
from qresearch.signals import momentum_signal
from qresearch.backtest import long_short_weights, backtest_returns

log = logging.getLogger(__name__)


@hydra.main(config_path="../../conf", config_name="config", version_base=None)
def run(cfg: DictConfig) -> None:
    rng = np.random.default_rng(cfg.seed)  # reserved for any sampling steps
    prices = load_prices(cfg.data.prices_path)
    returns = to_returns(prices)

    signal = momentum_signal(returns, lookback=cfg.signal.lookback)
    weights = long_short_weights(signal, n_quantiles=cfg.signal.n_quantiles)
    pnl = backtest_returns(weights, returns, lag=cfg.backtest.lag)

    sharpe = pnl.mean() / pnl.std()
    log.info("lookback=%d quantiles=%d seed=%d -> daily Sharpe %.3f",
              cfg.signal.lookback, cfg.signal.n_quantiles, cfg.seed, sharpe)
    pnl.to_frame().to_parquet("outputs/pnl.parquet")


if __name__ == "__main__":
    run()
```

Two runs with the same `config.yaml` now produce the same logged Sharpe ratio and the same `pnl.parquet` — that is what "reproducible" means in practice, not just in the plan from last lesson.

## Step 7: tests that check the math, not just that it runs

```python
# tests/test_signals.py
import numpy as np
import pandas as pd
from numpy.testing import assert_allclose

from qresearch.signals import momentum_signal, rolling_zscore


def test_momentum_signal_matches_manual_compounding():
    idx = pd.date_range("2024-01-01", periods=5, freq="D")
    rets = pd.DataFrame({"AAA": [0.01, 0.02, -0.01, 0.015, 0.0]}, index=idx)

    out = momentum_signal(rets, lookback=3)
    manual = (1.01 * 1.02 * 0.99) - 1  # compounding the first 3 trailing returns by hand

    assert_allclose(out["AAA"].iloc[2], manual, rtol=1e-10)


def test_rolling_zscore_has_expected_nan_count_and_shape():
    s = pd.Series(np.arange(10, dtype=float))
    z = rolling_zscore(s, window=4)

    assert z.isna().sum() == 3   # window - 1 rows can't have a full window yet
    assert z.shape == s.shape
```

`assert_allclose` rather than `==` matters here: the log1p/expm1 path and the manual product are mathematically equivalent but not bit-identical, since each does its floating-point rounding in a different order (Chapter 2).

## Step 8: a secondary access path with SQL

Suppose the same price history is also available in long form — one row per `(date, ticker, price)`, a common shape for ad-hoc exploration. A short DuckDB query gets an answer without touching the pandas pipeline at all:

```python
import duckdb

def average_daily_return_sql(path: str):
    """Secondary access path: ad-hoc SQL directly against a long-format Parquet file."""
    query = f"""
        SELECT ticker, AVG(ret) AS avg_daily_return
        FROM (
            SELECT ticker,
                   price / LAG(price) OVER (PARTITION BY ticker ORDER BY date) - 1 AS ret
            FROM read_parquet('{path}')
        )
        GROUP BY ticker
        ORDER BY avg_daily_return DESC
    """
    return duckdb.connect().execute(query).df()
```

This is the Chapter 6 skill set — SQL window functions over columnar storage — kept as a lightweight second door into the same data, for a quick check that doesn't justify spinning up the full pandas pipeline.

## Key terms

| Term | Meaning |
|---|---|
| Lookahead bias | Letting a backtest use information not actually available at that point in time; avoided here by lagging weights |
| Hot path | The one calculation, found by profiling, that justifies hand-compiling with Numba instead of staying in pandas |
| `assert_allclose` | A test assertion for floating-point results that are mathematically equal but not bit-identical |
| Config-driven run | A pipeline whose parameters live in one file (here, Hydra's `config.yaml`), not scattered through code |

## Recap

Every file from the kickoff's skeleton now exists: a data layer that loads Parquet and computes returns, a vectorized signal with one Numba-accelerated hot path, a lookahead-safe backtest, a Hydra-driven and logged entry point, a pytest suite that checks real numbers, and a SQL-based secondary path for quick exploration. Next lesson: turning this into something you can actually hand to a reviewer.
