# Script — Transforming With Glue ETL

## Segment 1 (title)

northfield_orders_raw has the right rows but the wrong shapes — string dates, inconsistent region casing, and row-based CSV instead of columnar Parquet. The Glue ETL job fixes all three in one Spark run.

## Segment 2 (code: the job)

northfield-orders-etl is a Spark job on Glue 4.0, running five G.1X workers, reading from northfield_orders_raw and writing partitioned Parquet into the curated zone, with job bookmarks enabled.

## Segment 3 (code: the transform)

The PySpark script converts order_date to a real date type, normalizes region to uppercase and trimmed, computes an order_total column, drops duplicate order IDs, and writes the result as Parquet partitioned by the same dt key used in the raw zone.

## Segment 4 (steps: why it's built this way)

Job bookmarks mean only the new day's partition gets reprocessed each night, not the entire history. Parquet with Snappy compression is columnar and cheaper to query than CSV. And partitioning the curated output by dt lets Athena and Redshift Spectrum prune partitions on the curated side too.

## Segment 5 (outro)

Next up: loading into Redshift, where this curated Parquet output gets COPY-ed into a real fact table for analysts to query with plain SQL.
