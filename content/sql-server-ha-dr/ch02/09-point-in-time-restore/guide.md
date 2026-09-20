# Point-in-Time Restore

Lessons 7 and 8 built restore chains out of full and differential backups — both land you on the
exact moment a backup was taken. Point-in-time restore is the payoff Chapter 1 promised for
running FULL recovery: restoring to any specific moment *between* backups, using the transaction
log to roll forward past the last backup and stop wherever you choose.

## What you'll learn

- The full/differential/log chain, and the strict ordering it requires
- The `WITH STOPAT` clause and how SQL Server uses it
- Why this only works under FULL (or BULK_LOGGED, with caveats) recovery

## The chain: full, then differential, then logs

A point-in-time restore extends the pattern from Lesson 8 with one more link: log backups,
restored in the exact order they were taken, after the full and differential.

```sql
-- 1. Full backup — the baseline
RESTORE DATABASE MyDatabase
FROM DISK = N'D:\Backup\MyDatabase_Full.bak'
WITH NORECOVERY;

-- 2. Most recent differential before the target time
RESTORE DATABASE MyDatabase
FROM DISK = N'D:\Backup\MyDatabase_Diff.bak'
WITH NORECOVERY;

-- 3. Log backups in sequence, up to and past the target moment
RESTORE LOG MyDatabase
FROM DISK = N'D:\Backup\MyDatabase_Log1.trn'
WITH NORECOVERY;

RESTORE LOG MyDatabase
FROM DISK = N'D:\Backup\MyDatabase_Log2.trn'
WITH RECOVERY, STOPAT = '2026-09-15T14:32:00';
```

Every statement but the last uses `WITH NORECOVERY` — the exact rule from Lessons 7 and 8, just
applied across a longer chain. Skip a log backup in the sequence, or restore them out of order,
and the chain breaks: SQL Server needs each log backup's LSN range to connect unbroken to the
one before it.

## `WITH STOPAT` — the clause that makes it "point-in-time"

`STOPAT` tells SQL Server to replay the transaction log only up to the specified date and time,
then stop and recover — any transactions committed after that moment are discarded, exactly as if
they never happened. It only needs to be specified on the log restore statement that actually
crosses the target time; it's harmless to omit on earlier statements in the chain since they
finish before the target moment anyway.

`STOPAT` is what makes "restore to 2:32 PM, right before someone ran the bad `DELETE`" possible —
the alternative, restoring only to the last full or differential backup's timestamp, could mean
losing hours of legitimate transactions that happened between that backup and the mistake.

## Why this requires FULL recovery (Lesson 1, paid off)

None of this works without an unbroken log backup chain, and an unbroken log backup chain is
exactly what SIMPLE recovery prevents by truncating the log automatically. BULK_LOGGED technically
supports point-in-time restore too, but with the caveat from Lesson 1: if the target moment falls
inside a minimally-logged bulk operation, SQL Server can't stop at an arbitrary point inside it —
only at the end of the log backup containing it.

## Key terms

| Term | Meaning |
|---|---|
| `WITH STOPAT` | Restores the log only up to a specified moment, discarding later transactions |
| Restore chain | Full → differential (optional) → log backups, in strict order, NORECOVERY until the last step |
| LSN (Log Sequence Number) | The identifier SQL Server uses to verify log backups connect without gaps |
| Point-in-time recovery | Restoring to any moment, not just a backup's own timestamp — requires FULL recovery |

## Check yourself

A restore chain has the full backup, the differential, and log backups 1 and 3 — but log backup 2
is missing. Can `STOPAT` still be used to restore to a time covered by log backup 3? Why or why
not?
