# Script — Migrating SQL Server to PostgreSQL: Key Differences

## Segment 1 (title)

Earlier chapters taught PostgreSQL on its own terms — MVCC, VACUUM, replication. This lesson applies that to a migration: the specific differences a SQL Server-to-PostgreSQL project has to address, including one of PostgreSQL's most-missed gotchas.

## Segment 2 (code: IDENTITY vs. SERIAL vs. GENERATED AS IDENTITY)

PostgreSQL's traditional SERIAL type is shorthand for a sequence plus a default — it works, but it's PostgreSQL-specific and not SQL-standard. PostgreSQL 10 introduced GENERATED AS IDENTITY, which behaves much more like SQL Server's IDENTITY and is the modern, recommended choice for a migration.

## Segment 3 (code: the case-folding gotcha)

This runs opposite to Oracle. PostgreSQL folds unquoted identifiers to lowercase by default. The trouble starts when a migration script quotes a name to preserve SQL Server casing — from then on, every single reference must use that exact quoted case, or PostgreSQL won't find it, even a plain unquoted SELECT.

## Segment 4 (steps: datatype mapping)

Several datatypes need a deliberate mapping decision. DATETIME2 maps to TIMESTAMP, NVARCHAR maps to VARCHAR or TEXT since PostgreSQL text is UTF-8 by default, BIT maps to a genuine native BOOLEAN, and UNIQUEIDENTIFIER maps to PostgreSQL's native UUID type.

## Segment 5 (outro)

The safest practice is to let PostgreSQL fold everything to lowercase rather than fighting it with quoted identifiers everywhere. Next up: the key differences a SQL Server-to-MySQL migration has to address.
