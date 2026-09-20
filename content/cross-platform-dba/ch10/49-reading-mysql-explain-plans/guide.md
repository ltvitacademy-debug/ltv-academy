# Reading MySQL EXPLAIN Plans

`EXPLAIN` is MySQL's window into what the optimizer actually plans to do with a query —
the tool that turns "this query is slow" into a specific, actionable diagnosis. A SQL
Server DBA already knows execution plans matter; MySQL's `EXPLAIN` output looks and reads
differently, and learning its real columns is what makes this tool useful rather than just
noise on a screen.

## What you'll learn

- Real `EXPLAIN` syntax and how to run it against a query
- What the key output columns — `type`, `key`, `rows`, `Extra` — actually mean
- How to read common `Extra` values like "Using filesort" and "Using temporary"

## Running EXPLAIN

`EXPLAIN` prefixes any `SELECT` (and, in modern MySQL, other statement types too) and
returns a table describing the execution plan instead of running the query for its results:

```
EXPLAIN SELECT o.order_id, c.customer_name
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_date > '2026-01-01';
```

The output is one row per table involved in the query, showing how MySQL's optimizer
intends to access that table.

## The columns that matter most

- **`type`** — the join/access type for that table, roughly ordered from best to worst:
  `const`/`eq_ref` (best — a single row via a unique lookup), `ref` (an index lookup
  matching multiple rows), `range` (an index range scan), `index` (a full scan of an index),
  and `ALL` (a full table scan — the one to watch for on any table of meaningful size).
- **`key`** — which index MySQL actually chose to use for that table, or `NULL` if no index
  was used. This is often the single most informative column: `NULL` on a table you expected
  to be indexed is a direct signal something's wrong.
- **`rows`** — MySQL's *estimate* of how many rows it will need to examine for that table.
  This is an estimate based on statistics, not a guaranteed count, but a huge `rows` estimate
  on a query that should touch a handful of rows is a strong signal of a missing or unused
  index.
- **`Extra`** — additional information about how the query will execute, and where some of
  the most actionable detail lives.

## Reading the common Extra values

- **"Using filesort"** — MySQL needs an extra pass to sort the result set because it
  couldn't use an index to produce rows in the required order. This doesn't necessarily mean
  a literal disk-based file sort (it may happen in memory), but it does mean extra work the
  optimizer couldn't avoid — often fixable by adding or adjusting an index that matches the
  `ORDER BY`.
- **"Using temporary"** — MySQL needs to build a temporary table to complete the query,
  commonly seen with certain `GROUP BY` or `DISTINCT` patterns that can't be satisfied
  directly from an index. Like filesort, it signals extra work and is often a target for
  index or query restructuring.
- **"Using index"** — a genuinely good sign: the query is satisfied entirely from the index
  itself without touching the underlying table data (a covering index), which is faster than
  reading table rows.
- **"Using where"** — a filter is being applied after rows are fetched, worth noting but not
  inherently bad on its own.

## Key terms

| Term | Meaning |
|---|---|
| `type: ALL` | Full table scan — MySQL examines every row, the access type to watch for |
| `key` | The index MySQL actually chose for a table; `NULL` means no index was used |
| `rows` | MySQL's estimated row count to examine for a table, based on statistics |
| "Using filesort" | Extra value meaning MySQL needs an additional pass to sort results, unaided by an index |
| "Using temporary" | Extra value meaning MySQL needs a temporary table to complete the query |

## Check yourself

An `EXPLAIN` on a slow query shows `type: ALL`, `key: NULL`, `rows: 480000`, and `Extra:
Using where`. What does each of those four values tell you about why this query is slow?
