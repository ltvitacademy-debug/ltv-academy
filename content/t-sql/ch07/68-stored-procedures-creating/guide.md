# Lesson 68 — Stored Procedures: Creating

**Chapter 7 · Programming with T-SQL · Lesson 7 of 10**

## What you'll learn

- `CREATE PROCEDURE` — saving a whole script under a name
- Running a stored procedure with `EXEC`
- How a stored procedure differs from a view (Lesson 58)
- `ALTER PROCEDURE` and `DROP PROCEDURE`

## What is a stored procedure?

A **view** (Lesson 58) saves a single `SELECT` statement. A **stored
procedure** goes further — it saves an **entire script**: multiple
statements, variables, `IF`/`ELSE`, loops, anything you've learned this
chapter, all bundled together under one name and run as a unit.

## Creating a stored procedure

```sql
USE AdventureWorks2012;
GO

CREATE PROCEDURE usp_GetExpensiveProducts
AS
BEGIN
    SELECT Name, ListPrice
    FROM Production.Product
    WHERE ListPrice > 1000
    ORDER BY ListPrice DESC;
END
```

`usp_` is a common (optional) naming prefix — "user stored procedure" —
that this course uses consistently, mirroring the `vw_` convention for
views. Everything between `AS` and the matching `END` is the procedure's
body.

## Running a stored procedure

```sql
EXEC usp_GetExpensiveProducts;
```

`EXEC` (or the full word `EXECUTE`) runs the procedure — its entire body
executes as if you'd pasted it in and run it directly, but now it's a
single, reusable, one-line call.

## Multiple statements inside a procedure

Unlike a view, a procedure's body can contain **anything** — this is the
whole point:

```sql
CREATE PROCEDURE usp_ProductCatalogSize
AS
BEGIN
    DECLARE @ProductCount INT;
    SELECT @ProductCount = COUNT(*) FROM Production.Product;

    IF @ProductCount > 500
        PRINT 'Large catalog';
    ELSE
        PRINT 'Small catalog';
END
```

## Modifying and removing a procedure

```sql
ALTER PROCEDURE usp_GetExpensiveProducts
AS
BEGIN
    SELECT Name, ListPrice, Color
    FROM Production.Product
    WHERE ListPrice > 1000
    ORDER BY ListPrice DESC;
END

DROP PROCEDURE usp_GetExpensiveProducts;
```

Just like a view: `ALTER PROCEDURE` redefines it, `DROP PROCEDURE` removes
it permanently.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE PROCEDURE` | Saves a full script (statements, logic, everything) under a name |
| `EXEC` / `EXECUTE` | Runs a stored procedure |
| View vs. procedure | A view saves one `SELECT`; a procedure saves an entire script |

## Lab

Create and run a procedure against AdventureWorks2012:

```sql
CREATE PROCEDURE usp_RedProductCount
AS
BEGIN
    SELECT COUNT(*) AS RedProductCount
    FROM Production.Product
    WHERE Color = 'Red';
END

EXEC usp_RedProductCount;
```

## Check yourself

You're ready for Lesson 69 when you can answer, without looking: what's
the fundamental difference between a view and a stored procedure, and how
do you run a stored procedure once it's created?
