# Lesson 51 — Defining a Pipeline With @dlt.table

**Chapter 5 · Lakeflow · Lesson 51 of 57**

## What you'll learn

- `@dlt.table` in full: the decorator, the function, the return value
- `@dlt.view` — a step that doesn't materialize as its own table
- Naming: how the function name becomes the table name
- Table properties and comments, declared right alongside the definition

## The full anatomy of one @dlt.table

```python
import dlt
from pyspark.sql.functions import col

@dlt.table(
    comment="Raw NYC Taxi trip records, as ingested",
    table_properties={"quality": "bronze"},
)
def bronze_trips():
    return (
        spark.readStream.format("cloudFiles")
        .option("cloudFiles.format", "csv")
        .load("/Volumes/nyc_taxi/bronze/raw_files/")
    )
```

The **decorator** (`@dlt.table(...)`) declares metadata: a
`comment` (shown in the catalog, Lesson 40), and `table_properties`
(here, a simple `quality` tag matching this course's own
bronze/silver/gold vocabulary). The **function name**
(`bronze_trips`) becomes the actual table name once the pipeline
runs. The function's **return value** is the DataFrame Lakeflow
materializes as that table's contents — exactly the DataFrame this
course has built with the same PySpark methods all along.

## @dlt.view — a step that doesn't become a table

```python
@dlt.view
def cleaned_trips_view():
    return dlt.read("bronze_trips").withColumn(
        "fare_amount", col("fare_amount").cast("double")
    )

@dlt.table
def silver_trips():
    return dlt.read("cleaned_trips_view").dropDuplicates(["VendorID", "tpep_pickup_datetime"])
```

`@dlt.view` defines an intermediate transformation step used only
*within* the pipeline — it participates in the same inferred
dependency graph (Lesson 50) but is never materialized as its own
queryable Delta table. Useful for breaking a long transformation
into named, readable pieces without cluttering the catalog with
tables nobody needs to query directly.

## Table properties, declared right alongside the table

```python
@dlt.table(table_properties={"pipelines.reset.allowFullRefresh": "false"})
def gold_daily_revenue():
    return dlt.read("silver_trips").groupBy("VendorID").agg(sum("fare_amount").alias("total_revenue"))
```

Compare this to Lesson 40's separate `CREATE TABLE`/`ALTER TABLE`
statements — here, a table's properties live in the same place as
its actual transformation logic, one function, fully self-contained.

## Key terms

| Term | Meaning |
|---|---|
| `@dlt.table` | Declares a materialized table; the function name becomes the table name |
| `@dlt.view` | An intermediate step in the dependency graph, never materialized as a table |
| Function return value | The DataFrame Lakeflow materializes as that table's actual contents |

## Check yourself

You're ready for Lesson 52 when you can explain, without looking: why
would you use `@dlt.view` instead of `@dlt.table` for an
intermediate transformation step?
