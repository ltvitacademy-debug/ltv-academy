# Backup Verification

Every lesson so far in this chapter has assumed the backups being designed, compressed,
encrypted, and distributed across locations are actually good. This lesson questions that
assumption directly — because a backup file existing on disk is not the same claim as a
backup file being restorable, and the gap between those two claims is exactly where
verification lives.

## What you'll learn

- What `RESTORE VERIFYONLY` actually checks — and the real limits of what it checks
- The `WITH CHECKSUM` backup option and what corruption it catches
- Why a periodic test restore to a scratch instance is the only rigorous verification there is

## `RESTORE VERIFYONLY`: readable, not provably restorable

`RESTORE VERIFYONLY` is a read-only command that inspects a backup file without touching any
database:

```sql
RESTORE VERIFYONLY
FROM DISK = N'D:\Backup\Sales_Full.bak'
WITH CHECKSUM;
```

It confirms the backup set is complete, that all volumes of a striped backup are present,
that the backup header is valid, and — if `WITH CHECKSUM` was used at backup time — that the
page checksums stored in the backup are intact. What it does **not** do is perform an actual
restore: it doesn't recreate the database, doesn't verify the data files can be written to
their target paths, and can't catch every form of corruption that a real restore-and-recover
cycle would surface. A backup can pass `VERIFYONLY` cleanly and still fail — or succeed with
surprises — when someone actually tries to restore it under real conditions.

## `WITH CHECKSUM`: catching corruption during the backup itself

Adding `CHECKSUM` to a `BACKUP` statement does two things: it validates each page's stored
checksum as SQL Server reads it (surfacing corrupt pages *during the backup*, before they get
silently backed up), and it stores a checksum for the backup itself, which is what
`RESTORE VERIFYONLY WITH CHECKSUM` later checks against:

```sql
BACKUP DATABASE Sales
TO DISK = N'D:\Backup\Sales_Full.bak'
WITH CHECKSUM, STATS = 10;
```

By default, if `CHECKSUM` finds a corrupt page, the backup stops (`STOP_ON_ERROR` is the
implicit default). `CONTINUE_AFTER_ERROR` can be specified to let the backup finish anyway —
useful for getting *something* off a failing disk, but the resulting backup should be treated
as suspect, not routine.

## The real, rigorous practice: test-restore to a scratch instance

`VERIFYONLY` and `CHECKSUM` both operate on the backup file in isolation. Neither one proves
the thing that actually matters: that this backup, restored for real, brings up a working,
queryable database. The only practice that proves that is periodically restoring backups —
full, and ideally the differential and log chain on top — to a separate scratch or test
instance:

```sql
RESTORE DATABASE Sales_Verify
FROM DISK = N'D:\Backup\Sales_Full.bak'
WITH MOVE 'Sales' TO N'D:\TestData\Sales_Verify.mdf',
     MOVE 'Sales_log' TO N'D:\TestData\Sales_Verify_log.ldf',
     RECOVERY, STATS = 10;
```

A test restore catches everything the lighter checks can't: a backup file that's technically
intact but references file paths that don't exist on the actual target server, a chain that
turns out to be missing a link, or a database that restores but is subtly inconsistent in a
way only a real recovery cycle exposes. This is more expensive — it needs spare storage and
compute — but it's the only check that answers the question that actually matters during an
incident: **will this backup actually bring the database back?**

## Key terms

| Term | Meaning |
|---|---|
| `RESTORE VERIFYONLY` | Read-only check that a backup file is complete and readable — not a proof of restorability |
| `WITH CHECKSUM` (backup) | Validates page checksums during backup and stores a checksum for the backup set itself |
| Test restore | Restoring a backup to a separate scratch instance to prove it actually recovers a usable database |
| `CONTINUE_AFTER_ERROR` | Lets a backup finish despite a checksum failure — the result should be treated as suspect |

## Check yourself

A backup passes `RESTORE VERIFYONLY WITH CHECKSUM` with no errors. A manager concludes the
backup is "fully verified" and no further checking is needed. What's missing from that
conclusion, per this lesson?
