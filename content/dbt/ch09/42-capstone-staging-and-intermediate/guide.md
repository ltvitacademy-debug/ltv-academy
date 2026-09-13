# Lesson 42 — Capstone: Staging & Intermediate Models

**Chapter 9 · Capstone · Lesson 42 of 45**

## What you'll build

Milestone 1 of the capstone: your raw sources actually declared to
dbt, a staging model per source, and at least one intermediate model
combining them. Nothing here is new technique — it's Chapter 2 and
Chapter 3's patterns, applied to sources you chose instead of a guided
example.

## Declare your sources

Before any model can `ref()` anything, dbt needs to know the raw
tables exist. One `sources.yml`, one entry per raw table, with a
freshness check on at least one:

```yaml
# models/staging/sources.yml
version: 2

sources:
  - name: raw
    schema: raw
    tables:
      - name: sqlserver_orders
        loaded_at_field: _loaded_at
        freshness:
          warn_after: {count: 12, period: hour}
          error_after: {count: 24, period: hour}
      - name: customers
      - name: product_catalog
      - name: json_feed
```

Adjust the schema name and table names to whatever your raw layer
actually calls them — the pattern (one `sources.yml`, one entry per
raw table, at least one freshness check) is what matters, not these
exact names.

## Build a staging model per source

Each staging model is a thin, 1:1 wrapper over one raw table: typed
columns, renamed to your project's naming convention, nothing joined
in yet (Ch. 3):

```sql
-- models/staging/stg_orders.sql
with source as (
  select * from {{ source('raw', 'sqlserver_orders') }}
),
renamed as (
  select
    order_id,
    customer_id,
    product_id,
    cast(order_date as date)        as order_date,
    cast(quantity as integer)       as quantity,
    cast(unit_price as numeric(10,2)) as unit_price
  from source
  where order_id is not null
)
select * from renamed
```

```sql
-- models/staging/stg_products.sql
with source as (
  select * from {{ source('raw', 'product_catalog') }}
)
select
  product_id,
  product_name,
  category,
  cast(list_price as numeric(10,2)) as list_price
from source
where product_id is not null
```

The JSON source gets the same treatment, but the flattening happens
inside the staging model instead of before it — dbt owns this step
now, not a one-off SQL script:

```sql
-- models/staging/stg_events.sql
with source as (
  select * from {{ source('raw', 'json_feed') }}
),
flattened as (
  select
    raw_data:event_id::string      as event_id,
    raw_data:customer_id::string   as customer_id,
    raw_data:event_type::string    as event_type,
    raw_data:timestamp::timestamp_ntz as event_ts
  from source
)
select * from flattened
```

Every staging model is `ref()`-able from here on — no other model in
this project should ever query `{{ source(...) }}` directly except
these.

## Build an intermediate model

The first thing that combines two or more staging models before
anything reaches the marts layer (Ch. 3) — here, order lines get their
product's category and price attached:

```sql
-- models/intermediate/int_orders_enriched.sql
with orders as (
  select * from {{ ref('stg_orders') }}
),
products as (
  select * from {{ ref('stg_products') }}
)
select
  orders.order_id,
  orders.customer_id,
  orders.order_date,
  orders.quantity,
  orders.unit_price,
  products.product_name,
  products.category,
  orders.quantity * orders.unit_price as extended_amount
from orders
left join products
  on orders.product_id = products.product_id
```

Notice this model isn't "final" — it's not a fact table yet, it has no
surrogate keys, and nothing outside this project should query it
directly. That's exactly what makes it intermediate rather than a
mart: it exists to make the marts-layer models simpler, not to be an
endpoint itself.

## Key terms

| Term | Meaning |
|---|---|
| `sources.yml` | Declares raw tables to dbt so models can `ref()` through `source()`, with optional freshness checks |
| Staging model | A thin, typed, 1:1 wrapper over one raw source — the only layer allowed to query `source()` |
| Intermediate model | Combines two or more staging models; not queried directly outside the project |

## Lab

1. Write a `sources.yml` for your three (or more) raw tables, with a
   freshness check on at least one, and confirm `dbt source freshness`
   runs against it.
2. Build one staging model per raw source, each with real typed
   columns and a `where ... is not null` filter on its key column.
3. Build at least one intermediate model joining two staging models,
   and run `dbt run --select stg_orders+` (or your model's name) to
   confirm the whole chain builds in order.

## Check yourself

You're ready for Lesson 43 when `dbt build` runs your staging and
intermediate models cleanly end to end, and you can point to the exact
join in your intermediate model that neither staging model could
answer alone.
