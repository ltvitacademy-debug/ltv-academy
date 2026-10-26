# Lesson 3 — Building the Orders Staging Model

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 3 of 16**

## What you'll learn

- How to declare `raw_orders` as a real dbt source
- Writing `stg_jaffle_shop__orders.sql` using the exact same staging
  pattern as `stg_jaffle_shop__customers`
- Which columns to rename, and which to leave alone
- How to confirm the model built correctly before moving on

## Step 1: declare the source

Just like `raw_customers` in the Beginner project, `raw_orders` gets
declared once in a `sources.yml` file, not hard-coded as a table name
anywhere in a model:

```yaml
version: 2

sources:
  - name: jaffle_shop
    schema: raw
    tables:
      - name: customers
      - name: orders
```

## Step 2: write the staging model

Same pattern, new table. A staging model's job is narrow: read from
exactly one source via `{{ source(...) }}`, rename columns to the
project's naming convention, and nothing else — no joins, no business
logic:

```sql
-- models/staging/stg_jaffle_shop__orders.sql
with source as (
    select * from {{ source('jaffle_shop', 'orders') }}
),
renamed as (
    select
        id as order_id,
        user_id as customer_id,
        order_date,
        status
    from source
)
select * from renamed
```

Two renames, nothing else: `id` → `order_id` (every staging model in
this project calls its primary key `<entity>_id`, same convention
`stg_jaffle_shop__customers` already follows) and `user_id` →
`customer_id` (so this model joins cleanly to the customers mart on a
matching column name — exactly the join Lesson 4 writes).

## Step 3: run it

```bash
dbt run --select stg_jaffle_shop__orders
```

A staging model is conventionally materialized as a `view` (set either
per-model or via a folder-level config in `dbt_project.yml`) — it's
cheap to query live rather than a table to store, since nothing
downstream needs it rebuilt as a physical table yet.

## Step 4: confirm it, don't assume it

Run a plain `select * from stg_jaffle_shop__orders limit 10` in
Snowflake. Confirm `order_id` and `customer_id` are populated, and that
`status` still shows the real values you recorded in Lesson 1's lab
(`placed`, `shipped`, `completed`, `returned`).

## Key terms

| Term | Meaning |
|---|---|
| `sources.yml` | Declares a raw table once, so models reference it by name instead of a hard-coded identifier |
| Staging convention | Rename to `<entity>_id`, no joins, no business logic — one source in, clean rows out |
| `{{ source(...) }}` | The function a staging model uses to read its one declared raw table |

## Lab

Write `stg_jaffle_shop__orders.sql` yourself, exactly as shown above,
run it, and confirm the output in Snowflake matches what you expect
from the raw table — same row count as `raw_orders`, with renamed
columns only.

## Check yourself

You're ready for Lesson 4 when `stg_jaffle_shop__orders` builds
cleanly and you can explain, in one sentence, why `user_id` was
renamed to `customer_id` specifically — not just "renamed."
