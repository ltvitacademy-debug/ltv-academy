# Working With Large Datasets

At some point a CSV or a tick-level dataset is simply too big to comfortably sit in memory as a single pandas DataFrame. Before reaching for a different tool entirely, there are three things worth trying: reading the file in chunks, shrinking each column's dtype, and measuring memory usage honestly instead of guessing. This lesson covers all three, plus a sense of where the out-of-core line actually sits.

## What you'll learn

- Chunked reading with `read_csv(chunksize=...)`
- Why `.memory_usage(deep=True)` is the honest way to measure a DataFrame's footprint
- Downcasting numeric dtypes and converting repeated strings to `category`
- How much those changes typically save, and why
- When to stop optimizing pandas and go out-of-core instead

## Measuring memory honestly first

`df.info()` and `df.memory_usage()` both understate the size of a DataFrame with `object` columns (plain Python strings), because they report the size of the pointers, not the strings themselves. `deep=True` walks the actual objects:

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "ticker": np.random.choice(["AAPL", "MSFT", "GOOGL"], 500_000),
    "price": np.random.uniform(10, 500, 500_000).astype(np.float64),
    "qty": np.random.randint(1, 1000, 500_000).astype(np.int64),
})

print(df.memory_usage(deep=False).sum() / 1e6, "MB")  # understates object columns
print(df.memory_usage(deep=True).sum() / 1e6, "MB")    # the real number
```

Always measure with `deep=True` before deciding a DataFrame is "too big" — the naive number can be off by a wide margin whenever strings are involved.

## Chunked reading

`pd.read_csv(..., chunksize=N)` returns an iterator of DataFrames instead of loading the whole file at once. You process each chunk and accumulate only what you need, never holding the full file in memory:

```python
totals = {}
for chunk in pd.read_csv("trades_2025.csv", chunksize=250_000):
    grp = chunk.groupby("ticker")["notional"].sum()
    for ticker, val in grp.items():
        totals[ticker] = totals.get(ticker, 0) + val

result = pd.Series(totals).sort_values(ascending=False)
```

This pattern — reduce each chunk, merge the partial results — works for sums, counts, and running statistics. It does not work directly for operations that need the whole dataset at once, like an exact median or a full sort; those either need an out-of-core tool or an approximation.

## Downcasting numeric dtypes

pandas defaults to `int64`/`float64` even when the actual values fit in far fewer bytes. `pd.to_numeric(..., downcast=...)` picks the smallest dtype that still holds every value without loss:

```python
qty_small = pd.to_numeric(df["qty"], downcast="integer")   # int64 -> int16, if it fits
price_small = pd.to_numeric(df["price"], downcast="float") # float64 -> float32

print(df["qty"].dtype, "->", qty_small.dtype)   # int64 -> int16
print(df["qty"].memory_usage(deep=True) / 1e6, qty_small.memory_usage(deep=True) / 1e6)
```

`downcast="float"` to `float32` trades some precision for roughly half the memory — fine for a quantity or a price used in aggregate reporting, often not fine for a calculation sensitive to rounding (more on that trade-off in Chapter 2's floating-point lesson).

## The `category` dtype

A column with a small number of repeated string values — tickers, exchange codes, sectors — wastes enormous memory as `object`, because pandas stores a full Python string per row. `category` dtype stores each unique value once and represents every row as a small integer code pointing at it:

```python
df["ticker"] = df["ticker"].astype("category")
print(df["ticker"].memory_usage(deep=True) / 1e6, "MB")  # dramatically smaller
print(df["ticker"].cat.categories)   # Index(['AAPL', 'GOOGL', 'MSFT'])
```

With three distinct tickers over 500,000 rows, the savings are typically 90%+ versus the `object` column, since pandas now stores three strings plus 500,000 small integers rather than 500,000 full strings. `category` is the single highest-leverage, lowest-risk memory optimization available for this kind of column — it's also faster to `groupby` on, since comparisons become integer comparisons.

## Putting it together

```python
def shrink(df):
    df = df.copy()
    for col in df.select_dtypes("int64").columns:
        df[col] = pd.to_numeric(df[col], downcast="integer")
    for col in df.select_dtypes("float64").columns:
        df[col] = pd.to_numeric(df[col], downcast="float")
    for col in df.select_dtypes("object").columns:
        if df[col].nunique() / len(df) < 0.5:   # repeated values -> category
            df[col] = df[col].astype("category")
    return df

before = df.memory_usage(deep=True).sum()
df = shrink(df)
after = df.memory_usage(deep=True).sum()
print(f"{before/1e6:.1f} MB -> {after/1e6:.1f} MB")
```

The `nunique() / len(df) < 0.5` check is a rough heuristic — don't convert a column to `category` if nearly every value is unique (like an order ID), since that adds overhead with no savings.

## When to go out-of-core

These techniques buy you a meaningful multiplier — often 3-10x less memory — but they don't change the fundamental limit: the data still has to fit in RAM at some point. When even a downcast, categorized DataFrame doesn't fit, or when you need operations across the *whole* dataset that chunking can't easily approximate (an exact sort, a full join, an exact quantile), it's time to reach for a tool built for out-of-core or distributed data: Polars' lazy engine (Lesson 6), DuckDB, or a proper distributed framework. The rule of thumb: try chunking and dtype shrinking first, because they're nearly free; reach for a different engine when the data is still too big after that, not before.

## Key terms

| Term | Meaning |
|---|---|
| `chunksize` | `read_csv` parameter that returns an iterator of smaller DataFrames instead of one giant one |
| `.memory_usage(deep=True)` | Reports true memory use, including the actual contents of object (string) columns |
| Downcasting | Converting a numeric column to the smallest dtype that still holds every value |
| `category` dtype | Stores unique values once plus integer codes per row; large savings for repeated strings |
| Out-of-core | Processing data too large for RAM by never holding it all in memory at once |

## Recap

Before assuming a dataset needs a bigger machine or a different tool, measure its real memory footprint with `deep=True`, then try chunked reading, numeric downcasting, and the `category` dtype for repeated strings — together these often cut memory use by 3-10x for free. Only once that's not enough should you reach for an out-of-core engine. Next lesson: Parquet and Arrow, the storage formats that make loading large datasets fast in the first place.
