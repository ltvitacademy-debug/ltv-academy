# Lesson 8 — Schema Inference & Evolution

**Chapter 2 · Auto Loader & Ingestion at Scale · Lesson 8 of 34**

## What you'll learn

- A fast recap: Lesson 32 mentioned schema inference/evolution in one line — this is the rest of it
- `schemaEvolutionMode`: `addNewColumns`, `rescue`, `failOnNewColumns`, `none`
- The `_rescued_data` column — where unexpected data actually goes
- `cloudFiles.schemaHints` — overriding what inference gets wrong

## The recap

Lesson 32 said Auto Loader "infers a schema from arriving files, and
can detect schema changes automatically" — true, but that's the
whole sentence it got. It never named the actual modes that control
*what happens* when a new column shows up mid-stream. That's this
lesson.

## The four schema evolution modes

```python
.option("cloudFiles.schemaEvolutionMode", "addNewColumns")     # default
.option("cloudFiles.schemaEvolutionMode", "rescue")
.option("cloudFiles.schemaEvolutionMode", "failOnNewColumns")
.option("cloudFiles.schemaEvolutionMode", "none")
```

`addNewColumns` (the default) adds a genuinely new column to the
table going forward and fails the *current* micro-batch once, so the
schema gets updated before that batch is retried. `rescue` never
fails a batch at all — new columns go straight into
`_rescued_data` instead of altering the table. `failOnNewColumns`
stops the stream entirely rather than silently changing the schema —
the right choice for a table where an unreviewed schema change is a
genuine incident. `none` ignores schema changes and drops the new
data, the least common real choice.

## The `_rescued_data` column

```python
df = spark.read.table("nyc_taxi.bronze.trips")
df.select("_rescued_data").where("_rescued_data IS NOT NULL")
# -> {"unexpected_field":"value123","_file_path":"...", ...}
```

Every table Auto Loader writes to carries a `_rescued_data` column
by default — a JSON string holding any field that didn't fit the
current schema, plus the source file path. This is genuinely
different from the data simply being dropped: nothing is lost, it's
quarantined in a queryable column until someone decides whether it
deserves its own schema change.

## `schemaHints` — correcting what inference gets wrong

```python
.option("cloudFiles.schemaHints",
        "fare_amount DOUBLE, pickup_zip STRING")
```

Inference is a best guess from sample files — it can call a
ZIP-code column `INT` because early files happened to contain only
numeric-looking values, then break once a ZIP with a leading zero or
a letter shows up. `schemaHints` pins specific columns to a type you
already know is correct, without hand-writing the entire schema
yourself.

## Key terms

| Term | Meaning |
|---|---|
| `schemaEvolutionMode` | Controls what happens on a new column: add it, rescue it, fail, or ignore it |
| `_rescued_data` | Where data that doesn't fit the current schema is quarantined, not dropped |
| `schemaHints` | Pins specific columns to a known-correct type, overriding inference |

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: what
is the real difference between `addNewColumns` and `rescue` when a
genuinely new column shows up in an arriving file?
