# Glue ETL Jobs: Python & Scala Spark

Crawlers and the Catalog tell you what data exists and what shape it's in. A Glue **job**
is what actually reads it, transforms it, and writes the result somewhere new. This lesson
covers how jobs are authored — the language choice, the generated boilerplate, and the one
Glue-specific data structure that shows up in almost every script: the DynamicFrame.

## What you'll learn

- Python (PySpark) vs. Scala Spark as job authoring languages
- The boilerplate structure Glue generates for a new job
- DynamicFrame vs. DataFrame, and when each one is the right tool
- How a job typically reads from and writes to the Data Catalog

## Python or Scala: both are real Spark

A Glue job can be written in **PySpark** (Python) or **Scala Spark**. Both compile down to
the same underlying Spark execution engine — the choice is about team preference and
ecosystem fit, not capability. PySpark tends to be the more common choice for data
engineering teams because Python has a larger data-tooling ecosystem and a shallower
learning curve; Scala Spark shows up more often on teams already invested in the JVM
ecosystem or that need the (modest) performance edge of avoiding Python's serialization
overhead for very heavy custom logic. For most ETL — reading, filtering, joining, writing —
the practical difference is small.

## The generated boilerplate

When you create a job in the Glue console, AWS generates a starting script with a
predictable shape:

```
import sys
from awsglue.transforms import *
from awsglue.utils import getResolvedOptions
from pyspark.context import SparkContext
from awsglue.context import GlueContext
from awsglue.job import Job

args = getResolvedOptions(sys.argv, ["JOB_NAME"])
sc = SparkContext()
glueContext = GlueContext(sc)
spark = glueContext.spark_session
job = Job(glueContext)
job.init(args["JOB_NAME"], args)

# your transform logic goes here

job.commit()
```

The `GlueContext` wraps a regular `SparkContext` and adds Glue-specific methods — most
importantly, reading from and writing to the Data Catalog. `job.commit()` at the end is
what finalizes bookmark state (Lesson 16 covers bookmarks) — skip it and incremental reruns
won't behave correctly.

## DynamicFrame vs. DataFrame

Spark's native data structure is the **DataFrame**. Glue layers its own structure on top
called a **DynamicFrame**, designed for semi-structured data where schema might vary row
to row — a DynamicFrame can represent a column with inconsistent types across records
without failing, which is common with real-world JSON. `GlueContext.create_dynamic_frame`
methods read straight from a Data Catalog table into a DynamicFrame.

In practice, most transform logic still happens on a DataFrame: convert with
`.toDF()` to drop into standard Spark APIs, do your joins and aggregations there, then
convert back with `DynamicFrame.fromDF()` if you need Glue-specific write methods
afterward. DynamicFrames are most valuable at the read/write boundary with the Catalog;
DataFrames are what you actually transform with.

## Reading and writing against the Catalog

A typical job reads via `glueContext.create_dynamic_frame.from_catalog(database=...,
table_name=...)`, transforms the data, and writes via
`glueContext.write_dynamic_frame.from_options(...)` targeting an S3 path — often in a
different format (say, converting CSV to Parquet) or a different Catalog database (raw to
staging). The job doesn't need to know the S3 path directly if it's reading from the
Catalog by database/table name — another reason the crawler-then-job pattern from Lesson
11 matters.

## Key terms

| Term | Meaning |
|---|---|
| PySpark | Spark's Python API — the more common Glue job authoring language |
| Scala Spark | Spark's native JVM API — used when a team is already JVM-invested |
| DynamicFrame | Glue's data structure for semi-structured data with flexible schema |
| DataFrame | Spark's native structured data structure, used for most transform logic |
| job.commit() | Finalizes a job run, including bookmark state |

## Check yourself

A job reads JSON where one field is sometimes a string and sometimes a number depending on
the record. Why would reading that as a DynamicFrame first, rather than a DataFrame
directly, help avoid the job failing outright?
