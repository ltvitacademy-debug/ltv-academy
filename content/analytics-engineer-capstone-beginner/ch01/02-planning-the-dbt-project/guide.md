# Lesson 2 — Planning the dbt Project

**Chapter 1 · Beginner Capstone: First dbt Model on Snowflake · Lesson 2 of 10**

## What you'll learn

- The three-layer dbt project structure — sources, staging, marts — named explicitly before any file gets created
- Why this project only needs one model in each of two layers, not a sprawling folder tree
- How to sketch a project plan on paper (or in a doc) before opening dbt at all
- Why planning the layers first prevents the single most common beginner mistake: putting business logic in a staging model

## Why plan before building

Lesson 1 turned a vague complaint into a specific requirement. This lesson turns that
requirement into a concrete plan for the dbt project itself — which files you'll create,
in which layers, before a single line of SQL exists. Skipping this step is how beginners
end up with one giant model that tries to do everything at once: read raw data, rename
columns, and apply business rules, all in a single file that's painful to debug and
impossible to reuse.

## The three-layer pattern

Every well-built dbt project — including this one, as small as it is — follows the same
three-layer shape:

- **Sources** — a YAML declaration of the raw data already sitting in the warehouse. Not a
  file dbt builds, just a pointer to data that already exists.
- **Staging** — one model per source table, doing light cleanup only: renaming columns,
  casting types. No joins, no aggregation, no business logic.
- **Marts** — the final, reportable tables built on top of staging models, where real
  business logic and joins actually belong.

This Beginner capstone is deliberately the smallest possible real version of that pattern:
**one source, one staging model, one mart model.** Not because the pattern doesn't scale —
it's exactly how a 200-model production project is organized too — but because the
smallest real example is the clearest way to learn it.

## This project's plan, named explicitly

| Layer | What it is | File (coming in later lessons) |
|---|---|---|
| Source | `raw_customers`, already loaded in Snowflake | `models/staging/sources.yml` (Lesson 5) |
| Staging | One model: light cleanup of `raw_customers`, no business logic | `models/staging/stg_jaffle_shop__customers.sql` (Lesson 6) |
| Marts | One model: the final, tested customer table | `models/marts/customers.sql` (Lesson 8) |

Two real models, total. That's the whole project. Everything from here through Lesson 9 is
building exactly these two files, correctly, in the right order.

## Why order matters: you can't build a mart before its staging model exists

dbt models depend on each other through `ref()` and `source()` calls (you've seen both in
the prerequisite dbt course). The mart model in Lesson 8 will say
`{{ ref('stg_jaffle_shop__customers') }}` — which only works once that staging model
actually exists. That's why this project builds strictly bottom-up: source declared first,
then staging, then the mart. Planning the layers now is what makes that build order obvious
later, instead of something you discover by hitting an error.

## What stays out of the plan

Just as Lesson 1 scoped out orders and payments, this plan deliberately has no
intermediate layer (a common addition in bigger projects, for multi-table joins before the
final mart) — with only one source table, there's nothing to join yet. Keeping the plan this
small is the point: a correct, minimal project beats an over-engineered one for a first
real build.

## Key terms

| Term | Meaning |
|---|---|
| Sources layer | A YAML declaration of raw data already in the warehouse |
| Staging layer | One model per source table, light cleanup only, no business logic |
| Marts layer | Final, reportable models — where joins and business logic belong |
| Bottom-up build order | Source declared first, then staging, then marts — because later layers `ref()` earlier ones |

## Lab

Before writing any files, write your own version of the three-layer table above for this
project: name the one source, the one staging model (with its real `stg_<source>__<table>`
name), and the one mart model. Check it against the table above.

## Check yourself

You're ready for Lesson 3 when you can name all three layers of this project from memory,
in build order, and explain why the mart model can't be built before the staging model
exists.
