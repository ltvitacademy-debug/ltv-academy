# Lesson 17 — Lab: Loading a Real Dataset Into Snowflake

**Chapter 3 · Loading Data Into Snowflake · Lesson 17 of 60**

## What you'll learn

- How stage, file format, and `COPY INTO` fit together in one real walkthrough
- Loading a genuinely public dataset — Cybersyn's consumer company metadata — from a public S3 bucket
- Confirming a load with `LIST`, the `COPY INTO` result set, and a `SELECT`
- Where each Chapter 3 lesson's piece shows up in this end-to-end run

This lab uses the exact same public dataset and bucket as Snowflake's own
"Getting Started with Snowflake" quickstart — a real, publicly-accessible
S3 location anyone with a Snowflake trial can load from, no fabricated
sample data involved.

## Step 1 — Create a database and external stage

```sql
CREATE OR REPLACE DATABASE zts_lab_db;
CREATE OR REPLACE SCHEMA zts_lab_db.public;

-- Public bucket — no credentials required, since this bucket is public
CREATE OR REPLACE STAGE company_metadata_stage
  URL = 's3://sfquickstarts/zero_to_snowflake/cybersyn-consumer-company-metadata-csv/';
```

Confirm the stage actually sees real files before going further:

![The result of LIST @stage in a Snowsight worksheet, showing the real company-metadata CSV files sitting in the public S3 bucket, ready to load.](/courses/snowflake/ch03/17-lab-loading-a-real-dataset/list-stage-files.png)
*LIST @company_metadata_stage; — this is what "the stage actually has files in it" looks like, not a guess.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

```sql
LIST @company_metadata_stage;
```

## Step 2 — Define the file format (Lesson 13)

```sql
CREATE OR REPLACE FILE FORMAT company_metadata_ff
  TYPE = 'CSV'
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1
  FIELD_OPTIONALLY_ENCLOSED_BY = '"'
  NULL_IF = ('')
  ERROR_ON_COLUMN_COUNT_MISMATCH = FALSE
  COMMENT = 'File format for the Chapter 3 lab dataset';
```

## Step 3 — Create the target table

```sql
CREATE OR REPLACE TABLE company_metadata (
  cybersyn_company_id       STRING,
  company_name              STRING,
  permid_security_id        STRING,
  primary_ticker            STRING,
  security_name             STRING,
  asset_class                STRING,
  primary_exchange_code      STRING,
  primary_exchange_name      STRING,
  security_status            STRING,
  global_tickers              STRING,
  exchange_code               STRING,
  security_description        STRING
);
```

## Step 4 — Load it with COPY INTO (Lessons 14-16)

```sql
COPY INTO company_metadata
FROM @company_metadata_stage
FILE_FORMAT = (FORMAT_NAME = 'company_metadata_ff')
PATTERN = '.*csv.*'
ON_ERROR = 'CONTINUE';
```

Read the result set: one row per file, with a `status` of `LOADED`, a
`rows_parsed` and `rows_loaded` count, and an `errors_seen` column. If
`rows_parsed` and `rows_loaded` don't match, that's `ON_ERROR = 'CONTINUE'`
quietly doing its job — check `first_error` on that row before assuming
the mismatch is fine.

## Step 5 — Verify

```sql
SELECT COUNT(*) FROM company_metadata;
SELECT * FROM company_metadata LIMIT 10;

-- Confirm re-running the same COPY INTO loads nothing new (Lesson 14)
COPY INTO company_metadata
FROM @company_metadata_stage
FILE_FORMAT = (FORMAT_NAME = 'company_metadata_ff')
PATTERN = '.*csv.*';
```

That last statement should report every file already loaded, loading
zero additional rows — the load-metadata behavior from Lesson 14, now
seen against a real file set instead of a hypothetical one.

## What this lab ties together

| Step | Which lesson it's from |
|---|---|
| External stage pointed at S3 | Lesson 12 |
| Named file format | Lesson 13 |
| COPY INTO | Lesson 14 |
| ON_ERROR handling | Lesson 16 |
| Confirming via result set + re-run | Lessons 14 and 16 |

## Lab

Run every step above yourself, in order, in a real Snowsight worksheet
against your own trial account. Then answer: how many rows did
`company_metadata` end up with, and did any file report a nonzero
`errors_seen`?

## Check yourself

You're ready for Chapter 4 (Snowpipe) when you've loaded this dataset
end-to-end yourself and can point to exactly which line of SQL came from
which of Lessons 12, 13, 14, and 16.
