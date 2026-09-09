# Lesson 110 — What Is a Data Lake?

**Chapter 12 · Data Warehouse Concepts · Lesson 4 of 12**

## What you'll learn

- What a **data lake** is, and how it fundamentally differs from a
  warehouse
- **Schema-on-write** vs. **schema-on-read** — the core distinction
  behind that difference
- The real T-SQL bridge that lets you query lake files directly:
  `OPENROWSET`
- Why a lake stores "everything, just in case"

## A completely different storage philosophy

A `Sales.SalesOrderHeader` table demands structure *before* a single row
goes in — every column, every data type, every constraint from Chapter 11
is defined first. A **data lake** does the opposite: it stores raw data —
structured, semi-structured (JSON, XML), even unstructured (images, log
files, PDFs) — in its **native format**, at massive scale, usually on
cheap object storage, with **no schema imposed at write time at all**.

## Schema-on-write vs. schema-on-read

This is the core distinction:

- **Schema-on-write** (what every table you've built in this course does):
  define the structure first, then load data that must conform to it.
  Fast to query later, but you pay the structuring cost up front.
- **Schema-on-read**: dump the raw data in as-is, and only decide *how to
  interpret it* at query time. Flexible and cheap to ingest, but every
  query has to do some of that structuring work itself.

```sql
-- Schema-on-write: the structure is locked in BEFORE any data exists
CREATE TABLE dbo.Orders (
    OrderID   INT NOT NULL PRIMARY KEY,
    OrderDate DATE NOT NULL,
    Total     MONEY NOT NULL
);

-- Schema-on-read: the raw file (CSV, JSON, Parquet) has no imposed
-- structure at all until a query decides how to interpret it
```

## The real T-SQL bridge: OPENROWSET

T-SQL isn't limited to querying tables you've already loaded. `OPENROWSET`
lets you query a raw file — sitting in a data lake or blob storage —
directly, applying structure only at query time, exactly like
schema-on-read:

```sql
-- Query a CSV file sitting in storage directly — no table, no load step
SELECT *
FROM OPENROWSET(
    BULK 'https://mystorageaccount.blob.core.windows.net/lake/orders.csv',
    FORMAT = 'CSV',
    FIRSTROW = 2
) AS RawOrders;
```

This is the same idea behind Azure Synapse's serverless SQL pools: a lake
holds the raw files, and T-SQL reaches out and imposes structure only at
the moment you actually query it.

## Why store "everything, just in case"

A warehouse only holds data someone already decided was worth
structuring and integrating — a deliberate, curated process. A lake is
cheap enough, and flexible enough, that organizations often dump
**everything** into it, even data nobody has a defined use for yet,
because figuring out *later* what's valuable is often easier than trying
to predict it up front.

## Key terms

| Term | Meaning |
|---|---|
| Data lake | Raw data storage in native format, at scale, with no imposed schema |
| Schema-on-write | Structure defined before data is loaded (every table so far in this course) |
| Schema-on-read | Structure applied only at query time, against raw files |
| OPENROWSET | T-SQL's bridge for querying raw files directly, without loading them first |

## Lab

This lesson is conceptual — there's no lake attached to your local SQL
Server instance to query directly. Instead, compare the two philosophies
on paper:

```sql
-- Schema-on-write version of the same data
CREATE TABLE dbo.Lesson110Orders (
    OrderID INT NOT NULL PRIMARY KEY,
    OrderDate DATE NOT NULL,
    Total MONEY NOT NULL
);
DROP TABLE dbo.Lesson110Orders;
```

## Check yourself

You're ready for Lesson 111 when you can explain, without looking: what's
the difference between schema-on-write and schema-on-read, and which one
does a data lake use?
