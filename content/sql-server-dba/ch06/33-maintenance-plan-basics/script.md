# Script — Maintenance Plan Basics

## Segment 1 (title)

A Maintenance Plan is a built-in SSMS feature — an SSIS package under the hood — that automates the routine upkeep every database needs: index maintenance, statistics, integrity checks, and backups.

## Segment 2 (steps: the real task types)

The Wizard offers a fixed set of real task types. Rebuild and Reorganize Index map to ALTER INDEX REBUILD and REORGANIZE. Update Statistics runs UPDATE STATISTICS. Check Database Integrity runs DBCC CHECKDB. Back Up Database wraps real BACKUP DATABASE and BACKUP LOG statements.

## Segment 3 (code: it's a wizard over an Agent job)

Every task in the plan becomes a step in an underlying SQL Server Agent job. The plan itself is just a convenient way to generate that job without hand-writing T-SQL — it's the same job you'd see and edit in Chapter Seven.

## Segment 4 (steps: honest, but limited at scale)

Maintenance Plans are honest, functional tooling — they run real ALTER INDEX, DBCC CHECKDB, and BACKUP DATABASE statements. But the wizard's one-size-fits-all, per-database configuration has real limits once an instance has many databases of different sizes — which is exactly the gap Ola Hallengren's scripts fill later in this chapter.

## Segment 5 (outro)

Next up: index maintenance jobs — reorganize versus rebuild, and the fragmentation-based decision logic behind choosing one.
