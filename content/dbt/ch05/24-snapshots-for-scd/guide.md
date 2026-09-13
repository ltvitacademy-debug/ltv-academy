# Lesson 24 — Snapshots for Slowly Changing Dimensions

**Chapter 5 · Seeds, Snapshots & Incremental Models · Lesson 24 of 45**

## What you'll learn

- Why dbt's `snapshot` exists: it's dbt's own mechanism for the SCD
  Type 2 pattern you already built by hand in Snowflake
- The two strategies — `timestamp` and `check` — and when to use each
- The columns a snapshot adds automatically (`dbt_valid_from`,
  `dbt_valid_to`, `dbt_scd_id`)
- Why a snapshot has to run on a schedule to actually capture history

## The reminder: you already know SCD Type 2

From the Snowflake course you already know **SCD Type 2**: instead of
overwriting a dimension row when an attribute changes, you close out
the old row (mark it no longer current, stamp an expiry date) and
insert a new one. You also already built that by hand — a two-step
`UPDATE` then `INSERT` pattern. A **dbt snapshot** is the same idea,
but dbt generates and runs that logic for you from one YAML/SQL config
instead of you writing the `UPDATE`/`INSERT` pair yourself.

## Defining a snapshot

Snapshots live in `snapshots/` as `.sql` files with a `snapshot`
block:

```sql
-- snapshots/customers_snapshot.sql
{% snapshot customers_snapshot %}

{{
    config(
      target_schema='snapshots',
      unique_key='customer_id',
      strategy='timestamp',
      updated_at='updated_at',
    )
}}

select * from {{ source('crm', 'customers') }}

{% endsnapshot %}
```

Run it with:

```bash
dbt snapshot
```

Every run, dbt compares the current source rows against what it
already captured, closes out any row whose tracked value changed, and
inserts a new current version — the exact two-step pattern from
Snowflake, generated for you.

## Two strategies: timestamp vs. check

**`timestamp` strategy** — trusts a reliable `updated_at` column on the
source. If the row's `updated_at` is newer than what's already
captured, dbt records a new version. Simple and cheap, but only as
correct as the source's `updated_at` column actually is.

```yaml
strategy: timestamp
updated_at: updated_at
```

**`check` strategy** — for sources with no trustworthy `updated_at`.
dbt instead compares the actual values of the columns you list, and
records a new version whenever any of them differ from the last
captured version:

```yaml
strategy: check
check_cols: [customer_name, region, plan_tier]
```

`check_cols: all` compares every column, but that's expensive and
trips on irrelevant columns changing — listing only the columns that
actually matter is almost always the better call.

## What a snapshot adds automatically

Unlike the hand-rolled Snowflake version, dbt manages the effective-
dating columns for you:

| Column | Meaning |
|---|---|
| `dbt_valid_from` | When this version became current |
| `dbt_valid_to` | When this version was superseded (`null` = still current) |
| `dbt_scd_id` | A unique hash identifying this specific version row |

Querying "what was this customer's region on March 1st" is a `WHERE`
clause against `dbt_valid_from`/`dbt_valid_to` — no different from
querying the `effective_date`/`expiry_date` pair from Snowflake.

## Snapshots only capture what they can see

A snapshot only records history from the moment it starts running
forward — it cannot retroactively reconstruct changes that happened
before the first `dbt snapshot` run, and it only sees a change if the
source row is *different* the next time the snapshot runs. If the
snapshot runs nightly and a value changes twice in one day, you only
ever see the second change. This is why snapshots have to be scheduled
(dbt Cloud jobs, covered in Chapter 7) to run regularly — a snapshot
that's never rerun is just a one-time copy, not a history.

## Key terms

| Term | Meaning |
|---|---|
| Snapshot | dbt's mechanism for capturing row-level history over time — its version of SCD Type 2 |
| `timestamp` strategy | Detects change via a trusted `updated_at` column |
| `check` strategy | Detects change by comparing actual column values |
| `dbt_valid_from` / `dbt_valid_to` | The auto-added effective-dating columns marking each version's active window |

## Lab

1. Create a `snapshots/customers_snapshot.sql` snapshotting a source
   table, using the `timestamp` strategy against an `updated_at`
   column.
2. Run `dbt snapshot`, then change one row's tracked attribute at the
   source and rerun.
3. Query the snapshot table and confirm you now have two rows for that
   `customer_id` — one with a non-null `dbt_valid_to`, one still
   current.
4. Repeat using the `check` strategy against a source with no reliable
   `updated_at`, listing only the columns you actually care about.

## Check yourself

You're ready for Lesson 25 when you can explain when you'd reach for
`check` instead of `timestamp` — and why `dbt_valid_to` being `null`
is what marks a row as the current version.
