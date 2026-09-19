# Script — Loading Into Redshift

## Segment 1 (title)

Curated Parquet in S3 is already queryable by Athena, but Northfield's analysts also need fast, repeated dashboard-style joins across orders, products, and customers — the job Redshift is built for.

## Segment 2 (code: Redshift Serverless)

Northfield's query pattern is bursty — heavy at month-end, quiet otherwise — so this capstone uses Redshift Serverless instead of a provisioned cluster. The northfield-analytics workgroup bills by the RPU-second actually consumed and auto-pauses between queries.

## Segment 3 (code: the COPY load)

The COPY command loads curated Parquet from S3 straight into analytics.fact_orders in parallel across Redshift's compute nodes, authenticated through the northfield-redshift-copy-role IAM role — far faster than row-by-row inserts.

## Segment 4 (steps: the star schema)

fact_orders uses a customer_id distribution key and a dt sort key, matching how analysts actually query — recent date ranges, joined against dim_customer. dim_product and dim_customer are joined on nearly every query, and dim_date supports year and month rollups.

## Segment 5 (outro)

Next up: querying with Athena, where we run ad hoc SQL straight against the data lake, no loading required.
