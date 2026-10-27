# Lesson 3 — Writing the Glue ETL Job

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 3 of 16**

## What you'll learn

- The real PySpark script behind `northfield-orders-etl`, line by line
- How each transformation fixes a specific problem in the raw, uncorrected data
- The job's configuration: Glue version, worker type and count, bookmarks, and catalog auto-registration
- Why `dropDuplicates` and a null filter belong in the job itself, not left to whoever queries the output later

## The job, in one sentence

`northfield-orders-etl` reads `northfield_catalog.northfield_orders_raw`, fixes its types and
casing, computes one new column, removes duplicate and null-keyed rows, and writes the result as
partitioned Parquet into the curated zone — registering the result as a new catalog table along
the way.

## The script

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

## Reading it top to bottom

**Setup (`getResolvedOptions` through `job.init`).** Every Glue Spark job starts the same way:
resolve the job arguments, start a `GlueContext` over Spark, and initialize the `Job` object that
tracks bookmark state and commits progress at the end. `transformation_ctx="raw_orders"` is what
lets the job bookmark remember, per source, which records it already processed — so a re-run
only picks up new data instead of reprocessing everything from scratch.

**Reading the source.** `create_dynamic_frame.from_catalog` reads straight from the Glue Data
Catalog entry you already have — `northfield_catalog.northfield_orders_raw` — so the job never
hard-codes an S3 path; it goes through the catalog like everything else in this pipeline.
`.toDF()` converts Glue's DynamicFrame into a plain Spark DataFrame, because the rest of the
script uses ordinary Spark column functions.

**The five transformations, each fixing one real problem in the raw data:**

| Line | Problem it fixes |
|---|---|
| `to_date(col("order_date"), "yyyy-MM-dd")` | `order_date` arrived as a string; this makes it a real date Redshift and BI tools can filter and sort on |
| `upper(trim(col("region")))` | Region values can carry inconsistent case or stray whitespace from the source export |
| `col("quantity").cast("int")` | Raw crawler inference left `quantity` untyped/stringy; this makes it a real integer |
| `col("unit_price").cast("decimal(10,2)")` | Same problem for price — cast to a fixed-precision decimal so money math is exact, not floating-point |
| `col("quantity") * col("unit_price")` | `order_total` doesn't exist upstream at all — it's computed once, here, so every downstream report uses the identical formula |

**Dedup and null filter.** `dropDuplicates(["order_id"])` removes any row that's a byte-for-byte
repeat of an `order_id` already seen in this batch — a cheap, real-world safeguard against
upstream export retries or crawler double-reads. `filter(col("order_id").isNotNull())` drops rows
with no order key at all, since a null key can't be joined to anything downstream. Both belong
*here*, in the one place everyone's reports ultimately flow through — not left for Finance or Ops
to each discover and patch independently.

**Writing the output.** `.write.mode("append").partitionBy("dt")` appends new, cleaned rows into
the curated zone, physically organized into one S3 "folder" per `dt` value — the same partitioning
pattern the raw zone already used, so date-range queries (via Athena or Spectrum) can skip
irrelevant partitions entirely. `job.commit()` is what actually advances the bookmark; skip it and
the next run would reprocess everything.

## The job's configuration

- **Job name:** `northfield-orders-etl`
- **Type:** Spark, Glue version **4.0**
- **Workers:** **G.1X** × **5**
- **Script location:** `s3://northfield-glue-scripts/jobs/northfield-orders-etl.py`
- **Job bookmark:** enabled
- **Sink setting:** `enableUpdateCatalog=True`, targeting `northfield_catalog.northfield_orders_curated` —
  this is what registers the curated Parquet as a queryable catalog table automatically, with no
  separate crawler needed for the curated side.

## Key terms

| Term | Meaning |
|---|---|
| Job bookmark | Glue's record of which source data a job has already processed, so re-runs only handle new rows |
| DynamicFrame | Glue's flexible, schema-tolerant data structure, often converted to a Spark DataFrame for transformations |
| enableUpdateCatalog | A Glue sink option that auto-registers written output as a Data Catalog table |
| G.1X worker | A Glue Spark worker type with 1 DPU of compute and 16 GB of memory per worker |

## Lab

For each of the five `.withColumn(...)` lines, write one sentence naming the exact problem it
solves in the raw data — you already have the answers in the table above; the exercise is
recalling them without looking.

## Check yourself

You're ready for Lesson 4 when you can answer, without looking: why do `dropDuplicates` and the
null filter belong inside the ETL job itself, rather than being left for each report to handle on
its own?
