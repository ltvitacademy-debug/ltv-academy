# Lesson 53 — Snowflake SQL: What's Different From T-SQL

**Chapter 9 · Cloud Warehouse SQL Dialects · Lesson 1 of 5**

## What you'll learn

- Why Snowflake SQL feels closer to PostgreSQL/standard SQL than to T-SQL
- `LIMIT` instead of `TOP`, and `||` instead of `+` for concatenation
- Snowflake's case-folding behavior for unquoted identifiers
- The `QUALIFY` clause and Time Travel — two genuinely Snowflake-specific features

## A heavily ANSI-standard dialect

Snowflake's SQL is heavily ANSI-standard, and in most ways it reads closer to PostgreSQL than to
T-SQL. That's a useful mental anchor as you go through this chapter: when in doubt, Snowflake
syntax tends to look more like the "standard" option than like a T-SQL-specific one.

## Pagination: LIMIT, not TOP

T-SQL's `TOP` has no Snowflake equivalent — Snowflake uses `LIMIT`, the same keyword PostgreSQL
and MySQL use:

```sql
-- T-SQL
SELECT TOP 10 ProductName, ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
```

```sql
-- Snowflake
SELECT product_name, list_price
FROM production.product
ORDER BY list_price DESC
LIMIT 10;
```

## Concatenation: || instead of +

T-SQL overloads `+` for string concatenation; Snowflake uses `||`, the ANSI-standard
concatenation operator:

```sql
-- T-SQL
SELECT FirstName + ' ' + LastName AS FullName FROM Person.Person;

-- Snowflake
SELECT first_name || ' ' || last_name AS full_name FROM person.person;
```

## Case folding: closer to Oracle than T-SQL

T-SQL identifiers are case-insensitive but preserve the case you typed. Snowflake identifiers
are case-insensitive by default **and** folded to UPPERCASE internally when unquoted — the same
family of behavior as Oracle:

```sql
-- These all resolve to the same object: CUSTOMERS (uppercase internally)
SELECT * FROM customers;
SELECT * FROM Customers;
SELECT * FROM CUSTOMERS;
```

Quoting an identifier (`"Customers"`) preserves the exact case and makes it case-**sensitive** —
the same trap that catches developers moving from T-SQL to Oracle.

## QUALIFY: a clause T-SQL doesn't have

Snowflake's `QUALIFY` clause filters on a window function's result directly, without wrapping
the query in a subquery or CTE the way T-SQL requires:

```sql
-- T-SQL — needs a CTE or subquery to filter on a window function
WITH Ranked AS (
  SELECT CustomerID, OrderID, OrderDate,
         ROW_NUMBER() OVER (PARTITION BY CustomerID ORDER BY OrderDate DESC) AS rn
  FROM Orders
)
SELECT * FROM Ranked WHERE rn = 1;
```

```sql
-- Snowflake — QUALIFY filters directly, no wrapping needed
SELECT customer_id, order_id, order_date,
       ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date DESC) AS rn
FROM orders
QUALIFY rn = 1;
```

`QUALIFY` is genuinely useful and genuinely Snowflake-specific among the dialects in this
course — nothing in T-SQL, Oracle, MySQL, or PostgreSQL offers this shortcut.

## Time Travel: querying the past

Snowflake lets you query a table **as it existed at a past point in time** with `AT` or
`BEFORE` clauses — a real Snowflake-specific feature with no T-SQL equivalent:

```sql
-- Snowflake Time Travel — query data as of yesterday
SELECT * FROM orders AT (OFFSET => -86400);

-- Or as of a specific timestamp
SELECT * FROM orders AT (TIMESTAMP => '2026-10-01 00:00:00'::TIMESTAMP);
```

## Key terms

| Term | Meaning |
|---|---|
| `LIMIT` | Snowflake's row-limiting clause, replacing T-SQL's `TOP` |
| `\|\|` | Snowflake's (and ANSI's) string concatenation operator, replacing T-SQL's `+` |
| Case folding | Snowflake folds unquoted identifiers to UPPERCASE internally, like Oracle |
| `QUALIFY` | Filters directly on a window function's result, without a wrapping subquery |
| Time Travel | Snowflake's `AT`/`BEFORE` clauses for querying historical table states |

## Lab

Rewrite this T-SQL query for Snowflake, changing `TOP` to `LIMIT`, `+` to `||`, and converting
the CTE-based filter into a `QUALIFY` clause:

```sql
WITH Ranked AS (
  SELECT FirstName + ' ' + LastName AS FullName, SalesYTD,
         RANK() OVER (ORDER BY SalesYTD DESC) AS rnk
  FROM Sales.SalesPerson
)
SELECT TOP 5 * FROM Ranked WHERE rnk <= 5;
```

## Check yourself

You're ready for Lesson 54 when you can answer, without looking: what replaces `TOP` and `+` in
Snowflake, how does Snowflake's case folding compare to Oracle's, and what does `QUALIFY` let you
avoid writing?
