# Lesson 27 — Incremental Model Gotchas & Full Refreshes

**Chapter 5 · Seeds, Snapshots & Incremental Models · Lesson 27 of 45**

## What you'll learn

- Two real failure modes: a schema change silently breaking an
  incremental model, and late-arriving data quietly getting skipped
- Why these failures are dangerous specifically *because* incremental
  models don't reprocess history — a bad run doesn't fix itself
- `dbt run --full-refresh` as the fix, and what it actually does
- A habit that prevents most of this: rebuilding on `--full-refresh`
  regularly, not just when something's already broken

## Gotcha 1: a schema change breaks the model silently

An incremental model's `select` only ever runs against *new* rows
after the first build. If someone adds a column to the source table,
or changes a column's type, the model's existing target table doesn't
know about it — the new column is either missing from historical rows
or, worse, silently absent from the model's compiled SQL entirely if
you're doing `select *` without an explicit column list:

```sql
-- fragile: a new source column shows up in new rows,
-- but never appears in the rows already built
select * from {{ source('shop', 'orders') }}
{% if is_incremental() %}
    where order_ts > (select max(order_ts) from {{ this }})
{% endif %}
```

Because the model never re-reads old rows, this failure is invisible
until someone queries a historical row and finds the new column is
`null` there but populated for anything built after the schema
changed — a silent, half-populated column that looks like a data
quality bug instead of what it actually is.

## Gotcha 2: late-arriving data gets missed

The `is_incremental()` filter trusts that a row's timestamp column
reflects when it actually shows up in the source. Real systems don't
always cooperate — an order placed Tuesday might not land in the
source table (due to an upstream processing delay) until Thursday,
*with a Tuesday timestamp already on it*. If Wednesday's incremental
run already advanced the watermark past Tuesday, that Thursday-arriving,
Tuesday-timestamped row gets filtered out and silently never picked
up, ever — the model's `where` clause is comparing against the wrong
signal (event time) when it should sometimes be comparing against
processing time, or applying a lookback window:

```sql
-- a lookback window re-checks a few recent days every run,
-- trading a little redundant work for catching late arrivals
{% if is_incremental() %}
    where order_ts > (
        select dateadd(day, -3, max(order_ts)) from {{ this }}
    )
{% endif %}
```

## The fix: `dbt run --full-refresh`

```bash
dbt run --full-refresh --select stg_orders
```

`--full-refresh` drops the model's target table and rebuilds it from
scratch — the exact same `select` that runs on a brand-new model's
first build, ignoring `is_incremental()`'s usual filtering entirely.
It's the direct fix for both gotchas above: a full refresh re-derives
every row against the *current* schema and picks up every row
regardless of when it arrived, because nothing gets filtered out.

## Why this isn't a "run it and forget it" fix

A full refresh costs exactly what the incremental model was built to
avoid — a full reprocessing of the entire history. That's the correct
occasional cost, not a free action to run casually on every deploy.
The healthy pattern: run incrementally day to day, and schedule
periodic full refreshes (weekly, or triggered specifically after a
known schema change) so silent drift gets caught on a known cadence
instead of only when someone notices bad numbers downstream.

## Key terms

| Term | Meaning |
|---|---|
| Schema drift | A source column added/changed after an incremental model's first build, invisible in already-built rows |
| Late-arriving data | A row that reaches the source after the watermark has already advanced past its timestamp |
| Lookback window | Re-checking a few recent periods every run to catch late arrivals, at the cost of some redundant reprocessing |
| `dbt run --full-refresh` | Drops and rebuilds an incremental model's target table from scratch, ignoring `is_incremental()` |

## Lab

1. Add a new column to a source table feeding one of your incremental
   models, and confirm rows built before the change show `null` for
   it while rows built after show a real value.
2. Run `dbt run --full-refresh --select <model>` and confirm every row
   now has the new column populated.
3. Simulate late-arriving data: insert a row with a timestamp older
   than your model's current watermark, rerun incrementally, and
   confirm it gets silently skipped. Then add a lookback window and
   confirm the same row gets picked up.

## Check yourself

You're ready for Lesson 28 when you can explain why `--full-refresh`
fixes both a schema change and late-arriving data with the same
mechanism — ignoring the incremental filter entirely, not two
different fixes for two different problems.
