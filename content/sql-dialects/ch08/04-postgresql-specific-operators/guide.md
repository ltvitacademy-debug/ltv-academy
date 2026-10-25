# Lesson 51 — PostgreSQL-Specific Operators and Functions

**Chapter 8 · PostgreSQL Deep Dive for T-SQL Developers · Lesson 4 of 5**

## What you'll learn

- `~` and `~*` for regex matching, case-sensitive and case-insensitive
- `ILIKE`, PostgreSQL's case-insensitive `LIKE` — a genuinely distinctive operator
- `DISTINCT ON (column)`, a well-known PostgreSQL idiom with no direct equivalent elsewhere
- Why each of these would need a window function or extra logic on other platforms

## Regex matching: ~ and ~*

T-SQL's `LIKE` only supports simple wildcards (`%`, `_`). PostgreSQL adds true regular-expression
matching directly as operators: `~` for case-sensitive regex matching, `~*` for case-insensitive.

```sql
-- Case-sensitive regex: names starting with an uppercase A or B
SELECT * FROM customers WHERE customer_name ~ '^[AB]';

-- Case-insensitive regex: matches 'smith', 'Smith', 'SMITH', etc.
SELECT * FROM customers WHERE customer_name ~* '^smith';
```

T-SQL has no direct equivalent operator for regex matching inline like this — you'd typically need
CLR integration or a workaround.

## ILIKE: case-insensitive LIKE, built in

`LIKE` is case-sensitive by default on most platforms configured with a case-sensitive collation.
PostgreSQL adds `ILIKE` as a direct, built-in case-insensitive version — none of SQL Server,
Oracle, or MySQL have a directly equivalent operator (T-SQL instead depends on the column's
collation, and Oracle/MySQL have their own collation-dependent behaviors too).

```sql
-- Matches 'Smith', 'smith', 'SMITH', 'sMiTh' -- all of them
SELECT * FROM customers WHERE customer_name ILIKE 'smith';

-- Compare: LIKE is case-sensitive under a case-sensitive collation
SELECT * FROM customers WHERE customer_name LIKE 'smith';  -- misses 'Smith'
```

## DISTINCT ON: one row per distinct value, PostgreSQL's way

This is a well-known, PostgreSQL-only idiom: `DISTINCT ON (column)` returns exactly **one row per
distinct value** of the given column(s) — specifically, the first row per group according to
whatever `ORDER BY` you provide.

```sql
-- One row per customer: their MOST RECENT order only
SELECT DISTINCT ON (customer_id) customer_id, order_id, order_date
FROM orders
ORDER BY customer_id, order_date DESC;
```

On any other platform in this course, the same result requires a window function plus a filter —
noticeably more code for the same outcome:

```sql
-- The T-SQL equivalent: ROW_NUMBER() + a filtering CTE/subquery
WITH ranked AS (
  SELECT customer_id, order_id, order_date,
         ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn
  FROM orders
)
SELECT customer_id, order_id, order_date
FROM ranked
WHERE rn = 1;
```

`DISTINCT ON` is a real productivity feature worth knowing by name — it's one of the most-cited
PostgreSQL-specific conveniences for exactly this "latest/first row per group" pattern.

## Key terms

| Term | Meaning |
|---|---|
| `~` / `~*` | PostgreSQL regex-match operators, case-sensitive / case-insensitive |
| `ILIKE` | Built-in case-insensitive LIKE; no direct equivalent on SQL Server/Oracle/MySQL |
| `DISTINCT ON (col)` | Returns one row per distinct value of col, per the given ORDER BY — PostgreSQL-only |

## Lab

Write a `DISTINCT ON` query that returns each customer's single most recent order, then write the
`ROW_NUMBER()`-based T-SQL equivalent and compare the line count.

## Check yourself

You're ready for Lesson 52 when you can explain, without looking: what does `ILIKE` do that `LIKE`
doesn't, and what would you need to write on another platform to get the same result as
`DISTINCT ON`?
