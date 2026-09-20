# The Toolkit Concept: Reusable, Reliable, Documented

Forty lessons in, you've written dozens of one-off diagnostic queries — checking wait
stats, finding blocking chains, confirming a backup ran. Every one of them worked in the
moment. Most of them are now gone, retyped from memory the next time you needed them.
This chapter fixes that: you're going to assemble the best queries from this course into
a real script library — the kind a working DBA keeps in source control and reaches for
on every single server they touch. Before assembling anything, this lesson covers what
actually makes a script worth keeping.

## What you'll learn

- Why a query that only works against one database name isn't reusable
- The difference between a script that's always safe to run and one that needs a guard
- A header comment convention that makes a script self-documenting

## Parameterize instead of hardcoding

A script you wrote for one incident, against one database, on one afternoon, is not a
toolkit script — it's a one-time query that happens to be saved in a file. The difference
is a single habit: never bake a database name, a threshold, or a server name into the
body of the query. Declare it as a variable at the top instead.

```sql
-- Not reusable — only ever checks AdventureWorks2019
SELECT name, recovery_model_desc FROM sys.databases WHERE name = 'AdventureWorks2019';

-- Reusable — works against any database, or every database, unchanged
DECLARE @DatabaseName sysname = NULL;  -- NULL = check every database

SELECT name, recovery_model_desc
FROM sys.databases
WHERE (@DatabaseName IS NULL OR name = @DatabaseName);
```

The second version is the same query doing the same job — but now it's a script you can
hand to a teammate, run against a different server, or drop into a scheduled job without
editing a single line. That `DECLARE` block at the top is what turns a query into a tool.

## Know which queries are always safe, and which need a guard

Every script in this course's toolkit reads data with `SELECT` — DMVs, catalog views, and
`msdb`/`sys` metadata. Read-only queries against these are safe to run on a live
production server at any time; SQL Server doesn't let a `SELECT` against a DMV block or
corrupt anything. That's why this whole course has been comfortable running queries
directly against production.

The moment a script writes — `UPDATE`, `DELETE`, `KILL`, or a job that disables an Agent
job — it needs a guard: a `@DryRun` flag that defaults to printing what *would* happen
instead of doing it, and a `WHERE` clause specific enough that a mistake can't sweep past
its intended target.

```sql
DECLARE @DryRun bit = 1;  -- 1 = print only, 0 = actually run

IF @DryRun = 1
    PRINT 'Would disable job: Nightly Purge — Legacy';
ELSE
    EXEC msdb.dbo.sp_update_job @job_name = 'Nightly Purge — Legacy', @enabled = 0;
```

Defaulting `@DryRun` to `1` means the dangerous branch never fires by accident — someone
has to deliberately flip it to `0` after reading what the script intends to do.

## Document with a header, every time

A script with no header is a script nobody trusts six months later — not even the person
who wrote it. Every script in this chapter's toolkit opens with the same three-line
convention: what it does, how to run it, and when it was last confirmed to work.

```sql
-- =====================================================================
-- Script:         database-space-check.sql
-- Purpose:        Reports size, free space, and autogrowth settings for
--                 every file in the current database.
-- Usage:           Run in the context of the target database (USE first),
--                 or wrap in sp_MSforeachdb to check every database.
-- Last verified:  SQL Server 2019 / 2022, September 2026
-- =====================================================================
```

`Last verified` matters more than it looks like it should — DMV columns get renamed or
deprecated across versions, and a script nobody's touched since SQL Server 2014 is a
script you re-test before trusting, not one you run blind.

## Key terms

| Term | Meaning |
|---|---|
| Parameterization | Declaring inputs like a database name or threshold as variables at the top of a script, instead of hardcoding them into the query body |
| Dry run | A safety mode where a script prints what it would do instead of actually doing it, controlled by a flag like `@DryRun` |
| Header comment | A standardized comment block at the top of a script documenting its purpose, usage, and last-verified version |

## Check yourself

Why does a `@DryRun` flag default to `1` instead of `0` in a script that can disable a job or kill a session?
