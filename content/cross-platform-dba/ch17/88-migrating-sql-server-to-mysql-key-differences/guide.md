# Migrating SQL Server to MySQL: Key Differences

Chapter 7 taught MySQL's architecture in real depth, including the split between the server
layer and the storage engine layer that makes MySQL genuinely different from SQL Server, not
just differently spelled. This lesson applies that knowledge to a migration: what actually
changes when moving from SQL Server to MySQL.

## What you'll learn

- Real T-SQL vs. MySQL SQL dialect differences
- IDENTITY vs. AUTO_INCREMENT
- Why MySQL's historically loose data handling matters less today, honestly stated
- Transaction and locking differences that trace back to MySQL's storage engine architecture

## T-SQL vs. MySQL's SQL dialect

MySQL's SQL dialect diverges from T-SQL in specific, practical ways a migration has to
handle directly. Row-limiting uses `LIMIT 10` (optionally `LIMIT offset, 10`) instead of
`TOP 10` — syntactically simpler, but it goes at the end of the query rather than right after
`SELECT`, which changes how a query has to be restructured, not just which keyword is used.
Identifier quoting uses backticks (`` `Order Date` ``) instead of SQL Server's square brackets
(`[Order Date]`). String concatenation is a real trap: T-SQL's `+` operator for strings has no
equivalent in standard MySQL syntax, which uses the `CONCAT()` function instead — code that
concatenates strings with `+` either produces a MySQL error or, worse, silently does
arithmetic if the strings look numeric.

## IDENTITY vs. AUTO_INCREMENT

MySQL's equivalent to SQL Server's `IDENTITY` column property is the `AUTO_INCREMENT`
column attribute, set directly on an integer column: `OrderID INT AUTO_INCREMENT PRIMARY KEY`.
Functionally it plays the same role — auto-generating a sequential value on insert — but
there's no separate sequence object involved the way there sometimes is in Oracle or
PostgreSQL; the auto-increment counter is a property of the table itself, tracked internally
by the storage engine. One practical migration detail: MySQL only allows one
`AUTO_INCREMENT` column per table, and it must be a key (usually the primary key) — the same
practical constraint SQL Server's `IDENTITY` effectively has, so this mapping is usually
close to mechanical.

## MySQL's data handling: honestly, mostly a solved problem now

MySQL earned a real reputation, in older versions, for loosely handling invalid or
out-of-range data — silently truncating a string that was too long for its column, or
inserting `0000-00-00` for an invalid date rather than raising an error the way SQL Server
would. That reputation is honest history, but it needs an honest update: since MySQL 5.7,
**strict SQL mode is the default**, and under strict mode MySQL rejects invalid data with an
error much the way SQL Server does, rather than silently coercing it. A migration project
still needs to verify the target MySQL instance's `sql_mode` setting explicitly — a server
that's had strict mode turned off for legacy application compatibility will behave like the
old, looser MySQL — but it's inaccurate to assume every MySQL target is loose by default in
2026. Confirm the setting; don't assume the reputation.

## Transactions and locking: architecture from Chapter 7 matters here

This is where MySQL's storage-engine architecture — the server layer sitting on top of a
pluggable storage engine layer — has a direct, practical migration consequence. SQL Server is
always transactional and uses row-level locking with its own concurrency model. MySQL's
transactional behavior depends entirely on which storage engine a table uses:
**InnoDB** is transactional, supports row-level locking, and implements MVCC — genuinely
comparable to SQL Server's transaction guarantees. The legacy **MyISAM** engine has no
transaction support at all and locks at the table level, not the row level — a migrated
schema that ends up on MyISAM (whether by an old default, a migration tool's choice, or a
DBA not specifying an engine) silently loses transactional integrity and concurrency that the
original SQL Server schema had. A migration has to explicitly specify `ENGINE=InnoDB` for
every table that needs real transaction support, and verify it rather than trust a default.

## Key terms

| Term | Meaning |
|---|---|
| AUTO_INCREMENT | MySQL's column attribute for auto-generating sequential values, MySQL's IDENTITY equivalent |
| Strict SQL mode | MySQL's modern default that rejects invalid data instead of silently coercing it |
| InnoDB | MySQL's default transactional storage engine, with row-level locking and MVCC |
| MyISAM | A legacy MySQL storage engine with no transaction support and table-level locking |

## Check yourself

A migrated schema ends up with several tables running on the MyISAM storage engine instead
of InnoDB. What two capabilities does the application silently lose, and why would this be
easy to miss during testing but dangerous in production?
