# Partitioning for Faster, Cheaper Queries

**Chapter 1 · Beginner Capstone: First Look at the Files · Lesson 8 of 10**

## What you'll learn

- What partitioning actually means for S3 + Athena, and why it's not just a folder structure
- How to reorganize `orders-raw/` into date partitions, and tell the crawler about it
- A real before/after comparison of data scanned — and what that means in dollars at scale

## The real cost of a flat prefix

Lesson 7's query worked fine — a few megabytes of CSV, scanned in under a second, for a
fraction of a cent. But think about what Athena actually did: to answer a question about
August 2026, it scanned **every byte in every one of the 31 files**, even though the
question only needed August's data anyway. That's invisible at this size. It stops being
invisible once `orders-raw/` holds a year of daily exports instead of one month — now
every query, even one asking about a single day, scans twelve months of data to answer it.

## What partitioning actually does

**Partitioning** organizes files into subfolders keyed on a column's value, so Athena can
skip entire folders it knows can't match the query — without ever opening those files.
The convention this course uses is `key=value` folder naming, the same pattern the
Advanced capstone's automated ingestion job will later adopt for its own nightly loads:

```
s3://northfield-raw-zone/orders-raw/
  dt=2026-08-01/orders_2026-08-01.csv
  dt=2026-08-02/orders_2026-08-02.csv
  ...
  dt=2026-08-31/orders_2026-08-31.csv
```

Reorganizing the existing flat files into this layout is a one-time `aws s3 mv` pass per
file (or a small script looping over all 31):

```
aws s3 mv \
  s3://northfield-raw-zone/orders-raw/orders_2026-08-01.csv \
  s3://northfield-raw-zone/orders-raw/dt=2026-08-01/orders_2026-08-01.csv
```

## Telling the Catalog about the new partitions

A partitioned layout only helps if the Glue Catalog knows the partitions exist. Re-running
the same crawler from Lesson 4 discovers them automatically:

```
aws glue start-crawler --name northfield-orders-raw-crawler
```

The crawler now registers `dt` as a **partition column** — a column that exists as part
of the folder structure, not inside the CSV files themselves — and `orders_raw` gains a
new partition for every `dt=` folder it finds.

## The query that proves the benefit

```sql
SELECT product_category, SUM(quantity) AS total_units
FROM northfield_raw_db.orders_raw
WHERE dt = '2026-08-15'
GROUP BY product_category;
```

Without partitioning, this `WHERE` clause is just a row filter — Athena still has to scan
every file to find rows matching `2026-08-15`. With partitioning, Athena uses **partition
pruning**: it reads the Catalog, sees which `dt=` folders could possibly match, and skips
every other folder entirely, without opening a single byte from them.

## Why this matters in real dollars, not just in this project

At a month's scale, partition pruning saves close to nothing — the whole dataset is a few
megabytes either way. But Athena bills per terabyte scanned, and the ratio holds at any
scale: a year of daily data, partitioned by date, means a single-day query scans roughly
1/365th of what an unpartitioned table would scan. On a dataset that's grown to
hundreds of gigabytes, that's the difference between a query that costs a few cents and
finishes in seconds, versus one that costs real money and makes someone wait. Learning
the pattern now, on data small enough that the cost difference doesn't matter, is exactly
how to have it ready once the cost difference does.

## Key terms

| Term | Meaning |
|---|---|
| Partition | A subset of a table's data, keyed by a column's value and stored in its own S3 prefix |
| Partition column | A column derived from the folder path (like `dt`), not stored inside the files |
| Partition pruning | Athena skipping whole partitions it knows can't match a query, without scanning them |

## Check yourself

Why does partitioning by date make almost no visible difference at this project's current
scale, but become critical once the raw zone grows to a year or more of daily files — and
what has to happen to the Glue Catalog after the files are physically reorganized?
