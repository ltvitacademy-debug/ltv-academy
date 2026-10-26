# Lesson 4 — Building an Intermediate Model

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 4 of 16**

## What you'll learn

- Why an intermediate model gets its own folder and naming convention
  (`int_` prefix) separate from staging and marts
- How to join two different `ref()`s — one to the Beginner project's
  customers mart, one to this chapter's new orders staging model
- What columns actually belong on this specific intermediate model,
  and what's deliberately left for later
- Why this model is not yet the one Finance or Ops will query

## The file, and why it's named this way

This project's convention — the same one real dbt projects widely
use — is `int_<entity>__<verb>ed.sql` for anything that sits between
staging and marts. This model joins orders to customers, so:

```sql
-- models/intermediate/int_orders__joined.sql
with orders as (
    select * from {{ ref('stg_jaffle_shop__orders') }}
),
customers as (
    select * from {{ ref('customers') }}
),
joined as (
    select
        orders.order_id,
        orders.customer_id,
        orders.order_date,
        orders.status,
        customers.first_name,
        customers.last_name
    from orders
    left join customers
        on orders.customer_id = customers.customer_id
)
select * from joined
```

Two `{{ ref(...) }}` calls, not `{{ source(...) }}` — this model reads
from *other models*, which is exactly what makes it intermediate
rather than staging. `ref('customers')` reaches back into the
Beginner project's already-built mart; `ref('stg_jaffle_shop__orders')`
reaches the staging model from Lesson 3.

## Why `left join`, specifically

Every order in `raw_orders` has a `customer_id`, and every customer
should already exist in the customers mart — but `left join` keeps
every order row even in the rare case a customer record is missing or
hasn't synced yet, instead of silently dropping orders. An `inner
join` here would make orders *disappear* from downstream totals
without any error — exactly the kind of silent data-loss bug this
course wants you watching for before it happens, not after.

## What's deliberately not here yet

No payments, no revenue total, no incremental materialization. This
model's only job is "orders, joined to who placed them." Payments join
in starting Lesson 6's incremental model, and that's also where the
real risk this chapter is building toward — a join that multiplies
rows instead of just adding columns — gets introduced on purpose, so
Lessons 13-15 can show you catching and fixing it for real.

## Key terms

| Term | Meaning |
|---|---|
| Intermediate model | Combines two or more staging/marts models via `ref()`, before anything reaches a marts model |
| `int_<entity>__<verb>ed` | The naming convention this project uses for intermediate models |
| `left join` | Keeps every row from the left table even without a match on the right — prevents silent row loss |

## Lab

Write `int_orders__joined.sql` yourself and run
`dbt run --select int_orders__joined`. Confirm its row count exactly
matches `stg_jaffle_shop__orders`'s row count — if it's lower, you
accidentally used an `inner join`.

## Check yourself

You're ready for Lesson 5 when you can explain why a mismatched row
count between this model and `stg_jaffle_shop__orders` would mean the
join type is wrong, not the data.
