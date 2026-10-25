# Lesson 47 — Translating a Real T-SQL Query into MySQL

**Chapter 7 · MySQL Deep Dive for T-SQL Developers · Lesson 5 of 5**

## What you'll learn

- A complete, realistic T-SQL query using `TOP`, a CTE, and `+` string concatenation
- Line-by-line conversion of each piece into correct MySQL
- Why each conversion decision is necessary, not stylistic
- How this ties together every MySQL-specific lesson from this chapter

## The starting query: real T-SQL, as you'd actually write it

```sql
WITH RecentOrders AS (
  SELECT TOP 5 CustomerId, OrderId, OrderDate
  FROM Orders
  ORDER BY OrderDate DESC
)
SELECT CustomerId,
       'Order #' + CAST(OrderId AS VARCHAR(10)) + ' on ' + CONVERT(VARCHAR(10), OrderDate, 101) AS Summary
FROM RecentOrders;
```

This query uses three things that don't translate literally: `TOP 5` to limit rows inside the CTE,
`+` to concatenate strings, and `CONVERT(..., 101)` to format a date. Each needs a specific MySQL
equivalent.

## Decision 1: TOP → LIMIT, and where it goes

T-SQL's `TOP N` sits right after `SELECT`. MySQL's `LIMIT N` sits at the **end** of the query (or
subquery) instead — a real structural difference, not just a renamed keyword.

```sql
-- T-SQL: TOP goes right after SELECT
SELECT TOP 5 CustomerId, OrderId, OrderDate FROM Orders ORDER BY OrderDate DESC;

-- MySQL: LIMIT goes at the end
SELECT customer_id, order_id, order_date FROM orders ORDER BY order_date DESC LIMIT 5;
```

## Decision 2: + concatenation → CONCAT()

T-SQL overloads `+` for both addition and string concatenation. MySQL does not — `+` is
arithmetic-only, so string concatenation needs the explicit `CONCAT()` function (first introduced
back in Chapter 3's concatenation lesson).

```sql
-- T-SQL
'Order #' + CAST(OrderId AS VARCHAR(10)) + ' on ' + CONVERT(VARCHAR(10), OrderDate, 101)

-- MySQL
CONCAT('Order #', CAST(order_id AS CHAR), ' on ', DATE_FORMAT(order_date, '%m/%d/%Y'))
```

## Decision 3: CONVERT(..., style) → DATE_FORMAT()

T-SQL's numeric style codes (like `101` for `MM/DD/YYYY`) are a SQL-Server-specific convention.
MySQL formats dates with `DATE_FORMAT(date, format_string)`, using `%m`/`%d`/`%Y`-style tokens
instead of a style number.

## Putting it all together

```sql
-- MySQL, fully translated
WITH RecentOrders AS (
  SELECT customer_id, order_id, order_date
  FROM orders
  ORDER BY order_date DESC
  LIMIT 5
)
SELECT customer_id,
       CONCAT('Order #', CAST(order_id AS CHAR), ' on ', DATE_FORMAT(order_date, '%m/%d/%Y')) AS summary
FROM RecentOrders;
```

Note that the `WITH` CTE syntax itself needed **no** change (standard SQL, covered in Chapter 4) —
only the three dialect-specific pieces inside it did. That's the general pattern you'll keep
seeing: most of a query translates untouched, and the real work is spotting the handful of
vendor-specific pieces.

## Key terms

| Term | Meaning |
|---|---|
| `LIMIT N` | MySQL's row-limiting clause; goes at the end of the query, unlike T-SQL's `TOP N` |
| `CONCAT(...)` | MySQL's string concatenation function, replacing T-SQL's `+` operator |
| `DATE_FORMAT(date, format)` | MySQL's date-formatting function, replacing T-SQL's numeric CONVERT style codes |

## Lab

Take any T-SQL query from your own work that uses `TOP`, `+` concatenation, or `CONVERT(...,
style)`, and translate it into MySQL using the three decision points from this lesson.

## Check yourself

You're ready to move on to Chapter 8 when you can explain, without looking: where does `LIMIT` go
in a MySQL query compared to where `TOP` goes in T-SQL, and what replaces `+` for string
concatenation in MySQL?
