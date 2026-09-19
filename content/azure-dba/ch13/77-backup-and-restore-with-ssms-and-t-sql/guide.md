# Lesson 77 — Backup & Restore with SSMS and T-SQL

**Chapter 13 · Backup & Restore · Lesson 77 of 95**

## What you'll learn

- The real `BACKUP DATABASE` and `RESTORE DATABASE` T-SQL syntax, for full, differential, and log backups
- The SSMS GUI equivalents, and which dialog maps to which T-SQL statement
- `WITH NORECOVERY` versus `WITH RECOVERY` — the setting that decides whether you can restore another backup on top
- Why this lesson applies to on-prem and VM-hosted SQL Server, not Azure SQL Database

## Where this applies

Everything in this lesson is real, working T-SQL — but it only applies to
SQL Server where **you** manage storage: on-prem instances and SQL Server
running inside an Azure VM (IaaS). Azure SQL Database (PaaS) does not
expose `BACKUP DATABASE` or `RESTORE DATABASE` to you at all — Microsoft
runs backups on its own schedule, which is the entire subject of the next
lesson. This lesson is the one where a DBA is genuinely holding the wheel.

## Full, differential, and log backups in T-SQL

```sql
-- Full backup
BACKUP DATABASE Sales
TO DISK = 'D:\Backups\Sales_Full.bak'
WITH INIT, COMPRESSION;

-- Differential backup (everything changed since the last full)
BACKUP DATABASE Sales
TO DISK = 'D:\Backups\Sales_Diff.bak'
WITH DIFFERENTIAL, COMPRESSION;

-- Transaction log backup
BACKUP LOG Sales
TO DISK = 'D:\Backups\Sales_Log1.trn'
WITH COMPRESSION;
```

`WITH INIT` overwrites an existing backup file rather than appending to it.
`WITH COMPRESSION` is almost always worth using — smaller files, faster
backups, and it's been standard since SQL Server 2008 R2. Note the
`DIFFERENTIAL` keyword is what turns a `BACKUP DATABASE` statement into a
differential rather than a second full backup — leave it off by mistake and
you've just taken another full backup, not a small incremental one.

## Restoring: NORECOVERY is the keyword that matters

```sql
-- Step 1: restore the full backup, leave the database ready for more
RESTORE DATABASE Sales
FROM DISK = 'D:\Backups\Sales_Full.bak'
WITH NORECOVERY;

-- Step 2: apply the differential, still leave it open for more
RESTORE DATABASE Sales
FROM DISK = 'D:\Backups\Sales_Diff.bak'
WITH NORECOVERY;

-- Step 3: apply each log backup in order, still NORECOVERY...
RESTORE LOG Sales
FROM DISK = 'D:\Backups\Sales_Log1.trn'
WITH NORECOVERY;

-- Step 4: the FINAL restore in the chain uses RECOVERY (or defaults to it)
RESTORE LOG Sales
FROM DISK = 'D:\Backups\Sales_Log2.trn'
WITH RECOVERY;
```

`WITH NORECOVERY` tells SQL Server "more backups are coming — keep the
database in a restoring state, don't bring it online yet." `WITH RECOVERY`
(the default if you omit the clause) rolls back any uncommitted
transactions and brings the database online for use. Use `NORECOVERY` on
every restore step except the very last one in the chain — recover too
early, and the database comes online but you can no longer apply the
remaining backups on top of it.

## The SSMS GUI equivalents

| T-SQL | SSMS path |
|---|---|
| `BACKUP DATABASE ... WITH DIFFERENTIAL` | Right-click database → Tasks → Back Up... → Backup type: Differential |
| `RESTORE DATABASE ... WITH NORECOVERY` | Right-click Databases → Restore → Database, tick each backup in the chain, Options tab → "Restore with NORECOVERY" |
| Viewing the backup/restore chain | Restore Database dialog's timeline view — shows every full/diff/log available and picks a valid chain automatically |

The SSMS dialog is genuinely useful for one thing the raw T-SQL doesn't
give you for free: it reads backup history from `msdb` and proposes a
correct restore chain for you, including a point-in-time slider for log
backups. Many DBAs use the GUI to build the plan, then script it out (the
dialog has a "Script" button) to run as verified T-SQL — the best of both.

## Key terms

| Term | Meaning |
|---|---|
| `WITH DIFFERENTIAL` | The clause that makes a `BACKUP DATABASE` statement differential instead of full |
| `WITH NORECOVERY` | Keeps the database in a restoring state so more backups can be applied on top |
| `WITH RECOVERY` | Rolls back uncommitted transactions and brings the database online (default) |
| `msdb` | The system database SSMS reads backup history from to propose a restore chain |

## Check yourself

You're ready for Lesson 78 when you can explain, without looking: what
does `WITH NORECOVERY` actually do, and why must every restore step in a
chain use it except the last one?
