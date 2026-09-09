# Lesson 91 — SET STATISTICS TIME and IO in Practice

**Chapter 10 · Performance Tuning · Lesson 9 of 12**

## What you'll learn

- How to turn on `SET STATISTICS TIME` and `SET STATISTICS IO`
- What CPU time vs. elapsed time actually tells you
- What logical reads, physical reads, and read-ahead reads mean
- How to use both together to prove a tuning change actually helped

## Why the execution plan isn't the whole story

Lesson 90 showed you the *shape* of a plan — seek vs. scan. But a shape isn't
a number. To prove that swapping a scan for a seek actually made a query
cheaper, you need real measurements: how much CPU time it burned, and how
many pages it had to read. That's exactly what these two SET options give
you, printed straight into the Messages tab every time you run a query.

## SET STATISTICS TIME

```sql
SET STATISTICS TIME ON;

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name = N'Chainring Bolts';

SET STATISTICS TIME OFF;
```

This prints two numbers for parsing and again for execution:

- **CPU time** — how much processor time the query actually consumed
- **Elapsed time** — total wall-clock time, including any waiting (for locks,
  disk I/O, or other queries competing for the same resources)

If CPU time and elapsed time are close, the query was CPU-bound. If elapsed
time is much higher than CPU time, something else — usually disk I/O or
blocking — is the real bottleneck, not the query's logic.

## SET STATISTICS IO

```sql
SET STATISTICS IO ON;

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name = N'Chainring Bolts';

SET STATISTICS IO OFF;
```

This prints, per table touched:

| Counter | Meaning |
|---|---|
| **Logical reads** | Pages read from the buffer cache (memory) — the number that matters most for tuning |
| **Physical reads** | Pages that had to come from disk because they weren't cached |
| **Read-ahead reads** | Pages SQL Server proactively pulled into cache, anticipating you'd need them |

**Logical reads is the number to watch.** It's stable across runs (unlike
timing, which can jitter with server load) and it's a direct measure of how
much work the storage engine did to answer your query.

## Proving a scan-to-seek fix actually helped

Combine both, before and after adding the index from Lesson 90:

```sql
-- BEFORE: no index on Name
SET STATISTICS IO ON;
SET STATISTICS TIME ON;

SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name = N'Chainring Bolts';

-- Expect something like: Table 'Product'. Scan count 1, logical reads 15

CREATE NONCLUSTERED INDEX IX_Product_Name
ON Production.Product (Name)
INCLUDE (ListPrice);
GO

-- AFTER: same query, now with the covering index
SELECT ProductID, Name, ListPrice
FROM Production.Product
WHERE Name = N'Chainring Bolts';

-- Expect logical reads to drop sharply — that drop IS the proof

SET STATISTICS IO OFF;
SET STATISTICS TIME OFF;
DROP INDEX IX_Product_Name ON Production.Product;
```

The `Production.Product` table is small enough that the *time* difference
may be too tiny to notice, but the **logical reads count will drop** —
proving the index change genuinely reduced the work, independent of how
busy the server happened to be at that moment.

## Key terms

| Term | Meaning |
|---|---|
| SET STATISTICS TIME | Prints CPU time and elapsed time for parsing and execution |
| SET STATISTICS IO | Prints logical reads, physical reads, and read-ahead reads per table |
| CPU time | Processor time actually consumed by the query |
| Elapsed time | Total wall-clock time, including waits |
| Logical reads | Pages read from cache — the most stable, most important IO number |
| Physical reads | Pages that had to be pulled from disk |

## Lab

Run against AdventureWorks2012:

```sql
SET STATISTICS IO ON;
SET STATISTICS TIME ON;

-- 1. Run this and note the logical reads for SalesOrderHeader
SELECT SalesOrderID, OrderDate, TotalDue
FROM Sales.SalesOrderHeader
WHERE CustomerID = 29825;

-- 2. Add a covering index and re-run — compare the logical reads
CREATE NONCLUSTERED INDEX IX_SOH_CustomerID
ON Sales.SalesOrderHeader (CustomerID)
INCLUDE (OrderDate, TotalDue);
GO

SELECT SalesOrderID, OrderDate, TotalDue
FROM Sales.SalesOrderHeader
WHERE CustomerID = 29825;

SET STATISTICS IO OFF;
SET STATISTICS TIME OFF;

-- Clean up
DROP INDEX IX_SOH_CustomerID ON Sales.SalesOrderHeader;
```

## Check yourself

You're ready for Lesson 92 when you can explain, without looking: why is
logical reads usually a more trustworthy tuning metric than elapsed time?
