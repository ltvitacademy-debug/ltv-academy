# Transforming With Glue ETL

`northfield_orders_raw` has the right rows, but wrong shapes: `order_date` is a string,
`region` has inconsistent casing from the SQL Server export, and everything is still row-per-order
CSV instead of the columnar Parquet Redshift and Athena both prefer. The Glue ETL job —
`northfield-orders-etl` — fixes all three in one Spark run.

## What you'll learn

- The transformation logic this capstone's Glue job applies, in real PySpark
- Why the output lands as partitioned Parquet in the curated zone
- Job bookmarks, and why they matter for a nightly incremental job

## The job, in outline

```
Job name:     northfield-orders-etl
Type:         Spark (Glue ETL, Glue version 4.0)
Worker type:  G.1X, 5 workers  (revisited for cost in Lesson 12)
Script:       s3://northfield-glue-scripts/jobs/northfield-orders-etl.py
Source:       northfield_catalog.northfield_orders_raw
Target:       s3://northfield-curated-zone/orders/  (Parquet, Snappy compression)
Bookmark:     enabled
```

## The transformation, in PySpark

```python
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job
from pyspark.sql.functions import col, upper, to_date, trim

args = getResolvedOptions(sys.argv, ["JOB_NAME"])
glueContext = GlueContext(SparkContext.getOrCreate())
job = Job(glueContext)
job.init(args["JOB_NAME"], args)

raw = glueContext.create_dynamic_frame.from_catalog(
    database="northfield_catalog",
    table_name="northfield_orders_raw",
    transformation_ctx="raw_orders",
).toDF()

curated = (
    raw
    .withColumn("order_date", to_date(col("order_date"), "yyyy-MM-dd"))
    .withColumn("region", upper(trim(col("region"))))
    .withColumn("quantity", col("quantity").cast("int"))
    .withColumn("unit_price", col("unit_price").cast("decimal(10,2)"))
    .withColumn("order_total", col("quantity") * col("unit_price"))
    .dropDuplicates(["order_id"])
    .filter(col("order_id").isNotNull())
)

curated.write.mode("append").partitionBy("dt").parquet(
    "s3://northfield-curated-zone/orders/"
)

job.commit()
```

Three real fixes happen here: `order_date` becomes an actual date type instead of a string,
`region` is normalized to uppercase and trimmed (the on-prem export sometimes writes `"west"`,
`" West"`, and `"WEST"` for the same region), and a computed `order_total` column is added so
downstream SQL in Redshift and Athena doesn't have to repeat that multiplication in every query.

The job's writer also sets `enableUpdateCatalog=True` on its Glue sink, targeting
`northfield_catalog.northfield_orders_curated`. That means this same run both writes the Parquet
files *and* registers/updates the curated table's schema in the Data Catalog — no separate
crawler needed for the curated zone. Lesson 7's Athena queries read `northfield_orders_curated`
directly because of this.

## Why job bookmarks matter

Without bookmarks, every run of `northfield-orders-etl` would reprocess the *entire* raw zone —
including partitions already transformed last week. **Job bookmarks** track which S3 objects
Glue has already processed, so a nightly run only reads the new `dt=` partition that landed since
the last successful run. This keeps runtime (and DPU cost) proportional to one night's data, not
the whole history.

## Why Parquet, and why partitioned by dt

Parquet is columnar and compressed — a query that only needs `order_total` and `region` reads
just those column chunks, not entire rows, and Snappy compression shrinks storage versus raw CSV.
Partitioning the output by `dt` (the same key used in the raw zone) means Athena and Redshift
Spectrum can prune partitions on the curated side too, not just the raw side.

## Key terms

| Term | Meaning |
|---|---|
| DynamicFrame | Glue's Spark abstraction with built-in schema flexibility, used to read from the Catalog |
| Job bookmark | Glue's tracking of already-processed source data, enabling incremental runs |
| Columnar format (Parquet) | Storage layout that lets queries read only the columns they need |
| G.1X worker | A Glue Spark worker size (4 vCPU, 16 GB) — the DPU unit billed per hour |

## Check yourself

If `northfield-orders-etl` ran without job bookmarks enabled, what would happen to its runtime
and cost as the raw zone accumulates a year of daily partitions?
