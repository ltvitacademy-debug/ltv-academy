# Script — Athena Fundamentals

## Segment 1 (title)

Everything Chapter 3 built — crawlers populating the Catalog — exists to make this possible: running actual SQL against data sitting in S3, with no database to load it into first. That's Amazon Athena.

## Segment 2 (code: serverless SQL, no cluster to run)

You write a query, Athena runs it against the S3 objects a Catalog table points at, and returns results. There's no cluster to provision, no data to load in advance, and nothing running — or billed — between queries. That's a genuinely different operating model from a warehouse cluster that costs money whether or not anyone's querying it right now.

## Segment 3 (steps: what powers Athena)

Athena is built on Presto, and AWS has since migrated much of its engine to Trino, the community fork led by Presto's original creators. It's a distributed SQL engine that queries data where it lives. That heritage means standard ANSI SQL — joins, aggregations, window functions, CTEs. If you already know SQL, there's very little Athena-specific syntax to learn.

## Segment 4 (code: pay per query scanned)

Here's the pricing model that changes everything downstream: Athena bills by the amount of data scanned per query, not by cluster uptime. Scan 10 gigabytes, pay for scanning 10 gigabytes, regardless of how long the query takes. That single fact is why the rest of this chapter spends real time on partitioning and file formats — every technique that reduces bytes scanned directly reduces cost.

## Segment 5 (outro)

Serverless, Presto/Trino-powered, billed by bytes scanned — that's Athena's foundation. Next up: actually querying S3 data with Athena, starting with CREATE EXTERNAL TABLE.
