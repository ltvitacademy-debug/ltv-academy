# Lakeflow Declarative Pipelines Syntax Reference

Compiled from Chapter 3 (Lakeflow & Declarative Pipelines). The current (current as of this
course's own production date) naming and syntax, side by side with the legacy names you'll still
see in older notebooks and documentation.

## Naming, past to present

```
Delta Live Tables (DLT)
  -> Lakeflow Declarative Pipelines   (the Databricks product name)
  -> built on Apache Spark Declarative Pipelines (SDP), open source since Spark 4.1
```

| Legacy | Current | Notes |
|---|---|---|
| `import dlt` | `from pyspark import pipelines as dp` | Legacy import still works; current one is recommended |
| `@dlt.table` | `@dp.table()` | Streaming table |
| `@dlt.table` (batch read) | `@dp.materialized_view()` | `@dlt.table` used to cover both, decided by streaming vs. batch read |
| `@dlt.view` | `@dp.temporary_view()` | |
| `dlt.read("x")` / `dlt.read_stream("x")` | `spark.read.table("x")` / `spark.readStream.table("x")` | Current `dp` needs no special read call at all |

## SQL syntax

```sql
-- Streaming table: processes each input row exactly once, incrementally
CREATE OR REFRESH STREAMING TABLE bronze_trips
AS SELECT * FROM STREAM(
  cloud_files('/Volumes/nyc_taxi/bronze/raw_files/', 'csv')
);

-- Materialized view: recomputes its full result on refresh
CREATE MATERIALIZED VIEW gold_daily_revenue
AS SELECT VendorID, sum(fare_amount) AS total_revenue
FROM bronze_trips
GROUP BY VendorID;
```

## Python syntax

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

The dependency between the two is inferred from the plain `FROM bronze_trips` / `spark.read.table
("bronze_trips")` reference — no special linking syntax exists or is needed. Lakeflow builds the
execution graph from these ordinary references across every `CREATE STREAMING TABLE` /
`CREATE MATERIALIZED VIEW` / `@dp.table` / `@dp.materialized_view` definition in the pipeline.

## Expectations (data quality)

```python
@dp.table(name="orders_silver")
@dp.expect_or_drop("valid_total", "order_total > 0")
@dp.expect("has_customer", "customer_id IS NOT NULL")
def orders_silver():
    return dp.read_stream("orders_bronze").select(...)
```

| Expectation type | Behavior on violation |
|---|---|
| `expect` | Row is kept; violation is tracked in pipeline metrics |
| `expect_or_drop` | Row is dropped; pipeline keeps running |
| `expect_or_fail` | Pipeline run fails outright |

Choose `expect_or_drop` when a bad row shouldn't halt the pipeline but also shouldn't be trusted
downstream; choose plain `expect` when the row might still be worth keeping for review; reserve
`expect_or_fail` for violations that mean something is genuinely broken upstream.

## Deploying a pipeline definition

Pipeline code is deployed via **Databricks Asset Bundles** — a YAML-defined, version-controlled
deployment unit, not a notebook you click "Run" on manually. This is what makes a declarative
pipeline a real CI/CD artifact instead of a one-off script.

## Related course material

- Lesson 12 — What Is Lakeflow?
- Lesson 13 — Declarative Pipeline Syntax
- Lesson 14 — Lakeflow vs. Traditional Notebooks
- Lesson 15 — Expectations & Data Quality in Lakeflow
- Lesson 16 — Lakeflow Deployment
