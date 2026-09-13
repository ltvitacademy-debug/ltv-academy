# Lesson 13 — File Formats: CSV, JSON & Parquet

**Chapter 3 · Loading Data Into Snowflake · Lesson 13 of 60**

## What you'll learn

- Why Snowflake needs an explicit `FILE FORMAT` object instead of guessing
- The CSV options that actually matter in practice: delimiter, header, quoting
- How JSON and Parquet formats differ from CSV — and from each other
- How to create a named file format once and reuse it across many loads

## Why a named object instead of inline options

Every `COPY INTO` needs to know how to parse the files it's reading:
what separates fields, whether there's a header row, how nulls are
represented. You can specify all of that inline on every `COPY INTO` call,
but Snowflake also lets you define it once as a named **file format**
object and reuse it — closer to how you'd define a reusable format spec
in SSIS once rather than reconfiguring a flat-file connection manager on
every package.

```sql
CREATE OR REPLACE FILE FORMAT csv_ff
  TYPE = 'CSV'
  FIELD_DELIMITER = ','
  SKIP_HEADER = 1
  FIELD_OPTIONALLY_ENCLOSED_BY = '"'
  NULL_IF = ('', 'NULL')
  DATE_FORMAT = 'AUTO';
```

Running that in a real worksheet looks like this:

![A CREATE FILE FORMAT statement executed successfully in a Snowsight worksheet, defining CSV delimiter, header-skip, quoting, and null-handling options.](/courses/snowflake/ch03/13-file-formats-csv-json-parquet/create-file-format-worksheet.png)
*The format object is created once — every COPY INTO that references it inherits these same parsing rules.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

## The CSV options that matter most

| Option | What it controls |
|---|---|
| `FIELD_DELIMITER` | The character separating columns (comma, pipe, tab) |
| `SKIP_HEADER` | Number of header rows to skip (usually `1`) |
| `FIELD_OPTIONALLY_ENCLOSED_BY` | Quote character wrapping fields that contain the delimiter |
| `NULL_IF` | Which literal strings should become `NULL` |
| `ERROR_ON_COLUMN_COUNT_MISMATCH` | Whether a row with the wrong number of fields fails the load |

Get `FIELD_OPTIONALLY_ENCLOSED_BY` wrong and you'll see it immediately: a
comma inside an unquoted text field silently splits into an extra column,
same failure mode as a badly configured flat-file source in SSIS.

## JSON: semi-structured by design

JSON files don't have columns to delimit — Snowflake loads each JSON
document as a single `VARIANT` value per row, and you query into its
structure afterward (Chapter 7 covers querying `VARIANT` data in depth):

```sql
CREATE OR REPLACE FILE FORMAT json_ff
  TYPE = 'JSON'
  STRIP_OUTER_ARRAY = TRUE;  -- unwraps a top-level [ ] into separate rows
```

`STRIP_OUTER_ARRAY` is the one setting worth remembering: without it, a
file containing `[{...}, {...}, {...}]` loads as **one** row holding the
whole array, not three.

## Parquet: columnar and self-describing

Parquet files already carry their own schema and are stored column-by-
column, so there's far less to configure:

```sql
CREATE OR REPLACE FILE FORMAT parquet_ff
  TYPE = 'PARQUET';
```

That's frequently the entire definition. Parquet's schema and compression
travel with the file itself, which is why data lakes standardize on it —
no separate format object arguing about delimiters, because there aren't
any.

## Key terms

| Term | Meaning |
|---|---|
| File format object | A named, reusable set of parsing rules for `COPY INTO` |
| `FIELD_OPTIONALLY_ENCLOSED_BY` | Quote character protecting delimiters inside a field |
| `STRIP_OUTER_ARRAY` | JSON option that turns a top-level array into multiple rows |
| VARIANT | The column type holding one semi-structured JSON document per row |

## Lab

1. Create `csv_ff` exactly as shown above.
2. Run `SHOW FILE FORMATS;` and confirm it appears with the right options.
3. Create a second format, `json_ff`, with `STRIP_OUTER_ARRAY = TRUE`.
4. Create a third, `parquet_ff`, with just `TYPE = 'PARQUET'`.

## Check yourself

You're ready for Lesson 14 when you can explain what `STRIP_OUTER_ARRAY`
does and why Parquet's file format definition needs almost nothing beyond
`TYPE = 'PARQUET'`.
