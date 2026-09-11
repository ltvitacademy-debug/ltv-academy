# Lesson 22 — Staging Table Design

**Chapter 5 · Staging & ETL Design · Lesson 22 of 39**

## What you'll learn

- Why staging tables are typically loosely typed and un-constrained,
  on purpose
- The truncate-and-reload pattern, and when it's the right choice
- How a staging table's column list should relate to its source
  table's column list
- What a staging table deliberately leaves out that a warehouse table
  requires

## Design goal: never let the load fail on data

A warehouse table enforces its contract: correct data types,
`NOT NULL` constraints, foreign keys to dimension tables, maybe a
clustered columnstore index for query performance. A staging table
does almost none of that, and that's deliberate. Its one job is to
accept whatever the source system sends, without the load itself
failing because a date arrived as text or a number arrived with a
stray comma. Every one of those problems gets fixed later, in the
Transform step, against data that's already safely landed — not
mid-flight during Extract.

## Loosely-typed columns, mirroring the source

The most common staging pattern types almost every column as a wide
string (`VARCHAR`/`NVARCHAR`) or leaves numeric types generously sized,
even when the eventual warehouse column will be an `INT` or a `DATE`.
The column *names* still mirror the source system closely — often
exactly — so anyone reading the staging table can tell at a glance
which source column each one came from, before any transformation
renames or reshapes anything.

```sql
CREATE TABLE stg.SalesOrderDetail (
    SalesOrderID    VARCHAR(20)   NULL,
    SalesOrderDetailID VARCHAR(20) NULL,
    ProductID       VARCHAR(20)   NULL,
    OrderQty        VARCHAR(10)   NULL,
    UnitPrice       VARCHAR(30)   NULL,
    LineTotal       VARCHAR(30)   NULL,
    ModifiedDate    VARCHAR(30)   NULL,
    LoadDate        DATETIME2     NOT NULL DEFAULT SYSUTCDATETIME(),
    SourceSystem    VARCHAR(50)   NOT NULL,
    BatchID         BIGINT        NOT NULL
);
```

Notice what's missing compared to a real `SalesOrderDetail` table: no
primary key, no foreign keys, no check constraints — and every business
column is nullable. If the source sends a row with a blank
`UnitPrice`, this table accepts it without complaint. A validation
step in Lesson 24 catches that problem downstream, on data that's
already safely in the database rather than mid-load. (`LoadDate`,
`SourceSystem`, and `BatchID` are audit columns — Lesson 25 covers
exactly why every staging and warehouse table carries them.)

## The truncate-and-reload pattern

Many staging tables aren't meant to accumulate history at all — they
hold *only the current load's data*, and the standard pattern is:
`TRUNCATE TABLE` at the start of the load, then bulk-insert the newly
extracted rows. This works well because:

- Staging tables usually aren't very large relative to the warehouse —
  they hold one load's worth of data, not years of history.
- `TRUNCATE` is minimally logged and fast, which matters when the load
  window is tight.
- It guarantees the staging table can never silently mix rows from two
  different load runs.

Truncate-and-reload is the right default for a full-load staging
table. It's the *wrong* choice, though, the moment a staging table
itself needs to preserve a change history across loads — which is
rare, but does come up (a staging table feeding a Type 2 SCD compare
step sometimes needs the *previous* load's rows still present to diff
against). Know which kind of staging table you're building before you
reach for `TRUNCATE`.

## What staging deliberately leaves out

| Warehouse table has it | Staging table skips it |
|---|---|
| Strict, narrow data types | Wide, forgiving types (mostly strings) |
| `NOT NULL` and check constraints | Nearly everything nullable |
| Foreign keys to dimensions | No foreign keys — dimension lookups happen later |
| Surrogate keys | Natural/source keys only, as received |
| Indexes tuned for reporting queries | Minimal or no indexing — it's write-once, read-once |

## Key terms

| Term | Meaning |
|---|---|
| Loosely typed | Using wide, forgiving column types (often strings) so bad source data doesn't fail the load |
| Truncate-and-reload | Emptying a staging table and reloading it fresh on every run, rather than accumulating history |
| Un-constrained | Without primary keys, foreign keys, or check constraints — validation happens downstream instead |

## Lab

Design a staging table for `AdventureWorks2012`'s `Sales.Customer`
table, intended to eventually feed `AdventureWorksDW2014`'s
`DimCustomer`. Write the `CREATE TABLE` statement: keep every business
column loosely typed and nullable, mirror the source column names,
and add the three audit columns from this lesson's example
(`LoadDate`, `SourceSystem`, `BatchID`).

## Check yourself

You're ready for Lesson 23 when you can explain why a staging table's
columns are usually nullable strings even when the source column is a
strict integer or date — and name one situation where truncate-and-
reload is the *wrong* pattern for a staging table.
