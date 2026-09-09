# Lesson 29 — Designing a Bronze-to-Silver Pipeline

**Chapter 3 · Medallion Architecture · Lesson 29 of 57**

## What you'll learn

- Turning Lesson 27's one-off transformation into a real, reusable notebook
- Idempotency — the property that makes rerunning a pipeline safe
- Why MERGE, not append, is usually the right write mode for silver
- Wrapping the whole thing as a parameterized, schedulable job

## From a one-off script to a real pipeline

Lesson 27 showed the transformation logic; a real pipeline wraps it
so it can run **repeatedly**, safely, on new bronze data each time —
using Lesson 9's widgets for what date/batch to process, and Lesson
11's jobs to actually schedule it.

```python
dbutils.widgets.text("process_date", "2024-01-15")
process_date = dbutils.widgets.get("process_date")

new_bronze_rows = spark.table("bronze.trips").filter(
    to_date(col("_ingested_at")) == process_date
)
```

## Idempotency — the property that matters most

A pipeline is **idempotent** if running it twice on the same input
produces the same result as running it once — no duplicated rows,
no doubled totals. This matters because real jobs sometimes get
retried (a transient failure, a manual rerun to fix something) — a
non-idempotent pipeline silently corrupts data on a second run,
exactly the kind of bug that's easy to miss until it's already
happened in production.

## Why MERGE, not append, for silver

```python
from delta.tables import DeltaTable

silver_table = DeltaTable.forName(spark, "silver.trips")
silver_table.alias("target").merge(
    cleaned_new_rows.alias("source"),
    "target.VendorID = source.VendorID AND target.tpep_pickup_datetime = source.tpep_pickup_datetime",
).whenMatchedUpdateAll().whenNotMatchedInsertAll().execute()
```

Plain `append` (Lesson 16) would duplicate rows on a rerun — the
same bronze batch processed twice produces the same cleaned rows
twice. `MERGE` (Lesson 22), matching on the same key used for
deduplication, only inserts genuinely new rows and updates existing
ones — this is the concrete mechanism that makes the pipeline
idempotent.

## Wrapping it as a job

Everything here — the widget-driven date filter, the read from
bronze, the transformations from Lesson 27, the `MERGE` write —
becomes one notebook, attached to a job (Lesson 11) on a daily
schedule, with `process_date` supplied as a job parameter (Lesson
9) rather than typed by hand. This is the complete mechanical
pattern real production bronze-to-silver pipelines actually use.

## Key terms

| Term | Meaning |
|---|---|
| Idempotent | Running twice on the same input produces the same result as running once |
| `MERGE` for silver | Prevents duplicate rows on a rerun — the mechanism behind idempotency here |
| Parameterized job | Widgets + a schedule, turning a notebook into a real, repeatable pipeline |

## Check yourself

You're ready for Lesson 30 when you can explain, without looking: why
would using `mode("append")` instead of `MERGE` make a
bronze-to-silver pipeline unsafe to rerun?
