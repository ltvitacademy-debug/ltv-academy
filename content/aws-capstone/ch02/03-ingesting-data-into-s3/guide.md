# Ingesting Data Into S3

Northfield's on-prem SQL Server still runs the business day to day — this capstone doesn't
replace it, it feeds off it. This lesson builds the ingestion step: getting last night's order
and inventory export from that SQL Server into `northfield-raw-zone`, reliably, every night.

## What you'll learn

- The ingestion pattern this capstone uses, and why it fits Northfield's constraints
- Real S3 key naming with date partitioning for both file sets
- How to upload with the right metadata so downstream steps can trust what they find

## The ingestion pattern

Northfield doesn't need a real-time change-data-capture pipeline — leadership asked for
same-day visibility, not sub-second updates. So the ingestion step matches the job: a scheduled
export job on the SQL Server side runs a nightly `bcp` (bulk copy) extract of the `Orders` and
`InventorySnapshot` tables to CSV, and a small scheduled task uploads those files to S3 using the
AWS CLI (or `aws s3 cp` via a Systems Manager Run Command, if SQL Server can't run the CLI
directly).

For a larger source system, or if Northfield needed continuous replication, AWS Database
Migration Service (DMS) would pull directly from SQL Server with change data capture — that's
the direction to grow into later, and it's worth naming here because an interviewer will
usually ask "what would you do differently at scale?" DMS is that answer. For a mid-size
retailer's nightly batch, a scheduled export is the right-sized tool.

## Real key naming

Every night's export lands under a date-partitioned prefix in `northfield-raw-zone`:

```
aws s3 cp orders_2026-09-19.csv \
  s3://northfield-raw-zone/orders/dt=2026-09-19/orders_2026-09-19.csv

aws s3 cp inventory_2026-09-19.csv \
  s3://northfield-raw-zone/inventory/dt=2026-09-19/inventory_2026-09-19.csv
```

The `dt=YYYY-MM-DD` partition means the Glue crawler (Lesson 4) only has to discover new
partitions, not re-scan history, and Athena (Lesson 7) can prune partitions in a `WHERE dt =
'2026-09-19'` clause instead of scanning every file ever ingested.

## Making the upload trustworthy

Two details keep this ingestion step from silently failing:

- **A `_SUCCESS` marker file.** After both CSVs upload cleanly, the job writes an empty
  `s3://northfield-raw-zone/orders/dt=2026-09-19/_SUCCESS` file. Step Functions (Lesson 8)
  checks for this marker before kicking off the crawler, so a partial or failed upload never
  triggers a downstream run against incomplete data.
- **Server-side encryption.** The upload sets `--sse AES256` so every object in the raw zone is
  encrypted at rest by default, no separate KMS setup required for a project at this scale.

```
aws s3 cp orders_2026-09-19.csv \
  s3://northfield-raw-zone/orders/dt=2026-09-19/orders_2026-09-19.csv --sse AES256

aws s3api put-object \
  --bucket northfield-raw-zone \
  --key orders/dt=2026-09-19/_SUCCESS
```

## Key terms

| Term | Meaning |
|---|---|
| bcp | SQL Server's bulk copy utility, used to export tables to flat files |
| DMS | AWS Database Migration Service — the CDC-based alternative for larger or real-time sources |
| _SUCCESS marker | Empty file signaling a partition's upload completed cleanly |
| SSE (AES256) | Server-side encryption applied to every object at rest |

## Check yourself

Why does the ingestion job write an empty `_SUCCESS` marker file after uploading, instead of
letting Step Functions just check whether the CSV objects exist?
