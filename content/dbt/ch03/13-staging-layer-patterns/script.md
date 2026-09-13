# Script — Staging Layer Patterns

## Segment 1 (title)

The staging layer's job is narrow on purpose. It turns raw, source-shaped data into clean, renamed, correctly-typed building blocks — nothing more. Every raw source table gets referenced with source() exactly once, in exactly one staging model.

## Segment 2 (steps: what a staging model can do)

Four things a staging model is allowed to do: renaming columns into something consistent, type casting, basic computations like cents to dollars, and categorizing values with conditional logic. That's the entire job.

## Segment 3 (steps: what it must never do)

Two things are off-limits. No joins — that duplicates computation and confuses which model owns a row. No aggregations — a staging model has to preserve the exact grain of its source table, or every downstream model loses row-level detail it needed.

## Segment 4 (code: real stg_orders.sql)

This is dbt Labs' own published example. Source, then a renamed CTE — id becomes order_id, a cents-to-dollars macro, a date truncation. Notice what's missing: no join, no group by. Staging models are organized by source system and materialized as views, so downstream always gets fresh data.

## Segment 5 (outro)

Next lesson: Intermediate Models — the layer that does the joining staging models are never allowed to do.
