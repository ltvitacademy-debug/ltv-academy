# Script — Redshift Spectrum

## Segment 1 (title)

Redshift Spectrum lets a Redshift SQL query read data directly from S3, the same files Athena and Glue already work with, without a COPY step at all.

## Segment 2 (code: external schema, backed by Glue)

You start by creating an external schema pointing at a Glue Data Catalog database — the exact same catalog Athena queries and Glue crawlers populate. Once it exists, that table behaves like any other table in a SELECT, JOIN, or WHERE clause, except the data itself never leaves S3.

## Segment 3 (steps: why Spectrum scales independently)

Here's the key detail: a Spectrum query's actual scan and filter work doesn't run on your cluster's compute nodes at all. It runs on a separate, AWS-managed Spectrum layer that reads S3 and does the initial filtering, then your cluster finishes the job — joins and aggregation. Because that layer scales independently, a huge Spectrum query doesn't compete with your cluster's own capacity.

## Segment 4 (outro)

Redshift Spectrum down. Next up: workload management — how Redshift keeps a quick dashboard query from getting stuck behind a long-running ETL job.
