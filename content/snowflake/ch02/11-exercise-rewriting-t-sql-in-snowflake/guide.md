# Lesson 11 — Exercise: Rewriting a T-SQL Query in Snowflake SQL

**Chapter 2 · Snowflake SQL — What's Different From T-SQL · Lesson 11 of 60**

## What you'll learn

- How to rewrite a real, multi-feature T-SQL query into Snowflake SQL
- How `TOP`, string `+`, and `CASE` map onto `LIMIT`, `||`, and `IFF()`
- How `QUALIFY` collapses a CTE + `ROW_NUMBER()` pattern into one query
- How to check your own rewrite for correctness before assuming it's right

## The T-SQL query

Here's a realistic query: the top 3 highest-value orders per customer,
placed since the start of 2025, flagging orders over $500 as "Large":

```sql
-- T-SQL
WITH ranked AS (
  SELECT
    c.customer_id,
    c.first_name + ' ' + c.last_name AS full_name,
    o.order_id,
    o.order_total,
    CASE WHEN o.order_total > 500 THEN 'Large' ELSE 'Standard' END AS order_size,
    ROW_NUMBER() OVER (PARTITION BY c.customer_id ORDER BY o.order_total DESC) AS rn
  FROM orders o
  JOIN customers c ON c.customer_id = o.customer_id
  WHERE o.order_date >= '2025-01-01'
)
SELECT TOP 100 customer_id, full_name, order_id, order_total, order_size
FROM ranked
WHERE rn <= 3
ORDER BY order_total DESC;
```

This one query touches four things this chapter covered: `TOP`, string
`+`, `CASE`, and a CTE wrapping `ROW_NUMBER()` just to filter on it.

## Rewriting it, one piece at a time

**String concatenation** — `+` becomes `||` (Lesson 6):

```sql
c.first_name || ' ' || c.last_name AS full_name
```

**Simple conditional** — this `CASE` has exactly two branches on one
condition, so it collapses cleanly into `IFF()` (Lesson 6), though full
`CASE` would also still work unchanged if you preferred it:

```sql
IFF(o.order_total > 500, 'Large', 'Standard') AS order_size
```

**The CTE + `ROW_NUMBER()` + outer `WHERE rn <= 3` pattern** — this is
exactly what `QUALIFY` replaces (Lessons 6 and 7). Drop the CTE
entirely, compute `ROW_NUMBER()` in the main `SELECT`, and filter it with
`QUALIFY` instead of an outer query:

```sql
QUALIFY rn <= 3
```

**Row limiting** — `TOP 100` in the `SELECT` clause becomes `LIMIT 100`
at the end, after `ORDER BY` (Lesson 6).

## The full Snowflake rewrite

```sql
-- Snowflake
SELECT
  c.customer_id,
  c.first_name || ' ' || c.last_name AS full_name,
  o.order_id,
  o.order_total,
  IFF(o.order_total > 500, 'Large', 'Standard') AS order_size,
  ROW_NUMBER() OVER (PARTITION BY c.customer_id ORDER BY o.order_total DESC) AS rn
FROM orders o
JOIN customers c ON c.customer_id = o.customer_id
WHERE o.order_date >= '2025-01-01'
QUALIFY rn <= 3
ORDER BY o.order_total DESC
LIMIT 100;
```

Nine lines shorter, no CTE, same result. Everything else — the `JOIN`,
the `WHERE`, the `ORDER BY`, the window function's `PARTITION BY`/`ORDER
BY` — needed zero changes, because that's all standard SQL that
transfers directly (Lesson 7).

## Checking your own rewrite

When you rewrite a query like this yourself, verify it two ways:

1. **Row count** — run both versions (if you have both platforms
   available) and confirm they return the same number of rows.
2. **Read it back structurally** — for every `TOP`, `+` on strings,
   `CASE`, and CTE-wrapped window function in the original, confirm you
   changed exactly that piece and nothing else. A correct rewrite touches
   only the syntax that actually differs.

## Key terms — this chapter's full translation table

| T-SQL | Snowflake |
|---|---|
| `TOP n` | `LIMIT n` (at the end of the query) |
| `+` (strings) | `\|\|` |
| `IIF(cond, a, b)` | `IFF(cond, a, b)` |
| CTE + `ROW_NUMBER()` + outer `WHERE` | `QUALIFY` |
| `WITH RECURSIVE` implied | `WITH RECURSIVE` explicit |
| `EXEC proc` | `CALL proc(...)` |
| `MERGE ... OUTPUT` | No `OUTPUT` — use Time Travel |
| `MERGE ... WHEN NOT MATCHED BY SOURCE` | No equivalent — separate `DELETE` |

## Lab

Take a T-SQL query of your own (or one from an earlier course) that uses
at least two of `TOP`, string `+`, `CASE`, and a ranking CTE. Rewrite it
into Snowflake SQL using this lesson's translation table, then verify it
using both checks above.

## Check yourself

You're ready for Chapter 3 when you can rewrite a T-SQL query like the
one in this lesson without referring back to the translation table for
`LIMIT`, `||`, `IFF()`, or `QUALIFY`.
