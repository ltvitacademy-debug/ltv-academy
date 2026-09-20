# Creating Databases

Chapter 2 configured the instance itself. Chapter 3 turns to what a DBA actually does most
often day to day: creating and configuring individual databases — and getting the file
layout right at creation time, because undoing bad sizing decisions later is expensive and
disruptive.

## What you'll learn

- The full `CREATE DATABASE` syntax: primary filegroup, file specs, and the log file
- What `NAME`, `FILENAME`, `SIZE`, `MAXSIZE`, and `FILEGROWTH` each control
- Why deliberate sizing at creation time beats relying on autogrowth later

## The full syntax

A production `CREATE DATABASE` statement spells out the data file and log file explicitly,
rather than accepting instance defaults:

```sql
CREATE DATABASE Sales
ON PRIMARY
(
    NAME = N'Sales',
    FILENAME = N'D:\SQLData\Sales.mdf',
    SIZE = 1024MB,
    MAXSIZE = 51200MB,
    FILEGROWTH = 256MB
)
LOG ON
(
    NAME = N'Sales_log',
    FILENAME = N'L:\SQLLogs\Sales_log.ldf',
    SIZE = 256MB,
    MAXSIZE = 20480MB,
    FILEGROWTH = 128MB
);
```

`ON PRIMARY` introduces the file list for the primary filegroup — every database has one,
and it always holds the system tables. `LOG ON` introduces the transaction log file, which
never belongs to a filegroup at all; filegroups are a data-file concept only.

## What each clause controls

- **NAME** — the *logical* name SQL Server uses internally and in T-SQL (`ALTER DATABASE
  ... MODIFY FILE`, `DBCC SHRINKFILE`, and so on). It doesn't have to match the file name.
- **FILENAME** — the physical path and file name on disk. The directory must already exist;
  SQL Server won't create it for you.
- **SIZE** — the initial size, in KB/MB/GB/TB. Undersizing this is the single most common
  mistake — Lesson 21 covers why.
- **MAXSIZE** — a ceiling on autogrowth (or `UNLIMITED`, the default if omitted). This is a
  safety net, not a sizing strategy.
- **FILEGROWTH** — the increment used when the file does autogrow, either a fixed size
  (`256MB`) or a percentage (`10%`). Lesson 23 covers why fixed sizing is almost always the
  better choice.

## The minimal form, and what it actually does

`CREATE DATABASE Sales;` with nothing else is legal — SQL Server fills in every omitted
piece from the **model** system database (Lesson 6) and the instance's default data and log
paths (configured in Lesson 9 or via `sp_configure 'default data directory'`). That's
convenient for a quick scratch database, but production databases should never be created
this way: the resulting file sizes come from `model`'s tiny defaults, and the database
starts autogrowing on its very first bulk load.

## Key terms

| Term | Meaning |
|---|---|
| `ON PRIMARY` | Introduces the file spec list for the primary filegroup |
| `LOG ON` | Introduces the file spec for the transaction log |
| Logical name (`NAME`) | The name T-SQL uses to reference a file, independent of its OS file name |
| `model` database | The template SQL Server copies when a `CREATE DATABASE` clause is omitted |

## Check yourself

If you run `CREATE DATABASE Reporting;` with no other clauses, where do the resulting data
and log files land, and what determines their initial size?
