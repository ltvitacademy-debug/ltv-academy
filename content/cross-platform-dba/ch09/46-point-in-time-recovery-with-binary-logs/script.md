# Script — Point-in-Time Recovery with Binary Logs

## Segment 1 (title)

A full backup only gets you back to the moment it was taken. Everything after that is gone unless captured separately. MySQL's answer is the binary log — the same job a SQL Server transaction log backup chain does, through a genuinely different mechanism.

## Segment 2 (code: what the binlog records)

The binary log records every data-changing event in commit order, split across a sequence of binlog files. It exists for replication and for point-in-time recovery — combined with a starting full backup, it contains every change made after that backup.

## Segment 3 (code: replaying with mysqlbinlog)

mysqlbinlog reads binlog files and can replay their events as SQL against a restored database. Filtering by start and stop datetime, or by exact log position, lets you roll forward right up to just before a damaging statement occurred.

## Segment 4 (steps: the PITR pattern)

The full pattern: restore your most recent full backup, identify which binlog files and position cover the gap, then replay those events with mysqlbinlog. This requires binary logging to have been enabled beforehand — MySQL can't log retroactively.

## Segment 5 (outro)

An unenabled binlog isn't a real recovery plan, the same discipline that says an untested backup isn't a real backup. Next up: pulling all of this together into MySQL disaster recovery planning.
