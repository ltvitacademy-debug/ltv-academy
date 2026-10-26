# Lesson 8 — Building the Customer Mart Model

**Chapter 1 · Beginner Capstone: First dbt Model on Snowflake · Lesson 8 of 10**

## What you'll learn

- How to write this project's final model, `models/marts/customers.sql`
- The real `ref()` syntax, pointing at a dbt model instead of a raw source for the first
  time in this project
- Why this mart model is almost identical to the staging model it builds on — and why
  that's fine for a project this size
- What makes this specific table the actual deliverable from Lesson 1's ask

## The last layer: marts

Lesson 2's plan named this file last for a reason — it depends on everything built so
far: the source (Lesson 5), the staging model (Lesson 6), and the tests that prove the
staging model is trustworthy (Lesson 7). The mart layer is where a project's final,
reportable tables live — the ones a stakeholder like Jaffle Shop's Ops Manager would
actually query.

## The real file

```sql
-- models/marts/customers.sql
with customers as (
    select * from {{ ref('stg_jaffle_shop__customers') }}
)
select
    customer_id,
    first_name,
    last_name
from customers
```

Notice `ref('stg_jaffle_shop__customers')` — the same `ref()` function from the
prerequisite dbt course, now pointing at this project's own staging model instead of a
raw source. That's the real difference between `source()` and `ref()` in practice:
`source()` points at raw data this project didn't build; `ref()` points at a model this
project already built, in Lesson 6.

## Why this mart model looks almost identical to staging

In a bigger project — like the Intermediate capstone that follows this one, which joins
in order history — the mart layer is where real business logic and joins happen. This
Beginner project only has one source table, so there's nothing to join yet, and no
derived business logic to compute. The mart model here is intentionally close to a
pass-through of the staging model, and that's not a shortcut — it's an honest reflection
of how small this project's real scope is (Lesson 1 drew that scope deliberately).

The one real thing this layer still buys you: `customers` is the name a stakeholder would
expect to query — not `stg_jaffle_shop__customers`, which is an internal implementation
detail. Marts are the layer other people are meant to see; staging models generally
aren't.

## Running it

```bash
dbt run --select customers
```

Because `customers.sql` references `stg_jaffle_shop__customers` with `ref()`, dbt
automatically knows to build the staging model first if it isn't already built — the same
dependency-aware behavior from the prerequisite dbt course's lesson on `ref()` and build
order.

## Confirming it

```sql
select * from jaffle_shop_capstone.dbt_yourname.customers limit 10;
```

Same rows, same columns as the staging model — because, for this project's scope, that's
correct. The Intermediate capstone is where this table starts looking meaningfully
different from staging, once order history gets joined in.

## Key terms

| Term | Meaning |
|---|---|
| Mart model | The final, reportable layer — where joins and business logic belong in bigger projects |
| `ref()` | References another dbt model (here, the staging model built in Lesson 6) |
| `source()` vs. `ref()` | `source()` points at raw data; `ref()` points at another model this project built |
| Dependency-aware build | dbt builds a referenced model first automatically, based on its DAG |

## Lab

1. Create `models/marts/customers.sql` with the exact SQL above.
2. Run `dbt run --select customers` and confirm it builds successfully, and that dbt
   built `stg_jaffle_shop__customers` first if it wasn't already built.
3. Query the resulting `customers` table in Snowflake and confirm the row count still
   matches `raw_customers` from Lesson 3 — the whole chain, start to finish.

## Check yourself

You're ready for Lesson 9 when `customers` builds successfully in your own project, and
you can explain why this particular mart model is close to a pass-through of staging —
and what would have to change about the project's scope for that to stop being true.
