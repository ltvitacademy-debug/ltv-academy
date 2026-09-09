# Lesson 11 — Raw, Cleansed, and Curated Zones

**Chapter 1 · Azure Data Lake & Storage · Lesson 11 of 62**

## What you'll learn

- What each of the three classic zones actually holds
- A concrete, real example using this course's NYC Taxi data, start to
  finish
- Why the raw zone is genuinely never modified, no matter what you find
  wrong with it later
- A heads-up: Lesson 12 covers the *same* idea under different names

## Three zones, three jobs

Lesson 10's design sketch used just "raw" and "processed" — here's the
real, standard three-way split most production data lakes actually use:

- **Raw**: an exact, untouched copy of the source data, in whatever
  format it arrived in. Nothing is validated, cleaned, or reshaped here
  — its entire job is to exist as ground truth you can always go back to.
- **Cleansed**: the same data, now with real engineering applied —
  types enforced, obviously invalid rows removed or flagged, duplicates
  handled, converted to an analytics-friendly format (Lesson 8's
  Parquet). Still at roughly the same grain as the source, just
  trustworthy now.
- **Curated**: business-ready. Aggregated, joined with other datasets,
  shaped around a specific question someone actually wants answered —
  what a BI dashboard or a report would query directly.

## A concrete example, start to finish

```text
raw/yellow-taxi/year=2024/month=01/
  yellow_tripdata_2024-01.csv
  -- Exactly what NYC TLC published. Untouched. Includes bad rows:
  -- negative fares, zero passenger counts, impossible timestamps.

cleansed/yellow-taxi/year=2024/month=01/
  part-0000.parquet
  -- Same trips, but: fare_amount < 0 rows removed,
  -- passenger_count = 0 flagged, types enforced, converted to Parquet.

curated/daily-revenue-by-borough/year=2024/month=01/
  part-0000.parquet
  -- One row per (day, borough): total fares, total trips, avg fare.
  -- This is what a dashboard actually queries.
```

Notice: the **row count shrinks or reshapes** as data moves from
cleansed to curated (individual trips become daily aggregates), but
**raw never changes** — if next month you discover the cleansing logic
had a bug, you reprocess directly from the untouched raw files, not from
already-cleaned data that might be hiding the same mistake.

## Why raw is genuinely never touched

This is the whole point of keeping it separate: if a cleansing rule
turns out to be wrong, or a new business question needs a field you
originally discarded, raw is still there, complete, ready to reprocess.
Modify raw data in place, even to "fix" something, and you permanently
lose the ability to redo that work correctly later.

## A heads-up before Lesson 12

The very next lesson introduces **Bronze, Silver, Gold** — and if that
sounds suspiciously similar to what you just learned, it's because it
is. Bronze/Silver/Gold is the same three-zone idea, popularized by
Databricks and the Delta Lake ecosystem specifically. Different
vocabulary, same underlying pattern — Lesson 12 explains exactly where
the two namings converge and where subtle differences exist.

## Key terms

| Term | Meaning |
|---|---|
| Raw zone | Untouched, exact copy of source data — never modified |
| Cleansed zone | Validated, typed, deduplicated — same grain as source |
| Curated zone | Business-ready, aggregated, shaped for direct consumption |

## Lab

Using this course's NYC Taxi data, sketch (on paper) what the cleansed
zone's validation rules should be for at least three columns — think
about which raw values are obviously invalid (negative fares? zero
distances? future timestamps?) before you get to Chapter 4's actual
PySpark cleaning lessons.

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: why
does raw data never get modified, even after you find something wrong
with it?
