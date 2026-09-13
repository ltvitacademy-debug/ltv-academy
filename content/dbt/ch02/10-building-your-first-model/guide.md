# Lesson 10 — Building Your First dbt Model

**Chapter 2 · Sources, Models & ref() · Lesson 10 of 45**

## What you'll learn

- How to walk a model from a blank `.sql` file to a real table, start
  to finish
- How `source()`, `ref()`, and staging models (Lessons 7-9) actually
  combine in one real file
- What to check when a brand-new model doesn't show up in `dbt run`
- What a real "your model just got picked up and built" run looks
  like

## The walkthrough

You already have the pieces: a declared source (Lesson 7), a staging
model on top of it (Lesson 8), and `ref()` to connect them (Lesson
9). Building your first real model is combining them into one new
file.

**Step 1 — confirm the staging model exists and builds cleanly.**
`stg_jaffle_shop__customers` and `stg_jaffle_shop__orders`, both
already built from Lessons 7-8.

**Step 2 — create the new model file.** Anywhere under `models/`
(convention: a `marts/` subfolder for this kind of model — Chapter 3
formalizes this):

```sql
-- models/marts/customers.sql
with customers as (
    select * from {{ ref('stg_jaffle_shop__customers') }}
),
orders as (
    select * from {{ ref('stg_jaffle_shop__orders') }}
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
select
    customers.customer_id,
    customers.first_name,
    customers.last_name,
    customer_orders.first_order_date,
    customer_orders.most_recent_order_date,
    coalesce(customer_orders.number_of_orders, 0) as number_of_orders
from customers
left join customer_orders using (customer_id)
```

**Step 3 — save the file. Nothing else. No registration step,
no "add model to project" command** — dbt discovers every `.sql`
file under any configured model path automatically.

**Step 4 — run it.** `dbt run` (or `dbt run --select customers` to
build just this one). Here's a real terminal from exactly this
moment — a brand-new `customers` model just added on top of two
starter models:

![A terminal running dbt run, now finding 3 models instead of 2: "1 of 3 START table model my_first_dbt_model," then "2 of 3 START view model dbt_claire.customers... OK created view model," then the third starter model, ending "Finished running 1 table model, 2 view models" and "Done. PASS=3."](/courses/dbt/ch02/10-building-your-first-model/first-model-dbt-cli.png)
*Found 3 models instead of 2 — dbt picked up the new file the moment it was saved, no registration step, and built it in the right position because of its two ref() calls.*
Source: [dbt Docs — Quickstart for manual install](https://docs.getdbt.com/guides/manual-install)

## What to check if it doesn't show up

If `dbt run` still reports the old model count, check: is the file
actually under a path listed in `model-paths` in `dbt_project.yml`
(Lesson 4)? Does it have a `.sql` extension? Those are the only two
things that make a file "a model" to dbt — no explicit registration
anywhere else.

## Key terms

| Term | Meaning |
|---|---|
| `dbt run --select <model>` | Builds only the named model (and, by default, its ancestors if needed) |
| Model discovery | dbt finds every `.sql` file under configured model-paths automatically |
| `left join ... using (...)` | Standard SQL you already know — nothing dbt-specific about the join itself |

## Lab

1. Write your own version of the `customers.sql` model above, using
   your Lesson 7/8 source and staging models.
2. Save it — don't register it anywhere else — and run
   `dbt run --select <your_model_name>`.
3. Confirm your model's row count and a couple of sample rows using a
   plain `SELECT` in Snowflake against the built table.

## Check yourself

You're ready for Lesson 11 when you've built and run one real model
from scratch, using `ref()` against your own staging models, and
confirmed the output in Snowflake yourself.
