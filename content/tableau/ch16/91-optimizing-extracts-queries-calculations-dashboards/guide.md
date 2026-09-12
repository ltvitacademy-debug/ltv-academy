# Lesson 91 — Optimizing Extracts, Queries, Calculations & Dashboards

**Chapter 16 · Performance Optimization · Lesson 91 of 95**

## What you'll learn

- How to shrink and speed up an extract, not just create one
- How to reduce the cost of live queries and filters
- Which calculations are expensive, and cheaper ways to write them
- Dashboard-level habits that compound across every sheet on it

Lesson 90 taught you how to *find* the bottleneck with Performance
Recording. This lesson is the response — a checklist for what to
actually do once you know where the time is going, organized by the
same four categories the Timeline and Events views surface most often.

## Optimizing extracts

An extract is already faster than most live connections, but an
unoptimized extract can still be needlessly large and slow to refresh.

| Do this | Why it helps |
|---|---|
| Hide unused fields before extracting | Fewer columns means a smaller, faster extract |
| Filter the extract to only the rows you actually need | Less data to scan on every interaction |
| Aggregate visible dimensions when row-level detail isn't needed | Pre-aggregation shrinks the extract dramatically |
| Use incremental refreshes instead of full refreshes where possible | Only new/changed rows get processed, not the whole table |

## Optimizing queries and filters

Live connections and extracts both pay a query cost every time a
filter changes — the goal is to make that cost happen as rarely and as
cheaply as possible.

- Turn a filter that applies to most or all sheets in a workbook into
  a **context filter** — it's computed once, and every other filter
  then runs against that already-reduced result instead of the full
  dataset. Use this deliberately, though: context filters themselves
  have a real recompute cost, so reserve them for filters that are
  genuinely shared and stable, not every filter in the workbook.
- Prefer **actions** over quick filters where it makes sense — an
  action only re-queries the sheets it targets, instead of every sheet
  reacting to every filter change.
- Avoid unnecessarily high-cardinality dimensions on shelves (a field
  with thousands of distinct values) when a coarser one would answer
  the same business question.

## Optimizing calculations

Not all calculated fields cost the same:

| Calculation type | Relative cost |
|---|---|
| Simple row-level calculation (e.g., `[Sales] - [Cost]`) | Cheap — computed once per row |
| Aggregate calculation (e.g., `SUM([Sales])`) | Cheap — standard aggregation |
| Table calculation | Moderate — recomputed based on the table's structure and addressing |
| LOD expression (especially `FIXED`) | Can be expensive at high row counts — recomputed against the underlying detail |

Where possible, push logic upstream — into the data source itself, or
a data source-level calculation — rather than reproducing complex
logic as a workbook-level calculated field recomputed on every render.
And prefer a single clean calculation over nested `IF` chains doing
the same classification job a `CASE`-style structure could do more
directly.

## Optimizing dashboards

A dashboard's performance is the sum of every sheet on it, plus the
cost of them all reacting together:

- Limit the number of worksheets and filters on a single dashboard —
  each one is a query (or several) that runs on load and on every
  interaction.
- Use actions instead of universal quick filters so only the sheets
  that need to react actually do.
- Avoid **Automatic/Fit** sizing when it forces constant re-rendering;
  a fixed size is often both faster and more visually stable.
- Where multiple sheets can share the same underlying data source,
  do it — it reduces the number of separate connections and queries
  the dashboard has to manage.
- Hide dashboard objects (extra sheets, containers) that aren't needed
  until a user interacts with something, rather than loading everything
  at once.

## The habit that ties it together

None of this is a one-time pass. The real workflow is a loop: record
performance (Lesson 90), find the top offender, apply the matching fix
from this lesson's checklist, then **record again** to confirm the fix
actually helped before moving to the next item. Optimizing without
re-measuring is just as much guessing as skipping the measurement step
entirely.

## Key terms

| Term | Meaning |
|---|---|
| Incremental refresh | A refresh that only processes new or changed rows, instead of the full source table |
| Context filter | A filter computed once, so other filters run against its already-reduced result |
| High-cardinality dimension | A field with a very large number of distinct values, expensive to filter or group by |

## Lab

1. Take the single longest event you identified in Lesson 90's lab.
   Using the checklist above, name the one specific change you'd make
   first, and which category (extract, query, calculation, or
   dashboard) it falls under.
2. Re-run a Performance Recording on that same workbook after making
   the change, and compare the new Events view to the old one. Did the
   event you targeted actually shrink?

## Check yourself

You're ready for Lesson 92 when you can name at least one concrete
optimization technique for each of the four categories — extracts,
queries, calculations, dashboards — without looking at the checklist,
and explain why re-recording performance after a fix matters just as
much as recording it the first time.
