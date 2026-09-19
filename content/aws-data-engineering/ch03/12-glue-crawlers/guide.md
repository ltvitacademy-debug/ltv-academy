# Glue Crawlers

A Glue crawler is the piece that answers "what's actually in this S3 prefix, and what
shape is it?" without a human writing a `CREATE TABLE` statement by hand. Point it at
data, run it, and it writes a table definition into the Data Catalog for you. This lesson
covers how that inference actually works, and the scheduling model that keeps it current.

## What you'll learn

- How a crawler infers schema from raw files in S3
- What classifiers are and how they detect format
- How a crawler creates and updates Data Catalog tables
- The scheduling options for keeping a catalog current as new data lands

## How schema inference works

Point a crawler at an S3 path (or a JDBC connection), and it samples the objects it finds
there — reading a subset of files, not necessarily every object — to determine column
names, data types, and file format. For a folder of Parquet files this is straightforward,
since Parquet embeds its own schema. For CSV or JSON, the crawler has to infer types from
the actual values it sees (is this column all integers? does it ever contain a decimal
point?). The crawler also detects the file format itself: Parquet, ORC, CSV, JSON, Avro,
and a handful of others are all recognized automatically.

If the objects under a prefix share a consistent structure, the crawler creates a single
table. If it finds multiple distinct schemas under the same prefix, it may create separate
tables — which is one reason a clean, deliberate S3 key layout (Lesson 4 back in Chapter 1)
matters before you ever run a crawler against it.

## Classifiers: how format gets detected

The logic that recognizes "this is CSV" or "this is JSON" is called a **classifier**.
Glue ships built-in classifiers for the common formats, and each one runs against a sample
of the data with a confidence score. You can also write a **custom classifier** — for
example, a grok pattern for a proprietary log format — when the built-in ones can't
recognize your data. Classifiers only determine format and help infer schema; they don't
touch the underlying files.

## Populating and updating the Data Catalog

When a crawler runs, it writes (or updates) table entries in a specified Data Catalog
database: table name, column list with types, file location, and format. Run it again
after new files land, and it can **detect schema changes** — a new column added upstream,
for instance — and update the existing table definition rather than creating a duplicate.
It also detects new partitions (Lesson 21 covers partitioning with Athena in depth) so that
newly landed date-partitioned data becomes visible without a manual catalog edit.

## Scheduling a crawler

A crawler can run **on demand** (triggered manually or by another process), **on a
schedule** (a cron-like expression, e.g. hourly or nightly), or as part of a **Glue
workflow** chained after an upstream job (Lesson 17 covers workflows). The right choice
depends on how often new data lands: a crawler scheduled far more often than data actually
arrives just burns DPU-hours for no new metadata, while one scheduled too rarely leaves
newly landed data unqueryable until it next runs.

## Key terms

| Term | Meaning |
|---|---|
| Crawler | Component that scans a data source and writes/updates Data Catalog table metadata |
| Classifier | Logic that detects a data format (built-in or custom) and helps infer schema |
| Schema inference | Determining column names/types from sampled data rather than a manual definition |
| Partition detection | A crawler recognizing new partition values (e.g. a new date folder) automatically |

## Check yourself

You add a new column to the source system, and new files landing in S3 now include it, but
older files in the same prefix don't have that column. What happens the next time the
crawler runs against that prefix, and why does the original S3 key layout matter here?
