# Script — Staging Models

## Segment 1 (title)

A staging model is the very first model built on top of a source, and it follows one strict rule: one staging model per source table, no joins, no aggregation. Its only job is light cleanup.

## Segment 2 (steps: what belongs vs. doesn't)

Renaming columns to consistent names, type casting, basic value cleanup like trimming or standardizing casing — that's what belongs in staging. Joining to another table, aggregating, or any real business logic does not.

## Segment 3 (steps: why the discipline matters)

This discipline matters because every other model references a staging model, never a raw source directly. Column renames happen in exactly one place, and everything downstream can assume clean, consistently named, correctly typed columns.

## Segment 4 (code: naming convention)

The standard naming pattern is stg, then the source name, two underscores, then the table name — stg_jaffle_shop__orders, stg_jaffle_shop__customers. You'll see this exact pattern in almost every real dbt project.

## Segment 5 (outro)

Next lesson: The ref() Function — the mechanic that makes every one of these staging models buildable in the right order automatically.
