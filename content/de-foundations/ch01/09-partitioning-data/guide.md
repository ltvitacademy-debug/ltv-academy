# Lesson 9 — Partitioning Data

**Chapter 1 · Azure Data Lake & Storage · Lesson 9 of 62**

## What you'll learn

- What partitioning means at the **storage** level — organizing files
  into directories by column value
- **Partition pruning** — how a query skips entire directories without
  reading them
- The standard Hive-style partition naming convention
- An important distinction: this is *not* the same thing as a "Spark
  partition" (Lesson 33) — same word, two different concepts

## Partitioning: directories that match your queries

Lesson 3 covered directories as real objects in ADLS Gen2. **Partitioning**
means deliberately organizing your directory structure so it mirrors a
column you filter on often — for this course's NYC Taxi data, that's
almost always the pickup date:

```text
taxi-data/
  year=2024/
    month=01/
      day=01/
        part-0000.parquet
      day=02/
        part-0000.parquet
    month=02/
      day=01/
        part-0000.parquet
```

That `year=2024/month=01/day=01/` naming — a key, an equals sign, a
value — is the standard **Hive-style partitioning** convention. It's not
Azure-specific or Spark-specific; it's a widely recognized pattern that
Spark, Databricks, Synapse, and most other big-data tools all understand
automatically.

## Partition pruning: skipping entire directories

Here's why this matters. A query filtering on `year = 2024 AND month =
1` doesn't need to touch `month=02/` or `month=03/` **at all** — the
query engine can see those directories don't match and skip them
entirely, without opening a single file inside them:

```text
-- This query only reads files under year=2024/month=01/
SELECT * FROM taxi_data
WHERE year = 2024 AND month = 1;
```

This is **partition pruning**, and it operates one level above Lesson
8's column pruning and predicate pushdown: those skip *parts of a file*;
partition pruning skips *entire files, and entire directories of files*,
before a single one is even opened.

## An important word collision

This course will also cover "Spark partitions" starting in Lesson 33 —
and the same word means something genuinely different there. To keep
them straight:

| | This lesson (storage partitioning) | Lesson 33 (Spark partitions) |
|---|---|---|
| What it is | A directory structure on disk | A unit of in-memory parallelism while Spark processes data |
| Controlled by | How you organize files when writing them | How Spark splits data across its executors |
| Purpose | Let queries skip whole directories entirely | Let Spark process different chunks of data in parallel |

Same word, two layers of the stack. Lesson 61 ("Partitioning Output")
comes back to the storage kind directly; Lesson 33 introduces the
in-memory kind properly.

## Choosing partition columns well

Partition on columns you actually **filter on often**, with a
**manageable number of distinct values** — date fields (year/month/day)
are the classic choice for exactly this reason. Partitioning on something
with millions of distinct values (like a raw timestamp, or a customer
ID) creates millions of tiny directories instead of a few, useful,
prunable ones — a mistake called **over-partitioning**, which this
course revisits in Chapter 4's PySpark lessons.

## Key terms

| Term | Meaning |
|---|---|
| Partitioning | Organizing files into directories by column value |
| Hive-style partitioning | The `key=value` directory naming convention |
| Partition pruning | Skipping entire directories a query's filter can't match |
| Over-partitioning | Partitioning on a column with too many distinct values, creating too many tiny directories |

## Lab

No Azure account needed — design on paper:

Given NYC Taxi trip data with a `pickup_datetime` column, sketch the
Hive-style directory structure you'd use to partition it by year and
month, and write the `WHERE` clause that would let a query prune down to
exactly one month's worth of files.

## Check yourself

You're ready for Lesson 10 when you can explain, without looking: what's
the difference between partition pruning and column pruning, and why is
partitioning on a raw timestamp usually a mistake?
