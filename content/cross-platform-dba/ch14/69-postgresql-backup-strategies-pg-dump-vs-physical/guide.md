# PostgreSQL Backup Strategies: pg_dump vs. Physical Backups

PostgreSQL splits backup into the same two families you already know from SQL Server —
logical and physical — but the tools and tradeoffs are genuinely PostgreSQL's own. Before
touching `pg_dump` syntax or `pg_basebackup` flags in the next lessons, you need to know
which family solves which problem.

## What you'll learn

- The real distinction between logical and physical backups in PostgreSQL
- Which tools belong to each family
- When each approach is the right call

## Logical backups: SQL you can read and replay anywhere

A logical backup captures the *objects and data* as a sequence of SQL statements (or an
archive format that reconstructs them) — `CREATE TABLE`, `INSERT`, `CREATE INDEX`, and so
on. `pg_dump` produces a logical backup of a single database; `pg_dumpall` adds the
cluster-wide objects that live outside any one database. Because a logical backup is just
SQL (or a portable archive of it), you can restore it into a different PostgreSQL version,
a different operating system, or even just a single table or schema out of the whole
database. The cost is time: a logical dump and restore walks through every object and
row, which gets slow on a large database, and applying indexes and constraints after a
bulk `INSERT` restore is CPU-intensive.

## Physical backups: the actual data files

A physical backup copies the underlying data files that make up the PostgreSQL cluster —
the same files `postgresql.conf` points the server at on disk. `pg_basebackup` is the
standard tool: it uses the streaming replication protocol to pull a consistent copy of the
whole data directory from a running server. A filesystem-level copy (a storage snapshot,
or `rsync` while following PostgreSQL's documented start/stop-backup procedure) is the
other physical option. Physical backups restore fast because there's no SQL to replay —
you put the files back and start the server — but the backup and the server it restores to
must be the same PostgreSQL major version and the same OS architecture. A physical backup
also can't restore "just one table"; it's the whole cluster or nothing without extra
tooling.

## Choosing between them

Reach for a logical backup (`pg_dump`/`pg_dumpall`) when you need portability — moving data
to a new server, a different PostgreSQL version, or into a data warehouse — or when you
only need part of the database. Reach for a physical backup (`pg_basebackup` or
filesystem-level) when the database is large, when restore speed matters most, or when
you're building the foundation for point-in-time recovery or a streaming replica, both of
which lessons ahead in this chapter and the next build directly on a physical base backup.
Production PostgreSQL environments commonly run both: logical dumps for portability and
selective restores, physical base backups plus WAL archiving for fast, complete disaster
recovery.

## Key terms

| Term | Meaning |
|---|---|
| Logical backup | SQL-statement-level backup of database objects and data (`pg_dump`, `pg_dumpall`) |
| Physical backup | File-level copy of the PostgreSQL data directory (`pg_basebackup`, filesystem copy) |
| Cluster | A single running PostgreSQL server instance, which can host multiple databases |
| Streaming replication protocol | The wire protocol `pg_basebackup` and replicas use to pull data from a running server |

## Check yourself

You need to restore a single 40-row lookup table that got truncated by accident, and
separately, you need to be able to fully recover a 2 TB production database as fast as
possible after a disk failure. Which backup family fits each situation, and why?
