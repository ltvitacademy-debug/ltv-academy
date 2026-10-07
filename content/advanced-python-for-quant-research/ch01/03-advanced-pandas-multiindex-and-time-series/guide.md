# Advanced pandas: MultiIndex & Time Series

Quant datasets are rarely a single flat table — you more often have a panel of (date, ticker) observations, or returns at the (sector, ticker) level. pandas handles that naturally with a **MultiIndex**: a hierarchical row (or column) label made of two or more levels. This lesson covers building and slicing a MultiIndex, combining it with `groupby`, and the time-series tools — `resample`, `rolling`, timezone handling, and business-day offsets — that quant workflows lean on constantly.

## What you'll learn

- Building a MultiIndex with `set_index` and `pd.MultiIndex.from_product`
- Slicing with `.loc`, `.xs`, and `swaplevel`
- `groupby` on one or more index levels
- `resample` vs. `rolling`, and when each is the right tool
- Timezone-aware timestamps and `tz_localize`/`tz_convert`
- `DateOffset` and `BusinessDay` for calendar-aware date arithmetic

## Building a MultiIndex

The most common path is `set_index` on two or more columns of a long/tidy DataFrame:

```python
import pandas as pd
import numpy as np

dates = pd.date_range("2025-01-02", periods=3, freq="B")
tickers = ["AAPL", "MSFT"]
idx = pd.MultiIndex.from_product([dates, tickers], names=["date", "ticker"])
panel = pd.DataFrame({"ret": np.random.normal(0, 0.01, len(idx))}, index=idx)
print(panel)
#                        ret
# date       ticker
# 2025-01-02 AAPL   -0.0032
#            MSFT    0.0041
# 2025-01-03 AAPL    0.0088
#            MSFT   -0.0012
# 2025-01-06 AAPL    0.0021
#            MSFT    0.0057
```

`from_product` is the right tool when you already know every combination (every date crossed with every ticker). Starting from a long DataFrame, `df.set_index(["date", "ticker"])` builds the same shape from real observations instead.

## Slicing a MultiIndex

`.loc` with a tuple selects an exact combination; a partial tuple selects everything under that outer level:

```python
print(panel.loc[("2025-01-02", "AAPL")])     # single row, as a Series
print(panel.loc["2025-01-02"])               # both tickers on that date
```

`.xs` ("cross-section") selects on an inner level without needing a tuple for the outer ones, and can drop the selected level from the result:

```python
aapl_only = panel.xs("AAPL", level="ticker")
print(aapl_only)
#              ret
# date
# 2025-01-02 -0.0032
# 2025-01-03  0.0088
# 2025-01-06  0.0021
```

`swaplevel` reorders the index levels — useful when you built `(date, ticker)` but need `(ticker, date)` for a per-ticker time series operation, and `sort_index()` afterward keeps lookups fast:

```python
by_ticker = panel.swaplevel("date", "ticker").sort_index()
print(by_ticker.loc["AAPL"])   # now a clean per-ticker time series
```

## groupby with a MultiIndex

`groupby(level=...)` aggregates by one or more index levels directly, no column reset required:

```python
daily_mean = panel.groupby(level="date")["ret"].mean()
per_ticker_vol = panel.groupby(level="ticker")["ret"].std()
```

This is the MultiIndex equivalent of `GROUP BY date` or `GROUP BY ticker` in SQL — you're aggregating rows that share a level value, without flattening the index first.

## resample vs. rolling

Both operate over time, but they answer different questions. **`resample`** changes the *frequency* of the data — converting daily observations to weekly or monthly ones, with an aggregation to collapse each new bucket. **`rolling`** keeps the same frequency but computes a statistic over a sliding window of the existing rows.

```python
prices = pd.Series(
    np.cumprod(1 + np.random.normal(0, 0.01, 60)) * 100,
    index=pd.date_range("2025-01-02", periods=60, freq="B"),
)

weekly_close = prices.resample("W-FRI").last()     # down to weekly frequency
rolling_20d_vol = prices.pct_change().rolling(20).std()  # still daily, 20-day window
```

Use `resample` when you want fewer, coarser rows out the other end (daily → weekly close). Use `rolling` when you want the same number of rows, each annotated with a trailing-window statistic (20-day rolling volatility at every daily point).

## Timezone-aware timestamps

A naive timestamp has no timezone attached; `tz_localize` attaches one, and `tz_convert` reinterprets an already-aware timestamp in a different zone:

```python
ts = pd.Timestamp("2025-03-10 09:30")
ts_ny = ts.tz_localize("America/New_York")
ts_london = ts_ny.tz_convert("Europe/London")
print(ts_ny, "|", ts_london)
# 2025-03-10 09:30:00-04:00 | 2025-03-10 14:30:00+01:00
```

Mixing naive and timezone-aware timestamps raises an error rather than silently guessing — a deliberate safeguard, since "9:30" means something different in New York and London. Always localize market-data timestamps to their exchange's timezone before comparing across exchanges.

## DateOffset and BusinessDay

`pd.DateOffset` and its specialized subclasses do calendar-aware arithmetic that plain `timedelta` can't — skipping weekends is the most common case:

```python
from pandas.tseries.offsets import BusinessDay

friday = pd.Timestamp("2025-01-03")      # a Friday
print(friday + BusinessDay(1))           # 2025-01-06 -- skips the weekend
print(friday + pd.Timedelta(days=1))     # 2025-01-04 -- a Saturday
```

`freq="B"` in `date_range` uses this same logic to generate business days only. For real trading calendars with holidays, pandas' `CustomBusinessDay` or the `pandas-market-calendars` package layer exchange holiday schedules on top of the same idea.

## Key terms

| Term | Meaning |
|---|---|
| MultiIndex | A hierarchical index made of two or more levels, e.g. (date, ticker) |
| `.xs` | Cross-section selection on a named index level, optionally dropping that level |
| `swaplevel` | Reorders MultiIndex levels without changing the data |
| `resample` | Changes time-series frequency (e.g. daily to weekly) via an aggregation |
| `rolling` | Computes a statistic over a trailing window at the existing frequency |
| `BusinessDay` | A `DateOffset` that skips weekends in date arithmetic |

## Recap

A MultiIndex turns a panel of (date, ticker) observations into something you can slice with `.loc`/`.xs`, reorder with `swaplevel`, and aggregate with `groupby(level=...)` — all without flattening the structure into plain columns. On the time axis, `resample` changes frequency while `rolling` computes trailing-window statistics at the existing frequency, and timezone-aware timestamps plus `BusinessDay` offsets keep calendar arithmetic honest. Next lesson: what happens when your panel is too big to comfortably fit in memory at all.
