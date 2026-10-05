# Lesson 4 — Tables, Volumes and Models · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lesson 4: tables, volumes, and models — what actually sits at the bottom of the hierarchy, inside a schema.

## S2 · SCREENSHOT — What lives inside a schema

Here's the volume level highlighted in Databricks' own object model. Volumes sit next to tables, views, and functions — governed the same way, but for files instead of rows.

## S3 · STEPS — Four object types

Four main object types live inside a schema. Tables hold structured, row-and-column data. Views are saved queries over one or more tables. Volumes govern non-tabular files — images, PDFs, raw CSVs. And functions, which include registered models — Unity Catalog treats a versioned ML model as a governed object just like a table.

## S4 · SCREENSHOT — Tables and models in context

Because tables, views, and models are all registered objects, Catalog Explorer can trace how they connect. This is a real Unity Catalog lineage graph: a governed table feeding two materialized views, which feed a further view downstream. Nothing gets traced unless it's a governed object first — that's the groundwork Chapter 4 builds on.

## S5 · SCREENSHOT — Tagging governed objects

Every object type here — tables, volumes, schemas, even individual columns — can carry governed tags: key/value metadata like pii or Marketing, used for classification and compliance tracking. Same tagging mechanism, every object type.

## S6 · CODE — Creating a table and a volume

Creating a table is the SQL you already know. Creating a volume is one more statement — CREATE VOLUME — and it's now a governed object in its own right, addressed the same catalog.schema.name way, with its own grantable privileges.

## S7 · OUTRO

Next lesson: managed versus external storage governance — who actually owns the data files sitting behind a table.
