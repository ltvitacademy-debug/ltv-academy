# Script — Backup Jobs

## Segment 1 (title)

Three backup types, three real statements. BACKUP DATABASE for a full backup, BACKUP DATABASE WITH DIFFERENTIAL for everything changed since the last full, and BACKUP LOG for the transaction log — only valid in FULL or BULK_LOGGED recovery model.

## Segment 2 (code: the three backup types)

COMPRESSION shrinks the file and is usually a net win. CHECKSUM catches page-level corruption during the backup itself, cheap insurance. Each backup type becomes its own Agent job with its own schedule.

## Segment 3 (steps: scheduling independently per type)

Full backups run weekly or nightly depending on size and RPO. Differentials run nightly between fulls, staying small since they only capture change since the last full. Transaction log backups run every 15 to 30 minutes — that frequency is what actually limits how much data you can lose.

## Segment 4 (steps: a realistic weekly rotation)

A realistic rotation: full on Sunday, differential every other night, log backups every 15 to 30 minutes throughout. Restoring means applying the last full, the most recent differential, and every log backup since — fewer files than restoring the full plus every log since Sunday.

## Segment 5 (outro)

Next up: integrity check jobs — scheduling DBCC CHECKDB, and the real cadence tradeoffs between nightly checks on small databases and weekly checks on huge ones.
