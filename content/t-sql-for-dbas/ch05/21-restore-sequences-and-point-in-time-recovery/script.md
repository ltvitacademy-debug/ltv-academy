# Script — Restore Sequences & Point-in-Time Recovery

## Segment 1 (title)

A single restore statement rarely gets you all the way back. Real recovery is a sequence — full, then differential, then a chain of log backups — applied in the right order. Do it right and you can land the database at the exact second before an incident started.

## Segment 2 (code: full, then differential, then the log chain)

Restore the full backup with norecovery, then the differential with norecovery, then every log backup in order, also with norecovery, until the very last one, which gets recovery. A differential covers everything since the last full, so you can skip straight from full to differential. Log backups can't be skipped — each one only covers since the previous log backup.

## Segment 3 (code: landing on an exact second)

Stopat restores a log backup only up to a specific timestamp instead of the whole file. This is the classic "someone ran a delete at 2:35, restore to 2:32" scenario. It only works inside a log backup that actually spans that timestamp, and only in full or bulk-logged recovery model.

## Segment 4 (steps: why order can't be skipped)

Full to differential is fine because the differential already covers everything since the full. But the log chain has no shortcuts — skip one log backup and every log backup after it becomes useless for that restore, because SQL Server tracks log sequence numbers and refuses a backup that doesn't pick up exactly where the database left off.

## Segment 5 (outro)

That LSN tracking is also what makes restore sequences safe — SQL Server won't silently apply things out of order. Next up: RESTORE VERIFYONLY, and what it actually checks versus what it doesn't.
