# Oracle Backup Fundamentals: Logical vs. Physical

SQL Server has one primary backup mechanism — `BACKUP DATABASE`, `BACKUP LOG`, all writing
physical `.bak` files understood by that one tool. Oracle splits backup into two genuinely
different disciplines with two different tools: **logical** backup with Data Pump, and
**physical** backup with RMAN. They solve different problems, and a real DBA needs both, not
one instead of the other.

## What you'll learn

- The real difference between a logical backup and a physical backup
- Which tool does which, and why they aren't interchangeable
- When each approach is the right call

## Physical backups copy the actual files that make up the database

A **physical backup** captures the operating-system-level files Oracle stores data in —
datafiles, control files, archived redo logs — at the block level. Oracle's tool for this is
**RMAN (Recovery Manager)**, covered in depth over the next several lessons:

```
RMAN> BACKUP DATABASE PLUS ARCHIVELOG;
```

A physical backup is a byte-for-byte (or block-for-block) copy of what's actually on disk. To
restore, you put those same files back and apply redo to bring them current — recovery that
can, in principle, bring the database back to any point in time covered by the archived redo
you retained. This is the backup strategy for disaster recovery of the *entire* database: the
server catches fire, the disk fails, someone drops the wrong tablespace — physical backup and
recovery is how you get the whole database back.

## Logical backups export data as SQL-describable objects, not files

A **logical backup** doesn't touch the underlying files at all — it reads data through the
database engine and writes out a description of the objects and their contents, using
**Data Pump** (`expdp`):

```
expdp hr/password DIRECTORY=dpump_dir DUMPFILE=hr_schema.dmp SCHEMAS=hr
```

The output is portable in a way a physical backup fundamentally isn't: a Data Pump dump file
can be imported into a *different* Oracle version, a different platform, or just the `HR`
schema by itself into an empty database — because it's a logical description of tables, rows,
indexes, and constraints, not a copy of specific datafiles that only make sense read back by
the exact database they came from.

## The two approaches solve different problems

| Question | Physical (RMAN) | Logical (Data Pump) |
|---|---|---|
| "The whole database needs to come back after a disaster" | Yes — this is its job | Not really — no redo, no true point-in-time recovery |
| "I need to move just the `HR` schema to a new environment" | No — RMAN restores whole datafiles/tablespaces | Yes — this is its job |
| "I need to restore to an exact point in time, mid-transaction" | Yes — restore + apply redo | No — Data Pump has no redo-based recovery |
| "I'm upgrading to a new Oracle version or moving to different hardware" | Painful — datafiles are version/platform-sensitive | Yes — dump files are portable |
| "I want a selective copy of a few tables for testing" | No — not RMAN's model | Yes — `TABLES=`, `QUERY=` filtering |

A backup and recovery strategy in a production Oracle environment realistically uses **both**:
RMAN for the disaster-recovery/point-in-time backbone, and Data Pump for migrations, schema
refreshes, and moving data where RMAN's whole-database model doesn't fit.

## Key terms

| Term | Meaning |
|---|---|
| Physical backup | Block-level copy of actual datafiles/control files/archived redo, via RMAN |
| Logical backup | Engine-read export of objects and data as a portable dump file, via Data Pump |
| RMAN | Recovery Manager — Oracle's physical backup and recovery tool |
| Data Pump | `expdp`/`impdp` — Oracle's logical export/import tool |
| Point-in-time recovery | Restoring physical files, then applying redo up to an exact moment — a physical-backup capability |
| Portability | A logical dump's ability to be imported into a different version/platform — a physical backup lacks this |

## Check yourself

A company is migrating one schema from an on-premises Oracle 19c database to a cloud-hosted
Oracle 21c database. Another team, separately, needs to be able to restore the entire
production database to exactly 2:47 PM yesterday after a bad batch job. Which tool handles
each requirement, and why would the other tool fail at it?
