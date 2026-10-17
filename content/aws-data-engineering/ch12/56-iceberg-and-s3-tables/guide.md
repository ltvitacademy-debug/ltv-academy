# Table Formats for a Data Lake: Apache Iceberg via S3 Tables

This lesson is a written case study, not a recording — AWS's own S3 Tables feature reached general availability in December 2024, after this course's video was produced, and the material here is researched and verified against current AWS documentation rather than filmed. Chapter 3 covered the Glue Data Catalog as the shared metadata layer that makes S3 feel queryable. This lesson covers what sits one layer below that: the actual **table format** — the thing that decides whether updating one row means rewriting an entire partition, or a few kilobytes of metadata.

## What you'll learn

- Why a plain collection of Parquet files in S3 can't support row-level updates, deletes, or safe concurrent writes on its own
- What Apache Iceberg actually adds — snapshots, schema evolution, time travel — and why that matters for a pipeline, not just a warehouse
- What Amazon S3 Tables is, specifically: a purpose-built bucket type with Iceberg support and automatic maintenance built in
- How S3 Tables integrates with the Glue Data Catalog, Athena, Redshift, and EMR
- Where Apache Hudi fits as the other real option, and why Iceberg has the broader AWS footprint today

## The problem plain Parquet-on-S3 never solved

Chapter 1 covered S3 as cheap, durable object storage, and Chapter 3 covered the Glue Catalog as the metadata layer that lets Athena and Redshift Spectrum treat a folder of files as a table. Neither one solves a real operational problem: a folder of Parquet files has no concept of a transaction. Updating a single row in a partitioned dataset traditionally means rewriting the entire partition's files — there's no way to change one row's value without touching every file in that partition, and no safe way for a reader to query the data while a writer is mid-rewrite without risking a half-written, inconsistent result.

A **table format** is what fixes this — a specification, layered on top of the same Parquet (or ORC, or Avro) files, that tracks exactly which files currently make up a table's true state, as of a specific point in time.

## What Apache Iceberg adds

Iceberg tracks a table's state as an immutable sequence of **snapshots** — each snapshot is a complete, consistent list of exactly which data files make up the table at that moment. A write operation (an insert, update, or delete) doesn't rewrite existing files; it writes new files and atomically swaps in a new snapshot that points to the right combination of old and new files. This single idea is what unlocks several real, practical capabilities:

- **Row-level updates and deletes**, without rewriting an entire partition's worth of files.
- **Safe concurrent reads and writes** — a reader querying the table always sees one consistent snapshot, never a half-written intermediate state, even while a writer is actively running.
- **Schema evolution** — adding, renaming, or reordering a column doesn't require rewriting the underlying files, because the schema itself is tracked as metadata, versioned alongside the data.
- **Time travel** — querying the table as it existed at a specific prior snapshot, useful for debugging a bad pipeline run or auditing what a report would have shown on a specific date.
- **Partition evolution** — changing how a table is partitioned going forward, without having to rewrite historical data under the old partitioning scheme.

## What Amazon S3 Tables actually is

**S3 Tables** is a distinct S3 bucket type — a **table bucket** — purpose-built for storing tabular data in Iceberg format, generally available since December 2024. It is not a separate product bolted onto regular S3; it's a different bucket type with different guarantees:

- Tables in a table bucket are stored in **Apache Iceberg format**, including the newer Iceberg V3 table format (deletion vectors, row lineage, column default values).
- Table buckets deliver **higher transaction throughput** than a self-managed Iceberg table on a general-purpose S3 bucket.
- S3 performs **automatic maintenance** on tables in a table bucket: compaction (merging many small files into fewer, larger ones), snapshot management, and unreferenced-file cleanup — all without a separate Glue job or cron schedule to run and monitor.

This is the real, concrete difference from the "classic" path of managing your own Iceberg tables directly on general-purpose S3 buckets: on the classic path, compaction and snapshot expiration are your responsibility, typically run as scheduled Glue jobs. On S3 Tables, AWS runs that maintenance for you, on every table, automatically.

## How it connects to the rest of this course

S3 Tables integrates with the **Glue Data Catalog** (Chapter 3) directly — you can integrate a table bucket with your Glue Data Catalog from the S3 console, and once integrated, every Iceberg-aware query engine that already reads from the Glue Catalog can discover and query S3 Tables the same way it queries any other registered table:

- **Athena** (Chapter 4) queries S3 Tables with standard SQL, the same `SELECT` statements this course already taught.
- **Redshift** (Chapter 5) can query Iceberg tables, including S3 Tables, the same way Redshift Spectrum already reads other S3-backed external tables.
- **EMR** (Chapter 9) Spark jobs can read and write Iceberg tables directly, which matters for any pipeline doing heavier transformation than Athena or Glue ETL is suited for.

Nothing about how you write a `SELECT` statement against an S3 Tables-backed table changes versus any other registered Glue Catalog table — the difference is entirely in what happens underneath a write, and in who's responsible for keeping the table's files tidy over time.

## Where Apache Hudi fits

Apache Hudi is the other real table format with meaningful AWS support — EMR and AWS Glue (4.0+, via the job's `datalake-formats` setting) both read and write it natively. Hudi is worth knowing by name, but its AWS footprint is narrower than Iceberg's: there is no native Hudi support in Redshift Spectrum, and broader AWS service coverage (Athena, Glue, EMR, and S3 Tables itself) currently favors Iceberg. For a new AWS-native lakehouse build today, Iceberg — especially via S3 Tables — is the more broadly supported starting point; Hudi remains a reasonable choice specifically inside an existing EMR-centric Spark pipeline that already uses it.

## Key terms

| Term | Meaning |
|---|---|
| Table format | A metadata specification layered on data files that tracks a table's true, consistent state over time |
| Snapshot | An immutable, point-in-time list of exactly which files make up an Iceberg table |
| S3 Tables | A purpose-built S3 bucket type (table bucket) storing tables in Iceberg format, with automatic maintenance |
| Compaction | Merging many small files into fewer, larger ones to improve query performance |
| Time travel | Querying a table as it existed at a specific prior snapshot |

## Check yourself

Before moving to the next lesson, make sure you can explain, in your own words, why a folder of plain Parquet files in S3 can't safely support a concurrent reader and writer at the same time — and what specifically an Iceberg snapshot does to solve that.
