# Lesson 25 — Auditing & Lineage Columns

**Chapter 5 · Staging & ETL Design · Lesson 25 of 39**

## What you'll learn

- Why every staging and warehouse table needs metadata columns beyond
  its business data
- The three audit columns that show up in almost every real warehouse:
  `LoadDate`, `SourceSystem`, and `BatchID`
- How lineage columns turn "something looks wrong" into an answerable
  question
- Where audit columns belong: staging, warehouse, or both

## The question audit columns exist to answer

Every earlier lesson in this chapter assumed you could answer, on
demand: *which load run put this row here, when, and from which
source?* Without dedicated columns carrying that information, you
can't. A number looking wrong in a report becomes an investigation
with no starting point — you can't even tell whether the row arrived
yesterday or eighteen months ago, or from which of three source
systems that happen to feed the same fact table.

**Auditing and lineage columns** are metadata columns, present on
staging and warehouse tables alongside the business data, whose only
job is answering exactly that question.

## The three columns that show up almost everywhere

```sql
ALTER TABLE stg.SalesOrderDetail ADD
    LoadDate      DATETIME2  NOT NULL DEFAULT SYSUTCDATETIME(),
    SourceSystem  VARCHAR(50) NOT NULL,
    BatchID       BIGINT      NOT NULL;
```

- **`LoadDate`** — the timestamp this row was loaded, not any
  business date on the row itself. This is what lets you answer "was
  this the batch from last night, or from three weeks ago?"
- **`SourceSystem`** — which upstream system this row actually came
  from. Essential the moment more than one source feeds the same
  staging or warehouse table (a common warehouse merges data from
  more than one OLTP system, a legacy system being sunset, and a
  newer replacement, for example).
- **`BatchID`** — a single identifier shared by every row loaded in
  the same run. This is the column that lets you answer "show me
  every row this specific load touched" — useful for both debugging a
  bad load and for cleanly reprocessing exactly one run's rows without
  guessing which rows belong to it by timestamp alone.

Many warehouses add a fourth: an `ETLLastModified` or
`RowHash`-style column, used to detect whether a row genuinely changed
since its last load (directly useful for deciding whether an SCD Type
2 dimension needs a new row — Chapter 4 covered why that decision
matters).

## Where these columns belong

Audit columns aren't just a staging convention — they belong on
warehouse fact and dimension tables too, for the same reason: a fact
row in the warehouse should be just as traceable back to its load run
as the staging row it came from. `BatchID` in particular is what lets
you answer "which specific load populated these rows in the
warehouse" months after the fact, long after the staging table that
originally held them has been truncated and reloaded many times over.

## What lineage columns are not

Lineage columns are metadata about the ETL process, not business
data. They should never appear in a dimensional model's measures or
attributes that a report is built around — `LoadDate` answers "when
did this row get loaded," never "when did this order actually ship."
Keeping that line clear matters: mixing audit metadata into business
columns is exactly the kind of thing that makes a model confusing to
query later.

## Key terms

| Term | Meaning |
|---|---|
| Lineage | The traceable path a row of data took from its original source to its current location |
| BatchID | An identifier shared by every row loaded together in a single run |
| SourceSystem | A column recording which upstream system a row actually originated from |

## Lab

Add `LoadDate`, `SourceSystem`, and `BatchID` columns to the
`stg.SalesOrderDetail` table you designed in Lesson 22's lab. Then
write the `SELECT` query you'd run to answer: "show me every row that
was loaded in batch 4021, from the AdventureWorks2012 source system,
in the last 24 hours."

## Check yourself

You're ready for Chapter 6 when you can name the three most common
audit columns and explain, specifically, what question each one
answers that the business data alone cannot.
