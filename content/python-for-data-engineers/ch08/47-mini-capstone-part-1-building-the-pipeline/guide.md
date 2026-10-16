# Lesson 47 — Mini Capstone Part 1: Building the Pipeline

**Chapter 8 · PySpark Foundations and Mini Capstone · Lesson 47 of 48**

## What you'll learn

- Pulling together everything from Chapters 6-8 into one real, complete pipeline
- Defining a clear goal before writing a line of PySpark
- Extract → clean/filter → transform → aggregate → load, against the real NYC Taxi dataset
- Structuring the pipeline as small, testable functions instead of one long script

## The goal: state it before writing any code

This capstone's question is deliberately simple to state and genuinely
useful to answer: **"Which pickup zones have the highest average fare,
and how many trips come from each one?"** A real data engineering task
rarely starts with "write some PySpark" — it starts with a business
question, and the pipeline exists to answer it. Writing the goal down
first also gives you a way to check, at the end, whether the pipeline
actually did its job.

## Extract: reading the real source files

```python
from pyspark.sql import SparkSession
from pyspark.sql.functions import col, count, avg, round as spark_round
import logging

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

spark = SparkSession.builder.appName("TaxiFareCapstone").getOrCreate()

def extract():
    logger.info("Extracting trips and zone lookup")
    trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")
    zones = spark.read.csv("/data/nyc_taxi/taxi_zone_lookup.csv", header=True, inferSchema=True)
    logger.info("Extracted %d trip rows, %d zone rows", trips.count(), zones.count())
    return trips, zones
```

Wrapping extraction in its own function, with logging around it, is
Lesson 39's pattern applied here — when this runs unattended later,
the log tells you exactly how many rows came in, which is the first
thing you'd check if the final numbers ever look wrong.

## Clean and filter: removing bad records before trusting anything

```python
def clean(trips):
    logger.info("Cleaning trip data")
    before = trips.count()

    cleaned = (
        trips
        .filter(col("fare_amount") > 0)
        .filter(col("trip_distance") > 0)
        .filter(col("PULocationID").isNotNull())
        .na.drop(subset=["passenger_count"])
    )

    after = cleaned.count()
    logger.info("Dropped %d invalid/incomplete rows (%d -> %d)", before - after, before, after)
    return cleaned
```

Real trip records include fares of $0 or less (refunds, void trips),
distances of 0, and occasional missing fields — none of which should
feed into an "average fare" calculation, since they'd quietly drag it
toward meaningless numbers. Logging the before/after count is the
Chapter 7 habit of making every step's effect visible, not just
trusting it silently worked.

## Transform: joining to get real zone names

```python
def transform(trips, zones):
    logger.info("Joining trips to pickup zone")
    joined = trips.join(
        zones, trips.PULocationID == zones.LocationID, "left"
    ).select(
        trips.VendorID,
        trips.fare_amount,
        trips.trip_distance,
        zones.Zone.alias("pickup_zone"),
        zones.Borough.alias("pickup_borough"),
    )
    unmatched = joined.filter(col("pickup_zone").isNull()).count()
    if unmatched > 0:
        logger.warning("%d trips have no matching pickup zone", unmatched)
    return joined
```

This is Lesson 46's join, now with a real validation check built in:
if any trips come back with no matching zone, that's logged as a
warning instead of silently passing through unnoticed — exactly the
kind of thing Lesson 48 will check more formally.

## Aggregate: the actual answer to the business question

```python
def aggregate(joined):
    logger.info("Aggregating average fare by pickup zone")
    result = (
        joined
        .groupBy("pickup_zone", "pickup_borough")
        .agg(
            count("*").alias("trip_count"),
            spark_round(avg("fare_amount"), 2).alias("avg_fare"),
        )
        .filter(col("trip_count") >= 50)   # ignore zones with too few trips to be meaningful
        .orderBy(col("avg_fare").desc())
    )
    return result
```

Filtering out zones with very few trips matters: a zone with 3 trips
and one unusually expensive fare would otherwise show up at the top
of "highest average fare" for a misleading reason — real data
engineering work includes judgment calls like this, not just
mechanical joins and aggregations.

## Load: saving the result

```python
def load(result):
    logger.info("Writing result to output path")
    result.write.mode("overwrite").parquet("/data/nyc_taxi/output/avg_fare_by_zone")
    logger.info("Write complete")

def run_pipeline():
    trips, zones = extract()
    cleaned = clean(trips)
    joined = transform(cleaned, zones)
    result = aggregate(joined)
    load(result)
    return result

if __name__ == "__main__":
    run_pipeline()
```

Splitting this into small, named functions — `extract()`, `clean()`,
`transform()`, `aggregate()`, `load()` — mirrors Chapter 6's ETL
design exactly, and it's what makes Lesson 48's validation step
possible: each piece can be checked and tested on its own, rather
than needing to untangle one giant block of code to find where
something went wrong.

## Key terms

| Term | Meaning |
|---|---|
| Business question | The real thing a pipeline exists to answer, written down before writing code |
| `clean()` step | Removes invalid or incomplete records before they can skew an aggregation |
| Validation during transform | Checking for unmatched join results instead of assuming the join is clean |
| Small, named pipeline functions | Each stage (extract/clean/transform/aggregate/load) is independently checkable |

## Lab

Run `run_pipeline()` end to end and read through the log output. Confirm:

- The extract step logs a believable row count for both files
- The clean step logs a nonzero number of dropped rows
- The transform step logs zero (or a very small number of) unmatched zones
- The final written output exists at `/data/nyc_taxi/output/avg_fare_by_zone`

```python
result = run_pipeline()
result.show(10)
```

## Check yourself

You're ready for Lesson 48 when you can explain, without looking: why
does filtering out zones with very few trips matter before trusting a
"highest average fare" ranking, and why does splitting the pipeline
into small functions matter for Lesson 48's validation step?
