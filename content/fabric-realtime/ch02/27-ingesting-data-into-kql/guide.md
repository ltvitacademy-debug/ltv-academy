# Lesson 27 — Ingesting Data Into a KQL Database

**Chapter 2 · Real-Time Data Engineering · Lesson 27 of 70**

## What you'll learn

- Streaming ingestion, revisited — the Eventstream path, named directly
- Batch ingestion — getting existing historical files into a KQL Database
- `.ingest into table` — the direct, code-level ingestion command
- Choosing the right path for this course's own historical vs. live data

## Streaming ingestion, revisited

Lesson 21 already covered the main path this chapter uses:
an Eventstream's destination node pointed at a KQL Database, events
flowing in continuously as they're produced. This is genuinely
**streaming** ingestion — no separate step required beyond what
Lesson 19's Eventstream canvas already does.

## Batch ingestion — historical files, once

```kql
.ingest into table RawTripEvents (
    h'https://<storage-account>.blob.core.windows.net/nyc-taxi/yellow_tripdata_2024-01.csv'
) with (format='csv')
```

Sometimes historical data already exists as files — this course's
own NYC Taxi monthly CSVs, the exact same files Databricks & Delta
Lake's Autoloader (Lesson 32) picked up automatically. `.ingest
into table` pulls a batch of existing data into a KQL Database
directly, once, rather than waiting for it to arrive as a live
stream — the genuine KQL-native equivalent of a one-time
`spark.read.csv()` + `saveAsTable()`.

## Why both paths exist

Real-time trip events (Lesson 20's simulated stream) need streaming
ingestion — there's no "file" to batch-load, only a continuous
flow. This course's historical months, already sitting as static
files, are a better fit for batch `.ingest` — pulling them in once
is simpler and cheaper than replaying a year of history as a
simulated stream just to get it into the same table.

## Choosing the right path for this course

```
Historical NYC Taxi months (already files)  -> .ingest into table (batch)
Live simulated trip events (Lesson 20)       -> Eventstream (streaming)
```

Both paths land data in the **same** `RawTripEvents` table,
queryable with the exact same KQL from Lessons 22–26 regardless of
which path brought a given row in — the storage and query layer
doesn't care how a row arrived, only that it did.

## Key terms

| Term | Meaning |
|---|---|
| Streaming ingestion | An Eventstream destination — continuous, as events are produced |
| `.ingest into table` | A direct, one-time batch load of existing files |
| Same table, either path | Query results don't depend on which ingestion path brought a row in |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why
would replaying a year of historical NYC Taxi data as a simulated
stream be a worse choice than batch `.ingest`?
