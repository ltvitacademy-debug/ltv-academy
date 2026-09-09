# Lesson 15 — Creating a Delta Table

**Chapter 2 · Delta Lake · Lesson 15 of 57**

## What you'll learn

- Creating a Delta table from a DataFrame, path-based
- Creating one with SQL: `CREATE TABLE ... USING DELTA`
- Registering a named table vs. writing to a bare path
- Converting an existing Parquet folder into Delta, in place

## From a DataFrame — path-based

```python
trips = spark.read.parquet("/data/nyc_taxi/yellow_tripdata_2024-01.parquet")

trips.write.format("delta").save("/data/nyc_taxi/delta/trips")
```

This is exactly Lesson 14's write, with nothing new — a Delta table
addressed purely by its storage path, the same way every write
throughout Foundations was addressed.

## From SQL — a named table

```sql
CREATE TABLE trips
USING DELTA
LOCATION '/data/nyc_taxi/delta/trips'
```

This registers `trips` as a real name in the metastore (Chapter 4's
Unity Catalog governs exactly this kind of registration), pointing
at that same storage path. From here on, `SELECT * FROM trips` works
directly — no `spark.read` call needed first, unlike the temp views
from Foundations Lesson 58, which existed only for the life of a
session. A registered table persists for good, independent of any
notebook.

## Named table vs. bare path — when each matters

A bare path (`spark.read.format("delta").load(...)`) works from any
notebook that knows the path, with no setup. A named table
(`SELECT * FROM trips`) reads better, and is what Chapter 4's access
control actually grants and revokes permissions on — you can't grant
someone access to "a path," only to a real catalog object. Most real
production tables are named; path-based reads/writes stay common for
ad hoc or intermediate work.

## Converting existing Parquet, in place

```sql
CONVERT TO DELTA parquet.`/data/nyc_taxi/parquet_trips`
```

If a Parquet folder already exists — maybe from an earlier
Foundations-style write — `CONVERT TO DELTA` adds a `_delta_log/`
right there, in place, without rewriting the actual data files. This
is the real migration path from "we already have Parquet" to "now
it's Delta," with no full re-write of the data required.

## Key terms

| Term | Meaning |
|---|---|
| `.write.format("delta").save(path)` | Creates a Delta table, addressed by path |
| `CREATE TABLE ... USING DELTA LOCATION` | Registers a persistent, named Delta table |
| `CONVERT TO DELTA` | Adds a transaction log to existing Parquet, in place |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why
can Chapter 4's access control grant permissions on a named table,
but not on a bare storage path?
