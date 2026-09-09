# Lesson 36 — Data Quality Checks in the Medallion Flow

**Chapter 3 · Medallion Architecture · Lesson 36 of 57**

## What you'll learn

- Where quality checks belong: silver, not bronze — and why
- Quarantining bad rows, rather than either keeping or silently dropping them
- Tracking a quality metric over time, in its own small gold-style table
- Why "the pipeline ran successfully" and "the data is trustworthy" are different claims

## Where checks belong: silver, not bronze

Bronze (Lesson 26) deliberately keeps everything, including bad
rows — that decision was made specifically so nothing is ever lost
before it's even inspected. Quality checks belong at the silver
boundary: after casting and deduplication, but before the data is
treated as trustworthy enough for gold.

## Quarantine — a third option beyond keep or drop

```python
cleaned = spark.table("bronze.trips").withColumn(
    "fare_amount", col("fare_amount").cast("double")
)

valid_rows = cleaned.filter(
    (col("fare_amount") > 0) & (col("trip_distance") > 0) & col("fare_amount").isNotNull()
)
quarantined_rows = cleaned.filter(
    (col("fare_amount") <= 0) | (col("trip_distance") <= 0) | col("fare_amount").isNull()
)

valid_rows.write.format("delta").mode("append").saveAsTable("silver.trips")
quarantined_rows.write.format("delta").mode("append").saveAsTable("silver.trips_quarantine")
```

Rather than Lesson 51's binary choice of `.na.drop()` (lose the row
entirely) or `.na.fill()` (guess a value), a **quarantine table**
keeps the bad row somewhere real and inspectable — nothing is
silently discarded, and nothing bad reaches gold either. Someone can
review `silver.trips_quarantine` later and decide what actually went
wrong upstream.

## Tracking quality over time

```python
quality_metrics = spark.sql("""
    SELECT current_date() AS check_date,
           COUNT(*) AS total_rows,
           SUM(CASE WHEN fare_amount <= 0 THEN 1 ELSE 0 END) AS bad_fare_count
    FROM bronze.trips
    WHERE _ingested_at >= current_date()
""")
quality_metrics.write.format("delta").mode("append").saveAsTable("gold.data_quality_metrics")
```

This is genuinely a small gold table (Lesson 28) — an aggregate,
built for one specific question: "is data quality getting better or
worse over time?" A sudden spike in `bad_fare_count` is an early
warning that something changed upstream, worth investigating before
it becomes a bigger problem.

## Two different claims

A job's `Run history` (Lesson 11) showing "Succeeded" only means the
code executed without an exception — it says nothing about whether
the *data* it processed was actually good. Quarantine counts and
quality metrics are what actually answer "is this data trustworthy?"
— a genuinely separate question from "did this job run?"

## Key terms

| Term | Meaning |
|---|---|
| Quarantine table | Bad rows kept somewhere inspectable, neither dropped nor passed through |
| Quality metrics table | A small gold-style table tracking data quality over time |
| Job success ≠ data quality | A successful run doesn't guarantee the data processed was actually good |

## Check yourself

You're ready for Lesson 37 when you can explain, without looking: why
is a quarantine table a better default than either keeping or
silently dropping a bad row?
