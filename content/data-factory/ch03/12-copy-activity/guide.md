# Lesson 12 — The Copy Activity

**Chapter 3 · Pipelines & Activities · Lesson 2 of 6**

## What you'll learn

- The role the Copy activity plays in nearly every real pipeline
- The three real steps it performs, every single time
- Which integration runtime it actually uses, and when that choice matters
- How it can create a destination table for you automatically

## The most common activity in Data Factory

The **Copy activity** copies data from a source data store to a sink
data store — among data stores located on-premises and in the cloud
alike:

![Diagram showing the Copy activity's role: reading from a source data store and writing to a sink data store, with transformation and analysis able to follow.](/courses/data-factory/ch03/12-copy-activity/copy-activity-role.png)
*After copying, you can transform and analyze the data with other activities, or publish results for BI consumption.*

It's genuinely the activity you'll reach for the most in this entire
course — the Lesson 8 SQL Server connection, the Lesson 7 Blob
Storage connection, both exist mainly to feed a Copy activity moving
real data between them.

## Three steps, every time

Regardless of source or sink, the Copy activity performs the exact
same three-step process underneath:

![Diagram showing the Copy activity's process: reading data from a source data store, performing serialization, compression, and column mapping, then writing data to a sink data store.](/courses/data-factory/ch03/12-copy-activity/copy-activity-overview.png)

1. **Reads** data from the source data store.
2. **Performs** serialization/deserialization, compression/decompression,
   and column mapping — based on the input dataset, output dataset,
   and the activity's own configuration.
3. **Writes** data to the sink data store.

## Which integration runtime does the work

Recall Lesson 8: the Copy activity runs on an **integration runtime**.
Copying between two publicly accessible cloud stores uses the **Azure
Integration Runtime**. Copying to or from an on-premises store, or
one inside a network with access control, needs a **self-hosted
integration runtime** instead — and you can't mix runtimes within one
Copy activity: source and sink must both be reachable from the same
self-hosted integration runtime if either one needs it.

## Auto-creating the destination table

Copying into a SQL destination — Azure SQL Database, Azure SQL
Managed Instance, Azure Synapse Analytics, or SQL Server — and the
table doesn't exist yet? The Copy activity can **create it
automatically**, based on the shape of the source data:

![Screenshot of the Copy activity's sink configuration showing the Table option set to Auto create table.](/courses/data-factory/ch03/12-copy-activity/create-sink-table.png)
*A fast way to get started loading and evaluating data — review and adjust the generated schema afterward if it needs it.*

This is genuinely useful for prototyping and first drafts, but review
the auto-generated schema before trusting it in anything you'd call
production — auto-detected types don't always match what you'd have
designed by hand.

## What the Copy activity is not

The Copy activity moves data — it does the "E" and the "L" of ETL or
ELT well, but it's deliberately limited on the "T." Real
transformation, beyond column mapping and type conversion, belongs to
mapping data flows (Chapter 5) or an external compute engine like
Databricks. Trying to force heavy transformation logic into a Copy
activity's mapping tab is a common early mistake — Lesson 13 covers
exactly how far that mapping tab actually goes, and where it stops.

## Key terms

| Term | Meaning |
|---|---|
| Source | The data store the Copy activity reads from |
| Sink | The data store the Copy activity writes to |
| Auto create table | Letting the Copy activity generate a SQL destination table's schema automatically |

## Lab

1. If you have linked services from Chapter 2, build a simple
   pipeline with one Copy activity moving data from one to the other.
2. Run it in Debug mode and confirm it succeeds — Chapter 8 covers
   reading the results in real depth, but note the row count for now.
3. If your sink is a SQL destination and the table doesn't exist yet,
   try **Auto create table** and review the schema it actually
   generated.

## Check yourself

You're ready for Lesson 13 when you can name, from memory, the three
steps the Copy activity performs every single time it runs, and
explain why it can't use two different self-hosted integration
runtimes in the same activity.
