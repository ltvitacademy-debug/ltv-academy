# Tail-Log Backups

Every restore chain so far assumed the log backups you have are all the log backups that exist.
Real incidents don't wait for a scheduled log backup job — a database might need restoring for a
reason unrelated to data loss (moving to new storage, reverting a bad deployment) while it's still
online and generating log records nobody has backed up yet. The tail-log backup is the step that
captures those records before the restore begins.

## What you'll learn

- What a tail-log backup is, and the one clause that defines it
- When it's required, and when it's not (or can't be taken at all)
- Why skipping it silently throws away recent transactions

## What a tail-log backup actually is

A tail-log backup is an ordinary log backup with one addition: `WITH NORECOVERY`, applied to the
*backup* statement itself (not the restore). It backs up whatever's in the log since the last log
backup, then immediately takes the database out of action — preventing any further changes before
a restore starts, so nothing gets missed or added out of order.

```sql
BACKUP LOG MyDatabase
TO DISK = N'D:\Backup\MyDatabase_TailLog.trn'
WITH NORECOVERY;
```

After this runs, the database is in a `RESTORING` state — the same state a `RESTORE ... WITH
NORECOVERY` produces. From here, a full restore chain (full, differential, logs, and now this
tail-log backup as the final piece) restores the database to the exact moment right before the
tail-log backup ran, losing nothing.

## When it's required — and when it isn't

A tail-log backup is required whenever **the source database is still accessible** and you need
every last transaction preserved before restoring over it or moving it elsewhere. Common real
scenarios: restoring a database to fix corruption discovered mid-day, migrating a database by
restoring it onto new hardware, or reverting a botched deployment on a database that's still
online and being written to.

It is **not needed, and not possible**, when the source database is already gone — hardware
failure, a dropped database, a corrupted log file that can't be read. In that case there's no log
left to back up; the restore chain simply ends at the last successful log backup taken before the
loss, and everything after that point is genuinely unrecoverable.

## The cost of skipping it

If a database is still online and a DBA restores over it without taking a tail-log backup first,
every transaction committed since the last scheduled log backup is silently discarded — not
flagged, not warned about twice, just gone the moment `WITH RECOVERY` finalizes the restore.
SSMS's restore wizard will actually prompt to take a tail-log backup automatically in this exact
situation; scripted restores get no such prompt, which is precisely why this step is easy to
forget under pressure.

## Key terms

| Term | Meaning |
|---|---|
| Tail-log backup | A log backup taken with `WITH NORECOVERY`, capturing the log right up to the moment before a restore |
| `BACKUP LOG ... WITH NORECOVERY` | The exact syntax that both backs up and takes the database offline in one step |
| Source database accessible | The condition under which a tail-log backup is possible and usually required |
| Unrecoverable gap | Transactions lost forever when a tail-log backup is skipped on an accessible database before a restore |

## Check yourself

A database suffers a hardware failure and is completely inaccessible — the drive holding both the
data and log files is destroyed. Can a tail-log backup rescue the transactions since the last log
backup in this case? Why or why not?
