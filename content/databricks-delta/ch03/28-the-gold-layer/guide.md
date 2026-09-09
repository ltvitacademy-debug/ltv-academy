# Lesson 28 — The Gold Layer — Business-Level Aggregates

**Chapter 3 · Medallion Architecture · Lesson 28 of 57**

## What you'll learn

- Gold: `groupBy()`/`.agg()` (Foundations Lessons 53–54), applied to silver
- Why gold tables are typically small, and why that's the whole point
- One gold table often serves one specific question, not general-purpose querying
- Multiple gold tables from the same silver — a normal, expected pattern

## Gold is aggregation, applied to clean data

```python
silver_trips = spark.table("silver.trips")

gold_daily_revenue = (
    silver_trips
    .groupBy("VendorID", to_date("tpep_pickup_datetime").alias("trip_date"))
    .agg(
        count("*").alias("trip_count"),
        sum("fare_amount").alias("total_revenue"),
        avg("fare_amount").alias("avg_fare"),
    )
)

gold_daily_revenue.write.format("delta").mode("overwrite").saveAsTable("gold.daily_revenue")
```

Exactly Foundations Lessons 53–54's `groupBy()`/`.agg()` pattern —
nothing new here either, just aimed at silver's clean, trustworthy
data instead of a raw DataFrame. Gold's whole purpose is answering
one specific business question directly, cheaply, on every future
read.

## Why gold tables are small — on purpose

A silver table might have millions of rows; the corresponding gold
table, aggregated down to one row per vendor per day, might have a
few thousand. This size difference is the entire point: a dashboard
querying gold directly is fast precisely because the expensive
aggregation already happened once, when gold was built, rather than
being recomputed on every single dashboard view.

## One gold table, one question

`gold.daily_revenue` answers "how much revenue per vendor, per day?"
— and answers it well. It's a poor fit for a completely different
question, like "what's the average trip distance by pickup zone?"
That's not a flaw; it's the design. Real medallion pipelines build
**multiple** gold tables from the same silver data, each shaped for
a specific downstream need.

## Multiple gold tables, same silver source

```python
gold_zone_distance = (
    silver_trips
    .join(zones, silver_trips.PULocationID == zones.LocationID, "left")
    .groupBy("Zone")
    .agg(avg("trip_distance").alias("avg_distance"))
)
gold_zone_distance.write.format("delta").mode("overwrite").saveAsTable("gold.zone_distance")
```

Same `silver_trips`, a completely different shape of output — this
is completely normal. Gold isn't one table; it's however many
tables the business actually needs, each one cheap to query because
its specific aggregation is already done.

## Key terms

| Term | Meaning |
|---|---|
| Gold | Business-level aggregates, built from silver, shaped for a specific question |
| Why gold is small | The aggregation already happened once; queries against it are cheap |
| Multiple gold tables | Normal — one silver source can feed many differently-shaped gold tables |

## Check yourself

You're ready for Lesson 29 when you can explain, without looking: why
is it normal, not wasteful, to build multiple gold tables from the
same silver source?
