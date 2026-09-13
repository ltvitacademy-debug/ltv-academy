# Lesson 8 — Staging Models

**Chapter 2 · Sources, Models & ref() · Lesson 8 of 45**

## What you'll learn

- What a "staging model" is, and the one rule that defines the whole
  pattern
- What kind of cleanup belongs in a staging model — and what doesn't
- Real staging-model naming conventions (`stg_<source>__<table>`)
- Why almost every model you'll ever write sits *downstream* of a
  staging model, never directly on a source

## The one rule: 1:1 with a source, light cleanup only

A **staging model** is the very first model built on top of a
source — and it follows one strict rule: **one staging model per
source table, no joins, no aggregation.** Its only job is light
cleanup:

```sql
-- models/staging/jaffle_shop/stg_jaffle_shop__orders.sql
with source as (
    select * from {{ source('jaffle_shop', 'orders') }}
),
renamed as (
    select
        id as order_id,
        user_id as customer_id,
        order_date,
        status as order_status
    from source
)
select * from renamed
```

Compare that to the raw source it reads from — same number of rows,
same grain, just renamed columns and maybe a cast or two:

```sql
-- what {{ source('jaffle_shop', 'orders') }} actually is:
-- raw.jaffle_shop.orders(id, user_id, order_date, status)
-- (dbt didn't build this — it's declared, not modeled, per Lesson 7)
```

## What belongs in staging, and what doesn't

| Belongs in staging | Does NOT belong in staging |
|---|---|
| Renaming columns to consistent, readable names | Joining to another table |
| Type casting (e.g. string → date) | Aggregating (SUM, COUNT, GROUP BY) |
| Basic value cleanup (trimming, standardizing casing) | Business logic (e.g. "what counts as an active customer") |

If you find yourself joining two tables inside what you called a
staging model, it's not a staging model anymore — it's an
intermediate model (Chapter 3).

## Why this discipline matters

Every other model in a well-built dbt project references a staging
model via `ref()` — never a raw `source()` directly. That means:

- Column renames happen in exactly **one place**. If `user_id` needs
  to become `customer_id` everywhere, you fix it in the staging model
  once, not in every downstream model that touches orders.
- Every model downstream of staging can assume clean, consistently
  named, correctly typed columns — no defensive `CAST()`s scattered
  everywhere.

## Naming convention

The pattern you'll see in almost every real dbt project:
`stg_<source_name>__<table_name>` — two underscores between source
and table, one between words. `stg_jaffle_shop__orders`,
`stg_jaffle_shop__customers`. Chapter 3 covers the full naming
convention for every layer.

## Key terms

| Term | Meaning |
|---|---|
| Staging model | The first model layer: 1:1 with a source, light cleanup only |
| Grain | The level of detail one row represents — staging never changes it |
| `stg_<source>__<table>` | The standard naming pattern for staging models |

## Lab

1. Take the source you declared in Lesson 7's lab.
2. Write a staging model for it, following the 1:1 rule — rename at
   least one column, cast at least one type.
3. Write down one thing you were tempted to add (a join, an
   aggregation) that you correctly left out, and why it doesn't
   belong here.

## Check yourself

You're ready for Lesson 9 when you can explain the 1:1 rule for
staging models without hedging — and name one thing that instantly
disqualifies a model from being "staging."
