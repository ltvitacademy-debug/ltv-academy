# Point-in-Time Recovery with Binary Logs

A full backup, logical or physical, only gets you back to the moment it was taken.
Everything that happened between that backup and a failure is gone unless you captured it
separately. MySQL's answer to that gap is the binary log — conceptually the same job a SQL
Server transaction log backup chain does, achieved through a genuinely different mechanism.

## What you'll learn

- What the binary log (binlog) actually records, and why it enables point-in-time recovery
- How to use `mysqlbinlog` to replay binlogs after restoring a full backup
- How the full pattern — restore, then replay — fits together end to end

## What the binary log actually is

The binary log records every event that changes data: statements or row changes (depending
on binlog format), in the order they were committed, timestamped and positioned within a
sequence of binlog files. It exists primarily for two purposes: replication (a replica
reads and applies the primary's binlog to stay in sync — covered in a later chapter) and
point-in-time recovery. For recovery purposes, what matters is that a chain of binlog files,
combined with a starting full backup, contains every change made after that backup was
taken.

This should feel familiar in shape to a SQL Server DBA: it's structurally the same problem
a transaction log backup chain solves, letting you restore a full backup and then roll
forward to a specific point in time, such as one second before a mistaken `DROP TABLE`. The
mechanism is different — MySQL's binlog isn't a SQL Server-style transaction log, and it
isn't consumed the same way — but the recovery *goal* is identical.

## The point-in-time recovery pattern

The full sequence looks like this:

1. Restore your most recent full backup (from `mysqldump` or XtraBackup).
2. Identify which binlog files, and what position or timestamp within them, cover the gap
   between the backup and the point you want to recover to.
3. Use `mysqlbinlog` to extract and replay the relevant events from those binlog files
   against the restored database.

```
mysqlbinlog --start-datetime="2026-09-20 08:00:00" \
  --stop-datetime="2026-09-20 08:47:12" \
  binlog.000045 binlog.000046 | mysql -u root -p
```

This replays every change recorded between two timestamps — in this example, up to just
before a damaging statement occurred at 08:47:13. `mysqlbinlog` can also filter by binlog
*position* rather than timestamp, which is more precise when you know the exact event that
caused the problem (for example, stopping right before the specific `DROP TABLE` statement's
position in the log).

## Why this requires binary logging to be enabled

None of this works unless binary logging was turned on before the incident — MySQL doesn't
log every past change retroactively. That means point-in-time recovery is a decision a DBA
makes proactively: enabling `log_bin` and setting a sensible binlog retention/expiration
policy (long enough to cover the gap between full backups, short enough not to fill the
disk) is part of the same DR-planning discipline that says an untested backup isn't a real
backup — an unenabled binlog isn't a real recovery plan.

## Key terms

| Term | Meaning |
|---|---|
| Binary log (binlog) | MySQL's ordered record of every data-changing event, used for replication and point-in-time recovery |
| `mysqlbinlog` | Utility that reads binlog files and can output or replay their events as SQL |
| Point-in-time recovery (PITR) | Restoring a full backup, then replaying logged changes up to a specific moment |
| `log_bin` | The server setting that enables binary logging; must be on before an incident to be useful |

## Check yourself

A full backup was taken at 2 AM. A damaging `UPDATE` ran at 9:15 AM. Walk through the exact
sequence of restore and `mysqlbinlog` steps you'd use to recover to 9:14:59 AM.
