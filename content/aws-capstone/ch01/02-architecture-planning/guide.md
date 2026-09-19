# Architecture Planning

Before touching the console, we're naming every piece of Northfield's platform and deciding
where data lives at each stage. Every lesson from here forward references these exact names —
get the architecture right once, and the rest of the build is just executing the plan.

## What you'll learn

- The full architecture diagram, service by service
- How the S3 raw and curated zones are laid out, with real bucket and prefix names
- The naming convention we'll reuse for every Glue, Redshift, and Step Functions resource

## The architecture, end to end

```
EventBridge (nightly schedule)
        |
        v
Step Functions: northfield-pipeline-orchestrator
        |
        +--> Glue Crawler: northfield-raw-crawler
        |         (scans S3 raw zone, updates Glue Data Catalog: northfield_catalog)
        |
        +--> Glue ETL Job: northfield-orders-etl (PySpark, Spark 3.x)
        |         reads northfield_orders_raw --> writes curated Parquet
        |
        +--> Redshift COPY (curated S3 --> analytics.fact_orders)
        |
        +--> SNS notification: northfield-pipeline-notifications
        |
   Athena (ad hoc SQL, direct against S3 + Glue Catalog)
```

Two S3 buckets anchor everything:

- **`northfield-raw-zone`** — unmodified, as-ingested files. Nothing here is ever edited in place.
- **`northfield-curated-zone`** — the Glue ETL job's output: cleaned, typed, Parquet-formatted
  data ready for Redshift and Athena.

A third bucket, **`northfield-glue-scripts`**, holds the versioned PySpark scripts the Glue job
runs — this is what Lesson 11's CI/CD pipeline deploys to.

## Raw zone layout

Northfield's nightly export produces two file sets: orders and inventory snapshots. Both land
in the raw zone under a date-partitioned prefix so the Glue crawler (Lesson 4) can infer
partitions automatically:

```
s3://northfield-raw-zone/orders/dt=2026-09-19/orders_2026-09-19.csv
s3://northfield-raw-zone/inventory/dt=2026-09-19/inventory_2026-09-19.csv
```

`dt=YYYY-MM-DD` is a Hive-style partition key — Athena and Glue both recognize it without extra
configuration. The curated zone mirrors this shape but in Parquet:

```
s3://northfield-curated-zone/orders/dt=2026-09-19/part-0000.snappy.parquet
```

## Naming convention

Every resource this capstone creates is prefixed `northfield-` (or `northfield_` for
underscore-only namespaces like Glue databases and Redshift tables), so a teammate — or an
interviewer looking at your portfolio — can tell at a glance which resources belong to this
project:

| Layer | Resource | Name |
|---|---|---|
| Storage | Raw zone bucket | `northfield-raw-zone` |
| Storage | Curated zone bucket | `northfield-curated-zone` |
| Storage | Glue script bucket | `northfield-glue-scripts` |
| Catalog | Glue database | `northfield_catalog` |
| Catalog | Glue crawler | `northfield-raw-crawler` |
| Compute | Glue ETL job | `northfield-orders-etl` |
| Warehouse | Redshift Serverless workgroup | `northfield-analytics` |
| Warehouse | Redshift database | `northfielddw` |
| Orchestration | Step Functions state machine | `northfield-pipeline-orchestrator` |
| Orchestration | EventBridge rule | `northfield-nightly-trigger` |

We'll add IAM roles, CloudWatch alarms, and CI/CD resources to this table as later lessons
introduce them — but the pattern never changes.

## Key terms

| Term | Meaning |
|---|---|
| Raw zone | S3 prefix holding unmodified source files, partitioned by ingestion date |
| Curated zone | S3 prefix holding the Glue ETL job's cleaned, Parquet output |
| Hive-style partitioning | `key=value` folder naming (e.g. `dt=2026-09-19`) that Glue/Athena parse automatically |
| Naming convention | A consistent prefix (`northfield-`) applied to every resource in the project |

## Check yourself

Why does the raw zone use Hive-style date partitioning (`dt=2026-09-19/`) instead of just
dropping every day's file into one flat folder?
