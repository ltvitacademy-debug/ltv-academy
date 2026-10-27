# Lesson 15 — Fixing and Re-Validating

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 15 of 16**

## What you'll learn

- Why the real fix has two separate parts: stop the recurrence, then repair the damage already done
- Rewriting the Glue ETL job to select columns by name, never by position
- Reconfiguring `northfield-raw-crawler` so a future schema change is handled correctly
- Deleting bad curated partitions, resetting the job bookmark, and reprocessing just the affected range

## Two parts, in order

Lesson 14 confirmed the cause: `northfield-raw-crawler` mapped a new `sales_channel` column
positionally instead of recognizing it as a real column inserted mid-row, so every row from
`2026-09-15` onward has had its `region` and later fields holding the wrong values. A real fix
here has to do two separate things, and the order matters: first stop this from being able to
happen again, then go back and repair the data that's already wrong. Fixing only the second part
without the first just sets up the same bug to recur the next time the upstream export changes.

## Part 1a: select columns by name, not position, in the ETL job

The deeper issue in `northfield-orders-etl` is that it was never explicit about which source
column means what — it trusted column order, which is exactly what broke when that order
changed. Rewrite the job's extract/transform step to select the expected columns by name:

```python
from awsglue.dynamicframe import DynamicFrame

raw_df = raw_dyf.toDF()

selected_df = raw_df.select(
    "order_id",
    "customer_id",
    "product_sku",
    "quantity",
    "unit_price",
    "order_date",
    "region",
    "dt",
)
# sales_channel is simply not selected here — it isn't part of the
# curated schema yet, and now it's excluded explicitly, not by accident
# of whatever position happened to follow order_date.

curated_dyf = DynamicFrame.fromDF(selected_df, glueContext, "curated_dyf")
```

`.select("order_id", "customer_id", ...)` resolves every one of those names against the actual
column headers in each file, regardless of where that column sits in the row. A file with
`sales_channel` inserted in the middle and a file without it now produce the identical set of
output columns, because the job is no longer relying on position at all. This is the real,
structural fix — the one that makes this specific failure mode impossible going forward, not just
this one instance of it.

## Part 1b: reconfigure the crawler to recognize headers, not just positions

`northfield-raw-crawler` needs the same correction. Open the crawler's configuration and set its
classifier to the native CSV classifier with **"Has headings"** recognition enabled, rather than
letting it infer columns purely by sampling file contents. With header-based matching turned on,
a future schema change — a column added, renamed, or reordered — gets picked up by name on the
next crawl instead of being silently misaligned across a mix of old- and new-layout files. Re-run
`northfield-raw-crawler` now and confirm, on the table's Schema tab, that `northfield_orders_raw`
correctly lists `sales_channel` as its own named column, in its real position, with the older
files' rows showing it as null.

## Part 2: backfill the damage already done

Fixing the job and the crawler stops new damage. It does nothing for the partitions already
written wrong between `2026-09-15` and today. That needs an explicit backfill:

```bash
# 1. Delete the bad curated partitions for the affected date range
aws s3 rm s3://northfield-curated-zone/orders/ --recursive \
  --exclude "*" --include "dt=2026-09-1[5-9]/*" --include "dt=2026-09-2*/*" --include "dt=2026-09-3*/*"

# 2. Reset the Glue job bookmark for just that range, so the next run
#    reprocesses those dates instead of skipping them as "already done"
aws glue reset-job-bookmark --job-name northfield-orders-etl

# 3. Re-run the ETL job against the corrected crawler schema
aws glue start-job-run --job-name northfield-orders-etl
```

`reset-job-bookmark` is necessary here specifically because Lesson 3's job has bookmarking
enabled — without the reset, the job would see those dates as already processed and skip them
entirely, leaving the deleted partitions empty instead of rewritten. After the job run completes,
re-run the Lesson 5 COPY statement to reload the corrected partitions into `analytics.fact_orders`
— the same COPY from Lesson 5 and Lesson 13, now loading corrected data instead of a fresh
failure.

## Re-validate against the actual raw data

Re-run the Lesson 9 Finance report query for the affected date range. Region values should now
read as real region names — `EAST`, `WEST`, `NORTH`, `SOUTH` — with sensible, non-zero revenue
totals, matching the shape of the "before" results from Lesson 14. As a final spot-check, compare
one specific `order_id` from the corrected report against that same row sampled directly out of
`after.csv` in Lesson 14, confirming the region and revenue now genuinely match what's in the raw
file, not just that the query runs without error.

## Key terms

| Term | Meaning |
|---|---|
| Named column selection | Referencing source columns by their header name, not their position in the row |
| Native CSV classifier (headers) | A Glue crawler setting that matches columns by name instead of inferring by position |
| Job bookmark reset | Forcing a Glue job to reprocess dates it would otherwise skip as already handled |
| Backfill | Reprocessing historical data after a fix, not just applying the fix going forward |

## Lab

Rewrite the ETL job's selection to reference columns by name, reconfigure and re-run the crawler
with header-based recognition, then delete the affected curated partitions, reset the bookmark,
rerun the job, and reload with COPY. Re-run the Finance report for the affected range and confirm
real region values and sensible totals.

## Check yourself

You're ready for Lesson 16 when you can answer, without looking: why does fixing the ETL job
alone not repair the already-wrong partitions, and why is `aws glue reset-job-bookmark` a
necessary step before re-running the job against historical dates?
