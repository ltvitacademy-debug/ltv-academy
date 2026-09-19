# Script — Ingesting Data Into S3

## Segment 1 (title)

Northfield's on-prem SQL Server still runs the business day to day — this capstone doesn't replace it, it feeds off it. This lesson gets last night's export into the raw zone, reliably, every night.

## Segment 2 (code: nightly upload)

A scheduled job on the SQL Server side runs a bcp export of the Orders and InventorySnapshot tables, then uploads both CSVs to northfield-raw-zone under a date-partitioned key, with server-side encryption turned on by default.

## Segment 3 (code: the _SUCCESS marker)

After both files upload cleanly, the job writes an empty _SUCCESS marker into that same date partition. Step Functions checks for that marker before it ever starts the crawler, so a partial or failed upload can't trigger a downstream run against incomplete data.

## Segment 4 (steps: why a scheduled export, not DMS)

Leadership asked for same-day visibility, not real-time updates, so a nightly export matches the actual requirement. If Northfield ever needed continuous change data capture, AWS Database Migration Service is the scale-up path — worth naming, not worth building for a job that doesn't need it yet.

## Segment 5 (outro)

Next up: cataloging with Glue, where a crawler turns these raw CSV files into queryable tables without moving a single byte of data.
