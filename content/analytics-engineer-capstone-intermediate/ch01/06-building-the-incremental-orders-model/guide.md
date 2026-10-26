# Lesson 6 — Building the Incremental Orders Model

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 6 of 16**

## What you'll learn

- The real `materialized='incremental'` config and `is_incremental()`
  macro, applied to this project's own orders fact model
- How to bring payments into this model for the first time, and why
  that join matters for what comes later in this chapter
- What `unique_key` and the watermark column need to be for *this*
  specific model
- How to confirm an incremental model is actually behaving
  incrementally, not just "running without an error"

## The model, built the same way the dbt course already teaches it

This is the exact same `materialized='incremental'` /
`is_incremental()` idiom from this project's own earlier work on
incremental models — applied here to `fct_orders`, the model Finance
and Ops will both query:

```sql
-- models/marts/fct_orders.sql
{{
    config(
        materialized='incremental',
        unique_key='order_id',
    )
}}

with orders as (
    select * from {{ ref('int_orders__joined') }}
),
payments as (
    select * from {{ ref('stg_jaffle_shop__payments') }}
),
final as (
    select
        orders.order_id,
        orders.customer_id,
        orders.order_date,
        orders.status,
        payments.payment_method,
        payments.amount
    from orders
    left join payments
        on orders.order_id = payments.order_id
)
select * from final

{% if is_incremental() %}
    where order_date > (select max(order_date) from {{ this }})
{% endif %}
```

## Why `order_date` is this model's watermark

`order_date` plays the exact role the watermark column played in the
dbt course's own incremental-models lesson: it has to reliably
increase as new orders come in, and it has to actually be populated on
every row. `unique_key='order_id'` is set alongside it so a rerun
updates a row that changed instead of duplicating it.

## The payments join — note it, don't fix it yet

This is the first model to bring in `stg_jaffle_shop__payments`
(you're building that staging model now, for this join — same
pattern as Lesson 3's orders staging model, reading `raw_payments`
and renaming `id` to `payment_id`). Watch the row count after adding
this join. If it's larger than `int_orders__joined`'s row count,
something about this join isn't one-row-per-order — hold that
observation. Lessons 13-15 come back to exactly this.

## Confirming it's actually incremental

Running `dbt run --select fct_orders` twice and reading the logs
isn't enough on its own — check the actual row counts processed each
run:

```bash
dbt run --select fct_orders
dbt run --select fct_orders
```

The first run's log should show it processing every historical order.
The second run — with no new orders added — should show it processing
far fewer rows, ideally zero, because `is_incremental()` is now `true`
and nothing newer than the current max `order_date` exists yet.

## Key terms

| Term | Meaning |
|---|---|
| `fct_orders` | This project's final orders fact model — what Finance and Ops both query |
| `order_date` (watermark) | The reliably-increasing column this model's `is_incremental()` filter compares against |
| `stg_jaffle_shop__payments` | The new staging model this lesson introduces, built from `raw_payments` |

## Lab

Build `stg_jaffle_shop__payments.sql` (same pattern as Lesson 3), then
`fct_orders.sql` exactly as shown above. Run it twice in a row and
confirm the second run processes far fewer rows than the first.
Separately, compare `fct_orders`'s row count to `int_orders__joined`'s
row count — write down whether they match.

## Check yourself

You're ready for Lesson 7 when `fct_orders` builds incrementally and
you've recorded whether its row count matches `int_orders__joined`'s —
you'll need that exact comparison again in Lesson 14.
