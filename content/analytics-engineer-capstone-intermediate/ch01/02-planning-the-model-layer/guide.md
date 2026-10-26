# Lesson 2 — Planning the Model Layer

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 2 of 16**

## What you'll learn

- How to plan a staging → intermediate → marts layer before writing a
  single model file
- Which real jaffle_shop sources this layer needs, beyond the
  `raw_customers` the Beginner project already used
- Why the join to the customers mart belongs in an intermediate model,
  not directly in a staging model
- What "done" looks like for this plan, before Lesson 3 starts writing
  SQL

## Why plan before building

It's tempting to jump straight to a `fct_orders.sql` file and start
writing joins. The Beginner project already proved why that's the
wrong order of operations: staging models exist specifically so that
cleanup logic (renaming columns, light type casting) lives in exactly
one place per source, and marts models exist so that business logic
sits downstream of anything source-specific. Skipping the plan tends
to produce a single giant model that mixes all three concerns — which
is exactly what makes a model hard to test and harder to debug later,
a problem this chapter revisits for real in Lessons 13-15.

## The two new real sources this layer needs

The Beginner project declared and staged `raw_customers`. This chapter
needs two more real jaffle_shop seed tables:

- **`raw_orders`** — one row per order: `id`, `user_id`, `order_date`,
  `status`.
- **`raw_payments`** — one row per payment: `id`, `order_id`,
  `payment_method`, `amount` (in cents — real detail, comes back in
  Lesson 7).

## The planned layer, top to bottom

- **Staging** — `stg_jaffle_shop__orders` (Lesson 3) and
  `stg_jaffle_shop__payments` (introduced here, built out in Lesson 7)
  — one staging model per raw source, same pattern as the Beginner
  project's `stg_jaffle_shop__customers`.
- **Intermediate** — a model that joins the staging orders model to
  the *already-built* `customers` mart from the Beginner project
  (Lesson 4). This is deliberately not a marts model yet — it exists
  to combine sources before anything gets exposed to a BI tool.
- **Marts** — the orders fact model Finance and Ops will both query
  from (built incrementally starting Lesson 6), tested (Lesson 8), and
  documented (Lesson 9) before Power BI ever touches it (Lesson 10+).

## Why the customer join belongs in intermediate, not staging

A staging model's only job is cleaning up one source — renaming
`id` to `order_id`, nothing else. The moment you join to a *different*
source (the customers mart), you're combining business entities, which
is exactly what an intermediate model is for. Keeping that join out of
staging means `stg_jaffle_shop__orders` stays trivially simple and
reusable by anything else that only needs clean order rows — a second
reason this layering matters, not just tidiness.

## What "done" looks like for this plan

A plan is only useful if it's concrete enough to build from. Before
Lesson 3, you should be able to name, in order: which raw table each
staging model reads from, which two models the intermediate model
joins, and which column it joins them on (`customer_id` — already
present on both sides from the Beginner project's work).

## Key terms

| Term | Meaning |
|---|---|
| Staging model | Cleans up exactly one raw source; no joins to other sources |
| Intermediate model | Combines multiple staging/marts models before anything reaches a marts model |
| `raw_payments` | The real jaffle_shop seed table: one row per payment, amount in cents |
| Marts model | The business-facing model a BI tool actually queries |

## Lab

Sketch the plan yourself before moving on: list each new model name,
which source or model it reads from, and one sentence on its job. You
should end up with four names: `stg_jaffle_shop__orders`,
`stg_jaffle_shop__payments`, an intermediate orders model, and a final
orders marts model.

## Check yourself

You're ready for Lesson 3 when you can explain, without looking back,
why the join to the customers mart doesn't belong inside
`stg_jaffle_shop__orders`.
