# Athena Fundamentals

Everything Chapter 3 built — crawlers populating the Catalog with table definitions — exists
to make this possible: running actual SQL against data sitting in S3, with no database to
load it into first. Amazon Athena is the service that does that. This lesson covers what it
is, what engine powers it, and the pricing model that makes it fundamentally different from
running your own query infrastructure.

## What you'll learn

- What Athena actually is, and what "serverless" means for a query service
- The query engine underneath Athena
- Athena's pay-per-query-scanned pricing model
- Why there's no infrastructure to provision or manage

## Serverless SQL, no cluster to run

Athena lets you run standard SQL queries directly against data in S3. There's no cluster to
provision, no database to load data into first, and no infrastructure to keep running
between queries — you write a query, Athena runs it against the S3 objects a Catalog table
points at, and returns results. When you're not querying, nothing is running and nothing is
being billed for compute. This is a meaningfully different operating model from a
traditional data warehouse, where a cluster exists (and often costs money) whether or not
anyone is actively querying it right now.

## The engine underneath: Presto/Trino

Athena is built on **Presto** (Athena originally launched on Presto, and AWS has since
migrated much of Athena's engine to **Trino**, the community fork of Presto led by its
original creators) — a distributed SQL query engine designed to query data where it lives
rather than requiring it be loaded in first. That heritage is why Athena supports standard
ANSI SQL with joins, aggregations, window functions, and CTEs, rather than a cut-down query
dialect. If you already know SQL, there's very little Athena-specific syntax to learn for
basic querying — the differences show up more in performance tuning (Lesson 21) than in the
SQL itself.

## Pay per query scanned, not per hour

Athena's pricing is based on the **amount of data scanned per query**, not on cluster
uptime or a fixed hourly rate. Run a query that scans 10 GB, and you pay for scanning
10 GB — regardless of how long the query takes to return, and regardless of whether you run
one query that day or a hundred. This single fact is the reason the rest of this chapter
spends real time on partitioning (Lesson 21) and file formats (Lesson 22): every technique
that reduces bytes scanned directly reduces cost, in a way that has no real analogue in a
fixed-cost, always-on cluster.

## No infrastructure to provision or manage

There's no Athena "instance size" to choose, no cluster to resize as data grows, and no
patching or version upgrades to schedule — AWS operates the query engine entirely. The only
things you manage are the S3 data itself and the Catalog metadata describing it (which is
exactly what Chapter 3 covered). This is what makes Athena a natural fit for ad hoc
analysis, exploratory querying, and workloads too bursty or unpredictable to justify a
standing cluster.

## Key terms

| Term | Meaning |
|---|---|
| Athena | Serverless AWS service for running SQL queries directly against S3 data |
| Presto / Trino | The distributed SQL engine family Athena's query execution is built on |
| Bytes scanned | The amount of data a query reads — Athena's billing unit |
| Serverless query service | A query engine with no cluster to provision, size, or keep running |

## Check yourself

Two teams run the exact same query against the exact same S3 dataset — one scans 500 MB
because their table is partitioned well, the other scans 50 GB because it isn't. Do they
pay the same amount for that query? Why or why not?
