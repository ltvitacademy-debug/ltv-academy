# Lesson 27 — The Silver Layer — Cleaned and Conformed Data

**Chapter 3 · Medallion Architecture · Lesson 27 of 57**

## What you'll learn

- Silver: everything Foundations' Chapter 4 taught, applied to bronze's output
- Casting, deduplicating, and null-handling — in that order, and why
- "Conformed" — the one idea silver adds beyond plain cleaning
- Reading from bronze, writing to silver — the pipeline shape itself

## Silver is Foundations' Chapter 4, applied

```python
bronze_trips = spark.table("bronze.trips")

silver_trips = (
    bronze_trips
    .withColumn("fare_amount", col("fare_amount").cast("double"))       # Lesson 48
    .withColumn("tpep_pickup_datetime", col("tpep_pickup_datetime").cast("timestamp"))
    .dropDuplicates(["VendorID", "tpep_pickup_datetime"])                # Lesson 52
    .na.drop(subset=["fare_amount"])                                     # Lesson 51
)

silver_trips.write.format("delta").mode("overwrite").saveAsTable("silver.trips")
```

Nothing here is new syntax — casting (Lesson 48), deduplication
(Lesson 52), null handling (Lesson 51). Silver is exactly where all
of that PySpark work actually gets used, for real, on real ingested
data.

## Order matters

Casting first means later steps (deduplication, null checks) operate
on real types, not strings — `dropDuplicates` on a string `"14.50"`
and a double `14.5` would treat them as different values, since
they're not even the same type yet. Cast, then dedupe, then handle
nulls — roughly this order, every time, for exactly this reason.

## "Conformed" — beyond just clean

**Conforming** means making data consistent with a shared standard —
same column names, same units, same categorical values — across
potentially multiple source systems feeding the same silver table.
If one source calls it `fare_amt` and another calls it
`fare_amount`, silver is where that gets reconciled into one
consistent name, so gold (Lesson 28) never has to know two sources
were ever involved.

## The pipeline shape: read bronze, write silver

`spark.table("bronze.trips")` (Lesson 16) reading directly from the
previous layer, transformed, and written to a new named table — this
is the actual mechanical shape every layer transition in this
chapter takes. Lessons 29–30 turn this exact pattern into a repeatable
pipeline structure.

## Key terms

| Term | Meaning |
|---|---|
| Silver | Cleaned, deduplicated, correctly-typed, conformed data |
| Conform | Reconciling multiple sources into one consistent shape/naming |
| Cast → dedupe → null-handle | The order that avoids type mismatches breaking later steps |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why
does casting a column's type need to happen before deduplicating on
it?
