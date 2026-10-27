# Lesson 8 — Connecting Power BI to the Gold Table

**Chapter 1 · Beginner Capstone: First Medallion Pipeline · Lesson 8 of 10**

## What you'll learn

- How Power BI Desktop connects to a Gold Delta table through the platform's SQL endpoint
- The real Import vs. DirectQuery tradeoff, applied to a table this small
- Fabric's Direct Lake mode, named as a third option without forcing Databricks students to use it

## Getting from a Delta table to something Power BI can open

`gold.daily_sales_summary` is a Delta table sitting in a lakehouse. Power BI doesn't read Delta files
directly off storage — it connects through the platform's SQL endpoint, the same way it would connect
to any other SQL data source:

- **On Azure Databricks**: Power BI Desktop's **Get Data → Azure Databricks** connector, pointing at
  the workspace's SQL warehouse/cluster connection details and the `gold.daily_sales_summary` table.
- **On Microsoft Fabric**: the Lakehouse's own **SQL analytics endpoint**, which Power BI connects to
  the same way it connects to a SQL Server database — same `gold.daily_sales_summary` table, reached
  through Fabric's built-in endpoint instead of a separate connector.

Different menu, same destination: one small table with one row per day.

## Import vs. DirectQuery, for a table this size

Power BI's two main connectivity modes make very different tradeoffs:

- **Import** loads a copy of the table's data into the Power BI file itself, refreshed on a schedule.
  Fast to interact with, but the report shows whatever was true as of the last refresh.
- **DirectQuery** sends a live query back to the source every time someone opens the report or
  changes a filter. Always current, but adds query latency and load on the source for every
  interaction.

For `gold.daily_sales_summary` — one row per day, maybe a few hundred rows even after a year of daily
runs — **Import is the right choice**. The table is small enough that refreshing it on a schedule
costs nothing meaningful, and the Store Operations lead gets a snappy report instead of waiting on a
live query for a table this tiny. DirectQuery earns its complexity on large, high-cardinality fact
tables, not a daily summary table like this one.

## A third option, specific to Fabric: Direct Lake

Microsoft Fabric Lakehouses offer a third mode Databricks doesn't have under this name: **Direct
Lake**, which reads the Delta table's Parquet files directly into Power BI's in-memory engine,
skipping both a full Import refresh cycle and DirectQuery's per-query round trip. It's worth knowing
it exists if you're on the Fabric side of this course, but it's not required here — Import works
fine for a table this size, and nothing in this lesson depends on which platform you're using.

## Wiring up the refresh schedule

Whichever connector you used, set Power BI's scheduled refresh to run *after* Lesson 7's pipeline job
is expected to finish — if the refresh fires before Gold has been rebuilt for the day, the report
shows yesterday's already-stale number with no warning that anything's wrong. This is the same
ordering lesson Lesson 7 taught about task dependencies, just extended one hop further, into the
reporting layer.

## Key terms

| Term | Meaning |
|---|---|
| SQL endpoint | The interface a platform exposes so tools like Power BI can query lakehouse tables with SQL |
| Import mode | Power BI loads a copy of the data, refreshed on a schedule |
| DirectQuery | Power BI queries the live source on every interaction, instead of a stored copy |
| Direct Lake | Fabric-specific mode reading Delta Parquet files directly into Power BI's engine |

## Lab

Write out, in your own words, the refresh schedule you'd set for this report given that Lesson 7's
pipeline job runs at 05:00 and typically takes about 20 minutes. What time would you schedule the
Power BI refresh, and why build in a buffer rather than scheduling it for exactly 05:20?

## Check yourself

You're ready for Lesson 9 when you can explain why Import, not DirectQuery, is the right mode for
this specific table, and why the Power BI refresh schedule has to be timed around Lesson 7's pipeline
job rather than chosen independently.
