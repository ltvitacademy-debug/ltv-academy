# Lesson 30 — Aggregate Tables

**Chapter 6 · Advanced Warehouse Patterns · Lesson 30 of 39**

## What you'll learn

- What an aggregate fact table is, and exactly what "rollup" means
  in this context
- Why a warehouse needs one at all, when the detailed fact table
  already has every number in it
- How Fabric Warehouse actually builds one, with `CREATE TABLE AS
  SELECT` (CTAS)
- The maintenance cost every aggregate table carries, and why that
  cost is the real design trade-off

## The problem: correct, but slow

Every fact table you've designed this course stores data at its
lowest useful **grain** — one row per sales order line, one row per
inventory snapshot. That's correct, and it's exactly what Chapter 1
told you to aim for. But "correct" and "fast" aren't the same thing.
A report asking for "total revenue by month, by region" against a
detailed fact table with hundreds of millions of rows still has to
scan and sum across all of them every time, even though the actual
answer is a small, predictable summary.

## The fix: an aggregate fact table

An **aggregate fact table** represents a rollup of a base fact table
to a lower dimensionality and/or higher granularity than the source.
Its entire purpose, in Microsoft's own words, is to accelerate query
performance for commonly queried dimensions. Concretely: instead of
summing a hundred million detailed rows every time someone asks for
monthly revenue by region, you pre-compute that summary once, store
it in its own much smaller table, and point the report at the small
table instead.

The mechanics in Fabric Warehouse are exactly what you'd expect from
a data warehouse built on top of T-SQL: `CREATE TABLE AS SELECT`
(CTAS), grouping the detailed fact by whichever dimension keys the
aggregate needs to preserve, summing the measures.

```sql
CREATE TABLE agg_sale_by_date_region AS
SELECT OrderDateKey, Region,
       SUM(Revenue) AS TotalRevenue
FROM FactSale AS FS
JOIN DimRegion AS DR
  ON FS.RegionKey = DR.RegionKey
GROUP BY OrderDateKey, Region;
```

*A CTAS query builds the aggregate as a summarized copy of the detailed fact.*

This is the same real CTAS technique Microsoft's own Fabric
Warehouse tutorials use to build an aggregate table — grouping a
detailed `fact_sale` table by date and city dimension attributes into
a separate, much smaller `aggregate_sale_by_date_city` table, loaded
by a stored procedure rather than a one-off query.

## The trade-off: one more table to keep in sync

An aggregate table is not a free performance win — it's a deliberate
duplication of data, and duplication has a cost. Every time the
detailed fact table gets new rows (which, for most fact tables, is
constantly), the aggregate table needs to be refreshed to match, or
reports built against it will quietly disagree with reports built
against the detail. That refresh is exactly the kind of stored
procedure shown above, run on a schedule as part of the ETL process
you designed in Chapter 5 — it's another table your orchestration has
to process, in dependency order, the same way it processes dimensions
before facts.

Microsoft's own guidance also points out the alternative worth
knowing about: a Power BI semantic model can generate **user-defined
aggregations** to achieve a similar performance benefit without a
separate physical warehouse table at all, or query the warehouse's
own aggregate fact table through DirectQuery. That's a semantic-model
decision outside this course's scope — what matters here is
recognizing the underlying warehouse-side pattern and its cost, so you
can make that call correctly later.

## Key terms

| Term | Meaning |
|---|---|
| Aggregate fact table | A rollup of a base fact table to lower dimensionality and/or higher granularity, built to speed up common queries |
| Grain | The level of detail one row in a fact table represents — an aggregate table deliberately uses a higher (coarser) grain |
| CTAS | CREATE TABLE AS SELECT — the T-SQL technique used to build an aggregate table from a query against the detailed fact |

## Lab

1. In AdventureWorksDW2014, write a CTAS-style query (as a real
   `SELECT INTO` or `CREATE TABLE AS SELECT`, if your SQL Server
   edition supports it) that rolls `FactInternetSales` up to one row
   per `OrderDateKey` and `ProductKey`, summing `SalesAmount`.
2. Compare the row count of your new aggregate table to the row count
   of `FactInternetSales` itself, and note roughly how much smaller
   it is.

## Check yourself

You're ready for Chapter 7 when you can explain, without looking: what
an aggregate fact table actually is, how CTAS builds one, and the real
maintenance cost that comes with keeping it in sync with the detail.
