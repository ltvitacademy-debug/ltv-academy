# Script — PostgreSQL Backup Strategies: pg_dump vs. Physical Backups

## Segment 1 (title)

PostgreSQL splits backup into logical and physical, the same two families you already know
from SQL Server, but with PostgreSQL's own tools and tradeoffs. Before you touch syntax,
you need to know which family solves which problem.

## Segment 2 (code: two families, two tools)

Logical backups, from pg_dump and pg_dumpall, capture objects and data as SQL statements or
a portable archive of them. Physical backups, from pg_basebackup or a filesystem-level copy,
copy the actual data files the server reads from disk.

## Segment 3 (steps: when each applies)

Logical backups win on portability — a different PostgreSQL version, a different OS, or just
one table restored out of the whole database. Physical backups win on speed and
completeness, and they're the foundation point-in-time recovery and replication build on.

## Segment 4 (outro)

Production environments commonly run both: logical dumps for flexibility, physical base
backups plus WAL archiving for fast disaster recovery. Next up: the real pg_dump and
pg_dumpall syntax and formats.
