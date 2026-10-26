# Lesson 6 — Building the Staging Model

**Chapter 1 · Beginner Capstone: First dbt Model on Snowflake · Lesson 6 of 10**

## What you'll learn

- How to write this project's real staging model, `stg_jaffle_shop__customers.sql`
- How the 1:1-with-a-source rule from the prerequisite dbt course applies to this exact
  table
- What light cleanup looks like against the real three-column `raw_customers` shape
- How to run just this one model and confirm it built correctly

## The one rule, applied here

Lesson 2's plan named this file: one staging model, 1:1 with the `raw_customers` source,
light cleanup only — no joins, no aggregation, no business logic. That rule isn't
different for this project; it's the same rule from the dbt course, now written against
real data this project actually loaded.

## The real file

```sql
-- models/staging/jaffle_shop/stg_jaffle_shop__customers.sql
with source as (
    select * from {{ source('jaffle_shop', 'raw_customers') }}
),
renamed as (
    select
        id as customer_id,
        first_name,
        last_name
    from source
)
select * from renamed
```

Compare this to the raw source it reads from:

```sql
-- what {{ source('jaffle_shop', 'raw_customers') }} actually is:
-- jaffle_shop_raw.public.raw_customers(id, first_name, last_name)
-- (declared in Lesson 5, loaded in Lesson 3 — dbt didn't build this)
```

## What actually changed, and what didn't

Line up the two column lists and the whole lesson is visible in one glance:

| `raw_customers` (source) | `stg_jaffle_shop__customers` (staging) | What happened |
|---|---|---|
| `id` | `customer_id` | Renamed — `id` is ambiguous across a whole project; `customer_id` isn't |
| `first_name` | `first_name` | Unchanged — already a clear, readable name |
| `last_name` | `last_name` | Unchanged — already a clear, readable name |

Same row count, same grain, one row per customer in both — exactly the 1:1 rule in
practice. No join happened (there's nothing to join yet, with only one source table in
this project), no aggregation happened, and no business logic — like deciding what counts
as an "active" customer — appears anywhere in this file. That decision, if this project
needed one, would belong in the mart model (Lesson 8), never here.

## Why rename `id` to `customer_id` at all

This single rename is the clearest payoff of the staging layer. `id` means nothing on its
own — every table in a real project tends to have one. `customer_id` is unambiguous
anywhere it shows up downstream, including in the mart model's tests (Lesson 7) and the
mart model itself (Lesson 8). Making that rename here, once, means every model built on
top of this one inherits the clear name for free.

## Running it

```bash
dbt run --select stg_jaffle_shop__customers
```

A successful run reports one model built — `OK created ... stg_jaffle_shop__customers` —
the same output shape the prerequisite dbt course already taught you to read. Confirm it
with a plain query in Snowflake:

```sql
select * from jaffle_shop_capstone.dbt_yourname.stg_jaffle_shop__customers limit 10;
```

You should see the same rows as `raw_customers`, just with `id` now showing up as
`customer_id`.

## Key terms

| Term | Meaning |
|---|---|
| Staging model | The first model layer: 1:1 with a source, light cleanup only |
| 1:1 rule | Same grain, same row count as the source — only renaming/casting changes |
| `dbt run --select <model>` | Builds just the named model, instead of the whole project |

## Lab

1. Create `models/staging/jaffle_shop/stg_jaffle_shop__customers.sql` with the exact SQL
   above.
2. Run `dbt run --select stg_jaffle_shop__customers` and confirm a successful build.
3. Query the resulting table in Snowflake and confirm the row count matches
   `raw_customers` exactly — if it doesn't, something in the staging model broke the 1:1
   rule.

## Check yourself

You're ready for Lesson 7 when your own `stg_jaffle_shop__customers` model builds
successfully and you can point to exactly which column was renamed, and explain why that
single rename is worth doing even in a model this small.
