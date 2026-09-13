# Lesson 7 — CTEs and Window Functions in Snowflake

**Chapter 2 · Snowflake SQL — What's Different From T-SQL · Lesson 7 of 60**

## What you'll learn

- That standard and recursive CTEs work the same as in T-SQL
- That `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `LAG()`, and `LEAD()` all transfer directly
- The one syntax difference in recursive CTEs worth knowing
- Where `QUALIFY` (Lesson 6) replaces the CTE pattern you'd reach for in T-SQL

This lesson's job isn't to teach CTEs or window functions from scratch —
you already know them. It's to confirm exactly what transfers unchanged,
so you stop second-guessing syntax you already know is correct.

## Standard CTEs — unchanged

A `WITH` clause behaves identically in Snowflake:

```sql
WITH high_value_orders AS (
  SELECT customer_id, order_total
  FROM orders
  WHERE order_total > 1000
)
SELECT customer_id, COUNT(*) AS big_order_count
FROM high_value_orders
GROUP BY customer_id;
```

Multiple CTEs, chained CTEs referencing earlier ones, CTEs used more than
once in the final query — all of it works exactly like T-SQL. There's
nothing to relearn here.

## Window functions — unchanged

Every ranking and offset function you use in T-SQL exists in Snowflake
with the same name and the same `OVER (PARTITION BY ... ORDER BY ...)`
syntax:

```sql
SELECT
  customer_id,
  order_date,
  order_total,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn,
  RANK()       OVER (PARTITION BY customer_id ORDER BY order_total DESC) AS total_rank,
  LAG(order_total)  OVER (PARTITION BY customer_id ORDER BY order_date) AS prev_order_total,
  LEAD(order_total) OVER (PARTITION BY customer_id ORDER BY order_date) AS next_order_total
FROM orders;
```

`ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, `NTILE()`, `LAG()`, `LEAD()`,
`FIRST_VALUE()`, `LAST_VALUE()`, running aggregates with
`SUM() OVER (... ROWS BETWEEN ...)` — all behave the same. If you can
write it in T-SQL, you can paste it into a Snowflake worksheet and it
will very likely run without a single edit.

## Recursive CTEs — same idea, one keyword difference

Recursive CTEs work the same conceptually — an anchor member, a `UNION
ALL`, and a recursive member referencing the CTE itself — but Snowflake
requires the `RECURSIVE` keyword explicitly, where T-SQL infers it:

```sql
-- T-SQL — no RECURSIVE keyword needed
WITH org_chart AS (
  SELECT employee_id, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.employee_id, e.manager_id, oc.level + 1
  FROM employees e JOIN org_chart oc ON e.manager_id = oc.employee_id
)
SELECT * FROM org_chart;

-- Snowflake — RECURSIVE is required
WITH RECURSIVE org_chart AS (
  SELECT employee_id, manager_id, 1 AS level
  FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.employee_id, e.manager_id, oc.level + 1
  FROM employees e JOIN org_chart oc ON e.manager_id = oc.employee_id
)
SELECT * FROM org_chart;
```

Forget the keyword and Snowflake throws a syntax error rather than
silently treating it as non-recursive — a small but easy trip-up moving
scripts over from T-SQL.

## Where `QUALIFY` beats the CTE pattern

Lesson 6 introduced `QUALIFY`. The classic "top N per group" pattern you
just wrote above with `ROW_NUMBER()` in a CTE has a shorter Snowflake-only
form:

```sql
-- Same result as the CTE + WHERE rn = 1 pattern, in one query
SELECT customer_id, order_date, order_total,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn
FROM orders
QUALIFY rn = 1;
```

Both are correct Snowflake SQL. The CTE version is what you already know
from T-SQL and it works unchanged; `QUALIFY` is a Snowflake-specific
shortcut worth reaching for once it's second nature.

## Key terms

| Term | Meaning |
|---|---|
| `WITH` clause (CTE) | Works identically to T-SQL — no syntax changes |
| Window function | `ROW_NUMBER()`, `RANK()`, `LAG()`, `LEAD()`, etc. — same names, same `OVER()` syntax |
| `WITH RECURSIVE` | Snowflake requires the `RECURSIVE` keyword explicitly for recursive CTEs |
| `QUALIFY` | Snowflake-specific shortcut that replaces the CTE + `WHERE rn = n` pattern |

## Lab

Take a T-SQL recursive CTE you've written before (or the org-chart example
above) and run it in a Snowflake worksheet with and without the
`RECURSIVE` keyword — confirm it errors without it and runs correctly
with it.

## Check yourself

You're ready for Lesson 8 when you can state, without hedging, that CTEs
and window functions transfer from T-SQL essentially unchanged — with
`WITH RECURSIVE` as the one keyword you have to remember to add.
