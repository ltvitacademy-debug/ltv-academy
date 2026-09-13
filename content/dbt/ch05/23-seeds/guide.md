# Lesson 23 — Seeds: Loading Static Reference Data

**Chapter 5 · Seeds, Snapshots & Incremental Models · Lesson 23 of 45**

## What you'll learn

- What a dbt **seed** is, and the specific, narrow case it's for
- How a CSV in `seeds/` becomes a real table via `dbt seed`
- Controlling column types with `+column_types`, and `ref()`-ing a seed
  from a model exactly like any other model
- Why seeds are the wrong tool for anything that isn't small and static

## What a seed actually is

A **seed** is a CSV file, committed to your dbt project under
`seeds/`, that `dbt seed` loads into your warehouse as a real table.
That's the whole mechanism — no extraction, no pipeline, just a file
in version control turned into a table by a CLI command.

Seeds exist for exactly one situation: small, static reference data
that doesn't come from — and doesn't belong in — a real source system.
Classic examples: a country-code-to-region lookup, a mapping from a
legacy status code to a human-readable label, a short list of holiday
dates. Data nobody else owns, that changes rarely, and that's small
enough to be readable as a diff in a pull request.

## Building a seed

```csv
country_code,country_name,region
US,United States,North America
CA,Canada,North America
GB,United Kingdom,Europe
DE,Germany,Europe
JP,Japan,Asia
```

Save that as `seeds/country_codes.csv`, then run:

```bash
dbt seed
```

dbt creates (or replaces) a table named `country_codes` in your target
schema, with one row per CSV row. Every column comes through as
whatever type dbt infers from the data — which is where things can go
wrong for anything that isn't obviously a string or number.

## Controlling column types

Leading zeros, currency-looking strings, and anything ambiguous can
get inferred as the wrong type. Pin it explicitly in `dbt_project.yml`:

```yaml
seeds:
  my_dbt_project:
    country_codes:
      +column_types:
        country_code: varchar(2)
        country_name: varchar(100)
        region: varchar(50)
```

## Using a seed like any other model

Once loaded, a seed is `ref()`-able exactly like a model — nothing
downstream needs to know it started life as a CSV instead of a `.sql`
file:

```sql
select
    o.order_id,
    o.customer_id,
    c.region
from {{ ref('stg_orders') }} o
left join {{ ref('country_codes') }} c
    on o.country_code = c.country_code
```

That single `ref('country_codes')` is also why seeds count as nodes in
the lineage graph from Lesson 1 — dbt doesn't care that the upstream
node started as a file you typed by hand.

Two CLI options worth knowing:

```bash
dbt seed --select country_codes   # reload just one seed
dbt seed --full-refresh           # drop and rebuild seed tables from scratch
```

## What seeds are *not* for

This is the part that trips people up: seeds are not a general-purpose
data-loading tool. If the data is large, changes often, or is owned by
some other system (an app database, an API, a SaaS export), it belongs
in a real source loaded by an ingestion pipeline — the kind of thing
covered in the Data Factory and Databricks courses in this catalog —
and then declared with `source()`, not hand-typed into a CSV and
committed to Git. A seed you're editing every week is a sign the data
should be a source instead.

## Key terms

| Term | Meaning |
|---|---|
| Seed | A CSV file in `seeds/` that `dbt seed` loads into the warehouse as a table |
| `dbt seed` | The CLI command that (re)loads seed CSVs into tables |
| `+column_types` | Config that pins a seed column's type instead of trusting inference |
| `--full-refresh` (seeds) | Drops and rebuilds seed tables from the CSV, instead of loading incrementally |

## Lab

1. Create `seeds/country_codes.csv` with the five rows above (or your
   own small reference dataset).
2. Run `dbt seed` and confirm the table exists in your warehouse with
   the right row count.
3. Add a `+column_types` config for one column in `dbt_project.yml`
   and rerun with `dbt seed --full-refresh` to confirm the type takes
   effect.
4. Write one model that `ref()`s your new seed in a join.

## Check yourself

You're ready for Lesson 24 when you can explain, in one sentence, the
specific test for "should this be a seed" — and why "the data barely
ever changes and nobody else owns it" is the test, not "it's small."
