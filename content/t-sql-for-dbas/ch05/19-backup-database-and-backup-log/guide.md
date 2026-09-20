# BACKUP DATABASE & BACKUP LOG

Every recovery strategy starts with `BACKUP DATABASE` and `BACKUP LOG`. What those two
statements can actually do for you — and whether `BACKUP LOG` is even a valid option — depends
entirely on one database setting most people set once at creation time and never think about
again: the recovery model. This lesson covers the real syntax for full, differential, and log
backups, and why the recovery model isn't optional background trivia.

## What you'll learn

- `BACKUP DATABASE` syntax, including `WITH COMPRESSION` and `WITH CHECKSUM`
- `BACKUP DATABASE ... WITH DIFFERENTIAL`
- `BACKUP LOG`, and why it only works in certain recovery models

## Full backups

```sql
BACKUP DATABASE AdventureWorks2012
TO DISK = 'D:\Backups\AdventureWorks2012_Full.bak'
WITH COMPRESSION, CHECKSUM, STATS = 10;
```

`WITH COMPRESSION` shrinks the backup file and usually speeds up the backup itself (less I/O
to write, at the cost of a bit more CPU). `WITH CHECKSUM` makes SQL Server verify page
checksums as it reads each page for the backup, so a corrupt page gets caught at backup time
instead of surfacing later during a restore. `STATS = 10` just reports progress every 10
percent — useful for large databases so the job doesn't look hung.

## Differential backups

```sql
BACKUP DATABASE AdventureWorks2012
TO DISK = 'D:\Backups\AdventureWorks2012_Diff.bak'
WITH DIFFERENTIAL, COMPRESSION, CHECKSUM;
```

A differential backup captures every extent that has changed since the *last full backup* —
not since the last differential. That's why differentials grow larger the further you get from
the last full: each one restates everything changed since that full, regardless of how many
differentials came between them.

## BACKUP LOG and the recovery model

```sql
BACKUP LOG AdventureWorks2012
TO DISK = 'D:\Backups\AdventureWorks2012_Log.trn'
WITH COMPRESSION, CHECKSUM;
```

`BACKUP LOG` is only meaningful in the `FULL` or `BULK_LOGGED` recovery models. In `SIMPLE`
recovery, the transaction log truncates automatically at each checkpoint and `BACKUP LOG`
simply isn't a valid operation — you get an error if you try. Check a database's recovery
model with:

```sql
SELECT name, recovery_model_desc FROM sys.databases;
```

This matters because recovery model is the single setting that determines your worst-case
data loss: `SIMPLE` recovery means you can only restore to your last full or differential
backup — anything since is gone. `FULL` recovery, with regular log backups, means you can
restore to any point in time, including seconds before a mistake happened.

## Key terms

| Term | Meaning |
|---|---|
| Full backup | A complete copy of every allocated page in the database |
| Differential backup | Every extent changed since the last full backup |
| Log backup | The transaction log records since the last log backup — only valid in FULL/BULK_LOGGED recovery |
| Recovery model | The database setting (`SIMPLE`, `FULL`, `BULK_LOGGED`) governing how much log detail is retained and what backup types are valid |

## Check yourself

A database is in `SIMPLE` recovery model. Why will `BACKUP LOG` fail, and what's the practical
consequence for how far back you can restore?
