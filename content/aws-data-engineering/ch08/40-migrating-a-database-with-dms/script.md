# Script — Migrating a Database With DMS

## Segment 1 (title)

Let's walk through actually running a migration — an on-premises SQL Server database, migrated as a full load into S3, a realistic setup for landing operational data in the data lake.

## Segment 2 (steps: five steps to a full load)

Create a replication instance sized to the migration, inside a VPC with access to both ends. Define the source endpoint — for on-prem SQL Server that's server address, port, and credentials reachable over VPN or Direct Connect — and the target endpoint. Then create the migration task set to "Migrate existing data," with table mappings defining exactly what gets included.

## Segment 3 (code: target endpoint: S3)

With S3 as the target, you specify a bucket and a folder prefix. DMS writes one file per table under that prefix — CSV by default, or Parquet if you configure it.

## Segment 4 (steps: what a full load is — and isn't)

A full load reads the entire current contents of each selected table and writes it to the target once. It doesn't capture anything changed on the source during or after the load — that gap is exactly what Change Data Capture exists to close.

## Segment 5 (outro)

A real full-load migration, walked through. Next up: CDC with DMS — how ongoing replication keeps the target in sync after the full load finishes.
