# File Growth & Autogrowth

Corruption is a rare emergency. Bad autogrowth settings are a slow-motion emergency that
almost every production instance has somewhere — quietly fragmenting the disk and stalling
transactions until a DBA finds it. This lesson is about finding it with T-SQL and fixing it.

## What you'll learn

- Where SQL Server stores each data/log file's growth settings
- Why percentage-based autogrowth on a large file is a real anti-pattern
- What to set instead, and how to check every database on an instance at once

## Inspecting file growth settings

`sys.database_files` (run inside the database it describes) exposes every file's growth
configuration:

```sql
SELECT
    name,
    physical_name,
    size * 8 / 1024 AS size_mb,
    growth,
    is_percent_growth
FROM sys.database_files;
```

- **`growth`** — the growth increment. Its meaning depends on `is_percent_growth`: if 1, it's
  a percentage; if 0, it's in 8 KB pages (so a `growth` of `1280` means 10 MB per growth event).
- **`is_percent_growth`** — `1` means percentage-based growth, `0` means fixed-size growth.

To check every database on the instance instead of just the current one:

```sql
SELECT
    DB_NAME(database_id) AS db_name,
    name AS file_name,
    type_desc,
    size * 8 / 1024 AS size_mb,
    growth,
    is_percent_growth
FROM sys.master_files
ORDER BY db_name, type_desc;
```

## Why percentage-based growth is an anti-pattern

Percentage-based autogrowth (SQL Server's default is 10% for both data and log files) seems
harmless on a small database. It's a real problem once a file gets large, for two compounding
reasons:

1. **The growth event gets bigger every time.** A 10 GB file growing 10% adds 1 GB; once
   that file is 500 GB, the same 10% adds 50 GB in a single growth event — a large,
   unpredictable I/O spike that happens exactly when the file was already running out of
   space under load.
2. **Every growth event fragments the disk further**, and for a log file, growth events are
   also serialized — no other transaction log activity proceeds while the log is growing,
   which means percentage-based growth on a busy log file causes visible transaction stalls.

## The fix: fixed-size growth

A fixed, deliberately-sized growth increment produces predictable, proportionally smaller
growth events regardless of how large the file has already gotten:

```sql
ALTER DATABASE AdventureWorks2019
MODIFY FILE (
    NAME = AdventureWorks2019_Log,
    FILEGROWTH = 512MB
);
```

For a log file, also enabling instant file initialization for data files (a Windows-level
grant, not T-SQL) and pre-sizing files to their expected working size up front — rather than
relying on autogrowth to catch up under load — avoids most growth events entirely. Autogrowth
should be the safety net for unexpected growth, not the primary sizing strategy.

## Key terms

| Term | Meaning |
|---|---|
| `sys.database_files` | Catalog view listing files (data and log) for the current database, including growth settings |
| `sys.master_files` | Instance-wide catalog view listing files for every database, queryable from any database |
| `is_percent_growth` | Column indicating whether `growth` is a percentage (1) or a fixed 8 KB-page count (0) |

## Check yourself

Why does percentage-based autogrowth get worse, not stay constant, as a database file grows
larger over time?
