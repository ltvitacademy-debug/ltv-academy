# Building a Research Data Layer

Every research codebase accumulates the same bad habit: a path like `C:/data/vendor_dump/aapl_2024.parquet` hardcoded into a dozen notebooks and scripts. The day that file moves, gets renamed, or gets replaced by a database query, every one of those call sites breaks, and worse, if two of them handled column names or timezones slightly differently, you get two different answers from "the same" data. A **research data layer** is a thin, deliberate boundary that hides all of that behind one stable interface, so research code asks for data by meaning (`load_prices("SP500", start, end)`), not by file path.

## What you'll learn

- Why hardcoded paths and ad-hoc file reads spread the same fragility across every script that touches data
- Designing a stable interface (`load_prices(universe, start, end)`) that hides the messy source behind it
- Caching reads so a stable interface doesn't mean a slow one
- Schema/contract consistency: enforcing consistent column names, dtypes, and timezone handling across sources
- A real, runnable example building a tiny data layer over a synthetic Parquet file

## The problem with direct reads everywhere

If ten notebooks each do their own `pd.read_parquet("C:/data/aapl.parquet")`, changing the source — a new vendor, a new column name, a new storage location — means finding and fixing ten call sites, and any two of them that handle the raw data's quirks (timezone, column casing, missing values) even slightly differently will silently disagree. The fix isn't "be consistent by discipline" — it's writing the loading and normalization logic exactly once, behind a function every script calls instead.

## Designing the interface

A good data-layer function reads like a sentence describing what you want, not how to get it: `load_prices(universe, start, end)`, `load_fundamentals(ticker, as_of)`, `load_universe(date)`. The caller never sees — and never needs to care — whether the underlying source is a CSV, a Parquet file, a REST API, or a database table. That indirection is the entire point: the source can change without touching a single line of research code built on top of it, as long as the function's output contract (column names, dtypes, what a row means) stays the same.

## Caching reads

Because every caller goes through the same function now, caching becomes trivial and high-leverage: cache once, and every caller benefits, instead of each script re-reading the same file redundantly. `functools.lru_cache` is the simplest version — fine for a single research session where the same `(universe, start, end)` combination gets requested repeatedly:

```python
import functools

@functools.lru_cache(maxsize=32)
def load_prices(universe: str, start: str, end: str) -> pd.DataFrame:
    ...
```

The cache key is the function's arguments, so `load_prices("AAPL", "2024-01-01", "2024-02-01")` only hits disk once no matter how many times it's called with those exact arguments in the same process — later in this chapter (lesson 31) you'll see disk-based caching for when the cache needs to survive across process restarts.

## Schema and contract consistency

The part of a data layer that pays off most is the part nobody notices when it's working: every source normalized to the *same* contract, regardless of what the raw source looked like. A vendor file might call the date column `Date` and store it timezone-aware in US Eastern; another source might call it `trade_date` and store it as a naive UTC timestamp. The data layer's job is to resolve that once — lowercase column names, a single consistent timezone handling rule, consistent dtypes — so code built on `load_prices()` never has to special-case which source a row originally came from.

## A tiny real data layer

```python
import functools
from pathlib import Path
import pandas as pd
import numpy as np

DATA_DIR = Path("data")

@functools.lru_cache(maxsize=32)
def load_prices(universe: str, start: str, end: str) -> pd.DataFrame:
    """Stable interface: callers never see the Parquet path, column names,
    or timezone handling of the underlying source file."""
    path = DATA_DIR / f"{universe.lower()}.parquet"
    df = pd.read_parquet(path)
    # contract: lowercase columns, tz-naive UTC dates, sorted, filtered
    df = df.rename(columns={"Date": "date", "Symbol": "symbol", "ClosePx": "close"})
    df["date"] = df["date"].dt.tz_convert("UTC").dt.tz_localize(None)
    df = df.sort_values("date")
    mask = (df["date"] >= start) & (df["date"] <= end)
    return df.loc[mask].reset_index(drop=True)

out = load_prices("AAPL", "2024-01-02", "2024-01-05")
print(out)
# 0 2024-01-02 05:00:00   AAPL  190.25
# 1 2024-01-03 05:00:00   AAPL  189.74
# 2 2024-01-04 05:00:00   AAPL  191.28
print(out.dtypes.to_dict())
# {'date': dtype('<M8[ns]'), 'symbol': dtype('O'), 'close': dtype('float64')}

print("cache info:", load_prices.cache_info())
# cache info: CacheInfo(hits=0, misses=1, maxsize=32, currsize=1)
_ = load_prices("AAPL", "2024-01-02", "2024-01-05")  # same args -> cache hit
print("cache info after repeat call:", load_prices.cache_info())
# cache info after repeat call: CacheInfo(hits=1, misses=1, maxsize=32, currsize=1)
```

Notice what the caller never had to know: the raw file had columns named `Date`/`Symbol`/`ClosePx`, and the raw timestamps were timezone-aware in US Eastern. The contract `load_prices` promises — `date`/`symbol`/`close`, tz-naive, sorted — is what every downstream script can rely on, regardless of whether tomorrow's version of this function reads from Parquet, a REST API, or a database. The `cache_info()` call confirms the second identical call was a genuine cache hit rather than a second disk read.

## Key terms

| Term | Meaning |
|---|---|
| Research data layer | A function-based interface that hides the source (file/API/DB) behind a stable contract |
| Schema/contract consistency | Every data source normalized to the same column names, dtypes, and timezone handling |
| `functools.lru_cache` | In-memory cache keyed on function arguments; avoids redundant reads within one process |
| Cache hit / miss | Whether a call's arguments were already cached (hit) or had to be recomputed/reloaded (miss) |

## Recap

A thin data-access layer — functions like `load_prices(universe, start, end)` instead of scattered file paths — hides the messy source behind a stable interface, enforces consistent schema and timezone handling across sources, and is the natural place to add caching once. Next lesson: the real-world realities of pulling data from market data vendors and APIs — rate limits, pagination, retries, and the point-in-time pitfalls that a data layer alone doesn't solve.
