# Script — Restore & Recovery Scenarios with RMAN

## Segment 1 (title)

SQL Server treats restoring a database as one combined action. RMAN separates two genuinely different operations: restore puts backup files back where they belong, and recover applies redo on top to bring the data current.

## Segment 2 (code: complete recovery)

RESTORE DATABASE copies datafiles back from the backup — at that point the database matches backup time, nothing more. RECOVER DATABASE then applies redo logs, replaying committed transactions since the backup. This is complete recovery, the normal case.

## Segment 3 (code: incomplete recovery)

Incomplete recovery stops on purpose, before a bad event like a dropped table. SET UNTIL TIME caps how far redo is replayed, and because you're opening the database in the past, Oracle requires OPEN RESETLOGS to start a new redo log incarnation.

## Segment 4 (steps: scoped recovery)

RMAN doesn't force an all-or-nothing restore — a single tablespace can be restored and recovered while the rest of the database stays online. And RESTORE DATABASE VALIDATE checks a backup is actually usable without restoring anything.

## Segment 5 (outro)

Next up: Oracle Flashback technology — a genuinely distinctive capability with no direct SQL Server equivalent, for rewinding queries, tables, or the whole database without a full restore.
