# Lesson 12 — Tag Propagation · Voiceover script

Segments map 1:1 to slides. Target: ~2-3 minutes total.

## S1 · TITLE

Tagging one column at a time doesn't scale to a real schema. This lesson is about propagation — tagging and protection reaching objects you never named directly.

## S2 · CODE — Classify an entire schema

SYSTEM$CLASSIFY_SCHEMA runs classification against every table in a named schema, in one call. Name the schema once, and every table inside it gets processed.

## S3 · SCREENSHOT — One call, every table

Here's the result — a succeeded array listing every table the call touched: country, franchise, location, menu, order detail, and more. One statement reached all of them.

## S4 · CODE — Querying a table that was never named

Query the FRANCHISE table specifically — a table that was never mentioned anywhere in that SYSTEM$CLASSIFY_SCHEMA call.

## S5 · SCREENSHOT — Tags landed anyway

And there they are — system privacy-category tags on FRANCHISE's columns. It got tagged purely because it lives inside the schema that was targeted. That's propagation, made concrete.

## S6 · CODE — Where propagation stops

Propagation isn't unconditional, though. Tags follow a column through most DDL — a rename keeps the tag. But CREATE TABLE LIKE or CLONE do not copy tags from the source. A clone looks and queries exactly like the original, but its columns start out completely untagged — and therefore unprotected by any tag-driven policy.

## S7 · SCREENSHOT — Propagation through views

Propagation also works forward through the dependency graph — a tag-driven masking policy on a base table reaches every view built on it, with zero extra configuration on the view itself.

## S8 · OUTRO

Schema-wide tagging, dependency-graph propagation, and the clone caveat that catches people off guard. Next up: Snowflake's built-in automatic sensitive-data classification, in full.
