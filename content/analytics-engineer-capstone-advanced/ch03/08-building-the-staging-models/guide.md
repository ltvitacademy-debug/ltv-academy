# Lesson 8 — Building the Staging Models

**Chapter 3 · Building the dbt Model Layer · Lesson 8 of 26**

## What you'll learn

- The real SQL for all three staging models planned in Lesson 7
- How `{{ source(...) }}` and a CTE-per-raw-table pattern combine in a
  real staging model
- Where these files live under `models/staging/jaffle_shop/`, and why
  that folder structure matters
- How to confirm all three build cleanly with `dbt build --select staging`

## stg_jaffle_shop__customers.sql

```sql
-- models/staging/jaffle_shop/stg_jaffle_shop__customers.sql
with source as (
    select * from {{ source('jaffle_shop', 'raw_customers') }}
)
select
    id as customer_id,
    first_name,
    last_name
from source
```

## stg_jaffle_shop__orders.sql

```sql
-- models/staging/jaffle_shop/stg_jaffle_shop__orders.sql
with source as (
    select * from {{ source('jaffle_shop', 'raw_orders') }}
)
select
    id as order_id,
    user_id as customer_id,
    order_date,
    status
from source
```

## stg_jaffle_shop__payments.sql

```sql
-- models/staging/jaffle_shop/stg_jaffle_shop__payments.sql
with source as (
    select * from {{ source('jaffle_shop', 'raw_payments') }}
)
select
    id as payment_id,
    order_id,
    payment_method,
    amount
from source
```

Every one of these follows the exact same shape: one `source as (...)`
CTE, then a flat `select` that only renames and casts — no joins, no
aggregation, matching exactly what Lesson 7 planned.

## Where these files live, and why

```
models/
  staging/
    jaffle_shop/
      _jaffle_shop__sources.yml   <- Lesson 7
      stg_jaffle_shop__customers.sql
      stg_jaffle_shop__orders.sql
      stg_jaffle_shop__payments.sql
```

Grouping every model for one source under its own subfolder
(`staging/jaffle_shop/`) is what keeps a project navigable once it has
more than one source — a real pattern, not a cosmetic nesting choice.
When Chapter 5 adds a second raw source through the Python ingestion
script, its staging models get their own sibling folder, not mixed in
with `jaffle_shop`'s.

## Building and confirming

```
dbt build --select staging
```

This builds (and tests, once Chapter 4 adds any) every model under the
`staging` folder — all three at once, without touching anything in
`marts`. Confirm all three succeeded with a plain `SELECT ... LIMIT
10` against each resulting table in Snowflake, matching column names
against the plan from Lesson 7.

## Key terms

| Term | Meaning |
|---|---|
| `dbt build --select staging` | Builds (and tests) only models under the staging folder/selector |
| CTE-per-source pattern | Naming the first CTE `source` for readability — a convention, not a dbt requirement |
| Folder-per-source | Grouping all staging models for one raw source under their own subfolder |

## Lab

1. Write all three staging model `.sql` files exactly as shown above,
   saved under `models/staging/jaffle_shop/`.
2. Run `dbt build --select staging` and confirm all three build.
3. Run a `SELECT` against each resulting staged table in Snowflake and
   confirm the column names match Lesson 7's plan exactly.

## Check yourself

You're ready for Lesson 9 when all three staging models build cleanly
and you can explain, from memory, why none of them contain a join.
