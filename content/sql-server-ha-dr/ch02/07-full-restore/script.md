# Script — Full Restore

## Segment 1 (title)

Chapter one built the backup side of the equation. This chapter flips to restore — because a backup nobody has successfully restored isn't a backup, it's an unverified hope. We start with the simplest scenario: restoring a single full backup.

## Segment 2 (code: the command that starts every restore)

Every restore in this chapter starts with this same statement shape. RESTORE DATABASE, FROM DISK, and a WITH clause. If this full backup is the only one this database needs, this single statement is the entire restore.

## Segment 3 (steps: RECOVERY vs. NORECOVERY)

RECOVERY versus NORECOVERY is the most important choice in any restore. WITH RECOVERY says this is the last backup — bring the database online, and no further backups can be applied after that. WITH NORECOVERY leaves it in a RESTORING state, waiting for more.

## Segment 4 (code: restoring over an existing database)

Restoring over an existing database needs WITH REPLACE, a safety check against overwriting the wrong database. STATS reports progress on large restores. And RESTORE HEADERONLY and FILELISTONLY let you inspect a backup file without touching the database at all.

## Segment 5 (outro)

Get RECOVERY versus NORECOVERY wrong and you have to start the whole restore over from the full backup. Next up: stacking a differential restore on top of a full restore, using exactly that NORECOVERY mechanism.
