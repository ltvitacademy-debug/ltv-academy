# Lesson 12 — Handling a Late-Breaking Source Schema Change

**Chapter 3 · Building the dbt Model Layer · Lesson 12 of 26**

## What you'll learn

- The scenario: `raw_orders.status` gets renamed to `order_status` by
  the source system, with no warning, after this pipeline is already
  built and running
- The real ripple this rename causes across the staging model,
  intermediate/mart models, tests, and docs — in order
- How dbt's `ref()`/`source()` dependency graph makes the blast radius
  of this change traceable instead of a mystery
- Why this is the most realistic "production incident" this chapter
  simulates

## The scenario

Midway through this project, the source system renames a column.
`raw_orders.status` becomes `raw_orders.order_status` — same data,
same meaning, different name, changed on the source side without
coordinating with the analytics team first. This is an extremely
common real failure mode: a source-system team ships a schema change
that has nothing to do with dbt, and dbt finds out the hard way.

## Where it actually breaks first

```sql
-- stg_jaffle_shop__orders.sql, as it stood before the change
select
    id as order_id,
    user_id as customer_id,
    order_date,
    status        -- <- this column no longer exists
from source
```

The very next `dbt build` fails here, at the staging model — exactly
one layer away from the raw source, and exactly where Lesson 7 said a
rename belongs. The error Snowflake returns through dbt is an
"invalid identifier" on `status`, not a vague failure — dbt surfaces
the database's own column-not-found error directly in the build log.

## Finding the blast radius with the dependency graph

Before touching any SQL, the real first move is `dbt ls --select
stg_jaffle_shop__orders+` — the `+` suffix means "and everything that
depends on this model, downstream." That one command lists exactly
which models are affected, using the same `ref()` graph Lesson 14's
lineage view will later show visually:

```
stg_jaffle_shop__orders
orders          (ref()'s stg_jaffle_shop__orders)
customers       (ref()'s orders)
```

This is the real payoff of building staging/intermediate/marts the
way Chapters 3 planned them: the blast radius isn't a guess, it's a
graph query.

## The four-stop fix, in order

| Stop | What changes |
|---|---|
| 1. Staging | `stg_jaffle_shop__orders.sql`: rename `status` → `order_status` in the source read, and rename the output column consistently |
| 2. Downstream SQL | Any place `orders.sql` or `customers.sql` referenced the old `status` column name directly |
| 3. Tests | Any generic or custom test (Chapter 4) referencing the old column name in its `.yml` config |
| 4. Docs | Column descriptions in `.yml` files mentioning `status` by its old name |

```sql
-- stg_jaffle_shop__orders.sql, fixed
select
    id as order_id,
    user_id as customer_id,
    order_date,
    order_status as status   -- source renamed it; this model's output name doesn't have to change
from source
```

Renaming the *source* read but keeping the staging model's *output*
column named `status` is a deliberate choice worth calling out: it
contains the blast radius at exactly one file. Every downstream model,
test, and dashboard that already referenced `status` keeps working
unmodified — only the one line reading from the renamed source column
had to change at all.

## Why containing it here is the actual lesson

If the staging model's output had also been renamed to match the
source, the rename would have rippled into every downstream model,
every test, and the Power BI report in Chapter 7 — all for a change
that carries zero new information. Staging models exist specifically
to absorb a source-side rename like this one, so nothing below them
has to care that it happened.

## Re-verifying after the fix

```
dbt build --select stg_jaffle_shop__orders+
```

Re-running the affected models and their tests (using the same `+`
dependency syntax used to find the blast radius) is the real
confirmation this is fixed — not just "the staging model builds
again," but every downstream model and test in its blast radius too.

## Key terms

| Term | Meaning |
|---|---|
| Late-breaking schema change | A source-system structural change discovered after a pipeline is already built and running |
| `dbt ls --select model+` | Lists a model and everything downstream that depends on it |
| Blast radius | How far a change's effects reach before something absorbs or catches it |
| Absorbing a rename | Keeping a staging model's output column name stable even when its source column's name changes |

## Lab

1. Write the broken `stg_jaffle_shop__orders.sql` (reading the renamed
   `order_status` column by its old name) and describe the exact error
   `dbt build` would surface.
2. Run (or write out) the `dbt ls --select stg_jaffle_shop__orders+`
   command and list every model in the blast radius.
3. Write the fixed staging model, and explain in one sentence why its
   output column stays named `status` even though the source column is
   now `order_status`.

## Check yourself

You're ready for Chapter 4 when you can find a model's full downstream
blast radius using `dbt ls --select <model>+` and explain why
absorbing a source rename inside the staging layer is better than
letting it propagate.
