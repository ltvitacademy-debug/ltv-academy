# Script — Differential Restore

## Segment 1 (title)

Lesson seven covered the simplest restore: one full backup, one statement. Most real restores aren't that simple, because most real backup strategies include differentials between fulls to shrink restore time. This lesson covers the two-step chain that results.

## Segment 2 (code: two statements, one chain)

Restore the full backup with NORECOVERY, leaving the door open, then restore the differential on top with RECOVERY to finish. Every step except the last uses NORECOVERY — that's the general rule for every multi-backup restore chain in this chapter.

## Segment 3 (steps: why it's always exactly two backups)

A differential backup captures every page changed since the last full backup, not since the last differential. That's why the chain is always exactly two backups deep — the most recent differential already contains everything since the full.

## Segment 4 (code: confirming the match before restoring)

Every differential is tied to a specific full backup by an internal marker. Restore a differential on top of the wrong full and SQL Server rejects it rather than silently corrupting the database. RESTORE HEADERONLY lets you check the match beforehand.

## Segment 5 (outro)

That rejection is a safety net, not a bug — it stops a mismatched chain before it does damage. Next up: extending this exact same NORECOVERY pattern with log backups, for point-in-time restore.
