# Data Lake Zone & Partitioning Reference

A compiled quick-reference for the raw → staged → curated pattern and Hive-style
partitioning used throughout this course (Chapters 1, 3, and 4). Keep this next to you
while you're designing any new S3 table — the questions below are the ones that actually
determine whether a lake stays queryable and affordable six months from now.

## Zone layout

| Zone | Equivalent | What lives here | Format | Who can write to it |
|---|---|---|---|---|
| Raw | Bronze | Untouched source exports | Whatever the source sends (CSV, JSON) | Ingestion processes only |
| Staged | Silver | Cleaned, deduplicated, validated | Usually Parquet | ETL jobs only |
| Curated | Gold | Business-ready, modeled | Parquet | ETL jobs only; broadly readable by BI/warehouse |

```
s3://my-data-lake/
  raw/orders/year=2024/month=01/day=15/orders-20240115.csv
  staged/orders/year=2024/month=01/day=15/part-0001.parquet
  curated/orders/year=2024/month=01/day=15/part-0001.parquet
```

**Rule of thumb:** never delete or overwrite raw. If a source export turns out to be
malformed, raw is the only zone you can safely reprocess from without going back to the
source system.

## Hive-style partitioning cheat sheet

Encode the partition column and value directly into the key prefix as `column=value`:

```
year=2024/month=01/day=15/
```

Glue crawlers and Athena both recognize this pattern automatically and register `year`,
`month`, `day` as queryable columns — even though those values live only in the key, not
inside the files.

### Choosing a partition key

Ask, in order:

1. **What column do queries actually filter on?** If nobody filters on `region`,
   partitioning by `region` doesn't help pruning at all.
2. **What's the cardinality?** A column with only a handful of distinct values (like
   `region`) or one with far too many (like a raw `customer_id`) both make poor partition
   keys — too few partitions means no pruning benefit; too many means catalog bloat and
   planning overhead.
3. **How much data lands per partition?** Aim for each partition to hold at least tens to
   low hundreds of megabytes. A table receiving 200 rows/day partitioned down to the hour
   produces mostly-empty partitions — the catalog overhead outweighs the pruning benefit.

### Partition granularity guide

| Daily data volume | Reasonable partition grain |
|---|---|
| Tens of GB/day or more | `year/month/day/hour` |
| A few GB/day | `year/month/day` |
| A few hundred MB/day or less | `year/month` |
| Under ~50 MB/day | `year` — or reconsider partitioning at all |

### Registering partitions in Athena

- **`MSCK REPAIR TABLE table_name`** — scans S3 to discover and register partitions that
  exist as prefixes but aren't yet in the catalog. Simple, but slows down as partition
  count grows into the thousands.
- **Partition projection** — a table property that computes valid partition values from a
  defined range/pattern instead of scanning S3. Use this once a table's partition count
  gets large and the scheme is predictable (e.g., every day going forward).

## Minimal `CREATE EXTERNAL TABLE` template

```sql
CREATE EXTERNAL TABLE curated.orders (
  order_id         string,
  customer_id      string,
  order_total      double,
  product_category string,
  region           string
)
PARTITIONED BY (year string, month string, day string)
STORED AS PARQUET
LOCATION 's3://my-data-lake/curated/orders/';

-- after new partitions land:
MSCK REPAIR TABLE curated.orders;
```

## Related lessons

Chapter 1 (S3 Fundamentals through S3 as a Data Lake Foundation), Chapter 3 (Glue
Crawlers, the Glue Data Catalog), Chapter 4 (Athena Fundamentals, Partitioning for Athena
Performance).
