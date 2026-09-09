# Lesson 1 — What Is Azure Databricks?

**Chapter 1 · Databricks Fundamentals · Lesson 1 of 57**

## What you'll learn

- Where Databricks fits, picking up exactly where Data Engineering Foundations left off
- Databricks as a managed Spark platform — no cluster setup by hand
- The "lakehouse" idea: one place for both data lake flexibility and warehouse structure
- What's ahead in this course: clusters, notebooks, Delta Lake, medallion pipelines, Unity Catalog, Lakeflow

## Picking up where Foundations left off

Data Engineering Foundations ended with real PySpark: DataFrames,
transformations, joins, window functions, writing partitioned
Parquet. Every line of that code ran — implicitly — against some
Spark cluster. This course is about that cluster: Azure Databricks,
the managed platform that runs Spark for you, and Delta Lake, the
storage format almost every real Databricks pipeline is built on.

## Databricks: managed Spark, without the cluster babysitting

Recall Lesson 28 of Foundations: Spark itself is a distributed
computing engine — a cluster of machines coordinating on one
computation. Someone still has to provision those machines, install
Spark, keep versions compatible, and tear them down when done.
Azure Databricks does exactly that: a few clicks (or one API call)
spin up a working Spark cluster, pre-configured, ready for a
notebook to attach to. This course's Chapter 1 covers exactly that
workflow.

## The "lakehouse" idea

A traditional data lake (Foundations' Chapter 1: ADLS Gen2, raw
files, flexible schema) is cheap and flexible but weak on the things
a database is good at — transactions, schema guarantees, fast
point lookups. A traditional data warehouse is the opposite: strong
guarantees, but rigid and expensive to scale. Databricks' pitch is a
**lakehouse**: files in cheap object storage (exactly like
Foundations' ADLS Gen2), but with Delta Lake adding the
transactional guarantees a warehouse would normally provide on top.
Chapter 2 of this course is entirely about how Delta Lake actually
does that.

## What this course covers

1. **Databricks Fundamentals** (this chapter) — workspaces, clusters, notebooks, jobs.
2. **Delta Lake** — the table format underneath the lakehouse promise.
3. **Medallion Architecture** — bronze/silver/gold, the standard way real Databricks pipelines are organized.
4. **Unity Catalog** — governance: who can see and touch which data.
5. **Lakeflow** — Databricks' current name for its unified ingestion, pipeline, and orchestration tooling.

Every chapter builds directly on Foundations' Spark and PySpark
material — nothing here replaces that, it's the platform that
material actually runs on in the real world.

## Key terms

| Term | Meaning |
|---|---|
| Azure Databricks | A managed platform that provisions and runs Spark clusters for you |
| Lakehouse | Cheap object storage (a data lake) plus transactional guarantees (Delta Lake) |
| Delta Lake | The table format that adds those guarantees on top of Parquet files |

## Check yourself

You're ready for Lesson 2 when you can explain, without looking: what
problem does the "lakehouse" idea solve that a plain data lake
doesn't?
