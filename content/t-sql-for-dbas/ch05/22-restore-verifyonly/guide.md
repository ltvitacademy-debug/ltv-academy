# RESTORE VERIFYONLY

A backup file existing on disk isn't the same as a backup file you can actually restore.
`RESTORE VERIFYONLY` checks a backup without restoring a single byte of data — which makes it
fast, but also means it validates less than most people assume. Knowing exactly what it does and
doesn't guarantee is the difference between a false sense of security and a backup strategy you
can trust.

## What you'll learn

- `RESTORE VERIFYONLY` syntax
- What it actually validates — and the much bigger thing it does not
- Why `WITH CHECKSUM` at backup time makes `VERIFYONLY` more useful

## The syntax

```sql
RESTORE VERIFYONLY
FROM DISK = 'D:\Backups\AdventureWorks2012_Full.bak';
```

This reads through the backup file and confirms the backup set is complete and readable — every
page that should be there is present, the backup header is intact, and (if the backup was taken
`WITH CHECKSUM`) the page checksums stored in the backup match. If any of that fails, you get an
error instead of finding out the hard way during an actual disaster.

## What VERIFYONLY does NOT check

This is the part that surprises people: `RESTORE VERIFYONLY` does not verify that the backup can
actually be restored successfully. It does not:

- Restore any data — no data or log files are created or written to
- Confirm the backup will restore without error on a real restore attempt
- Validate the destination has enough disk space for a real restore
- Catch every possible form of corruption — only what's detectable from the backup's own
  structure and (if present) its stored checksums

It's a sanity check on the backup file itself, not a substitute for an actual test restore. The
only way to be certain a backup restores cleanly is to actually restore it — ideally to a test
instance, on a regular schedule.

## Pairing VERIFYONLY with CHECKSUM

`RESTORE VERIFYONLY` is far more useful against a backup taken `WITH CHECKSUM`:

```sql
BACKUP DATABASE AdventureWorks2012
TO DISK = 'D:\Backups\AdventureWorks2012_Full.bak'
WITH CHECKSUM;

RESTORE VERIFYONLY
FROM DISK = 'D:\Backups\AdventureWorks2012_Full.bak'
WITH CHECKSUM;
```

Without `CHECKSUM` at backup time, there's no per-page checksum stored in the backup for
`VERIFYONLY` to check against — it can only confirm the backup set's structure is intact, not
that the actual page contents are undamaged.

## Key terms

| Term | Meaning |
|---|---|
| `RESTORE VERIFYONLY` | Validates a backup file's structure and completeness without restoring any data |
| `WITH CHECKSUM` | A `BACKUP`/`RESTORE` option that stores/verifies per-page checksums, catching corrupted pages |
| Test restore | Actually restoring a backup (usually to a separate instance) to confirm it fully works — the only true validation |

## Check yourself

A backup file passes `RESTORE VERIFYONLY` with no errors. Does that guarantee the backup will
restore successfully in a real disaster? Why or why not?
