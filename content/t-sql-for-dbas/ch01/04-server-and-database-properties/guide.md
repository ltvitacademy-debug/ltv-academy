# Server & Database Properties

Before you diagnose a problem, you need to know what you're diagnosing: which edition, which
patch level, which recovery model. `SERVERPROPERTY()` and `DATABASEPROPERTYEX()` answer those
questions in T-SQL, without opening a single GUI dialog.

## What you'll learn

- `SERVERPROPERTY()` — instance-level facts like edition and product version
- `DATABASEPROPERTYEX()` — database-level settings like recovery model and auto-close
- Why these two functions matter more than they look like they should during an incident
- Real property names you'll use constantly: `Edition`, `ProductVersion`, `IsAutoClose`

## SERVERPROPERTY(): facts about the instance

`SERVERPROPERTY()` takes a property name as a string and returns a single scalar value:

```sql
SELECT SERVERPROPERTY('Edition')        AS edition,
       SERVERPROPERTY('ProductVersion') AS product_version,
       SERVERPROPERTY('ProductLevel')   AS product_level,
       SERVERPROPERTY('IsClustered')    AS is_clustered,
       SERVERPROPERTY('MachineName')    AS machine_name;
```

`Edition` tells you Standard vs. Enterprise vs. Developer — which matters because features like
Online Index Rebuild and Query Store behavior differ by edition. `ProductVersion` and
`ProductLevel` tell you the exact build and whether the latest cumulative update is installed —
the first thing to check when a known bug might be in play.

## DATABASEPROPERTYEX(): facts about one database

`DATABASEPROPERTYEX()` takes a database name and a property name:

```sql
SELECT DATABASEPROPERTYEX('AdventureWorks2022', 'Recovery Model') AS recovery_model,
       DATABASEPROPERTYEX('AdventureWorks2022', 'IsAutoClose')    AS is_auto_close,
       DATABASEPROPERTYEX('AdventureWorks2022', 'IsAutoShrink')   AS is_auto_shrink,
       DATABASEPROPERTYEX('AdventureWorks2022', 'Status')         AS status;
```

`Recovery Model` — `FULL`, `SIMPLE`, or `BULK_LOGGED` — determines whether you can do
point-in-time restores (Chapter 5). `IsAutoClose` and `IsAutoShrink`, when set to `1`, are two
of the most common "why is this database slow" root causes on smaller SQL Server instances:
auto-close tears down and reopens the database on every idle period, and auto-shrink fights
constantly with growth, fragmenting everything it touches.

## Checking every database at once

For a database-wide sweep, `sys.databases` (Lesson 2) is usually faster than calling
`DATABASEPROPERTYEX()` once per database:

```sql
SELECT name, recovery_model_desc, is_auto_close_on, is_auto_shrink_on
FROM sys.databases
WHERE database_id > 4;  -- skip the four system databases
```

Both approaches return the same facts — `DATABASEPROPERTYEX()` is handy for a one-off check
against a named database; `sys.databases` is better for scanning the whole instance.

## Key terms

| Term | Meaning |
|---|---|
| `SERVERPROPERTY()` | Built-in function returning a single instance-level property by name |
| `DATABASEPROPERTYEX()` | Built-in function returning a single database-level property by name |
| Auto-close | A database setting that shuts down and reopens the database when it goes idle |

## Check yourself

A DBA suspects a small database is slow because of a bad default setting, not query design.
Which two `DATABASEPROPERTYEX()` properties would you check first, and why?
