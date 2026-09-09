# Lesson 12 — Bronze, Silver, Gold Architecture

**Chapter 1 · Azure Data Lake & Storage · Lesson 12 of 12 — Chapter Finale**

## What you'll learn

- **Bronze, Silver, Gold** — the medallion architecture, and exactly how
  it maps to Lesson 11's Raw/Cleansed/Curated
- The one genuine difference between the two namings, not just
  vocabulary
- Why this course uses both names, on purpose

## The direct mapping

| Lesson 11's name | Medallion name | What it holds |
|---|---|---|
| Raw | **Bronze** | Untouched source data, original format |
| Cleansed | **Silver** | Validated, typed, deduplicated |
| Curated | **Gold** | Business-ready, aggregated for consumption |

If you learned Lesson 11 well, you already understand Bronze/Silver/Gold
— the zones do exactly the same jobs, in exactly the same order.

## The one real difference, not just naming

Medallion architecture — the term itself, and the Bronze/Silver/Gold
names specifically — comes from **Databricks**, and it carries one
genuine expectation beyond vocabulary: every layer is typically stored
as a **Delta table** (Lesson 8's Delta format), not just Parquet files in
a folder. That matters because Delta's transaction log means Silver and
Gold tables can be updated **incrementally** — new data merged in
correctly — rather than being fully rebuilt from Bronze every single
time, which is exactly how the second course in this track (Azure
Databricks & Delta Lake) actually implements it, starting with real
Bronze table builds.

```text
-- Raw/Cleansed/Curated: often just files in folders
raw/yellow-taxi/year=2024/month=01/yellow_tripdata_2024-01.csv

-- Bronze/Silver/Gold: typically Delta TABLES, incrementally updatable
bronze.yellow_taxi   -- a Delta table, not just a folder of files
silver.yellow_taxi   -- MERGE new data in, don't rebuild from scratch
gold.daily_revenue_by_borough
```

## Why this course uses both names

Raw/Cleansed/Curated is the more general, tool-agnostic version of this
pattern — useful vocabulary no matter what platform you're on. Bronze/
Silver/Gold is what you'll hear in almost every real Databricks job,
interview, and piece of documentation. Knowing both means you can follow
either conversation.

## Chapter 1, complete

That's the whole first chapter: storage accounts, ADLS Gen2 and
hierarchical namespace, containers and directories, RBAC and ACLs,
managed identities and SAS tokens, file formats, partitioning, and now
two names for the same zoned design. Every one of Chapters 2–4's Python,
Spark, and PySpark labs assumes this foundation.

## Key terms

| Term | Meaning |
|---|---|
| Medallion architecture | The Bronze/Silver/Gold zoned pattern, popularized by Databricks |
| Bronze | The medallion name for the raw zone |
| Silver | The medallion name for the cleansed zone |
| Gold | The medallion name for the curated zone |

## Lab

Take your Lesson 11 lab sketch (the raw/cleansed/curated validation
rules you designed) and relabel it bronze/silver/gold — confirm every
rule still applies unchanged. That confirmation *is* the lesson: same
pattern, different name.

## Check yourself

You've completed Chapter 1 when you can explain, without looking: which
medallion layer corresponds to "cleansed," and what's the one thing
medallion architecture typically expects that plain raw/cleansed/curated
folders don't?
