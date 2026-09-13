# Lesson 22 — CTAS & SQL-Based Transformations

**Chapter 5 · Data Transformation / ELT · Lesson 22 of 60**

## What you'll learn

- `CREATE TABLE AS SELECT` (CTAS) — the single statement that does most of a Snowflake transformation
- Why `CREATE OR REPLACE TABLE ... AS SELECT` is the safe, idempotent way to rerun a transformation
- How CTAS compares to T-SQL's `SELECT ... INTO`, which you already know
- Where business logic (casts, calculated columns, filters) belongs inside a CTAS statement

## CTAS: transform and materialize in one statement

`CREATE TABLE AS SELECT` builds a brand-new table from a query's
result set — no separate `CREATE TABLE` with a column list, then an
`INSERT INTO ... SELECT`. Column names and types are inferred from the
query itself:

```sql
CREATE TABLE staging.orders_cleaned AS
SELECT
    order_id,
    customer_id,
    TRY_CAST(order_total AS NUMBER(12,2)) AS order_total,
    TO_TIMESTAMP_NTZ(order_ts)            AS order_ts
FROM raw.orders
WHERE order_id IS NOT NULL;
```

That single statement *is* the transformation: casting `order_total`
to a proper numeric type, normalizing the timestamp, and filtering out
rows with no order ID at all. This is the core building block Lessons
23-25 all sit on top of.

## Making it safe to rerun: CREATE OR REPLACE

A plain `CREATE TABLE AS SELECT` fails on the second run — the table
already exists. In an ELT pipeline you rerun constantly, that's a
problem. `CREATE OR REPLACE TABLE ... AS SELECT` swaps the table
atomically: the old version is fully replaced by the new result set in
one operation, with no window where the table is empty or half-built:

```sql
CREATE OR REPLACE TABLE staging.orders_cleaned AS
SELECT
    order_id,
    customer_id,
    TRY_CAST(order_total AS NUMBER(12,2)) AS order_total,
    TO_TIMESTAMP_NTZ(order_ts)            AS order_ts
FROM raw.orders
WHERE order_id IS NOT NULL;
```

This is the pattern most staging and business-ready tables in a
Snowflake ELT pipeline are actually built with — a scheduled task
(Chapter 8 covers Tasks) reruns this exact statement on a schedule,
and each run fully rebuilds the table from the current state of the
layer beneath it.

## CTAS vs. T-SQL's SELECT INTO

You've used `SELECT ... INTO` in T-SQL to do something similar. The
idea is the same — build a table from a query — but the failure mode
is different:

| | T-SQL `SELECT ... INTO` | Snowflake CTAS |
|---|---|---|
| Table already exists | Errors out | `CREATE OR REPLACE` swaps it atomically |
| Typical use in a pipeline | One-off, or wrapped in manual DROP-then-recreate logic | The default way to rebuild a staging/business-ready table on every run |
| Column types | Inferred from the query | Inferred from the query — same idea |

The practical difference: in Snowflake, "drop and rebuild" isn't a
workaround you bolt on — `CREATE OR REPLACE TABLE AS SELECT` *is* the
idiom, safe to run unattended on a schedule.

## Where business logic belongs

Casts, calculated columns, `CASE` expressions, and filters all belong
directly in the `SELECT` that feeds the CTAS — there's no separate
"transformation layer" to configure. If a column needs a business rule
applied (say, flagging high-value orders), it goes in the same
statement:

```sql
CREATE OR REPLACE TABLE analytics.orders_flagged AS
SELECT
    order_id,
    customer_id,
    order_total,
    CASE WHEN order_total >= 1000 THEN TRUE ELSE FALSE END AS is_high_value
FROM staging.orders_cleaned;
```

## Key terms

| Term | Meaning |
|---|---|
| CTAS | `CREATE TABLE AS SELECT` — builds a new table from a query's result set |
| `CREATE OR REPLACE TABLE ... AS SELECT` | Atomically swaps an existing table for a fresh result set — the rerunnable, idempotent form |
| Idempotent | Safe to run repeatedly with the same result each time — no manual cleanup needed between runs |
| `TRY_CAST` | Casts a value to a type, returning `NULL` instead of erroring on bad input |

## Lab

1. Using a raw table from an earlier chapter's lab, write a plain CTAS
   that casts at least one column and filters out at least one bad-data
   condition.
2. Rerun the exact same statement and confirm it errors — then change
   it to `CREATE OR REPLACE TABLE ... AS SELECT` and confirm it now
   reruns cleanly.
3. Add one `CASE`-expression business rule to the `SELECT` and rerun.

## Check yourself

You're ready for Lesson 23 when you can explain why
`CREATE OR REPLACE TABLE ... AS SELECT`, not plain CTAS, is the form
you'd actually put on a schedule.
