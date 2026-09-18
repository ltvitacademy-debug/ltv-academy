# Lesson 33 — Capstone: An Advanced Lakehouse Pipeline

**Chapter 7 · DP-750 Prep & Capstone · Lesson 33 of 34**

## What you'll learn

- The capstone's requirements: one pipeline that uses every major
  piece of this course, not a toy example of just one feature
- How to structure Unity Catalog for the project before writing any
  ingestion code
- The build order: Unity Catalog structure, Auto Loader ingestion, a
  Lakeflow declarative pipeline, then a multi-task Job to orchestrate
  it, with performance and security applied throughout

## The requirements, as given

A retailer streams order events continuously from its e-commerce
platform and receives a daily product-catalog export as a batch of
JSON files. Leadership wants one governed lakehouse that ingests
both, transforms them into a clean, query-ready gold layer, refreshes
on a schedule, and is provably secure enough for an auditor to sign
off on.

```
Functional:
  - Ingest streaming order events continuously
  - Ingest a daily batch product-catalog export
  - Produce a query-ready gold layer joining orders to products
  - Refresh on an automated schedule, not by hand

Non-functional:
  - Every object is Unity Catalog-governed — no ungoverned tables
  - PII (customer email) is masked from general analysts
  - The pipeline must recover from a bad batch without manual intervention
  - Performance must hold up as order volume grows
```

This is deliberately the shape of a real Databricks project, not a
single-feature demo — it forces every chapter's material to work
together, the same way Lesson 32's scenarios each isolated one
feature but a real system never does.

## Step 1 — Unity Catalog structure (Chapter 1)

Before any ingestion code, the governance shape gets decided:

```
Catalog: retail_prod
├── Schema: bronze   (raw landed data, minimally processed)
├── Schema: silver    (cleaned, deduplicated, conformed)
├── Schema: gold      (business-ready, joined, aggregated)
└── Volume: raw_landing  (the daily catalog JSON export lands here)
```

Managed tables for bronze/silver/gold — this project doesn't need
external tables since nothing here requires pointing at
pre-existing files outside Databricks's control (Chapter 1, Lesson
3's managed-vs-external decision). The volume exists specifically
for the batch file drop the daily export needs, per Chapter 1,
Lesson 4.

## Step 2 — Auto Loader ingestion (Chapter 2)

Two different ingestion problems need two different Auto Loader
configurations:

```
Order events (streaming):
  Auto Loader + Structured Streaming, directory listing is fine —
  volume doesn't yet justify file notification mode's setup cost

Product catalog (daily batch):
  Auto Loader in trigger-once/batch mode against the raw_landing
  volume, with schema inference allowing new optional columns
  without breaking the load (schema evolution, Chapter 2, Lesson 8)
```

The order-events volume is the detail worth calling out: file
notification mode (Lesson 9) is the right call at true high-file-count
scale, but starting with directory listing and upgrading later if
volume justifies it is the more honest engineering call than
over-building on day one.

## Step 3 — The Lakeflow pipeline (Chapter 3)

A declarative pipeline expresses bronze → silver → gold, with data
quality enforced inline instead of bolted on afterward:

```
@dlt.table(name="orders_silver")
@dlt.expect_or_drop("valid_total", "order_total > 0")
@dlt.expect("has_customer", "customer_id IS NOT NULL")
def orders_silver():
    return dlt.read_stream("orders_bronze").select(...)

@dlt.table(name="orders_gold")
def orders_gold():
    return (
        dlt.read("orders_silver")
        .join(dlt.read("products_silver"), "product_id")
        .groupBy("product_id", "order_date")
        .agg(...)
    )
```

`valid_total` uses `expect_or_drop` — a bad total shouldn't halt the
whole pipeline, echoing Scenario 3 from Lesson 32 exactly.
`has_customer` uses a plain `expect` so violations are tracked in
pipeline metrics without dropping the row outright, since a missing
customer ID might still be recoverable data worth keeping for
review.

## Step 4 — Orchestration (Chapter 4)

A single multi-task Job ties the pieces together:

```
Task 1: ingest_catalog_batch   (Auto Loader, daily trigger)
Task 2: run_lakeflow_pipeline  (depends on Task 1)
Task 3: refresh_gold_metrics   (depends on Task 2)
Task 4: notify_on_failure      (runs only if any task above fails)
```

The streaming order-events ingestion runs continuously as its own
job, separate from this daily batch chain — mixing a continuous
stream and a scheduled batch chain into one job would make the
schedule meaningless for the streaming half.

## Step 5 — Performance and security, applied throughout

- **Performance** (Chapter 5): the gold-layer join is a natural AQE
  candidate if the product catalog stays small — broadcast join
  territory. `OPTIMIZE` with liquid clustering on `order_date` keeps
  the gold table's time-range queries fast as it grows.
- **Security** (Chapter 6): a column mask hides `customer_email` from
  the `analysts` group but not the `fraud_review` group; the Job's
  service principal authenticates via a managed identity rather than
  a stored personal token; audit logging is enabled on the catalog so
  every access is traceable — exactly what "provably secure enough
  for an auditor" requires.

## What this proves

Nothing in this capstone is a new concept — every piece was taught in
Chapters 1 through 6. What's new is making them work together on one
system where a decision in Step 1 (managed tables, no external
tables) shapes what's possible in Step 3, and a constraint in the
requirements (auditable security) reaches all the way back into how
Step 1's catalog was structured. That's the actual shape of the job
this course is preparing you for.

## Check yourself

You're ready for Lesson 34 when you can explain, without looking: why
does the streaming order-events ingestion run as a separate job from
the daily batch-orchestration chain, rather than as one more task in
the same Job?
