# Script — Auditing Setup

## Segment 1 (title)

Compliance usually wants logins, permission changes, and specific statements captured consistently, without hand-writing trigger logic on every table. SQL Server Audit is the built-in feature for that, and it has three layers.

## Segment 2 (code: layer 1, the server audit)

The server audit object defines the destination — a file, the Windows Security log, or the Application log. ON_FAILURE CONTINUE keeps the instance running if the target becomes unreachable; SHUTDOWN halts SQL Server rather than let an action go unaudited.

## Segment 3 (code: layers 2 and 3)

A server audit specification attaches instance-wide event groups like failed logins or role membership changes. A database audit specification goes down to the object level — audit every SELECT against one sensitive table, by anyone, with no application changes.

## Segment 4 (steps: three layers, one audit)

Three layers work together: the server audit is where output goes, the server spec is instance-wide events, and the database spec is object-level events inside a specific database. Every recorded event ties back to a real login and statement.

## Segment 5 (outro)

Next up: maintenance plan basics — the SSMS Maintenance Plan Wizard and its real task types, index rebuilds, statistics updates, integrity checks, and backups.
