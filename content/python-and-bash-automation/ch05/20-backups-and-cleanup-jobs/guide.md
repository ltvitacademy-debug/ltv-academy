# Backups & Cleanup Jobs

The `nightly-backup.sh` script referenced back in lesson 4's cron example doesn't actually exist yet — this lesson writes it. Northbridge Retail needs its order database backed up every night, those backups copied somewhere durable, and the oldest ones cleaned up automatically, because an unmonitored backup directory grows forever and an unmonitored local-only backup disappears the day the server does.

## What you'll learn

- How to back up a PostgreSQL database with `pg_dump` and compress the result
- How to upload a backup to S3 with `boto3`, building on the SDK skills from lesson 16
- How to enforce a retention policy — deleting backups older than N days, locally and in S3
- Why a backup job should fail loudly instead of silently skipping a bad night

## Dumping and compressing the database

`pg_dump` exports a PostgreSQL database to a single file; piping it straight into `gzip` keeps the backup small without a separate compression step:

```bash
#!/usr/bin/env bash
set -euo pipefail

DATE=$(date +%Y-%m-%d)
BACKUP_DIR="/var/backups/northbridge"
BACKUP_FILE="$BACKUP_DIR/orders-$DATE.sql.gz"

mkdir -p "$BACKUP_DIR"
pg_dump -U northbridge -d orders | gzip > "$BACKUP_FILE"

echo "Backup written: $BACKUP_FILE ($(du -h "$BACKUP_FILE" | cut -f1))"
```

`set -euo pipefail` matters more here than in most scripts: without `pipefail`, a failing `pg_dump` in the middle of that pipe would be masked by `gzip` succeeding on an empty input, and the script would report success on a backup that's actually empty.

## Uploading to S3 so it survives the server

A backup that only exists on the server it protects isn't much of a backup — if that server is lost, so is the backup. Reusing the `boto3` pattern from lesson 16 uploads it somewhere durable:

```python
import boto3
from pathlib import Path

s3 = boto3.client("s3")
backup_file = Path("/var/backups/northbridge/orders-2026-10-07.sql.gz")

s3.upload_file(
    Filename=str(backup_file),
    Bucket="northbridge-db-backups",
    Key=f"orders/{backup_file.name}",
)
print(f"Uploaded {backup_file.name} to s3://northbridge-db-backups/orders/")
```

## Enforcing a retention policy locally

Keeping every backup forever eventually fills the disk. A retention policy deletes anything past a cutoff, using the same `datetime` comparison from the cloud-cleanup lesson:

```python
from datetime import datetime, timedelta
from pathlib import Path

RETENTION_DAYS = 14
cutoff = datetime.now() - timedelta(days=RETENTION_DAYS)
backup_dir = Path("/var/backups/northbridge")

for backup in backup_dir.glob("orders-*.sql.gz"):
    modified = datetime.fromtimestamp(backup.stat().st_mtime)
    if modified < cutoff:
        backup.unlink()
        print(f"Deleted old local backup: {backup.name}")
```

`Path.glob()` finds every file matching the pattern, `.stat().st_mtime` reads its last-modified time, and `.unlink()` deletes the file — only once it's older than the 14-day cutoff.

## Enforcing the same policy in S3

The same retention logic applies in the cloud, using a paginator the way lesson 16 did for S3 cleanup, since a bucket of nightly backups will also outgrow a single `list_objects_v2` call over time:

```python
paginator = s3.get_paginator("list_objects_v2")

for page in paginator.paginate(Bucket="northbridge-db-backups", Prefix="orders/"):
    for obj in page.get("Contents", []):
        if obj["LastModified"].replace(tzinfo=None) < cutoff:
            s3.delete_object(Bucket="northbridge-db-backups", Key=obj["Key"])
            print(f"Deleted old S3 backup: {obj['Key']}")
```

## Fail loudly, not quietly

A backup script that encounters an error and just moves on is more dangerous than one that doesn't run at all, because nobody knows to look. Wrapping the whole job and checking the exit status, as lesson 4's cron line already does by redirecting output to a log file, is necessary but not sufficient — the script itself should also exit non-zero on failure so monitoring can catch it:

```bash
if ! pg_dump -U northbridge -d orders | gzip > "$BACKUP_FILE"; then
    echo "ERROR: backup failed" >&2
    exit 1
fi
```

## Key terms

| Term | Meaning |
|---|---|
| `pg_dump` | PostgreSQL's command-line utility for exporting a database to a file |
| `pipefail` | A bash option that makes a pipeline fail if any command in it fails, not just the last one |
| Retention policy | A rule for how long to keep backups before deleting them automatically |
| `Path.glob()` | Finds files matching a wildcard pattern, used here to locate old backups |

## Recap

A real backup job dumps and compresses the data, ships a copy somewhere durable with `boto3`, and then enforces a retention policy in both places so storage doesn't grow forever — and it fails loudly with a non-zero exit code rather than silently skipping a bad night. Next, lesson 21 covers the other half of staying ahead of problems: health checks and alerts.
