# Lesson 7 — Lakehouse and Warehouse Governance · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Chapter Two continues with the two main OneLake-backed item types: the lakehouse and the warehouse.

## S2 · STEPS — Lakehouse vs. warehouse

Both come from the same "New item" picker, and both are backed by OneLake. A lakehouse stores files and tables together, schema-on-read — flexible. A warehouse is a full T-SQL engine, schema-on-write — it enforces a defined structure.

## S3 · SCREENSHOT — New item picker, Lakehouse

Here's that picker filtered to "lake." Lakehouse: store big data for cleaning, querying, reporting, and sharing. One card among several storage options in the same place.

## S4 · SCREENSHOT — New item picker, Warehouse

The same picker's Store data section shows Warehouse and Sample warehouse side by side — a sample warehouse starts you off pre-loaded with data so you can see the real structure immediately.

## S5 · SCREENSHOT — Warehouse SQL editor, annotated

This is that sample warehouse's SQL editor. The Explorer tree shows Schemas, dbo, and a fixed set of tables — Date, Geography, Hackney, Medallion, Time, Trip, Weather. That's not a loose suggestion. That's the schema the warehouse enforces, the same for every consumer who queries it.

## S6 · STEPS — Which to steer a team toward

Both land their data in OneLake by default, and both inherit the workspace's roles — until you layer on OneLake security, which is Lesson 8, next. The real governance question here is who's consuming the data: flexibility for engineering, a guaranteed structure for BI.

## S7 · OUTRO

Next lesson: OneLake security — the fine-grained, item-level layer that sits on top of whatever the workspace role already grants.
