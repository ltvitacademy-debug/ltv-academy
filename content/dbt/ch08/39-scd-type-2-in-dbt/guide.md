# Lesson 39 — SCD Type 2 in dbt

**Chapter 8 · Semantic Layer & Advanced Patterns · Lesson 39 of 45**

## What you'll learn

- This lesson does **not** re-teach snapshots — Lesson 24 already
  covered `dbt_valid_from`/`dbt_valid_to` and the `timestamp`/`check`
  strategies. This is about *using* that history.
- The as-of join: giving a fact table the dimension value that was
  true *at the time of the transaction*, not the value today
- Why joining a fact table straight to a snapshot without effective
  dating silently multiplies every fact row
- Building a "current-only" view on top of a snapshot for the common
  case where history isn't needed

## The mistake this lesson exists to prevent

`customers_snapshot` (from Lesson 24) has multiple rows per
`customer_id` — one per historical version. Join `fct_orders` straight
to it on `customer_id` alone, with no effective-dating condition, and
every order fans out to match *every* historical version of that
customer. An order gets duplicated three times if the customer has
three captured versions — a silent, easy-to-miss correctness bug.

```sql
-- WRONG: multiplies every order by every historical version
select o.order_id, o.order_total, c.region
from {{ ref('fct_orders') }} o
join {{ ref('customers_snapshot') }} c
  on o.customer_id = c.customer_id
```

## The fix: the as-of join

The correct join adds the effective-dating condition — match the
snapshot version whose valid window actually contains the order's
timestamp:

```sql
-- models/marts/fct_orders_with_region_as_of_order.sql
select
    o.order_id,
    o.order_date,
    o.order_total,
    c.region as region_at_time_of_order
from {{ ref('fct_orders') }} o
join {{ ref('customers_snapshot') }} c
  on o.customer_id = c.customer_id
 and o.order_date >= c.dbt_valid_from
 and (o.order_date < c.dbt_valid_to or c.dbt_valid_to is null)
```

This is the entire point of capturing history in the first place: an
order placed in March, before a customer moved regions in June, still
reports against the *March* region — the region that was actually
true when the sale happened. Reporting against `region_at_time_of_order`
instead of the customer's current region is what makes "revenue by
region, historically" an honest number instead of one that silently
rewrites the past every time a customer's attributes change.

## The common case: you only want the current version

Most marts models don't need history at all — they need "the
customer's attributes right now," same as any ordinary dimension.
Rather than repeating the `dbt_valid_to is null` filter in every
downstream model, build one small model that does it once:

```sql
-- models/marts/dim_customers_current.sql
select *
from {{ ref('customers_snapshot') }}
where dbt_valid_to is null
```

Every other model that just wants "today's customer attributes" joins
to `dim_customers_current` like an ordinary dimension table — simple,
fast, and with the history-handling logic written exactly once.

## Key terms

| Term | Meaning |
|---|---|
| As-of join | A join with an added effective-dating condition, matching the version true at a specific point in time |
| `region_at_time_of_order` | An example of an attribute captured *as of the transaction*, not as of today |
| Current-only view | A model filtering a snapshot down to `dbt_valid_to is null`, for the common "just give me today's value" case |

## Lab

1. Using Lesson 24's `customers_snapshot`, write the "WRONG" join above
   against your own `fct_orders`-equivalent model and count the
   resulting rows.
2. Rewrite it as an as-of join and confirm the row count now matches
   the original fact table exactly, one row per order.
3. Build a `dim_customers_current` model filtering to
   `dbt_valid_to is null`, and rewrite one existing "current attributes
   only" join to use it instead of the raw snapshot.

## Check yourself

You're ready for Lesson 40 when you can explain, without looking it
up, why joining a fact table directly to a snapshot without an
effective-dating condition silently multiplies rows — and what
condition fixes it.
