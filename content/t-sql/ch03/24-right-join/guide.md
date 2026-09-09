# Lesson 24 — RIGHT JOIN

**Chapter 3 · Joining Tables · Lesson 4 of 11**

## What you'll learn

- `RIGHT JOIN` — the mirror image of `LEFT JOIN`
- Why `RIGHT JOIN` is rare in practice
- Rewriting any `RIGHT JOIN` as a `LEFT JOIN`
- Why this course prefers `LEFT JOIN` for consistency

## RIGHT JOIN — keep everything on the right

```sql
USE AdventureWorks2012;
GO

SELECT p.Name, sod.SalesOrderID, sod.OrderQty
FROM Sales.SalesOrderDetail AS sod
RIGHT JOIN Production.Product AS p
    ON sod.ProductID = p.ProductID;
```

`RIGHT JOIN` keeps every row from the table on the **right** side of the
`JOIN` keyword — here, `Production.Product` — whether or not it matches
anything on the left. It's the exact mirror image of Lesson 23's
`LEFT JOIN`.

## Every RIGHT JOIN can be rewritten as a LEFT JOIN

Notice something: this query returns **the exact same result** as Lesson
23's `LEFT JOIN` example. That's not a coincidence — you can always rewrite
a `RIGHT JOIN` as a `LEFT JOIN` by simply swapping which table is named
first:

```sql
-- Same result as the RIGHT JOIN above
SELECT p.Name, sod.SalesOrderID, sod.OrderQty
FROM Production.Product AS p
LEFT JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID;
```

## Why this course prefers LEFT JOIN

`RIGHT JOIN` isn't wrong, but it's rare in real-world code, mainly because
it reads less naturally: as a query grows to join three, four, or five
tables, keeping track of "which table is the important one that must
always appear" is far easier when it's consistently the **first** table
named. **This course always uses `LEFT JOIN`, never `RIGHT JOIN`** — not
because `RIGHT JOIN` is broken, but for that consistency. You should still
recognize `RIGHT JOIN` on sight, because you'll see it in other people's
code.

## Key terms

| Term | Meaning |
|---|---|
| `RIGHT JOIN` | Keeps every row from the right table, `NULL`-filling unmatched left-side columns |
| Rewriting | Any `RIGHT JOIN` can become an equivalent `LEFT JOIN` by swapping table order |

## Lab

Run both queries above against AdventureWorks2012 and confirm they return
identical results:

```sql
SELECT p.Name, sod.SalesOrderID, sod.OrderQty
FROM Sales.SalesOrderDetail AS sod
RIGHT JOIN Production.Product AS p
    ON sod.ProductID = p.ProductID;

SELECT p.Name, sod.SalesOrderID, sod.OrderQty
FROM Production.Product AS p
LEFT JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID;
```

## Check yourself

You're ready for Lesson 25 when you can answer, without looking: how do you
rewrite any `RIGHT JOIN` as an equivalent `LEFT JOIN`, and why does this
course consistently prefer `LEFT JOIN`?
