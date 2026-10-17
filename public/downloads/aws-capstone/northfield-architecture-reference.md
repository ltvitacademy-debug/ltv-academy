# Northfield Architecture & Naming Reference

> Pulled from Lesson 2 (Architecture Planning) and Lesson 5
> (Transforming With Glue ETL). Keep this open while you build your
> own version of the capstone — reuse the naming pattern even if you
> don't keep the name "northfield".

## The pipeline, end to end

```
On-prem SQL Server (Northfield's order system)
        |
        |  Nightly bcp export -> aws s3 cp (--sse AES256), plus a
        |  _SUCCESS marker per partition
        |  (DMS with CDC is the scale-up answer, not what's built --
        |  see Lesson 3)
        v
s3://northfield-raw-zone/orders/dt=YYYY-MM-DD/   (raw, untouched)
        |
        |  Glue Crawler  ->  northfield_catalog (Glue Data Catalog)
        |
        |  Glue ETL job: northfield-orders-etl
        |  (PySpark, job-bookmark enabled, transformation_ctx="raw_orders")
        v
s3://northfield-curated-zone/orders/dt=YYYY-MM-DD/   (cleaned, deduped)
        |
        +---------------------------+
        |                           |
        v                           v
  Redshift Serverless          Amazon Athena
  (northfield-analytics          (ad-hoc queries directly
   workgroup, COPY via            against the curated zone,
   northfield-redshift-copy-role) no warehouse required)
        |
        v
  BI / reporting layer
```

Orchestration: AWS Step Functions state machine checks for the
nightly ingestion job's `_SUCCESS` marker, then coordinates the Glue
Crawler run, the `northfield-orders-etl` job, and the Redshift load,
with CloudWatch Events (EventBridge) triggering the state machine on
a nightly schedule.

## Resource naming table

Every resource in this project shares a consistent `northfield-`
prefix (or `northfield_` for Glue/Redshift catalog objects, which
don't allow hyphens) — the point isn't the specific word "northfield",
it's that every object in the project is recognizable as belonging to
it at a glance, including in a shared AWS account with other
projects' resources mixed in.

| Resource | Name | Type |
|---|---|---|
| Raw zone bucket | `northfield-raw-zone` | S3 bucket |
| Curated zone bucket | `northfield-curated-zone` | S3 bucket |
| Glue database | `northfield_catalog` | Glue Data Catalog database |
| Raw orders table | `northfield_orders_raw` | Glue Catalog table |
| Curated orders table | `northfield_orders_curated` | Glue Catalog table |
| ETL job | `northfield-orders-etl` | Glue ETL job |
| Job bookmark context | `raw_orders` | `transformation_ctx` string |
| IAM role (ETL) | `northfield-glue-etl-role` | IAM role |
| IAM role (Redshift load) | `northfield-redshift-copy-role` | IAM role |
| IAM role (Compliance access) | `northfield-compliance-group` | IAM role |
| Redshift workgroup | `northfield-analytics` | Redshift Serverless workgroup |
| Orchestration | `northfield-pipeline` | Step Functions state machine |

## The naming pattern, generalized

1. **Pick one short project prefix** and use it everywhere — buckets,
   IAM roles, Glue jobs, Redshift workgroups, state machines. In a
   shared AWS account, this is what lets you (or a teammate) tell at
   a glance which resources belong to which project.
2. **Respect each service's own naming rules.** S3 buckets, IAM roles,
   and Step Functions state machines accept hyphens; Glue databases,
   tables, and `transformation_ctx` strings are Python-identifier-like
   and use underscores instead. Northfield's naming table above
   reflects this split deliberately — it isn't inconsistency, it's
   each service's own constraint.
3. **Name by role, not by technology.** `northfield-orders-etl` says
   what the job does (transforms orders); it doesn't need "glue" in
   the name because the AWS console already tells you that from
   context. The same discipline from Chapter 2's IAM least-privilege
   lesson applies to naming: specific and purposeful beats generic.
4. **Keep the raw/curated zone split explicit in the bucket name
   itself** (`-raw-zone` / `-curated-zone`) rather than relying on a
   folder prefix inside one bucket — it makes IAM policies and
   lifecycle rules easier to scope correctly per zone.
