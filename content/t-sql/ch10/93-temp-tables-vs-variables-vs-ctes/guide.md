# Lesson 93 — Temp Tables vs. Table Variables vs. CTEs: Performance Tradeoffs

**Chapter 10 · Performance Tuning · Lesson 11 of 12**

## What you'll learn

- Three ways to hold an intermediate result set: `#temp` tables, `@table`
  variables, and CTEs
- What SQL Server actually does differently with each one under the hood
- Why "which one is fastest" depends on how much data and how many times
  you touch it
- A quick decision rule for picking between them

## The three options

```sql
-- Local temp table: a real table, physically stored in tempdb
CREATE TABLE #ActiveProducts (ProductID INT, Name NVARCHAR(50), ListPrice MONEY);

INSERT INTO #ActiveProducts
SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE SellEndDate IS NULL;
```

```sql
-- Table variable: also lives in tempdb, but scoped to the batch
DECLARE @ActiveProducts TABLE (ProductID INT, Name NVARCHAR(50), ListPrice MONEY);

INSERT INTO @ActiveProducts
SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE SellEndDate IS NULL;
```

```sql
-- CTE: not a table at all — a named, reusable subquery
WITH ActiveProducts AS (
    SELECT ProductID, Name, ListPrice
    FROM Production.Product
    WHERE SellEndDate IS NULL
)
SELECT * FROM ActiveProducts;
```

## What actually differs under the hood

| | **#Temp table** | **@Table variable** | **CTE** |
|---|---|---|---|
| Physically stored? | Yes, in tempdb | Yes, in tempdb | No — inlined into the query |
| Statistics maintained? | Yes — SQL Server tracks row counts | Historically no (SQL Server 2019+ can defer-compile and improve this) | No — re-evaluated each time |
| Can add indexes? | Yes, explicitly | Only via inline PRIMARY KEY/UNIQUE constraints | No |
| Causes recompilation? | Can, when row counts change a lot | Rarely | Not applicable — no cached plan to reuse across statements |
| Transaction-safe? | Rolled back with an enclosing transaction | **Not** rolled back — survives a ROLLBACK | Doesn't exist outside its one statement |
| Best for | Large intermediate sets, reused across multiple statements, need an index | Small sets, inside a stored procedure, avoiding recompiles | One-time readability, especially with recursion (Lesson 57) |

The single biggest practical difference: because SQL Server keeps real
statistics on a `#temp` table, the optimizer can build a much smarter plan
for a large one than for an equally large table variable, where — on older
compatibility levels — it assumes just one row and can badly under-allocate
resources. A CTE doesn't store anything at all; if you reference the same
CTE three times in one query, SQL Server may re-run its underlying query
three separate times (unless it decides to spool the result, which it
sometimes does on its own).

## A quick decision rule

- **Thousands of rows, reused more than once, might need its own index?**
  Use a **`#temp` table**.
- **A handful of rows, inside a procedure, want to dodge recompiles?**
  Use a **table variable**.
- **Just organizing one query for readability, or writing recursion?**
  Use a **CTE** — it costs nothing extra when it's small.

## Key terms

| Term | Meaning |
|---|---|
| #Temp table | A real, physically-stored table in tempdb with maintained statistics |
| Table variable | A tempdb-backed variable, batch-scoped, historically without statistics |
| CTE | A named subquery, inlined at each reference — nothing is stored |
| Recompilation | SQL Server rebuilding a query's plan, often triggered by changed statistics |

## Lab

Run against AdventureWorks2012 and compare `SET STATISTICS IO` output
(Lesson 91) across all three approaches for the same 500+ row result:

```sql
SET STATISTICS IO ON;

-- Temp table version
SELECT * INTO #Big FROM Sales.SalesOrderDetail WHERE OrderQty > 1;
SELECT COUNT(*) FROM #Big;
DROP TABLE #Big;

-- Table variable version
DECLARE @Big TABLE (SalesOrderID INT, OrderQty SMALLINT);
INSERT INTO @Big SELECT SalesOrderID, OrderQty FROM Sales.SalesOrderDetail WHERE OrderQty > 1;
SELECT COUNT(*) FROM @Big;

-- CTE version
WITH Big AS (
    SELECT SalesOrderID, OrderQty FROM Sales.SalesOrderDetail WHERE OrderQty > 1
)
SELECT COUNT(*) FROM Big;

SET STATISTICS IO OFF;
```

Compare the plans (Ctrl+M) for each — notice which one the optimizer treats
as a known quantity, and which one it has to guess about.

## Check yourself

You're ready for Lesson 94 when you can explain, without looking: why can a
table variable lead the optimizer to a worse plan than an equally large
temp table?
