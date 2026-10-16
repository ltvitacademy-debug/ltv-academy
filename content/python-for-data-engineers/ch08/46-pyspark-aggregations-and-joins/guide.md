# Lesson 46 — PySpark Aggregations & Joins

**Chapter 8 · PySpark Foundations and Mini Capstone · Lesson 46 of 48**

## What you'll learn

- `groupBy().agg()` — real aggregations over the taxi dataset
- Multiple aggregations at once, with clean column names via `alias()`
- Joining trips to the zone lookup table so location IDs become real place names
- Choosing the right join type for this dataset

## groupBy() and agg()

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, avg, count, round as spark_round

spark = SparkSession.builder.appName("TaxiAggregations").getOrCreate()

trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")

by_vendor = (
    trips.groupBy("VendorID")
    .agg(
        count("*").alias("trip_count"),
        spark_round(avg("fare_amount"), 2).alias("avg_fare"),
        spark_round(avg("trip_distance"), 2).alias("avg_distance"),
    )
)

by_vendor.show()
```

```
+--------+-----------+--------+------------+
|VendorID|trip_count |avg_fare|avg_distance|
+--------+-----------+--------+------------+
|1       |1245892    |13.42   |3.18        |
|2       |1876301    |14.07   |3.41        |
+--------+-----------+--------+------------+
```

This is pandas' `groupby().agg()` from Lesson 24, at a scale pandas
alone would struggle with — the same real question ("what's the
average fare and distance for each vendor") over a dataset with
millions of real trip records. `alias()` matters here specifically
because without it, Spark would name the aggregated columns something
like `avg(fare_amount)`, which is awkward to reference in later steps.

## Multiple grouping columns

```python
by_vendor_and_passengers = (
    trips.filter(col("passenger_count") > 0)
    .groupBy("VendorID", "passenger_count")
    .agg(count("*").alias("trip_count"), spark_round(avg("fare_amount"), 2).alias("avg_fare"))
    .orderBy("VendorID", "passenger_count")
)

by_vendor_and_passengers.show(10)
```

Grouping by more than one column works exactly like Lesson 24's
pandas version — each unique combination of `VendorID` and
`passenger_count` becomes its own group. `orderBy()` here is the sort
step, applied after the aggregation so the result reads top to
bottom in a sensible order.

## Joining trips to the real zone lookup table

```python
zones = spark.read.csv("/data/nyc_taxi/taxi_zone_lookup.csv", header=True, inferSchema=True)

trips_with_zones = trips.join(
    zones, trips.PULocationID == zones.LocationID, "left"
).select(
    trips.VendorID, trips.fare_amount, trips.trip_distance,
    zones.Zone.alias("pickup_zone"), zones.Borough.alias("pickup_borough"),
)

trips_with_zones.show(5)
```

A raw trip record only has a numeric `PULocationID` — not useful for
reading a report. Joining to `taxi_zone_lookup.csv` turns that ID
into a real `Zone` and `Borough` name, exactly the way Lesson 55's
join pattern works, here applied specifically to the pickup location.
`"left"` keeps every trip even if (rarely) its location ID has no
matching row in the lookup table.

## A real aggregation after the join: average fare by zone

```python
fare_by_zone = (
    trips_with_zones
    .filter(col("fare_amount") > 0)
    .groupBy("pickup_zone", "pickup_borough")
    .agg(
        count("*").alias("trip_count"),
        spark_round(avg("fare_amount"), 2).alias("avg_fare"),
    )
    .orderBy(col("avg_fare").desc())
)

fare_by_zone.show(10)
```

This chains together everything the chapter has built so far: join
first to get readable zone names, filter out bad fares, then
aggregate — which is also exactly the shape of the mini capstone's
pipeline in the next two lessons.

## Key terms

| Term | Meaning |
|---|---|
| `groupBy().agg()` | Groups rows and computes one or more aggregations per group |
| `alias()` | Renames a computed column to something clean and readable |
| Join on location ID | Turns a numeric `PULocationID`/`DOLocationID` into a real zone name |
| `orderBy()` | Sorts the final result, typically applied after aggregating |

## Lab

```python
trips_per_hour = (
    trips
    .withColumn("pickup_hour", col("tpep_pickup_datetime").substr(12, 2))
    .groupBy("pickup_hour")
    .agg(count("*").alias("trip_count"))
    .orderBy("pickup_hour")
)

trips_per_hour.show(24)
```

Confirm you get one row per hour of the day (00 through 23), and that
the trip counts form a believable daily pattern (lower overnight,
higher during commute hours).

## Check yourself

You're ready for Lesson 47 when you can explain, without looking: why
join the trips DataFrame to the zone lookup table *before* grouping by
zone name, rather than after?
