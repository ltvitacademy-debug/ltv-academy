# Script — Backups & Cleanup Jobs

## Segment 1 (title)

The nightly-backup script referenced back in the scheduling lesson doesn't actually exist yet -- this lesson writes it. Northbridge needs its order database backed up every night, copied somewhere durable, and the oldest copies cleaned up automatically.

## Segment 2 (code)

pg_dump exports the database, piped straight into gzip to compress it in one step. Set -o pipefail matters more here than in most scripts: without it, a failing pg_dump in the middle of that pipe can be masked by gzip succeeding on empty input, reporting success on a backup that's actually empty.

## Segment 3 (code)

A backup that only exists on the server it protects isn't much of a backup -- if that server is lost, so is the backup. Reusing the boto3 upload pattern from the cloud SDK lesson ships a copy to S3, somewhere that survives losing the original server entirely.

## Segment 4 (code)

Keeping every backup forever eventually fills the disk. The same datetime-cutoff comparison from the cloud cleanup lesson deletes anything past a retention window -- Path.glob finds the matching files, stat reads when each was last modified, and unlink removes the ones that are too old.

## Segment 5 (steps)

A real backup job needs all three pieces: dump and compress with pipefail catching a hidden failure, ship the result off the server so losing it doesn't lose the backup too, and enforce the same retention cutoff in both the local directory and the S3 bucket.

## Segment 6 (outro)

Dump, ship, prune, and fail loudly instead of silently skipping a bad night -- that's a backup job Northbridge can actually trust. Next, lesson 21 covers the other half of staying ahead of problems: health checks and alerts.
