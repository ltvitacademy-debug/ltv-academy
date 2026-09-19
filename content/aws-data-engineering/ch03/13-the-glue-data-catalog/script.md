# Script — The Glue Data Catalog

## Segment 1 (title)

Every table a crawler creates, every table Athena queries, every table Redshift Spectrum reads — all of it lives in one place: the Glue Data Catalog. It's the shared metadata layer that lets S3 behave like a queryable data warehouse without actually being one.

## Segment 2 (steps: one catalog, many engines)

Register a table once, and every one of these tools can see it. Athena runs SQL directly against Catalog tables. Redshift Spectrum queries S3 data through the Catalog without loading anything into Redshift first. And EMR's Spark and Hive jobs can use the Catalog as an external metastore. You're not maintaining separate copies of the same schema for each tool.

## Segment 3 (code: the metadata hierarchy)

The Catalog organizes things in three levels. Databases are logical namespaces, like "raw" or "analytics" — not physical databases. Tables live inside a database and describe one dataset's location, format, and columns. Partitions are values within a table that map to specific S3 sub-prefixes. None of these levels store actual data — only pointers to where it lives in S3.

## Segment 4 (code: schema on read)

A traditional database enforces schema on write — you define columns up front, and every row has to conform. The Catalog flips that: schema on read. The files in S3 stay untyped bytes; the Catalog layers structure on top of them at query time, without ever touching the underlying data.

## Segment 5 (outro)

The Catalog is the shared metadata backbone this whole chapter builds on. Next up: Glue ETL jobs — writing real PySpark and Scala Spark code that reads and writes against tables the Catalog already knows about.
