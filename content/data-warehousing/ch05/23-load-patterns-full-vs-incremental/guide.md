# Lesson 23 — Load Patterns: Full vs. Incremental

**Chapter 5 · Staging & ETL Design · Lesson 23 of 39**

## What you'll learn

- The two fundamental ways to get data into a staging table: full
  reload and incremental load
- What a watermark is, and how a watermark-based incremental load
  actually works
- The concrete tradeoffs that decide which pattern fits a given
  source table
- How this design-pattern view connects to what SSIS Development
  already showed you from the tool side

## Two ways to fill a staging table

Every load, every run, has to decide how much of the source data to
pull. There are two fundamental answers.

**Full load** extracts the entire source table, every time. Simple,
and — combined with the truncate-and-reload pattern from Lesson 22 —
easy to reason about: whatever's in staging after a full load is
exactly what's in the source table right now, in full. The tradeoff is
cost: extracting and reprocessing millions of unchanged rows on every
run wastes time and load-window budget as source tables grow.

**Incremental load** (also called delta load) extracts only rows that
are new or changed since the last successful run. Far cheaper at
scale, but it requires the source to give you *some* reliable way to
identify "what changed" — which is the harder design problem this
lesson is really about.

## The watermark pattern

The most common way to identify what changed is a **watermark**: a
column on the source table — usually a last-modified timestamp or an
ever-increasing key — whose value only ever goes up. Each load compares
the *previous* run's watermark to the *current* maximum value of that
column, and only pulls rows in between.

![Diagram of the watermark-based incremental load workflow: get the old watermark, get the new watermark, load data between the two, then update the watermark for next time.](/courses/data-warehousing/ch05/23-load-patterns-full-vs-incremental/workflow-using-watermark.png)
*The four-step cycle every watermark-based incremental load repeats, on every run.*

Concretely, that's four repeatable steps: **(1)** read the watermark
value stored from the last successful run, **(2)** read the current
maximum value of that same column in the source, **(3)** extract only
rows whose watermark column falls strictly between those two values,
and **(4)** — only after the load succeeds — persist the new watermark
value so the next run picks up exactly where this one left off.

That last step matters more than it looks: if the watermark gets
updated *before* the load is confirmed successful, a failed load
silently loses the rows it never actually captured. Watermark updates
belong at the end of a successful run, never the start.

## Choosing full vs. incremental

| Signal | Favors |
|---|---|
| Source table is small, or the whole warehouse fully refreshes anyway | Full load |
| Source table is large and grows continuously | Incremental load |
| Source has no reliable last-modified column or increasing key | Full load (or a different change-detection method entirely) |
| Load window is tight relative to source table size | Incremental load |
| Source system supports hard deletes with no trace | Full load, or a paired delete-detection step alongside incremental |

Note that last row: a watermark only ever detects **new or updated**
rows. If a source row is physically deleted, no watermark comparison
will ever notice — the row simply stops appearing. Detecting deletes
correctly usually means either an occasional full reconciliation load
or a separate mechanism (e.g., a source-side "deleted" flag, or SQL
Server Change Data Capture) layered on top of the watermark pattern.

## From tool to design pattern

SSIS Development's Lesson 36, "Incremental Loads With SSIS," walked
through building exactly this pattern inside SSIS — a Lookup or
Execute SQL Task to read the stored watermark, a data flow filtered
to rows newer than it, and a step to persist the new watermark back.
That lesson taught *how a specific tool implements it*. This lesson is
the same underlying pattern, independent of SSIS, Azure Data Factory,
or any other tool: the four-step watermark cycle above is what any
ETL tool is actually doing under the hood, whichever UI it wraps that
logic in.

## Key terms

| Term | Meaning |
|---|---|
| Full load | Extracting the entire source table on every run |
| Incremental (delta) load | Extracting only new or changed rows since the last successful run |
| Watermark | A column value (timestamp or increasing key) used to mark how far a previous load already got |
| Change data capture (CDC) | A SQL Server feature that tracks row-level inserts, updates, and deletes directly, as an alternative to a watermark column |

## Lab

`Sales.SalesOrderHeader` in `AdventureWorks2012` has a `ModifiedDate`
column. Write the SQL a watermark-based incremental load would run on
each of its four steps: reading the stored watermark (assume it's
`'2014-01-01'` for this exercise), finding the current maximum
`ModifiedDate`, selecting the rows in between, and the statement that
would persist the new watermark value afterward.

## Check yourself

You're ready for Lesson 24 when you can explain the four steps of a
watermark-based incremental load in order, and say why updating the
stored watermark has to happen only after the load succeeds.
