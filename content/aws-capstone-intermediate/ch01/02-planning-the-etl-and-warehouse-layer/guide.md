# Lesson 2 — Planning the ETL and Warehouse Layer

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 2 of 16**

## What you'll learn

- The plain-English plan for replacing ad hoc Athena queries with a repeatable load
- Where the Glue ETL job sits between the raw zone and the warehouse
- Why a curated S3 zone exists in between, not just raw-to-Redshift directly
- The shape of the Redshift warehouse this chapter builds, at a glance

## Start from what has to be true, not from the services

Before naming a single AWS resource, write down what Finance's request actually requires:

- The same transformation logic has to run **every time**, producing the same shape of
  result — that means a real job, not a query someone retypes.
- The result has to live somewhere **built for repeated, join-heavy reads** by a BI tool or
  analyst — that rules out re-scanning raw CSVs in S3 every time someone asks a question.
- The raw data's loose typing (strings where there should be dates and decimals) has to be
  fixed **once, centrally** — not independently, differently, by every consumer.

Those three requirements point to exactly one shape: an ETL job that cleans and reshapes the
data once, and a warehouse that stores the result for fast, repeated querying.

## The plan, end to end

```
northfield_catalog.northfield_orders_raw   (existing, untyped, from the Beginner tier)
            │
            ▼
   Glue ETL job: northfield-orders-etl      (Lesson 3 — Spark, cleans + types + computes)
            │
            ▼
   s3://northfield-curated-zone/orders/     (Parquet, partitioned by dt)
            │  (also auto-registers northfield_catalog.northfield_orders_curated)
            ▼
   Redshift Serverless: northfield-analytics   (Lesson 4-5 — COPY loads the curated Parquet)
            │
            ▼
   analytics.fact_orders + three dimension tables   (Lesson 9-10 — Finance & Ops query this)
```

Two deliberate design choices worth calling out before you build any of it:

## Why a curated S3 zone, not raw straight into Redshift

The Glue ETL job doesn't write directly into Redshift. It writes cleaned, typed, deduplicated
Parquet into a second S3 location — the **curated zone** — and only then does a separate load
step (`COPY`, Lesson 5) bring that into Redshift. Three real reasons:

- **Parquet in S3 is reusable beyond Redshift.** Lesson 7 queries the curated data straight
  from S3 with Athena, through Redshift Spectrum, without touching the warehouse at all — that
  only works if the curated output exists independently in S3.
- **Re-running the load doesn't mean re-running the transform.** If a Redshift load ever needs
  to be re-run (as it will in Lessons 11-13), you re-run `COPY` against existing curated files
  instead of re-running the whole Spark job.
- **It matches how the Glue job bookmark works.** The job tracks which raw records it has
  already processed and only appends new ones — that incremental output belongs in S3 as a
  durable, columnar format, not pushed straight into a transactional load step.

## Why Redshift, and why Serverless specifically

Athena is still used in this chapter (Lesson 7, for occasional joins) — but Finance's *monthly,
repeated, multi-table* report is a different workload: the same joins, the same aggregations,
run over and over by more than one person. That's the workload a warehouse is built for:
columnar storage, distribution and sort keys tuned to the query pattern (Lesson 4), and
consistent sub-second performance for repeat queries instead of re-scanning files in S3 each
time.

Redshift **Serverless** specifically — a workgroup named `northfield-analytics` backed by a
namespace `northfield-dw`, database `northfielddw`, base capacity 8 RPUs — because Northfield's
query pattern is bursty: heavy around month-end close, quiet the rest of the time. Serverless
auto-pauses and bills per RPU-second, which fits that pattern far better than paying for an
always-on provisioned cluster sized for month-end load every day of the month.

## The warehouse shape, previewed

Lesson 4 builds this out in full, but the shape is a small star schema under an `analytics`
schema: one fact table (`fact_orders`) at the order-line grain, and three dimension tables
(`dim_product`, `dim_customer`, `dim_date`) carrying the descriptive attributes Finance and Ops
will filter and group by. Nothing more than those two stakeholders' real reports require.

## Key terms

| Term | Meaning |
|---|---|
| Curated zone | Cleaned, typed, deduplicated Parquet output of the ETL job, stored in S3 |
| Job bookmark | Glue's tracking of which source records a job has already processed |
| Redshift Serverless | A Redshift deployment that auto-scales and auto-pauses, billed per RPU-second |
| RPU | Redshift Processing Unit — the unit of compute capacity Serverless bills by the second |

## Lab

Sketch the pipeline diagram above from memory, labeling each arrow with what moves across it
(raw rows, cleaned Parquet files, a `COPY` load, a SQL query). You'll be able to check every
label against the real lessons that follow.

## Check yourself

You're ready for Lesson 3 when you can answer, without looking: why does the ETL job write to an
intermediate curated S3 zone instead of loading Redshift directly, and what does that choice
make possible in Lesson 7?
