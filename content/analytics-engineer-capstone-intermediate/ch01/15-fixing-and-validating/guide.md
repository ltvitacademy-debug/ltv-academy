# Lesson 15 — Fixing and Validating

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 15 of 16**

## What you'll learn

- The real, standard dbt fix for a join fanout: aggregate before you
  join, not after
- Exactly where that fix belongs — a new staging-adjacent model, not
  a patch inside `fct_orders`
- How to re-run and re-test after the fix, and what "fixed" actually
  looks like in both dbt and Power BI
- Why this fix also makes the model more correct for Finance, not
  just test-passing

## The fix: one row per order, before the join

The standard fix for exactly this shape of bug is to pre-aggregate the
many-side of the join down to one row per key, *before* joining —
turning a one-to-many relationship into the one-to-one one the join
was always written to assume:

```sql
-- models/intermediate/int_payments__aggregated.sql
with payments as (
    select * from {{ ref('stg_jaffle_shop__payments') }}
),
aggregated as (
    select
        order_id,
        sum(amount) as amount,
        -- one row per order needs one payment_method value;
        -- this project keeps the method from the largest single payment
        max_by(payment_method, amount) as payment_method
    from payments
    group by order_id
)
select * from aggregated
```

`sum(amount)` correctly combines a split payment's two amounts into
the order's real total — which is also, on reflection, what Finance
actually wanted all along: one true revenue figure per order, not two
partial ones.

## Updating `fct_orders` to use it

```sql
-- models/marts/fct_orders.sql (payments CTE, updated)
payments as (
    select * from {{ ref('int_payments__aggregated') }}
),
```

Everything else about `fct_orders` — its `is_incremental()` block,
its `unique_key`, the rest of its columns — stays exactly as it was.
Only the source of the payments CTE changes, from the raw
one-row-per-payment staging model to the new one-row-per-order
aggregate.

## Re-running and re-validating

```bash
dbt run --full-refresh --select int_payments__aggregated fct_orders
dbt test --select fct_orders
```

A `--full-refresh` here is deliberate, not optional — `fct_orders`'s
existing incremental data already has the duplicated rows baked in
from before the fix, and `is_incremental()`'s usual filtering would
leave that old, bad data sitting in the table untouched. A full
refresh re-derives every row under the corrected join, the same fix
this project's own incremental-gotchas lesson already named for
exactly this situation.

## Confirming it in Power BI

Refresh both Power BI reports. Lesson 11's `[Total Revenue]` should
now match the direct Snowflake `sum(amount)` check exactly, and
Lesson 12's `[Order Count]` — already protected by `DISTINCTCOUNT` —
should be unchanged, since it was never actually wrong.

## Key terms

| Term | Meaning |
|---|---|
| Pre-aggregate before joining | The standard dbt fix for a fanout: collapse the many-side to one row per key first |
| `--full-refresh` | Required here because existing incremental data already has the bad fanout baked in |
| `max_by` | Returns a value from the row with the maximum of another column — used here to pick one payment_method |

## Lab

Build `int_payments__aggregated.sql`, update `fct_orders` to reference
it, run `dbt run --full-refresh` on both, then `dbt test --select
fct_orders` and confirm the `unique` test now passes with zero
failures. Refresh both Power BI reports and confirm `[Total Revenue]`
matches the Snowflake check.

## Check yourself

You're ready for Lesson 16 when the `unique` test on `order_id` passes
and you can explain why a plain `dbt run` (without `--full-refresh`)
would **not** have fully fixed this, even after the join itself was
corrected.
