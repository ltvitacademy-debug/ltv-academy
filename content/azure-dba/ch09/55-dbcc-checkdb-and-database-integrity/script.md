# Script — DBCC CHECKDB & Database Integrity

## Segment 1 (title)

Fragmentation and stale statistics are performance problems — the database still returns correct answers. Corruption is different: a page on disk that doesn't match what SQL Server expects, and it can propagate to a wrong result handed to your application with no error at all.

## Segment 2 (code: what CHECKDB checks, and repair as a last resort)

DBCC CHECKDB validates page checksums, allocation consistency, and b-tree structure across the whole database. If it finds corruption, restore from a known-good backup first — REPAIR_ALLOW_DATA_LOSS can permanently delete corrupted rows or pages to make the database consistent again, not complete.

## Segment 3 (steps: Azure changes who runs it, not what it protects against)

On Azure SQL Database and Managed Instance, Microsoft runs integrity checks for you as part of the managed service. SQL Server on an Azure VM is IaaS, so scheduling CHECKDB yourself is still your job there — and understanding what it protects against is real DP-300 content either way.

## Segment 4 (outro)

A recent backup gives your data back; REPAIR_ALLOW_DATA_LOSS gives you a database that stops erroring with an unknown amount of data quietly missing. Next up: database-scoped configuration, and tuning one database differently from server defaults.
