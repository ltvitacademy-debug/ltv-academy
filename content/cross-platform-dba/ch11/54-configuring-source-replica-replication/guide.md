# Configuring Source-Replica Replication

The previous lesson covered how MySQL replication works underneath — the binlog, the
binlog dump thread, the I/O thread, and the SQL thread. This lesson configures it: turning
a standalone MySQL server and a fresh MySQL instance into a working source and replica,
using the current MySQL 8.0.23+ syntax throughout.

## What you'll learn

- How to prepare a source server so it's ready to be replicated from
- The current `CHANGE REPLICATION SOURCE TO` syntax, and why it replaced `CHANGE MASTER TO`
- Why MySQL replication is asynchronous by default, and how to confirm a replica is healthy

## Preparing the source

Before anything else, the source needs binary logging enabled and a unique server ID. In
`my.cnf` (or `my.ini` on Windows), that's:

```
[mysqld]
server_id = 1
log_bin = mysql-bin
binlog_format = ROW
gtid_mode = ON
enforce_gtid_consistency = ON
```

`server_id` must be unique across every server in the topology — source and every replica.
`log_bin` turns on binary logging and sets the log file base name; without it, there's
nothing for a replica to read. Modern deployments also enable `gtid_mode`, which assigns
every transaction a **Global Transaction Identifier** — a unique ID the replica can use to
track its position without tracking raw binlog file names and byte offsets by hand. GTID-
based replication is the current recommended default; file-position-based replication still
works and still appears in older environments, but GTID removes a whole category of manual
bookkeeping error.

The source also needs a MySQL account dedicated to replication, granted the
`REPLICATION SLAVE` privilege (the privilege name itself predates the source/replica
terminology change and hasn't been renamed):

```sql
CREATE USER 'repl'@'%' IDENTIFIED BY 'strong_password_here';
GRANT REPLICATION SLAVE ON *.* TO 'repl'@'%';
```

Finally, the replica needs a starting copy of the source's data — a physical backup (Percona
XtraBackup) or logical dump (`mysqldump`) taken with a consistent snapshot point recorded, so
replication knows where to start applying changes from.

## Pointing the replica at the source

Once the replica has that starting data loaded and its own unique `server_id` set, it's
told where to replicate from using `CHANGE REPLICATION SOURCE TO`. This statement is the
direct, MySQL 8.0.23+ replacement for the older `CHANGE MASTER TO` — same job, current name:

```sql
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST = 'source-server.internal',
  SOURCE_USER = 'repl',
  SOURCE_PASSWORD = 'strong_password_here',
  SOURCE_AUTO_POSITION = 1;
```

`SOURCE_AUTO_POSITION = 1` tells the replica to use GTID auto-positioning — it figures out
which transactions it's missing by comparing GTID sets with the source, rather than being
told an exact binlog file and position. On a non-GTID setup, the older-style coordinates are
still required instead: `SOURCE_LOG_FILE = 'mysql-bin.000004', SOURCE_LOG_POS = 154`. Every
`SOURCE_*` option here is itself a renamed counterpart of an older `MASTER_*` option
(`MASTER_HOST`, `MASTER_LOG_FILE`, and so on) — the same source/replica renaming from the
previous lesson, applied consistently across the configuration surface.

## Starting replication and confirming it's healthy

With the connection configured, replication starts with:

```sql
START REPLICA;
```

(`START SLAVE` still works as a deprecated alias in current MySQL, the same way `CHANGE
MASTER TO` does — but `START REPLICA` is the current form.) To check that it's actually
working, run `SHOW REPLICA STATUS\G` and look at two fields in particular: `Replica_IO_Running`
and `Replica_SQL_Running` should both read `Yes`. If either reads `No`, the surrounding
`Last_IO_Error` or `Last_SQL_Error` fields explain why — a wrong password and a duplicate-key
conflict from data that already existed on the replica are two of the most common causes.

By default, this entire relationship is **asynchronous**: the source commits a transaction
and returns to the client without waiting for any replica to acknowledge it. That's what
makes traditional replication fast and low-overhead, and it's also exactly why replicas can
lag — nothing forces the source to wait. MySQL also offers a **semisynchronous** replication
plugin (`rpl_semi_sync_source_enabled` / `rpl_semi_sync_replica_enabled`) that makes the
source wait for at least one replica to acknowledge receipt of a transaction before
returning — a middle ground between fully asynchronous and the stronger guarantees Group
Replication provides, which the next lesson covers.

## Key terms

| Term | Meaning |
|---|---|
| `server_id` | Unique numeric ID every server in a replication topology must have |
| GTID | Global Transaction Identifier — a unique ID per transaction, used for auto-positioning |
| `CHANGE REPLICATION SOURCE TO` | Current MySQL 8.0.23+ statement configuring a replica's source connection (replaces `CHANGE MASTER TO`) |
| `SOURCE_AUTO_POSITION` | Option telling the replica to use GTID-based auto-positioning instead of manual log coordinates |
| `START REPLICA` | Current statement starting the I/O and SQL threads on a replica (replaces `START SLAVE`) |
| `SHOW REPLICA STATUS` | Command reporting a replica's connection state, running threads, and any errors |
| Asynchronous replication | MySQL's default mode — the source doesn't wait for any replica to acknowledge a transaction |
| Semisynchronous replication | Optional plugin-based mode where the source waits for at least one replica to acknowledge |

## Check yourself

You run `SHOW REPLICA STATUS\G` on a newly configured replica and see
`Replica_IO_Running: Yes` but `Replica_SQL_Running: No`. Which thread is the problem in, and
which status field would you check next to find out why?
