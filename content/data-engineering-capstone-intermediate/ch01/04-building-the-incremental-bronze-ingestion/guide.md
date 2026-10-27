# Lesson 4 — Building the Incremental Bronze Ingestion

**Chapter 1 · Data Engineering Capstone — Intermediate Project · Lesson 4 of 16**

## What you'll learn
- How to read the current watermark from `meta.last_ingested_date` in real PySpark
- How to filter incoming source files or partitions to only what's newer than the watermark
- How to append just those new rows to `bronze.sales_raw` with Delta Lake
- How to advance the watermark safely, only after a successful append

## The watermark table

`meta.last_ingested_date` is deliberately small: one row per source, holding the latest date that
source has already had ingested into Bronze. Before ingestion runs, read it:

```python
from pyspark.sql import functions as F

watermark_row = (
    spark.table("meta.last_ingested_date")
    .filter(F.col("source_name") == "pos_daily_export")
    .select("last_ingested_date")
    .first()
)

last_ingested_date = watermark_row["last_ingested_date"] if watermark_row else "1900-01-01"
```

That fallback date matters: the very first time this job runs against a source, there's no watermark
row yet, so it treats everything as "new" — which is correct, since nothing has been ingested before.

## Filtering source files to only what's new

The source data in this pipeline lands as daily files, partitioned by sale date. Incremental ingestion
means only reading files whose partition date is after the watermark:

```python
source_df = (
    spark.read.format("csv")
    .option("header", "true")
    .load("abfss://landing@retailchain.dfs.core.windows.net/pos_daily_export/")
    .filter(F.col("sale_date") > F.lit(last_ingested_date))
)

new_row_count = source_df.count()
print(f"New rows found since {last_ingested_date}: {new_row_count}")
```

Notice what this is *not* doing: it never scans or touches data at or before `last_ingested_date`.
That filter is the whole point — it's the line that turns "reprocess everything" into "process only
what's new."

## Shaping and appending to Bronze

Bronze's job is still just landing raw data with light bookkeeping columns — no cleaning, no
deduplication, that's Silver's job in Lesson 5. Add the ingestion metadata and append:

```python
bronze_ready_df = (
    source_df
    .withColumn("source_file", F.input_file_name())
    .withColumn("ingested_at", F.current_timestamp())
    .select(
        "transaction_id", "store_id", "product_id", "category",
        "sale_date", "sale_timestamp", "quantity", "unit_price",
        "total_amount", "source_file", "ingested_at",
    )
)

(
    bronze_ready_df.write
    .format("delta")
    .mode("append")
    .saveAsTable("bronze.sales_raw")
)
```

`mode("append")` is correct here specifically *because* the source filter already guaranteed these
rows are new. Bronze stays append-only, exactly like the Beginner project — the only thing that
changed is that far fewer rows arrive at this `write` call on any given night.

## Advancing the watermark — and only after success

The watermark must only move forward once the append above has actually succeeded. Advancing it too
early — before confirming the write landed — risks silently skipping real data on a future run if
this run fails partway through:

```python
if new_row_count > 0:
    new_watermark_date = (
        bronze_ready_df.agg(F.max("sale_date")).first()[0]
    )

    spark.sql(f"""
        MERGE INTO meta.last_ingested_date t
        USING (SELECT 'pos_daily_export' AS source_name,
                      '{new_watermark_date}' AS last_ingested_date) s
        ON t.source_name = s.source_name
        WHEN MATCHED THEN UPDATE SET t.last_ingested_date = s.last_ingested_date
        WHEN NOT MATCHED THEN INSERT (source_name, last_ingested_date)
             VALUES (s.source_name, s.last_ingested_date)
    """)
else:
    print("No new rows found; watermark left unchanged.")
```

This is the same `MERGE INTO` idea Lesson 5 uses for `silver.sales_clean` — insert if the source has
never been seen, update if it has — just applied here to a one-row-per-source bookkeeping table
instead of the full sales data.

## Key terms

| Term | Meaning |
|---|---|
| Watermark read | Looking up the last-processed checkpoint before deciding what counts as "new" |
| Partition filter | Restricting a read to only the data partitions (here, dates) newer than the watermark |
| Append-only | A write mode that only adds rows, never rewrites or deletes existing ones |
| Watermark advance | Updating the checkpoint to reflect what was just successfully ingested — never before confirming success |

## Lab

Using the three code blocks above as a reference, write out the full incremental ingestion script for
a second, hypothetical source named `"online_storefront_export"` landing at a different path. Reuse
the same watermark-read, filter, append, and watermark-advance pattern, swapping only the source name
and the file path.

## Check yourself

Without looking back: explain why the watermark must only be advanced *after* a successful append, not
before. Then explain, in one sentence, exactly which line of code is responsible for turning this into
an incremental job rather than a full reload.
