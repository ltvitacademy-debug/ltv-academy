# Restore & Recovery Scenarios with RMAN

SQL Server talks about "restoring" a database as one combined action. RMAN insists on
separating two steps that really are different operations: **restore** puts backup files back
where they belong, and **recover** applies redo on top of them to bring the data current. A
real Oracle recovery almost always does both, in that order, and understanding why they're
separate is what makes point-in-time recovery make sense.

## What you'll learn

- The real difference between `RESTORE` and `RECOVER`
- Complete recovery vs. incomplete (point-in-time) recovery
- Restoring a single tablespace instead of the whole database

## Restore gets the files back; recover brings them current

```
RMAN> STARTUP MOUNT;
RMAN> RESTORE DATABASE;
RMAN> RECOVER DATABASE;
RMAN> ALTER DATABASE OPEN;
```

`RESTORE DATABASE` copies datafiles from the backup back to disk — at this point, the
database is exactly as it was at backup time, nothing more. `RECOVER DATABASE` then applies
archived (and if available, online) redo logs on top of those restored files, replaying every
committed transaction since the backup, bringing the database up to the most recent point
possible — this is **complete recovery**, and it's the normal case: a disk failed, you restore
last night's backup and recover forward to the moment right before the crash, losing nothing.

## Incomplete recovery stops short of "now" on purpose

Sometimes you don't want the most current state — you want the state *before* something bad
happened, like a dropped table or a botched batch update. This is **incomplete recovery**, and
it means telling RMAN explicitly where to stop applying redo:

```
RMAN> STARTUP MOUNT;
RMAN> SET UNTIL TIME "TO_DATE('2026-09-19 14:30:00','YYYY-MM-DD HH24:MI:SS')";
RMAN> RESTORE DATABASE;
RMAN> RECOVER DATABASE;
RMAN> ALTER DATABASE OPEN RESETLOGS;
```

`SET UNTIL TIME` (or `SET UNTIL SCN` for exact System Change Number precision) caps how far
recover replays redo. Because the database is being opened at a point in the past rather than
its true current state, Oracle requires `OPEN RESETLOGS` — it resets the online redo log
sequence, marking a new incarnation of the database, since the old sequence no longer matches
what actually happened afterward.

## You can restore and recover a single tablespace, not just the whole database

RMAN doesn't force an all-or-nothing restore. A tablespace with an isolated problem — a
dropped table in one tablespace's datafiles, say — can be restored and recovered on its own
while the rest of the database stays online and available:

```
RMAN> SQL 'ALTER TABLESPACE users OFFLINE';
RMAN> RESTORE TABLESPACE users;
RMAN> RECOVER TABLESPACE users;
RMAN> SQL 'ALTER TABLESPACE users ONLINE';
```

This keeps the rest of the database serving traffic during recovery of the affected piece —
a meaningfully smaller blast radius than taking the whole instance down.

## `VALIDATE` checks a backup without actually restoring anything

Before you're ever in a real emergency, RMAN can confirm a backup is actually usable:

```
RMAN> RESTORE DATABASE VALIDATE;
```

This reads through the backup pieces and checks for corruption without writing any files
back — a real way to verify "an untested backup isn't a real backup" for Oracle specifically,
rather than assuming a backup that completed without error is automatically restorable.

## Key terms

| Term | Meaning |
|---|---|
| `RESTORE` | Copies backup files back to disk — the database matches the backup, nothing more |
| `RECOVER` | Applies redo on top of restored files to bring data current or to a chosen point |
| Complete recovery | Recovering all the way to the most recent possible point (normal case) |
| Incomplete recovery | Recovering to a deliberately earlier point using `SET UNTIL TIME`/`SCN` |
| `OPEN RESETLOGS` | Required after incomplete recovery; starts a new redo log incarnation |
| `RESTORE ... VALIDATE` | Checks a backup for usability without actually restoring files |

## Check yourself

A developer accidentally truncates a table at 2:15 PM. It's now 3:00 PM. Explain, using
RESTORE and RECOVER specifically, what commands get the database back to 2:14 PM — and why
`ALTER DATABASE OPEN` alone (without `RESETLOGS`) won't work here.
