# RESTORE Fundamentals

`BACKUP DATABASE` and `BACKUP LOG` only matter if you can get the data back. `RESTORE DATABASE`
is the statement that does it — and the single option that trips up more DBAs than any other
is whether to bring the database back online immediately or leave it waiting for more backups
to apply. Get `NORECOVERY` and `RECOVERY` backwards and you either lock yourself out of restoring
a differential and log chain, or you bring a half-restored database online by mistake.

## What you'll learn

- The basic `RESTORE DATABASE ... FROM DISK` syntax
- `WITH NORECOVERY` vs `WITH RECOVERY`, and why the difference matters
- Relocating data/log files to different drives with `WITH MOVE`

## Restoring a full backup

```sql
RESTORE DATABASE AdventureWorks2012
FROM DISK = 'D:\Backups\AdventureWorks2012_Full.bak'
WITH NORECOVERY;
```

This reads the full backup file and writes its pages back into the database's data and log
files. On its own, this is the first step of a restore sequence — the database is not yet
usable. It sits in a `RESTORING` state, waiting for you to either apply more backups (a
differential, then log backups) or explicitly bring it online.

## NORECOVERY vs. RECOVERY

- **`WITH NORECOVERY`** leaves the database in the `RESTORING` state. SQL Server has not yet
  rolled back uncommitted transactions from the backup, because it's still expecting more
  backups (differentials or log files) to be restored on top. Use this on every restore step
  except the last one.
- **`WITH RECOVERY`** (the default if you omit the clause) rolls back any uncommitted
  transactions and brings the database online, ready for use. Once a database has been
  recovered, you cannot restore any more differential or log backups on top of it without
  starting the whole sequence over from the full backup.

```sql
-- Last step of a restore sequence — bring the database online
RESTORE DATABASE AdventureWorks2012
FROM DISK = 'D:\Backups\AdventureWorks2012_Log.trn'
WITH RECOVERY;
```

The rule of thumb: every restore step in a multi-file sequence uses `NORECOVERY` except the
very last one, which uses `RECOVERY`.

## Relocating files with MOVE

Restoring to a different server — or a different drive on the same server — usually means the
original file paths from the backup don't exist on the target. Before restoring, check what
logical and physical file names the backup actually contains:

```sql
RESTORE FILELISTONLY
FROM DISK = 'D:\Backups\AdventureWorks2012_Full.bak';
```

This returns one row per file, including `LogicalName` and `PhysicalName` — the names you need
for `MOVE`:

```sql
RESTORE DATABASE AdventureWorks2012
FROM DISK = 'D:\Backups\AdventureWorks2012_Full.bak'
WITH MOVE 'AdventureWorks2012_Data' TO 'E:\Data\AdventureWorks2012.mdf',
     MOVE 'AdventureWorks2012_Log' TO 'F:\Logs\AdventureWorks2012_log.ldf',
     RECOVERY;
```

Without `MOVE`, SQL Server tries to write the restored files back to the exact paths recorded
in the backup — if `E:\Data` doesn't exist on the target server, the restore fails outright.

## Key terms

| Term | Meaning |
|---|---|
| `RESTORE DATABASE` | The statement that applies a backup file's pages back into a database |
| `NORECOVERY` | Leaves the database in `RESTORING` state so more backups can be applied on top |
| `RECOVERY` | Rolls back uncommitted transactions and brings the database online; ends the restore sequence |
| `RESTORE FILELISTONLY` | Reads a backup file's header to list its logical/physical file names, without restoring anything |
| `MOVE` | A `RESTORE` clause that relocates a file to a different physical path than the one recorded in the backup |

## Check yourself

You're restoring a full backup followed by a differential backup. Which option — `NORECOVERY`
or `RECOVERY` — belongs on the full backup restore, and which belongs on the differential?
