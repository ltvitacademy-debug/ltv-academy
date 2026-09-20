# Script — RESTORE VERIFYONLY

## Segment 1 (title)

A backup file existing on disk isn't the same as a backup file you can actually restore. Restore verifyonly checks a backup without restoring a single byte of data, which makes it fast — but it also validates less than most people assume.

## Segment 2 (code: checks the file without restoring it)

Restore verifyonly reads through the backup file and confirms the backup set is complete and readable — the header is intact, every page that should be there is present. If any of that fails, you get an error instead of finding out during an actual disaster.

## Segment 3 (code: more useful paired with CHECKSUM)

Verifyonly is far more useful against a backup taken with checksum. Without checksum at backup time, there's no per-page checksum stored for verifyonly to check against — it can only confirm the backup's structure is intact, not that the page contents themselves are undamaged.

## Segment 4 (steps: what it does NOT prove)

Here's what surprises people: verifyonly doesn't restore any data, doesn't confirm a real restore will succeed without error, and doesn't check for available disk space. It's a sanity check on the file, not a substitute for an actual test restore. The only way to be certain is to actually restore the backup, ideally to a test instance on a regular schedule.

## Segment 5 (outro)

Passing verifyonly means the backup file is structurally sound — it does not mean your recovery plan works. Next up: querying msdb's backup history so you can prove exactly what backups actually ran, and when.
