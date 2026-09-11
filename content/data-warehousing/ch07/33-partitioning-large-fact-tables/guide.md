# Lesson 33 — Partitioning Large Fact Tables

**Chapter 7 · Building the Warehouse · Lesson 33 of 39**

## What you'll learn

- Why even a columnstore-indexed fact table eventually needs
  partitioning, and what problem partitioning actually solves
- How `CREATE PARTITION FUNCTION` and `CREATE PARTITION SCHEME` work
  together to physically split a fact table
- Why a date column is almost always the partitioning column for a
  fact table
- How partitioning enables fast data loading and purging via
  `SWITCH`, without touching the rest of the table

## The problem partitioning solves

A clustered columnstore index (Lesson 32) makes querying a large fact
table fast, but it doesn't solve every operational problem. Two show
up constantly at real warehouse scale:

- **Loading new data.** Appending a new day's or month's rows into a
  single giant table structure means the whole table is affected by
  maintenance operations, and old data has to coexist with new data in
  the same physical structure.
- **Purging old data.** Deleting rows older than a retention window
  (say, 7 years) as a row-by-row `DELETE` against a billion-row table
  is a slow, heavily-logged operation.

**Partitioning** splits a table into multiple physical partitions
based on the values in one column, while it still behaves as a single
logical table to every query written against it.

## Two pieces: partition function, then partition scheme

A **partition function** maps column values to partition numbers. A
**partition scheme** then maps those partition numbers to actual
filegroups (or, for a simple setup, all of them to `[PRIMARY]`).

```sql
-- Step 1: define the boundaries — one partition per year,
-- keyed on an INT YYYYMMDD-style column (RANGE RIGHT means each
-- boundary value starts a NEW partition).
CREATE PARTITION FUNCTION PF_FactSales_ByYear (INT)
    AS RANGE RIGHT FOR VALUES (20220101, 20230101, 20240101, 20250101);

-- Step 2: map each partition to a filegroup (all to PRIMARY here).
CREATE PARTITION SCHEME PS_FactSales_ByYear
    AS PARTITION PF_FactSales_ByYear
    ALL TO ([PRIMARY]);
```

That partition function on four boundary values creates five
partitions: everything before 2022, then one partition per year
through 2024, then everything from 2025 onward.

## Applying the scheme to the fact table

The fact table's `CREATE TABLE` statement then places itself `ON` the
partition scheme, using the same column the function is defined over
as the partitioning column — in a warehouse, this is almost always the
integer date key, exactly because that's also the natural boundary for
loading and purging:

```sql
CREATE TABLE dbo.Fact_Sales (
    SalesOrderKey  BIGINT       NOT NULL,
    DateKey        INT          NOT NULL,
    ProductKey     INT          NOT NULL,
    CustomerKey    INT          NOT NULL,
    SalesAmount    DECIMAL(19,4) NOT NULL
) ON PS_FactSales_ByYear (DateKey);
```

## Why this matters: `SWITCH`

Once a table is partitioned, `ALTER TABLE ... SWITCH PARTITION` moves
an entire partition in or out of the table as a fast metadata
operation — no row-by-row copying, regardless of how many rows the
partition holds. This is what makes partitioning operationally
valuable, not just theoretically tidy: a nightly load can build a new
partition and `SWITCH` it in; a retention job can `SWITCH` the oldest
partition out to an archive table and drop it, instantly.

## Key terms

| Term | Meaning |
|---|---|
| Partition function | Maps column values to partition numbers, defining the boundaries |
| Partition scheme | Maps partition numbers to physical filegroups |
| Partitioning column | The fact table column the partitioning is based on — almost always the date key |
| `SWITCH` | Moves a whole partition in or out of a table as a near-instant metadata operation |

## Lab

1. Create the partition function and scheme above in a scratch
   database, then create `Fact_Sales` `ON` that scheme, keyed by
   `DateKey`.
2. Insert a few rows spanning 2022 through 2025 and query
   `sys.partitions` for the table to confirm rows landed in the
   partition you expect for each date.
3. Research (or predict from the boundary values above) which
   partition number a row with `DateKey = 20240615` lands in, then
   verify it against `sys.partitions`.

## Check yourself

You're ready for Lesson 34 when you can explain, without looking: what
two T-SQL objects define a partitioned table's physical layout, why
the date key is almost always the partitioning column on a fact table,
and what operational problem `SWITCH PARTITION` solves that a plain
`DELETE` doesn't.
