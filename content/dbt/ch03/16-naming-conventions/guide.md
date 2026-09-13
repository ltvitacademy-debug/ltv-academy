# Lesson 16 — Naming Conventions That Scale

**Chapter 3 · Staging, Intermediate & Marts · Lesson 16 of 45**

## What you'll learn

- The `stg_`, `int_`, and `fct_`/`dim_` prefixes and exactly what each
  one promises the reader
- Why dbt Labs recommends plain-English entity names for most marts,
  and when the Kimball-style `fct_`/`dim_` convention is a real,
  common alternative instead
- Why a naming convention is a promise about behavior, not just a
  label
- What happens to a project that skips this and lets naming drift

## A name is a promise

By this point in the chapter you've seen `stg_orders`,
`int_order_items_summed_to_orders`, and `orders` (a mart) — and each
name already told you something true about the model before you
opened the file. That's what a naming convention actually is: a
promise about behavior, enforced by habit and code review, not by
dbt itself. dbt will happily let you name a staging model
`final_report_v2`. Nothing stops you. The convention is what stops you.

## The three (or four) prefixes

- **`stg_`** — 1-to-1 with a source table, renamed and typed, no joins,
  no aggregations. `stg_[source]__[entity]s.sql` for multi-source
  projects (`stg_stripe__invoices.sql`), or just `stg_orders.sql` for a
  single-source project.
- **`int_`** — a purpose-built transformation step between staging and
  marts, ephemeral by default, never queried directly. Named
  `int_[entity]s_[verb]s.sql` — verb-first, so the name states the
  transformation (`int_customers_pivoted`), not just the entity.
- **`fct_` / `dim_`** — a real, common alternative for the marts layer,
  used when a project follows classic Kimball star-schema modeling:
  `fct_` for a fact table (an event or transaction — `fct_orders`),
  `dim_` for a dimension table (a descriptive entity —
  `dim_customers`). dbt Labs' own published exposures example uses
  exactly this pair (`ref('fct_orders')`, `ref('dim_customers')`),
  even though dbt Labs' main marts-structure guidance leads with plain
  entity nouns like `orders` and `customers` instead. Both are real:
  plain nouns are the simpler default; `fct_`/`dim_` earns its keep once
  a project has enough marts that "is this a transactional fact or a
  descriptive dimension" is worth answering from the filename alone.

## Why this matters more as a project scales

At six models, anyone can hold the whole project in their head and
naming barely matters. At sixty models across a team of engineers who
didn't all onboard on the same day, it matters constantly: a `git grep
stg_` should return every staging model and nothing else; a reviewer
should be able to tell, from a filename alone in a pull request diff,
roughly what layer a change touches and how risky it is (a staging
rename is low-risk; a marts change might break a live dashboard).
Consistent naming is what makes a sixty-model project navigable
without a live guided tour every time.

## What naming drift actually costs

A project that skips this ends up with staging models that look like
marts, marts that look like one-off reports, and no way to tell from a
model's name whether it's safe to change without asking someone first.
The DAG (Chapter 2's lineage graph) still technically works — dbt
doesn't care what you name things — but every new person on the team
pays the cost of re-learning, model by model, what's actually going on,
because the names stopped telling the truth.

## Key terms

| Term | Meaning |
|---|---|
| `stg_` | Staging prefix — 1-to-1 with a source, renamed/typed, no joins or aggregations |
| `int_` | Intermediate prefix — verb-first, ephemeral, never queried by BI tools |
| `fct_` / `dim_` | Kimball-style marts prefixes — fact (event/transaction) vs. dimension (descriptive entity) |
| Naming drift | What happens when a project skips conventions and names stop reflecting what a model actually does |

## Lab

1. Audit the models you've built in Lessons 13–15: do their names
   actually match what they do (1-to-1 source-shaped, purpose-built
   transformation, or business entity)?
2. Rename anything that drifted, and note in a commit message-style
   sentence why the old name was misleading.
3. Decide, for your own practice project: plain entity nouns for marts,
   or `fct_`/`dim_`? Write one sentence justifying the choice.

## Check yourself

You're ready for Lesson 17 when you can explain why dbt itself doesn't
enforce any of these prefixes — and who (or what) actually does.
