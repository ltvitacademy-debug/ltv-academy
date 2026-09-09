# Lesson 61 — Partitioning Output

**Chapter 4 · PySpark · Lesson 61 of 62**

## What you'll learn

- `.partitionBy()` on a write — organizing output into real subfolders
- How this maps straight back to Lesson 9's storage partitioning
- Why a query that filters on the partition column gets dramatically faster
- Choosing a partition column that actually helps

## Writing with partitionBy()

```python
trips = trips.withColumn("pickup_year", year(col("tpep_pickup_datetime")))
trips = trips.withColumn("pickup_month", month(col("tpep_pickup_datetime")))

trips.write.mode("overwrite").partitionBy("pickup_year", "pickup_month").parquet(
    "/data/nyc_taxi/partitioned/"
)
```

This uses exactly the `pickup_year`/`pickup_month` columns built back
in Lesson 50 — this is the payoff that lesson was setting up.

## The folder structure this creates

```
/data/nyc_taxi/partitioned/
    pickup_year=2024/
        pickup_month=1/
            part-00000-....parquet
        pickup_month=2/
            part-00000-....parquet
    pickup_year=2023/
        pickup_month=12/
            part-00000-....parquet
```

This is the exact `key=value` directory convention Lesson 9 covered
back in Chapter 1's storage material — Spark's write-side
partitioning and a data lake's storage partitioning are the same
underlying idea, just arrived at from opposite ends of the pipeline.

## Why this makes filtered queries faster

```python
jan_2024 = spark.read.parquet("/data/nyc_taxi/partitioned/").filter(
    (col("pickup_year") == 2024) & (col("pickup_month") == 1)
)
```

This is called **partition pruning**: Spark can see from the folder
names alone which subfolders could possibly contain January 2024
data, and skips reading every other folder entirely — it never even
opens `pickup_year=2023/`'s files. Combined with Lesson 42's
columnar pruning (reading only needed columns), a well-partitioned,
well-filtered query can end up touching a tiny fraction of the total
data on disk.

## Choosing a partition column

A good partition column is one real queries commonly filter on, with
a reasonable number of distinct values — not too few (no benefit)
and not too many (thousands of tiny, inefficient files). Date parts
like year/month are the classic choice for time-series data exactly
like this taxi dataset; something with millions of unique values
(like a raw pickup timestamp to the second) would create far too
many tiny partitions to be useful.

## Key terms

| Term | Meaning |
|---|---|
| `.partitionBy()` (write) | Organizes output into `key=value` subfolders by column |
| Partition pruning | Skipping whole folders entirely based on a filter, before reading anything |
| Partition column choice | Should match real filter patterns, with a sensible number of distinct values |

## Lab

```python
trips.write.mode("overwrite").partitionBy("pickup_year", "pickup_month").parquet(
    "/data/nyc_taxi/partitioned_lab/"
)
result = spark.read.parquet("/data/nyc_taxi/partitioned_lab/").filter(col("pickup_month") == 1)
result.show(5)
```

Confirm the write creates real `pickup_year=.../pickup_month=.../`
subfolders, and that filtering by `pickup_month` reads only the
relevant ones.

## Check yourself

You're ready for Lesson 62 when you can explain, without looking: why
does filtering on a partition column let Spark skip reading entire
folders, rather than just filtering rows after reading everything?
