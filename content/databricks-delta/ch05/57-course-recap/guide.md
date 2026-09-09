# Lesson 57 — Course Recap — From Storage to Orchestrated Pipelines

**Chapter 5 · Lakeflow · Lesson 57 of 57 — Course Finale**

## What you'll learn

- Every chapter of this course, in one line each
- One NYC Taxi record, traced through all five chapters at once
- How this course connects back to Data Engineering Foundations
- What's ahead: courses 3 and 4 of this Data Engineering track

## This course, in five lines

1. **Databricks Fundamentals** — workspaces, clusters, notebooks, jobs: the actual platform Foundations' Spark code runs on.
2. **Delta Lake** — Parquet plus a transaction log: real ACID transactions, schema enforcement, time travel, safe `MERGE`.
3. **Medallion Architecture** — bronze/silver/gold, Foundations' zones made concrete, with streaming, late-data correction, and quality checks.
4. **Unity Catalog** — governance: the real three-level namespace, access control, lineage, and volumes.
5. **Lakeflow** — the same pipeline, declared instead of imperatively wired, with data-quality rules built in.

## One record, five chapters

A single NYC Taxi trip: a person opens a **notebook** (Ch1), attached
to a **cluster**, that reads a CSV via **Autoloader**. It lands in a
**Delta table** (Ch2) — real transaction log, real schema
enforcement. A **`@dlt.table`** function (Ch5) casts and deduplicates
it into silver, its **`@dlt.expect`** rule confirming the fare is
valid, following the exact **bronze→silver→gold** flow (Ch3) this
course established early. The table it lands in lives inside a real
**catalog and schema** (Ch4), governed by a `GRANT` an
`analytics-team` group holds, its full history traceable through
automatic **lineage**. One record, every chapter, working together.

## Back to where this started

Foundations ended with PySpark DataFrames and partitioned Parquet
writes, with no real platform underneath them named yet. This course
named that platform, gave its storage format real guarantees,
organized it into a real architecture, governed who can see it, and
finally gave the whole thing a declarative way to express itself.
Nothing from Foundations was replaced — every `select()`, `filter()`,
`groupBy()`, and window function from that course still works,
unchanged, inside a `@dlt.table` function today.

## What's ahead

This is course 2 of a 4-course Data Engineering track. Course 3,
**Microsoft Fabric & Real-Time Analytics**, and course 4, **Data
Engineering Career & Capstone**, build on everything from both
Foundations and this course — Fabric's own lakehouse concepts, in
particular, will feel immediately familiar after everything covered
here.

## Congratulations

You've completed **Azure Databricks & Delta Lake** — 57 lessons,
five chapters, one continuous NYC Taxi pipeline, from a bare
workspace to a governed, declarative, production-shaped system.

## Check yourself

Course complete when you can trace one NYC Taxi record through all
five chapters of this course, naming which chapter's concept applies
at each step.
