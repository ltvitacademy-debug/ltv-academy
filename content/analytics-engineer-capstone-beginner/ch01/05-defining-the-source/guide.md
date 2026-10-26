# Lesson 5 — Defining the Source in dbt

**Chapter 1 · Beginner Capstone: First dbt Model on Snowflake · Lesson 5 of 10**

## What you'll learn

- The real `sources.yml` syntax, written for this project's own `raw_customers` table
- How `source()` resolves to the exact table loaded back in Lesson 3
- Why declaring a source is a small amount of YAML with real, lasting payoff
- Where this file lives inside the project's folder structure

## From "already in Snowflake" to "known to dbt"

Lesson 3 loaded a real `raw_customers` table into the `jaffle_shop_raw` database. Lesson 4
connected dbt to that same database. But dbt doesn't know that table exists yet — not
until it's declared as a **source**, the same concept from the prerequisite dbt course,
now written for real against this project's own data.

## The real `sources.yml`

```yaml
# models/staging/jaffle_shop/src_jaffle_shop.yml
version: 2

sources:
  - name: jaffle_shop
    database: jaffle_shop_raw
    schema: public
    tables:
      - name: raw_customers
```

Compare this to the dbt course's own example — same shape, same keys, just pointed at
this project's real database (`jaffle_shop_raw`, from Lesson 3's `CREATE OR REPLACE
DATABASE` statement) and this project's real table (`raw_customers`, not the course's
`customers`/`orders` pair). The source name (`jaffle_shop`, line 5) is a label dbt uses
to refer to this group of tables — it does not have to match the database name, though
keeping them aligned, as here, makes a project easier to read.

## Using it: `source()` instead of a hardcoded table name

Once declared, this project's staging model (Lesson 6) will reference the raw table like
this:

```sql
select * from {{ source('jaffle_shop', 'raw_customers') }}
-- resolves to: jaffle_shop_raw.public.raw_customers
```

Notice the two arguments: the source name (`jaffle_shop`, matching line 5 above) and the
table name (`raw_customers`, matching line 7 above) — not a hardcoded
`jaffle_shop_raw.public.raw_customers` string. If this table ever moved to a different
schema, exactly one line in `sources.yml` would change, and every model using
`source('jaffle_shop', 'raw_customers')` would keep working without edits.

## Why bother, for a project this small

You could write `select * from jaffle_shop_raw.public.raw_customers` directly and skip
`source()` entirely — it would even work, for a project this size. Declaring it properly
still buys you the same three things the prerequisite dbt course taught:

- **It shows up in the Lineage graph** as a real starting node, so the project's DAG tells
  the whole story, including where the data actually came from.
- **It becomes testable** — Lesson 7's `not_null` and `unique` tests can be pointed at a
  source column exactly the same way they're pointed at a model column.
- **Freshness checks become possible** — not used in this beginner project, but available
  the moment a source is declared, for free.

## Where this file lives

The real convention: a `.yml` file inside `models/staging/<source_name>/`, named
`src_<source_name>.yml` — here, `models/staging/jaffle_shop/src_jaffle_shop.yml`. This
keeps the source declaration next to the staging model that will reference it, which
Lesson 6 builds right alongside it.

## Key terms

| Term | Meaning |
|---|---|
| Source | A YAML declaration of raw, un-modeled data a dbt project reads from |
| `source()` | The function that resolves a source name + table name to the real warehouse table |
| Source name | The label (`jaffle_shop`) used inside dbt — independent of, but often matching, the real schema name |
| `src_<source_name>.yml` | The real naming convention for the file holding a source declaration |

## Lab

1. Create `models/staging/jaffle_shop/src_jaffle_shop.yml` in your own project, using the
   exact YAML above (adjust `database:`/`schema:` if your own Lesson 3 setup used
   different names).
2. Confirm dbt recognizes it: run `dbt compile` (or `dbt parse`) and check there's no
   error about the source.
3. Write one throwaway `select * from {{ source('jaffle_shop', 'raw_customers') }}` test
   query in a scratch model, run it, and confirm it returns the real rows from Lesson 3.

## Check yourself

You're ready for Lesson 6 when you have a real, working `sources.yml` declaring
`raw_customers`, and can explain — without looking it up — the two arguments `source()`
takes and what each one refers to.
