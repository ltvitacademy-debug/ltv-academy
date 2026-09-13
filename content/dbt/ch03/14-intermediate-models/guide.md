# Lesson 14 — Intermediate Models

**Chapter 3 · Staging, Intermediate & Marts · Lesson 14 of 45**

## What you'll learn

- Why a middle layer exists between staging and marts at all
- The three real jobs intermediate models do: simplify structure,
  re-grain data, and isolate complex logic
- Why intermediate models default to **ephemeral** and stay out of BI
  tools entirely
- The `int_[entity]s_[verb]s.sql` naming convention and what it's
  meant to communicate

## Why not join straight from staging to marts?

Picture a marts model that needs data from six different staging
models, three of which each need their own multi-step transformation
before they're even joinable. Put all of that directly into one marts
model and you get a single file with ten-plus joins and buried logic
nobody can safely change. **Intermediate models** exist to prevent
that: they sit between staging and marts, each one doing one
purpose-built transformation step, so the marts layer only has to
combine a handful of already-clean pieces.

## The three real jobs of an intermediate model

- **Structural simplification** — join four to six staging models
  together *before* they reach a mart, instead of cramming every join
  into the final model. A mart that joins two or three intermediate
  models reads far more clearly than one that joins ten raw staging
  models.
- **Re-graining** — change the level of detail data lives at. Fanning
  an `orders` table out to the `order_items` grain (one row per line
  item instead of one row per order) is exactly this kind of step, and
  it deserves its own model rather than living inline inside a mart.
- **Isolating complex logic** — when a transformation is genuinely
  hard to get right, giving it its own model makes it independently
  testable and debuggable, instead of being an unreachable subquery
  buried three CTEs deep inside something else.

The guiding design principle dbt Labs states directly: **narrow the
DAG, widen the tables.** Multiple staging models flowing *into* one
intermediate model is exactly the shape you want. An intermediate
model with many outputs — lots of different downstream models
depending on it for different reasons — is a warning sign that it's
trying to do too many unrelated things at once.

## Naming and organization

Intermediate models are organized by **business grouping**
(`intermediate/finance/`, `intermediate/marketing/`), the opposite of
staging's organize-by-source-system rule — because by this layer,
data has started to mean something to the business, not just to the
system it came from.

The naming convention is `int_[entity]s_[verb]s.sql`, using a verb
that says exactly what happened: `int_order_items_summed_to_orders`,
`int_customers_pivoted`. Read the name and you already know the
transformation, without opening the file.

## Ephemeral by default, invisible to BI tools

Intermediate models default to **ephemeral** materialization — dbt
interpolates them directly into whatever references them at query
time, so they never actually get built as their own object in the
warehouse. That keeps clutter out of the database and keeps them from
ever being an option in a BI tool's table picker, which is exactly
where they should stay: intermediate models are never meant to be
queried directly by an analyst or a dashboard. (For larger projects
where ephemeral models get hard to debug, a view in a dedicated,
non-production schema is the documented alternative — still invisible
to BI tools, but queryable directly when troubleshooting.)

## Key terms

| Term | Meaning |
|---|---|
| Intermediate model | A purpose-built transformation step between staging and marts — not exposed to BI tools |
| Re-graining | Changing the level of detail data lives at (e.g., orders to order line items) |
| `int_` prefix | Naming convention: `int_[entity]s_[verb]s.sql`, verb-first so the transformation is obvious from the name |
| Ephemeral materialization | Default for intermediate models — interpolated into downstream queries, never built as its own warehouse object |

## Lab

1. Take two staging models from the same business area (for example,
   `stg_orders` and `stg_order_items`).
2. Build an intermediate model that joins them and re-grains to
   whatever level a downstream mart will need.
3. Name it following `int_[entity]s_[verb]s.sql`, and leave its
   materialization at the ephemeral default.

## Check yourself

You're ready for Lesson 15 when you can explain, in one sentence, why
"narrow the DAG, widen the tables" is the design principle behind the
intermediate layer — and what it would look like to violate it.
