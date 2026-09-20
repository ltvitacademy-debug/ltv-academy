# Script — MySQL Backup Strategies: Logical vs. Physical

## Segment 1 (title)

Every SQL Server DBA already believes an untested backup isn't a real backup. That transfers unchanged to MySQL. What doesn't transfer is one unified backup command — MySQL backup thinking starts from a fork in the road: logical versus physical.

## Segment 2 (code: logical backup)

A logical backup dumps the logical structure and content of your databases as SQL statements — CREATE TABLE and INSERT statements — using mysqldump. Restoring means replaying that SQL against a running server, rebuilding every table and row from scratch.

## Segment 3 (code: physical backup)

A physical backup instead copies the raw InnoDB data files on disk. Restoring means putting those files back and starting MySQL against them — no SQL replay. MySQL has no single built-in tool that does this well at scale, which is exactly why a third-party tool matters.

## Segment 4 (steps: choosing)

The real-world rule of thumb: logical backups for smaller databases and migrations, physical backups once size or restore-time requirements make replaying SQL impractical. Restore time scales with data volume for mysqldump, but not for a physical restore.

## Segment 5 (outro)

That gap in MySQL's built-in tooling is exactly why a specialized physical backup tool exists and is the industry standard for large databases. Next up: mysqldump's real syntax and options, including --single-transaction and --all-databases.
