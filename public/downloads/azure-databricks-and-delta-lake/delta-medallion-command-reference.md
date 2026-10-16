# Delta Lake & Medallion Architecture Command Reference

A single compiled reference for every real Delta Lake command this course
teaches, organized the way you'll actually reach for it on the job: by what
you're trying to do, not by lesson number. Every example uses this course's
own running `nyc_taxi` catalog and `bronze` / `silver` / `gold` schemas —
copy, adapt the table/column names, and run.

## 1. Creating and reading Delta tables

```sql
-- Create an empty managed table
CREATE TABLE IF NOT EXISTS nyc_taxi.bronze.trips (
    VendorID STRING,
    tpep_pickup_datetime TIMESTAMP,
    fare_amount DOUBLE
) USING DELTA;
```

```python
# Write a DataFrame as a brand-new named Delta table (write + register in one step)
trips.write.format("delta").saveAsTable("nyc_taxi.bronze.trips")

# Read by name (preferred once a table is registered)
df = spark.table("nyc_taxi.bronze.trips")

# Read by path (when there's no catalog entry yet)
df = spark.read.format("delta").load("/data/nyc_taxi/delta/trips")
```

## 2. Writing — the modes that matter

```python
trips.write.format("delta").mode("append").saveAsTable("nyc_taxi.bronze.trips")     # accumulate — bronze's normal mode
trips.write.format("delta").mode("overwrite").saveAsTable("nyc_taxi.gold.daily_revenue")  # replace entirely — typical for gold
```

`append` and `overwrite` behave exactly like they do on plain Parquet.
Reach for `MERGE` (below) the moment you need to update *some* rows and
insert others in the same write — that's what neither mode alone can do.

## 3. Upserts — UPDATE, DELETE, MERGE

```sql
UPDATE nyc_taxi.silver.trips SET fare_amount = 0 WHERE fare_amount < 0;

DELETE FROM nyc_taxi.silver.trips WHERE trip_distance IS NULL;

MERGE INTO nyc_taxi.silver.trips AS target
USING nyc_taxi.bronze.new_trips AS source
ON target.VendorID = source.VendorID
   AND target.tpep_pickup_datetime = source.tpep_pickup_datetime
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *;
```

```python
from delta.tables import DeltaTable

target = DeltaTable.forName(spark, "nyc_taxi.silver.trips")
target.alias("target").merge(
    new_rows.alias("source"),
    "target.VendorID = source.VendorID AND target.tpep_pickup_datetime = source.tpep_pickup_datetime",
).whenMatchedUpdateAll().whenNotMatchedInsertAll().execute()
```

**Rule of thumb:** `MERGE` on the same key used for deduplication is what
makes a bronze-to-silver pipeline safe to rerun (idempotent). Plain
`append` duplicates rows on a rerun; `MERGE` doesn't.

## 4. Time travel and restore

```sql
SELECT * FROM nyc_taxi.silver.trips VERSION AS OF 3;
SELECT * FROM nyc_taxi.silver.trips TIMESTAMP AS OF '2026-09-08';

RESTORE TABLE nyc_taxi.silver.trips TO VERSION AS OF 3;  -- makes an old version current again
```

```python
df_v3 = spark.read.format("delta").option("versionAsOf", 3).load("/data/nyc_taxi/delta/trips")
```

Time travel only reaches as far back as `VACUUM`'s retention window allows
(default 7 days) — it is a safety net, not a backup strategy.

## 5. Maintenance — OPTIMIZE, ZORDER, VACUUM

```sql
OPTIMIZE nyc_taxi.silver.trips;                      -- compact small files
OPTIMIZE nyc_taxi.silver.trips ZORDER BY (VendorID);  -- also co-locate related rows

VACUUM nyc_taxi.silver.trips DRY RUN;   -- preview what would be deleted
VACUUM nyc_taxi.silver.trips;           -- actually delete unreferenced files older than 7 days
```

Run `OPTIMIZE` on a cadence matching how often a table receives small,
frequent writes (daily for a heavily-streamed silver table; rarely for a
monthly batch load). Never drop `VACUUM`'s retention window much below 7
days — a long-running query reading an older version can fail mid-read.

## 6. Schema enforcement and evolution

```python
# Enforcement (default): a write with an extra/missing/mismatched column fails outright
new_data.write.format("delta").mode("append").saveAsTable("nyc_taxi.bronze.trips")
# -> AnalysisException: A schema mismatch detected when writing to the Delta table.

# Evolution: deliberately allow the target table's schema to grow
new_data.write.format("delta").mode("append").option("mergeSchema", "true").saveAsTable("nyc_taxi.bronze.trips")
```

```sql
ALTER TABLE nyc_taxi.bronze.trips ADD COLUMNS (congestion_surcharge DOUBLE);
```

## 7. The medallion naming convention this course uses throughout

| Schema | Catalog.Schema | Write mode | Holds |
|---|---|---|---|
| Bronze | `nyc_taxi.bronze` | `append` (or Autoloader) | Raw data, untouched, including bad rows, plus `_ingested_at` / `_source_file` metadata columns |
| Silver | `nyc_taxi.silver` | `MERGE` (idempotent) | Cast, deduplicated, conformed, quality-checked data; a `*_quarantine` table holds rejects |
| Gold | `nyc_taxi.gold` | `overwrite` or windowed `MERGE` | Small, business-level aggregates, one table per specific question |

## 8. Autoloader — the production bronze ingestion pattern

```python
df = (
    spark.readStream
    .format("cloudFiles")
    .option("cloudFiles.format", "csv")
    .option("cloudFiles.schemaLocation", "/checkpoints/trips_schema")
    .load("/Volumes/nyc_taxi/bronze/raw_files/")
)

df.writeStream \
    .option("checkpointLocation", "/checkpoints/trips_bronze") \
    .trigger(availableNow=True) \
    .toTable("nyc_taxi.bronze.trips")
```

`checkpointLocation` is what guarantees each file is only ever processed
once — never re-scan a folder by hand to figure out what's new.

## Related worked examples in this course

- *Building a Production-Grade Bronze-to-Silver-to-Gold Pipeline for NYC Taxi Trips*
- *Diagnosing and Correcting a Late-Arriving Data Incident in gold.daily_revenue*
