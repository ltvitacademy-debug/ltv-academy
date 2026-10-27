# Lesson 4 — Parsing VARIANT Data in Snowflake SQL

**Chapter 1 · Intermediate Capstone: Support and Finance, One Shared Model · Lesson 4 of 16**

## What you'll learn

- The real `:field::type` syntax for pulling fields out of a VARIANT column
- Casting extracted values to the right SQL types, including numeric and timestamp fields
- Why an untyped VARIANT field compares and sorts differently than a cast one
- Building a plain SELECT that previews the fully-parsed shape before anything gets written anywhere

## The syntax: colon to reach in, double-colon to cast

Snowflake gives you a real, specific syntax for pulling a named field out of a `VARIANT` value:

```sql
raw_payload:ticket_id
```

That alone returns the field, but still typed as `VARIANT` — not a string, not a number. For
anything you're going to compare, sum, filter, or join on, cast it explicitly with `::`:

```sql
raw_payload:ticket_id::STRING
raw_payload:refund_amount::NUMBER(10,2)
raw_payload:opened_at::TIMESTAMP_NTZ
```

This two-step pattern — reach in with `:`, cast with `::` — is how every real Snowflake pipeline
touches VARIANT data. Skipping the cast is a common beginner mistake: an uncast `refund_amount`
will often *look* numeric in a results grid, but sort and compare as a semi-structured value, not
a true `NUMBER` — which quietly breaks a `SUM()` or an `ORDER BY` later.

## Previewing the full parse

```sql
SELECT
    raw_payload:ticket_id::STRING          AS ticket_id,
    raw_payload:subscriber_id::NUMBER      AS subscriber_id,
    raw_payload:category::STRING           AS category,
    raw_payload:priority::STRING           AS priority,
    raw_payload:status::STRING             AS status,
    raw_payload:opened_at::TIMESTAMP_NTZ   AS opened_at,
    raw_payload:updated_at::TIMESTAMP_NTZ  AS updated_at,
    raw_payload:refund_amount::NUMBER(10,2) AS refund_amount
FROM driftwood_analytics.raw.tickets_api_raw
ORDER BY loaded_at DESC
LIMIT 20;
```

Run this before writing anything permanent. It's the exact field list that Lesson 6's `MERGE`
statement parses inline from the Stream — getting the field names and casts right here, against
real landed data, means Lesson 6 is just reusing a pattern you've already proven works, not
guessing at the JSON's shape for the first time inside a `MERGE`.

## Handling a field that might be missing

Not every row's JSON has every field populated — `updated_at` and `refund_amount` are both `null`
on a ticket that's only ever been opened, never touched since. Snowflake's `:field` syntax returns
SQL `NULL` automatically when a key is absent or its JSON value is `null` — no special-case syntax
needed. `refund_amount::NUMBER(10,2)` on a row where the JSON has `"refund_amount": null` simply
becomes a `NULL` numeric value, exactly like an ordinary nullable column.

## Why this matters more than it looks like it should

This isn't a one-off exploration query — it's the exact extraction logic Lesson 6's `MERGE`
statement reuses, field for field, when it writes a Stream's changed rows into `ticket_facts` and
`refund_events`. Getting the casts right here, on a `SELECT` you can eyeball and rerun freely,
is far cheaper than discovering a type mismatch inside a `MERGE` that's already wired to a
scheduled Task.

## Key terms

| Term | Meaning |
|---|---|
| `:field` | Reaches into a VARIANT value and returns one named field, still typed VARIANT |
| `::type` | Casts a value to a specific SQL type (STRING, NUMBER, TIMESTAMP_NTZ, etc.) |
| Uncast comparison | Comparing or sorting a VARIANT field without casting it first — a common source of subtly wrong results |

## Lab

On your own `tickets_api_raw` table, write the full preview `SELECT` above. Confirm every column
comes back with the type you expect (check Snowsight's column header, not just the displayed
value), and confirm a ticket row with no refund shows `refund_amount` as a true `NULL`, not an
empty string or the literal text "null".

## Check yourself

You're ready for Lesson 5 when you can answer, without looking: what's the practical difference
between `raw_payload:refund_amount` and `raw_payload:refund_amount::NUMBER(10,2)`, and why does
skipping the cast risk a wrong `SUM()` later?
