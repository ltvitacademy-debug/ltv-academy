# Lesson 7 — Planning the Staging Layer for Every Source

**Chapter 3 · Building the dbt Model Layer · Lesson 7 of 26**

## What you'll learn

- Why planning the staging layer is a separate step from writing it
- The real naming convention this platform uses — `stg_jaffle_shop__customers`,
  `stg_jaffle_shop__orders`, `stg_jaffle_shop__payments` — and why it's
  `source__table`, not just `table`
- How `source()` is declared in `.yml` before it's ever used in a model
- What belongs in a staging model, and what explicitly doesn't

## Why plan before writing

Jumping straight to SQL for three staging models and discovering
halfway through that the naming convention or source declarations are
inconsistent is a real, avoidable cost. This lesson plans all three
before Lesson 8 writes a single `SELECT`.

## Declaring the source first

Every staging model in this platform starts from a declared `source()`
— never a bare table name. In `models/staging/jaffle_shop/_jaffle_shop__sources.yml`:

```yaml
version: 2

sources:
  - name: jaffle_shop
    database: jaffle_shop_db
    schema: raw
    tables:
      - name: raw_customers
      - name: raw_orders
      - name: raw_payments
```

This one file is what makes `{{ source('jaffle_shop', 'raw_orders') }}`
resolve anywhere in the project — and it's also what makes the raw
`RAW.raw_orders` table show up as a node in the lineage graph Lesson
14 generates.

## The naming convention: source__table

Three staging models, one per raw table, named `stg_<source>__<table>`:

| Staging model | Built from |
|---|---|
| `stg_jaffle_shop__customers` | `source('jaffle_shop', 'raw_customers')` |
| `stg_jaffle_shop__orders` | `source('jaffle_shop', 'raw_orders')` |
| `stg_jaffle_shop__payments` | `source('jaffle_shop', 'raw_payments')` |

The double underscore between source and table isn't decoration — on a
platform with more than one source feeding staging models (this
capstone adds a second source in Chapter 5), `stg_jaffle_shop__customers`
and a hypothetical `stg_billing_system__customers` read as two
obviously different models at a glance, instead of two models both
named `stg_customers` that a developer has to open to tell apart.

## What belongs in a staging model — and what doesn't

A staging model's job is narrow, on purpose:

- Rename columns to consistent, readable names (`id` → `customer_id`)
- Light type casting
- No joins to other models
- No business logic, no aggregation, no filtering out "bad" rows

Joins, aggregation, and business logic are Lesson 9's job
(intermediate and mart models) — keeping staging models this narrow is
exactly what makes Lesson 12's late schema change ripple through
cleanly instead of unpredictably.

## Planning each model's column list

Before writing any SQL, this lesson plans the renamed column list for
each of the three models:

| Raw column (`raw_orders`) | Staged column (`stg_jaffle_shop__orders`) |
|---|---|
| `id` | `order_id` |
| `user_id` | `customer_id` |
| `order_date` | `order_date` |
| `status` | `status` |

(This exact `status` column is the one Lesson 12 changes mid-capstone
— worth remembering the name now.)

## Key terms

| Term | Meaning |
|---|---|
| `source()` | A dbt function referencing a raw table declared in a `.yml` sources block |
| Staging model | A thin, one-to-one model on top of a single source table — renaming and light casting only |
| `stg_<source>__<table>` | This platform's naming convention, disambiguating staging models across multiple sources |

## Lab

1. Write the `_jaffle_shop__sources.yml` file declaring all three raw
   tables.
2. Plan the renamed column list for `stg_jaffle_shop__customers` and
   `stg_jaffle_shop__payments`, following the `raw_orders` example
   above.
3. In one sentence, explain why a staging model should never contain a
   join to another model.

## Check yourself

You're ready for Lesson 8 when you can write the sources `.yml` from
memory and name, for all three staging models, exactly which columns
get renamed and why staging models stay join-free.
