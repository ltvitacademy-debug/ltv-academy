# Lesson 3 — Catalogs and Schemas · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 3: catalogs and schemas — the two levels that sit directly below the metastore, and where the three-level namespace actually starts.

## S2 · STEPS — The first level

A catalog is the top level of the namespace. Most teams organize catalogs by environment — dev, staging, prod — or by business unit — finance, marketing, sales — whichever boundary matches how they want to separate access and billing. Every Unity Catalog workspace also gets an auto-created workspace catalog, sharing the workspace's own name, accessible to that workspace's users by default.

## S3 · SCREENSHOT — Drilling down

This is Catalog Explorer's tree, fully expanded. The catalog my_workspace expands to the schema default, which expands to Tables, which expands to the table department. That's the three-level namespace, drilled all the way down, one click at a time.

## S4 · SCREENSHOT — The catalog level

Zoomed out, here's the catalog level highlighted in Databricks' own object model — directly below the metastore, directly above schemas.

## S5 · SCREENSHOT — The schema level

And one level further down, the schema — the same concept SQL Server or Postgres calls a database, and what Databricks itself used to call a database before Unity Catalog. Every table, view, volume, and function lives inside one of these.

## S6 · CODE — Creating and navigating in SQL

Creating both levels is two statements: CREATE CATALOG, then CREATE SCHEMA inside it. USE CATALOG and USE SCHEMA set your session's defaults so you can reference a table without typing the full name every time — but its real, fully-qualified name is always catalog.schema.table.

## S7 · OUTRO

Next lesson: tables, volumes, and models — what actually lives inside a schema.
