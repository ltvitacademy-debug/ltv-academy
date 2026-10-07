# Polars & Modern DataFrame Tools

Polars is a DataFrame library built in Rust on top of Arrow, designed from the start around multi-threaded execution and query optimization — it did not grow out of a single-threaded design the way pandas did. It is not a drop-in pandas replacement (the API is intentionally different), but for large, column-heavy, filter-and-aggregate workloads it is often dramatically faster. This lesson covers the core `DataFrame`/`LazyFrame` split, the expression API, and an honest comparison of when Polars earns its place next to pandas.

## What you'll learn

- `pl.DataFrame` (eager) vs. `pl.LazyFrame` (deferred, optimized)
- The expression API: `pl.col`, chaining, `select`/`filter`/`with_columns`/`group_by`
- How lazy evaluation lets Polars optimize a whole query before running any of it
- Reading large files lazily with `scan_parquet` / `scan_csv`
- Honest trade-offs: where Polars wins, and where pandas is still the better fit

## DataFrame vs. LazyFrame

`pl.DataFrame` runs every operation immediately, like pandas. `pl.LazyFrame` instead builds a **query plan** — a description of the work — and does nothing until you call `.collect()`. The difference matters because a plan can be optimized as a whole before any of it runs:

```python
import polars as pl

df = pl.DataFrame({
    "ticker": ["AAPL", "MSFT", "AAPL", "GOOGL", "MSFT"],
    "price": [227.5, 418.2, 229.1, 171.4, 420.0],
    "volume": [1200, 800, 950, 2100, 760],
})

lazy = df.lazy().filter(pl.col("price") > 200).select(["ticker", "price"])
print(lazy.explain())   # shows the optimized plan, nothing has executed yet
result = lazy.collect()  # now it actually runs
```

Any eager `pl.DataFrame` can become lazy with `.lazy()`, and any `LazyFrame` becomes eager with `.collect()`. For reading from disk, `pl.scan_parquet(...)` and `pl.scan_csv(...)` build a lazy plan directly from the file, without reading any data up front.

## The expression API

Polars expressions describe a computation on a column without immediately running it — `pl.col("price")` means "the price column," and you build expressions up from there. The same four verbs cover almost everything: `select`, `filter`, `with_columns`, and `group_by().agg(...)`.

```python
result = (
    df.lazy()
    .filter(pl.col("volume") > 900)
    .with_columns((pl.col("price") * 1.0).alias("mid_price"))
    .group_by("ticker")
    .agg([
        pl.col("price").mean().alias("avg_price"),
        pl.col("volume").sum().alias("total_volume"),
    ])
    .sort("ticker")
    .collect()
)
print(result)
```

Everything inside `.agg([...])` is a list of expressions, each describing one output column — conceptually similar to pandas' `.agg({...})`, but every expression composes and can reference `pl.col` as many times as needed within the same chain. Note `group_by`, not `groupby` — Polars' API uses `snake_case` method names throughout, and `group_by` is the current spelling (older code using `groupby` still works but is deprecated).

## Why lazy evaluation helps

Because a `LazyFrame` builds the whole plan before running anything, Polars' query optimizer can rewrite it — for example, pushing a `select` of two columns down into the file scan itself (**projection pushdown**), so only those two columns are ever read off disk, or reordering a `filter` to run before an expensive join. This is the same idea as predicate/column pushdown from the Parquet lesson, but applied automatically across an entire chained query rather than something you have to request column-by-column yourself:

```python
plan = (
    pl.scan_parquet("ticks.parquet")
    .filter(pl.col("ticker") == "AAPL")
    .select(["date", "price"])
)
print(plan.explain())   # the filter and column selection get pushed into the scan
```

## An honest comparison

Polars tends to win clearly when:

- The dataset is large (multi-GB) and the work is filter/aggregate/join heavy — multi-threading and query optimization pay off most here.
- You're reading Parquet and only need a subset of columns or rows — `scan_parquet` plus pushdown avoids reading what you don't need.
- You want a stricter, more predictable API — Polars has no index, no implicit alignment surprises, and raises clearly rather than silently broadcasting mismatched operations.

pandas is still usually the better fit when:

- You need deep integration with the rest of the scientific Python ecosystem — scikit-learn, statsmodels, and most plotting libraries expect pandas (or NumPy) directly, and Polars interop usually means an extra `.to_pandas()` conversion.
- The dataset is small enough that performance isn't the bottleneck — pandas' larger surface area and more mature tooling (and the fact your whole team already knows it) can matter more than raw speed.
- You need MultiIndex-style hierarchical indexing or some of pandas' very long tail of specialized time-series methods — Polars has strong time-series support but a different API shape (it uses the same flat-column model throughout, no hierarchical index object).

Neither tool is strictly better — the realistic quant workflow is often "crunch a large Parquet dataset in Polars, hand a smaller aggregated result to pandas for the rest of the pipeline," using `.to_pandas()` at the handoff point.

## Key terms

| Term | Meaning |
|---|---|
| `pl.DataFrame` | Eager Polars table; operations run immediately |
| `pl.LazyFrame` | Deferred query plan; nothing runs until `.collect()` |
| `pl.col` | Builds a column expression used inside `select`/`filter`/`with_columns`/`agg` |
| `scan_parquet` / `scan_csv` | Build a lazy plan directly from a file, without eager loading |
| Projection pushdown | The optimizer limiting disk reads to only the columns actually used in the plan |

## Recap

Polars' `LazyFrame` and expression API let you describe an entire query before any of it runs, which lets its optimizer push filters and column selection down into the file scan itself — the same pushdown idea from the Parquet lesson, applied automatically. It is often dramatically faster than pandas on large filter/aggregate workloads, but pandas remains the better fit for small data, deep ecosystem integration, and hierarchical indexing. That closes Chapter 1 — Chapter 2 turns from data wrangling to numerical computing, starting with floating-point arithmetic and numerical stability.
