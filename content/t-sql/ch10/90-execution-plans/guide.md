# Lesson 90 — Reading Execution Plans: Scans vs. Seeks

**Chapter 10 · Performance Tuning · Lesson 8 of 12**

## What you'll learn

- How to turn on and read an **actual execution plan** in SSMS
- What an **Index Seek** and an **Index Scan** actually mean
- Why a scan on a big table is usually the first thing to investigate
- How the two indexing lessons before this one (basic, then filtered/included)
  show up as *seeks* in a good plan

## Turning on the execution plan

Every query you run gets compiled into a plan — a tree of physical operations
SQL Server decided was the cheapest way to answer it. You don't have to guess
at that plan. Click **Include Actual Execution Plan** on the toolbar (or press
**Ctrl+M**) before you run a query, and SSMS adds a new results tab showing
exactly what happened.

![The SSMS toolbar with the Include Actual Execution Plan button highlighted, tooltip reading Include Actual Execution Plan (Ctrl+M).](/courses/t-sql/ch10/90-execution-plans/actual-execution-plan-toolbar.png)
*One click (or Ctrl+M) turns this on for every query you run afterward — leave it on while you're tuning.*

Run your query, then switch to the new **Execution plan** tab next to Results
and Messages.

![An SSMS actual execution plan showing a tree of Hash Match join operators feeding from several Index Scan and Clustered Index Scan operators, each annotated with cost percentages and row counts.](/courses/t-sql/ch10/90-execution-plans/actual-execution-plan.png)
*Read right-to-left, bottom-to-top: data flows out of the scans/seeks on the right, up through the joins, to the SELECT on the far left.*

## The two operators that matter most

| Operator | What it means | When you see it |
|---|---|---|
| **Index Seek** | SQL Server used the index's B-tree to jump straight to the rows it needed | A `WHERE`/`JOIN` column is indexed and SARGable — the fast path |
| **Index Scan** / **Clustered Index Scan** | SQL Server read through every row of the index (or table) in order, checking each one | No useful index exists, the predicate isn't SARGable, or the query genuinely needs most of the rows |

A scan isn't automatically wrong — a query that legitimately needs 90% of a
table is often *cheaper* to scan than to seek row-by-row. The red flag is a
scan against a **large** table when you only expected a handful of rows back.
That gap between "rows read" and "rows actually needed" is exactly what
Lesson 87's SARGable rules and Lesson 88's index design exist to close.

```sql
-- Turn on the plan (Ctrl+M), then run this against AdventureWorks2012
SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name = N'Chainring Bolts';
```

Without an index on `Name`, this produces a **Clustered Index Scan** — every
row read, one by one, to find the match. Now add the index from Lesson 88 and
run it again:

```sql
CREATE NONCLUSTERED INDEX IX_Product_Name
ON Production.Product (Name);
GO

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name = N'Chainring Bolts';
```

Same query, same result — but the plan now shows an **Index Seek**, plus a
small **Key Lookup** to fetch `ListPrice` (because it isn't part of the index).
Add `INCLUDE (ListPrice)` and the Key Lookup disappears too — a fully covering
seek, no scan anywhere in the plan.

## Reading cost percentages

Every operator shows a **Cost: N%** — its share of the total estimated cost
of the whole query, not wall-clock time by itself. When one operator's
percentage dwarfs the rest, that's where your tuning attention belongs first.
Hovering over any operator (in a real SSMS session) also shows estimated vs.
actual row counts — a huge gap between those two numbers usually means SQL
Server's statistics are stale, which is its own kind of performance problem.

## Key terms

| Term | Meaning |
|---|---|
| Actual execution plan | The real plan SQL Server used, with true row counts (Ctrl+M) |
| Estimated execution plan | The plan SQL Server *would* use, without running the query (Ctrl+L) |
| Index Seek | Direct B-tree navigation to the needed rows — the fast path |
| Index Scan / Clustered Index Scan | Reading every row in the index/table, in order |
| Key Lookup | A follow-up trip back to the clustered index for a column not in a nonclustered index |
| Cost % | An operator's share of the query's total estimated cost |

## Lab

Run each step against AdventureWorks2012, with Ctrl+M turned on before every
query:

```sql
-- 1. Scan: no index exists yet on Name
SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name = N'Chainring Bolts';

-- 2. Add the index, then re-run the same SELECT — watch it become a Seek + Key Lookup
CREATE NONCLUSTERED INDEX IX_Product_Name
ON Production.Product (Name);
GO

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name = N'Chainring Bolts';

-- 3. Add INCLUDE and re-run once more — the Key Lookup disappears entirely
DROP INDEX IX_Product_Name ON Production.Product;
GO

CREATE NONCLUSTERED INDEX IX_Product_Name
ON Production.Product (Name)
INCLUDE (ListPrice);
GO

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name = N'Chainring Bolts';

-- Clean up
DROP INDEX IX_Product_Name ON Production.Product;
```

## Check yourself

You're ready for Lesson 91 when you can explain, without looking: what's the
difference between an Index Seek and an Index Scan, and what change turned
this lesson's scan into a seek?
