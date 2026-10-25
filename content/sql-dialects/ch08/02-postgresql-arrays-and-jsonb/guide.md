# Lesson 49 — Arrays and JSONB: PostgreSQL's Native Types

**Chapter 8 · PostgreSQL Deep Dive for T-SQL Developers · Lesson 2 of 5**

## What you'll learn

- PostgreSQL's native `ARRAY` column types — something none of SQL Server, Oracle, or MySQL have
- Array literal syntax and `unnest()` to expand an array into rows
- JSONB: PostgreSQL's binary, indexable JSON type, distinct from plain JSON
- `->`, `->>`, and the `@>` containment operator, plus GIN indexes

## Arrays: a genuinely native column type

T-SQL has no array column type at all — you'd normally model a one-to-many relationship with a
separate related table. PostgreSQL lets a single column **be** an array directly.

```sql
CREATE TABLE products (
  product_id INT PRIMARY KEY,
  name TEXT,
  tags TEXT[]  -- a genuine array column, not a workaround
);

INSERT INTO products (product_id, name, tags)
VALUES (1, 'Trail Shoes', ARRAY['outdoor', 'running', 'waterproof']);

-- Alternate literal syntax, same result
INSERT INTO products (product_id, name, tags)
VALUES (2, 'Rain Jacket', '{outdoor,waterproof}');
```

## unnest(): turning an array back into rows

```sql
-- Expand each product's tags array into one row per tag
SELECT product_id, unnest(tags) AS tag
FROM products;
```

`unnest()` is the function you'll reach for constantly once arrays are in the picture — it's the
bridge from "one row with an array column" to "one row per array element," which is often what you
actually want to query or join against.

## JSONB: PostgreSQL's binary, indexable JSON type

PostgreSQL has two JSON types: plain `JSON`, which stores an exact text copy of what you inserted
(preserving whitespace and key order), and `JSONB`, which stores a parsed binary representation —
slightly slower to insert, but faster to query and, critically, indexable. For almost any real
application use, `JSONB` is the right choice.

```sql
CREATE TABLE events (
  event_id INT PRIMARY KEY,
  payload JSONB
);

INSERT INTO events (event_id, payload)
VALUES (1, '{"type": "login", "user": {"id": 42, "name": "Alex"}}');
```

## Accessing JSONB: -> vs. ->>

```sql
-- -> returns JSON (keeps quotes, nesting)
SELECT payload -> 'user' FROM events;          -- {"id": 42, "name": "Alex"}

-- ->> returns TEXT (unwraps to a plain string)
SELECT payload -> 'user' ->> 'name' FROM events; -- Alex
```

This is genuinely more capable than T-SQL's JSON support, which treats JSON as text with
functions (`JSON_VALUE`, `JSON_QUERY`) layered on top, rather than a true native, indexable type.

## Containment and GIN indexes

```sql
-- @> : does the left JSONB value CONTAIN the right one?
SELECT * FROM events WHERE payload @> '{"type": "login"}';

-- A GIN index makes containment queries like the one above genuinely fast
CREATE INDEX idx_events_payload ON events USING GIN (payload);
```

## Key terms

| Term | Meaning |
|---|---|
| `ARRAY` column type | A native PostgreSQL column type holding a list of values; no equivalent in T-SQL/Oracle/MySQL |
| `unnest()` | Expands an array column into one row per element |
| `JSONB` | PostgreSQL's binary, indexable JSON type (vs. text-preserving `JSON`) |
| `->` / `->>` | JSONB access operators returning JSON / text respectively |
| `@>` | JSONB containment operator, often paired with a GIN index |

## Lab

Create a table with a `JSONB` column, insert a row with nested JSON, and write one query using
`->>` to extract a text value and one using `@>` to test containment.

## Check yourself

You're ready for Lesson 50 when you can explain, without looking: what's the difference between
`JSON` and `JSONB`, and what's the difference between what `->` and `->>` each return?
