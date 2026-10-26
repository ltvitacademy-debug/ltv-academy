# Lesson 5 — Structuring Dev and Prod Schemas

**Chapter 2 · Snowflake Foundations · Lesson 5 of 26**

## What you'll learn

- Real `CREATE SCHEMA` statements separating `RAW`, `DEV`, and `PROD`
- Why dbt's `target` concept is the mechanism that actually makes this
  separation work in practice, not just in theory
- The grant pattern that gives `TRANSFORMER` write access to `DEV` and
  `PROD` while `ANALYST` only ever reads `PROD`
- How a developer's in-progress model and the business's trusted
  numbers coexist in the same database without colliding

## Three schemas, three jobs

```sql
USE DATABASE jaffle_shop_db;

CREATE SCHEMA IF NOT EXISTS raw;   -- already populated, Lesson 4
CREATE SCHEMA IF NOT EXISTS dev;   -- every developer's personal build target
CREATE SCHEMA IF NOT EXISTS prod;  -- the one schema Power BI (Lesson 22) ever sees
```

`RAW` is untouched source data. `DEV` is where a developer's `dbt
build` lands while they're actively working — safe to be wrong,
half-finished, or torn down and rebuilt. `PROD` is the schema that has
already passed Chapter 4's tests and Chapter 6's CI gate — the only
one anything business-facing is allowed to read from.

## Granting access to match each schema's job

```sql
-- TRANSFORMER (dbt) needs to read RAW, and write both DEV and PROD
GRANT USAGE ON SCHEMA raw TO ROLE transformer;
GRANT SELECT ON ALL TABLES IN SCHEMA raw TO ROLE transformer;
GRANT ALL ON SCHEMA dev TO ROLE transformer;
GRANT ALL ON SCHEMA prod TO ROLE transformer;

-- ANALYST only ever reads PROD -- never RAW, never DEV
GRANT USAGE ON SCHEMA prod TO ROLE analyst;
GRANT SELECT ON ALL TABLES IN SCHEMA prod TO ROLE analyst;
GRANT SELECT ON FUTURE TABLES IN SCHEMA prod TO ROLE analyst;
```

That last `GRANT ... ON FUTURE TABLES` line matters as much as the one
before it: without it, `analyst` would need a fresh grant every time
`dbt build` creates a brand-new mart in `prod` — `FUTURE TABLES`
makes the grant apply automatically to anything built there from now
on.

## How dbt's `target` concept maps onto this

dbt doesn't know about "dev" and "prod" as a built-in concept — it
knows about **targets**, named connection profiles a project can be
run against. This platform defines two targets, `dev` and `prod`,
each one pointing `dbt build` at a different Snowflake schema:

| dbt target | Snowflake schema it builds into | Who runs it |
|---|---|---|
| `dev` | `jaffle_shop_db.dev` (or a personal sub-schema per developer) | A developer, from their own laptop |
| `prod` | `jaffle_shop_db.prod` | CI only, after tests pass (Chapters 4 and 6) |

Lesson 6 writes the actual `profiles.yml` that defines both targets.
The schema separation this lesson builds in Snowflake is what makes
that `profiles.yml` meaningful — without two real schemas to point at,
"dev vs. prod" would just be two names for the same risk.

## Why this prevents real collisions

Two developers running `dbt build --target dev` at the same time don't
overwrite each other's work if each gets a personal schema under
`dev` (a common real pattern: `dev_alice`, `dev_bob`). And no
developer's half-finished model ever shows up in a Power BI report,
because Power BI's connection (Lesson 22) only ever points at `prod` —
a schema only CI is allowed to write to.

## Key terms

| Term | Meaning |
|---|---|
| `RAW` schema | Untouched source data, loaded by Lesson 4's `COPY INTO` statements |
| `DEV` schema | Where a developer's in-progress `dbt build` lands; safe to break |
| `PROD` schema | The only schema that has passed tests and CI; the only one Power BI reads |
| `GRANT ... ON FUTURE TABLES` | A grant that automatically applies to objects created after the grant itself |
| dbt target | A named connection profile; this platform's `dev` and `prod` targets point at different schemas |

## Lab

1. Write the three `CREATE SCHEMA` statements for `raw`, `dev`, and
   `prod`.
2. Write the grant statements giving `transformer` full access to
   `dev` and `prod`, and `analyst` read-only access to `prod` only —
   including the `FUTURE TABLES` grant.
3. In one sentence, explain what would go wrong if `analyst` was
   accidentally granted `SELECT` on `dev` instead of only `prod`.

## Check yourself

You're ready for Lesson 6 when you can write all three `CREATE SCHEMA`
statements and both roles' grants from memory, and explain why the
`FUTURE TABLES` grant is necessary for `analyst` specifically.
