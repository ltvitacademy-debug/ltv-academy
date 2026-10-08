# Columnar & Time-Series Databases

Why does a tool like DuckDB, running on your laptop with no server, often outperform a "real" database for analytical queries over historical prices? The answer is storage layout, not raw horsepower: **columnar** storage is built for exactly the access pattern quant research has — read a few columns across millions of rows, aggregate them — while traditional row-oriented databases are built for the opposite pattern. This lesson covers why that distinction matters in practice, with a real timing comparison, and gives an honest overview of purpose-built time-series databases and when a research team would actually reach for one.

## What you'll learn

- Row-oriented (OLTP) vs. columnar (OLAP) storage, and why the difference matters for analytical queries
- Why Parquet and DuckDB fit time-series research workloads specifically well
- Compression and vectorized execution as columnar storage's two practical payoffs
- An honest, qualitative overview of InfluxDB, TimescaleDB, and kdb+ as purpose-built time-series databases
- When a research team would reach for a specialized time-series database vs. just using DuckDB/Parquet

## Row-oriented vs. columnar storage

A traditional relational database (the kind backing a typical application) is usually **row-oriented**: all the columns of one row are stored together on disk, because the typical query is "fetch this one order, with all its fields" — a transactional (OLTP) access pattern. A **columnar** store does the opposite: all the values of one column are stored together, because the typical analytical (OLAP) query is "average the `close` column across ten million rows" — and that query never touches `symbol` or `volume` at all if it doesn't need to. Columnar storage means that kind of query reads *only* the bytes it actually needs, skipping every other column entirely.

## Why this fits time-series research

Quant research is almost entirely OLAP-shaped: "what's the average return by sector," "what's the rolling volatility of this column," "aggregate this metric across this whole date range." It is essentially never "fetch this one specific trade by its ID and update one field" — the OLTP pattern a row store is actually built for. That mismatch is why Parquet (a columnar file format) and DuckDB (a columnar, vectorized SQL engine) show up throughout this chapter: the storage layout matches the actual shape of research queries, not an incidental convenience.

Two concrete payoffs follow from columnar layout:

- **Compression.** Values of the same column, stored together, are far more similar to each other than values across different columns, which standard compression algorithms exploit much better — a column of mostly-similar `price` floats compresses tighter than a row interleaving price, volume, and a string ticker.
- **Vectorized execution.** Because a column's values sit contiguously in memory, the engine can run one SIMD-friendly operation across a whole chunk of them at once, the same way NumPy's vectorized operations beat a Python loop in Chapter 1 — it's the identical idea, one level down, inside the query engine itself.

## A real timing comparison

```python
import time
import duckdb
import pandas as pd
import numpy as np

rng = np.random.default_rng(2)
n = 2_000_000
df = pd.DataFrame({
    "date": pd.date_range("2015-01-01", periods=n, freq="min"),
    "symbol": rng.choice(["AAPL", "MSFT", "GOOG", "AMZN"], n),
    "price": rng.normal(200, 50, n).round(2),
    "volume": rng.integers(100, 10_000, n),
})
df.to_parquet("ticks.parquet")

t0 = time.perf_counter()
result = duckdb.sql("""
    SELECT symbol, AVG(price) AS avg_price, SUM(volume) AS total_volume
    FROM 'ticks.parquet'
    GROUP BY symbol
    ORDER BY symbol
""").df()
duckdb_time = time.perf_counter() - t0
print(result)
print(f"duckdb-on-parquet: {duckdb_time:.4f}s")

t0 = time.perf_counter()
totals = {}
for sym in df["symbol"].unique():
    sub = df[df["symbol"] == sym]
    totals[sym] = (sub["price"].mean(), sub["volume"].sum())
loop_time = time.perf_counter() - t0
print(totals)
print(f"pandas-filter-loop: {loop_time:.4f}s")
```

```text
  symbol   avg_price  total_volume
0   AAPL  200.061036  2.526571e+09
1   AMZN  200.075490  2.521983e+09
2   GOOG  200.052876  2.528301e+09
3   MSFT  200.030286  2.524009e+09
duckdb-on-parquet: 0.0365s
{'AMZN': (200.07549022001714, 2521983313), ...}
pandas-filter-loop: 0.7426s
```

On 2 million rows, querying the Parquet file directly with DuckDB (`0.0365s`) is roughly 20x faster than filtering the DataFrame once per symbol in a Python-level loop (`0.7426s`) — and DuckDB is reading straight from the Parquet file on disk, not even from an in-memory DataFrame. Both the columnar file format and the vectorized `GROUP BY` execution inside DuckDB contribute to that gap; the filter-loop version pays Python-level overhead once per group on top of redundantly re-scanning the whole `symbol` column on every filter.

## Purpose-built time-series databases: an honest overview

DuckDB and Parquet cover a large share of research workloads, but dedicated time-series databases exist for a reason, specifically around high-frequency ingestion and low-latency live queries:

- **InfluxDB** is purpose-built for time-series metrics — originally aimed at infrastructure/IoT monitoring — with native concepts for tags, retention policies, and continuous downsampling of high-frequency data over time.
- **TimescaleDB** is a PostgreSQL extension that adds automatic time-based partitioning ("hypertables") on top of a real relational database, which is attractive if you already need full SQL/transactional features *and* good time-series performance in one system.
- **kdb+** (covered in detail next lesson) is the dominant choice in sell-side and hedge-fund tick-data infrastructure specifically because of its reputation for extremely fast in-memory queries over huge time-series tables, at the cost of a steep learning curve and a specialized, proprietary ecosystem.

## When to reach for one vs. just using DuckDB/Parquet

A research team working with daily or minute-bar data, batch-style analysis, and files that fit comfortably on one machine's disk rarely needs more than DuckDB and Parquet — the setup cost is close to zero and the performance, as the benchmark above shows, is already excellent. The case for a dedicated time-series database shows up when the workload shifts to genuinely high-frequency data arriving continuously (tick-by-tick, not end-of-day), when many concurrent live queries need low-latency answers against data that's still being written, or when the infrastructure needs to serve that data to other systems in real time rather than supporting one researcher's batch analysis. In short: reach for specialized infrastructure when the *ingestion and latency* requirements demand it, not merely because the dataset is large — DuckDB handles "large" just fine, as long as it's not also "continuously arriving and needs sub-second answers."

## Key terms

| Term | Meaning |
|---|---|
| Row-oriented (OLTP) storage | Stores all columns of one row together; built for transactional fetch/update of individual records |
| Columnar (OLAP) storage | Stores all values of one column together; built for aggregating across many rows |
| Vectorized execution | Running one operation across a contiguous chunk of column values at once, inside the query engine |
| InfluxDB / TimescaleDB | Purpose-built time-series databases for high-frequency metrics ingestion and live querying |
| kdb+ | The dominant specialized time-series database in tick-data-heavy financial infrastructure |

## Recap

Columnar storage (Parquet, DuckDB) matches the actual shape of research queries — aggregate a few columns across many rows — which is why it outperforms row-oriented storage and naive Python loops by a wide margin, as the real benchmark showed; dedicated time-series databases like InfluxDB, TimescaleDB, and kdb+ earn their place specifically for high-frequency ingestion and low-latency live querying, not simply for large data. Next lesson: an honest, hands-on look at kdb+ and the q language, the dominant specialized tool in tick-data-heavy financial infrastructure.
