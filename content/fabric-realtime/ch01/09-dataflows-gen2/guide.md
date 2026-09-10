# Lesson 9 — Dataflows Gen2

**Chapter 1 · Microsoft Fabric · Lesson 9 of 70**

## What you'll learn

- Dataflows Gen2: Power Query's transformation model, writing to a lakehouse
- The real difference from a notebook: no-code steps vs. PySpark code
- When a Dataflow is the right tool, and when it genuinely isn't
- Where the transformed output actually lands

## Power Query, writing to a lakehouse

A **Dataflow Gen2** uses Power Query — the same transformation
engine behind Power BI's own data prep — to clean and reshape data,
then write the result into a lakehouse table. Each transformation
(remove a column, filter rows, change a type, merge two sources) is
a recorded **step**, shown as a readable list, rather than a line
of code.

```
Dataflow: clean_zone_lookup
  Step 1: Source -- CSV file
  Step 2: Remove columns -- drop an unused column
  Step 3: Filter rows -- Borough is not null
  Step 4: Change type -- LocationID to whole number
  Data destination: nyc_taxi_lakehouse.zones
```

## The real difference from a notebook

Recall Lesson 6: a Fabric notebook runs real PySpark, with the full
DataFrame API from Foundations' Chapter 4 available. A Dataflow's
steps are Power Query's own transformation language (M, under the
hood) — genuinely different from PySpark, with a different mental
model (click a step, describe what changes) rather than write a
transformation as code.

## When a Dataflow is the right tool

Dataflows fit well for smaller, business-user-friendly
transformations — the kind of cleanup a Power BI analyst might
already be comfortable doing, without writing Python or Spark SQL
at all. For this course's own `zones` lookup table (a few hundred
rows, simple column cleanup), a Dataflow is a genuinely reasonable
choice. For the actual NYC Taxi trip data — millions of rows,
needing the casting/deduplication/window-function logic Databricks
& Delta Lake's entire Chapter 2–3 material covered — a real
notebook, with real PySpark, is the better fit; Dataflows aren't
built for that scale or that kind of logic.

## Where the output lands

A Dataflow's **Data destination** setting writes its result
directly into a lakehouse table (or a warehouse table), the same
`Tables` area Lesson 4 introduced — from that point on, the
resulting table is queryable by a notebook, a pipeline, or Power BI,
exactly like any other lakehouse table, regardless of which tool
actually produced it.

## Key terms

| Term | Meaning |
|---|---|
| Dataflow Gen2 | Power Query's transformation model, writing to a lakehouse/warehouse |
| Step | One recorded transformation, shown as a readable list item |
| Data destination | Where a Dataflow's output actually lands — a real table |

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: why
would a Dataflow be a poor fit for this course's own NYC Taxi trip
data, at full scale?
