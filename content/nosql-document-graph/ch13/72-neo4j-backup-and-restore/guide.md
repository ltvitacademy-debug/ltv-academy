# Neo4j Backup & Restore

Every DBA in this catalog has had to answer the same question for whatever engine they're
running: if this database disappears right now, how do I get it back, and how much data can
I afford to lose? SQL Server answers that with full/differential/log backups and a recovery
model. Neo4j answers it with `neo4j-admin database backup` and `neo4j-admin database restore`
— and, just like Neo4j's role-based access control, the real capability you get depends
heavily on which edition you're running.

## What you'll learn

- The real command-line tools Neo4j uses for backup and restore
- The difference between an online backup and an offline backup, and why that split exists
- What edition each approach actually requires
- How to restore a database from a backup set

## Offline backup: available everywhere, but the database has to stop

The simplest, most universal way to protect a Neo4j database works in every edition,
including Community: stop the database, copy its files, start it back up. Because Neo4j
stores each database as a set of files on disk (much like a SQL Server `.mdf`/`.ldf` pair,
just structured differently), a clean file-system copy taken while the database is offline is
a perfectly valid backup.

```
neo4j-admin server stop

-- copy the data directory, e.g.:
-- cp -r /var/lib/neo4j/data/databases/neo4j /backup/neo4j-2026-09-20

neo4j-admin server start
```

This is conceptually identical to stopping a SQL Server instance and copying the `.mdf`/`.ldf`
files directly — reliable, simple, and completely unavailable to you if the business can't
tolerate the downtime. For a small internal graph that's queried during business hours only,
that tradeoff is often fine. For a production system backing a live application, it usually
isn't.

## Online backup: the real Enterprise Edition capability

`neo4j-admin database backup` takes a **consistent backup of a running database, with no
downtime** — the equivalent instinct to a SQL Server full backup you can run while the
database stays online and serving queries. This is where the licensing line actually falls:
**online, non-disruptive backup is an Enterprise Edition feature.** Community Edition cannot
take a backup while the database is running; only the stop-copy-start pattern above is
available to it.

```
neo4j-admin database backup neo4j \
  --to-path=/backups/neo4j-online \
  --from=neo4j-01:6362
```

The `--from` flag targets the backup listen address of a running Neo4j instance (the backup
protocol runs on its own port, separate from the Bolt port applications connect through).
Running this against a live production database produces a valid, restorable backup set
without ever taking the database offline — the same value proposition as SQL Server's online
backup capability, just gated behind a different edition boundary than SQL Server draws.

## Restoring from a backup set

Restore uses the matching command, `neo4j-admin database restore`, and — like a SQL Server
restore — it targets a stopped instance:

```
neo4j-admin server stop

neo4j-admin database restore neo4j \
  --from-path=/backups/neo4j-online \
  --overwrite-destination=true

neo4j-admin server start
```

`--overwrite-destination=true` is the explicit, deliberate flag that tells Neo4j it's fine to
replace whatever database files already exist at the target — the same instinct as `WITH
REPLACE` on a SQL Server `RESTORE DATABASE` statement, a safeguard against silently clobbering
a live database by accident.

## Incremental backups and a real operational pattern

Enterprise Edition also supports incremental backups: after an initial full backup, later
`neo4j-admin database backup` runs against the same target path only capture the changes since
the last backup, rather than a full copy every time — the same efficiency argument behind SQL
Server's differential backups sitting between full backups. A realistic production pattern is
a full online backup on a schedule (nightly, say) with incrementals in between, copied off to
separate storage the same way you'd never leave SQL Server backups sitting only on the
database server's own disk.

## Key terms

| Term | Meaning |
|---|---|
| Offline backup | Stopping the database and copying its files directly; available in every edition |
| Online backup | `neo4j-admin database backup` against a running instance with no downtime; Enterprise Edition only |
| Backup listen address | The dedicated port (separate from Bolt) a running instance exposes for backup traffic |
| `--overwrite-destination` | Explicit flag required to restore over existing database files at the target path |

## Check yourself

A client on Neo4j Community Edition asks you to set up nightly backups that never require
taking the production database offline. What do you tell them, and what's their real option
given the edition they're on?
