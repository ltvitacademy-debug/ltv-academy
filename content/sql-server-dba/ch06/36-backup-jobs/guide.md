# Backup Jobs

## What you'll learn

- The real `BACKUP DATABASE` / `BACKUP LOG` syntax for full, differential, and log backups
- How to wrap that T-SQL into an Agent job step, and schedule the three types together
- A realistic weekly rotation and why the recovery model dictates what's possible

## The three backup types, in real T-SQL

```sql
-- Full backup
BACKUP DATABASE InventoryDB
    TO DISK = 'D:\Backups\InventoryDB_Full.bak'
    WITH INIT, COMPRESSION, CHECKSUM;

-- Differential backup (everything changed since the last full)
BACKUP DATABASE InventoryDB
    TO DISK = 'D:\Backups\InventoryDB_Diff.bak'
    WITH DIFFERENTIAL, INIT, COMPRESSION, CHECKSUM;

-- Transaction log backup (only valid in FULL or BULK_LOGGED recovery model)
BACKUP LOG InventoryDB
    TO DISK = 'D:\Backups\InventoryDB_Log.trn'
    WITH INIT, COMPRESSION, CHECKSUM;
```

`COMPRESSION` shrinks the backup file and is usually a net win on both time and disk (CPU cost
is real but rarely the bottleneck). `CHECKSUM` catches page-level corruption during the backup
itself — cheap insurance. `INIT` overwrites an existing backup set at that path rather than
appending; real jobs usually build a fresh, uniquely-named file per run instead of relying on
`INIT` to manage history.

Log backups only work in `FULL` or `BULK_LOGGED` recovery model — `SIMPLE` recovery truncates
the log automatically and has no log backup chain to speak of. Lesson 17 covered recovery models
in depth; this is where that choice has direct operational consequences.

## Wrapping it in an Agent job

A real backup job is a SQL Server Agent job with one T-SQL job step running the statement above,
scheduled independently per backup type:

- **Full backup** — weekly (e.g., Sunday night) or nightly, depending on database size and RPO
  requirements.
- **Differential backup** — nightly, on the days between full backups; each differential only
  captures change since the last full, so it stays small and fast relative to another full.
- **Transaction log backup** — every 15–30 minutes on any database in `FULL` recovery with a
  real RPO requirement; this is what actually limits how much data you can lose.

Each becomes its own Agent job with its own schedule (Chapter 7 covers job/schedule mechanics in
depth); a common pattern names them clearly — `Backup_InventoryDB_Full`,
`Backup_InventoryDB_Diff`, `Backup_InventoryDB_Log` — so on-call staff can tell at a glance what
ran and when.

## A realistic weekly rotation

| Day | Job |
|---|---|
| Sunday | Full |
| Mon–Sat | Differential (nightly) |
| Every 15–30 min, daily | Transaction log |

Restoring from this rotation means: last full, plus the most recent differential, plus every log
backup taken after that differential — in that order. Fewer backup files to apply than restoring
full-plus-every-log-since-Sunday, which is the entire point of differentials.

## Key terms

| Term | Meaning |
|---|---|
| `BACKUP DATABASE ... WITH DIFFERENTIAL` | Backs up only data changed since the last full backup |
| `BACKUP LOG` | Backs up the transaction log; only valid in FULL/BULK_LOGGED recovery |
| `CHECKSUM` | Backup option that detects page-level corruption during the backup |
| RPO (Recovery Point Objective) | How much data loss (measured in time) is acceptable; log backup frequency directly controls it |

## Check yourself

A database is in `SIMPLE` recovery model. Someone schedules a nightly `BACKUP LOG` job against
it anyway. What happens when that job runs, and why?
