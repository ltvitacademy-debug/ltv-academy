# Lesson 18 — System Tables and Auditing · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Lineage and classification results both live in the same place — a built-in catalog holding your entire account's operational history.

## S2 · STEPS — The system catalog

Every Unity Catalog metastore includes a built-in catalog called system — Databricks' own hosted store of security events, billing, compute history, job runs, and lineage. It's read-only and free to query; you only pay for the compute that runs the query, not the data itself.

## S3 · CODE — Granting access

System is governed by Unity Catalog exactly like any other catalog — admins get it by default, but everyone else needs an explicit grant. Same USE CATALOG, USE SCHEMA, SELECT pattern you already know, just pointed at a new source of data.

## S4 · CODE — A real cross-cutting query

Because it's ordinary SQL, you can ask governance and cost questions in one query. This breaks down the last 30 days of usage by product — including DATA_CLASSIFICATION and JOBS — straight from the same catalog that holds the audit trail.

## S5 · STEPS — A few things to know

Schemas can gain new columns at any time without notice, so don't hardcode assumptions. Unfiltered queries against a large system table get rejected outright, not just slowed down — always filter on a date column. And audit data is regional for workspace events, global only at the account level.

## S6 · OUTRO

Next lesson: audit logs specifically — the real schema of system.access.audit, and the queries a governance team actually runs against it.
