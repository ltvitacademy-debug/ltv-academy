# Lesson 32 — Querying Nested JSON

**Chapter 7 · Semi-Structured Data · Lesson 32 of 60**

## What you'll learn

- Colon notation (`v:field`) for reaching into a `VARIANT` column's
  top-level fields
- Dot notation for chaining into nested objects, and `::type` for
  casting the result to something usable
- `PARSE_JSON()` for turning a JSON-formatted string into a `VARIANT`
  you can query the same way
- How to build a clean view over raw JSON so downstream SQL never has
  to know it started as `VARIANT` at all

## Reaching into a VARIANT column

A `VARIANT` column holds a whole JSON object, but a raw JSON blob
isn't useful sitting in one cell — you need to pull specific fields
out of it, the same way you'd reference a column in any other table.
Snowflake uses **colon notation** for this:

![Snowsight worksheet running SELECT * FROM sec_filings_index, with one row's VARIANT value clicked open to show its formatted JSON — CIK, COMPANY_NAME, EIN, FILED_DATE, FORM_TYPE — in the right-hand detail panel.](/courses/snowflake/ch07/32-querying-nested-json/json-row-panel.png)
*Every field visible in that expanded panel is reachable with colon notation — `v:CIK`, `v:COMPANY_NAME`, and so on.*
Source: [Snowflake Quickstarts — Getting Started with Snowflake](https://quickstarts.snowflake.com/guide/getting_started_with_snowflake/index.html)

```sql
SELECT
    v:CIK::string          AS cik,
    v:COMPANY_NAME::string AS company_name,
    v:FILED_DATE::date     AS filed_date
FROM sec_filings_index;
```

Two things to notice. First, `v:CIK` pulls out the raw value, but it
comes back typed as VARIANT — you almost always want to cast it with
`::string`, `::date`, `::number`, or whatever the field actually is.
Second, this reads a lot like dot notation in JavaScript or Python —
if the field were nested one level deeper, you'd chain it:
`v:address:city::string`.

## Building a view so the rest of your SQL doesn't have to care

Writing `v:CIK::string` everywhere gets old fast, and it leaks the
fact that this data started life as JSON into every downstream query.
The fix — same one you'd use for any messy source table — is a view:

```sql
CREATE OR REPLACE VIEW sec_filings_index_view AS
SELECT
    v:CIK::string                   AS cik,
    v:COMPANY_NAME::string          AS company_name,
    v:ADSH::string                  AS adsh,
    v:TIMESTAMP_ACCEPTED::timestamp AS timestamp_accepted,
    v:FILED_DATE::date              AS filed_date,
    v:FORM_TYPE::string             AS form_type
FROM sec_filings_index;
```

From here on, `sec_filings_index_view` looks and behaves exactly like
any relational table — `SELECT * FROM sec_filings_index_view` returns
plain typed columns. Nobody querying the view needs to know or care
that the underlying table is a single `VARIANT` column.

## PARSE_JSON: when the JSON arrives as a string

Sometimes you don't get a `VARIANT` column at all — you get a plain
string column that happens to contain JSON text (a common shape when
JSON is embedded inside a larger CSV export, for example).
`PARSE_JSON()` converts that string into a real `VARIANT` value so you
can query into it the same way:

```sql
SELECT PARSE_JSON(raw_json_text_column):status::string AS status
FROM some_table;
```

## Key terms

| Term | Meaning |
|---|---|
| Colon notation | `v:field` — pulls a named field out of a VARIANT value |
| `::type` cast | Converts the VARIANT-typed result of a colon lookup into a concrete type (string, date, number) |
| `PARSE_JSON()` | Converts a JSON-formatted string into a VARIANT value you can query with colon notation |
| Semi-structured view | A view that applies colon/dot notation once, so every downstream query sees plain typed columns |

## Lab

1. Using the `raw_events` table from Lesson 31's lab, write a `SELECT`
   that pulls out two or three fields with colon notation, casting
   each to the correct type.
2. Wrap that query in `CREATE OR REPLACE VIEW raw_events_view AS ...`.
3. Run `SELECT * FROM raw_events_view;` and confirm it returns plain
   typed columns — no `VARIANT`, no colon syntax needed by whoever
   queries the view next.

## Check yourself

You're ready for Lesson 33 when you can write a colon-notation query
against a VARIANT column from memory, explain why the `::type` cast is
usually necessary, and say in one sentence why teams wrap VARIANT
tables in views instead of querying them directly everywhere.
