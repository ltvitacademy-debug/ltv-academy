# Lesson 7 — Auto Loader Fundamentals

**Chapter 2 · Auto Loader & Ingestion at Scale · Lesson 7 of 34**

## What you'll learn

- A fast recap: Lesson 32 already covered `cloudFiles`, checkpoints, and the core problem
- What actually tracks "already seen" at scale — a real state store, not a simple list
- Throughput control: `maxFilesPerTrigger` and `maxBytesPerTrigger`
- `cloudFiles.includeExistingFiles` — backfilling a directory that already has files in it

## The recap

Databricks & Delta Lake Lesson 32 already covered the core problem
and the core syntax in full: `spark.readStream.format("cloudFiles")`
tracks which files it's already processed via `checkpointLocation`,
so rerunning the same code only picks up genuinely new files, no
manual watermark or full re-scan needed. That's Auto Loader's
reason to exist. This lesson is what actually happens underneath
that, at scale, and the options a single introductory example
skipped.

## What actually tracks "already seen," at scale

Lesson 32 said the checkpoint "maintains its own record." At the
scale of millions of files, that record isn't a flat list — Auto
Loader backs it with a real embedded key-value store (RocksDB) inside
the checkpoint, specifically because a naive list of every filename
ever seen would itself become slow to scan as it grows. This is the
actual mechanism that makes "don't re-scan the whole directory"
true even after years of continuous ingestion, not just on day one.

## Throughput control

```python
df = (spark.readStream.format("cloudFiles")
      .option("cloudFiles.format", "csv")
      .option("cloudFiles.schemaLocation", "/Volumes/nyc_taxi/bronze/checkpoints/trips_schema")
      .option("cloudFiles.maxFilesPerTrigger", 1000)
      .option("cloudFiles.maxBytesPerTrigger", "10g")
      .load("/Volumes/nyc_taxi/bronze/raw_files/"))
```

Lesson 32's example ran against a small directory where this never
mattered. Point Auto Loader at a directory with millions of backlog
files and, without a limit, the first micro-batch tries to process
all of them at once — `maxFilesPerTrigger`/`maxBytesPerTrigger` cap
how much a single micro-batch takes on, trading a slower initial
catch-up for a cluster that doesn't fall over on day one.

## Backfilling an existing directory

```python
.option("cloudFiles.includeExistingFiles", "true")   # default
.option("cloudFiles.includeExistingFiles", "false")   # skip the backlog
```

Auto Loader's default behavior processes files that already exist
in a directory the first time a stream starts against it — genuinely
different from "only new files from now on." Setting
`includeExistingFiles` to `false` is the real switch for the common
case of pointing a brand-new stream at a directory with years of
historical files you deliberately don't want reprocessed.

## Key terms

| Term | Meaning |
|---|---|
| RocksDB-backed state | The real structure behind "already seen" — stays fast at millions of files |
| `maxFilesPerTrigger` / `maxBytesPerTrigger` | Caps how much one micro-batch takes on, for backlog catch-up |
| `includeExistingFiles` | Controls whether a new stream processes a directory's existing backlog or skips it |

## Check yourself

You're ready for Lesson 8 when you can explain, without looking: why
would a naive flat list of processed filenames eventually become a
performance problem that Lesson 32's simple description doesn't
mention?
