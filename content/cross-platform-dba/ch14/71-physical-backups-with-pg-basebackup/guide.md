# Physical Backups with pg_basebackup

`pg_basebackup` is PostgreSQL's built-in tool for taking a full physical backup of a
running cluster. It doesn't read the data through SQL the way `pg_dump` does — it pulls the
actual data files over the same protocol a streaming replica uses to catch up to its
primary.

## What you'll learn

- What pg_basebackup actually does and the protocol it uses
- The key flags that shape the backup it produces
- Why a base backup alone isn't a complete recovery story

## The streaming replication protocol, borrowed for backup

PostgreSQL's streaming replication protocol exists so a replica server can connect to a
primary and receive a continuous stream of changes. `pg_basebackup` connects to the primary
over that same protocol, but instead of staying connected forever like a replica, it asks
for a one-time consistent copy of the entire data directory, then disconnects. Because it
rides the replication protocol, `pg_basebackup` requires a replication-privileged
connection — a role with the `REPLICATION` attribute, and `pg_hba.conf` entries that permit
a replication connection — the same prerequisites streaming replication itself needs, which
this course covers again in Chapter 16.

## Running pg_basebackup

```
pg_basebackup -D /var/lib/postgresql/backup -Ft -z -P -U replicator -h primary_host
```

- `-D` — the target directory for the backup.
- `-Ft` — tar format (compressed with `-z`); the default, `-Fp`, writes a plain copy of the
  data directory instead.
- `-P` — show progress while the backup runs.
- `-X stream` (the default in modern PostgreSQL) — stream the WAL generated during the
  backup alongside it, so the backup is self-contained and consistent even if the backup
  takes a while to complete. `-X fetch` instead fetches the needed WAL only at the end.
- `-R` — write a `standby.signal` file and the primary connection info into the target
  directory, so the backup is immediately ready to start as a streaming replica.

## A base backup by itself is a snapshot, not a recovery plan

A `pg_basebackup` output is consistent as of the moment it finished, but on its own it only
restores you to that exact point in time. Restoring it and starting PostgreSQL brings the
database back to "when the backup was taken" — nothing more recent. To recover to *any*
point after the backup, including the moment right before a mistake happened, you combine
this physical base backup with WAL archiving, which the next lesson covers. That
combination — periodic base backups plus continuous WAL archiving — is what makes
point-in-time recovery possible.

## Key terms

| Term | Meaning |
|---|---|
| pg_basebackup | Utility that takes a full physical backup of a running cluster over the replication protocol |
| Streaming replication protocol | The wire protocol replicas (and pg_basebackup) use to pull data from a primary server |
| REPLICATION attribute | The role privilege required to open a replication connection |
| -X stream | pg_basebackup option that streams WAL alongside the backup so it's self-contained |

## Check yourself

Why does pg_basebackup need a role with the REPLICATION attribute rather than just a normal
read-privileged login, and what does restoring a base backup alone actually give you —
versus what it doesn't?
