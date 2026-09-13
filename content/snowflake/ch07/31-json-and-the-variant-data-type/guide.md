# Lesson 31 — JSON & the VARIANT Data Type

**Chapter 7 · Semi-Structured Data · Lesson 31 of 60**

## What you'll learn

- Why semi-structured data (JSON, Avro, Parquet) doesn't fit a normal
  relational column, and what Snowflake does about it
- `VARIANT` — the data type that lets Snowflake store an entire JSON
  object in a single column, no schema required up front
- How to create a table with a `VARIANT` column and load raw JSON into
  it with `COPY INTO`
- Why this matters even if you only ever write "normal" SQL: source
  systems (APIs, event logs, application exports) hand you JSON far
  more often than clean CSVs

## The problem: data that doesn't fit a schema

Every table you've built so far in this course has a fixed shape —
columns, types, decided before a single row lands. JSON doesn't play
by that rule. An API response or an event log record might look like
this, one object per line, with fields that can vary from row to row:

![Raw JSON text — one SEC-filing record per line, fields like CIK, COMPANY_NAME, ADSH, FORM_TYPE, FISCAL_PERIOD visible as plain key/value pairs, no fixed column layout.](/courses/snowflake/ch07/31-json-and-the-variant-data-type/raw-json-sample.png)
*This is exactly what raw JSON looks like before Snowflake touches it — nested, variable, and not one bit relational yet.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

In T-SQL, loading this meant either flattening it in application code
first, or fighting with `OPENJSON`. Snowflake takes a different
approach: it gives semi-structured data its own native column type.

## VARIANT: one column, any JSON object

`VARIANT` is a Snowflake data type that stores an entire JSON
document — object, array, whatever shape it is — as a single value in
a single column. No predefined schema, no guessing every possible
field ahead of time:

```sql
CREATE TABLE sec_filings_index (v VARIANT);
```

That's the whole table definition. One column, typed `VARIANT`,
ready to hold any JSON object thrown at it. Snowflake parses and
stores it internally in an optimized columnar binary format (not as
raw text), which is what makes querying into it later fast — more on
that in Lesson 32.

Loading raw JSON into a `VARIANT` column uses the same `COPY INTO`
mechanics from Chapter 3, just with `file_format = (type = json)`
instead of `csv`:

```sql
COPY INTO sec_filings_index
FROM @my_stage/sec_report_index.json.gz
    file_format = (type = json strip_outer_array = true);
```

`strip_outer_array = true` tells Snowflake the file is a JSON array of
objects (`[{...}, {...}, ...]`) and to load each object as its own
row, rather than loading the whole array as one giant row.

## Why this is a bigger deal than it sounds

Most traditional data warehouses either can't load semi-structured
data at all, or force you to flatten it into rigid columns during
load — meaning if the source JSON adds a new field next month, your
load pipeline breaks. `VARIANT` sidesteps that entirely: the column
accepts whatever shape the JSON is in, and you decide how to query
into that structure later, at read time, not load time. That's the
foundation Lessons 32–34 build on.

## Key terms

| Term | Meaning |
|---|---|
| Semi-structured data | Data with a flexible, often nested shape — JSON, Avro, Parquet, XML — that doesn't fit a fixed relational schema |
| VARIANT | Snowflake's data type for storing an entire semi-structured value (JSON object, array, etc.) in one column |
| `strip_outer_array` | A `COPY INTO` file-format option that loads each element of a top-level JSON array as its own row |
| Schema-on-read | Deciding the structure of your data when you query it, rather than when you load it — what VARIANT enables |

## Lab

1. In a worksheet, create a table with a single `VARIANT` column:
   `CREATE TABLE raw_events (v VARIANT);`
2. Find or write a small JSON file (even 3–4 objects) representing
   something you know — orders, log lines, whatever — and stage it
   with `PUT` or upload it via Snowsight.
3. Load it with `COPY INTO raw_events FROM @your_stage
   file_format = (type = json strip_outer_array = true);` and confirm
   the row count matches the number of JSON objects in your file.
4. Run `SELECT * FROM raw_events;` and click a row's `V` value —
   Snowsight will show you the formatted JSON in a side panel.

## Check yourself

You're ready for Lesson 32 when you can explain, in one sentence, why
`VARIANT` doesn't require you to know the JSON's shape before you load
it — and you've successfully loaded at least one real JSON file into
a `VARIANT` column yourself.
