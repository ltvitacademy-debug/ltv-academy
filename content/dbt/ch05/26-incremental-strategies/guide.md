# Lesson 26 — Incremental Strategies: merge, delete+insert, append

**Chapter 5 · Seeds, Snapshots & Incremental Models · Lesson 26 of 45**

## What you'll learn

- The `incremental_strategy` config, and the three strategies dbt
  supports on most warehouses
- `merge` — update matched rows, insert new ones, in one statement
  (you already know this shape from T-SQL and Snowflake `MERGE`)
- `delete+insert` — when a whole batch of rows needs replacing rather
  than field-by-field updating
- `append` — the cheapest strategy, and the one specific case where
  duplicates are an acceptable trade-off

## The config

`is_incremental()` (Lesson 25) decides *which rows* get selected on a
repeat run. `incremental_strategy` decides *what dbt does* with those
rows once selected — set it in the same `config()` block:

```sql
{{
    config(
        materialized='incremental',
        unique_key='order_id',
        incremental_strategy='merge',
    )
}}
```

## `merge` — the default, and usually the right call

```sql
{{
    config(
        materialized='incremental',
        unique_key='order_id',
        incremental_strategy='merge',
    )
}}

select order_id, customer_id, order_total, order_status, order_ts
from {{ source('shop', 'orders') }}

{% if is_incremental() %}
    where order_ts > (select max(order_ts) from {{ this }})
{% endif %}
```

This compiles to a real `MERGE` statement — the same statement you
already know from T-SQL and used directly in Snowflake: match on
`unique_key`, update the row if it already exists, insert it if it
doesn't. Correct for the common case: individual rows can change after
they first arrive (an order's `order_status` updates from "pending" to
"shipped"), and you want the latest value reflected in place, not a
second row.

## `delete+insert` — replace whole batches, not fields

```sql
{{
    config(
        materialized='incremental',
        unique_key='order_id',
        incremental_strategy='delete+insert',
    )
}}
```

Instead of matching and updating field-by-field, this deletes every
row in the target whose `unique_key` shows up in the new batch, then
inserts the new batch wholesale. The end state looks identical to
`merge` for simple cases, but it's the better choice when a batch
naturally replaces a whole prior batch (e.g., reprocessing "yesterday's
orders" as one unit) rather than patching individual columns on
existing rows — and on warehouses where `MERGE` is unsupported or
slow, `delete+insert` is the fallback.

## `append` — cheapest, but duplicates are your problem

```sql
{{
    config(
        materialized='incremental',
        incremental_strategy='append',
    )
}}

select event_id, event_type, occurred_at
from {{ source('app', 'events') }}

{% if is_incremental() %}
    where occurred_at > (select max(occurred_at) from {{ this }})
{% endif %}
```

`append` just inserts the new rows — no matching, no `unique_key`
needed at all. It's the cheapest strategy by far, and it's correct
*only* for genuinely append-only data: immutable event logs,
clickstream data, anything where a row is never updated after it's
first written. Use `append` on data that can be updated later and
you'll get duplicate rows the moment a "new" row turns out to be a
changed version of one you already have.

## Choosing between them

| Situation | Strategy |
|---|---|
| Rows can be updated after arrival, need latest value in place | `merge` |
| A whole batch replaces a whole prior batch, or `MERGE` isn't supported | `delete+insert` |
| Truly immutable, append-only event data | `append` |

## Key terms

| Term | Meaning |
|---|---|
| `incremental_strategy` | Config controlling how selected incremental rows get applied to the target table |
| `merge` | Update matched rows, insert new ones — same shape as T-SQL/Snowflake `MERGE` |
| `delete+insert` | Deletes matching-key rows, then inserts the new batch wholesale |
| `append` | Inserts new rows with no matching at all — cheapest, but unsafe for mutable data |

## Lab

1. Take the incremental model from Lesson 25's lab and add
   `incremental_strategy='merge'` explicitly.
2. Update one existing source row's non-key column and rerun — confirm
   the target table shows the updated value with no duplicate row.
3. Switch the same model to `incremental_strategy='append'`, rerun the
   same update, and observe the duplicate row it produces — this is
   the exact failure `append` warns against.

## Check yourself

You're ready for Lesson 27 when you can explain, without looking it
up, which strategy to reach for when a batch replaces a whole prior
batch versus when individual rows get updated after they first arrive.
