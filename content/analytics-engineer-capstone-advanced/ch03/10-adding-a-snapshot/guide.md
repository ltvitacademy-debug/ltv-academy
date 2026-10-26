# Lesson 10 — Adding a Snapshot for Slowly Changing Customer Status

**Chapter 3 · Building the dbt Model Layer · Lesson 10 of 26**

## What you'll learn

- What a dbt snapshot actually does, and why `SELECT *` can't answer
  "what was this customer's status last month"
- Real `{% snapshot %}` / `{% endsnapshot %}` syntax, with the
  `timestamp` strategy, `unique_key`, and `updated_at`
- Why Jaffle Shop needs this specifically for customer status, a value
  this capstone treats as mutable over time
- How to run a snapshot and read what it recorded

## The problem a snapshot solves

`raw_customers` (and the staging model on top of it) only ever shows a
customer's *current* status — active, inactive, VIP, whatever this
platform tracks. If leadership asks "which customers churned last
quarter," a table that only holds today's value has no way to answer
that — the history is gone the moment a row is overwritten.

To make this concrete, assume Jaffle Shop's `raw_customers` is
extended with a `status` column (`active`/`inactive`) and an
`updated_at` timestamp, maintained by the source system whenever that
status changes.

## The real snapshot syntax

```sql
-- snapshots/customer_status_snapshot.sql
{% snapshot customer_status_snapshot %}

{{
    config(
      target_schema='snapshots',
      unique_key='customer_id',
      strategy='timestamp',
      updated_at='updated_at',
    )
}}

select
    id as customer_id,
    status,
    updated_at
from {{ source('jaffle_shop', 'raw_customers') }}

{% endsnapshot %}
```

- **`strategy='timestamp'`** tells dbt to compare each row's
  `updated_at` against what it already recorded, and insert a new
  snapshot row whenever that timestamp has moved forward.
- **`unique_key='customer_id'`** is how dbt knows which snapshot rows
  belong to the same real customer across multiple snapshot runs.
- **`updated_at='updated_at'`** names the column the timestamp
  strategy actually compares.

## Running it

```
dbt snapshot
```

Each run checks every row in the source query against what's already
in `snapshots.customer_status_snapshot`. A customer whose `status`
hasn't changed produces no new row. A customer whose status just
flipped from `active` to `inactive` gets a new snapshot row, with
dbt's own added `dbt_valid_from` / `dbt_valid_to` columns marking
exactly when each version was current.

## Reading the result

```sql
select customer_id, status, dbt_valid_from, dbt_valid_to
from snapshots.customer_status_snapshot
where customer_id = 42
order by dbt_valid_from;
```

A customer with two rows here — one with a real `dbt_valid_to` and one
with `dbt_valid_to IS NULL` — has a real, queryable status history:
exactly the "was this customer active last quarter" question `raw_customers`
alone could never answer.

## Why this matters for governance

A snapshot is itself a governance artifact: it's the platform's answer
to "can we reconstruct history," asked and answered once, in version
-controlled SQL, instead of "hopefully someone exported a backup." It
also shows up as its own node in Lesson 14's lineage graph — visibly
connected to the `raw_customers` source it watches.

## Key terms

| Term | Meaning |
|---|---|
| Snapshot | A dbt mechanism that records row-level change history over time |
| `strategy='timestamp'` | Compares a named `updated_at` column to detect changes |
| `unique_key` | The column identifying which snapshot rows represent the same real-world record |
| `dbt_valid_from` / `dbt_valid_to` | Columns dbt adds automatically, marking when each snapshotted version was current |

## Lab

1. Write `customer_status_snapshot.sql` exactly as shown, under
   `snapshots/`.
2. Run `dbt snapshot` twice — once against the current data, then
   again after manually changing one customer's `status` and
   `updated_at` in `raw_customers` — and confirm a second row appears
   for that customer.
3. Write the `SELECT` that reconstructs one customer's full status
   history using `dbt_valid_from`/`dbt_valid_to`.

## Check yourself

You're ready for Lesson 11 when you can write the snapshot's config
block from memory and explain, in one sentence, why `SELECT *` on
`raw_customers` alone could never answer a "status as of last month"
question.
