# Lesson 50 — Lakeflow Declarative Pipelines

**Chapter 5 · Lakeflow · Lesson 50 of 57**

## What you'll learn

- Declarative vs. imperative — the real shift this lesson introduces
- What Chapter 3's manual pipeline required you to specify, that this doesn't
- The dependency graph — inferred, not hand-chained like Lesson 30's tasks
- Why "declarative" doesn't mean "less powerful"

## Imperative — what Chapter 3 actually required

Chapter 3's pipeline was **imperative**: you wrote the exact steps —
read bronze, transform, `MERGE` into silver, then read silver,
aggregate, write gold — and you wired Task 1 → Task 2 → Task 3
yourself (Lesson 30). Correct, but every dependency between steps
was something you had to notice and express by hand.

## Declarative — describing the result, not the steps

```python
import dlt

@dlt.table
def bronze_trips():
    return spark.readStream.format("cloudFiles").option("cloudFiles.format", "csv").load(
        "/Volumes/nyc_taxi/bronze/raw_files/"
    )

@dlt.table
def silver_trips():
    return dlt.read_stream("bronze_trips").withColumn(
        "fare_amount", col("fare_amount").cast("double")
    ).dropDuplicates(["VendorID", "tpep_pickup_datetime"])

@dlt.table
def gold_daily_revenue():
    return dlt.read("silver_trips").groupBy("VendorID").agg(sum("fare_amount").alias("total_revenue"))
```

Notice `silver_trips()` calling `dlt.read_stream("bronze_trips")` —
that single reference is the *entire* dependency declaration.
Nobody wrote "Task 2 depends on Task 1"; the framework infers the
whole bronze → silver → gold order automatically, purely from which
function reads which other function's output.

## The dependency graph, inferred

Lakeflow builds a real directed graph from these function
references — exactly Lesson 25's bronze/silver/gold flow, and
exactly Lesson 30's task-chaining, but discovered by the framework
by reading the code, rather than declared explicitly in a job's
task list. Add a new table reading from `silver_trips` later, and
it's automatically slotted into the correct position — no job
configuration to update.

## Why declarative doesn't mean less powerful

Everything from Chapters 2–3 remains available inside a `@dlt.table`
function: casting, deduplication, joins, window functions, all of
it. Nothing about the underlying PySpark changes — what changes is
*how the pipeline's structure gets expressed*: as a set of functions
whose data dependencies imply the execution order, instead of a
task list whose order you maintain by hand.

## Key terms

| Term | Meaning |
|---|---|
| Imperative | You specify the exact steps and their order — Chapter 3's pipeline |
| Declarative | You describe each table; dependency order is inferred from references |
| `dlt.read()` / `dlt.read_stream()` | How one `@dlt.table` function references another's output |

## Check yourself

You're ready for Lesson 51 when you can explain, without looking: how
does Lakeflow know that `silver_trips` must run after `bronze_trips`,
without anyone declaring that dependency explicitly?
