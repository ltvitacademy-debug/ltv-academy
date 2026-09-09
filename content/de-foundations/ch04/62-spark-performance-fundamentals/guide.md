# Lesson 62 — Spark Performance Fundamentals

**Chapter 4 · PySpark · Lesson 62 of 62 — Course Finale**

## What you'll learn

- `.cache()` — avoiding recomputation of an expensive DataFrame
- `.repartition()` vs. `.coalesce()` — changing partition count deliberately
- Why a join can trigger an expensive shuffle, and what a broadcast join avoids
- A full recap: everything this course built, in one line each

## cache() — don't recompute the same thing twice

```python
cleaned = trips.filter(col("fare_amount") > 0).na.drop(subset=["passenger_count"])
cleaned.cache()

print(cleaned.count())                     # triggers the real computation, caches the result
print(cleaned.filter(col("trip_distance") > 10).count())   # reuses the cached data, doesn't recompute filter/drop
```

Remember Lesson 34: transformations are lazy, and every action
normally re-runs the whole plan from scratch. If you're going to run
several actions against the same cleaned DataFrame, `.cache()` keeps
the result in memory after the first action, so later actions skip
redoing that same work.

## repartition() vs. coalesce()

```python
trips.repartition(20)    # can increase OR decrease partition count; always shuffles data
trips.coalesce(4)        # can only decrease; avoids a full shuffle where possible
```

Both change how many partitions a DataFrame has — directly connected
to Lesson 33's partitions-as-parallel-work-units concept. `coalesce()`
is the cheaper choice specifically for reducing partition count (say,
before a final write, to avoid dozens of tiny output files);
`repartition()` is the only option if you actually need to increase
the count, or need an even redistribution.

## Shuffles — the expensive part of a join or groupBy

A **shuffle** is Spark physically moving data between worker nodes so
that rows sharing a key end up on the same machine — required
whenever a `join()` or `groupBy()` needs matching keys colocated.
This is real network and disk I/O across the cluster, and it's
usually the single most expensive part of a Spark job.

## Broadcast joins — avoiding the shuffle entirely

```python
from pyspark.sql.functions import broadcast

result = trips.join(broadcast(zones), trips.PULocationID == zones.LocationID, "left")
```

When one side of a join is small enough to fit comfortably in memory
(exactly Lesson 55's `zones` table — a few hundred rows), wrapping it
in `broadcast()` tells Spark to send a full copy to every worker
instead of shuffling the giant `trips` side across the cluster at
all. This is one of the single highest-leverage optimizations in
real PySpark work.

## This course, in one line each

1. **Azure Data Lake & Storage** — where data lives, and how it's organized.
2. **Python for Data Engineers** — the language every later tool is built on.
3. **Apache Spark Fundamentals** — why distributed computing exists, and how Spark does it.
4. **PySpark** — actually writing the transformations, from a DataFrame to a tuned, partitioned, cached pipeline.

## Key terms

| Term | Meaning |
|---|---|
| `.cache()` | Keeps a computed DataFrame in memory, avoiding recomputation |
| `.repartition()` / `.coalesce()` | Change partition count — increase/redistribute vs. only decrease, cheaply |
| Shuffle | Moving data between workers so matching keys are colocated — usually the costliest step |
| `broadcast()` | Sends a small table to every worker, avoiding a shuffle of the large side |

## Lab

```python
cleaned = trips.filter(col("fare_amount") > 0).cache()
print(cleaned.count())

small_lookup = broadcast(zones)
result = cleaned.join(small_lookup, cleaned.PULocationID == zones.LocationID, "left")
result.write.mode("overwrite").partitionBy("pickup_year", "pickup_month").parquet(
    "/data/nyc_taxi/final_output/"
)
```

This final lab genuinely combines almost every lesson in this
chapter — filtering, caching, broadcast joins, and partitioned
writes — into one real pipeline.

## Congratulations

You've completed **Data Engineering Foundations** — Azure storage,
Python, Spark's architecture, and real, hands-on PySpark, all
working against the real NYC Taxi dataset. Everything here is the
foundation the next courses in this track build directly on top of.

## Check yourself

Course complete when you can explain, without looking: why does
wrapping the small side of a join in `broadcast()` avoid a shuffle
of the large side entirely?
