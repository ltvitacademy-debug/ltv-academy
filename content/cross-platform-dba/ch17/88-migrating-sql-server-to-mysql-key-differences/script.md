# Script — Migrating SQL Server to MySQL: Key Differences

## Segment 1 (title)

Chapter 7 taught MySQL's architecture in real depth, including the split between the server layer and the storage engine layer. This lesson applies that to a migration: what actually changes when moving from SQL Server to MySQL.

## Segment 2 (code: syntax traps)

Row-limiting uses LIMIT instead of TOP, and it goes at the end of the query, not right after SELECT. String concatenation is a real trap — T-SQL's plus operator has no equivalent in standard MySQL, which uses the CONCAT function instead. Code that keeps the plus operator either errors or silently does arithmetic.

## Segment 3 (code: IDENTITY vs. AUTO_INCREMENT)

MySQL's AUTO_INCREMENT plays the same role as SQL Server's IDENTITY, with no separate sequence object — it's a property of the table itself. The mapping is usually close to mechanical, but always specify the storage engine explicitly rather than trust a default.

## Segment 4 (steps: InnoDB vs. MyISAM)

This is where Chapter 7's storage engine architecture has a direct migration consequence. InnoDB is transactional with row-level locking and MVCC, genuinely comparable to SQL Server. The legacy MyISAM engine has no transaction support and locks at the table level — a schema that lands there silently loses transactional integrity. MySQL 5.7 and later default to strict SQL mode, which rejects invalid data much like SQL Server does, but the setting should still be verified, not assumed.

## Segment 5 (outro)

Verify the storage engine and SQL mode explicitly — don't trust defaults. Next up: a full data type mapping reference spanning all four platforms at once.
