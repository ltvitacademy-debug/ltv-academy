# Lesson 58 — Capstone: Staging, Loading & Transformation

**Chapter 15 · End-to-End Capstone Project · Lesson 58 of 60**

## What you'll build

Milestone 1 of the capstone: all three sources from Lesson 57 actually
landed in Snowflake and transformed through a real staging layer —
raw and messy in, clean and typed out. Nothing here is new technique;
it's Chapters 3-5 and 7, applied to sources you chose instead of a
guided example.

## Land the SQL Server export

A stage, a file format, and `COPY INTO` — the same pattern from
Chapter 3, pointed at your own exported table:

```sql
CREATE OR REPLACE FILE FORMAT ff_csv
  TYPE = CSV FIELD_DELIMITER = ',' SKIP_HEADER = 1
  FIELD_OPTIONALLY_ENCLOSED_BY = '"';

CREATE OR REPLACE STAGE stg_sqlserver_export
  FILE_FORMAT = ff_csv;
-- PUT your exported file(s) into this stage, or upload via Snowsight

CREATE OR REPLACE TABLE raw.sqlserver_orders (
  order_id STRING, customer_id STRING, order_date STRING,
  product_id STRING, quantity STRING, unit_price STRING
);

COPY INTO raw.sqlserver_orders
FROM @stg_sqlserver_export
ON_ERROR = 'CONTINUE';
```

Load everything as `STRING` into the raw layer on purpose — casting
and validation belong in staging, not in the raw landing table (Ch. 5).
Confirm the load the same way Lesson 54 taught:

```sql
SELECT file_name, status, row_count, first_error_message
FROM TABLE(INFORMATION_SCHEMA.COPY_HISTORY(
  table_name => 'RAW.SQLSERVER_ORDERS',
  start_time => DATEADD(hours, -1, CURRENT_TIMESTAMP())
));
```

## Land the CSV

Same mechanics, a second independent stage and raw table — this
source doesn't relate 1:1 to the first, so it gets its own landing
table rather than being forced into the same shape:

```sql
CREATE OR REPLACE STAGE stg_product_catalog FILE_FORMAT = ff_csv;

CREATE OR REPLACE TABLE raw.product_catalog (
  product_id STRING, product_name STRING,
  category STRING, list_price STRING
);

COPY INTO raw.product_catalog
FROM @stg_product_catalog
ON_ERROR = 'CONTINUE';
```

## Land the JSON feed

This is where `VARIANT` and `FLATTEN` (Ch. 7) earn their place — load
the raw JSON as a single `VARIANT` column first, don't try to force it
into a rigid schema at load time:

```sql
CREATE OR REPLACE FILE FORMAT ff_json TYPE = JSON;
CREATE OR REPLACE STAGE stg_json_feed FILE_FORMAT = ff_json;

CREATE OR REPLACE TABLE raw.json_feed (raw_data VARIANT);

COPY INTO raw.json_feed
FROM @stg_json_feed
ON_ERROR = 'CONTINUE';

-- Flatten it into something staging can work with:
CREATE OR REPLACE TABLE staging.json_feed_flat AS
SELECT
  raw_data:event_id::STRING AS event_id,
  raw_data:event_type::STRING AS event_type,
  raw_data:timestamp::TIMESTAMP_NTZ AS event_ts,
  f.value:field::STRING AS detail_field,
  f.value:value::STRING AS detail_value
FROM raw.json_feed,
     LATERAL FLATTEN(input => raw_data:details) f;
```

Adjust the actual field paths to whatever your feed's real structure
is — the pattern (land as `VARIANT`, `FLATTEN` into staging) is what
matters, not these exact field names.

## Build the staging layer

Staging is where raw strings become typed, validated, business-ready
columns — the ELT pattern from Chapter 5, run once per source:

```sql
CREATE OR REPLACE TABLE staging.orders AS
SELECT
  order_id,
  customer_id,
  TRY_CAST(order_date AS DATE) AS order_date,
  product_id,
  TRY_CAST(quantity AS NUMBER) AS quantity,
  TRY_CAST(unit_price AS NUMBER(10,2)) AS unit_price
FROM raw.sqlserver_orders
WHERE order_id IS NOT NULL;

CREATE OR REPLACE TABLE staging.product_catalog AS
SELECT
  product_id, product_name, category,
  TRY_CAST(list_price AS NUMBER(10,2)) AS list_price
FROM raw.product_catalog
WHERE product_id IS NOT NULL;
```

`TRY_CAST` over plain `CAST` matters here — a bad row should become a
`NULL` you can find and count with a data-quality check (Ch. 5), not a
failed statement that stops the whole staging build.

## Key terms

| Term | Meaning |
|---|---|
| Raw landing table | Loaded as-is (often all `STRING`), no validation yet |
| Staging table | Typed, validated, business-ready — casting and dedup happen here |
| `LATERAL FLATTEN` | Expands a nested array/object inside a `VARIANT` into relational rows |
| `TRY_CAST` | Casts and returns `NULL` on failure instead of erroring the whole statement |

## Lab

1. Load all three of your sources into `raw.*` tables using the
   patterns above, and confirm each with `COPY_HISTORY`.
2. Build a `staging.*` table for each source with real typed columns
   and at least one `TRY_CAST`.
3. Run a simple data-quality check (Ch. 5) against each staging table
   — how many rows had a `NULL` where a real value was expected?

## Check yourself

You're ready for Lesson 59 when all three sources have raw and
staging tables that actually run end to end, and you can point to at
least one row your `TRY_CAST`/data-quality check caught.
