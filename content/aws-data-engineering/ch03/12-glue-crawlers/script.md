# Script — Glue Crawlers

## Segment 1 (title)

A Glue crawler answers "what's actually in this S3 prefix, and what shape is it?" without a human writing a CREATE TABLE statement by hand. Point it at data, run it, and it writes a table definition into the Data Catalog for you.

## Segment 2 (steps: from raw files to a table)

Here's the sequence. The crawler samples a subset of objects under the path you point it at. It classifies the format and infers schema — column names and types. Then it writes that as a table definition into the Data Catalog, creating it if it's new or updating it if the table already exists.

## Segment 3 (code: classifiers detect format)

Format detection is handled by classifiers. Glue ships built-in classifiers for Parquet, ORC, Avro, CSV, JSON, and more. If your data doesn't match any built-in pattern — a proprietary log format, say — you can write a custom classifier with a grok pattern. Classifiers only detect format and help infer schema; they never touch the underlying files.

## Segment 4 (steps: scheduling options)

You've got three ways to run a crawler: on demand, triggered manually or by another process; on a schedule, using a cron-like expression like nightly; or chained into a workflow after an upstream job finishes. Pick based on how often new data actually lands — scheduling too often just burns DPU-hours for no new metadata.

## Segment 5 (outro)

Crawlers populate the Data Catalog, but they're not the catalog itself. Next up: the Data Catalog in depth — the shared metadata store every crawler writes into and every query engine reads from.
