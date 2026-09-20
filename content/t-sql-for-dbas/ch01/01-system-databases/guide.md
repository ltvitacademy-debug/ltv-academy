# System Databases: master, msdb, model & tempdb

This course assumes T-SQL Development's SQL language foundation — you already know how to
write a `SELECT`, join tables, and build a stored procedure. This course asks a different
question entirely: not "how do I write SQL to work with data," but "how do I use T-SQL to
figure out what's wrong with SQL Server and fix it?" Every lesson from here on points T-SQL
at the server itself, not at business data.

## What you'll learn

- The four system databases every SQL Server instance ships with
- What each one actually stores, and why a DBA needs to know
- The one you back up on a totally different schedule than the rest

## The four system databases

Every SQL Server instance — on a laptop or a production cluster — creates four system
databases the moment it's installed:

| Database | What it holds |
|---|---|
| `master` | Instance-level metadata: logins, linked servers, configuration, and where every other database's files live |
| `msdb` | SQL Server Agent jobs, schedules, job history, backup/restore history, Database Mail |
| `model` | The template every new user database is created from |
| `tempdb` | Scratch space: temp tables, table variables, sort/hash spills, version store for snapshot isolation |

Unlike a user database such as `AdventureWorks2022`, these aren't optional — the instance
won't start without `master`, and won't function correctly without the other three.

## Why a DBA queries these directly

A developer writing business logic rarely touches these databases. A DBA lives in them:

- **`master`** answers "what logins exist on this instance, and what server role are they
  in?" — `SELECT name, type_desc FROM sys.server_principals WHERE type NOT IN ('C','K')`.
- **`msdb`** answers "did last night's backup job actually succeed?" — queried constantly
  in Chapter 7's job-monitoring lessons.
- **`model`** answers "why does every new database on this instance come with a weird
  default collation or an unexpected recovery model?" — because whatever's set on `model`
  becomes the default for every database created after.
- **`tempdb`** answers "why is this instance running out of disk on the tempdb drive?" —
  the single most common "the server is slow" root cause a DBA chases.

## The one that's backed up differently

`tempdb` is rebuilt from scratch every time the SQL Server service restarts — it holds
nothing that survives a restart, so it's never backed up. `master`, `msdb`, and `model`
are real, persistent databases and do need regular backups; losing `master` without a
recent backup means rebuilding system databases from installation media, which is a very
bad day. This distinction — what's disposable versus what's not — is the first instinct
this course builds.

## Key terms

| Term | Meaning |
|---|---|
| System database | One of the four databases (`master`, `msdb`, `model`, `tempdb`) SQL Server creates automatically |
| Instance | A single installed copy of the SQL Server engine, hosting one or more databases |
| Recovery model | A database setting controlling how much transaction log detail is kept (Simple, Full, Bulk-Logged) |

## Check yourself

Why does `tempdb` never get backed up, while `master`, `msdb`, and `model` do?
