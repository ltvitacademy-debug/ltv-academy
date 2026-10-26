# Lesson 4 — Loading the Raw Data

**Chapter 2 · Snowflake Foundations · Lesson 4 of 26**

## What you'll learn

- Real `CREATE STAGE` / `COPY INTO` syntax, applied to all three real
  jaffle_shop seed tables
- The difference between an internal stage (this lesson) and the
  external S3 stage already covered elsewhere in this path, and when
  each is the right tool
- How to confirm a load actually worked, instead of trusting that it
  did
- Why this lesson loads into `RAW`, and nothing downstream reads from
  anywhere else

## The three real source files

Jaffle Shop's raw data is dbt Labs' own public `jaffle_shop` sample
dataset — `raw_customers.csv`, `raw_orders.csv`, and
`raw_payments.csv`. Earlier tiers of this capstone already worked with
these as dbt seeds; here, they get loaded the way a real production
source lands in Snowflake: staged, then copied into a table, with a
named file format.

## Step 1 — create the RAW database and schema

```sql
CREATE OR REPLACE DATABASE jaffle_shop_db;
CREATE OR REPLACE SCHEMA jaffle_shop_db.raw;
USE SCHEMA jaffle_shop_db.raw;
```

## Step 2 — create a named file format and an internal stage

```sql
CREATE OR REPLACE FILE FORMAT jaffle_shop_csv_ff
  TYPE = 'CSV'
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1
  FIELD_OPTIONALLY_ENCLOSED_BY = '"'
  NULL_IF = ('')
  ERROR_ON_COLUMN_COUNT_MISMATCH = FALSE;

-- An internal stage: Snowflake-managed storage, loaded via PUT from a
-- local machine (unlike an external stage pointed at someone else's
-- S3 bucket, which this path's Snowflake course already covers)
CREATE OR REPLACE STAGE jaffle_shop_raw_stage
  FILE_FORMAT = jaffle_shop_csv_ff;
```

## Step 3 — stage the three files, then confirm they arrived

From the SnowSQL CLI (or Snowsight's local file upload):

```sql
PUT file://raw_customers.csv @jaffle_shop_raw_stage;
PUT file://raw_orders.csv @jaffle_shop_raw_stage;
PUT file://raw_payments.csv @jaffle_shop_raw_stage;

LIST @jaffle_shop_raw_stage;
```

Don't skip `LIST` — it's the real check that the stage actually has
files in it before `COPY INTO` is asked to do anything with them.

## Step 4 — create the three target tables and load them

```sql
CREATE OR REPLACE TABLE raw_customers (
  id INTEGER, first_name STRING, last_name STRING
);
CREATE OR REPLACE TABLE raw_orders (
  id INTEGER, user_id INTEGER, order_date DATE, status STRING
);
CREATE OR REPLACE TABLE raw_payments (
  id INTEGER, order_id INTEGER, payment_method STRING, amount INTEGER
);

COPY INTO raw_customers FROM @jaffle_shop_raw_stage/raw_customers.csv.gz
  FILE_FORMAT = (FORMAT_NAME = 'jaffle_shop_csv_ff') ON_ERROR = 'CONTINUE';
COPY INTO raw_orders FROM @jaffle_shop_raw_stage/raw_orders.csv.gz
  FILE_FORMAT = (FORMAT_NAME = 'jaffle_shop_csv_ff') ON_ERROR = 'CONTINUE';
COPY INTO raw_payments FROM @jaffle_shop_raw_stage/raw_payments.csv.gz
  FILE_FORMAT = (FORMAT_NAME = 'jaffle_shop_csv_ff') ON_ERROR = 'CONTINUE';
```

`PUT` compresses by default, which is why the staged filenames end in
`.csv.gz` even though the local files were plain `.csv`.

## Step 5 — verify, the same way the Snowflake course already taught

```sql
SELECT COUNT(*) FROM raw_customers;
SELECT COUNT(*) FROM raw_orders;
SELECT COUNT(*) FROM raw_payments;

-- Re-running the same COPY INTO loads nothing new — confirms
-- Snowflake's load metadata is doing its job
COPY INTO raw_orders FROM @jaffle_shop_raw_stage/raw_orders.csv.gz
  FILE_FORMAT = (FORMAT_NAME = 'jaffle_shop_csv_ff');
```

That re-run should report every file already loaded and load zero
additional rows — read the `COPY INTO` result set's `status` column to
confirm it, don't just assume it.

## Key terms

| Term | Meaning |
|---|---|
| Internal stage | Snowflake-managed storage for files `PUT` there from a local machine, as opposed to an external stage pointed at someone else's cloud storage |
| `PUT` | Uploads a local file into a stage; compresses to `.gz` by default |
| `COPY INTO` | Loads staged files into a target table using a named file format |
| Load metadata | Snowflake's internal record of which staged files already loaded, preventing silent duplicate loads on re-run |

## Lab

1. Write the `CREATE STAGE` and `CREATE FILE FORMAT` statements for
   `jaffle_shop_raw_stage`.
2. Write the three `COPY INTO` statements, one per raw table, and the
   `LIST` command that checks the stage before running them.
3. Re-run one `COPY INTO` statement a second time and describe, from
   the result set, how you'd confirm no duplicate rows were loaded.

## Check yourself

You're ready for Lesson 5 when you can load all three jaffle_shop raw
tables from a staged file yourself and explain, from the `COPY INTO`
result set alone, whether a re-run loaded anything new.
