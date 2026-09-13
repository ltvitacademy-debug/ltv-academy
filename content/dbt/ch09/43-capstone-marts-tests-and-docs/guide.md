# Lesson 43 — Capstone: Marts, Tests & Documentation

**Chapter 9 · Capstone · Lesson 43 of 45**

## What you'll build

Milestone 2: your intermediate model from Lesson 42 becomes a real
marts layer — a fact table and a dimension with real history — backed
by generic and singular tests, and documented well enough that
`dbt docs generate` produces something a stranger could actually read.
Chapters 3, 4, and 5, applied to your project.

## Build the dimension, with real history

`dim_customers` isn't just a renamed staging model — it's built on top
of a snapshot (Ch. 5) so a customer's changing attributes (a segment,
a region) keep their history instead of being silently overwritten:

```sql
-- snapshots/customers_snapshot.sql
{% snapshot customers_snapshot %}
{{
  config(
    target_schema='snapshots',
    unique_key='customer_id',
    strategy='timestamp',
    updated_at='updated_at',
  )
}}
select * from {{ source('raw', 'customers') }}
{% endsnapshot %}
```

```sql
-- models/marts/dim_customers.sql
select
  {{ dbt_utils.generate_surrogate_key(['customer_id']) }} as customer_key,
  customer_id,
  customer_name,
  segment,
  dbt_valid_from  as effective_date,
  dbt_valid_to    as end_date,
  dbt_valid_to is null as is_current
from {{ ref('customers_snapshot') }}
```

`dbt_valid_from`/`dbt_valid_to` are columns the snapshot generates
automatically — that's the SCD Type 2 mechanism Chapter 5 taught,
now doing the work a hand-written `MERGE` did in the Snowflake
capstone.

## Build the fact table, incrementally

`fct_orders` is the final thing anything downstream is allowed to
query — built from the intermediate model, joined to the dimension's
surrogate key, and materialized as `incremental` so a full rebuild
isn't required on every run (Ch. 5):

```sql
-- models/marts/fct_orders.sql
{{
  config(
    materialized='incremental',
    unique_key='order_id',
    incremental_strategy='merge',
  )
}}
select
  o.order_id,
  c.customer_key,
  o.order_date,
  o.quantity,
  o.unit_price,
  o.extended_amount,
  o.category
from {{ ref('int_orders_enriched') }} o
left join {{ ref('dim_customers') }} c
  on o.customer_id = c.customer_id and c.is_current
{% if is_incremental() %}
where o.order_date > (select max(order_date) from {{ this }})
{% endif %}
```

## Test it

Generic tests on the columns that actually matter — the surrogate key
and the join — plus one singular test encoding a rule generic tests
can't express (Ch. 4):

```yaml
# models/marts/schema.yml
version: 2

models:
  - name: dim_customers
    description: "One row per customer per period of history (SCD Type 2)."
    columns:
      - name: customer_key
        description: "Surrogate key fct_orders joins on."
        tests: [unique, not_null]
      - name: customer_id
        description: "Natural/business key from the source system."
        tests: [not_null]

  - name: fct_orders
    description: "One row per order line, at the grain of a single product on a single order."
    columns:
      - name: order_id
        tests: [unique, not_null]
      - name: customer_key
        tests:
          - not_null
          - relationships:
              to: ref('dim_customers')
              field: customer_key
```

```sql
-- tests/assert_fct_orders_amount_not_negative.sql
-- A singular test: fails if it returns any rows.
select order_id, extended_amount
from {{ ref('fct_orders') }}
where extended_amount < 0
```

## Document it

Every mart-layer model and column above already has a `description` —
that's what makes `dbt docs generate` produce something real instead
of a lineage graph full of blank tooltips. Run it, and open the site:

```bash
dbt docs generate
dbt docs serve
```

Confirm two things in the generated site: the Lineage graph actually
shows `stg_orders` → `int_orders_enriched` → `fct_orders`, and clicking
into `fct_orders` shows the descriptions you just wrote, not a blank
page.

## Key terms

| Term | Meaning |
|---|---|
| Snapshot | Captures row-level history over time; generates `dbt_valid_from`/`dbt_valid_to` for SCD Type 2 |
| Incremental model | Only processes new/changed rows after the first run, instead of a full rebuild every time |
| Singular test | A one-off SQL query encoding a business rule; fails the build if it returns any rows |

## Lab

1. Build `dim_customers` on top of a real snapshot, and confirm at
   least one row shows `is_current = false` after you update a test
   customer's segment and re-run the snapshot.
2. Build `fct_orders` as `incremental`, and confirm a second `dbt run`
   only processes new rows (check `dbt run` output or your warehouse's
   query history).
3. Add the generic tests above plus your own singular test, run
   `dbt test`, and fix any failure before moving on.
4. Run `dbt docs generate` and `dbt docs serve`, and confirm the
   lineage graph and descriptions actually render.

## Check yourself

You're ready for Lesson 44 when `dbt build` and `dbt test` both pass
clean, your generated docs site shows a real lineage graph with real
descriptions, and you can point to the exact row your singular test
would have caught if you introduced a negative amount.
