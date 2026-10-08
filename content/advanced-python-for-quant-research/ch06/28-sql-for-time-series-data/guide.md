# SQL for Time-Series Data

Chapter 6 shifts from research tooling to databases and data access — the SQL side of a quant's toolkit, which earns its place alongside pandas rather than competing with it. A lot of time-series logic that feels awkward to express in pandas — "the previous row's value," "a point-in-time lookup," "a moving average over the last N rows ordered by time" — has a clean, standard SQL answer in window functions, and a genuinely elegant one in `ASOF JOIN`. This lesson covers both, using DuckDB, an embedded SQL engine that runs real SQL directly against pandas DataFrames and Parquet files with no server to set up.

## What you'll learn

- Window functions: `LAG`/`LEAD` for previous/next row access, and `OVER (ORDER BY ... ROWS BETWEEN ...)` for moving calculations
- How a window function differs from a `GROUP BY` aggregate — it doesn't collapse rows
- `ASOF JOIN`: a point-in-time join, "the last known value as of this timestamp," without a correlated subquery
- Why `ASOF JOIN` matters for quant research specifically (last known price, last known fundamental)
- A real, runnable example using DuckDB directly against a pandas DataFrame

## Window functions vs. `GROUP BY`

A `GROUP BY` aggregate collapses many rows into one per group — you lose the row-level detail. A **window function** computes an aggregate-like value *for each row*, using a window of other rows around it, without collapsing anything — every original row survives, now with an extra computed column. `OVER (ORDER BY ts)` defines that window's ordering; `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` defines exactly which rows, relative to the current one, the calculation should look at.

## `LAG`/`LEAD` and moving averages

`LAG(col)` reaches back to the previous row's value (by whatever `ORDER BY` you specify); `LEAD(col)` reaches forward to the next one. Combined with basic arithmetic, this gives you a tick-by-tick change with no self-join required:

```python
import duckdb
import pandas as pd
import numpy as np

rng = np.random.default_rng(1)
prices = pd.DataFrame({
    "ts": pd.date_range("2024-01-01 09:30", periods=8, freq="min"),
    "symbol": ["AAPL"] * 8,
    "price": (190 + rng.normal(0, 0.3, 8).cumsum()).round(2),
})

con = duckdb.connect()
con.register("prices", prices)

print(con.sql("""
    SELECT
        ts, price,
        LAG(price) OVER (ORDER BY ts) AS prev_price,
        price - LAG(price) OVER (ORDER BY ts) AS tick_change,
        AVG(price) OVER (ORDER BY ts ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS ma_3
    FROM prices
    ORDER BY ts
""").df())
```

```text
                   ts   price  prev_price  tick_change        ma_3
0 2024-01-01 09:30:00  190.10         NaN          NaN  190.100000
1 2024-01-01 09:31:00  190.35      190.10         0.25  190.225000
2 2024-01-01 09:32:00  190.45      190.35         0.10  190.300000
3 2024-01-01 09:33:00  190.06      190.45        -0.39  190.286667
4 2024-01-01 09:34:00  190.33      190.06         0.27  190.280000
5 2024-01-01 09:35:00  190.46      190.33         0.13  190.283333
6 2024-01-01 09:36:00  190.30      190.46        -0.16  190.363333
7 2024-01-01 09:37:00  190.48      190.30         0.18  190.413333
```

`con.register("prices", prices)` registers a pandas DataFrame as a queryable table name with no copy or export step — DuckDB reads it directly. The first row of `prev_price`/`tick_change`/`ma_3` is `NaN` precisely where there's no prior row (or, for `ma_3`, fewer than the requested window available yet) to compute from, exactly as you'd expect from `.shift()` or `.rolling()` in pandas — this is the same calculation, expressed as SQL instead.

## `ASOF JOIN`: a point-in-time join

The question "what was the last known price at or before this exact timestamp" comes up constantly — matching a trade against the quote that was live at that instant, or joining a fundamentals snapshot to a price history using "whatever was the most recently known value." Expressing that in standard SQL without native support means a correlated subquery or a window-function trick that is easy to get subtly wrong. DuckDB's **`ASOF JOIN`** does it directly: for each row on the left, it finds the single best-matching row on the right *at or before* the left row's timestamp, by the condition you specify:

```python
requests = pd.DataFrame({
    "req_ts": pd.to_datetime(["2024-01-01 09:32:30", "2024-01-01 09:35:10"]),
    "symbol": ["AAPL", "AAPL"],
})
con.register("requests", requests)

print(con.sql("""
    SELECT r.req_ts, p.ts AS as_of_ts, p.price AS last_known_price
    FROM requests r
    ASOF JOIN prices p
      ON r.symbol = p.symbol AND r.req_ts >= p.ts
""").df())
```

```text
               req_ts            as_of_ts  last_known_price
0 2024-01-01 09:35:10 2024-01-01 09:35:00            190.46
1 2024-01-01 09:32:30 2024-01-01 09:32:00            190.45
```

For a request at `09:32:30`, the ASOF join correctly matches the `09:32:00` tick — the most recent price *at or before* the request time — not `09:33:00`, which would be a lookahead-biased match using information from the future relative to the request. This is exactly the point-in-time correctness this chapter's predecessor (lesson 26) flagged as a research pitfall, now expressed as a single, efficient SQL join instead of a hand-rolled loop.

## Gaps and resampling, briefly

Real tick or daily data has gaps — a non-trading day, a halted symbol, a vendor outage — and a naive `LAG` across a gap silently compares two timestamps that aren't actually adjacent in calendar time. DuckDB (like most SQL engines) handles explicit resampling via `generate_series` to build a complete time grid and `LEFT JOIN` the real data onto it, or `time_bucket`-style functions for bucketing irregular timestamps into fixed intervals — the SQL-side equivalent of pandas' `.resample()`. The important habit either way is the same: know whether your window calculation is operating over *rows* (whatever exists) or *calendar time* (every period, gaps included), because `ROWS BETWEEN 2 PRECEDING AND CURRENT ROW` means "the two previous rows," not "the two previous days," if a day is missing.

## Key terms

| Term | Meaning |
|---|---|
| Window function | Computes a per-row value using a window of nearby rows, without collapsing rows like `GROUP BY` |
| `LAG` / `LEAD` | Access the previous / next row's value within an ordered window |
| `ROWS BETWEEN ... PRECEDING AND CURRENT ROW` | Defines exactly which rows, relative to the current row, a window calculation uses |
| `ASOF JOIN` | A join that matches each left row to the most recent right row at or before its timestamp |
| Resampling / `generate_series` | Building a complete, gap-free time grid so calculations operate over calendar time, not just existing rows |

## Recap

Window functions (`LAG`/`LEAD`, moving aggregates via `OVER (... ROWS BETWEEN ...)`) compute per-row time-series calculations without collapsing rows the way `GROUP BY` does, and `ASOF JOIN` solves the point-in-time "last known value" join directly, avoiding the lookahead-bias mistakes a naive join could introduce. Next lesson: why columnar storage and engines like DuckDB are particularly well suited to this kind of analytical time-series work, and where purpose-built time-series databases fit in.
