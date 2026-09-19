# Lesson 15 — Table Partitioning & Large Database Strategies

**Chapter 3 · Designing & Scaling Database Resources · Lesson 2 of 5**

## What you'll learn

- Table partitioning — splitting one table's storage into pieces by a partition key
- Why this is a completely different `PARTITION BY` than the one T-SQL Development taught you
- `CREATE PARTITION FUNCTION` and `CREATE PARTITION SCHEME`, and how a table uses them
- The two real payoffs: faster maintenance, and sometimes faster queries

## Not the `PARTITION BY` you already know

T-SQL Development's window functions lesson taught you `OVER (PARTITION
BY Color)` — a clause that groups rows for a calculation without
changing the result set. **Table partitioning is unrelated**, despite
sharing a word. Table partitioning is a physical storage decision: it
splits *one table's data* across multiple internal storage units,
based on the value of a chosen column (almost always a date). Nothing
here was covered in T-SQL Development — this is genuinely new
administration territory.

## Why you'd bother

A single table with 500 million rows of order history is one giant
object to Microsoft. Rebuilding an index on it, checking its
integrity, or archiving old rows all touch the *entire* table.
Partitioning breaks that one giant object into named pieces (still one
logical table to every query) so maintenance can target **one piece**
instead of the whole thing.

## The two objects you build

```sql
-- 1. The partition FUNCTION: where do the boundaries fall?
CREATE PARTITION FUNCTION PF_OrderDateRange (DATE)
AS RANGE RIGHT FOR VALUES ('2024-01-01', '2025-01-01', '2026-01-01');

-- 2. The partition SCHEME: which filegroup does each piece live on?
CREATE PARTITION SCHEME PS_OrderDateRange
AS PARTITION PF_OrderDateRange
ALL TO ([PRIMARY]);

-- 3. The table is built ON the scheme, using its partitioning column
CREATE TABLE dbo.OrderHistory (
  OrderID     INT IDENTITY PRIMARY KEY,
  OrderDate   DATE NOT NULL,
  CustomerID  INT NOT NULL
) ON PS_OrderDateRange (OrderDate);
```

The **function** defines the boundary values (four ranges, from three
boundary points). The **scheme** maps each of those ranges onto a
filegroup. The table is created *on the scheme*, naming the column
(`OrderDate`) that decides which partition each row lands in.

## Payoff #1: maintenance targets one partition

```sql
-- Rebuild ONLY the partition holding 2025 data --
-- not the entire multi-hundred-million-row table
ALTER INDEX ALL ON dbo.OrderHistory
REBUILD PARTITION = 3;
```

Instead of a maintenance window long enough to rebuild every index on
the whole table, you rebuild the one partition that actually
fragmented — usually the newest, most-active one. Old, cold partitions
holding 2024 data stay untouched.

## Payoff #2: sometimes, faster queries too

If a query filters on the partitioning column (`WHERE OrderDate >=
'2025-01-01'`), the optimizer can perform **partition elimination** —
skipping partitions it already knows can't contain matching rows,
instead of scanning the whole table. This is a bonus, not the primary
reason to partition; the maintenance win is usually the real driver.

## Key terms

| Term | Meaning |
|---|---|
| Partition function | Defines the boundary values that split a column's range into pieces |
| Partition scheme | Maps each piece from the function onto a filegroup |
| Partition elimination | The optimizer skipping partitions that can't match a filter — a query-performance bonus |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
is table partitioning's `PARTITION BY` a completely different thing
from the `OVER (PARTITION BY ...)` you learned in T-SQL Development,
and what's the main reason a DBA partitions a large table?
