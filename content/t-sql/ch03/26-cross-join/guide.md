# Lesson 26 — CROSS JOIN

**Chapter 3 · Joining Tables · Lesson 6 of 11**

## What you'll learn

- `CROSS JOIN` — the join with no `ON` clause
- The Cartesian product: every row paired with every row
- Why row counts multiply, not add
- The rare legitimate uses for `CROSS JOIN`

## CROSS JOIN — no ON clause, on purpose

Every join so far has needed an `ON` clause to decide which rows pair up.
`CROSS JOIN` has **no** `ON` clause, because it doesn't try to match
anything at all:

```sql
USE AdventureWorks2012;
GO

SELECT p.Name AS ProductName, c.Name AS ColorSwatch
FROM Production.Product AS p
CROSS JOIN Production.ProductCategory AS c;
```

`CROSS JOIN` pairs **every row from the first table with every row from
the second**, with no filtering at all. This is called the **Cartesian
product**.

## Row counts multiply, not add

This is the most important thing to understand about `CROSS JOIN`: if the
left table has `M` rows and the right table has `N` rows, the result has
**`M × N` rows** — not `M + N`. A `CROSS JOIN` between a 504-row table and
a 4-row table doesn't return 508 rows — it returns **2,016**.

This is also why an **accidental** `CROSS JOIN` is a classic real-world
bug: forgetting the `ON` clause in what was meant to be an `INNER JOIN`
silently produces a Cartesian product instead of an error, and a query that
should return a few hundred rows suddenly returns millions.

## Legitimate uses

`CROSS JOIN` is rare, but genuinely useful for generating **every
combination** of two small sets — for example, every size paired with every
color, to build a full product-variant matrix even for combinations that
don't exist yet:

```sql
SELECT s.SizeName, co.ColorName
FROM SizeOptions AS s
CROSS JOIN ColorOptions AS co;
```

(This uses illustrative table names — the concept, not a runnable
AdventureWorks2012 query, since AdventureWorks doesn't ship a dedicated
size/color lookup pair.)

## Key terms

| Term | Meaning |
|---|---|
| `CROSS JOIN` | Pairs every row from one table with every row from another — no `ON` clause |
| Cartesian product | The mathematical name for this "every combination" result |

## Lab

Run this against AdventureWorks2012 and compare the row count to
`SELECT COUNT(*) FROM Production.Product` and
`SELECT COUNT(*) FROM Production.ProductCategory` separately (we cover
`COUNT` properly in Chapter 4):

```sql
SELECT p.Name, c.Name
FROM Production.Product AS p
CROSS JOIN Production.ProductCategory AS c;
```

## Check yourself

You're ready for Lesson 27 when you can answer, without looking: why does
`CROSS JOIN` have no `ON` clause, and how many rows does it return from
tables with 504 and 4 rows respectively?
