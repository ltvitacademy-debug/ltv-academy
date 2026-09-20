# Script — Backup History & Recovery Validation

## Segment 1 (title)

"Did the backup job run last night" is really two questions: did the Agent job report success, and did a backup actually land on disk for every database that needs one. Msdb keeps a full queryable history of every backup, independent of what the job history says.

## Segment 2 (code: last successful backup, per database)

This query joins sys.databases to msdb.dbo.backupset and pivots out the last full, differential, and log backup finish time for every database on the instance. A null in last full means that database has never been backed up at all — worth finding out before an incident, not during one.

## Segment 3 (code: which physical file did it land in)

Backupmediafamily links a backup set to its physical file location. Join it to backupset and you know exactly which file a given backup landed in — essential when backups rotate across a set of files or write out to a network share.

## Segment 4 (steps: job succeeded ≠ backup exists)

Sysjobhistory only tells you whether the job step reported success — a job can succeed while the underlying backup statement silently skipped a database, or get marked failed for an unrelated step even though the backup itself completed fine. Backupset is the definitive record. Query it directly instead of trusting a proxy for the truth.

## Segment 5 (outro)

That's the last lesson in backup and recovery. Next up: Chapter Six, Security Administration with T-SQL, starting with logins, users, roles, and permissions.
