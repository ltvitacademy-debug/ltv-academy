# Script — Cataloging With Glue

## Segment 1 (title)

Raw CSV files sitting in S3 aren't queryable by anything yet. A Glue crawler fixes that without moving or copying a single byte, by scanning the raw zone and registering tables in the Glue Data Catalog.

## Segment 2 (code: the crawler)

northfield-raw-crawler points at both raw prefixes — orders and inventory — using the northfield-glue-role, and writes its tables into the northfield_catalog database. It has no schedule of its own; Step Functions decides when it runs.

## Segment 3 (code: what it produces)

The crawler creates northfield_orders_raw and northfield_inventory_raw, with column types inferred straight from the CSV headers and the dt partition key detected automatically. Nothing is cleaned or corrected at this stage.

## Segment 4 (steps: crawler design decisions)

Three decisions matter here: the crawler runs on demand instead of its own schedule, because Step Functions already knows when new data has landed. It infers types but doesn't clean data — that's the ETL job's responsibility. And partition indexing keeps re-crawls fast even as the raw zone accumulates months of daily partitions.

## Segment 5 (outro)

Next up: transforming with Glue ETL, where a PySpark job turns these raw, inferred columns into a clean, typed, curated schema.
