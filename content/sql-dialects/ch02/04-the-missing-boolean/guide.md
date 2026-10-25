# Lesson 9 — Boolean: A Type That Doesn't Really Exist Everywhere

**Chapter 2 · Data Types Across Dialects · Lesson 4 of 6**

## What you'll learn

- Why SQL Server and Oracle have no true native BOOLEAN column type
- MySQL's BOOLEAN — and why it's really just a disguise
- PostgreSQL's genuine native BOOLEAN, the one real exception in this lesson
- How to translate a "flag" column design across all four platforms

## SQL Server — BIT, not BOOLEAN

SQL Server has no `BOOLEAN` column type. The idiom is `BIT`, storing `0`, `1`, or `NULL`:

```sql
-- SQL Server
CREATE TABLE Products (
    IsActive BIT  -- 0, 1, or NULL -- this IS your boolean
);
```

## Oracle — traditionally no boolean column type at all

Oracle's situation is the most striking in this lesson. Historically, Oracle had **no boolean
column type whatsoever** for table storage (PL/SQL has a `BOOLEAN` type, but only for use inside
procedural code — not for a table column). Developers traditionally reached for one of two
conventions instead:

```sql
-- Oracle (traditional convention #1 — character flag)
CREATE TABLE products (
    is_active CHAR(1)  -- 'Y' or 'N'
);

-- Oracle (traditional convention #2 — numeric flag)
CREATE TABLE products (
    is_active NUMBER(1)  -- 0 or 1
);
```

Fairly recent Oracle versions have added limited boolean support in some contexts, but the
`CHAR(1)`/`NUMBER(1)` conventions remain extremely common in real Oracle schemas you'll encounter,
including older ones you may need to work with.

## MySQL — BOOLEAN is literally just TINYINT(1)

MySQL lets you write `BOOLEAN` (or `BOOL`), but it's not a distinct type — it's purely an **alias**
for `TINYINT(1)`:

```sql
-- MySQL
CREATE TABLE products (
    is_active BOOLEAN  -- literally stored and behaves as TINYINT(1)
);
```

Query the column's actual type back from MySQL's metadata and you'll see `TINYINT(1)`, not
`BOOLEAN` — it's a readability convenience, not a real distinct type.

## PostgreSQL — the one real native BOOLEAN here

PostgreSQL is the exception in this lesson: it has a genuine native `BOOLEAN` type, with real
`true`, `false`, and `NULL` values, enforced by the type system itself:

```sql
-- PostgreSQL
CREATE TABLE products (
    is_active BOOLEAN  -- true, false, or NULL -- a REAL boolean type
);

SELECT * FROM products WHERE is_active;  -- works directly, no comparison needed
```

## Side-by-side summary

| Platform | What you actually get |
|---|---|
| SQL Server | `BIT` (0/1/NULL) |
| Oracle | `CHAR(1)` ('Y'/'N') or `NUMBER(1)` (0/1) by convention; no true table-column boolean traditionally |
| MySQL | `BOOLEAN`/`BOOL`, which is an alias for `TINYINT(1)` |
| PostgreSQL | Genuine native `BOOLEAN` (`true`/`false`/`NULL`) |

## Key terms

| Term | Meaning |
|---|---|
| `BIT` | SQL Server's 0/1/NULL type, used as its boolean idiom |
| `TINYINT(1)` | MySQL's underlying storage for its `BOOLEAN` alias |
| Native boolean | A true, enforced boolean type — only PostgreSQL has this among these four platforms |

## Lab

Design an `is_active` flag column for a `Products` table on all four platforms, using each
platform's real, idiomatic choice (not a universal `BOOLEAN` keyword).

## Check yourself

You're ready for Lesson 10 when you can name the single platform in this lesson with a genuine
native boolean type, and explain what MySQL's `BOOLEAN` actually resolves to under the hood.
