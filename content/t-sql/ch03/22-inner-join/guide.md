# Lesson 22 — INNER JOIN

**Chapter 3 · Joining Tables · Lesson 2 of 11**

## What you'll learn

- Your first `JOIN` — combining rows from two tables
- `JOIN ... ON` syntax
- What `INNER JOIN` actually keeps and drops
- Table aliases for joined queries

## Your first JOIN

```sql
USE AdventureWorks2012;
GO

SELECT p.Name, p.ListPrice, sod.OrderQty
FROM Production.Product AS p
INNER JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID;
```

Read this top to bottom: `FROM` names the first table, `INNER JOIN` names
the second, and `ON` specifies the **predicate** (Lesson 20) that decides
which rows from each table get paired together — here, rows where the
`ProductID` matches.

## Table aliases in joins

`p` and `sod` are **table aliases** — short stand-ins for the full table
names, defined with `AS` right after each table (`AS` is optional here too,
just like column aliases in Lesson 5, but this course always writes it).
Once tables share a column name like `ProductID`, you **must** qualify
which table's column you mean: `p.ProductID` vs. `sod.ProductID`. Aliases
make that qualification much shorter to type and read.

## What INNER JOIN keeps

`INNER JOIN` returns **only** the rows where the `ON` condition is true on
**both sides**. A product with zero sales orders never appears in this
result — there's no `SalesOrderDetail` row to pair it with, so the `ON`
condition never matches for it. Likewise, a `SalesOrderDetail` row somehow
referencing a nonexistent `ProductID` would also be dropped.

This is the key thing to remember about `INNER JOIN`: **it only returns
matches.** Everything unmatched on either side disappears from the result.
Lesson 23 (`LEFT JOIN`) is entirely about the alternative — keeping
unmatched rows too.

## Combining with WHERE

Everything from Chapter 2 still works after a join:

```sql
SELECT p.Name, p.ListPrice, sod.OrderQty
FROM Production.Product AS p
INNER JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID
WHERE p.Color = 'Red'
ORDER BY sod.OrderQty DESC;
```

`WHERE` filters the **combined, already-joined** rows — it runs after the
join has already happened.

## Key terms

| Term | Meaning |
|---|---|
| `JOIN` | Combines rows from two (or more) tables based on a condition |
| `ON` | The predicate that decides which rows get paired |
| Table alias | A short stand-in name for a table, defined with `AS` |
| `INNER JOIN` | Returns only rows that match on both sides |

## Lab

Run this against AdventureWorks2012 and confirm every row has both a
product name and an order quantity — no blanks:

```sql
SELECT p.Name, p.ListPrice, sod.OrderQty
FROM Production.Product AS p
INNER JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID;
```

## Check yourself

You're ready for Lesson 23 when you can answer, without looking: what does
`INNER JOIN` do with a row that has no match on the other side, and why do
table aliases matter once two tables share a column name?
