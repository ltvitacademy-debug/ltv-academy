# Lesson 6 — Snowflake SQL vs. T-SQL: Syntax Differences That Matter

**Chapter 2 · Snowflake SQL — What's Different From T-SQL · Lesson 6 of 60**

## What you'll learn

- `LIMIT` vs. `TOP`, and where each goes in the query
- `||` for string concatenation instead of `+`
- `IFF()` as T-SQL's `IIF()` with a different name, and when full `CASE` still wins
- The `QUALIFY` clause — filtering on a window function with no T-SQL equivalent
- Semicolon conventions and case-insensitive unquoted identifiers

This lesson doesn't re-teach SQL — you already know joins, CTEs, and
aggregates. It's a direct syntax translation guide for the handful of
places Snowflake's dialect actually diverges from T-SQL.

## Row limiting: `LIMIT` vs. `TOP`

T-SQL puts the limit in the `SELECT` clause. Snowflake puts it at the end
of the query, closer to how MySQL and Postgres do it:

```sql
-- T-SQL
SELECT TOP 10 customer_id, order_total
FROM orders
ORDER BY order_total DESC;

-- Snowflake
SELECT customer_id, order_total
FROM orders
ORDER BY order_total DESC
LIMIT 10;
```

Snowflake also supports `TOP` as an alias for compatibility, but idiomatic
Snowflake SQL uses `LIMIT`. Snowflake's `LIMIT` also accepts an `OFFSET`:
`LIMIT 10 OFFSET 20`.

## String concatenation: `||` instead of `+`

T-SQL overloads `+` for both addition and string concatenation. Snowflake
uses `+` for arithmetic only — concatenation is `||`:

```sql
-- T-SQL
SELECT first_name + ' ' + last_name AS full_name FROM customers;

-- Snowflake
SELECT first_name || ' ' || last_name AS full_name FROM customers;
```

Snowflake also has a `CONCAT()` function if you prefer it, but `||` is
the standard idiom you'll see in almost every Snowflake codebase.

## Conditional logic: `IFF()` vs. `CASE`

Snowflake's `IFF(condition, true_result, false_result)` is a direct match
for T-SQL's `IIF()` — same idea, different spelling, one F:

```sql
-- T-SQL
SELECT order_id, IIF(order_total > 100, 'Large', 'Small') AS size_flag
FROM orders;

-- Snowflake
SELECT order_id, IFF(order_total > 100, 'Large', 'Small') AS size_flag
FROM orders;
```

`IFF()` is for one simple condition. The moment you have more than one
branch, reach for full `CASE` — it works identically to T-SQL in
Snowflake, with no syntax changes at all:

```sql
SELECT order_id,
  CASE
    WHEN order_total > 500 THEN 'Large'
    WHEN order_total > 100 THEN 'Medium'
    ELSE 'Small'
  END AS size_flag
FROM orders;
```

## `QUALIFY` — filtering on a window function, with no T-SQL detour

This is the one construct here with **no T-SQL equivalent at all**. In
T-SQL, filtering on a window function result (like keeping only the first
row per customer) forces you into a CTE or subquery, because `WHERE`
can't see window function results:

```sql
-- T-SQL — needs a CTE, because WHERE can't filter on ROW_NUMBER() directly
WITH ranked AS (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn
  FROM orders
)
SELECT * FROM ranked WHERE rn = 1;
```

Snowflake's `QUALIFY` clause filters on window functions directly, no
wrapping CTE required:

```sql
-- Snowflake — QUALIFY filters on the window function in the same query
SELECT *, ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn
FROM orders
QUALIFY rn = 1;
```

`QUALIFY` runs after `WHERE`, `GROUP BY`, and `HAVING`, but before
`ORDER BY` and `LIMIT` — it's the window-function equivalent of `HAVING`.
Snowflake CTEs still work fine too (Lesson 7 confirms they behave the
same as T-SQL) — `QUALIFY` is just a shortcut you'll use constantly once
you know it exists.

## Two smaller habits worth knowing

- **Semicolons** — Snowsight worksheets run fine with or without a
  trailing semicolon on a single statement, but always terminate each
  statement with `;` when a worksheet has multiple statements, or when
  writing scripts/stored procedures — same discipline as T-SQL batches.
- **Unquoted identifiers are case-insensitive** and folded to uppercase
  (covered in Lesson 3) — `orders`, `Orders`, and `ORDERS` are the same
  table unless quoted. T-SQL's case-sensitivity depends on your
  collation; don't assume Snowflake behaves the same way by default.

## Key terms

| T-SQL | Snowflake | Notes |
|---|---|---|
| `TOP n` | `LIMIT n` | Snowflake's `LIMIT` goes at the end, after `ORDER BY` |
| `+` (string concat) | `\|\|` | `+` in Snowflake is arithmetic only |
| `IIF(cond, a, b)` | `IFF(cond, a, b)` | Same behavior, different spelling |
| No equivalent | `QUALIFY` | Filters on a window function without a wrapping CTE |
| `CASE` | `CASE` | Identical syntax in both dialects |

## Lab

Using any table with a date column and a grouping column (e.g. `orders`
with `customer_id` and `order_date`), write one query using `QUALIFY` to
return only the most recent order per customer — then rewrite the same
result using a CTE and `ROW_NUMBER()`, and confirm both return identical
rows.

## Check yourself

You're ready for Lesson 7 when you can rewrite a T-SQL query using `TOP`,
string `+`, and `IIF()` into Snowflake SQL using `LIMIT`, `||`, and
`IFF()` — and explain what `QUALIFY` replaces.
