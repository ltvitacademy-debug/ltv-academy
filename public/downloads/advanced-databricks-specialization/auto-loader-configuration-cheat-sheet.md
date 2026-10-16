# Auto Loader Configuration Cheat Sheet

Compiled from Chapter 2 (Auto Loader & Ingestion at Scale). A quick reference for the options that
actually matter once a feed moves from "demo directory" to real production volume.

## Baseline read

```python
df = (spark.readStream.format("cloudFiles")
      .option("cloudFiles.format", "csv")
      .option("cloudFiles.schemaLocation", "/Volumes/nyc_taxi/bronze/checkpoints/trips_schema")
      .option("cloudFiles.maxFilesPerTrigger", 1000)
      .option("cloudFiles.maxBytesPerTrigger", "10g")
      .load("/Volumes/nyc_taxi/bronze/raw_files/"))
```

## Options that matter at scale

| Option | What it controls | When to set it |
|---|---|---|
| `cloudFiles.format` | Source file format (`csv`, `json`, `parquet`, `avro`, `text`, `binaryFile`) | Always required |
| `cloudFiles.schemaLocation` | Where Auto Loader stores the inferred/evolving schema | Always required for schema inference |
| `cloudFiles.maxFilesPerTrigger` | Caps how many files one micro-batch takes on | Backlog catch-up on a brand-new or long-paused stream |
| `cloudFiles.maxBytesPerTrigger` | Caps how many bytes one micro-batch takes on | Same as above, by size instead of file count |
| `cloudFiles.includeExistingFiles` | `true` (default): process the backlog on first run; `false`: skip it | Pointing a new stream at years of historical files you don't want reprocessed |
| `cloudFiles.useNotifications` | `true`: file notification mode (cloud storage events); `false` (default): directory listing | Millions of files per directory, where directory listing starts timing out |
| Schema evolution mode | `addNewColumns` (default), `rescue`, `failOnNewColumns`, `none` | Set deliberately — don't leave it on the default without thinking about it |

## The real mechanism behind "already seen"

At scale, Auto Loader's checkpoint isn't a flat list of filenames — it's backed by a real embedded
key-value store (RocksDB), specifically so looking up "have I seen this file" stays fast even after
years of continuous ingestion, not just on day one. This is why `checkpointLocation` must never be
deleted or shared between unrelated streams.

## Directory listing vs. file notification mode

```
Directory listing (default):
  Lists the directory tree on every trigger -- fine at low-to-moderate
  file counts, breaks down (timeouts) in the millions

File notification mode (cloudFiles.useNotifications = true):
  Subscribes to cloud storage events (new file landed) instead of
  listing -- the right call once directory listing stops scaling
```

## A sane default config for a new streaming ingestion source

```python
.option("cloudFiles.format", "json")
.option("cloudFiles.schemaLocation", "/Volumes/<catalog>/<schema>/checkpoints/<source>_schema")
.option("cloudFiles.schemaEvolutionMode", "addNewColumns")
.option("cloudFiles.maxFilesPerTrigger", 1000)
```

Start here; add `useNotifications` only once directory listing has actually started to time out, not
preemptively.

## Related course material

- Lesson 7 — Auto Loader Fundamentals
- Lesson 8 — Schema Inference & Evolution
- Lesson 9 — File Notification Mode
- Lesson 10 — Auto Loader + Structured Streaming
- Lesson 11 — Ingestion Patterns at Scale
