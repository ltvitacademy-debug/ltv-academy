# Lesson 44 — Micro-Partitions & Partition Pruning

**Chapter 10 · Performance Optimization · Lesson 44 of 60**

## What you'll learn

- How Snowflake automatically divides every table into micro-partitions
- What metadata Snowflake keeps per micro-partition, and why
- How pruning uses that metadata to skip data before scanning it
- How this differs from the manual partitioning you'd set up in SQL Server

## Coming from SQL Server: partitioning was something you designed

In SQL Server, partitioning a large table is a deliberate design
decision — you pick a partition function, a partition scheme, choose
a partitioning column (often a date), and maintain that scheme as data
grows. Get it wrong and queries don't benefit; get it right and it
takes real planning up front.

Snowflake removes that decision entirely. **Every table is
automatically divided into micro-partitions** the moment data lands in
it — contiguous, immutable units of storage, each holding somewhere
between 50 and 500 MB of uncompressed data (compressed, roughly 8–16
MB on disk). You never create them, name them, or choose a key for
them. Loading, updating, or deleting rows just produces new
micro-partitions behind the scenes.

## What Snowflake tracks about each one

The part that makes micro-partitions useful for performance, not just
storage: Snowflake's cloud services layer keeps **metadata for every
micro-partition** — critically, the minimum and maximum value of each
column within it. That metadata lives separately from the data itself
and costs nothing to check, because reading it doesn't touch the
actual warehouse compute or the stored rows at all.

## Pruning: skipping partitions before scanning them

**Partition pruning** is what that metadata makes possible. When a
query has a filter — `WHERE order_date = '2024-06-01'`, say — Snowflake
checks each micro-partition's min/max metadata for the `order_date`
column *before* deciding whether to scan it:

1. A query filters on a column, e.g. `WHERE order_date = '2024-06-01'`.
2. Snowflake checks the min/max metadata Snowflake stores for that
   column, per micro-partition — no data is read yet.
3. Micro-partitions whose min/max range can't possibly contain
   `'2024-06-01'` are skipped entirely.
4. Only the micro-partitions that could contain matching rows are
   actually scanned.

A table with a billion rows spread across thousands of micro-partitions
might only need to scan a handful of them for a well-filtered query —
the rest are eliminated by metadata alone, before a single row is
read. This is exactly the "bytes scanned vs. bytes returned" check
from Lesson 43's Query Profile: a `TableScan` that reads far more
bytes than it should is usually a pruning failure — a filter on a
column whose values are scattered randomly across every micro-
partition instead of naturally clustered together.

## Key terms

| Term | Meaning |
|---|---|
| Micro-partition | An automatically created, immutable unit of table storage, roughly 50-500 MB uncompressed |
| Metadata | Per-micro-partition statistics (including column min/max) kept by the cloud services layer |
| Partition pruning | Using that metadata to skip micro-partitions that can't match a query's filter, before scanning |
| Cloud services layer | The Snowflake layer that stores and checks metadata, independent of warehouse compute |

## Lab

1. Pick a large sample table, e.g.
   `SNOWFLAKE_SAMPLE_DATA.TPCH_SF1000.LINEITEM`, and run
   `SELECT COUNT(*) FROM ...` with no filter — note the bytes scanned
   in Query Profile.
2. Run the same query with a narrow filter on a naturally ordered
   column (like a date range covering a small slice of the data) and
   compare the bytes scanned.
3. In Snowsight, run `SELECT SYSTEM$CLUSTERING_INFORMATION('<table>',
   '(<column>)');` on that table and read the `average_depth` value —
   lower generally means better pruning potential for that column.

## Check yourself

You're ready for Lesson 45 when you can explain what min/max metadata
lets Snowflake skip, without reading any actual table data, and why
that means Snowflake never needs a manually chosen partition key the
way SQL Server does.
