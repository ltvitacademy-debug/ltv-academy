# Lesson 23 — A Production Incident: A Broken Model Reaches CI

**Chapter 7 · The Power BI Layer, Incident, and Wrap-Up · Lesson 23 of 26**

## What you'll learn

- A real, concrete incident: a pull request that reintroduces a
  classic dbt mistake — a join fanout — into `customers.sql`
- Exactly what a join fanout is, and why it silently inflates numbers
  instead of causing an obvious error
- What this platform's CI pipeline (Chapter 6) actually shows when it
  catches this
- Why this incident never reaches `PROD`, and therefore never reaches
  Power BI

## The pull request

A well-meaning developer wants `customers.lifetime_value` to reflect
individual payment transactions, not just order totals, and opens a
pull request changing `customers.sql` to join directly against
`stg_jaffle_shop__payments` instead of going through
`int_orders__payment_summary`:

```sql
-- customers.sql, the broken version
with customers as (
    select * from {{ ref('stg_jaffle_shop__customers') }}
),
orders as (
    select * from {{ ref('stg_jaffle_shop__orders') }}
),
payments as (
    select * from {{ ref('stg_jaffle_shop__payments') }}
)
select
    customers.customer_id,
    customers.first_name,
    customers.last_name,
    count(orders.order_id) as number_of_orders,
    sum(payments.amount) as lifetime_value
from customers
left join orders using (customer_id)
left join payments using (order_id)   -- the mistake
group by 1, 2, 3
```

## What a join fanout actually is

`stg_jaffle_shop__payments` can have **more than one payment row per
order** (a customer who paid in two installments, for instance).
Joining `orders` to `payments` on `order_id` without aggregating
payments first means an order with two payments produces **two
joined rows instead of one** — and `count(orders.order_id)` and
`sum(payments.amount)` both get computed across that duplicated row
set. The result isn't an error. It's a *plausible-looking*,
silently-wrong number: `lifetime_value` and `number_of_orders` both
come out too high, by exactly the amount of fanout duplication, for
any customer whose orders had more than one payment each.

## Why this is a realistic mistake, not a contrived one

This is one of the most common real dbt mistakes — joining a
"many" table directly instead of aggregating it first, especially
when a developer is focused on "getting the right total" and not
thinking about the join's row-multiplying effect. It's exactly the
kind of change a reasonable, well-intentioned pull request can
contain.

## What CI shows

This pull request triggers Chapter 6's `ci.yml` automatically.
`dbt build` runs `customers`, then the existing `unique` test on
`customers.customer_id` (Chapter 4's pattern, applied to `customers`
the same way it's applied to `orders.order_id`) **fails** — because
any customer with more than one multi-payment order now has more than
one row in `customers`. The CI log shows exactly this:

```
Failure in test unique_customers_customer_id (models/marts/_marts__models.yml)
Got 14 results, configured to fail if != 0
```

The pull request's **Merge** button is disabled, per Lesson 21 — this
broken model never reaches `main`, never reaches `PROD`, and never
reaches Power BI.

## Key terms

| Term | Meaning |
|---|---|
| Join fanout | Joining to a table with multiple matching rows per key, without aggregating first, silently multiplying downstream rows |
| Silently wrong | A number that looks plausible but is systematically inflated, with no error thrown |
| `unique_customers_customer_id` | The existing test this incident's fanout actually trips, catching duplicate `customer_id` rows |

## Lab

1. Write out the broken `customers.sql` above and explain, in your
   own words, exactly why the join produces duplicate rows.
2. For a customer with two orders, one with one payment and one with
   two payments, work out by hand what `number_of_orders` and
   `lifetime_value` would incorrectly come out to versus the correct
   values.
3. Explain why `unique` on `customer_id` — not `non_negative` on
   `amount` — is the test that actually catches this specific mistake.

## Check yourself

You're ready for Lesson 24 when you can explain what a join fanout is
in your own words and why it produces a wrong-but-plausible number
instead of an obvious error.
