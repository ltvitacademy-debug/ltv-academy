# Lesson 94 — Common T-SQL Performance Anti-Patterns

**Chapter 10 · Performance Tuning · Lesson 12 of 12**

## What you'll learn

This chapter's finale: five habits that quietly wreck performance, each one
tying back to a tool you now have to catch and fix it — execution plans
(Lesson 90), STATISTICS IO/TIME (Lesson 91), SARGability (Lesson 87), and
indexing (Lessons 88–89).

## Anti-pattern 1 — SELECT *

```sql
-- Pulls every column, even ones you never use
SELECT * FROM Sales.SalesOrderDetail WHERE SalesOrderID = 43659;

-- Name only what you need
SELECT SalesOrderID, ProductID, OrderQty, UnitPrice
FROM Sales.SalesOrderDetail WHERE SalesOrderID = 43659;
```

`SELECT *` can silently defeat a covering index (Lesson 89) — if the index
only includes the columns you actually need, but you ask for all of them,
SQL Server has to fall back to a Key Lookup or a full scan. Naming columns
explicitly is also what lets a narrow covering index work at all.

## Anti-pattern 2 — non-SARGable predicates and implicit conversions

```sql
-- Non-SARGable: a function wraps the column, so no index can be used
SELECT * FROM Person.Person WHERE UPPER(LastName) = 'SMITH';

-- Implicit conversion: comparing an INT column against an NVARCHAR literal
-- forces SQL Server to convert every row's value before it can compare
SELECT * FROM Production.Product WHERE ProductID = '712';
```

Both of these were covered in depth in Lesson 87 — they belong on this list
because they're the single most common reason a "should be fast" query
turns out to be scanning the whole table. Check Ctrl+M (Lesson 90): if you
see a scan where you expected a seek, check the `WHERE` clause first.

## Anti-pattern 3 — row-by-row cursors instead of set-based logic

```sql
-- Slow: one row at a time, with all the overhead that implies
DECLARE @ProductID INT;
DECLARE cur CURSOR FOR SELECT ProductID FROM Production.Product WHERE Color = 'Red';
OPEN cur;
FETCH NEXT FROM cur INTO @ProductID;
WHILE @@FETCH_STATUS = 0
BEGIN
    UPDATE Production.Product SET ListPrice = ListPrice * 1.1 WHERE ProductID = @ProductID;
    FETCH NEXT FROM cur INTO @ProductID;
END
CLOSE cur; DEALLOCATE cur;

-- Fast: SQL Server updates the whole set in one operation
UPDATE Production.Product
SET ListPrice = ListPrice * 1.1
WHERE Color = 'Red';
```

SQL Server's engine is built to process **sets** of rows efficiently, not to
loop. A cursor asks it to abandon that strength and process one row at a
time — almost always dramatically slower for anything beyond a handful of
rows. If you find yourself reaching for `FETCH NEXT`, ask whether the same
result can be expressed as a single `UPDATE`/`INSERT`/`SELECT`.

## Anti-pattern 4 — scalar functions called per row in a WHERE clause

```sql
-- A scalar UDF gets invoked once for every row in the table — hidden cursor
SELECT * FROM Sales.SalesOrderHeader
WHERE dbo.udf_FiscalYear(OrderDate) = 2013;

-- Rewritten as a plain date range: SARGable, and no per-row function calls
SELECT * FROM Sales.SalesOrderHeader
WHERE OrderDate >= '2012-07-01' AND OrderDate < '2013-07-01';
```

A scalar user-defined function in a `WHERE` clause is a cursor in disguise —
SQL Server calls it separately for every row it evaluates, and (like
`UPPER()` in anti-pattern 2) it's also non-SARGable, so no index helps
either. This is one of the most expensive, hardest-to-spot mistakes in
production T-SQL.

## The Chapter 10 checklist

Before you ship a query, ask:

1. Am I selecting only the columns I need?
2. Is every `WHERE`/`JOIN` predicate SARGable — column bare on one side, no
   wrapping function, matching data types?
3. Could this loop be one set-based statement instead?
4. Does a covering index (Lesson 89) already exist, or is one worth adding?
5. Did I check the actual plan (Lesson 90) and the logical reads
   (Lesson 91) before declaring victory?

## Key terms

| Term | Meaning |
|---|---|
| SARGable | A predicate the optimizer can satisfy with an index seek |
| Implicit conversion | An automatic data-type conversion forced by mismatched types in a comparison |
| Cursor | Row-by-row processing — the opposite of SQL Server's set-based strength |
| Scalar UDF | A user-defined function returning one value, invoked once per row when used in a predicate |

## Lab

Run against AdventureWorks2012, comparing `SET STATISTICS IO` (Lesson 91)
for the anti-pattern vs. the fix:

```sql
SET STATISTICS IO ON;

-- Anti-pattern: implicit conversion
SELECT * FROM Production.Product WHERE ProductID = '712';

-- Fix: matching type
SELECT * FROM Production.Product WHERE ProductID = 712;

SET STATISTICS IO OFF;
```

Compare the logical reads between the two — identical query intent, very
different cost.

## Check yourself

You've finished Chapter 10 when you can look at an unfamiliar query and spot,
without running it, at least two of these five anti-patterns if they're
present.
