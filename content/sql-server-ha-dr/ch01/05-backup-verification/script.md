# Script — Backup Verification

## Segment 1 (title)

Every lesson so far in this chapter has assumed the backups being designed, compressed, and distributed are actually good. This lesson questions that directly — a backup file existing is not the same claim as a backup file being restorable.

## Segment 2 (code: RESTORE VERIFYONLY)

RESTORE VERIFYONLY is a read-only check that inspects a backup file without touching any database. It confirms the file is complete, the header is valid, and — with CHECKSUM — that page checksums are intact. What it doesn't do is actually restore anything, so it can't catch everything a real restore would surface.

## Segment 3 (code: WITH CHECKSUM at backup time)

Adding CHECKSUM to a BACKUP statement validates each page's checksum as it's read, catching corrupt pages during the backup itself, before they get silently backed up. By default a corrupt page stops the backup — CONTINUE_AFTER_ERROR lets it finish anyway, but treat that result as suspect, not routine.

## Segment 4 (steps: verification maturity ladder)

Neither VERIFYONLY nor CHECKSUM proves the thing that actually matters — that this backup, restored for real, brings up a working database. The only practice that proves that is periodically restoring backups to a separate scratch instance and confirming the database actually comes online.

## Segment 5 (outro)

A test restore catches what the lighter checks can't: missing file paths, a broken chain, subtle inconsistency only a real recovery cycle exposes. Next up: automating this whole strategy so it actually runs, on schedule, every time.
