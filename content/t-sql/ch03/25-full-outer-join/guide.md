# Lesson 25 — FULL OUTER JOIN

**Chapter 3 · Joining Tables · Lesson 5 of 11**

## What you'll learn

- `FULL OUTER JOIN` — keeping unmatched rows from both sides at once
- How `NULL`s can appear on either side of the result
- Combining all four join types into one mental model
- Finding rows unmatched on either side

## FULL OUTER JOIN — everything, matched or not

You've now seen `INNER JOIN` (matches only), `LEFT JOIN` (everything from
the left), and `RIGHT JOIN` (everything from the right).
`FULL OUTER JOIN` combines both directions at once: **every row from
both tables** appears, whether it has a match on the other side or not.

```sql
USE AdventureWorks2012;
GO

SELECT p.Name, sod.SalesOrderID, sod.OrderQty
FROM Production.Product AS p
FULL OUTER JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID;
```

This returns:
- Products that **have** sold, matched with their order details
- Products that have **never** sold, with `NULL` in every `sod` column
- (In principle) order detail rows referencing a product that no longer
  exists, with `NULL` in every `p` column — rare in a well-maintained
  database with foreign key constraints (Chapter 11), but structurally
  possible

## The four join types, side by side

| Join type | What it keeps |
|---|---|
| `INNER JOIN` | Only rows matching on both sides |
| `LEFT JOIN` | Everything from the left, `NULL`-filled where unmatched on the right |
| `RIGHT JOIN` | Everything from the right, `NULL`-filled where unmatched on the left |
| `FULL OUTER JOIN` | Everything from both sides, `NULL`-filled wherever there's no match |

## Finding rows unmatched on either side

Just like `LEFT JOIN` + `IS NULL` found one-sided gaps (Lesson 23),
`FULL OUTER JOIN` + `IS NULL` on **both** join columns finds every gap,
from either direction, in a single query:

```sql
SELECT p.Name, sod.SalesOrderID
FROM Production.Product AS p
FULL OUTER JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID
WHERE p.ProductID IS NULL OR sod.ProductID IS NULL;
```

## Key terms

| Term | Meaning |
|---|---|
| `FULL OUTER JOIN` | Keeps every row from both tables, `NULL`-filling wherever a match is missing |

## Lab

Run this against AdventureWorks2012 and compare its row count to plain
`INNER JOIN` on the same tables:

```sql
SELECT p.Name, sod.SalesOrderID
FROM Production.Product AS p
FULL OUTER JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID;
```

## Check yourself

You're ready for Lesson 26 when you can answer, without looking: what does
`FULL OUTER JOIN` return that neither `LEFT JOIN` nor `RIGHT JOIN` alone
would, and how would you find every unmatched row from either side?
