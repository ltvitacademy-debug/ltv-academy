# Script — pg_dump, pg_dumpall & Logical Backups

## Segment 1 (title)

The last lesson drew the line between logical and physical backups. This lesson puts real
pg_dump and pg_dumpall syntax in your hands — the formats, the flags that matter, and how to
restore each one.

## Segment 2 (code: pg_dump formats)

pg_dump backs up one database, and the format flag decides what you get. Plain format is a
readable SQL script restored with psql. Custom format is a compressed archive restored with
pg_restore, and it's the production default because it supports parallel and selective
restore.

## Segment 3 (code: pg_dumpall for cluster-wide objects)

pg_dump never touches roles or tablespaces, because those live outside any one database.
pg_dumpall fills that gap — run with globals-only, it captures exactly the cluster-wide
setup a full restore needs before you restore individual databases.

## Segment 4 (outro)

A complete disaster-recovery restore is: recreate the cluster, restore globals, then restore
each database. Next up: pg_basebackup, the tool for a full physical copy of the cluster.
