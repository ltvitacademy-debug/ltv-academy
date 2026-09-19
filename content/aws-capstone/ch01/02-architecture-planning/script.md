# Script — Architecture Planning

## Segment 1 (title)

Before touching the console, we're naming every piece of Northfield's platform and deciding where data lives at each stage. Every lesson from here forward references these exact names.

## Segment 2 (code: the full architecture)

EventBridge triggers Step Functions on a nightly schedule. Step Functions runs the Glue crawler, then the Glue ETL job, then a Redshift COPY, then sends an SNS notification. Athena queries the S3 data lake and Glue Catalog directly, any time, without waiting for the scheduled run.

## Segment 3 (code: S3 zone layout)

Two buckets anchor the platform: northfield-raw-zone for unmodified source files, and northfield-curated-zone for the Glue ETL job's cleaned Parquet output. Both use Hive-style dt= date partitions, so Glue and Athena can infer partitions automatically instead of scanning the whole bucket.

## Segment 4 (steps: decisions locked in this lesson)

Three names don't change for the rest of this capstone: the raw zone bucket, the curated zone bucket, and the northfield- prefix applied to every single resource we create.

## Segment 5 (outro)

Next up: ingesting data into S3, where Northfield's nightly order and inventory export actually lands in that raw zone for the first time.
