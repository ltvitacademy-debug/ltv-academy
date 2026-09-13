# Lesson 2 — dbt Fundamentals: What Problem Does It Solve?

**Chapter 1 · Analytics Engineering & dbt Fundamentals · Lesson 2 of 45**

## What you'll learn

- What a real transformation looked like *before* dbt existed — as an
  untested, hand-run SQL script
- What that exact same transformation looks like *after* dbt — as a
  model
- What actually changed underneath, beyond just "the SQL moved files"
- Why "just write SQL scripts" breaks down as a warehouse grows

## Before dbt: a transformation as a script

Say you need a `customer_orders` table: one row per customer, with
their first order date, most recent order date, and order count.
Before dbt, this typically lived as a `.sql` file someone ran by hand,
or a stored procedure, or logic buried inside a BI tool's data source:

```sql
-- customer_orders.sql — run by hand, or via a cron job, or a
-- scheduled stored procedure. Nobody enforces any of this.
CREATE OR REPLACE TABLE analytics.customer_orders AS
WITH orders AS (
    SELECT customer_id, order_date, status
    FROM raw.jaffle_shop.orders
),
customer_orders AS (
    SELECT
        customer_id,
        MIN(order_date) AS first_order_date,
        MAX(order_date) AS most_recent_order_date,
        COUNT(order_id) AS number_of_orders
    FROM orders
    GROUP BY 1
)
SELECT * FROM customer_orders;
```

This works — right up until it doesn't. Nothing checks that
`customer_id` is never null. Nothing documents what "status" means.
Nothing guarantees `raw.jaffle_shop.orders` exists yet when this runs.
If two people edit competing copies of this script, there's no
history of who changed what, or why. This is the "pile of untested,
undocumented SQL scripts" the previous lesson described.

## After dbt: the same transformation as a model

The exact same SQL logic, as a dbt model (`models/marts/customer_orders.sql`):

```sql
-- models/marts/customer_orders.sql
with orders as (
    select customer_id, order_date, status
    from {{ ref('stg_orders') }}
),
customer_orders as (
    select
        customer_id,
        min(order_date) as first_order_date,
        max(order_date) as most_recent_order_date,
        count(order_id) as number_of_orders
    from orders
    group by 1
)
select * from customer_orders
```

Nothing about the SQL logic changed. What changed is everything
*around* it: this file lives in version control, `ref('stg_orders')`
replaces the hardcoded table name, and a companion `schema.yml` file
(covered in Chapter 4) can assert `customer_id` is never null — and
dbt will fail the run, loudly, the moment that stops being true.

## What actually changed underneath

- **The table name became a function call.** `raw.jaffle_shop.orders`
  became `{{ ref('stg_orders') }}` — dbt resolves that to the right
  table in the right environment (dev vs. prod) automatically.
- **Order of execution stopped being your problem.** dbt reads every
  `ref()` in the whole project and builds a dependency graph, then
  runs everything in the only order that makes sense.
- **The file itself became testable and documentable**, without
  touching the SQL — assertions and descriptions live in a separate
  YAML file next to it (Chapter 4).
- **A single command (`dbt run`) replaced "someone remembers to run
  the script."**

## Why raw scripts don't scale

One untested script is manageable. A few hundred interdependent
scripts, each hardcoding table names, with no record of which ran
successfully last night, is not — and that's the normal state of a
company's analytics after a few years without something like dbt.

## Key terms

| Term | Meaning |
|---|---|
| Model | A dbt-managed `.sql` file — one transformation step, built via `dbt run` |
| `ref()` | The function that replaces a hardcoded table name with a reference to another model |
| Dependency graph | The order dbt computes automatically from every `ref()` in the project |

## Lab

1. Take a SQL script you've written before (from the T-SQL course, or
   anywhere) that reads from one table and writes to another.
2. Rewrite it exactly as shown above: same logic, but imagine the
   source table name replaced by `{{ ref('some_upstream_model') }}`.
3. Write down, in one sentence, what breaks in the "raw script"
   version that the "model" version prevents.

## Check yourself

You're ready for Lesson 3 when you can point at any SQL script and
say specifically what dbt would add to it — not vaguely ("it's
better") but concretely (ref-based dependencies, tests, docs, version
control).
