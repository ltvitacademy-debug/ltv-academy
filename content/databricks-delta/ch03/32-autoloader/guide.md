# Lesson 32 — Autoloader — Incremental File Ingestion

**Chapter 3 · Medallion Architecture · Lesson 32 of 57**

## What you'll learn

- The problem Autoloader solves: knowing which files are actually new
- `cloudFiles` — the format that turns a folder into a self-tracking source
- Schema inference and evolution, automatic, for arriving files
- Why this is bronze ingestion's real production replacement for Lesson 26's manual read

## The problem: which files are new?

Lesson 31's watermark pattern tracked new *rows*. Autoloader solves
a related but different problem: a folder that new *files* land in
continuously (a landing zone fed by an external system), where you
need to know which files haven't been ingested yet — without
re-scanning and re-reading the entire folder every single time to
find out.

## cloudFiles — a self-tracking source

```python
df = (
    spark.readStream
    .format("cloudFiles")
    .option("cloudFiles.format", "csv")
    .option("cloudFiles.schemaLocation", "/checkpoints/trips_schema")
    .load("/data/nyc_taxi/incoming/")
)

df.writeStream \
    .option("checkpointLocation", "/checkpoints/trips_bronze") \
    .trigger(availableNow=True) \
    .toTable("bronze.trips")
```

`spark.readStream` (not `spark.read`) with `format("cloudFiles")`
is Autoloader's entry point. It maintains its own record of which
files it's already processed — the `checkpointLocation` — so
rerunning this exact code only ever picks up genuinely new files,
automatically. No manual watermark column, no re-scanning.

## Automatic schema inference and evolution

Autoloader infers a schema from the arriving files on first run, and
can detect schema changes in later files automatically — a real,
practical answer to Foundations Lesson 40's `inferSchema` cost
concern, and this course's Lesson 20's schema evolution, combined:
inference happens once and gets cached (via `schemaLocation`), not
recomputed on every file.

## Why this replaces Lesson 26's manual bronze read

Lesson 26 read one static file by hand. A real production bronze
layer almost always uses Autoloader instead — new files simply
appear in a folder (however they get there), and Autoloader picks
them up automatically, with correct, once-only processing per file
guaranteed by the checkpoint. `trigger(availableNow=True)` runs it
once against whatever's currently new, then stops — exactly what a
scheduled job (Lesson 11) needs.

## Key terms

| Term | Meaning |
|---|---|
| `cloudFiles` format | Autoloader's streaming source — tracks which files it's already seen |
| `checkpointLocation` | Where Autoloader records processing progress, guaranteeing no duplicates |
| `trigger(availableNow=True)` | Process everything currently new, once, then stop — fits a scheduled job |

## Check yourself

You're ready for Lesson 33 when you can explain, without looking: how
does Autoloader know which files it hasn't processed yet, without
re-scanning the entire folder every time?
