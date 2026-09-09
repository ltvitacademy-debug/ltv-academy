# Lesson 49 — Lakeflow Connect — Ingestion Basics

**Chapter 5 · Lakeflow · Lesson 49 of 57**

## What you'll learn

- Lakeflow Connect: managed connectors, beyond files in a folder
- Where Autoloader (Lesson 32) still fits — it's still the file-based piece
- Source types Connect adds: databases, SaaS applications, streaming systems
- Why "managed" here means the same thing it meant for compute (Lesson 4)

## Beyond files in a folder

Lesson 32's Autoloader solves one specific ingestion shape: files
landing in a folder. **Lakeflow Connect** is the broader ingestion
layer Lakeflow adds on top — managed connectors for source types
that were never "a folder of files" to begin with: a relational
database's change stream, a SaaS application's API (Salesforce,
Workday), or a message queue.

## Autoloader's place within Connect

```python
# This is still exactly Lesson 32's Autoloader --
# it's now understood as ONE of Lakeflow Connect's ingestion types,
# specifically the file-based one:
df = (
    spark.readStream.format("cloudFiles")
    .option("cloudFiles.format", "csv")
    .load("/Volumes/nyc_taxi/bronze/raw_files/")
)
```

Nothing about Autoloader's own syntax changes. Lakeflow Connect is
the umbrella; Autoloader remains the specific tool for exactly the
"files arriving in a folder" case this course has used throughout
for NYC Taxi data.

## What Connect adds beyond files

For a source like a SaaS CRM system, Connect provides a managed
connector that handles authentication, schema mapping, and
incremental extraction on your behalf — conceptually the same
"managed" idea Lesson 4 introduced for compute (Databricks handles
the hard part) and Lesson 41 introduced for tables (Unity Catalog
owns the lifecycle), now applied to the ingestion step itself. You
configure a connection once; Connect handles pulling new/changed
records on an ongoing basis.

## Why this matters for a real organization

NYC Taxi data, as this course has always used it, genuinely is
"files arriving in a folder" — Autoloader alone has always been the
right tool for it. A real organization's data almost never comes
from just one kind of source; Connect's broader set of connectors is
what makes the same medallion architecture (Chapter 3) usable
against a Salesforce export, a production database's change feed,
and a folder of CSVs, all landing in the same bronze layer pattern.

## Key terms

| Term | Meaning |
|---|---|
| Lakeflow Connect | Managed ingestion connectors, beyond just files in a folder |
| Autoloader's place | Still the specific tool for file-based ingestion, within Connect's umbrella |
| Managed connector | Handles auth, schema mapping, incremental extraction — the source-side "managed" idea |

## Check yourself

You're ready for Lesson 50 when you can explain, without looking: does
adopting Lakeflow Connect require changing how Autoloader's own code
is written?
