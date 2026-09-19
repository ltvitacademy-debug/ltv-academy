# Partitioning Strategy in S3

S3 has no real directories, but Athena, Glue, and Redshift Spectrum still need a way to skip
scanning data that can't possibly match a query. The mechanism is **partitioning** — a
naming convention applied to key prefixes that lets query engines figure out which objects
to read without opening a single one of them. Get this wrong and every query pays for it,
in both dollars and seconds.

## What you'll learn

- Hive-style partitioning: the `key=value` prefix convention
- Why partition pruning is the difference between scanning a folder and scanning a lake
- How partition granularity trades off against metadata overhead
- How this connects to Athena's per-TB-scanned pricing (covered fully in Chapter 4)

## Hive-style partitioning

**Hive-style partitioning** encodes the partition column and its value directly into the
key prefix, as `column=value`:

```
s3://my-data-lake/curated/orders/
  year=2024/month=01/day=15/part-0001.parquet
  year=2024/month=01/day=16/part-0001.parquet
  year=2024/month=02/day=01/part-0001.parquet
```

Glue crawlers and Athena both recognize this pattern automatically: when they see
`year=2024/month=01/day=15/`, they register `year`, `month`, and `day` as columns in the
Glue Data Catalog, even though those values only ever appear in the object keys, not inside
the files themselves. A query like `WHERE year = 2024 AND month = 1` can then be answered by
listing only the matching prefixes — the engine never opens objects outside that range.

## Why partition pruning matters

**Partition pruning** is what happens when a query engine uses the partition structure to
skip data instead of scanning it. Without partitioning, a query against a year of daily data
has to read every object in the table to find the rows it needs. With partitioning on
`year/month/day`, a query for one day's data only touches that one day's objects — a
difference that can be 100x or more in data scanned. For Athena specifically, this isn't
just about speed: Athena bills per TB scanned, so an unpruned query directly costs more
money, not just more time. Redshift Spectrum and Glue ETL jobs benefit the same way.

## Choosing partition granularity

More partitions aren't automatically better. Each partition is metadata the Glue Catalog has
to track, and query planners spend time resolving which partitions match a query before they
even start reading data. Partition by `year/month/day/hour` on a dataset that only gets a
few hundred rows a day, and you end up with a huge number of tiny objects and a catalog
bloated with mostly-empty partitions — planning overhead can outweigh the pruning benefit.
The general rule: partition at the granularity your queries actually filter on, and aim for
partitions holding at least tens to low hundreds of megabytes each, not a scattering of
kilobyte-sized files.

## Key terms

| Term | Meaning |
|---|---|
| Hive-style partitioning | `column=value` naming convention in key prefixes |
| Partition pruning | Skipping non-matching partitions instead of scanning them |
| Partition granularity | How fine-grained partition columns are (year vs. year/month/day/hour) |
| Glue Data Catalog | Where partition columns get registered as table metadata |

## Check yourself

A table is partitioned by `year=2024/month=01/day=15/hour=03/` but only receives about 200
rows per day total. What's the practical downside of this partitioning scheme, even though
it's technically correct Hive-style partitioning?
