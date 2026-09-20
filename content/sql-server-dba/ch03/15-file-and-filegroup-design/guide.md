# File & Filegroup Design

Lesson 14 got a database created with `CREATE DATABASE`. Every data file you specified there
landed somewhere, and that "somewhere" is a filegroup. Most databases never think about
filegroups beyond the default — and for small, simple databases that's fine. But once a
database gets large or has different I/O and backup needs across its tables, filegroup design
becomes one of the highest-leverage decisions a DBA makes.

## What you'll learn

- The difference between the primary filegroup and user-defined filegroups
- The three real file extensions SQL Server uses, and what actually lives in each
- Why production databases split data across multiple filegroups

## The primary filegroup isn't optional

Every database has exactly one **PRIMARY** filegroup, and it always contains the primary data
file (the `.mdf`). The primary filegroup also holds the system catalog — the metadata SQL
Server needs to find everything else in the database. Unless you explicitly say otherwise,
every table and index you create lands in the primary filegroup by default.

**User-defined filegroups** are groups of one or more secondary data files (`.ndf`) that you
create and name yourself. A filegroup is a *container*: SQL Server spreads a table's pages
across every file in whatever filegroup that table lives in, proportionally to free space —
so a filegroup with several files on several disks gets genuinely parallel I/O, not just
more disk space.

## Why bother splitting data across filegroups

Three real reasons drive this, beyond "more space":

- **Parallel I/O.** Files in the same filegroup, placed on separate physical disks, let SQL
  Server issue I/O to more than one spindle for the same table. This is a real throughput
  win on traditional disk, and still helps on SANs with genuinely separate underlying LUNs.
- **Piecemeal restore.** You can restore the primary filegroup first, bring the database
  online, and restore less-critical filegroups afterward — instead of one all-or-nothing
  restore of the whole database. A multi-terabyte database with a small "hot" filegroup and
  a huge "archive" filegroup can be back in service in minutes, with archive data still
  restoring in the background.
- **Isolating by usage.** Put rarely-changing historical data in its own filegroup, mark it
  `READ_ONLY`, and full backups can skip it most of the time — dramatically shrinking backup
  windows on large databases. This pairs naturally with partitioning tables by date range.

## Real syntax

```sql
CREATE DATABASE Sales
ON PRIMARY
    (NAME = Sales_Primary, FILENAME = 'D:\Data\Sales.mdf'),
FILEGROUP FG_Archive
    (NAME = Sales_Archive, FILENAME = 'D:\Data\Sales_Archive.ndf')
LOG ON
    (NAME = Sales_Log, FILENAME = 'L:\Log\Sales.ldf');

-- Adding a filegroup and file to an existing database
ALTER DATABASE Sales ADD FILEGROUP FG_Archive2;
ALTER DATABASE Sales ADD FILE
    (NAME = Sales_Archive2, FILENAME = 'D:\Data\Sales_Archive2.ndf')
    TO FILEGROUP FG_Archive2;

-- Changing which filegroup new objects land in by default
ALTER DATABASE Sales MODIFY FILEGROUP FG_Archive2 DEFAULT;
```

## Key terms

| Term | Meaning |
|---|---|
| Primary filegroup | The mandatory filegroup holding the primary data file and system catalog |
| User-defined filegroup | A named container of one or more secondary data files you create |
| .mdf | Primary data file extension |
| .ndf | Secondary data file extension (belongs to a user-defined filegroup) |
| .ldf | Transaction log file extension (log files never belong to a filegroup) |
| Piecemeal restore | Restoring filegroups individually so a database can come online before every filegroup is restored |

## Check yourself

A 2 TB database has ten years of order history, but only the last 90 days are ever updated.
How would filegroup design shrink both the nightly full backup window and disaster-recovery
time, and what filegroup option would you set on the historical data?
