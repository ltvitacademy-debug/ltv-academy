# Lesson 73 — Inline Table-Valued Functions

**Chapter 7 · Programming with T-SQL · Lesson 12 of 16**

## What you'll learn

- `CREATE FUNCTION ... RETURNS TABLE AS RETURN (...)` syntax
- Calling an inline table-valued function (iTVF) in a `FROM` clause
- Why an iTVF doesn't have the scalar UDF performance problem
- A parameterized-view mental model

## Writing an inline table-valued function

An **inline table-valued function (iTVF)** returns a whole table —
but its entire body is a **single `SELECT` statement**, with no
`BEGIN/END` and no separate variable:

```sql
USE AdventureWorks2012;
GO

CREATE FUNCTION dbo.ProductsBySubcategory(@SubcategoryID int)
RETURNS TABLE
AS
RETURN (
    SELECT ProductID, Name, ListPrice, StandardCost
    FROM Production.Product
    WHERE ProductSubcategoryID = @SubcategoryID
);
```

Notice the shape: `RETURNS TABLE AS RETURN (SELECT ...)` — no column
list, no `BEGIN/END`, just one query wrapped in parentheses after
`RETURN`.

## Calling it like a table

You call an iTVF in a `FROM` clause, the same way you'd use a regular
table or a view — but now you can pass it a parameter:

```sql
SELECT * FROM dbo.ProductsBySubcategory(1);

-- or join it like any other table:
SELECT p.Name, p.ListPrice, soh.OrderDate
FROM dbo.ProductsBySubcategory(1) AS p
JOIN Sales.SalesOrderDetail AS sod ON sod.ProductID = p.ProductID
JOIN Sales.SalesOrderHeader AS soh ON soh.SalesOrderID = sod.SalesOrderID;
```

That's the key difference from a scalar UDF right there: you're calling
it in `FROM`, not in `SELECT`, because it hands back **rows**, not a
single value.

## Why iTVFs don't have the scalar UDF problem

A scalar UDF (Lesson 72) is a black box the optimizer calls per row.
An iTVF is different: because its body is literally one `SELECT`
statement, SQL Server can **substitute that `SELECT` directly into the
calling query**, expanding the parameter, and optimize the whole thing
as one combined plan — exactly the way it already treats a
**parameterized view**.

That means an iTVF gets the same join reordering, index selection, and
parallelism as if you'd pasted the underlying query in by hand. There is
no row-by-row call, because there's no separate execution to call —
the optimizer sees straight through it.

## The parameterized-view mental model

If you already think of a view as "a saved `SELECT` you can query like a
table," an iTVF is the same idea with a parameter slot added. Anywhere
you'd reach for a view but wished you could filter it with an argument
instead of a `WHERE` clause bolted on afterward, an iTVF is usually the
right tool.

## Key terms

| Term | Meaning |
|---|---|
| iTVF | `RETURNS TABLE AS RETURN (SELECT ...)` — a function returning a table, body is one SELECT |
| Inlining (by design) | The optimizer substitutes the iTVF's SELECT directly into the calling query |
| Parameterized view | The closest mental model: a view, but with an argument |

## Lab

Create `dbo.ProductsBySubcategory` above. Call it for a couple of
different `@SubcategoryID` values, then join it to
`Sales.SalesOrderDetail` and `Sales.SalesOrderHeader` to see each
product's order history, filtered to one subcategory with a single
parameter.

## Check yourself

You're ready for Lesson 74 when you can answer, without looking: what
makes an iTVF's body different from a scalar UDF's body, and why does
that difference mean the optimizer can "see through" an iTVF the way it
can't a scalar UDF?
