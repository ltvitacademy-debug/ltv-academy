# Parquet, Arrow & Efficient Storage

CSV is a row-oriented text format: slow to parse, with no type information, and no way to read part of a file without reading all of it. Parquet is the columnar alternative quant workflows have mostly standardized on, and Arrow is the in-memory format that makes moving Parquet data into pandas or Polars fast and (often) copy-free. This lesson covers why columnar storage helps, how to read and write Parquet from pandas, and the storage knobs — column pruning, predicate pushdown, and compression — that make it efficient in practice.

## What you'll learn

- Row-oriented vs. columnar storage, and why columnar wins for analytical queries
- Where `pyarrow` fits between pandas and the Parquet file on disk
- `to_parquet` / `read_parquet`, and reading only the columns or rows you need
- Compression codecs (snappy vs. zstd) and the trade-offs between them
- Rough size and speed comparisons against CSV

## Row-oriented vs. columnar

A CSV (or a row-oriented database table) stores every field of row 1, then every field of row 2, and so on. To compute the average of one column, you still have to read past every other column, row by row. Parquet stores all the values of column 1 together, then all the values of column 2, and so on. Reading one column means reading one contiguous block — everything else on disk can be skipped entirely.

This matters enormously for quant workloads, which are usually "read a few columns (price, volume) out of a wide table, across many rows" rather than "read every column of one row." Columnar storage is built for exactly that access pattern.

## Where pyarrow fits

`pyarrow` is the library that implements the Arrow in-memory format and reads/writes Parquet files. pandas uses it under the hood for `to_parquet`/`read_parquet` (it's required as a dependency for Parquet support), and Polars uses Arrow as its native memory format — which is part of why converting between pandas and Polars, or between either and a Parquet file, is often cheap: the data doesn't need to be reshaped, just reinterpreted.

```python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    "date": pd.date_range("2025-01-01", periods=1_000_000, freq="min"),
    "ticker": np.random.choice(["AAPL", "MSFT", "GOOGL"], 1_000_000),
    "price": np.random.uniform(10, 500, 1_000_000),
    "volume": np.random.randint(100, 100_000, 1_000_000),
})

df.to_parquet("ticks.parquet", engine="pyarrow", compression="snappy")
```

## Reading only what you need: column pruning and predicate pushdown

`read_parquet` can take a `columns` argument, which skips reading the other columns' data blocks entirely rather than reading everything and dropping columns afterward — this is **column pruning**:

```python
prices_only = pd.read_parquet("ticks.parquet", columns=["date", "ticker", "price"])
```

For row-level filtering, `filters` pushes a predicate down into the Parquet reader itself, using Parquet's per-row-group statistics to skip entire chunks of the file that can't possibly match — **predicate pushdown**:

```python
aapl_only = pd.read_parquet(
    "ticks.parquet",
    columns=["date", "price"],
    filters=[("ticker", "==", "AAPL")],
)
```

Both techniques avoid work rather than doing the work faster: the goal is to never read bytes you don't need in the first place. This is the single biggest practical reason Parquet outperforms CSV for analytical queries — CSV has no way to skip anything without reading the whole file first.

## Compression codecs

Parquet compresses each column's data block, and you choose the codec. The two most common:

- **snappy** (the default in most tools) — fast to compress and decompress, modest compression ratio. Good default when you'll read the file often and want minimal CPU overhead on read.
- **zstd** — slower to compress, but a noticeably better compression ratio, and still fast to decompress. Good choice when storage size or network transfer matters more than write-time CPU.

```python
df.to_parquet("ticks_zstd.parquet", engine="pyarrow", compression="zstd")
```

There's no universally "right" choice — it's a trade-off between file size and CPU time, and for most quant research workloads (write once, read many times), either is a reasonable default; reach for `zstd` specifically when disk or egress cost is the binding constraint.

## Rough comparison against CSV

On a dataset like the million-row tick table above, a reasonable mental model (actual numbers vary by data and codec):

- File size: Parquet with snappy or zstd compression is typically 3-10x smaller than the equivalent CSV, because compression works much better on columnar, type-aware data than on repeated text.
- Read speed: reading all columns of a Parquet file is typically several times faster than parsing the equivalent CSV, because there's no text parsing to do — values are already stored in binary, typed form. Reading a subset of columns via column pruning is faster still.
- Write speed: writing Parquet is usually comparable to or a bit slower than CSV, since it involves a compression pass — this is almost always worth it for data you'll read more than once.

## Key terms

| Term | Meaning |
|---|---|
| Columnar storage | Storing all values of one column contiguously, rather than one row at a time |
| Arrow | The in-memory columnar format pandas (via pyarrow) and Polars both can use |
| Column pruning | Reading only the requested columns, skipping the rest on disk |
| Predicate pushdown | Filtering rows during the read itself, using file-level statistics to skip non-matching chunks |
| snappy / zstd | Compression codecs; snappy favors speed, zstd favors smaller files |

## Recap

Parquet's columnar layout, combined with column pruning and predicate pushdown, lets you read only the bytes you actually need — the opposite of CSV, which must be read start to finish regardless of what you want out of it. Arrow is the shared in-memory format that makes this data cheap to move between pandas, Polars, and disk. Next lesson: Polars itself, and when its lazy, Arrow-native engine is worth reaching for over pandas.
