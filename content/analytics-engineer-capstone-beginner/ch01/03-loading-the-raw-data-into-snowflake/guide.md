# Lesson 3 — Loading the Raw Data into Snowflake

**Chapter 1 · Beginner Capstone: First dbt Model on Snowflake · Lesson 3 of 10**

## What you'll learn

- Real `CREATE OR REPLACE STAGE` and `COPY INTO` syntax, the same idiom from the
  prerequisite Snowflake course, now applied to this project's own data
- How to load `raw_customers.csv` — the real public dbt Labs Jaffle Shop seed file — into a
  Snowflake table
- How to confirm a load actually worked before trusting it
- Why this step happens before dbt ever gets involved

## Before dbt: getting the raw data into the warehouse

Lesson 2's plan assumed `raw_customers` already exists in Snowflake — but something has
to put it there first. dbt transforms data that's already in the warehouse; it doesn't
load data into the warehouse. That loading step is exactly the stage-and-`COPY INTO`
pattern from the Snowflake course's own lab, applied here to Jaffle Shop's real public
seed data instead of Cybersyn's.

## Step 1 — Create a database, schema, and stage

```sql
CREATE OR REPLACE DATABASE jaffle_shop_raw;
CREATE OR REPLACE SCHEMA jaffle_shop_raw.public;

-- Jaffle Shop's real public seed files, hosted by dbt Labs on GitHub
CREATE OR REPLACE STAGE jaffle_shop_stage
  URL = 's3://dbt-tutorial-public/';
```

Just like the Snowflake course's lab, confirm the stage actually sees real files before
going further:

```sql
LIST @jaffle_shop_stage;
```

You should see `jaffle_shop_customers.csv`, `jaffle_shop_orders.csv`, and
`jaffle_shop_payments.csv` listed — the three real seed tables this capstone series is
built on. This project only needs the first one.

## Step 2 — Define the file format

```sql
CREATE OR REPLACE FILE FORMAT jaffle_shop_ff
  TYPE = 'CSV'
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1
  FIELD_OPTIONALLY_ENCLOSED_BY = '"'
  NULL_IF = ('')
  ERROR_ON_COLUMN_COUNT_MISMATCH = FALSE
  COMMENT = 'File format for the Analytics Engineer Beginner Capstone';
```

## Step 3 — Create the target raw table

The real Jaffle Shop `raw_customers` seed has three columns: `id`, `first_name`, and
`last_name`.

```sql
CREATE OR REPLACE TABLE raw_customers (
  id          STRING,
  first_name  STRING,
  last_name   STRING
);
```

## Step 4 — Load it with COPY INTO

```sql
COPY INTO raw_customers
FROM @jaffle_shop_stage/jaffle_shop_customers.csv
FILE_FORMAT = (FORMAT_NAME = 'jaffle_shop_ff')
ON_ERROR = 'CONTINUE';
```

Read the result set the same way the Snowflake course taught: one row per file, a
`status` of `LOADED`, a `rows_parsed` and `rows_loaded` count, and an `errors_seen`
column. If those two counts don't match, check `first_error` before assuming it's fine.

## Step 5 — Verify

```sql
SELECT COUNT(*) FROM raw_customers;
SELECT * FROM raw_customers LIMIT 10;
```

`raw_customers` is a small table — real Jaffle Shop sample data, not thousands of rows —
so a quick `SELECT *` is enough to eyeball that `id`, `first_name`, and `last_name` all
look right before moving on.

## Why this step happens before dbt

dbt's whole job starts from the assumption that raw data already exists somewhere dbt can
query. Lesson 5 will declare `raw_customers` as a dbt **source** — a pointer to exactly
the table you just built here. If this step were skipped, dbt would have nothing to point
at. Loading and transforming are two different jobs, done with two different tools, in a
strict order: load first, transform second.

## Key terms

| Term | Meaning |
|---|---|
| Stage | A named Snowflake pointer to a storage location (here, a public S3 bucket) |
| `COPY INTO` | The Snowflake command that actually loads staged files into a table |
| `rows_parsed` / `rows_loaded` | The COPY INTO result columns that confirm how much data actually landed |
| Load vs. transform | Two separate jobs — getting data into the warehouse (this lesson) vs. reshaping it once it's there (dbt, starting Lesson 5) |

## Lab

Run every step above yourself, in order, in a real Snowsight worksheet against your own
Snowflake trial account. Confirm `raw_customers` ends up with the expected row count and
that `first_error` is empty on the COPY INTO result.

## Check yourself

You're ready for Lesson 4 when you have a real `raw_customers` table sitting in your own
Snowflake account, loaded from the actual public Jaffle Shop seed file — and can explain,
in one sentence, why this loading step has to happen before dbt gets involved at all.
