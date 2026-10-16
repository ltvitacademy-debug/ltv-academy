# PySpark Join, Window, and Partitioned-Write Starter Script

A reusable skeleton combining Chapter 4's join (Lesson 55), window
function (Lesson 57), write (Lesson 60), partitioned write (Lesson 61),
and performance (Lesson 62) patterns into one pipeline shape — the same
structure this course's Worked Examples 3 and 4 build on. Copy this,
swap in your own partition/order-by columns and aggregation, and reuse
the broadcast-join and cache decisions as-is for any similarly-sized
lookup table.

```python
from pyspark.sql import SparkSession
from pyspark.sql.window import Window
from pyspark.sql.functions import col, row_number, year, month, avg, broadcast

spark = SparkSession.builder.appName("pipeline-starter").getOrCreate()

# 1. Read + cache the large side once, filtered down to what you'll actually use
trips = spark.read.parquet("/data/nyc_taxi/cleansed/yellow_tripdata_2024-01.parquet")
trips = trips.filter(col("fare_amount") > 0).na.drop(subset=["passenger_count"])
trips.cache()

# 2. Deduplicate properly with a window, instead of dropDuplicates()
dedup_window = Window.partitionBy("VendorID", "tpep_pickup_datetime").orderBy(
    col("fare_amount").desc()
)
trips = trips.withColumn("rn", row_number().over(dedup_window))
trips = trips.filter(col("rn") == 1).drop("rn")

# 3. Join to the small lookup table with broadcast() to avoid shuffling the large side
zones = spark.read.csv("/data/nyc_taxi/taxi_zone_lookup.csv", header=True)
joined = trips.join(broadcast(zones), trips.PULocationID == zones.LocationID, "left")

# 4. Aggregate into the curated/gold shape
joined = joined.withColumn("pickup_year", year(col("tpep_pickup_datetime")))
joined = joined.withColumn("pickup_month", month(col("tpep_pickup_datetime")))

gold = joined.groupBy("pickup_year", "pickup_month", "Borough").agg(
    avg("fare_amount").alias("avg_fare")
)

# 5. Write, partitioned to match how the dashboard will filter
gold.coalesce(4).write.mode("overwrite").partitionBy(
    "pickup_year", "pickup_month"
).parquet("/data/nyc_taxi/curated/daily_revenue_by_borough/")
```

## Decisions baked into this script, and why

- **`.cache()` on `trips` before the dedup step** — every action downstream (the dedup count, the join, the final aggregate) reuses the same filtered DataFrame instead of recomputing the filter from scratch each time.
- **A window function, not `dropDuplicates()`, for dedup** — `dropDuplicates()` keeps an arbitrary row on a tie; the window's `orderBy()` makes the tie-break rule explicit and auditable.
- **`broadcast(zones)` on the join** — `zones` is a small lookup table (a few hundred rows); broadcasting it to every worker avoids shuffling the much larger `trips` table across the cluster.
- **`.coalesce(4)` right before the write, not `.repartition()`** — coalesce only reduces partition count and avoids a full shuffle; use it to avoid dozens of tiny output files per partition when you're about to write, not to increase partition count.
- **`partitionBy("pickup_year", "pickup_month")`** matches the exact columns a dashboard would filter on — a query for one month reads only that subfolder instead of the whole table.
