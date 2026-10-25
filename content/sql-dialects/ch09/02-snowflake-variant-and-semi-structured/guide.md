# Lesson 54 — Snowflake Semi-Structured Data: VARIANT and Dot Notation

**Chapter 9 · Cloud Warehouse SQL Dialects · Lesson 2 of 5**

## What you'll learn

- What the `VARIANT` type is and why nothing in T-SQL looks quite like it
- Dot and bracket notation for reaching into a `VARIANT` column
- The `::` cast operator for pulling a typed value out of semi-structured data
- How this compares to T-SQL's separate JSON functions

## A type that holds whatever you give it

Snowflake's `VARIANT` type can natively hold semi-structured data — JSON, Avro, Parquet, and
more — in a single column, without you declaring a fixed shape ahead of time:

```sql
-- A table with a VARIANT column holding arbitrary JSON per row
CREATE TABLE events (
  event_id INT,
  payload VARIANT
);

INSERT INTO events (event_id, payload)
SELECT 1, PARSE_JSON('{"user": {"name": "Pat", "age": 34}, "action": "login"}');
```

T-SQL has nothing structurally similar to `VARIANT`. T-SQL's closest answer to semi-structured
data is its separate `JSON` functions (`JSON_VALUE`, `JSON_QUERY`, `OPENJSON`) that operate on a
plain `NVARCHAR` column holding JSON text — the JSON itself is still just a string to the type
system. `VARIANT` is a genuinely distinct, native type with its own storage and syntax.

## Dot and bracket notation

Reach into a `VARIANT` column's fields with `:` for the first level, then dots or brackets for
anything nested:

```sql
-- Dot notation
SELECT
  event_id,
  payload:action AS action,
  payload:user.name AS user_name,
  payload:user.age AS user_age
FROM events;

-- Bracket notation — equivalent, useful when a key has special characters
SELECT
  event_id,
  payload['action'] AS action,
  payload['user']['name'] AS user_name
FROM events;
```

Notice the first access uses a colon (`payload:action`), not a dot — the colon is what starts
the path into the `VARIANT` value; dots and brackets chain further down from there.

## Casting with ::

A value pulled out of a `VARIANT` column is itself still a `VARIANT` until you cast it. Use `::`
to get a properly typed `STRING`, `NUMBER`, or other scalar type:

```sql
SELECT
  event_id,
  payload:user.name::STRING AS user_name,
  payload:user.age::NUMBER AS user_age
FROM events;
```

Without the cast, comparisons and functions that expect a specific type may not behave the way
you expect — casting makes the intent explicit and gets you a real typed value to work with.

## Comparing to T-SQL's approach

| | T-SQL | Snowflake |
|---|---|---|
| Storage | JSON as text in `NVARCHAR` | Native `VARIANT` type |
| Reading a field | `JSON_VALUE(col, '$.user.name')` | `col:user.name` |
| Typed extraction | `JSON_VALUE` returns text; cast manually | `col:user.name::STRING` |
| Nested arrays/objects | `OPENJSON` with a schema | Dot/bracket chaining, plus `FLATTEN` for arrays |

Both approaches get you to the same data; T-SQL leans on functions operating over text, while
Snowflake gives semi-structured data a first-class native type with its own path syntax.

## Key terms

| Term | Meaning |
|---|---|
| `VARIANT` | Snowflake's native type for semi-structured data (JSON, Avro, Parquet) |
| `:` path operator | Starts a path into a `VARIANT` value's fields |
| `::` | Snowflake's cast operator, used to extract a typed scalar from a `VARIANT` path |
| `PARSE_JSON()` | Converts a JSON string into a `VARIANT` value |

## Lab

Given a `VARIANT` column `payload` holding `{"order": {"id": 501, "total": 129.99}}`, write a
query that extracts `order.id` as a `NUMBER` and `order.total` as a `NUMBER`, using both dot
notation and the `::` cast.

## Check yourself

You're ready for Lesson 55 when you can answer, without looking: what does the `VARIANT` type
hold natively, what's the difference between the `:` and `::` operators, and how does T-SQL's
approach to JSON differ structurally from Snowflake's `VARIANT`?
