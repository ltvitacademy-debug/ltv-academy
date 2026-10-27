# Lesson 5 — Loading Redshift With COPY

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 5 of 16**

## What you'll learn

- Why Redshift's `COPY` command exists and why row-by-row `INSERT` doesn't scale to this data
- The exact `COPY` statement that loads `analytics.fact_orders` from the curated S3 zone
- What the `IAM_ROLE` clause is actually doing, and why Redshift needs it instead of a password
- Why `FORMAT AS PARQUET` is the right choice given what Lesson 3's ETL job already produces

## Two tables are built. Nothing is loaded yet.

Lesson 4 created `analytics.dim_product`, `analytics.dim_customer`, `analytics.dim_date`, and
`analytics.fact_orders` on the `northfield-analytics` workgroup — but `CREATE TABLE` only defines
shape. Right now every one of those tables is empty. Meanwhile Lesson 3's Glue ETL job,
`northfield-orders-etl`, has already been writing clean, typed, partitioned Parquet files to
`s3://northfield-curated-zone/orders/` every time it runs. The data Finance needs already exists
in S3 — it just isn't inside Redshift yet. Getting it there is this lesson's entire job.

## Why not just `INSERT` the rows?

A row-by-row `INSERT INTO analytics.fact_orders VALUES (...)` statement for every order would
technically work on a handful of test rows, but it's the wrong tool for moving a curated dataset
with real volume:

- **No parallelism.** Redshift is a clustered, columnar warehouse built to ingest many files across
  multiple compute slices at once. A single `INSERT` statement is one serial operation.
- **No bulk path.** Redshift's storage layer is optimized for large, columnar writes — not for
  absorbing one row at a time through the leader node.
- **It doesn't match what's already sitting in S3.** The curated zone already holds whole Parquet
  files, partitioned by `dt`. Reading them back out just to `INSERT` them row by row would throw
  away the exact shape the ETL job worked to produce.

`COPY` is Redshift's purpose-built bulk-load command: point it at an S3 location and it loads the
files there in parallel, directly into a table.

## The real `COPY` statement

```sql
COPY analytics.fact_orders (order_id, customer_id, product_sku, dt, region, quantity, unit_price, order_total)
FROM 's3://northfield-curated-zone/orders/'
IAM_ROLE 'arn:aws:iam::111122223333:role/northfield-redshift-copy-role'
FORMAT AS PARQUET;
```

Reading it piece by piece:

- **The column list** — `(order_id, customer_id, product_sku, dt, region, quantity, unit_price,
  order_total)` — tells Redshift exactly which columns in `fact_orders` each Parquet column maps
  to, in order. This is worth being explicit about rather than relying on positional luck.
- **`FROM 's3://northfield-curated-zone/orders/'`** — the curated zone, not the raw zone. `COPY`
  loads whatever Parquet files it finds under that prefix, including every `dt=...` partition
  folder underneath it.
- **`FORMAT AS PARQUET`** — tells `COPY` how to parse the files. This only works cleanly because
  Lesson 3's ETL job already wrote the curated zone as Parquet with Snappy compression; `COPY` can
  read Parquet's own embedded schema instead of guessing column types from text.

## The `IAM_ROLE` clause: how Redshift reaches into S3

Redshift Serverless doesn't get a username and password to read your S3 bucket — buckets don't
have logins. Instead, `COPY` assumes an IAM role on your behalf, and that role's permissions
determine what it's allowed to touch. That's what `IAM_ROLE
'arn:aws:iam::111122223333:role/northfield-redshift-copy-role'` is doing: it tells Redshift
"act as this role for the duration of this load." The role, `northfield-redshift-copy-role`, has a
trust policy that lets the Redshift service assume it, and a permissions policy that grants read
access to the curated zone. At this stage that policy is correctly scoped and the load works
without issue — keep this role name in mind, because it becomes important again later in this
chapter.

## Running it

In the Redshift Query Editor v2, connected to the `northfield-dw` namespace / `northfielddw`
database, run the `COPY` statement above against `analytics.fact_orders`. Redshift distributes the
read across the curated zone's partitions and loads matching rows in parallel. The statement
returns once the load completes — but "it returned without an error" isn't the same as "the data
is actually correct and complete." That's what Lesson 6 checks.

## Key terms

| Term | Meaning |
|---|---|
| `COPY` | Redshift's bulk-load command; reads files from S3 (or other sources) in parallel directly into a table |
| `IAM_ROLE` | The `COPY` clause that tells Redshift which IAM role to assume to read the source location |
| `FORMAT AS PARQUET` | Tells `COPY` the source files are Parquet, so it reads their embedded schema directly |
| Columnar load | Loading data in a way that matches a column-oriented warehouse's storage layout, done in parallel across slices |

## Check yourself

You're ready for Lesson 6 when you can answer, without looking: why is `COPY` the right tool here
instead of row-by-row `INSERT`, and what is the `IAM_ROLE` clause actually granting Redshift
permission to do?
