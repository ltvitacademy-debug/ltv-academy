# Script — mysqldump & Logical Backups

## Segment 1 (title)

mysqldump is the tool every MySQL DBA meets first. The single most important flag to internalize is --single-transaction, because it's the difference between a backup that's actually consistent and one that silently isn't.

## Segment 2 (code: basic syntax)

The simplest invocation backs up one database to a SQL file, connecting as root and prompting for a password. To back up every database on the server, use --all-databases; to back up a named list, use --databases, which also includes the CREATE DATABASE statements.

## Segment 3 (code: the critical flag)

If other transactions write to the database while mysqldump runs unprotected, the resulting dump can be internally inconsistent — different tables reflecting different moments in time. --single-transaction fixes this for InnoDB by starting the whole dump inside one consistent snapshot, without taking table locks.

## Segment 4 (code: restoring)

Restoring is just replaying the SQL file against a live server with the mysql client — there's no separate restore command. Restore time scales with data volume since every row re-inserts and every index rebuilds from scratch.

## Segment 5 (outro)

That single-transaction consistency and no-locking behavior work well for InnoDB, but mysqldump restore time still doesn't scale to very large databases. Next up: Percona XtraBackup, the industry-standard physical backup tool for exactly that case.
