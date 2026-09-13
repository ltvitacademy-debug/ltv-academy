# Lesson 13 — Staging Layer Patterns

**Chapter 3 · Staging, Intermediate & Marts · Lesson 13 of 45**

## What you'll learn

- The one job a staging model has, and only that job
- The four things a staging model is allowed to do — and the two
  things it must never do
- Why staging models keep a strict 1-to-1 relationship with source
  tables
- The real `stg_orders.sql` pattern dbt Labs publishes in its own
  project-structure guide

## The staging layer's one job

Every layer in a dbt project earns its place by doing one job well.
The staging layer's job is narrow on purpose: turn raw, source-shaped
data into clean, renamed, correctly-typed **atomic building blocks** —
nothing more. A staging model is the first and only place a raw source
table gets referenced directly with `source()`; everything downstream
references the staging model instead, never the raw table again.

Four things a staging model is allowed to do:

- **Renaming** — turn a source system's cryptic or inconsistent column
  names (`cust`, `ord_dt`) into clear, consistent ones (`customer_id`,
  `ordered_at`).
- **Type casting** — convert a string timestamp to a real timestamp
  type, a numeric-as-text column to a number.
- **Basic computations** — simple, local transformations, like
  converting cents to dollars.
- **Categorizing** — conditional logic that buckets values (a status
  code into a human-readable label, a flag into a boolean).

## What a staging model must never do

Two things are explicitly off-limits at this layer, because they break
the "atomic building block" guarantee everything downstream relies on:

- **No joins.** Joining inside a staging model creates duplicated
  computation (the same join logic gets repeated differently in every
  downstream model that also needs it) and confusing relationships —
  nobody downstream can tell anymore which model "owns" a given row.
- **No aggregations.** A staging model must preserve the exact grain
  of its source table. Aggregate here, and every downstream model that
  actually needed the row-level detail has already lost it.

## The 1-to-1 rule

A staging model has a strict one-to-one relationship with a source
table: each raw source table gets exactly one staging model, and that
staging model is its only entry point into the rest of the project.
This is what makes the staging layer trustworthy — trace any
downstream model back far enough and it always resolves to exactly one
staging model per source table, never a tangle of half-overlapping
staging models built for different purposes.

dbt Labs' naming convention makes this traceable at a glance:
`stg_[source]__[entity]s.sql` — for example
`stg_google_analytics__campaigns.sql` for a multi-source project, or
just `stg_orders.sql` when there's only one source system. Note the
plural: a staging model represents a table of many rows, so its name
is plural.

## A real staging model

This is dbt Labs' own published example, from their project-structure
best-practices guide — a real `stg_orders.sql`, not a hypothetical:

```sql
-- stg_orders.sql
with source as (
    select * from {{ source('ecom', 'raw_orders') }}
),
renamed as (
    select
        id as order_id,
        store_id as location_id,
        customer as customer_id,
        {{ cents_to_dollars('subtotal') }} as subtotal,
        {{ cents_to_dollars('tax_paid') }} as tax_paid,
        {{ cents_to_dollars('order_total') }} as order_total,
        {{ dbt.date_trunc('day', 'ordered_at') }} as ordered_at
    from source
)
select * from renamed
```

Notice what it does — rename, cast, a cents-to-dollars conversion, a
date truncation — and what it doesn't: no `join`, no `group by`.
Staging models are also organized by **source system**, not by
business grouping (`staging/ecom/`, `staging/stripe/`), and are
typically materialized as **views** — cheap to store, and they always
return fresh data since nothing is cached at this layer.

## Key terms

| Term | Meaning |
|---|---|
| Staging model | The first transformation layer — 1-to-1 with a source table, renamed and typed, no joins or aggregations |
| Atomic building block | A staging model's role: a clean, minimal unit downstream models compose together |
| `source()` | The only place raw source tables get referenced directly — inside a staging model |
| 1-to-1 relationship | Each source table maps to exactly one staging model, its sole entry point into the project |

## Lab

1. Pick a raw table from a source you already defined with `source()`
   (from the Chapter 2 lesson on defining sources).
2. Write a `stg_` model for it that only renames and casts — no joins,
   no aggregations.
3. Materialize it as a view (`+materialized: view` under `staging:` in
   `dbt_project.yml`) and run it with `dbt run -s stg_your_model`.

## Check yourself

You're ready for Lesson 14 when you can say, without looking back,
the two things a staging model is never allowed to do — and why doing
either one breaks every downstream model's assumptions about it.
