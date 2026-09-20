# Script — Physical Backups with pg_basebackup

## Segment 1 (title)

pg_basebackup is PostgreSQL's built-in tool for a full physical backup of a running
cluster. It doesn't read data through SQL like pg_dump does — it pulls the actual data
files over the same protocol a streaming replica uses.

## Segment 2 (code: riding the replication protocol)

pg_basebackup connects using the streaming replication protocol, asks for a one-time
consistent copy of the whole data directory, then disconnects. That means it needs a role
with the REPLICATION attribute and a pg_hba.conf entry permitting a replication connection.

## Segment 3 (code: key flags)

Key flags: -D sets the target directory, -Ft with -z gives a compressed tar backup, -P
shows progress, and -X stream streams the WAL generated during the backup so it stays
self-contained and consistent.

## Segment 4 (outro)

A base backup alone only restores you to the moment it finished — nothing more recent. Next
up: combining it with WAL archiving for point-in-time recovery to any moment after the
backup.
