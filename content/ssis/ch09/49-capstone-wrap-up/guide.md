# Lesson 49 — Capstone: Wrap-Up & Portfolio Presentation

**Chapter 9 · Capstone · Lesson 49 of 49 — Course Finale**

## What you'll learn

- How to check the finished package against Lesson 46's original scope
- How to present this project the way a real employer would want to see
  it — not just "it runs," but "here's what it demonstrates"
- How to turn four lessons of work into a specific set of resume and
  portfolio talking points
- Where to go next in this catalog, now that SSIS Development is complete

## Checking against Lesson 46's scope

Pull Lesson 46's Extract/Transform/Load/Log table back up and confirm,
stage by stage, that the finished package actually does what it set out
to do:

| Stage | What Lesson 46 promised | What the package does now |
|---|---|---|
| Extract | Pull orders from AdventureWorks2012 | Filtered incrementally on `ModifiedDate` (Lesson 48) |
| Transform | Resolve business keys, reshape rows | Lookup + Derived Column resolve `ProductKey` and build `DateKey`/`ExtendedAmount` (Lesson 47) |
| Load | Land rows in a small warehouse-style star | `CapstoneFactOrderSales`, joined to `AdventureWorksDW2014`'s real `DimDate` (Lesson 47) |
| Log | Prove what happened on every run | OnError event handler + SQL Server log provider + redirected error CSVs (Lesson 48) |

If every row in that table has a real answer, the project is done — not
because it has extra features nobody asked for, but because it does
exactly what Lesson 46 scoped, and does it in a way that survives more
than one run.

## Presenting it like a real project

A working package isn't the same thing as a package someone else can
evaluate in five minutes. When you show this off — to a mentor, in an
interview, or just to future-you — walk through it in this order:

1. **State the problem in one sentence**, not the implementation:
   "This package extracts sales orders from a transactional database
   and loads them into a small dimensional warehouse target, on an
   incremental schedule."
2. **Show the control flow first**, and explain the precedence
   constraints in plain language — what has to succeed before what runs
   next, and why.
3. **Show the data flow second**, and be ready to explain *why* the
   Lookup runs before the destination — that one design decision is a
   fair proxy for whether you actually understand dimensional loading,
   not just SSIS's UI.
4. **Show the incremental load and the error handling last**, and frame
   them as the difference between "a script that works once" and "a
   package you'd trust in production." That framing is the whole point
   of Lesson 48.

## Turning this into resume and portfolio language

You can't attach a live SSIS package to a resume, but you can describe
it precisely. A version worth using:

> Built an incremental ETL package in SQL Server Integration Services
> extracting transactional order data from an OLTP source, resolving
> dimension keys via Lookup transformations, and loading a
> watermark-driven incremental fact table — with redirected error
> handling and event-driven logging for unattended runs.

Every clause in that sentence maps back to something you actually built
in Lessons 47–48, not something you're claiming. If you keep the
`.dtsx` package file and a short README describing the two databases
and the architecture table above, that's a real, inspectable portfolio
artifact — something Chapter 8's deployment concepts (the SSIS Catalog,
environments) would turn into an actual deployed, scheduled job in a
real workplace.

## What you've built, across nine chapters

Chapter 1 taught you SSIS Designer and the two-engine architecture.
Chapters 2–4 built the control flow and data flow vocabulary this
capstone leans on constantly — tasks, containers, sources,
destinations, and transformations like Lookup and Derived Column.
Chapter 5 gave you the variables and parameters this capstone's
watermark depends on. Chapter 6 gave you the event handlers, error
outputs, and logging this capstone's error handling is built from.
Chapter 7 gave you the incremental-load pattern this capstone's
watermark is a direct application of. Chapter 8 covers exactly how a
package like this one gets deployed to the SSIS Catalog and scheduled
for real, once you're ready to take it further than your own machine.

## Where to go from here

- **SSRS Development**, this catalog's next course, picks up right
  where a warehouse-style fact table like `CapstoneFactOrderSales`
  leaves off — building real paginated reports on top of exactly this
  kind of data.
- **Data Modeling & Data Warehousing**, also in this catalog, goes
  deeper into the star-schema design decisions this capstone only
  touched — why a fact table looks the way it does, and how to design
  one from scratch instead of being handed one.
- If you want more practice with this same pattern, rebuild it against
  a different pair of tables in `AdventureWorks2012` — `Purchasing`
  instead of `Sales`, for instance — using the identical
  Extract/Transform/Load/Log shape.

## Check yourself

The course is complete when you can hand someone your `.dtsx` file and
the architecture table above, and they can tell — without watching you
run it — exactly what the package does, why it's incremental, and where
a failure would show up if one happened.

Congratulations — you've built a real SSIS project, start to finish.
