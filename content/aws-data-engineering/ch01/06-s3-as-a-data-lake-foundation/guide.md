# S3 as a Data Lake Foundation

There's no single AWS product called "Data Lake" that you provision. A data lake on AWS is
an architecture pattern built from plain S3 storage plus a shared catalog and query layer on
top — and understanding that composition is what separates "I stored some files in S3" from
"I built a data lake." This lesson ties together everything from this chapter into that
bigger picture, and previews where Chapter 3 and Chapter 4 pick it up.

## What you'll learn

- Why "data lake" is an architecture, not a single AWS product
- The raw / staged / curated zone convention (and its bronze/silver/gold equivalent)
- What role the Glue Data Catalog plays in making S3 queryable
- How Athena and Redshift Spectrum turn zones into something SQL can actually query

## Zones: raw, staged, curated

A well-organized data lake bucket layout separates data by how processed it is, typically as
three zones (naming varies by team — this raw/staged/curated split maps directly onto the
medallion bronze/silver/gold pattern used elsewhere in the industry):

- **Raw** (bronze) — data exactly as it arrived from the source, untouched. If a source
  export is malformed, you can always reprocess from here because nothing has been lost.
- **Staged** (silver) — cleaned, validated, deduplicated, often converted to a columnar
  format like Parquet. Still close to the source structure, but usable.
- **Curated** (gold) — business-ready, modeled data: joined, aggregated, or shaped for a
  specific consumer (a BI dashboard, a Redshift table, an ML feature set).

Each zone is usually its own top-level prefix (`raw/`, `staged/`, `curated/`) or its own
bucket, with permissions tightened as data moves toward curated — raw data might be broadly
readable by any ingestion process, while curated data is scoped to the teams and tools that
actually consume it.

## The catalog is what makes it a "lake," not just storage

S3 by itself has no concept of tables, columns, or schemas — it just stores objects. What
turns a pile of Parquet files into something queryable is the **Glue Data Catalog**: a
persistent metadata store that records, for each table, where its files live in S3, what
columns and types they have, and how it's partitioned. A **Glue crawler** (covered in
Chapter 3) scans S3 and populates the catalog automatically, inferring schema from the
files it finds.

## Querying the lake without moving the data

Once the catalog knows about a table, two services can query it directly against S3, with no
separate load step:

- **Athena** runs standard SQL against S3 data using the Glue Catalog's schema, billed per
  TB scanned (Chapter 4).
- **Redshift Spectrum** lets a Redshift cluster query S3 data through the same catalog,
  joining "cold" lake data with "hot" data already loaded into Redshift tables (Chapter 5).

This is the actual payoff of the architecture: S3 holds the bytes, the Glue Catalog holds
the schema, and Athena or Redshift Spectrum provide the SQL layer — three separate, cheap
AWS building blocks standing in for what would otherwise be one expensive, purpose-built data
lake product.

## Key terms

| Term | Meaning |
|---|---|
| Raw / staged / curated | Zone convention for data by how processed it is (= bronze/silver/gold) |
| Glue Data Catalog | Metadata store recording table schema, location, and partitions over S3 data |
| Glue crawler | Service that scans S3 and populates the Data Catalog automatically |
| Athena | Serverless SQL query engine reading S3 directly via the Glue Catalog |
| Redshift Spectrum | Lets a Redshift cluster query S3 data through the Glue Catalog |

## Check yourself

A source system export arrives malformed and corrupts a batch of staged data. Why does
keeping an untouched raw zone matter here, and what would you need to do to recover?
