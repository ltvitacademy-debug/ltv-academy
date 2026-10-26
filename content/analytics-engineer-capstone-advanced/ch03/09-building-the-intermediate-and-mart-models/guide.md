# Lesson 9 — Building the Intermediate and Mart Models

**Chapter 3 · Building the dbt Model Layer · Lesson 9 of 26**

## What you'll learn

- The real difference between a staging model, an intermediate model,
  and a mart — by job, not just by folder
- A real `int_orders__payment_summary` intermediate model, aggregating
  payments per order
- A real `customers` mart joining staging and intermediate models with
  `ref()`, computing lifetime value
- Why marts are the layer Power BI (Chapter 7) is actually allowed to
  touch

## Three layers, three jobs

| Layer | Job | Example |
|---|---|---|
| Staging | Rename/cast one raw source, 1:1 | `stg_jaffle_shop__orders` |
| Intermediate | Reusable aggregation/logic, not meant to be queried directly by BI | `int_orders__payment_summary` |
| Marts | The finished, business-facing model | `customers`, `orders` |

## The intermediate model: payment summary per order

```sql
-- models/intermediate/int_orders__payment_summary.sql
with payments as (
    select * from {{ ref('stg_jaffle_shop__payments') }}
)
select
    order_id,
    sum(amount) as total_amount_paid,
    count(payment_id) as payment_count
from payments
group by 1
```

This aggregation — "total paid per order" — gets used by more than
one downstream mart, which is exactly the case for pulling it out as
its own intermediate model instead of repeating the same `group by` in
every mart that needs it.

## The orders mart

```sql
-- models/marts/orders.sql
with orders as (
    select * from {{ ref('stg_jaffle_shop__orders') }}
),
payment_summary as (
    select * from {{ ref('int_orders__payment_summary') }}
)
select
    orders.order_id,
    orders.customer_id,
    orders.order_date,
    orders.status,
    coalesce(payment_summary.total_amount_paid, 0) as amount,
    coalesce(payment_summary.payment_count, 0) as payment_count
from orders
left join payment_summary using (order_id)
```

## The customers mart: lifetime value

```sql
-- models/marts/customers.sql
with customers as (
    select * from {{ ref('stg_jaffle_shop__customers') }}
),
orders as (
    select * from {{ ref('orders') }}
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

Notice `customers.sql` builds on `ref('orders')` — a mart referencing
another mart — not on the staging model directly. That's deliberate:
`orders` already resolved the payment aggregation once; `customers`
reuses that work instead of redoing it.

## Why this is the layer Power BI touches

`customers` and `orders` are exactly the two models that, once they
pass Chapter 4's tests and Chapter 6's CI gate, get built into the
`PROD` schema and connected to from Power BI in Chapter 7. Everything
below them — staging, intermediate — exists to make these two models
correct, not to be queried directly by a business tool.

## Key terms

| Term | Meaning |
|---|---|
| Intermediate model | Reusable aggregation/logic sitting between staging and marts, not meant for direct BI use |
| Mart | The finished, business-facing model — what Power BI actually connects to |
| Mart-on-mart `ref()` | A mart referencing another mart to reuse work already resolved there |

## Lab

1. Write `int_orders__payment_summary.sql` exactly as shown.
2. Write `orders.sql` and `customers.sql`, using `ref()` throughout —
   never a hardcoded table name.
3. Run `dbt build --select staging+ int_orders__payment_summary+ orders+ customers`
   (or simply `dbt build`) and confirm `customers.lifetime_value`
   matches a manual sum you compute directly against `raw_payments`
   for one customer.

## Check yourself

You're ready for Lesson 10 when you can explain the difference between
a staging model, an intermediate model, and a mart in one sentence
each, and your `customers` mart's lifetime value checks out by hand
for at least one real customer.
