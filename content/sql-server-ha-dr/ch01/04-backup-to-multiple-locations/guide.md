# Backup to Multiple Locations

A backup strategy can be perfectly designed — the right full/differential/log cadence,
compressed, encrypted — and still fail at the one moment it matters, if every copy of it
lives on the same disk as the database it's protecting. This lesson is about where backups
physically land, and the real T-SQL syntax for writing to more than one place.

## What you'll learn

- The real difference between a **striped** backup and a **mirrored** backup — they are not
  the same thing, despite looking similar in syntax
- The `MIRROR TO` clause and its Enterprise Edition requirement
- Local disk versus network share as a backup destination, and what each protects against
- Why a backup on the same disk as the database protects against nothing if that disk fails

## Striping: splitting one backup across multiple files

Listing more than one `DISK =` target in a single `BACKUP` statement doesn't create two
independent copies — it **stripes** the backup, splitting it across all the listed files:

```sql
BACKUP DATABASE Sales
TO DISK = N'D:\Backup\Sales_1.bak',
   DISK = N'E:\Backup\Sales_2.bak'
WITH STATS = 10;
```

This is useful for spreading I/O across multiple drives to speed up a large backup — but
it's not redundancy. **All** files in the striped set are required to restore; losing any
one of them makes the entire backup set unusable. Striping solves a performance problem, not
a durability problem.

## Mirroring: real redundant copies, via `MIRROR TO`

True redundancy — complete, independent, identical copies of the backup — uses the
`MIRROR TO` clause, an Enterprise Edition feature:

```sql
BACKUP DATABASE Sales
TO DISK = N'D:\Backup\Sales_Full.bak'
MIRROR TO DISK = N'\\BackupServer\Share\Sales_Full.bak'
WITH FORMAT;
```

Each mirror set must contain the same number of devices as the primary backup set — one
primary device mirrors to exactly one mirror device. Unlike striping, losing one copy still
leaves a complete, restorable backup in the other location.

## Local disk versus network share

Where the backup lands matters as much as how many copies exist:

- **Local disk** is fast to write to and simple to configure, but it shares every failure
  mode of the server it's on — a failed RAID controller, a corrupted volume, or a stolen or
  destroyed physical server takes the database *and* its local backups together.
- **A network share** (`\\BackupServer\Share\...`) survives the loss of the database server
  itself, at the cost of network latency during the backup and a dependency on that share's
  own availability, permissions, and capacity.

## Why "same disk" is not a backup strategy

The reasoning here is simple and unforgiving: a backup's entire purpose is to survive a
failure of the thing it's backing up. A backup file sitting on the same physical disk as the
database's data and log files protects against a huge range of *logical* problems — a bad
`UPDATE`, an accidental `DROP TABLE`, application-level corruption — but it protects against
**zero** physical failures of that disk. If the disk fails, dies, or is stolen, the backup
and the database it was protecting are gone in the same instant.

A real strategy always gets at least one copy off the disk holding the live database —
ideally off the server entirely, whether that's a network share, a separate storage array,
or an offsite/cloud target.

## Key terms

| Term | Meaning |
|---|---|
| Striped backup | A single backup split across multiple files for I/O performance — all files required to restore, no redundancy |
| Mirrored backup (`MIRROR TO`) | Complete, independent, redundant copies of a backup — Enterprise Edition only |
| Network share | A remote backup destination that survives the loss of the database server itself |
| Same-disk backup | A backup stored on the same physical disk as the database — protects against logical errors only, not disk failure |

## Check yourself

A DBA runs `BACKUP DATABASE Sales TO DISK = 'D:\Backup\Sales_1.bak', DISK = 'E:\Backup\Sales_2.bak'`
and later loses the E: drive entirely. Can they still restore from `Sales_1.bak` alone? Why
or why not — and what backup option would have prevented this exposure?
