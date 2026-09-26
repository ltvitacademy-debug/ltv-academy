# Glue Data Catalog & ETL

In Lesson 1 we put a customer dataset into S3. But a folder of Parquet files has no name, no schema you can look up, and no way for another tool to find it. The AWS Glue Data Catalog fixes that. In this lesson we look at the catalog and at Glue ETL jobs strictly from the data scientist's seat: how to register your training tables, and when feature preparation should move out of your notebook into a Glue job. If you took the AWS Data Engineer path you built crawlers and jobs in depth; here we only apply them.

As in every lesson of this course, AWS code is illustrative and **not run here**; the pandas code is real and was run.

## What you'll learn

- What the Data Catalog stores, and what it does not
- Two ways to register a table: a crawler, or writing it from Python
- How to browse the catalog from a notebook
- When to prepare features in pandas and when in a Glue Spark job
- The shape of a Glue job script that reads a catalog table

## The catalog holds metadata, not data

The AWS docs describe the Data Catalog as a centralized repository of metadata: the location, schema and properties of your data. It is organized into **databases** and **tables**, like a traditional database catalog. The data itself stays in S3. A table entry says "these Parquet files live under this prefix and have these columns."

Why should a data scientist care? Because Athena, Redshift Spectrum, EMR and Glue jobs all read the same catalog, and Amazon SageMaker AI is listed among the integrated services. Name a table once and every tool sees the same schema, instead of each notebook hard-coding a path and guessing types.

## Registering a table

You can populate the catalog with a **crawler**, which scans a data source and infers the schema, or define tables manually. From Python, the AWS SDK for pandas can write a dataset and register it in one call:

```python
import awswrangler as wr

wr.s3.to_parquet(
    df, path="s3://my-ds-bucket/v1/",
    dataset=True, mode="overwrite",
    database="churn_db", table="customers")

wr.catalog.tables(database="churn_db")
```

The second call returns a DataFrame listing the tables in that database. With plain `boto3` the equivalent lookups are `glue.get_table(DatabaseName=..., Name=...)` and `glue.start_crawler(Name=...)`. I checked those parameter names against the boto3 service model; nothing was called on AWS.

## Feature preparation: start in pandas

Before scaling anything, get the logic right on a sample. Here is a small feature function I ran on the 50,000-row customer table:

```python
d["tenure_bucket"] = pd.cut(
    d.tenure_months, [0, 12, 36, 72],
    labels=["0-12", "13-36", "37-72"])
d["spend_per_ticket"] = (
    d.monthly_spend / (d.support_tickets + 1))
d = pd.get_dummies(d, columns=["plan"])
```

The new bucket already tells a story. Churn rate by tenure bucket was 27.5 percent for 0-12 months (8,353 customers), 21.8 percent for 13-36 (16,933), and 14.1 percent for 37-72 (24,714). All numbers are from synthetic data, so treat them as illustrative.

## Scaling out with a Glue ETL job

When the data no longer fits in a notebook's memory, the same logic becomes a Glue job. Glue job types are **Spark**, **Spark Streaming** and **Python shell**. The Glue version sets the Spark and Python versions; as of this writing new jobs default to Glue 5.1, but check the current docs. You choose a worker type and a number of workers, and you are billed for the DPUs (units of compute) the job uses.

A minimal read from the catalog looks like this (illustrative):

```python
args = getResolvedOptions(sys.argv, ["JOB_NAME"])
gc = GlueContext(SparkContext())
dyf = gc.create_dynamic_frame.from_catalog(
    database="churn_db", table_name="customers")
df = dyf.toDF()   # now a Spark DataFrame
```

`from_catalog` accepts a `push_down_predicate` so you read only the partitions you need. After `toDF()` you use ordinary Spark code, then write Parquet to a new versioned prefix such as `processed/v2/`. The job's IAM role needs access to the catalog and to both S3 locations, which is Lesson 5.

## Which tool when?

- **Notebook and pandas:** exploring, prototyping, data that fits in memory.
- **Glue Spark job:** repeatable, scheduled, large-scale preparation.
- **Athena (next lesson):** filtering and aggregating with SQL before you pull anything into Python.

## Recap

The catalog gives your S3 data names and schemas that every AWS analytics service shares. Register tables with a crawler or from `awswrangler`, prototype features in pandas, and promote them to a Glue job when scale demands it.

Next, Lesson 3 uses Athena to query those catalog tables with SQL.
