# Lesson 24 — Data Quality in Staging

**Chapter 5 · Staging & ETL Design · Lesson 24 of 39**

## What you'll learn

- Why data quality checks belong in staging, not the warehouse or the
  source system
- Four concrete categories of check every staging process should run
- What to actually do with a row that fails a check — reject, default,
  or quarantine
- How to keep bad-data handling from silently becoming invisible

## Why staging is where quality gets enforced

Lesson 21 established that staging is a safe place to fail. This
lesson is about using that safety deliberately: running validation
checks against staged data, *before* anything moves into a fact or
dimension table an analyst might already be querying. Catching a
problem here costs you a re-run of one load. Catching the same problem
after it's already in the warehouse costs you a wrong number in
someone's dashboard, and possibly a much harder cleanup.

## Four checks every staging process should run

**Nulls in required fields.** A source system might guarantee a
column is always populated — until, one day, it doesn't. Staging is
where you check anyway, rather than trusting the source's own
constraints (which the source's own bugs can violate just as easily
as anyone else's).

**Referential integrity.** Before a fact row can reference a
dimension by its natural or surrogate key, that key actually has to
exist in the dimension. A `SalesOrderDetail` row pointing at a
`ProductID` your `DimProduct` table has never heard of is exactly the
kind of thing that silently produces `NULL`s or dropped rows deep
inside a fact table if nobody checks for it in staging first.

**Duplicates.** The same source row landing twice — a re-run that
double-extracted, an upstream system that sent the same event twice —
inflates every additive measure that touches it. A staging-level
duplicate check (usually on the source's natural key) catches this
before it becomes a double-counted revenue number.

**Type and format mismatches.** Lesson 22 established that staging
columns are loosely typed on purpose, precisely so a malformed value
doesn't fail the *load*. But it still has to fail *somewhere* — a date
column holding the text `"N/A"`, or a price column holding a negative
number that should never be negative, needs to be caught and handled
before that value reaches a typed warehouse column.

## What to actually do with a failing row

Finding a bad row is only half the job — you also need a consistent
policy for what happens to it:

- **Reject and log.** Move the row to a `stg.Rejected_*` table (or a
  quarantine table) with the reason it failed, and leave it out of
  this load entirely. Right for anything the business can't safely
  guess a value for.
- **Default and flag.** Substitute a known placeholder (e.g., an
  "Unknown" member row in the dimension, covered properly as a junk
  dimension pattern in Chapter 6) and flag the row so it's still
  traceable later. Right when a missing value shouldn't block the
  whole row from loading.
- **Fail the batch.** For a check severe enough that loading *any*
  of this batch would be worse than loading none of it — e.g., row
  counts wildly off from a typical load — stop the whole batch rather
  than partially load it.

Whichever policy you pick, the one thing to never do is quietly drop
a row with no record anywhere that it happened. A rejected-row log
(or count) is what turns "the numbers seem a little low this week"
into an actual, traceable answer.

## Key terms

| Term | Meaning |
|---|---|
| Referential integrity check | Confirming a fact row's dimension key actually exists in that dimension before loading |
| Duplicate check | Detecting the same source row landing more than once in a single extract |
| Quarantine table | A table that holds rows a validation check rejected, along with the reason, instead of silently dropping them |

## Lab

Using the `stg.SalesOrderDetail` staging table from Lesson 22, write
one `SELECT` query for each of this lesson's four check categories
that would find rows to flag: nulls in a required column, a
`ProductID` missing from `AdventureWorksDW2014.dbo.DimProduct`,
duplicate `(SalesOrderID, SalesOrderDetailID)` pairs, and a
`LineTotal` value that fails to convert to a valid number.

## Check yourself

You're ready for Lesson 25 when you can name all four check
categories from memory, and explain the difference between "reject
and log," "default and flag," and "fail the batch" as responses to a
failing row.
