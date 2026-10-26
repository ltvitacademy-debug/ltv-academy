# Lesson 16 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Intermediate Capstone: The Orders Analytics Layer · Lesson 16 of 16**

## What you'll learn

- A full recap of the model layer this chapter built, start to finish
- Why the join-fanout bug you fixed was the single most valuable thing
  in this entire project, not just an unfortunate detour
- What's still deliberately out of scope here, and why
- Where the Advanced tier of this capstone picks up

## What you actually built

Starting from the Beginner project's `customers` mart, this chapter
built a complete orders analytics layer, real jaffle_shop data end to
end:

- **Staging**: `stg_jaffle_shop__orders`, `stg_jaffle_shop__payments`
  (with a `cents_to_dollars()` macro applied once, in Lesson 7).
- **Intermediate**: `int_orders__joined` (orders + customers),
  `int_payments__aggregated` (the fanout fix from Lesson 15).
- **Marts**: `fct_orders` — incrementally materialized, tested
  (`not_null`, `unique`, `relationships`, `accepted_values`), and
  documented via `dbt docs`.
- **Power BI**: a Finance revenue page and an Ops order-status page,
  both connected to the marts layer only, both independently sanity-
  checked against Snowflake.

## Why the bug was the most valuable part

Any project can teach you to write a join that works on day one. This
one taught you what happens when that same join meets more data than
it was tested against — a `unique` test catching a real problem
instead of staying silent, a reproduce-isolate-confirm method that
didn't require guessing, and a fix (pre-aggregate before joining)
that's one of the most common real patterns in production dbt
projects. That sequence — Lessons 13 through 15 — is the actual
job of an analytics engineer on a live project, more than any single
model-building lesson on its own.

## What's deliberately out of scope here

No CI/CD pipeline running these tests automatically on every pull
request, no dbt Cloud job scheduling, no `dbt_project.yml`-level
environment configuration beyond what's already in place from earlier
chapters. This tier's job was the model layer, the incremental
decision, and the diagnostic method — not the operational tooling
around running it in production.

## Where the Advanced tier picks up

The Advanced tier of this capstone builds on exactly this foundation:
the same `fct_orders` model, the same two stakeholders, taken further
into the territory this tier intentionally left alone — the
operational and scaling concerns a mature analytics engineering
practice adds once the model layer itself is solid.

## Key terms

| Term | Meaning |
|---|---|
| Model layer (recap) | staging → intermediate → marts, each with a distinct, single job |
| Reproduce → isolate → confirm | The diagnostic method this chapter applied to a real dbt test failure |
| Pre-aggregate before joining | The specific, reusable fix for a one-to-many join fanout |

## Lab

Write a short project retrospective in your own words: name the exact
moment the `unique` test failure made sense once you saw the row-count
comparison, and name the one line of SQL that actually fixed it.

## Check yourself

You're done with this tier when you can walk someone else through
this chapter's full lineage graph, from `raw_orders`/`raw_payments` to
both Power BI pages, and explain the fanout bug and its fix without
looking anything up.
