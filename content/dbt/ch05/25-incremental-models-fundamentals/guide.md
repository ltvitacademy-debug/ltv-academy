# Lesson 25 — Incremental Models: Fundamentals

**Chapter 5 · Seeds, Snapshots & Incremental Models · Lesson 25 of 45**

## What you'll learn

- Why `materialized='table'` stops scaling once a model's source has
  real history behind it
- `materialized='incremental'` and the `is_incremental()` macro that
  makes it work
- How this is dbt's version of the watermark pattern from the
  Snowflake course, generalized into a materialization
- The one thing an incremental model needs that a table model doesn't:
  a reliable way to identify "new or changed" rows

## The problem: rebuilding everything, every run

From Lesson 11 you know dbt's materializations: `view`, `table`,
`incremental`, `ephemeral`. A `table` materialization drops and
rebuilds the entire model from scratch on every `dbt run` — running
the full `SELECT` against the full history of the upstream table or
source, every single time. That's fine for a small model. It stops
being fine for a fact table with years of history and a few thousand
new rows since yesterday, exactly the same problem the Snowflake
course's incremental-loading lesson raised: re-scanning and
re-transforming everything you already processed wastes real compute
for no benefit.

## `materialized='incremental'`

```sql
{{
    config(
        materialized='incremental',
        unique_key='order_id',
    )
}}

select
    order_id,
    customer_id,
    order_total,
    order_ts
from {{ source('shop', 'orders') }}

{% if is_incremental() %}
    where order_ts > (select max(order_ts) from {{ this }})
{% endif %}
```

The first time this model runs, `is_incremental()` is `false` — there's
no existing table yet — so the whole `select` runs and builds the full
table. Every run after that, `is_incremental()` is `true`, and the
`where` clause inside it activates: dbt only selects rows newer than
the current maximum `order_ts` already sitting in the target table,
then merges just those rows in.

## This is the watermark pattern, generalized

`select max(order_ts) from {{ this }}` **is** the watermark pattern
from Snowflake — except instead of you maintaining a separate
`load_watermarks` table and remembering to advance it, the watermark
*is* the target table itself, and dbt's incremental materialization
handles reading it and merging the new rows automatically. `{{ this }}`
is dbt's way of referring to "the table this model builds" from inside
its own SQL — exactly what you need to compare against your own
existing output.

## What an incremental model needs that a table model doesn't

Two things, both visible in the config above:

- **`unique_key`** — how dbt tells "this is an update to a row I
  already have" from "this is a brand-new row." Without it, reruns can
  duplicate rows instead of updating them.
- **A reliable "what's new" column** — `order_ts` here, playing the
  exact role the watermark column played in Snowflake. If that column
  isn't reliably increasing (or isn't populated consistently), the
  `is_incremental()` filter can silently miss rows.

## Key terms

| Term | Meaning |
|---|---|
| `materialized='incremental'` | Builds a model by processing only new/changed rows on repeat runs, instead of the whole table |
| `is_incremental()` | A macro that's `false` on the first run (no table yet) and `true` after — gates the incremental-only filter |
| `{{ this }}` | Refers to the model's own target table from inside its SQL — used to find the current max watermark |
| `unique_key` | Tells dbt how to match incoming rows to existing rows, so updates don't become duplicates |

## Lab

1. Take an existing `table`-materialized model with a timestamp
   column and change its config to `materialized='incremental'` with
   a `unique_key`.
2. Add the `is_incremental()` block filtering on that timestamp
   against `{{ this }}`.
3. Run `dbt run` twice in a row and confirm the second run's logs show
   far fewer rows processed than the first.
4. Insert one new row into the source and rerun — confirm only that
   row gets picked up.

## Check yourself

You're ready for Lesson 26 when you can explain what `is_incremental()`
returns on a model's very first run, and why that has to be `false`
for the model to build at all.
