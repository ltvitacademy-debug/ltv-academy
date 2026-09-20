# Script — Full & Incremental Backups with RMAN

## Segment 1 (title)

RMAN organizes backups by level. Level 0 is a baseline that looks like a full backup, level 1 is incremental against it, and block change tracking is a separate feature that makes incrementals fast, not just smaller.

## Segment 2 (code: level 0)

A plain BACKUP DATABASE is a full backup, not part of any incremental strategy. An incremental level 0 is physically identical, but it's registered as a baseline a later level 1 can back up changes against.

## Segment 3 (code: level 1 differential vs cumulative)

A level 1 backup only writes changed blocks. Differential, the default, backs up since the most recent level 0 or level 1. Cumulative backs up since the most recent level 0 regardless — bigger per backup, but simpler to restore.

## Segment 4 (steps: block change tracking)

Without block change tracking, RMAN has to read every block to find what changed. With it enabled, a small tracking file records changed blocks directly, so incremental backup runtime scales with what actually changed, not database size.

## Segment 5 (outro)

Next up: restore and recovery scenarios with RMAN — the real distinction between restoring files and recovering a database by applying redo to bring it current.
