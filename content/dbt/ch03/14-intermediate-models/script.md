# Script — Intermediate Models

## Segment 1 (title)

A marts model that needs six staging models, three needing their own multi-step transformation first, becomes an unreadable pile of ten-plus joins if you build it directly. Intermediate models exist to prevent exactly that.

## Segment 2 (steps: three real jobs)

Intermediate models do three things: structural simplification, joining a handful of staging models before they reach a mart; re-graining, changing the level of detail, like fanning orders out to order items; and isolating complex logic so it's independently testable.

## Segment 3 (steps: narrow the DAG, widen the tables)

The design principle is narrow the DAG, widen the tables. Many staging models flowing into one intermediate model is the right shape. An intermediate model with many different outputs depending on it is a warning sign it's doing too much.

## Segment 4 (code: naming and materialization)

The naming convention is int_ entity_verb — int_order_items_summed_to_orders tells you the transformation without opening the file. And intermediate models default to ephemeral: interpolated into downstream queries, never built as their own warehouse object, never visible to a BI tool's table picker.

## Segment 5 (outro)

Next lesson: The Marts Layer — where all of this finally becomes something a business user actually queries.
