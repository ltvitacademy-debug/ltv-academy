# Lesson 56 — NULLIF

**Chapter 6 · Data Types, Strings, Dates and Modern T-SQL · Lesson 14 of 22**

## What you'll learn

- `NULLIF(expr1, expr2)` syntax: returns `NULL` if the two expressions are
  equal, otherwise returns `expr1`
- The classic use: avoiding divide-by-zero errors
- Combining `NULLIF` with `COALESCE` for a clean default
- Why `NULLIF` is the conceptual mirror image of `COALESCE`

## The problem: dividing by a column that might be zero

```sql
USE AdventureWorks2012;
GO

-- If OrderQty could ever legitimately be 0, this risks:
-- "Divide by zero error encountered."
SELECT
    SalesOrderDetailID,
    LineTotal,
    OrderQty,
    LineTotal / OrderQty AS PricePerUnit
FROM Sales.SalesOrderDetail;
```

A plain division has no defense against a zero denominator — SQL Server
raises a runtime error and the whole batch stops.

## NULLIF: swap the problem value for NULL

```sql
SELECT
    SalesOrderDetailID,
    LineTotal,
    OrderQty,
    LineTotal / NULLIF(OrderQty, 0) AS PricePerUnit
FROM Sales.SalesOrderDetail;
```

`NULLIF(OrderQty, 0)` compares `OrderQty` to `0`. If they're equal, it
returns `NULL` instead of `0`; otherwise, it returns `OrderQty`'s own value
unchanged. Dividing by `NULL` produces `NULL` — not an error — so the
query keeps running and just shows `NULL` for that one row.

## Combine with COALESCE for a clean default

Lesson 54's `COALESCE` pairs naturally with `NULLIF` here, turning that
`NULL` result into whatever default makes sense for the report:

```sql
SELECT
    SalesOrderDetailID,
    COALESCE(LineTotal / NULLIF(OrderQty, 0), 0) AS PricePerUnit
FROM Sales.SalesOrderDetail;
```

Read it inside-out: `NULLIF` guards the division from a zero, and
`COALESCE` catches the resulting `NULL` and replaces it with `0` for
display.

## NULLIF is the conceptual mirror image of COALESCE

`COALESCE` takes a `NULL` and turns it **into** a usable value.
`NULLIF` takes a specific, usually "unsafe" real value and turns it **into**
`NULL` on purpose, under a condition you control — namely, that it equals
a second expression you're comparing against. They aren't literal inverse
functions, but they solve opposite halves of the same kind of problem:
one protects you from a dangerous value by hiding it behind `NULL`; the
other recovers from a `NULL` by replacing it with something real.

## Key terms

| Term | Meaning |
|---|---|
| `NULLIF(expr1, expr2)` | Returns NULL if expr1 equals expr2, otherwise returns expr1 unchanged |

## Lab

First run this literal demonstration to see the raw behavior:

```sql
SELECT NULLIF(5, 5) AS EqualExample, NULLIF(5, 0) AS NotEqualExample;
```

Then run the `PricePerUnit` queries above against
`Sales.SalesOrderDetail` in AdventureWorks2012.

## Check yourself

You're ready for Lesson 57 when you can answer, without looking: what does
`NULLIF(OrderQty, 0)` return when `OrderQty` is `3`? What does it return
when `OrderQty` is `0`? And why does wrapping a divisor in `NULLIF` avoid a
runtime error instead of just producing a wrong number?
