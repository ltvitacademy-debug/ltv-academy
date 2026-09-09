# Lesson 22 — UPDATE, DELETE, and MERGE

**Chapter 2 · Delta Lake · Lesson 22 of 57**

## What you'll learn

- `UPDATE` and `DELETE` — real row-level modification, something plain Parquet can't safely do
- `MERGE INTO` — update existing rows and insert new ones, atomically, in one statement
- The classic "upsert" pattern, and why it matters for real pipelines
- How this connects straight to Foundations' Chapter 4 — but on a table, not a DataFrame

## UPDATE and DELETE — real row-level changes

```sql
UPDATE trips SET fare_amount = 0 WHERE fare_amount < 0;

DELETE FROM trips WHERE trip_distance IS NULL;
```

Plain Parquet has no safe way to do this — Foundations never
attempted an in-place row change, because a Parquet folder isn't
built for it. Delta can, because `UPDATE`/`DELETE` are just more
commits: the log records new files (with the changed/remaining
rows) and `remove` actions for the old ones — the exact mechanism
from Lesson 17, doing real work here.

## MERGE INTO — the upsert pattern

```sql
MERGE INTO trips AS target
USING new_trips AS source
ON target.trip_id = source.trip_id
WHEN MATCHED THEN UPDATE SET *
WHEN NOT MATCHED THEN INSERT *
```

This is the real answer to a genuinely common problem: a daily file
of trip records where some rows are corrections to trips already in
the table, and some are brand new. `MERGE` handles both in one
atomic statement — `WHEN MATCHED` updates the existing row,
`WHEN NOT MATCHED` inserts the new one. Doing this with separate
`UPDATE`/`INSERT` statements would require finding matches yourself
first, and wouldn't be atomic across the two operations.

## Why "upsert" (update + insert) matters

Real pipelines constantly re-ingest data that's mostly-but-not-
entirely new — a corrected record, a late-arriving row (Lesson 35),
a source system's daily "here's everything as of today" export.
`MERGE` is the single tool built for exactly this shape of problem,
and it's the mechanism this course's Chapter 3 relies on directly
for building a silver layer from bronze.

## The DataFrame API equivalent

```python
from delta.tables import DeltaTable

target = DeltaTable.forPath(spark, "/data/nyc_taxi/delta/trips")
target.alias("target").merge(
    new_trips.alias("source"), "target.trip_id = source.trip_id"
).whenMatchedUpdateAll().whenNotMatchedInsertAll().execute()
```

The `delta.tables` module (not `pyspark.sql`) provides
`DeltaTable`, the object these Delta-specific operations are called
on — this is genuinely new, not something covered anywhere in
Foundations, since Foundations' PySpark never wrote to a Delta
table at all.

## Key terms

| Term | Meaning |
|---|---|
| `UPDATE` / `DELETE` | Real row-level modification, safe because of the transaction log |
| `MERGE INTO` | Update matching rows, insert new ones, atomically, in one statement |
| Upsert | The update-or-insert pattern `MERGE` is built for |

## Check yourself

You're ready for Lesson 23 when you can explain, without looking: why
would using separate `UPDATE` and `INSERT` statements instead of one
`MERGE` be both harder and less safe?
