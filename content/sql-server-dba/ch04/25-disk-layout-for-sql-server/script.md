# Script — Disk Layout for SQL Server

## Segment 1 (title)

This closes out the storage chapter by putting separate I/O patterns, tempdb's needs, growth strategy, and RAID tradeoffs into one concrete recommendation: an actual drive map.

## Segment 2 (code: the recommended layout)

OS and binaries on their own drive, data files on one or more drives for random I/O and parallelism, the transaction log on its own drive for uninterrupted sequential writes, tempdb ideally on the fastest storage available, and backups on a drive that never shares physical disks with the data it protects.

## Segment 3 (steps: two reasons, not one)

Every separation in that layout earns its place twice over. Performance, because data, log, and tempdb I/O patterns interfere with each other on a shared disk. And recoverability, because if backups share a disk with the data, one disk failure destroys both the database and its only copy.

## Segment 4 (outro)

That's the full chapter on storage and files. Next up: Lesson 26, Authentication Modes — Chapter 5 begins with SQL Server security fundamentals.
