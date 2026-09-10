# Lesson 10 — Fabric Warehouse

**Chapter 1 · Microsoft Fabric · Lesson 10 of 70**

## What you'll learn

- Fabric Warehouse: a real T-SQL engine, in the same OneLake as a Lakehouse
- Creating one, and what it looks like once open
- Full T-SQL — `CREATE TABLE`, `INSERT`, transactions — not just `SELECT`
- Why this genuinely completes the circle back to the T-SQL course

## A real T-SQL engine, sharing OneLake

A **Fabric Warehouse** is a genuinely different item type from a
Lakehouse: rather than a Spark-first item with a SQL endpoint
bolted on (Lesson 5's Lakehouse), a Warehouse is **SQL-first** —
its native language is full T-SQL, the exact dialect this track's
own T-SQL course covered from `SELECT` through stored procedures.
Its actual tables still live in OneLake, in Delta format, the same
as a Lakehouse's — the engine on top differs; the storage
underneath doesn't.

## Creating one

1. In your workspace, select **New item → Warehouse**.
2. Name it (`nyc_taxi_warehouse`, for this course) and select **Create**.
3. The Warehouse opens to a T-SQL editor — genuinely the same kind
   of interface the T-SQL course's SSMS lessons used, just running
   inside the Fabric portal.

## Full T-SQL, not just SELECT

```sql
CREATE TABLE dbo.vendor_revenue (
    VendorID VARCHAR(10),
    total_revenue DECIMAL(18,2)
);

INSERT INTO dbo.vendor_revenue (VendorID, total_revenue)
SELECT VendorID, SUM(fare_amount)
FROM OPENROWSET(BULK 'trips.parquet', ...) AS trips
GROUP BY VendorID;
```

Unlike a Lakehouse's SQL endpoint (Lesson 5), which is genuinely
**read-only** against Spark-managed Delta tables, a Warehouse
supports real writes — `CREATE TABLE`, `INSERT`, `UPDATE`,
`DELETE`, real multi-statement transactions — the full surface this
track's T-SQL course built up over 118 lessons, now running against
Fabric's own OneLake-backed storage instead of a SQL Server
instance.

## Completing the circle

This track started with a standalone T-SQL course, entirely apart
from the Data Engineering sequence. A Fabric Warehouse is the actual
place that same T-SQL skill set becomes directly relevant to data
engineering work: the same `CREATE TABLE`/`INSERT`/window-function
syntax, applied to a lakehouse-adjacent warehouse table instead of a
traditional on-prem database.

## Key terms

| Term | Meaning |
|---|---|
| Fabric Warehouse | A SQL-first item — full T-SQL, writes included, same OneLake storage |
| Lakehouse SQL endpoint | Read-only T-SQL access to Spark-managed Delta tables (Lesson 5) |
| Full T-SQL | `CREATE TABLE`/`INSERT`/`UPDATE`/`DELETE` — genuinely reusing the T-SQL course |

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why
can a Warehouse support real `INSERT`/`UPDATE` statements, while a
Lakehouse's SQL endpoint genuinely can't?
