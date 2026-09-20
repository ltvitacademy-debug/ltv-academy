# MySQL Backup Strategies: Logical vs. Physical

Every SQL Server DBA already believes an untested backup isn't a real backup. That belief
transfers unchanged to MySQL. What doesn't transfer is a single, unified backup command
suite like `BACKUP DATABASE`. MySQL backup thinking starts from a fork in the road: logical
backups versus physical backups. Choosing wrong for the size of database you're protecting
is one of the most common real-world MySQL DBA mistakes.

## What you'll learn

- The real difference between a logical backup and a physical backup in MySQL
- Why `mysqldump` (logical) and file-level/XtraBackup (physical) solve different problems
- How to decide which approach fits a given database's size and recovery requirements

## Logical backups: SQL statements that rebuild your data

A logical backup is a dump of the *logical structure and content* of your databases —
`CREATE TABLE` statements, `INSERT` statements, and the DDL needed to recreate every object —
written out as portable SQL text (or a portable format like CSV). MySQL's built-in tool for
this is `mysqldump`. Restoring a logical backup means replaying that SQL against a running
MySQL server, which rebuilds every table and reinserts every row from scratch.

This is conceptually similar to scripting out a SQL Server database's schema and data as
INSERT statements, except MySQL's `mysqldump` does it natively and it's the default,
built-in path everyone starts with. Logical backups are portable across MySQL versions,
storage engines, and even operating systems — a dump taken on Linux restores cleanly on
Windows. That portability is the entire point of a logical backup.

## Physical backups: copying the actual data files

A physical backup instead copies the raw files MySQL stores data in on disk — the InnoDB
tablespace files, log files, and so on — either by copying files directly (with the server
stopped, or using a snapshot) or with a specialized hot-backup tool. Restoring a physical
backup means putting those files back in place and starting MySQL against them; there's no
SQL replay, no rebuilding indexes from scratch, no re-executing millions of INSERT
statements.

This is the same fundamental distinction SQL Server DBAs already know from thinking about
detach/attach or file-level copies versus a logical export — except MySQL, unlike SQL
Server, has no single built-in tool that does hot, consistent physical backups well at
scale. That gap is exactly why a third-party tool becomes essential, which the next lesson
covers.

## Choosing between them: it's almost entirely about size and speed

For a small-to-medium database, `mysqldump` is simple, human-readable, and portable — a
completely reasonable default. But `mysqldump` reconstructs data by re-running SQL, so
restore time scales with data volume, and a full dump-and-restore cycle on a large,
high-write production database can take hours. A physical backup restores by putting files
back, which is dramatically faster for large databases — this is the same reason a SQL
Server DBA reaches for a file-based restore over a logical export once a database crosses
from "medium" into "large."

The real-world rule of thumb: logical backups for smaller databases, migrations between
versions/platforms, and human-readable point-in-time snapshots of a few tables; physical
backups once database size or restore-time requirements make replaying SQL impractical.

## Key terms

| Term | Meaning |
|---|---|
| Logical backup | A backup stored as SQL/DDL statements and data, restored by re-executing them (e.g., `mysqldump`) |
| Physical backup | A backup of the actual database files on disk, restored by placing files back and starting the server |
| Restore time | How long it takes to bring a backup back into a running, usable state — the key factor separating the two approaches at scale |
| Portability | A logical backup's ability to restore across different MySQL versions, engines, or operating systems |

## Check yourself

A 15 GB MySQL database needs a nightly backup with restores that must complete in under 20
minutes during an outage. Which backup strategy fits better, and why does the other one
struggle to meet that restore-time requirement?
