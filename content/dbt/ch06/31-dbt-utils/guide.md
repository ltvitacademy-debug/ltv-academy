# Lesson 31 — dbt_utils: The Macros You'll Actually Reuse

**Chapter 6 · Jinja & Macros · Lesson 31 of 45**

## What you'll learn

- Why `dbt-labs/dbt_utils` is the one package nearly every dbt project
  installs
- `generate_surrogate_key()` — a consistent, cross-warehouse surrogate
  key, replacing the `HASH()` you used by hand in Snowflake
- `date_spine()` — generating a row per day/week/month with no source
  table needed
- A few more macros worth knowing by name: `star()`, `pivot()`,
  `union_relations()`

## `generate_surrogate_key()` — the surrogate key macro

In Snowflake you built surrogate keys with `HASH(customer_id)`, and
later — for SCD2 — `HASH(customer_id, effective_date)`. Snowflake's
`HASH()` is Snowflake-specific. `dbt_utils.generate_surrogate_key()`
does the same job, but compiles to whatever hashing function the
target warehouse actually supports — so the same model works
unchanged whether it runs on Snowflake, BigQuery, or Postgres:

```sql
select
    {{ dbt_utils.generate_surrogate_key(['customer_id', 'order_date']) }}
        as order_key,
    customer_id,
    order_date,
    order_total
from {{ ref('stg_orders') }}
```

It also handles `null` values consistently across columns — something
a hand-rolled `HASH()` call quietly gets wrong if you don't think to
coalesce nulls first.

## `date_spine()` — a full date range with no source table

Reporting almost always needs a row per day (or week, or month) even
for days with zero orders — you can't `GROUP BY` your way to a day
that has no rows to group. `date_spine()` generates that calendar
directly, no source table required:

```sql
-- models/marts/dim_date.sql
select *
from {{ dbt_utils.date_spine(
    datepart="day",
    start_date="cast('2023-01-01' as date)",
    end_date="cast('2026-12-31' as date)"
) }}
```

That's a complete `dim_date`-style spine in one macro call — the kind
of thing that used to be a recursive CTE or a hand-maintained calendar
table.

## Worth knowing by name

- **`star()`** — selects all columns from a relation except the ones
  you list, useful in staging models that want "everything except
  these two renamed columns."
- **`pivot()`** — turns distinct row values into columns (a status
  column's values becoming `orders_pending`, `orders_shipped`, etc.) —
  the same shape as the manual `for`-loop version from Lesson 28,
  generalized into one call.
- **`union_relations()`** — unions several tables with slightly
  different (but overlapping) column sets into one, filling in `null`
  for any table missing a given column — common when the same source
  system ships one table per region or per year.

```sql
select * from {{ dbt_utils.union_relations(
    relations=[ref('orders_us'), ref('orders_eu'), ref('orders_apac')]
) }}
```

## Why `dbt_utils` specifically

Every macro above solves a problem that shows up in nearly every
warehouse project, which is exactly why `dbt_utils` — not some
smaller, more specialized package — is the one nearly universal
install. It's the direct successor to Lesson 30's argument: these
patterns are already solved, tested across warehouses, and maintained
by dbt Labs, so writing your own `generate_surrogate_key` from scratch
is very rarely the right call anymore.

## Key terms

| Term | Meaning |
|---|---|
| `dbt_utils.generate_surrogate_key()` | Cross-warehouse surrogate key generation, replacing hand-rolled `HASH()` |
| `dbt_utils.date_spine()` | Generates a full date range as rows, with no source table needed |
| `dbt_utils.star()` | Selects all columns except the ones excluded |
| `dbt_utils.union_relations()` | Unions tables with overlapping but not identical columns, filling missing ones with `null` |

## Lab

1. Add `dbt_utils.generate_surrogate_key()` to a model that previously
   used a hand-written key, and confirm the compiled SQL via
   `dbt compile`.
2. Build a `dim_date` model using `date_spine()` covering a date range
   that includes today.
3. If you have two similarly-shaped tables in your project (or seeds),
   combine them with `union_relations()` and confirm mismatched
   columns come through as `null` rather than an error.

## Check yourself

You're ready for Lesson 32 when you can name, from memory, which
`dbt_utils` macro solves "I need a calendar of dates with no source
table" versus "I need a consistent key across warehouses."
