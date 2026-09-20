# sys Catalog Views

`master` and its siblings hold the raw metadata, but you rarely query system tables directly
anymore. SQL Server exposes that metadata through **catalog views** — regular views you `SELECT`
from just like any other view, and the first tool a DBA reaches for to answer "what does this
database actually look like?"

## What you'll learn

- What a catalog view is, and how it differs from a system table
- The four catalog views you'll use constantly: `sys.databases`, `sys.tables`, `sys.columns`,
  `sys.indexes`
- How to join catalog views together to answer real structural questions
- Why some catalog views are instance-wide and others are scoped to one database

## Catalog views: metadata you can SELECT

A catalog view is a built-in view over SQL Server's internal metadata tables. `sys.databases`
is **instance-wide** — query it from any database on the server and you see every database on
that instance:

```sql
SELECT name, database_id, state_desc, recovery_model_desc, collation_name
FROM sys.databases
ORDER BY name;
```

`state_desc` tells you if a database is `ONLINE`, `RESTORING`, `OFFLINE`, or `SUSPECT` — one of
the first things to check when an application reports "can't connect to the database."

## Tables and columns: sys.tables and sys.columns

`sys.tables` and `sys.columns`, by contrast, are **database-scoped** — they only ever describe
the database you're currently connected to. Every object in a database has an `object_id`, and
that's the key you join catalog views on:

```sql
SELECT t.name AS table_name,
       c.name AS column_name,
       ty.name AS data_type,
       c.max_length, c.is_nullable
FROM sys.tables AS t
JOIN sys.columns AS c  ON c.object_id = t.object_id
JOIN sys.types   AS ty ON ty.user_type_id = c.user_type_id
WHERE t.name = 'Employee'
ORDER BY c.column_id;
```

This is exactly the query behind "what columns does this table have, and what are their real
data types" — faster than opening Object Explorer and expanding a tree.

## Indexes: sys.indexes

`sys.indexes` lists every index (and the heap, if there is one) defined on an object:

```sql
SELECT name, type_desc, is_unique, is_primary_key, is_disabled
FROM sys.indexes
WHERE object_id = OBJECT_ID('dbo.Employee')
  AND type_desc <> 'HEAP';
```

Chapter 3 builds heavily on this view once fragmentation and missing indexes enter the picture.

## Key terms

| Term | Meaning |
|---|---|
| Catalog view | A built-in system view exposing SQL Server metadata as queryable rows |
| `object_id` | A unique integer identifying a table, view, or other object within a database |
| Scoped | Whether a view reflects the whole instance (`sys.databases`) or just the current database (`sys.tables`, `sys.columns`, `sys.indexes`) |

## Check yourself

Why does querying `sys.tables` from database A never show tables that live in database B, while
`sys.databases` does show every database on the instance?
