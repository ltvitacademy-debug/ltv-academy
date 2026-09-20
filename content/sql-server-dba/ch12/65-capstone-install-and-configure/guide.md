# Capstone: Install & Configure

Discovery is done. Now you apply Chapters 1 through 4 — architecture, installation and
configuration, database creation, and storage — to actually fix MERSQL01's foundation. None
of this is glamorous, and none of it is optional: you can't secure or automate maintenance on
a server whose storage layout and memory configuration are actively working against you.

## What you'll learn

- How to size and lay out storage properly when inheriting a single-drive mess
- How to reconfigure `tempdb` the way Chapter 4 described, on real hardware
- How to set `max server memory` and move database files without downtime you can't afford

## Fixing the disk layout

MERSQL01 has one 500 GB `C:` drive holding data files, log files, `tempdb`, and backups
together — exactly the anti-pattern Chapter 4 warned about. Working with Meridian's infra
team, you get four new volumes attached: `D:\` for data files, `L:\` for log files, `T:\` for
`tempdb`, and `X:\` for backups. Separating these means a runaway log or a `tempdb` spill
can't take out your data files' disk, and backups no longer live next to the thing they're
protecting.

Moving `DispatchDB` means taking it offline briefly during a maintenance window:

```sql
ALTER DATABASE DispatchDB SET OFFLINE WITH ROLLBACK IMMEDIATE;
-- physically move DispatchDB.mdf to D:\ and DispatchDB_log.ldf to L:\
ALTER DATABASE DispatchDB MODIFY FILE
  (NAME = DispatchDB, FILENAME = 'D:\Data\DispatchDB.mdf');
ALTER DATABASE DispatchDB MODIFY FILE
  (NAME = DispatchDB_log, FILENAME = 'L:\Log\DispatchDB_log.ldf');
ALTER DATABASE DispatchDB SET ONLINE;
```

Before any of that, you take a full backup to `X:\Backups`, then a log backup, then shrink the
log file with `DBCC SHRINKFILE` — once, as a one-time cleanup of six years of unchecked growth,
not as a habit — and immediately follow up with real log backups so it never balloons again.

## Reconfiguring tempdb

Chapter 4 covered the rule directly: `tempdb` should have multiple, equally sized data files —
generally one per logical CPU up to about eight — with fixed-size autogrowth in MB, not
percent, and it belongs on its own fast storage. MERSQL01 has 4 logical CPUs, so:

```sql
ALTER DATABASE tempdb MODIFY FILE (NAME = tempdev,  FILENAME = 'T:\tempdb\tempdb.mdf',   SIZE = 2048MB, FILEGROWTH = 512MB);
ALTER DATABASE tempdb ADD FILE   (NAME = tempdev2, FILENAME = 'T:\tempdb\tempdb2.ndf', SIZE = 2048MB, FILEGROWTH = 512MB);
ALTER DATABASE tempdb ADD FILE   (NAME = tempdev3, FILENAME = 'T:\tempdb\tempdb3.ndf', SIZE = 2048MB, FILEGROWTH = 512MB);
ALTER DATABASE tempdb ADD FILE   (NAME = tempdev4, FILENAME = 'T:\tempdb\tempdb4.ndf', SIZE = 2048MB, FILEGROWTH = 512MB);
ALTER DATABASE tempdb MODIFY FILE (NAME = templog, FILENAME = 'T:\tempdb\templog.ldf', SIZE = 1024MB, FILEGROWTH = 256MB);
```

This takes effect on the next restart of the Database Engine service, so it's scheduled for
the same maintenance window as the file moves.

## Server-level configuration

MERSQL01 has 32 GB of RAM and `max server memory` was left at its default of effectively
unlimited — the Database Engine was free to starve the OS itself of memory. You leave 6 GB for
the OS and other services and cap the engine:

```sql
EXEC sys.sp_configure 'max server memory (MB)', 26624;
RECONFIGURE;
```

You also confirm the instance is SQL Server 2019 Standard Edition, check the current build
against Microsoft's latest cumulative update (patching itself is out of scope for this
maintenance window — that's Chapter 11's territory — but you log the gap), and confirm
`DispatchDB`'s database-scoped configuration and collation match what the application expects.

## Key terms

| Term | Meaning |
|---|---|
| File separation | Putting data, log, tempdb, and backups on distinct physical volumes |
| `max server memory` | The server-level setting capping how much RAM the Database Engine can claim |
| `DBCC SHRINKFILE` | A one-time cleanup command to reclaim space from an oversized log — not a routine maintenance step |
| Maintenance window | A scheduled, low-traffic period used for changes that require downtime, like a file move |

## Check yourself

Why is a one-time `DBCC SHRINKFILE` on `DispatchDB_log.ldf` safe and appropriate here, but
scheduling it to run nightly as a "maintenance job" would be a mistake?
