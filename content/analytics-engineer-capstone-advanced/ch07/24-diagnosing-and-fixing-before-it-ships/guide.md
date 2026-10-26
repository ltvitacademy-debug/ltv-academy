# Lesson 24 — Diagnosing and Fixing Before It Ships

**Chapter 7 · The Power BI Layer, Incident, and Wrap-Up · Lesson 24 of 26**

## What you'll learn

- How to use the failing test's own output as the real starting point
  for diagnosis, not a guess
- How the lineage graph (Lesson 14) helps confirm exactly where the
  fanout was introduced
- The real fix: routing `customers.sql` back through
  `int_orders__payment_summary` instead of joining `payments`
  directly
- How to confirm CI goes green and the fix is actually correct, not
  just passing

## Starting from the failing test's output, not a guess

Lesson 23's CI log already said exactly what's wrong:
`unique_customers_customer_id` failed with 14 duplicate rows. The real
diagnostic move isn't re-reading `customers.sql` from scratch — it's
querying the 14 actual duplicated customers directly:

```sql
select customer_id, count(*)
from jaffle_shop_db.ci.customers
group by 1
having count(*) > 1;
```

Picking one of those `customer_id` values and tracing its rows back
through the broken join confirms the diagnosis: that customer has an
order with two payments, and the join against `payments` produced two
rows for it.

## Confirming the cause with the lineage graph

Lesson 14's lineage graph (or a fresh `dbt docs generate`) shows
`customers` now has a direct edge to `stg_jaffle_shop__payments` — a
connection that didn't exist before this pull request, and that
bypasses `int_orders__payment_summary` entirely. That's visible proof
of exactly what changed, matching the diagnosis from the failing
test's output.

## The real fix

```sql
-- customers.sql, fixed
with customers as (
    select * from {{ ref('stg_jaffle_shop__customers') }}
),
orders as (
    select * from {{ ref('orders') }}   -- back through orders, as before
),
customer_orders as (
    select
        customer_id,
        min(order_date) as first_order_date,
        max(order_date) as most_recent_order_date,
        count(order_id) as number_of_orders,
        sum(amount) as lifetime_value
    from orders
    group by 1
)
select
    customers.customer_id,
    customers.first_name,
    customers.last_name,
    customer_orders.first_order_date,
    customer_orders.most_recent_order_date,
    coalesce(customer_orders.number_of_orders, 0) as number_of_orders,
    coalesce(customer_orders.lifetime_value, 0) as lifetime_value
from customers
left join customer_orders using (customer_id)
```

This is Lesson 9's original `customers.sql` — the fix is reverting to
routing through `orders` (which already resolved the payment
aggregation via `int_orders__payment_summary`), instead of joining
`payments` a second time, at a different grain, directly.

## Why this is the correct fix, not just a passing one

The developer's underlying goal — accurate `lifetime_value` — is
already satisfied by the original design: `int_orders__payment_summary`
already sums every payment per order, and `orders.amount` already
reflects that sum. Joining `payments` a second time didn't add
accuracy; it added a second, uncontrolled join at the wrong grain. The
fix isn't a workaround that happens to pass the test — it's recognizing
the original architecture already did this correctly.

## Confirming CI goes green

Pushing this fix as a new commit to the same pull request re-triggers
`ci.yml` automatically. `dbt build` runs again, `customers` builds
without duplicates, `unique_customers_customer_id` passes with `Got 0
results`, and Lesson 21's required status check clears — the Merge
button re-enables, and this change is now safe to reach `PROD`.

## Key terms

| Term | Meaning |
|---|---|
| Diagnosing from test output | Starting from the specific rows a failing test names, not re-reading code from scratch |
| Lineage confirmation | Using the generated dependency graph to visually confirm which edge changed |
| Correct fix vs. passing fix | A fix that addresses the real design problem, not one that merely satisfies the test |

## Lab

1. Write the query that finds the 14 duplicated `customer_id` values
   in the broken `ci` schema build.
2. Write the fixed `customers.sql`, and explain in one sentence why
   it's the same model Lesson 9 originally built.
3. Describe what the lineage graph looks like before and after this
   fix — which edge disappears.

## Check yourself

You're ready for Lesson 25 when you can diagnose a join fanout from a
failing `unique` test's output alone, and explain why the real fix was
reverting to the original architecture, not patching around the
symptom.
