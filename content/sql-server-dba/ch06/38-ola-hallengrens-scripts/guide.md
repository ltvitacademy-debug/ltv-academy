# Ola Hallengren's Maintenance Scripts, the Industry Standard

## What you'll learn

- What Ola Hallengren's SQL Server Maintenance Solution actually is
- Why it became the de facto industry standard instead of hand-built Maintenance Plans
- The three core stored procedures it installs, and how they map to everything this chapter
  covered

## What it actually is

**Ola Hallengren's Maintenance Solution** (published free, open-source, at ola.hallengren.com)
is a set of T-SQL scripts that install a handful of stored procedures into a database on your
instance (commonly a dedicated `DBA` or `master` database). It's not a product, a service, or
anything requiring a license — you download a `.sql` file, run it once to create the procedures
and their supporting Agent job shells, and you have a complete, configurable maintenance system
built entirely from real, standard T-SQL.

## Why it's the de facto standard, honestly

Every task Ola Hallengren's solution performs is exactly what Lessons 33–37 already covered —
`ALTER INDEX REBUILD`/`REORGANIZE`, `UPDATE STATISTICS`, `DBCC CHECKDB`, `BACKUP DATABASE`/`BACKUP
LOG` — so it's not doing anything magical. What made it the standard almost every real-world SQL
Server shop reaches for instead of hand-building Maintenance Plans is execution quality:

- **Parameterized, not one-size-fits-all.** A single procedure call handles every database on
  the instance (or a filtered subset), with per-database or per-index decisions made
  dynamically at runtime — you don't hand-configure a separate task per database like the
  Wizard.
- **Fragmentation-aware index maintenance out of the box.** It implements the same
  threshold-based `REORGANIZE`-vs-`REBUILD` logic from Lesson 34 automatically, across every
  index on every targeted database, without you writing the loop.
- **Correctly handles partitioned indexes** — a genuinely hard problem that many hand-rolled
  scripts and even some Maintenance Plan configurations get subtly wrong, running maintenance
  per-partition rather than blindly rebuilding an entire massive partitioned index unnecessarily.
- **Log-based, resumable design.** It logs detailed execution history to tables it creates,
  making failures diagnosable instead of a silent gap in coverage.
- **Actively maintained and battle-tested.** Years of real production use across a huge number
  of environments, with a large community and clear documentation — the opposite of a one-off
  script someone wrote for a single job years ago and stopped touching.

## The three core stored procedures

- **`DatabaseBackup`** — full, differential, and log backups (Lesson 36's logic), with real
  parameters for compression, checksum, verification, and retention/cleanup of old files.
- **`IndexOptimize`** — the fragmentation-aware `REORGANIZE`/`REBUILD` logic from Lesson 34, plus
  statistics updates from Lesson 35, applied across whatever databases/indexes you target.
- **`DatabaseIntegrityCheck`** — `DBCC CHECKDB` (Lesson 37's logic), with parameters controlling
  scope and `PHYSICAL_ONLY` behavior.

Each is wrapped in Agent jobs the installer creates, scheduled just like any other job (Chapter
7), typically called with parameters like:

```sql
EXECUTE dbo.IndexOptimize
    @Databases = 'USER_DATABASES',
    @FragmentationLow = NULL,
    @FragmentationMedium = 'INDEX_REORGANIZE,INDEX_REBUILD_ONLINE',
    @FragmentationHigh = 'INDEX_REBUILD_ONLINE,INDEX_REBUILD_OFFLINE',
    @UpdateStatistics = 'ALL';
```

## What it replaces

In most real production environments, Ola Hallengren's solution **replaces** the hand-built
Maintenance Plans from Lesson 33 entirely — it's not something you run alongside them for the
same tasks. A DBA inheriting a server should expect to find this solution already installed far
more often than a from-scratch Maintenance Plan Wizard setup, which is exactly why recognizing
it (the `dbo.DatabaseBackup`, `dbo.IndexOptimize`, `dbo.DatabaseIntegrityCheck` procedure names,
and the `CommandLog` table it logs to) matters as a practical, real-world skill.

## Key terms

| Term | Meaning |
|---|---|
| Ola Hallengren's Maintenance Solution | Free, open-source T-SQL scripts (ola.hallengren.com) that are the de facto industry-standard maintenance system |
| `DatabaseBackup` | Its stored procedure for full/differential/log backups |
| `IndexOptimize` | Its stored procedure for fragmentation-aware index maintenance and statistics updates |
| `DatabaseIntegrityCheck` | Its stored procedure wrapping `DBCC CHECKDB` |

## Check yourself

You inherit a production server and find Agent jobs named `IndexOptimize - USER_DATABASES` and
`DatabaseBackup - USER_DATABASES - FULL`. What are you almost certainly looking at, and what
would you check to confirm it?
