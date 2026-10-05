# Lesson 14 — The AWS Glue Data Catalog · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE CARD

The AWS Glue Data Catalog — AWS's central metadata repository, shared by Glue,
Athena, Redshift Spectrum, and EMR.

## S2 · SCREENSHOT (crawler running)

A crawler is the AWS equivalent of a Purview scan. It connects to a source, usually
S3, infers schema from the actual files, and writes or updates table definitions.

## S3 · SCREENSHOT (table schema, version 3)

The resulting table page shows the inferred schema and an S3 location — confirming
this is pure metadata pointing at data, not a copy of the data itself.

## S4 · SCREENSHOT (table schema, version 7, PII flagged)

Four crawler runs later, the same table's comments carry sensitive-data
classification — EMAIL and SSN flags written by an automated detection job.

## S5 · STEPS (database, table, crawler)

Three concepts: a database is just a namespace. A table is schema and location
metadata. A crawler is what keeps both of those current.

## S6 · OUTRO CARD

Next up: AWS Lake Formation — permissions layered directly on top of the catalog
you just saw.
