# Lesson 18 — TOP and TOP PERCENT

**Chapter 2 · Filtering and Sorting · Lesson 8 of 10**

## What you'll learn

- Limiting rows returned with `TOP`
- `TOP` combined with `ORDER BY` — why order matters
- `TOP PERCENT`
- `TOP` without `ORDER BY` is meaningless

## TOP — a fixed number of rows

```sql
USE AdventureWorks2012;
GO

SELECT TOP 10 Name, ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
```

`TOP 10` limits the result to the first 10 rows **after** whatever
ordering is applied. This returns the 10 most expensive products.

## Why TOP needs ORDER BY

Without `ORDER BY`, "the first 10 rows" is meaningless — remember from
Lesson 17 that row order isn't guaranteed at all without it. `TOP` on its
own just grabs *some* 10 rows, in whatever order the engine happens to
produce them:

```sql
-- Which 10 rows? Undefined — don't do this
SELECT TOP 10 Name, ListPrice
FROM Production.Product;
```

**Always pair `TOP` with `ORDER BY`** unless you genuinely don't care which
rows come back — which is almost never.

## TOP PERCENT

Instead of a fixed row count, `TOP PERCENT` returns a percentage of the
total rows (rounded up):

```sql
SELECT TOP 10 PERCENT Name, ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
```

If the table has 504 products, `10 PERCENT` returns the top 51 rows
(rounded up from 50.4).

## Combining with WHERE

`TOP` works alongside everything you've already learned:

```sql
SELECT TOP 5 Name, ListPrice
FROM Production.Product
WHERE Color = 'Red'
ORDER BY ListPrice DESC;
```

This finds the 5 most expensive **red** products specifically.

## Key terms

| Term | Meaning |
|---|---|
| `TOP n` | Limits results to the first `n` rows after sorting |
| `TOP n PERCENT` | Limits results to `n`% of total rows (rounded up) |

## Lab

Run this against AdventureWorks2012 and compare it to the same query
without `TOP`:

```sql
SELECT TOP 5 Name, ListPrice
FROM Production.Product
ORDER BY ListPrice DESC;
```

## Check yourself

You're ready for Lesson 19 when you can answer, without looking: why does
`TOP` almost always need `ORDER BY`, and what does `TOP 10 PERCENT` mean on
a 504-row table?
