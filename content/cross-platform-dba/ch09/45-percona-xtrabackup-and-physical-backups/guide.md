# Percona XtraBackup & Physical Backups

SQL Server DBAs have RMAN's Oracle counterpart and their own native backup tooling built
in. MySQL genuinely doesn't ship anything equivalent for fast, hot, physical backups of
InnoDB at scale — that gap is real, not a knowledge deficit on your part. Percona
XtraBackup is how the industry actually fills it, and it's worth understanding both what it
does and why it became the standard rather than treating it as an arbitrary third-party
add-on.

## What you'll learn

- Why MySQL has no built-in equivalent to RMAN for physical backups
- What Percona XtraBackup actually does, and why it's free and open-source
- Real XtraBackup commands for taking and preparing a backup
- Why XtraBackup is the honest, industry-standard choice once mysqldump is too slow

## Why MySQL needs a third-party tool here

Oracle has RMAN. SQL Server has native `BACKUP DATABASE`/`RESTORE DATABASE` with full,
differential, and log backups all built into the engine. MySQL's own distribution includes
no equivalent hot physical backup utility — `mysqldump` is logical, and copying InnoDB's
raw files safely while the server is live and being written to is not something the base
MySQL/InnoDB toolset does for you out of the box.

Percona, a company built around open-source MySQL tooling and support, filled that gap with
XtraBackup: a free, open-source tool that performs hot physical backups of InnoDB (and
XtraDB) databases without stopping the server or taking blocking locks for most of its
runtime. This isn't a lesser alternative bolted on after the fact — it's the tool that
large-scale MySQL shops actually run in production, precisely because mysqldump doesn't
scale to their restore-time requirements.

## How XtraBackup gets a consistent hot copy

XtraBackup copies InnoDB's data files while tracking the redo log in parallel. Because
InnoDB is crash-recoverable by design (it can replay its redo log to reach a consistent
state after an unclean shutdown), XtraBackup exploits that same mechanism: it copies files
while transactions keep running, keeps capturing redo log entries generated during the
copy, and then "prepares" the backup afterward by replaying that captured redo log against
the copied files — the same crash-recovery logic InnoDB already uses, just applied to a
backup instead of an actual crash.

```
xtrabackup --backup --target-dir=/backup/full_2026_09_20 \
  --user=root --password=yourpassword

xtrabackup --prepare --target-dir=/backup/full_2026_09_20
```

The `--backup` step copies files and streams redo log changes. The `--prepare` step applies
that log to make the copied files consistent and restorable — you cannot restore an
unprepared backup and expect a clean result.

## Restoring, and incremental backups

Once prepared, restoring means stopping MySQL, moving the prepared files into MySQL's data
directory, and starting the server:

```
xtrabackup --copy-back --target-dir=/backup/full_2026_09_20 \
  --datadir=/var/lib/mysql
```

XtraBackup also supports incremental backups — capturing only pages changed since a prior
backup — which keeps daily backup windows short on large databases, conceptually similar to
why a SQL Server DBA reaches for differential backups instead of another full backup every
night.

## Key terms

| Term | Meaning |
|---|---|
| Percona XtraBackup | Free, open-source hot physical backup tool for MySQL/InnoDB, filling MySQL's lack of a built-in equivalent |
| `--backup` | XtraBackup step that copies data files and streams redo log changes during the copy |
| `--prepare` | XtraBackup step that replays captured redo log to make copied files consistent and restorable |
| Incremental backup | A backup capturing only data changed since a previous backup, reducing backup time on large databases |

## Check yourself

Why would running `xtrabackup --copy-back` on a backup directory that was never
`--prepare`d produce an unreliable restore, in terms of what `--prepare` actually does?
