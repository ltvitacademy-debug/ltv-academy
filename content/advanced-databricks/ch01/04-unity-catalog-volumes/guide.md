# Lesson 4 — Unity Catalog Volumes

**Chapter 1 · Beyond the Basics: Unity Catalog Deep Dive · Lesson 4 of 34**

## What you'll learn

- A fast recap: Lesson 45 already covered what a volume is and how to create one
- Storing Structured Streaming checkpoints in a volume — and why that matters
- Governing arbitrary non-tabular files — images, PDFs, model artifacts — the same way as tables
- Why "just a folder" undersells what a volume actually gives you at scale

## The recap

Databricks & Delta Lake Lesson 45 already covered this fully: a
volume is governed file storage inside a schema, addressed as
`/Volumes/catalog/schema/volume/file`, with managed and external
variants matching Lesson 41's table distinction, subject to `GRANT`/
`REVOKE` the same as any table. That's the definition and the basic
`spark.read`/`dbutils.fs` usage. This lesson is what a single landing-
zone example doesn't show.

## Pattern 1 — checkpoints living in a governed volume

```python
raw = (spark.readStream.format("cloudFiles")
       .option("cloudFiles.format", "json")
       .option("cloudFiles.schemaLocation",
               "/Volumes/nyc_taxi/bronze/checkpoints/orders_schema")
       .load("/Volumes/nyc_taxi/bronze/raw_files/"))

raw.writeStream \
    .option("checkpointLocation",
            "/Volumes/nyc_taxi/bronze/checkpoints/orders_stream") \
    .toTable("nyc_taxi.bronze.orders")
```

Databricks & Delta Lake's Lesson 32 pointed `checkpointLocation` at
an ungoverned `/checkpoints/` path. Putting the checkpoint *inside a
volume* means it inherits Unity Catalog governance too: `READ VOLUME`
on `bronze.checkpoints` controls who can even inspect a running
stream's offset state, not just who can query the resulting table.
For a pipeline processing anything sensitive, that's a real gap
closed — checkpoint internals used to be effectively ungoverned.

## Pattern 2 — governing files that were never going to be a table

```python
# Not every file belongs in a table. Volumes govern these exactly
# the same way, with the exact same GRANT/REVOKE mechanism:
dbutils.fs.ls("/Volumes/nyc_taxi/gold/model_artifacts/")
# -> churn_model_v3.pkl, feature_importance.png, model_card.pdf

GRANT READ VOLUME ON VOLUME nyc_taxi.gold.model_artifacts
TO `ml-engineers`;
```

A volume's real value shows up hardest with data that was never
going to be a Delta table at all — a trained model file, a PDF
report, a directory of product images for a computer-vision job. A
schema.table structure genuinely can't hold these. Before volumes,
that meant DBFS root or an unmanaged mount with no governance at
all; now the exact same `GRANT`/`REVOKE` mechanism that locks down
`gold.daily_revenue` locks down a folder of PNGs.

## What "just a folder" undersells

Both patterns are the same underlying fact stated two ways: a
volume isn't a landing zone for CSVs that happen to become tables
later — it's the general answer to "how do I govern *any* file,
tabular or not," including files a pipeline creates and reads
internally, like checkpoints, that a user never queries directly at
all.

## Key terms

| Term | Meaning |
|---|---|
| Governed checkpoint | A `checkpointLocation` inside a volume — offset state now under `READ VOLUME` control |
| Non-tabular governance | Images, PDFs, model files GRANTed exactly like tables — no separate mechanism |
| Volume's real scope | Any file, tabular or not, not just a CSV landing zone |

## Check yourself

You're ready for Lesson 5 when you can explain, without looking: what
does putting a `checkpointLocation` inside a volume actually add,
compared to Lesson 32's ungoverned `/checkpoints/` path?
