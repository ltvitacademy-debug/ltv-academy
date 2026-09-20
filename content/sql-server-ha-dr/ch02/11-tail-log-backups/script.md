# Script — Tail-Log Backups

## Segment 1 (title)

Every restore chain so far assumed the log backups you have are all the log backups that exist. Real incidents don't wait for a scheduled job — a database might need restoring while it's still online, generating log records nobody has backed up yet. The tail-log backup captures those before the restore begins.

## Segment 2 (code: one clause, on the backup itself)

A tail-log backup is an ordinary log backup with one addition: WITH NORECOVERY on the backup statement itself. It backs up everything since the last log backup, then immediately takes the database offline, so nothing gets missed or added out of order.

## Segment 3 (steps: required, or not possible at all)

It's required whenever the source database is still accessible and you need every transaction preserved before restoring over it. It's not needed, and not possible, when the source is already gone — there's simply no log left to back up.

## Segment 4 (code: the gap if you skip it)

Skip it while the database is still online, and every transaction since the last scheduled log backup is silently discarded the moment the restore recovers. SSMS's restore wizard prompts for this automatically — a scripted restore does not, which is exactly why it gets forgotten.

## Segment 5 (outro)

Knowing when a tail-log backup is possible versus impossible is half the battle in a real incident. Next up: the most common restore failures DBAs actually hit, and what's really causing each one.
