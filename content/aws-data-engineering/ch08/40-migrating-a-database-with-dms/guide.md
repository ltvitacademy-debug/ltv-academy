# Migrating a Database With DMS

Lesson 39 covered the pieces. Now walk through actually running a migration: an on-premises
SQL Server database, migrated as a **full load** into S3 as the target — a realistic setup
for a data engineering team that wants operational data landed in the data lake rather than
replicated into another live database.

## What you'll learn

- The concrete steps of setting up and running a full-load migration
- What a source endpoint for an on-prem SQL Server looks like
- What a full load actually does, table by table
- Table mappings and why you rarely migrate "everything"

## Setting up the migration

1. **Create the replication instance.** Choose an instance class sized to the migration —
   larger for more tables or higher data volume, running inside a VPC with network access to
   both the source and the target.
2. **Define the source endpoint.** For an on-prem SQL Server, this means server address,
   port, database name, and credentials, reachable from the replication instance's VPC via
   VPN or AWS Direct Connect. DMS tests the connection before you can use the endpoint.
3. **Define the target endpoint.** For a target of S3, this is a bucket and a folder prefix
   DMS writes to — DMS creates one file (by default, CSV, or Parquet if configured) per table,
   organized under that prefix.
4. **Create the migration task**, choosing migration type **"Migrate existing data"** (a pure
   full load, no ongoing replication — Lesson 41 covers adding CDC), and define **table
   mappings**: which schemas/tables to include, using selection rules rather than migrating
   an entire database wholesale by default.
5. **Run the task.** DMS reads each included table from the source and writes it to the
   target, in parallel across multiple tables where possible, and reports per-table progress
   and row counts in the console.

## What a full load actually does

A full load is a point-in-time bulk copy: DMS reads the entire current contents of each
selected table and writes it to the target once. It does not capture changes made to the
source *during* the load, and once complete, it does not pick up anything written to the
source afterward — that's what CDC (Lesson 41) is for. For a one-time migration into S3 for
analytics, a pure full load is often sufficient; for keeping a warehouse in sync with a live
OLTP system, full load is just the starting point.

## Table mappings

Migrating "the whole database" is rarely what you actually want. **Table mappings** are
selection rules — include this schema, exclude that table, optionally rename schemas on the
way to the target — so a migration task moves exactly the tables a pipeline needs, not
internal application tables that have no analytical value.

## Key terms

| Term | Meaning |
|---|---|
| Full load | A one-time, point-in-time bulk copy of a table's current contents to the target |
| Migration task | Ties a source endpoint, target endpoint, and table mappings together and runs the migration |
| Table mappings | Selection rules defining which schemas/tables a migration task includes |
| "Migrate existing data" | The DMS migration type for a pure full load with no ongoing replication |

## Check yourself

A migration task is set to "Migrate existing data" only (no CDC) and finishes successfully at
2:00 p.m. A row is updated in the source table at 2:05 p.m. Will that update show up in the
target? Why or why not?
