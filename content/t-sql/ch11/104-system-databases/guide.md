# Lesson 104 — System Databases (master, msdb, tempdb, model)

**Chapter 11 · Database Design Fundamentals · Lesson 10 of 12**

## What you'll learn

- The four system databases every SQL Server instance depends on
- What each one is actually responsible for
- Why `tempdb` in particular matters to everything you did in Chapter 10
- Why you should never touch these databases directly

## The four system databases

Every SQL Server instance ships with a set of databases that keep the
*server itself* running — separate from `AdventureWorks2012` or any other
user database you create.

| Database | What it's responsible for |
|---|---|
| **master** | Records all system-level information for the whole instance: logins, configuration settings, and — critically — the existence of every other database |
| **model** | The template SQL Server copies whenever you create a new database. Change `model`'s settings, and every future `CREATE DATABASE` inherits them |
| **msdb** | Used by SQL Server Agent for scheduling jobs, alerts, and backup history |
| **tempdb** | A workspace for temporary objects and intermediate result sets — this is exactly where Lesson 93's `#temp` tables and table variables actually live |

```sql
-- See them all in one query
SELECT name, database_id, create_date, state_desc
FROM sys.databases
WHERE database_id <= 4
ORDER BY database_id;
```

## Why tempdb matters more than it sounds like it should

Every local temp table, every table variable, every large sort or hash
join that doesn't fit in memory — SQL Server stages all of it in `tempdb`.
That's exactly the mechanism behind Lesson 93's comparison of `#temp`
tables, `@table` variables, and CTEs: two of those three options are
literally using this system database as their workspace.

```sql
-- tempdb is recreated from scratch every time SQL Server restarts
SELECT name, physical_name, size * 8 / 1024 AS SizeMB
FROM tempdb.sys.database_files;
```

## Why you never touch these directly

Modifying a row in `master` or `msdb` by hand — instead of through proper
DDL like `CREATE DATABASE` or `CREATE LOGIN` — can corrupt the instance's
own bookkeeping. SQL Server gives you administrative tools (SSMS, DDL
statements, SQL-SMO) specifically so you never have to `INSERT` or
`UPDATE` a system table yourself.

```sql
-- The right way to create a database — SQL Server updates master for you
CREATE DATABASE Lesson104Demo;
DROP DATABASE Lesson104Demo;
```

## Key terms

| Term | Meaning |
|---|---|
| master | Instance-wide system information, including the list of all databases |
| model | The template every new database is copied from |
| msdb | SQL Server Agent's home for jobs, alerts, and backup history |
| tempdb | The workspace for temp tables, table variables, and large intermediate results |

## Lab

Run against any SQL Server instance:

```sql
-- See every database and how large its files are
SELECT db.name, SUM(mf.size * 8 / 1024) AS TotalSizeMB
FROM sys.databases AS db
JOIN sys.master_files AS mf ON mf.database_id = db.database_id
GROUP BY db.name
ORDER BY db.database_id;
```

## Check yourself

You're ready for Lesson 105 when you can explain, without looking: which
system database is where `#temp` tables physically live, and why should
you never edit `master` directly with `INSERT`/`UPDATE`?
