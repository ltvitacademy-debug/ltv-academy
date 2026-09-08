# Lesson 14 — Lookup & Stored Procedure Activities

**Chapter 3 · Pipelines & Activities · Lesson 4 of 6**

## What you'll learn

- What the Lookup activity actually returns, and its real limits
- The difference `firstRowOnly` makes to that output's shape
- How to reference a Lookup's result in a later activity
- What the Stored Procedure activity does, and what it can't do

## Lookup: reading a value to use later

The **Lookup activity** retrieves a dataset — or a single value —
from any source Data Factory supports, so a *later* activity can use
it dynamically instead of a hard-coded value:

![Screenshot of the Lookup activity's Settings tab, showing source dataset selection and file path configuration options.](/courses/data-factory/ch03/14-lookup-stored-procedure-activities/lookup-activity.png)
*Configure a source dataset, exactly like a Copy activity's source — but nothing gets copied anywhere.*

The configuration options change based on dataset type — a delimited
text file looks different from an Azure SQL table:

![Screenshot of the Lookup activity's configuration for an Azure SQL table dataset, showing query and stored procedure options.](/courses/data-factory/ch03/14-lookup-stored-procedure-activities/lookup-sql-dataset.png)

## `firstRowOnly`: one value, or many

This one setting fundamentally changes the shape of what a Lookup
returns:

- **`firstRowOnly: true`** (the default) — returns a single row,
  under a fixed `firstRow` key. Reference it with
  `@{activity('LookupActivity').output.firstRow.someColumn}`.
- **`firstRowOnly: false`** — returns every matching row, as a
  `value` array, with a `count` of how many. This is exactly the
  shape a **ForEach** activity (Chapter 4) expects to iterate over.

## Real limits worth knowing

- **Maximum 5,000 rows** returned — beyond that, only the first 5,000
  come back.
- **Maximum 4 MB** output size — the activity fails outright if it's
  exceeded.
- **24-hour** maximum duration before timeout.
- A query or stored procedure used for a lookup must return **exactly
  one result set** — more than one, and the activity fails.

For genuinely large lookups, the real workaround is a two-level
pipeline: an outer pipeline that iterates, calling an inner pipeline
that keeps each individual lookup under these limits.

## A real pattern: dynamic table names

A classic use: a Lookup activity reads a table name out of a
configuration file, and a Copy activity right after it uses that
name — via an expression like
`@activity('LookupActivity').output.firstRow.table` — as its actual
source. The pipeline never needs redeploying just because which table
to copy changed; only the configuration file does.

## Stored Procedure: running real logic, not just reading

The **Stored Procedure activity** invokes a stored procedure in Azure
SQL Database, Azure Synapse Analytics, or SQL Server (the last one
needing a self-hosted integration runtime, exactly like Lesson 8):

![Screenshot of the Stored Procedure activity's Settings tab, showing linked service selection, stored procedure name, and parameters.](/courses/data-factory/ch03/14-lookup-stored-procedure-activities/stored-procedure-activity.png)
*Pick a linked service, pick a stored procedure, supply its parameters — the same shape as any real SQL call.*

Configure it by selecting a linked service, choosing the stored
procedure, and supplying values for its parameters. It's the natural
choice for logic that already lives in the database — logging a
pipeline run's completion, archiving old rows, or running a
business rule too complex to express any other way in a pipeline.

## One real limitation

The Stored Procedure activity **doesn't support output parameters**.
A stored procedure that needs to *return* a value back to the
pipeline needs the **Lookup activity** instead (or a Script activity)
— not the Stored Procedure activity, which is a one-way call.

## Key terms

| Term | Meaning |
|---|---|
| Lookup activity | Reads a value or dataset from a source, for later activities to use |
| firstRowOnly | Whether a Lookup returns one row or every matching row |
| Stored Procedure activity | Invokes a stored procedure in a SQL data store, one-way, with no output parameters |

## Lab

1. Build a Lookup activity against a table or file you have access
   to, with `firstRowOnly` set to `true`. Run it in Debug and inspect
   its output in the run results.
2. Change `firstRowOnly` to `false` and rerun — compare the shape of
   the output.
3. If you have a simple stored procedure available (even one that
   just logs a timestamp), configure a Stored Procedure activity to
   call it.

## Check yourself

You're ready for Lesson 15 when you can explain, in one sentence,
why a stored procedure that needs to return a value to the pipeline
can't use the Stored Procedure activity.
