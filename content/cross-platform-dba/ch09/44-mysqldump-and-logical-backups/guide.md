# mysqldump & Logical Backups

`mysqldump` is the tool every MySQL DBA meets first, and it's worth learning its real
syntax and flags properly rather than copy-pasting a command you don't understand. The
single most important flag for a working DBA to internalize is `--single-transaction`,
because it's the difference between a backup that's actually consistent and one that
silently isn't.

## What you'll learn

- Real `mysqldump` syntax for backing up one database, several, or the whole server
- Why `--single-transaction` matters for InnoDB consistency without locking the database
- How to restore a `mysqldump` backup, and where its limits are

## Basic mysqldump syntax

The simplest invocation backs up one database to a SQL file:

```
mysqldump -u root -p mydatabase > mydatabase_backup.sql
```

This connects as `root`, prompts for a password (`-p`), and writes the dump — DDL to
recreate every table, then INSERT statements for every row — to standard output, redirected
into a file. To back up every database on the server, including `mysql`, `information_schema`
metadata considerations, and any user databases:

```
mysqldump -u root -p --all-databases > full_backup.sql
```

To back up a specific list of databases instead of everything:

```
mysqldump -u root -p --databases db1 db2 db3 > selected_backup.sql
```

Note the difference from a single-database dump: `--databases` (plural, with named
databases) includes the `CREATE DATABASE` statements needed to recreate each one, which a
single unnamed database dump does not.

## The critical flag: --single-transaction

Here's the problem `--single-transaction` solves. `mysqldump` walks through the database
table by table, exporting rows as it goes. If other transactions are writing to the
database while the dump runs, and `mysqldump` isn't given any consistency mechanism, the
resulting dump can be internally inconsistent — some tables reflecting data as of 10:00:00,
others as of 10:00:05, with data that never existed together at any single point in time.

For InnoDB tables, `--single-transaction` fixes this cleanly by starting the whole dump
inside a single transaction with a consistent snapshot (MVCC-based, similar in spirit to
how a SQL Server DBA thinks about read consistency, though the underlying mechanism is
MySQL/InnoDB's own). Critically, it does this **without taking table locks**, so
read/write traffic against the database continues normally during the backup:

```
mysqldump -u root -p --single-transaction --all-databases > full_backup.sql
```

This flag only helps InnoDB (and other transactional/MVCC-capable engines). It does not
help MyISAM tables, which have no transaction support — those still need locking to be
consistent, which is one more reason InnoDB is the default storage engine for good reason.

## Restoring, and where mysqldump's limits are

Restoring is just replaying the SQL file against a live server:

```
mysql -u root -p < full_backup.sql
```

There's no separate "restore" command — it's literally feeding the dump file back through
the `mysql` client. This is a meaningful mental shift from `RESTORE DATABASE` as a discrete
operation. The limits worth knowing: restore time scales with data volume since every row
re-inserts and every index rebuilds, and a `mysqldump`-based restore gives you the state at
the moment the dump completed — nothing between then and a failure — unless paired with
binary logs for point-in-time recovery, which a later lesson covers.

## Key terms

| Term | Meaning |
|---|---|
| `--single-transaction` | Runs the dump inside one consistent InnoDB snapshot transaction, without locking tables |
| `--all-databases` | Dumps every database on the server, including `CREATE DATABASE` statements |
| `--databases db1 db2` | Dumps a named list of databases, including their `CREATE DATABASE` statements |
| MVCC | Multi-Version Concurrency Control — InnoDB's mechanism for consistent reads without blocking writers |

## Check yourself

Why would running `mysqldump --all-databases` without `--single-transaction` against a busy
production InnoDB server be risky, and what specifically could go wrong in the resulting
backup file?
