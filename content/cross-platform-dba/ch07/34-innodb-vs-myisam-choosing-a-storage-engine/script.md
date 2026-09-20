# Script — InnoDB vs. MyISAM: Choosing a Storage Engine

## Segment 1 (title)

MySQL's storage engine is a pluggable, per-table choice, and in practice there are only two engines worth a real opinion on: InnoDB and MyISAM. One should be your default almost without exception.

## Segment 2 (code: InnoDB)

InnoDB is a full ACID-compliant transactional engine. It supports COMMIT and ROLLBACK, enforces real foreign key constraints, locks at the row level so concurrent writers don't block each other, and recovers automatically from a crash via its redo log.

## Segment 3 (steps: MyISAM limitations)

MyISAM, MySQL's original default, is missing capabilities a modern workload usually needs: no transactions at all, foreign key clauses that are silently ignored, table-level locking that serializes every writer, and crash recovery that can require a manual REPAIR TABLE.

## Segment 4 (code: check and convert)

You can check any table's engine through information_schema.tables, and convert an existing table with ALTER TABLE ENGINE equals InnoDB. MySQL itself made InnoDB the default back in version 5.5, precisely because table-level locking and manual crash recovery weren't acceptable for real production workloads.

## Segment 5 (outro)

Default to InnoDB unless you have a specific reason not to. Next up: installing MySQL and getting a real server running, step by step.
