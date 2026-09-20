# Script — Percona XtraBackup & Physical Backups

## Segment 1 (title)

SQL Server DBAs have native backup tooling built in, and Oracle DBAs have RMAN. MySQL genuinely doesn't ship an equivalent for fast, hot, physical backups of InnoDB at scale. Percona XtraBackup is how the industry actually fills that gap.

## Segment 2 (code: the gap XtraBackup fills)

Percona built XtraBackup as a free, open-source tool that performs hot physical backups of InnoDB without stopping the server or taking blocking locks for most of its runtime. It isn't a lesser alternative — it's what large-scale MySQL shops actually run in production.

## Segment 3 (code: backup and prepare)

XtraBackup copies InnoDB's data files while streaming the redo log in parallel, using the same crash-recovery mechanism InnoDB already has. The backup step copies files and captures log changes; the prepare step replays that log to make the copied files consistent and restorable.

## Segment 4 (code: restoring)

Restoring means stopping MySQL, copying the prepared files into the data directory, and starting the server back up. XtraBackup also supports incremental backups, capturing only changed pages since a prior backup to keep backup windows short on large databases.

## Segment 5 (outro)

XtraBackup gets you a fast, consistent physical restore, but a full restore still only gets you back to the moment the backup was taken. Next up: point-in-time recovery using binary logs and mysqlbinlog to replay everything after that point.
