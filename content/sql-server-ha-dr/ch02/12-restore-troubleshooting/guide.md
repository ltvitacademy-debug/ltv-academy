# Restore Troubleshooting

Lessons 7 through 11 covered restores that go as planned. This lesson closes Chapter 2 with the
ones that don't — the specific errors and failure modes that actually stop a restore in practice,
and what each one is really telling you. Every scenario here is common enough that a working DBA
will hit each one eventually, usually at the worst possible time.

## What you'll learn

- Why "database is in use" stops a restore, and the two real fixes
- Why file path mismatches happen even when `MOVE` was used correctly elsewhere
- What a backup chain gap actually breaks, and why there's no partial credit

## "Exclusive access could not be obtained because the database is in use"

This is the most common restore-blocking error, and it means exactly what it says: something else
— an open SSMS query window, an application connection pool, a monitoring tool — is connected to
the database SQL Server is trying to overwrite. A restore needs exclusive access to the database
it's replacing. Two real fixes:

```sql
-- Fix 1: force the database into single-user mode, kicking other connections
ALTER DATABASE MyDatabase SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
RESTORE DATABASE MyDatabase FROM DISK = N'...' WITH REPLACE, RECOVERY;
ALTER DATABASE MyDatabase SET MULTI_USER;

-- Fix 2: identify and kill specific sessions first
SELECT session_id FROM sys.dm_exec_sessions WHERE database_id = DB_ID('MyDatabase');
KILL <session_id>;
```

`ROLLBACK IMMEDIATE` terminates every other connection's open transactions immediately, which is
appropriate mid-incident but should be a deliberate choice, not a reflex, on a database other
teams still depend on.

## File path mismatches, even after using MOVE correctly

A restore can still fail on file paths even when `MOVE` (Lesson 10) was specified correctly — the
usual cause is that the *folder* in the `MOVE` target doesn't exist yet. `MOVE` redirects where
SQL Server writes the file; it does not create missing directories. The folder has to already
exist on the target server, or the restore fails with an "operating system error" naming the path
it couldn't open. This is easy to miss when scripting a restore against a server nobody has
manually verified the folder structure on yet.

## Backup chain gaps

A restore chain (Lessons 8 and 9) is exactly as strong as its weakest link — restoring full, then
differential, then a sequence of log backups only works if every step connects to the next one's
LSN range without a gap. A missing or corrupted log backup anywhere in that sequence doesn't just
lose the transactions in that one file; it makes every log backup *after* the gap unusable too,
because SQL Server can't verify they connect to anything before them. There's no partial restore
across a gap — the chain simply stops at the last backup before the missing link, whether or not a
later, otherwise-valid backup exists.

```sql
-- Confirm a log backup's position in the chain before relying on it
RESTORE HEADERONLY FROM DISK = N'D:\Backup\MyDatabase_Log5.trn';
-- Compare FirstLSN/LastLSN against the backup immediately before and after it
```

## Key terms

| Term | Meaning |
|---|---|
| Exclusive access | The requirement that no other connection is using a database while it's being restored over |
| `SET SINGLE_USER WITH ROLLBACK IMMEDIATE` | Forces out other connections by terminating their open transactions |
| Backup chain gap | A missing or corrupted backup that breaks LSN continuity, making every backup after it unusable |
| FirstLSN / LastLSN | The log sequence number range a backup covers, used to verify chain continuity |

## Check yourself

A DBA has a full backup, a differential, and log backups 1 through 5 — but log backup 3 turns out
to be corrupted and unreadable. Can log backups 4 and 5 still be restored after applying the full,
differential, and log backups 1 and 2? Why or why not?
