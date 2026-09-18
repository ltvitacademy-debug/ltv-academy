# Script — Delta Sharing

## Segment 1 (title)

Databricks & Delta Lake Lesson 46 already covered the core objects — shares, providers, recipients — and the headline feature: a recipient doesn't need Databricks to read a shared table. This lesson is what's actually happening underneath that CREATE SHARE statement.

## Segment 2 (code: open protocol)

A recipient's client makes REST calls to a Delta Sharing Server — list shares, list tables, get metadata, get short-lived pre-signed URLs to the underlying Parquet files. The recipient then reads those files directly from cloud storage. That's why a non-Databricks client can participate at all — it only needs to speak an open REST protocol and read Parquet.

## Segment 3 (code: Databricks-to-Databricks vs open)

If the recipient also runs Unity Catalog, the shared table can show up directly in their own catalog with no credential file at all — that's Databricks-to-Databricks sharing. Open sharing is what makes a plain Python or Power BI recipient possible, at the cost of that recipient managing a credential file themselves.

## Segment 4 (code: sharing history)

A plain shared table gives only the current snapshot — automated, access-controlled, but still snapshot-only in spirit. Sharing with history lets the recipient read version history and Change Data Feed through the same protocol, pulling incremental changes instead of re-reading the whole table every time.

## Segment 5 (outro)

Snapshot versus history is the real distinction between Delta Sharing and just exporting a file. Next up: secrets management, and keeping credentials out of code entirely.
