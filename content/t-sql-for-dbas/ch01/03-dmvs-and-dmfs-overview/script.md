# Script — DMVs & DMFs, Overview

## Segment 1 (title)

Catalog views describe structure — what tables and columns exist. Dynamic Management Views and Functions describe activity — what SQL Server is doing right this second. They're the single most important query surface in a DBA's day-to-day work.

## Segment 2 (code: naming convention)

Every DMV and DMF starts with sys dot dm underscore, followed by a category prefix. Exec covers query execution — requests, sessions, sql text, plans. OS covers operating-system-level data like wait stats and performance counters. DB covers database-level data like index stats. IO covers virtual file stats.

## Segment 3 (code: what's running right now)

Sys.dm_exec_requests is a DMV — one row per currently executing request, with its status, wait type, CPU time, and elapsed time. Chapter 2 builds entire monitoring queries around exactly this view.

## Segment 4 (steps: DMV vs DMF)

A Dynamic Management View is queried directly with a plain select. A Dynamic Management Function takes a parameter — like a sql_handle — and gets called with cross apply, usually against a handle returned by a DMV. Both start with sys.dm underscore, but they're used differently.

## Segment 5 (outro)

DMV data is a live snapshot, not a permanent log — restart the instance and the counters reset. Next up: server and database properties — SERVERPROPERTY and DATABASEPROPERTYEX.
