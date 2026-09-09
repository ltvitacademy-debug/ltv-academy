# Lesson 38 — What Is Unity Catalog?

**Chapter 4 · Unity Catalog · Lesson 38 of 57**

## What you'll learn

- The gap Chapter 3's finale flagged: no governance, at all, over any table built so far
- Unity Catalog: one governance layer, across every workspace attached to it
- The real object hierarchy — metastore, catalog, schema, table
- What this chapter builds on top of everything already working

## The gap Chapter 3 left open

Lesson 37 ended by naming a real problem: `bronze.trips`,
`silver.trips`, and `gold.daily_revenue` all exist and work, but
nothing controls **who** can query them. Any user with workspace
access can read (or `MERGE` into) any of them. **Unity Catalog** is
Databricks' answer — a governance layer sitting on top of every
table this course has built, without changing how any of that
PySpark or SQL code actually works.

## The real object hierarchy

![Unity Catalog object hierarchy diagram, showing Catalogs at the top level under the metastore, containing Schemas, which in turn contain Tables, Views, Volumes, Functions, Models, Services, and Secrets.](/courses/databricks-delta/ch04/38-what-is-unity-catalog/object-hierarchy-data-objects.png)

*Unity Catalog's real object hierarchy, from Microsoft's own documentation.*

A **metastore** is the top-level container, scoped to one cloud
region — your organization typically has one per region, shared
across every workspace in that region. Within it, **catalogs**
organize data at the highest level (often by team or environment);
each catalog holds **schemas** (a familiar SQL concept — a
namespace, like `bronze` or `silver`); each schema holds the actual
**tables**, **views**, **volumes**, and other objects.

## One governance layer, many workspaces

Before Unity Catalog, permissions were often set per-workspace, with
no shared source of truth. A metastore attached to multiple
workspaces means a permission granted once applies everywhere that
metastore is attached — this course's earlier `bronze.trips` /
`silver.trips` / `gold.daily_revenue` naming already anticipated
this: those two-part names (`schema.table`) are about to become
Lesson 39's real three-part names (`catalog.schema.table`).

## What this chapter builds on top

Everything from Chapters 1–3 keeps working exactly as written.
Chapter 4 adds: the real three-level namespace (Lesson 39), creating
catalogs and schemas properly (Lesson 40), managed vs. external
tables (Lesson 41), `GRANT`/`REVOKE` access control (Lesson 42),
row/column-level security (Lesson 43), lineage tracking (Lesson 44),
volumes as DBFS's real replacement (Lesson 45), and Delta Sharing
(Lesson 46) — governance, layered on, not a rewrite.

## Key terms

| Term | Meaning |
|---|---|
| Metastore | The top-level container, scoped to one cloud region, shared across workspaces |
| Catalog | The first, highest organizing layer for data within a metastore |
| Schema | A namespace within a catalog — holds tables, views, volumes, functions |

## Check yourself

You're ready for Lesson 39 when you can explain, without looking: why
does attaching one metastore to multiple workspaces matter for how
permissions are managed?
