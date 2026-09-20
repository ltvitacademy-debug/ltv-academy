# Restore Sequences & Point-in-Time Recovery

A single `RESTORE DATABASE` statement rarely gets you all the way back. Real recovery is a
*sequence* — full, then differential, then a chain of log backups — applied in the right order,
with `NORECOVERY` on every step but the last. Do it right and you can land the database not just
at "the last backup," but at the exact second before someone ran the `DELETE` that started the
incident.

## What you'll learn

- The correct order to restore full, differential, and log backups
- Why you can skip straight from a full backup to a differential, but not skip log backups
- `WITH STOPAT` for restoring to an exact point in time

## The restore sequence

Given a full backup, a differential backup, and two log backups taken after it, the sequence
is:

```sql
RESTORE DATABASE AdventureWorks2012
FROM DISK = 'D:\Backups\AdventureWorks2012_Full.bak'
WITH NORECOVERY;

RESTORE DATABASE AdventureWorks2012
FROM DISK = 'D:\Backups\AdventureWorks2012_Diff.bak'
WITH NORECOVERY;

RESTORE LOG AdventureWorks2012
FROM DISK = 'D:\Backups\AdventureWorks2012_Log1.trn'
WITH NORECOVERY;

RESTORE LOG AdventureWorks2012
FROM DISK = 'D:\Backups\AdventureWorks2012_Log2.trn'
WITH RECOVERY;
```

A differential backup captures every change since the *last full backup*, so restoring it lets
you skip straight from full to differential — you don't need any differentials taken in between.
Log backups are different: each one only contains the log records since the *previous log
backup*, so the entire unbroken chain of log files must be restored in order. Skip one log
backup in the chain and every log backup after it becomes useless for that restore.

## Restoring to a point in time

`WITH STOPAT` restores the log only up to a specific timestamp, instead of applying the whole
file:

```sql
RESTORE DATABASE AdventureWorks2012
FROM DISK = 'D:\Backups\AdventureWorks2012_Full.bak'
WITH NORECOVERY;

RESTORE LOG AdventureWorks2012
FROM DISK = 'D:\Backups\AdventureWorks2012_Log1.trn'
WITH STOPAT = '2026-09-19T14:32:00', RECOVERY;
```

This is the classic "someone ran an unqualified `DELETE` at 2:35 PM, restore to 2:32 PM"
scenario. `STOPAT` only works within a log backup that actually spans that timestamp — SQL
Server stops applying log records the instant it reaches the requested time and recovers the
database as of that moment. This only works in `FULL` or `BULK_LOGGED` recovery model, since
`SIMPLE` recovery never retains a usable log to restore.

## Why the sequence order matters

Restoring out of order — say, trying to apply a log backup before the full and differential are
in place — fails outright, because each backup in the chain records the Log Sequence Number
(LSN) range it covers, and SQL Server refuses to apply a backup whose LSN range doesn't pick up
where the database currently left off.

## Key terms

| Term | Meaning |
|---|---|
| Restore sequence | The ordered set of RESTORE statements (full → differential → logs) needed to reach a target state |
| LSN (Log Sequence Number) | A number identifying each log record's position; SQL Server uses LSN ranges to validate restore order |
| `WITH STOPAT` | A `RESTORE LOG` option that applies log records only up to a specified date/time |
| Point-in-time recovery | Restoring a database to an exact moment, not just to the end of the last available backup |

## Check yourself

Why can you restore a full backup and then jump straight to a differential backup, but you
cannot skip a log backup in the middle of a log chain?
