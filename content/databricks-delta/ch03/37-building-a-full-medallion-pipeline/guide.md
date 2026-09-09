# Lesson 37 — Building a Full Medallion Pipeline

**Chapter 3 · Medallion Architecture · Lesson 37 of 57— Chapter Finale**

## What you'll learn

- Assembling every lesson in this chapter into one real, running pipeline
- The final job structure: three tasks, chained, on a schedule
- A full trace: one NYC Taxi record, from arrival to a dashboard number
- What Chapter 4 (Unity Catalog) adds on top of what's already built

## The complete pipeline, task by task

```
Job: nyc_taxi_medallion_pipeline
  Task 1: bronze_ingest        (Lesson 32's Autoloader, continuous cloudFiles source)
  Task 2: silver_clean         (Lesson 34's foreachBatch + MERGE, depends on Task 1)
  Task 3: gold_aggregate       (Lesson 30's overwrite pattern, depends on Task 2)
```

Every task here is something this chapter already built individually.
Task 1 continuously ingests new files, keeping every row including
malformed ones (Lesson 26). Task 2 casts, deduplicates, quarantines
bad rows (Lessons 27, 36), and merges the result into silver,
idempotently (Lesson 29). Task 3 recomputes gold's aggregates
(Lesson 28) from silver's now-clean data.

## Handling the realities

```python
# Task 2 also reprocesses a 3-day lookback window (Lesson 35)
# to catch anything that arrived late for a recent date

# A quarantine table (Lesson 36) captures anything Task 2 rejects,
# and a quality-metrics table tracks the rejection rate over time
```

This isn't a simplified toy version — it's the same pipeline a real
Databricks team would run, incorporating the late-data correction
and quality tracking this chapter specifically called out as
necessary, not optional extras.

## Tracing one record, start to finish

A single NYC Taxi trip: arrives as one row in a CSV file → picked up
by Autoloader within minutes → lands in `bronze.trips`, untouched,
with `_ingested_at` recorded → Task 2's `foreachBatch` casts its
`fare_amount` to `double`, checks it isn't a duplicate, confirms it
passes the quality check → merged into `silver.trips` → Task 3
aggregates it into that day's revenue total in `gold.daily_revenue`
→ a dashboard queries `gold.daily_revenue` and shows a number that
includes this exact trip. Every step in that chain is something
covered by name, in this chapter.

## What Chapter 4 adds

This pipeline works, but right now, anyone with workspace access can
query `bronze.trips`, `silver.trips`, or `gold.daily_revenue`
directly — there's no governance controlling who can see what.
Chapter 4's Unity Catalog is exactly that missing layer: real access
control, lineage tracking back through this exact bronze → silver →
gold chain, and a proper namespace for organizing all of it.

## Key terms

| Term | Meaning |
|---|---|
| Chained job | Bronze, silver, gold tasks, each depending on the last, on one schedule |
| Full trace | Following one record through every stage, by name, to verify the design |
| What's still missing | Access control and lineage — exactly Chapter 4's subject |

## Congratulations

You've built a complete, real medallion pipeline: raw ingestion,
idempotent cleaning, business aggregation, late-data correction, and
quality tracking — everything a production Databricks pipeline
actually needs, using nothing beyond what this chapter, and
Foundations before it, already taught.

## Check yourself

Chapter complete when you can explain, without looking: trace one
NYC Taxi record from its arrival in a CSV file to its appearance in
a `gold.daily_revenue` number, naming which lesson covers each step.
