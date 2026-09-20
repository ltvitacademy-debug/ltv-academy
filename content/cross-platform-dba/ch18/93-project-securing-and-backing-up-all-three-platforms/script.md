# Script — Project: Securing & Backing Up All Three Platforms

## Segment 1 (title)

All three databases are up. Now they need accounts that can only do what they're supposed to, and backups that would actually survive an incident, not just check a box.

## Segment 2 (code: Oracle)

On Oracle, the finance application connects through a dedicated fin_app_role, not as the schema owner or SYS. For backup, RMAN takes a full backup plus archived logs weekly, and incrementals on weeknights, all resting on the ARCHIVELOG mode set up in Lesson 92.

## Segment 3 (code: MySQL)

On MySQL, the storefront application connects through a role limited to its own schema from an expected host range. mysqldump gives a nightly logical backup, but Percona XtraBackup plus the binary log are what let you recover to the minute a failure happened, not just the last midnight dump.

## Segment 4 (code: PostgreSQL)

On PostgreSQL, the BI team gets a read-only role scoped to the reporting schema, while the nightly ETL job gets its own narrower role. pg_dump handles logical backups before schema changes, while pg_basebackup plus WAL archiving provides real point-in-time recovery.

## Segment 5 (outro)

Three platforms, three different tools, but the same goal every time: a restorable copy. Next up, Lesson 94: walking through a real slow-performance incident on each of these three systems.
