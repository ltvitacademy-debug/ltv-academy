# Differential Restore

Lesson 7 covered the simplest restore: one full backup, one statement. Most real restores aren't
that simple, because most real backup strategies (Chapter 1, Lesson 2) include differentials
between fulls to shrink restore time. This lesson covers the two-step chain that results: restore
the full backup, then restore the differential on top of it.

## What you'll learn

- Why a differential restore is always at least two RESTORE statements, never one
- The exact NORECOVERY/RECOVERY sequence that makes the chain work
- What happens if you restore a differential that doesn't match the full backup underneath it

## What a differential backup actually contains

A reminder from Chapter 1: a differential backup captures every data page changed **since the
last full backup** — not since the last differential. That single fact is why the differential
restore chain is always exactly two backups deep (full, then differential), never a chain of
differentials stacked on each other. Restoring the most recent differential always gets you
everything since the full, in one step.

## The two-statement chain

```sql
-- Step 1: restore the full backup, but leave the door open
RESTORE DATABASE MyDatabase
FROM DISK = N'D:\Backup\MyDatabase_Full.bak'
WITH NORECOVERY;

-- Step 2: restore the differential on top, and finish
RESTORE DATABASE MyDatabase
FROM DISK = N'D:\Backup\MyDatabase_Diff.bak'
WITH RECOVERY;
```

Notice the pattern from Lesson 7 in action: every restore step except the last one uses
`WITH NORECOVERY`, and only the final step uses `WITH RECOVERY`. This is the general rule for
every multi-backup restore chain in this chapter, not just differentials — it applies identically
to the point-in-time restores in the next lesson, which are the same pattern extended with log
backups.

## Why the differential has to match the full underneath it

Every differential backup is tied to a specific full backup by an internal marker
(`differential_base_lsn`) — you can't restore a differential taken relative to Monday's full on
top of a restore of Tuesday's full. If you try, SQL Server rejects the restore with an error
rather than silently producing a corrupted database. This is a deliberate integrity check, not a
bug: it's the same category of protection `WITH REPLACE` provides in Lesson 7, just enforced
automatically instead of requiring an explicit flag.

```sql
-- Confirms which full backup a differential is based on, before restoring
RESTORE HEADERONLY FROM DISK = N'D:\Backup\MyDatabase_Diff.bak';
-- Check the DifferentialBaseLSN column against the full backup's CheckpointLSN
```

## Key terms

| Term | Meaning |
|---|---|
| Differential backup | Captures every data page changed since the last full backup |
| `differential_base_lsn` | Internal marker tying a differential to the specific full backup it's based on |
| Restore chain | An ordered sequence of RESTORE statements, NORECOVERY on all but the last |
| `RESTORE HEADERONLY` | Reports a backup's metadata, including which full backup a differential is based on |

## Check yourself

A DBA restores Monday's full backup `WITH NORECOVERY`, then tries to restore Wednesday's
differential on top of it — but Tuesday's full backup ran in between, and Wednesday's
differential was taken relative to *that* one. What happens, and why?
