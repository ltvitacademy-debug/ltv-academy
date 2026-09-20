# Script — Point-in-Time Recovery with WAL Archiving

## Segment 1 (title)

SQL Server DBAs recover to a moment by restoring a full backup and replaying transaction
log backups. PostgreSQL does the same job with its own mechanism: the Write-Ahead Log,
archived continuously and replayed during recovery.

## Segment 2 (code: the WAL, log first then data)

Every change is written to the WAL before the data files themselves, the same log-first
discipline as the SQL Server transaction log. Turning on archive_mode and setting
archive_command hands off each completed WAL segment before it's recycled.

## Segment 3 (code: recovering to a moment)

To recover to a point in time, restore a base backup, then set restore_command to fetch
archived WAL back and recovery_target_time to the moment you want. PostgreSQL replays WAL
forward and stops exactly there.

## Segment 4 (outro)

That's the PostgreSQL equivalent of restoring a log backup with a stop-at time. Next up:
pulling base backups and WAL archiving together into a real PostgreSQL disaster recovery
plan.
