# Point-in-Time Recovery with WAL Archiving

SQL Server DBAs recover to a specific moment by restoring a full backup, then replaying
transaction log backups up to a target time. PostgreSQL does the same job with a mechanism
that serves the same purpose but works on its own terms: the Write-Ahead Log, archived
continuously and replayed during recovery.

## What you'll learn

- What the WAL actually is and why PostgreSQL depends on it
- How to configure WAL archiving with archive_command
- How to recover to a specific point in time with restore_command and recovery_target_time

## The Write-Ahead Log: PostgreSQL's equivalent-purpose mechanism to the transaction log

Every change PostgreSQL makes to data is first written to the Write-Ahead Log (WAL) before
the actual data files are touched — the same "log first, then data" discipline that backs
SQL Server's transaction log. The WAL is generated as a stream of 16 MB segment files.
Normally PostgreSQL recycles old WAL segments once they're no longer needed for crash
recovery. Turn on `archive_mode = on` and PostgreSQL instead hands each completed segment
to a command of your choosing before it's eligible for recycling — that's WAL archiving,
and it's what makes recovery to a point *after* your last base backup possible, the same
purpose SQL Server's transaction log backups serve.

## Configuring archiving

```
archive_mode = on
archive_command = 'cp %p /mnt/wal-archive/%f'
```

`%p` is the path to the WAL segment PostgreSQL wants archived; `%f` is just its filename.
The command can be as simple as a `cp`, or ship the segment to remote storage — what matters
is that it returns success only when the segment is safely stored, because PostgreSQL won't
recycle a segment until `archive_command` confirms it. Combined with a `pg_basebackup` taken
periodically, the archived WAL segments let you replay forward from that backup to any later
moment.

## Recovering to a point in time

To recover, restore a base backup, then tell PostgreSQL where to find archived WAL and how
far to replay it:

```
restore_command = 'cp /mnt/wal-archive/%f %p'
recovery_target_time = '2026-09-19 14:32:00'
```

`restore_command` is the mirror image of `archive_command` — it fetches archived segments
back during recovery. `recovery_target_time` tells PostgreSQL to replay WAL only up to that
timestamp and stop there — exactly the "restore to right before the mistake happened"
scenario a SQL Server DBA already recognizes from log-backup recovery, just built out of
WAL segments and a restore command instead of `RESTORE LOG ... WITH STOPAT`.

## Key terms

| Term | Meaning |
|---|---|
| WAL (Write-Ahead Log) | PostgreSQL's log-first record of every data change, PostgreSQL's equivalent-purpose mechanism to SQL Server's transaction log |
| archive_command | Configuration setting defining how completed WAL segments get copied to archive storage |
| restore_command | Configuration setting defining how archived WAL segments get fetched back during recovery |
| recovery_target_time | Setting that tells PostgreSQL to replay WAL only up to a specific timestamp |

## Check yourself

A base backup was taken at 1:00 AM. A bad `DELETE` ran at 9:14 AM with no `WHERE` clause.
Walk through, in order, what you'd restore and configure to get the database back to
9:13 AM.
