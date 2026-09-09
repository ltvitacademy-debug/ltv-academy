# Lesson 23 — LEFT JOIN

**Chapter 3 · Joining Tables · Lesson 3 of 11**

## What you'll learn

- `LEFT JOIN` — keeping every row from the first table, matched or not
- What appears in the unmatched columns
- "Left" and "right" refer to position in the query, not data meaning
- Finding unmatched rows with `LEFT JOIN` + `IS NULL`

## The problem INNER JOIN can't solve

Lesson 22's `INNER JOIN` only shows products that **have** been ordered.
But what if you specifically want to see **every product**, including ones
that have never sold? `INNER JOIN` can't do that — it drops unmatched rows
by definition.

## LEFT JOIN — keep everything on the left

```sql
USE AdventureWorks2012;
GO

SELECT p.Name, p.ListPrice, sod.OrderQty
FROM Production.Product AS p
LEFT JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID;
```

`LEFT JOIN` keeps **every row from the table on the left** of the `JOIN`
keyword (`Production.Product`) — whether or not it has a match on the
right. For a product with no matching order, `sod.OrderQty` (and every
other column from the right table) comes back as `NULL`, exactly like a
missing value from Lesson 16.

## "Left" and "right" are about the query, not the data

The table named in `FROM` — written first, physically to the left in the
query — is the "left" table. The table named after `JOIN` is the "right"
table. This is purely about **where you wrote it**, not anything about the
data itself.

```sql
-- Product is "left" because it's in FROM
FROM Production.Product AS p
LEFT JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID;
```

## Finding unmatched rows on purpose

A very common real use of `LEFT JOIN` is finding rows that have **no**
match at all — combine it with `IS NULL` (Lesson 16) on a column that
could only be `NULL` if the match failed:

```sql
SELECT p.Name
FROM Production.Product AS p
LEFT JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID
WHERE sod.ProductID IS NULL;
```

This returns **only** products that have never appeared in a sales order —
`sod.ProductID` can only be `NULL` here if the `LEFT JOIN` found nothing to
match on the right.

## Key terms

| Term | Meaning |
|---|---|
| `LEFT JOIN` | Keeps every row from the left table, `NULL`-filling unmatched right-side columns |
| Left table | The table named in `FROM` |
| Right table | The table named after `JOIN` |

## Lab

Run this against AdventureWorks2012 to find every product that has never
sold:

```sql
SELECT p.Name
FROM Production.Product AS p
LEFT JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID
WHERE sod.ProductID IS NULL;
```

## Check yourself

You're ready for Lesson 24 when you can answer, without looking: what
happens to the right table's columns when a `LEFT JOIN` finds no match, and
how do you use `LEFT JOIN` to find rows with no match at all?
