# Lesson 14 — A Second Bug: The Crawler Misreads a Schema Change

**Chapter 1 · Intermediate Capstone: A Repeatable Curated Dataset · Lesson 14 of 16**

## What you'll learn

- A bug that never throws an error anywhere in the pipeline
- Reproducing the symptom: comparing Finance's report before and after a cutover date
- Pulling raw files from S3 directly and spotting a schema change mid-row
- Reading a Glue table's schema history to confirm exactly what changed, and when

## The report Finance flagged

Weeks after Lesson 13's fix, Finance comes back with something different from a load failure —
something quieter. Their recurring revenue-by-region report (Lesson 9) looks wrong for recent
weeks. Some region values don't look like region names at all. Some rows show revenue totals
near zero that shouldn't be. Nothing failed. No error, no alert, nothing in
`sys_load_error_detail`. The nightly refresh has been running clean every single night. That's
the part worth sitting with before touching anything: **a pipeline can run perfectly and still
produce wrong data.** Not every bad-data problem announces itself.

## Reproduce first, same discipline as Lessons 11-12

Before guessing at a cause, confirm the symptom is real and bound it in time. Run the Lesson 9
Finance report query against two narrow date ranges — one well before `2026-09-15`, one from
`2026-09-15` onward — and look at the `region` column in each result set.

```sql
-- Before the cutover: region values look normal
SELECT region, SUM(order_total) AS revenue
FROM analytics.fact_orders f
JOIN analytics.dim_date d ON d.dt = f.dt
WHERE f.dt BETWEEN '2026-09-01' AND '2026-09-14'
GROUP BY region;

-- On/after the cutover: compare the same query
SELECT region, SUM(order_total) AS revenue
FROM analytics.fact_orders f
JOIN analytics.dim_date d ON d.dt = f.dt
WHERE f.dt >= '2026-09-15'
GROUP BY region;
```

The first query returns clean values: `EAST`, `WEST`, `NORTH`, `SOUTH`, with sensible revenue
numbers. The second returns garbled `region` values that look like dates (e.g. `2026-09-18`) for
some rows, and near-zero `order_total` for others. The symptom is real, and it has a sharp
boundary at `2026-09-15` — not a gradual drift. A sharp boundary like that is a strong hint: look
for something that changed on that exact date, not something that degraded slowly.

## Pull two raw files directly from S3

Go to the raw zone and pull one file from before the cutover and one from after:

```bash
aws s3 cp s3://northfield-raw-zone/orders/dt=2026-09-10/orders.csv ./before.csv
aws s3 cp s3://northfield-raw-zone/orders/dt=2026-09-18/orders.csv ./after.csv
head -3 before.csv
head -3 after.csv
```

`before.csv`'s header reads:

```
order_id,customer_id,product_sku,quantity,unit_price,order_date,region
```

`after.csv`'s header reads:

```
order_id,customer_id,product_sku,quantity,unit_price,order_date,sales_channel,region
```

There it is. Northfield's on-prem order-export process started writing a new `sales_channel`
column (values like `web`, `store`, `phone`) starting `2026-09-15` — and it inserted that column
in the *middle* of the row, right after `order_date`, instead of appending it at the end. Every
column after `order_date` shifted over by one position in every file from that date forward.

## Check the Glue table's schema history

`northfield-raw-crawler` is on-demand only — it was never added to the Lesson 8 nightly schedule,
only the ETL job was. At some point after the CSV layout changed, someone manually re-ran the
crawler against the raw prefix. Because it samples across a mix of old-layout and new-layout
files, it misread the shift. Confirm this in the Glue console, on the table's **Schema** tab
(or equivalently `aws glue get-table --database-name northfield_catalog --name
northfield_orders_raw`): the column list and column count differ between the crawler run that
produced the current schema version and the one before it. Instead of correctly inserting
`sales_channel` as a new column in its real position, the crawler ended up mapping values
positionally for the post-change files — so for every row from `2026-09-15` onward, the column
the table calls `region` is actually holding whatever value sits in that position in the new
layout, which is `order_date`'s shifted neighbor, not the real region column.

## Where this leaves things

Nothing in the Glue job, the COPY, or the schedule is throwing an error, because nothing about
this is malformed data from any single tool's point of view — Spark reads whatever column Glue's
catalog tells it is `region`, Redshift loads whatever value Spark puts there, and the pipeline
completes successfully every night. The bug is entirely in what the table *believes* each column
means, not in any one step's execution. That's confirmed now — the exact cause, the exact cutover
date, and the exact mechanism. The fix comes next, in Lesson 15.

## Key terms

| Term | Meaning |
|---|---|
| Silent data-quality bug | A pipeline that runs without errors but produces incorrect output |
| Mid-row schema change | A new column inserted between existing columns, shifting every later column's position |
| Positional column mapping | Reading a column by its position in a row instead of by its header name |
| Schema version history | A Glue table's record of how its column list changed across crawler runs |

## Lab

Run the before/after Finance report query pair against the real cutover date, pull a raw file
from before and after it, and confirm by eye that `sales_channel` sits mid-row in the newer file.
Check the Glue table's schema history and write down, in your own words, exactly which column is
now holding which value for dates on or after the cutover.

## Check yourself

You're ready for Lesson 15 when you can answer, without looking: why does this bug never surface
as an error anywhere in the pipeline, and why did inserting `sales_channel` in the *middle* of the
row cause more damage than appending it at the end would have?
