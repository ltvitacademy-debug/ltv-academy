# Lesson 12 — Pagination: TOP vs. ROWNUM/FETCH FIRST vs. LIMIT

**Chapter 3 · Querying Basics Compared · Lesson 1 of 8**

## What you'll learn

- SQL Server's `TOP` and the standard `OFFSET`/`FETCH`
- Oracle's classic `ROWNUM` trap and its modern `FETCH FIRST` fix
- MySQL and PostgreSQL's `LIMIT`/`OFFSET`
- Why "the same pagination query" looks nothing alike across platforms

## SQL Server: TOP and OFFSET/FETCH

```sql
-- T-SQL: TOP, the simplest form — limits, but can't skip rows
SELECT TOP (10) ProductID, Name, ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;

-- T-SQL: standard OFFSET/FETCH (SQL Server 2012+) — true "page 2"
SELECT ProductID, Name, ListPrice
FROM Production.Product
ORDER BY ListPrice DESC
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;
```

`TOP` alone has no concept of "skip the first 10 rows" — it only limits how
many rows come back. To page through results (page 2, page 3, ...) you need
`OFFSET...FETCH`, which requires an `ORDER BY` to mean anything consistent.

## Oracle: the ROWNUM trap, and the modern fix

```sql
-- WRONG on Oracle: ROWNUM is assigned BEFORE ORDER BY runs
SELECT ProductID, Name, ListPrice
FROM Products
WHERE ROWNUM <= 10
ORDER BY ListPrice DESC;
```

This does **not** give you the 10 most expensive products. `ROWNUM` numbers
rows as they come out of the table scan, in whatever order the optimizer
happens to produce them — the filter `ROWNUM <= 10` runs first, and only
*then* does `ORDER BY` sort those arbitrary 10 rows. The fix is to sort
inside a subquery first, then number and filter the already-sorted result:

```sql
-- RIGHT: sort first in a subquery, THEN number and filter
SELECT ProductID, Name, ListPrice FROM (
  SELECT ProductID, Name, ListPrice
  FROM Products
  ORDER BY ListPrice DESC
)
WHERE ROWNUM <= 10;
```

Oracle 12c and later also supports the ANSI-standard syntax, which sidesteps
the `ROWNUM` trap entirely:

```sql
-- Oracle 12c+: standard FETCH FIRST, no ROWNUM gotcha
SELECT ProductID, Name, ListPrice
FROM Products
ORDER BY ListPrice DESC
FETCH FIRST 10 ROWS ONLY;

-- with an offset, for page 2
SELECT ProductID, Name, ListPrice
FROM Products
ORDER BY ListPrice DESC
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;
```

## MySQL and PostgreSQL: LIMIT/OFFSET

```sql
-- MySQL
SELECT ProductID, Name, ListPrice
FROM Products
ORDER BY ListPrice DESC
LIMIT 10 OFFSET 10;

-- PostgreSQL: same LIMIT/OFFSET syntax
SELECT ProductID, Name, ListPrice
FROM Products
ORDER BY ListPrice DESC
LIMIT 10 OFFSET 10;

-- PostgreSQL also accepts the ANSI-standard form
SELECT ProductID, Name, ListPrice
FROM Products
ORDER BY ListPrice DESC
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;
```

## Side-by-side: page 2 of a 10-row page

| Dialect | Syntax |
|---|---|
| SQL Server | `OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY` |
| Oracle (traditional) | subquery sorted first, then `WHERE ROWNUM <= 10` |
| Oracle 12c+ | `OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY` |
| MySQL | `LIMIT 10 OFFSET 10` |
| PostgreSQL | `LIMIT 10 OFFSET 10` (or the ANSI `OFFSET...FETCH` form) |

## Key terms

| Term | Meaning |
|---|---|
| `TOP` | T-SQL-only clause that limits rows; has no offset/skip concept |
| `ROWNUM` | Oracle pseudo-column assigned before `ORDER BY` — a real pagination trap |
| `FETCH FIRST` / `OFFSET...FETCH NEXT` | ANSI-standard pagination, supported by SQL Server, Oracle 12c+, and PostgreSQL |
| `LIMIT...OFFSET` | MySQL and PostgreSQL's native pagination clause |

## Lab

Using AdventureWorks2012, write the T-SQL query for "rows 21-30 of
`Production.Product` ordered by `ListPrice DESC`" using `OFFSET`/`FETCH`.
Then write what the equivalent would look like on Oracle (the traditional
ROWNUM-subquery form) and on MySQL (`LIMIT`/`OFFSET`).

## Check yourself

You're ready for the next lesson when you can explain, without looking, why
`WHERE ROWNUM <= 10 ORDER BY ListPrice DESC` does **not** return the 10 most
expensive rows on Oracle, and what fixes it.
