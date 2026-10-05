# Lesson 1 — What Unity Catalog Is · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Welcome to Databricks Unity Catalog Governance. We'll start with the basics: what Unity Catalog actually is, and the problem it was built to solve.

## S2 · STEPS — The problem it solves

Before Unity Catalog, permissions, audit logs, and lineage in Databricks were all set per workspace. Ten workspaces meant ten separate places to manage access, with no single answer to who can see a given table anywhere in the company. Unity Catalog replaces that with one governance layer, defined once on a central metastore, enforced everywhere that object is accessible — one workspace or twenty.

## S3 · SCREENSHOT — Catalog Explorer

This is Catalog Explorer, the workspace UI for Unity Catalog. Click Catalog in the left sidebar and you land here: catalogs on the left, expandable down to schemas and tables, with details and actions on the right. Every governed object follows the same three-level namespace — catalog, schema, table.

## S4 · SCREENSHOT — Everything it governs

This is Databricks' own object-hierarchy diagram. Below the metastore sit catalogs, connections, shares, and credentials. Below each catalog sits a schema, and below each schema sit tables, views, volumes for non-tabular files, functions, and even registered machine learning models. Chapter 1 is about everything under Catalog.

## S5 · SCREENSHOT — A capability you get for free

Because every table is registered with Unity Catalog instead of scattered across ad hoc storage paths, Catalog Explorer can automatically surface relationships between governed tables from their declared primary and foreign keys — no one has to draw this diagram by hand.

## S6 · STEPS — Why it matters

Centralizing governance in one metastore is what makes the rest of this course possible. Fine-grained security in Chapter 3, lineage and auditing in Chapter 4, and Delta Sharing in Chapter 5 all depend on objects being registered in Unity Catalog in the first place.

## S7 · OUTRO

Next lesson: metastores — the top-level container every catalog in Unity Catalog actually lives on.
