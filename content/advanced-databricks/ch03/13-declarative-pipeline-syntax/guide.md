# Lesson 13 — Declarative Pipeline Syntax

**Chapter 3 · Lakeflow & Declarative Pipelines · Lesson 13 of 34**

## What you'll learn

- The real, current SQL syntax: `CREATE STREAMING TABLE` and `CREATE MATERIALIZED VIEW`
- The real, current Python syntax: `@dp.table` and `@dp.materialized_view`, from the `pyspark.pipelines` module
- How a dependency between two tables is inferred from an ordinary table reference — nothing special to write
- Why the earlier course only ever showed the Python side, and what SQL adds

## Streaming table and materialized view, in SQL

Lesson 12 named these two dataset types; here's what they actually look
like. A streaming table processes each input row exactly once, incrementally,
as it arrives — the SQL analog of Auto Loader (Chapter 2):

```sql
CREATE OR REFRESH STREAMING TABLE bronze_trips
AS SELECT * FROM STREAM(
  cloud_files('/Volumes/nyc_taxi/bronze/raw_files/', 'csv')
);
```

A materialized view recomputes its full result whenever refreshed — better
suited to aggregates that need to look at the whole table, not just new
rows:

```sql
CREATE MATERIALIZED VIEW gold_daily_revenue
AS SELECT VendorID, sum(fare_amount) AS total_revenue
FROM bronze_trips
GROUP BY VendorID;
```

## The dependency, inferred from one plain reference

Look closely at `gold_daily_revenue`: it just says `FROM bronze_trips` — an
ordinary table reference, no special syntax. That single line is the entire
dependency declaration. Lakeflow reads every `CREATE STREAMING TABLE` and
`CREATE MATERIALIZED VIEW` statement in the pipeline, builds a graph from
which statement references which other table, and runs `bronze_trips` before
`gold_daily_revenue` — automatically, every time.

## The same two tables, in Python

`pyspark.pipelines` (Lesson 12's `dp`) mirrors this exactly — and the
dependency inference works the same plain way: an ordinary
`spark.read.table()` or `spark.readStream.table()` call, not a special
pipeline-only function:

```python
from pyspark import pipelines as dp

@dp.table()
def bronze_trips():
    return (
        spark.readStream.format("cloudFiles")
        .option("cloudFiles.format", "csv")
        .load("/Volumes/nyc_taxi/bronze/raw_files/")
    )

@dp.materialized_view()
def gold_daily_revenue():
    return (
        spark.read.table("bronze_trips")
        .groupBy("VendorID")
        .sum("fare_amount")
    )
```

Note the plain `spark.read.table("bronze_trips")` — Lesson 51's `dlt` module
required a special `dlt.read()`/`dlt.read_stream()` call to reference another
pipeline table. The current `dp` module drops that requirement entirely:
ordinary Spark read calls are enough for the dependency graph to see the
link.

## Why the earlier course only showed Python

Databricks & Delta Lake Lessons 50-52 built everything with `@dlt.table` in
Python, because that's genuinely the more common path for a course teaching
PySpark from scratch. In real production teams, especially ones with a
SQL-first analytics background, the SQL surface above is just as complete —
same engine, same inferred dependency graph, same Expectations (Lesson 15).
Choosing between them is a team-skills decision, not a capability one.

## Key terms

| Term | Meaning |
|---|---|
| `CREATE STREAMING TABLE ... AS SELECT` | SQL syntax for an incrementally-processed pipeline table |
| `CREATE MATERIALIZED VIEW ... AS SELECT` | SQL syntax for a fully-recomputed pipeline table |
| Inferred dependency | A plain table reference (SQL `FROM`, Python `spark.read.table()`) — no special linking syntax needed |

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: how does
`gold_daily_revenue` end up running after `bronze_trips`, when neither
statement explicitly declares that order?
