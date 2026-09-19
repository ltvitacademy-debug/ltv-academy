# The Glue Data Catalog

Every table a crawler creates, every table Athena queries, every table Redshift Spectrum
reads — all of it lives in one place: the Glue Data Catalog. It's easy to think of Glue as
"the ETL service," but the Catalog is arguably the more important piece, because it's the
shared metadata layer that lets S3 behave like a queryable data warehouse without actually
being one.

## What you'll learn

- What the Data Catalog actually stores, and how it's organized
- Why it's a single, shared metadata store across Glue, Athena, Redshift Spectrum, and EMR
- The databases → tables → partitions hierarchy
- What "schema on read" means and why the Catalog is what makes it possible

## One catalog, many engines

The Data Catalog is a persistent, AWS-account-level metadata store, separate from any one
Glue job or crawler. Once a table is registered there, it's visible to every service that
knows how to read it: Athena runs SQL against it directly, Redshift Spectrum queries S3
data through it without loading anything into Redshift, EMR's Spark and Hive jobs can use
it as an external metastore, and Glue jobs use it to know what to read and write. Register
a table once, and every one of those tools sees it — you're not maintaining four separate
copies of the same schema.

This shared-catalog design is what makes an AWS data lake feel coherent instead of like
five disconnected tools pointed at the same bucket. It also means a permissions mistake or
a bad crawler run has a wide blast radius — the Catalog is a shared dependency, which is
worth remembering when scoping IAM access to it (Chapter 2 covered why resource-based
policies and least privilege matter for shared AWS resources like this one).

## The hierarchy: databases, tables, partitions

The Catalog organizes metadata in a three-level hierarchy:

- **Databases** are logical namespaces — a grouping container, not a physical database.
  A typical setup might have a `raw`, `staging`, and `analytics` database.
- **Tables** live inside a database and describe one dataset: its S3 location, file
  format, and column list with types.
- **Partitions** are values within a table that map to specific S3 sub-prefixes — for
  example, a `year`, `month`, `day` partitioned table where each partition value points at
  a distinct S3 key prefix. Lesson 21 covers why partitions matter for query performance.

None of these levels store actual data — only pointers to where the data lives in S3 and
what shape it's in.

## Schema on read

A traditional database enforces schema **on write** — you define columns up front, and
every row must conform when it's inserted. The Catalog enables the opposite: **schema on
read**. The raw files in S3 are unchanged, untyped bytes as far as S3 is concerned; the
Catalog is what layers a schema on top of them at query time. This is why you can crawl
the same S3 data, register it under a table definition, re-crawl it after the upstream
format changes, and never have touched the underlying files at all — the schema lives in
metadata, not in the data itself.

## Key terms

| Term | Meaning |
|---|---|
| Data Catalog | Glue's persistent, account-level metadata store shared across query engines |
| Database (Catalog) | A logical namespace grouping related tables — not a physical database |
| Table (Catalog) | Metadata describing one dataset's S3 location, format, and columns |
| Partition | A value within a table mapping to a specific S3 sub-prefix |
| Schema on read | Applying schema at query time rather than enforcing it when data is written |

## Check yourself

Two different teams both want to query the same S3 dataset — one through Athena, one
through Redshift Spectrum. Why do they only need one crawler and one Catalog table between
them, rather than each team registering their own copy of the schema?
