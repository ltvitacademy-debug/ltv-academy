# Redshift Spectrum

Everything since Lesson 25 has assumed you load data into Redshift before querying it.
**Redshift Spectrum** breaks that assumption: it lets a Redshift SQL query read data directly
from S3 — the same files Athena and Glue already work with — without a COPY step at all. It's
the point where Redshift and the S3-native tools from earlier chapters actually meet.

## What you'll learn

- What Spectrum lets you do that plain Redshift can't
- External schemas and external tables, backed by the Glue Data Catalog
- Where Spectrum's query processing actually runs
- When to use Spectrum instead of loading data with COPY

## Querying S3 without loading it in

A normal Redshift table's data lives on the cluster's compute nodes, put there by COPY.
**Spectrum tables** are different: the table definition — column names, types, S3 location —
lives in the catalog, but the actual data **stays in S3**. When you query it, Spectrum reads
the S3 objects directly at query time. You write ordinary SQL, join a Spectrum table against a
normal loaded table in the same query, and Redshift handles the rest.

## External schemas and the Glue Data Catalog

To query S3 data this way, you first create an **external schema** pointing at a catalog
database:

```
CREATE EXTERNAL SCHEMA spectrum_orders
FROM DATA CATALOG
DATABASE 'raw_events_db'
IAM_ROLE 'arn:aws:iam::123456789012:role/RedshiftSpectrumRole';
```

That `DATABASE` is a **Glue Data Catalog** database — the exact same catalog Athena queries
against (Lesson 20) and that Glue crawlers populate (Lesson 12). This is deliberate: define a
table's schema once in Glue, and both Athena and Redshift Spectrum can query it, with no
duplicated table definitions. Once the external schema exists, `spectrum_orders.raw_orders`
behaves like any other table in a `SELECT`, `JOIN`, or `WHERE` clause.

## Where Spectrum's processing runs

This is the detail that makes Spectrum genuinely different from "just querying a normal
table": the actual scan-and-filter work for a Spectrum query does **not** run on your
cluster's compute nodes. It runs on a separate, AWS-managed Spectrum compute layer, entirely
outside your cluster, which reads from S3 and does the initial filtering before sending
results back for your cluster to finish processing (joins with local tables, aggregation).
Because that layer scales independently of your cluster's node count, querying a massive S3
dataset through Spectrum doesn't compete with your cluster's own compute capacity the way
loading it in and querying it locally would.

## When to reach for Spectrum

Spectrum is the right call for data you want queryable but don't want to pay to store twice or
load repeatedly: historical/cold data you rarely touch, huge raw datasets you only need to
query occasionally, or data another team already maintains in S3 and catalogs with Glue. For
data you query constantly and need maximum, predictable performance on, loading it into the
cluster with COPY and giving it a proper DISTKEY/SORTKEY (Lesson 26) still wins.

## Key terms

| Term | Meaning |
|---|---|
| Redshift Spectrum | Feature that queries S3 data directly from Redshift SQL, without loading it |
| External schema | A schema mapped to a Glue Data Catalog database, exposing its tables to Redshift |
| External table | A table whose definition lives in the catalog but whose data stays in S3 |
| Spectrum compute layer | AWS-managed layer that scans S3 for Spectrum queries, separate from cluster nodes |

## Check yourself

A team has three years of clickstream data in S3, cataloged with Glue, that's queried maybe
once a quarter for historical analysis. Would you COPY it into Redshift or query it with
Spectrum? What's the tradeoff either way?
