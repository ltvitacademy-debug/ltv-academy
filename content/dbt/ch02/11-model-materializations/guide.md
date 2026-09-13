# Lesson 11 — Model Materializations: View, Table, Incremental & Ephemeral

**Chapter 2 · Sources, Models & ref() · Lesson 11 of 45**

## What you'll learn

- What a "materialization" actually is: how a model gets built, not
  what it contains
- The four materialization types dbt ships with, and when each one
  makes sense
- How to set one, at the project level or per-model
- Why staging models default to views and marts models default to
  tables

## Materialization: how, not what

Every model you've written so far is just a `SELECT` statement.
**Materialization** is dbt's answer to "and then what — a table? a
view? something else?" It's pure configuration, layered on top of
identical SQL — recall Lesson 6's run output, where one model showed
`[CREATE TABLE]` and another `[CREATE VIEW]`, from the exact same
kind of model file.

## The four types

| Materialization | What dbt actually runs | Use it when |
|---|---|---|
| **View** | `CREATE VIEW` — no data stored, re-runs the query every time it's selected from | Staging models, or anything cheap to compute and rarely queried directly |
| **Table** | `CREATE TABLE AS SELECT` — data physically stored, rebuilt fully on every `dbt run` | Marts models — anything queried often or by a BI tool, where re-computing every time is wasteful |
| **Incremental** | Builds a table once, then only processes *new or changed* rows on later runs | Large fact tables where a full rebuild is too slow or expensive (Chapter 5, in depth) |
| **Ephemeral** | Not a database object at all — inlined as a CTE into whatever references it | Thin helper logic you want to reuse via `ref()` without a table or view existing on its own |

## Setting it

Project-wide default, in `dbt_project.yml` (you saw this in Lesson
4):

```yaml
models:
  my_new_project:
    staging:
      materialized: view
    marts:
      materialized: table
```

Or per-model, inside the `.sql` file itself, which overrides any
project default:

```sql
{{ config(materialized='incremental') }}

select ...
```

## Why staging defaults to view, marts default to table

A staging model (Lesson 8) does almost no computation — renaming
columns is nearly free, so re-running that query on every downstream
`SELECT` costs almost nothing. A marts model (Chapter 3) often
involves real joins and aggregation across a lot of rows; storing the
result as a table means a BI tool querying it doesn't pay that
computation cost on every single dashboard refresh.

## A quick gut check

Ask two questions about any model: **How often is this queried
directly** (by a person or a BI tool, not just by other dbt models)?
**How expensive is the underlying computation?** Frequently-queried
and expensive → table. Rarely queried directly and cheap → view.
Huge and slow to fully rebuild → incremental (Chapter 5). Thin
reusable logic with no reason to be its own object → ephemeral.

## Key terms

| Term | Meaning |
|---|---|
| Materialization | How a model's SQL actually gets built — view, table, incremental, or ephemeral |
| `{{ config(materialized=...) }}` | Sets a model's materialization, overriding the project default |
| Incremental model | Builds once, then only processes new/changed rows on later runs |
| Ephemeral model | Never becomes a real database object — inlined as a CTE wherever it's referenced |

## Lab

1. Look at the staging model you built in Lesson 8 — what
   materialization is it using by default (check `dbt_project.yml`)?
2. Add an explicit `{{ config(materialized='table') }}` to one model
   and re-run it — confirm in Snowflake that it's now a real table,
   not a view.
3. Write one sentence explaining which of the four types you'd pick
   for a model that joins five tables and gets queried by a
   dashboard fifty times a day.

## Check yourself

You're ready for Lesson 12 when you can pick the right materialization
for a described model without hesitating, and explain your reasoning
in terms of query frequency and computation cost.
