# Lesson 36 — Incremental Loads With SSIS

**Chapter 7 · Advanced SSIS Patterns · Lesson 36 of 49**

## What you'll learn

- Why loading an entire source table every run doesn't scale, and what an
  incremental (delta) load does instead
- The watermark pattern — using a column like a modified date or an
  identity value to remember where the last load stopped
- How Lookup and Conditional Split, tools you already know from Chapter 4,
  combine to route new rows to an insert and changed rows to an update
- Where an incremental load fits next to the Slowly Changing Dimension
  Transformation in Lesson 37

## The problem: full loads don't scale

Every package you've built so far in this course reloads its entire
source every time it runs — truncate the destination, pull every row,
load it back. That's fine for a lookup table with two hundred rows. It
falls apart the moment a source table has fifty million rows and the
package only needs the dozen that changed since last night.

An **incremental load** (also called a **delta load**) solves this by
loading *only* the rows that are new or have changed since the last run,
instead of the entire source every time.

## The watermark pattern

The standard way to know "what changed since last time" is a
**watermark** — a saved value, usually the maximum modified-date or
identity value your package processed last run. Each run:

1. Reads the watermark value saved from the previous run (a control
   table, a package variable persisted between runs, or an
   `Execute SQL Task` querying `MAX(ModifiedDate)` from the destination).
2. Extracts only source rows where the change-tracking column is greater
   than that watermark.
3. Processes those rows, then saves the new maximum value as the
   watermark for next time.

## Assembling it from tools you already have

There's no single "Incremental Load Task" in the SSIS Toolbox — this is
a **pattern**, built entirely from tasks and transformations you already
know:

- **Execute SQL Task** (Lesson 8) reads last run's watermark into a
  package variable before the Data Flow Task even starts.
- An **OLE DB Source** (Lesson 16) with a parameterized SQL query uses
  that variable to pull only rows newer than the watermark — this is the
  extract step, and it's the one that actually makes the load "delta"
  instead of "full."
- A **Lookup Transformation** (Lesson 19) checks each extracted row
  against the destination table's business key to find out whether it's
  brand new or already exists.

![The Lookup Transformation Editor's General page, with Full cache selected under Cache mode, OLE DB connection manager selected under Connection type, and the "Specify how to handle rows with no matching entries" dropdown near the bottom.](/courses/ssis/ch07/36-incremental-loads-with-ssis/incremental-load-lookup-editor-general.png)
*The Lookup, configured to check each extracted row against the destination's business key — the same editor from Lesson 19, now doing the "is this row new or existing?" check.*

- A **Conditional Split** (Lesson 20) routes matched-existing rows to an
  update path (an `OLE DB Command`) and unmatched-new rows to an insert
  path (an `OLE DB Destination`).

Once the Lookup is configured, you wire its **Match Output** straight
into the Conditional Split's input — the same "which output do you mean?"
dialog you saw back in Lesson 19:

![The Input Output Selection dialog, with Output set to Lookup Match Output and Input set to Conditional Split Input.](/courses/ssis/ch07/36-incremental-loads-with-ssis/incremental-load-lookup-to-split-wiring.png)
*Wiring the Lookup's Match Output into the Conditional Split — rows that matched the destination's business key move on to get classified as new or changed.*

- A final **Execute SQL Task** updates the watermark control table with
  the new maximum value, so next run picks up exactly where this one left
  off.

Here's that whole pattern as a single flow, the same shape the video's
diagram walks through:

1. **Read watermark** — Execute SQL Task pulls last run's saved value.
2. **Extract delta** — OLE DB Source pulls only rows newer than it.
3. **Lookup + Conditional Split** — route new rows to insert, changed
   rows to update.
4. **Save new watermark** — Execute SQL Task writes the new maximum
   value for next run.

Assembled and run against a real extract, that pattern looks like this:

![The completed data flow: OLE DB Source feeding 14 rows into a Lookup, whose Match Output of 14 rows feeds a Conditional Split, which routes 4 rows to an OLE DB Destination (INSERT) and 10 rows to an OLE DB Command (UPDATE) — every component shown with a green success checkmark after running.](/courses/ssis/ch07/36-incremental-loads-with-ssis/incremental-load-data-flow-complete.png)
*14 rows extracted past the watermark, split into 4 brand-new rows and 10 changed rows — nothing reloaded that didn't need to be.*

## Incremental loads vs. the SCD Transformation

You'll notice this pattern and Lesson 37's Slowly Changing Dimension
Transformation solve overlapping problems — both distinguish new rows
from existing ones. The difference is scope: the pattern in this lesson
is a general-purpose incremental *extract* strategy that works against
any destination table, while the SCD Transformation is a specialized
data-flow component purpose-built for *dimension tables* in a star
schema, with built-in support for Type 1 (overwrite) and Type 2
(historical) change tracking. In practice, a real warehouse load often
uses both: an incremental extract to pull only changed source rows, then
the SCD Transformation to apply those changes correctly to the dimension.

## Key terms

| Term | Meaning |
|---|---|
| Incremental load (delta load) | Loading only new or changed rows since the last run, instead of the entire source |
| Watermark | A saved value (date or key) marking how far the last successful run got |
| Full load | Reloading the entire source every run — simple, but doesn't scale |
| Change tracking column | The source column (often a modified-date or identity) used to detect what's new |

## Lab

1. In SSMS, run this against `AdventureWorks2012` to see the column
   you'd watermark on for an incremental load of `Sales.SalesOrderHeader`:
   ```sql
   SELECT SalesOrderID, OrderDate, ModifiedDate
   FROM Sales.SalesOrderHeader
   ORDER BY ModifiedDate DESC;
   ```
2. Design (on paper or in a new package) an incremental load of
   `Sales.SalesOrderHeader` into a staging table: which column is your
   watermark, where would you store its value between runs, and what
   would the parameterized extract query look like?
3. Sketch which existing tasks/transformations from Chapters 2 and 4 you'd
   drag onto the canvas to build it — you already have every piece.

## Check yourself

You're ready for Lesson 37 when you can explain, without looking: what a
watermark is, why a full load doesn't scale, and which two Chapter 4
transformations do the "new row vs. changed row" routing in an
incremental load.
