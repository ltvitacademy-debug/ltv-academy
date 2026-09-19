# Partitioning for Athena Performance

Lesson 18 established that Athena bills by bytes scanned. Partitioning is the single
highest-leverage technique for reducing that number, because it lets Athena skip entire
sections of S3 it doesn't need to touch for a given query — a technique called **partition
pruning**. This lesson covers how partitions actually work at the S3 level, and the two
ways Athena finds out what partitions exist.

## What you'll learn

- What partition pruning is and why it reduces bytes scanned
- How S3 key layout becomes partition structure
- `MSCK REPAIR TABLE` versus partition projection
- Choosing a partition key that actually matches query patterns

## Partition pruning

A partitioned table's data is physically split across S3 sub-prefixes by a key value — most
commonly a date, but any low-cardinality, frequently-filtered column works. When a query's
`WHERE` clause filters on the partition key, Athena can determine which sub-prefixes are
even relevant *before* scanning any data, and skip the rest entirely. Filter `WHERE year =
'2024' AND month = '01'` against a table partitioned by year and month, and Athena only
reads the S3 objects under that specific `year=2024/month=01/` prefix — not the entire
table's history. That skipped data is bytes never scanned, and bytes never scanned is
money never billed.

## S3 key layout as partition structure

The standard layout for a Hive-style partitioned table uses `key=value` pairs directly in
the S3 prefix:

```
s3://my-data-lake/raw/orders/year=2024/month=01/day=15/part-0001.parquet
s3://my-data-lake/raw/orders/year=2024/month=01/day=16/part-0001.parquet
s3://my-data-lake/raw/orders/year=2024/month=02/day=01/part-0001.parquet
```

Athena (and Glue crawlers, which is how this connects back to Chapter 3) recognize this
`year=.../month=.../day=...` pattern and map each distinct combination to a partition. This
is the same "keys, not real folders" model Lesson 1 introduced for S3 in general —
partitioning is that same prefix convention, applied deliberately.

## MSCK REPAIR TABLE vs. partition projection

Athena needs to know which partition values actually exist before it can prune on them.
There are two ways to give it that information:

- **`MSCK REPAIR TABLE table_name`** scans S3 to discover partitions that exist as
  prefixes but aren't yet registered in the Catalog, and adds them. It works, but it's an
  actual scan of the bucket's key structure, which gets slower as the number of partitions
  grows into the thousands.
- **Partition projection** is a table property that tells Athena to *compute* valid
  partition values from a defined range and pattern (e.g., "years 2020 through 2026,
  months 01 through 12") instead of scanning S3 to discover them. For a table with a
  predictable, well-known partition scheme, projection avoids the discovery scan entirely
  and scales to far more partitions without a performance cliff.

## Choosing a partition key

The right partition key is whatever columns queries actually filter on most often — usually
some form of date for time-series data. A partition key nobody filters on doesn't help
pruning at all, and a key with too many distinct values (like a raw customer ID) can create
an excessive number of tiny partitions, which brings its own overhead. Matching the
partition scheme to real query patterns, not just what feels like a natural grouping, is
the actual design skill here.

## Key terms

| Term | Meaning |
|---|---|
| Partition pruning | Skipping S3 sub-prefixes that don't match a query's filter before scanning |
| Hive-style partitioning | `key=value` prefix convention Athena/Glue recognize automatically |
| MSCK REPAIR TABLE | Command that scans S3 to discover and register existing partitions |
| Partition projection | Computing valid partition values from a defined pattern, no scan needed |

## Check yourself

A table partitioned by `year`/`month`/`day` gets a query with no filter on any of those
columns at all — just a filter on `customer_id`. Does partition pruning help this query?
Why or why not?
