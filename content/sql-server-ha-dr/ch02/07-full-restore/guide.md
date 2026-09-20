# Full Restore

Chapter 1 built the backup side of the equation: recovery models, backup strategy, compression,
verification, automation. Chapter 2 flips to the restore side — because a backup nobody has
successfully restored isn't a backup, it's an unverified hope. This lesson covers the simplest
restore scenario there is: restoring a single full backup. Every other restore scenario in this
chapter is this scenario plus additional steps.

## What you'll learn

- The exact syntax that restores a full backup
- Why `WITH RECOVERY` and `WITH NORECOVERY` produce two completely different outcomes
- What `WITH REPLACE` does and why it's dangerous to use casually

## The command that starts every restore

Every restore scenario in this chapter — full, differential, point-in-time, to a new server —
starts with the same statement shape:

```sql
RESTORE DATABASE MyDatabase
FROM DISK = N'D:\Backup\MyDatabase_Full.bak'
WITH RECOVERY;
```

If `MyDatabase_Full.bak` is the *only* backup this database needs — no differentials, no log
backups to apply afterward — this single statement is the entire restore. SQL Server reads the
backup, overwrites the data and log files (or recreates them, per the backup's file list), replays
what it needs to for transactional consistency, and brings the database online.

## RECOVERY vs. NORECOVERY — the fork in every restore plan

This is the single most important choice in any restore, and it's the one new DBAs get backwards
most often:

- **`WITH RECOVERY`** (the default if you omit the clause) tells SQL Server "this is the last
  backup I'm applying — roll back any uncommitted transactions and bring the database online for
  use." Once a database is recovered, **no further backups can be applied to it.** If you later
  discover there was a differential or log backup you needed, you have to start the whole restore
  over from the full backup.
- **`WITH NORECOVERY`** tells SQL Server "more backups are coming — leave the database in a
  `RESTORING` state, don't roll back anything yet, and wait." This is what makes the differential
  and point-in-time restores in the next two lessons possible: the full backup restores with
  `NORECOVERY`, then the differential or log backups restore on top of it, and only the *final*
  step in the chain uses `WITH RECOVERY`.

A database stuck in `RESTORING` state is not usable for queries — it looks offline to
applications. That's expected mid-restore; it becomes a problem only if a restore chain is
abandoned partway through and nobody finishes it.

## `WITH REPLACE` and other real-world options

Restoring over a database that already exists on the target server requires `WITH REPLACE` —
without it, SQL Server refuses, as a safety check against accidentally overwriting a database with
an unrelated backup:

```sql
RESTORE DATABASE MyDatabase
FROM DISK = N'D:\Backup\MyDatabase_Full.bak'
WITH REPLACE, RECOVERY, STATS = 10;
```

`STATS = 10` reports restore progress every 10%, useful for large databases where a silent restore
looks indistinguishable from a hung one. Two read-only diagnostic commands are worth knowing before
you ever run `RESTORE DATABASE` for real: `RESTORE HEADERONLY` lists the backup sets in a file, and
`RESTORE FILELISTONLY` lists the logical/physical file names the backup expects to write — both
run against the backup file without touching the target database, and both are the fastest way to
confirm you're about to restore the file you think you are.

## Key terms

| Term | Meaning |
|---|---|
| `WITH RECOVERY` | Finalizes the restore, rolls back open transactions, brings the database online — no further backups can be applied |
| `WITH NORECOVERY` | Leaves the database in `RESTORING` state, ready for the next backup in the chain |
| `WITH REPLACE` | Required to restore over an existing database with an unrelated backup history |
| `RESTORE HEADERONLY` | Read-only command listing the backup sets inside a backup file |
| `RESTORE FILELISTONLY` | Read-only command listing the logical/physical files a backup expects |

## Check yourself

A DBA restores a full backup with `WITH RECOVERY`, then realizes there was a differential backup
taken later that same day that should have been applied too. Can they now restore that
differential on top of the already-recovered database? Why or why not?
