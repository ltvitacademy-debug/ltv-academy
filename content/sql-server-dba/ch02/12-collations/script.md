# Script — Collations

## Segment 1 (title)

A collation is the rule set SQL Server uses to compare and sort character data — sort order, case sensitivity, and accent sensitivity. The instance, each database, and even individual columns can each have their own.

## Segment 2 (code: Decoding the common default)

SQL_Latin1_General_CP1_CI_AS, the common English default, breaks down into Latin1_General for the base alphabet rules, CP1 for the character encoding, CI for case-insensitive, and AS for accent-sensitive — so café and cafe compare as different, but Smith and smith compare as equal.

## Segment 3 (steps: Not just cosmetic)

This isn't purely cosmetic — comparing character columns from two different collations raises a real collation conflict error at runtime. This happens most often with temp tables, because tempdb always uses the instance's default collation regardless of what collation the user database itself has.

## Segment 4 (code: The standard fix)

The standard fix is an explicit COLLATE clause forcing one side to match the other. But treat every COLLATE workaround in a codebase as a flag that something upstream deserves a second look, not as a permanent pattern.

## Segment 5 (outro)

Next up: service accounts and Configuration Manager — least-privilege accounts, and the tool that actually manages the services and network protocols.
