# Script — Incremental Models: Fundamentals

## Segment 1 (title)

A table materialization rebuilds a model from scratch every run — full history, every time. That stops being fine once a fact table has years of history and only a few thousand new rows since yesterday. Materialized incremental processes only new or changed rows instead.

## Segment 2 (code: the incremental model)

is_incremental() is false the first time this model runs — there's no existing table yet — so the whole select runs and builds the full table. Every run after that it's true, and the where clause activates: dbt only selects rows newer than the current maximum already sitting in the target table.

## Segment 3 (steps: the watermark parallel)

select max order_ts from this is the watermark pattern from Snowflake, except the watermark is the target table itself — no separate table to maintain, no step to remember to advance. This refers to the table this model builds, from inside its own SQL.

## Segment 4 (steps: what it needs)

Two things an incremental model needs that a table model doesn't: a unique_key, so dbt can tell an update from a brand-new row, and a reliable increasing column to filter on — playing the exact role the watermark column played in Snowflake.

## Segment 5 (outro)

Next lesson: Incremental Strategies — merge, delete+insert, and append — the specific ways dbt applies those new-or-changed rows once is_incremental() finds them.
