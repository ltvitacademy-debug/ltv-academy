# Lesson 9 — The ref() Function

**Chapter 2 · Sources, Models & ref() · Lesson 9 of 45**

## What you'll learn

- Exactly what `ref()` does at compile time, not just conceptually
- How `ref()` calls become the dependency graph the Lineage tab draws
- Why `ref()` makes a project environment-agnostic (dev vs. prod)
- What happens if you skip `ref()` and hardcode a table name anyway

## What `ref()` actually does

`{{ ref('stg_orders') }}` isn't magic — it's a Jinja function that,
when dbt compiles your project, gets replaced with the actual,
fully-qualified table name of that model in whatever environment
you're building into:

```sql
-- what you write
select * from {{ ref('stg_customers') }}

-- what dbt compiles it to (in your dev schema)
select * from analytics.dbt_yourname.stg_customers

-- the exact same model, compiled for production
select * from analytics.dbt_prod.stg_customers
```

Same file, two different compiled outputs — because `ref()` doesn't
know or care about a hardcoded schema name. It only knows the model's
*name*, and resolves the rest based on where dbt is building.

## `ref()` calls are what draw the graph

Every `ref()` call is a dependency edge. dbt reads every model file in
the project, extracts every `ref()`, and builds a graph from
scratch — this is quite literally the same mechanism behind Lesson 1's
Lineage tab and Lesson 7's source diagram:

![A real diagram titled "The DAG we want for our dbt project": two blue nodes, stg_customers and stg_orders, both with arrows pointing into a third blue node, customers.](/courses/dbt/ch02/09-the-ref-function/dbt-dag.png)
*Two ref() calls inside customers.sql — {{ ref('stg_customers') }} and {{ ref('stg_orders') }} — are the entire reason this graph exists. Nobody drew it; dbt derived it from the code.*
Source: [dbt Docs — Quickstart for manual install](https://docs.getdbt.com/guides/manual-install)

If `customers.sql` contains those two `ref()` calls, dbt knows,
without being told anywhere else, that both `stg_customers` and
`stg_orders` must finish building before `customers` can start.

## Why this beats hardcoding a table name

Write `select * from analytics.dbt_yourname.stg_customers` instead of
`ref()`, and it will run — right up until someone else runs the same
project and their dev schema isn't `dbt_yourname`. Or until this
model gets promoted to production, where that schema doesn't even
exist. `ref()` makes the exact same file correct in every
environment, because it defers resolving the real name until compile
time.

Hardcoding also breaks the dependency graph silently: dbt has no way
to know your model depends on `stg_customers` if you never call
`ref('stg_customers')` — so it might try to build them in the wrong
order, or in parallel when they shouldn't be.

## Key terms

| Term | Meaning |
|---|---|
| `ref()` | The Jinja function that resolves to a model's real table name at compile time |
| Compile | The step where dbt turns `ref()`/`source()` calls into real SQL |
| DAG | Directed Acyclic Graph — the dependency graph built entirely from `ref()`/`source()` calls |
| Environment-agnostic | The same model file works correctly in dev, staging, or prod |

## Lab

1. Take any two of your own models where one logically depends on
   another (or the staging model from Lesson 8 and a new model on top
   of it).
2. Confirm the downstream model uses `{{ ref(...) }}`, not a
   hardcoded name.
3. Run `dbt run` and check the console output — the numbered order
   models build in should match what you'd expect from their `ref()`
   calls.

## Check yourself

You're ready for Lesson 10 when you can explain what `ref()` compiles
to, and why the exact same `.sql` file produces different actual SQL
depending on which environment it's built into.
