# Lesson 7 — Defining Sources

**Chapter 2 · Sources, Models & ref() · Lesson 7 of 45**

## What you'll learn

- What a "source" is in dbt, distinct from a model
- The real `sources.yml` syntax
- The `source()` function, and how it's different from `ref()`
- Why declaring sources explicitly (instead of just querying raw
  tables directly) matters

## What a source actually is

So far, every table you've referenced with `ref()` was itself a dbt
model — something dbt built. But every dbt project starts from data
dbt didn't build: raw tables already loaded into Snowflake by some
other process (an ELT tool, an app database sync, anything from the
Data Engineering courses in this catalog). dbt calls that raw,
un-modeled data a **source**.

A source isn't a file dbt runs — it's a declaration, in YAML, of
where that raw data already lives:

```yaml
# models/staging/jaffle_shop/src_jaffle_shop.yml
version: 2

sources:
  - name: jaffle_shop
    database: raw
    schema: jaffle_shop
    tables:
      - name: customers
      - name: orders
```

## `source()` vs. `ref()`

Once declared, you reference that raw table in SQL with `source()`,
not a hardcoded table name:

```sql
select * from {{ source('jaffle_shop', 'orders') }}
-- resolves to: raw.jaffle_shop.orders
```

`source()` and `ref()` do the same *kind* of thing — both replace a
hardcoded table name with a function call dbt resolves — but they
point at fundamentally different things:

![A real dbt diagram: two green boxes, jaffle_shop.customers and jaffle_shop.orders, both with arrows pointing into a blue box labeled orders.](/courses/dbt/ch02/07-defining-sources/sources-dag.png)
*Green nodes are sources — raw, un-modeled data. The blue node is a model. source() calls are dependency edges too, exactly like ref() — dbt's DAG just draws them starting from raw data instead of another model.*
Source: [dbt Docs — Add sources to your DAG](https://docs.getdbt.com/docs/build/sources)

| | `source()` | `ref()` |
|---|---|---|
| Points at | Raw data dbt didn't build | Another dbt model |
| Appears in the DAG as | A starting (green) node, no upstream dependency | A node with its own upstream dependencies |
| Declared in | `sources.yml` (or any `.yml` under `models/`) | Nothing to declare — any model's filename works |

## Why bother declaring sources at all

You *could* just write `select * from raw.jaffle_shop.orders`
directly in a model and skip `source()` entirely — it would even
work. Declaring it as a source instead buys you three things:

- **It shows up in the Lineage graph** as a real starting node, so
  the graph tells the whole story, not just the modeled part.
- **You can test it** — the same `not_null`/`unique` tests from
  Chapter 4 apply to sources, catching bad raw data before it ever
  reaches a model.
- **Freshness checks** — dbt can alert you if a source table hasn't
  been updated recently (a sign the upstream loading process broke).

## Key terms

| Term | Meaning |
|---|---|
| Source | Raw, un-modeled data a dbt project reads from but didn't build |
| `source()` | The function that resolves to a declared source table |
| `sources.yml` | The YAML file where sources are declared (name can vary) |
| Freshness check | A test that a source table was loaded recently enough |

## Lab

1. Pick one raw table you have access to (from the Snowflake course's
   AdventureWorks/Northwind data, or your own).
2. Write a `sources.yml` block declaring it, using the real syntax
   above.
3. Write one model that selects from it using `{{ source(...) }}`
   instead of the hardcoded table name.

## Check yourself

You're ready for Lesson 8 when you can explain, in one sentence, why
`source()` and `ref()` are both "dependency functions" but point at
fundamentally different kinds of things.
