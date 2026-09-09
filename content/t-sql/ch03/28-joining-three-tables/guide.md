# Lesson 28 — Joining Three or More Tables

**Chapter 3 · Joining Tables · Lesson 8 of 11**

## What you'll learn

- Chaining multiple `JOIN` clauses in one query
- Each `JOIN` connects to what came before it, not always the original table
- Mixing join types in one query
- Keeping a multi-table query readable

## Chaining JOINs

There's no limit to how many tables one query can join — just add another
`JOIN` clause:

```sql
USE AdventureWorks2012;
GO

SELECT soh.OrderDate, p.Name AS ProductName, sod.OrderQty, per.FirstName, per.LastName
FROM Sales.SalesOrderHeader AS soh
INNER JOIN Sales.SalesOrderDetail AS sod
    ON soh.SalesOrderID = sod.SalesOrderID
INNER JOIN Production.Product AS p
    ON sod.ProductID = p.ProductID
INNER JOIN Person.Person AS per
    ON soh.CustomerID = per.BusinessEntityID;
```

This connects **four** tables: order headers, order line details, products,
and the person who placed the order. Read it top to bottom — each `JOIN`
adds one more table into the growing combined result.

## Each JOIN connects to whatever came before

A `JOIN`'s `ON` clause doesn't have to reference the very first table in
`FROM` — it just needs to reference **some column already available** at
that point in the query. Above, the second `JOIN` connects to `sod`
(introduced by the *first* `JOIN`), not to `soh` directly. By the third
`JOIN`, all of `soh`, `sod`, and `p` are "already available" to reference.

## Mixing join types

Nothing stops you from combining `INNER JOIN` and `LEFT JOIN` in the same
query, when that's what the question actually needs:

```sql
SELECT p.Name, sod.OrderQty
FROM Production.Product AS p
LEFT JOIN Sales.SalesOrderDetail AS sod
    ON p.ProductID = sod.ProductID
INNER JOIN Production.ProductSubcategory AS ps
    ON p.ProductSubcategoryID = ps.ProductSubcategoryID;
```

This keeps every product (even unsold ones, via `LEFT JOIN`) while still
requiring each product to have a valid subcategory (via `INNER JOIN`).

## Keeping it readable

Once a query joins three or more tables, formatting discipline (Lesson 10)
matters even more:

- One `JOIN` per set of lines, indented consistently
- Short, meaningful aliases (`soh`, `sod`, not `t1`, `t2`)
- List columns in the `SELECT` with their table alias, even where not
  strictly required, so a reader always knows which table a column came
  from

## Key terms

| Term | Meaning |
|---|---|
| Chained `JOIN` | Multiple `JOIN` clauses in one query, each adding another table |

## Lab

Run the four-table query above against AdventureWorks2012 and identify,
for one output row, which table each column came from.

## Check yourself

You're ready for Lesson 29 when you can answer, without looking: can a
`JOIN`'s `ON` clause reference a table introduced earlier in the same query
(not just the very first table), and can `INNER JOIN` and `LEFT JOIN` be
mixed in one query?
