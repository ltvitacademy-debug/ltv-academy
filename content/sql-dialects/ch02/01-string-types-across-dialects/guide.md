# Lesson 6 — String Types: VARCHAR, NVARCHAR, TEXT & CLOB

**Chapter 2 · Data Types Across Dialects · Lesson 1 of 6**

## What you'll learn

- How each platform's string type menu compares to SQL Server's VARCHAR/NVARCHAR
- Why Oracle recommends VARCHAR2 over VARCHAR
- When you need CLOB, TEXT, or their platform-specific siblings
- A real, documented case where VARCHAR vs. TEXT genuinely doesn't matter (PostgreSQL)

## SQL Server — your baseline

You already know this half: `VARCHAR` stores non-Unicode character data; `NVARCHAR` stores
Unicode data at 2 bytes per character. This Unicode/non-Unicode split is the lens to view every
other platform through.

```sql
-- SQL Server
CREATE TABLE Customers (
    CustomerName VARCHAR(100),
    CustomerNameIntl NVARCHAR(100)
);
```

## Oracle — VARCHAR2, not VARCHAR

Oracle has a genuine quirk here: plain `VARCHAR` **exists**, but Oracle's own documentation
reserves it for potential future changes in behavior and explicitly recommends against using it.
**`VARCHAR2`** is Oracle's real, recommended variable-length string type:

```sql
-- Oracle
CREATE TABLE customers (
    customer_name VARCHAR2(100)
);

-- For large text that won't fit in VARCHAR2's practical limits:
CREATE TABLE customer_notes (
    customer_id NUMBER,
    notes CLOB
);
```

`CLOB` (Character Large Object) is Oracle's type for large text — think of it as filling a similar
role to SQL Server's older `TEXT`/`NTEXT` or modern `VARCHAR(MAX)` for genuinely large content.

## MySQL — VARCHAR, TEXT, and a family of TEXT sizes

MySQL has `VARCHAR` directly (no VARCHAR2-style quirk), plus a whole family of TEXT types sized
for different maximum lengths:

```sql
-- MySQL
CREATE TABLE customers (
    customer_name VARCHAR(100),
    bio TINYTEXT,       -- very small text
    notes TEXT,          -- standard text
    description MEDIUMTEXT,  -- larger
    archive LONGTEXT     -- largest
);
```

## PostgreSQL — VARCHAR and TEXT, with a twist

PostgreSQL has both `VARCHAR` and `TEXT`. The twist: PostgreSQL's `TEXT` has **no practical length
limit**, and — famously, differing from some other platforms — there's **little to no performance
difference** between `VARCHAR` and `TEXT` in PostgreSQL. Many PostgreSQL developers default to
`TEXT` everywhere and only reach for `VARCHAR(n)` when they specifically want the database to
enforce a length constraint.

```sql
-- PostgreSQL
CREATE TABLE customers (
    customer_name VARCHAR(100),  -- enforces a 100-char limit
    bio TEXT                      -- no practical limit, same performance
);
```

## Side-by-side summary

| Need | SQL Server | Oracle | MySQL | PostgreSQL |
|---|---|---|---|---|
| Short/medium variable text | `VARCHAR` | `VARCHAR2` | `VARCHAR` | `VARCHAR` or `TEXT` |
| Unicode-aware text | `NVARCHAR` | `VARCHAR2` (with the right character set) | `VARCHAR` (with the right charset) | `VARCHAR`/`TEXT` (UTF-8 by default) |
| Large text | `VARCHAR(MAX)`/`TEXT` | `CLOB` | `TEXT`/`MEDIUMTEXT`/`LONGTEXT` | `TEXT` |

## Key terms

| Term | Meaning |
|---|---|
| `VARCHAR2` | Oracle's recommended variable-length string type; plain `VARCHAR` is reserved for future use |
| `CLOB` | Oracle's Character Large Object type, for large text |
| `TINYTEXT`/`MEDIUMTEXT`/`LONGTEXT` | MySQL's sized family of large-text types alongside `TEXT` |
| PostgreSQL `TEXT` | Unlimited-length text type with no meaningful performance cost vs. `VARCHAR` |

## Lab

Design a `Customers` table with a name field and a notes field, once for each of the four
platforms, choosing the correct string type for each platform's conventions.

## Check yourself

You're ready for Lesson 7 when you can say, without looking, which Oracle type you should use
instead of plain `VARCHAR`, and which platform's `VARCHAR` vs. `TEXT` choice is mostly a style
decision rather than a performance one.
