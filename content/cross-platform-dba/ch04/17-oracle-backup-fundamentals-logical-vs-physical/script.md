# Script — Oracle Backup Fundamentals: Logical vs. Physical

## Segment 1 (title)

SQL Server has one primary backup mechanism. Oracle splits backup into two genuinely different disciplines with two different tools: logical backup with Data Pump, and physical backup with RMAN.

## Segment 2 (code: physical/RMAN)

A physical backup captures the actual datafiles, control files, and archived redo logs at the block level, using RMAN. Restore the files and apply redo, and you can bring the entire database back to any point in time covered by retained redo.

## Segment 3 (code: logical/Data Pump)

A logical backup doesn't touch the underlying files at all — Data Pump reads data through the engine and exports a portable description of objects and their contents, importable into a different version or platform entirely.

## Segment 4 (steps: two tools, two jobs)

RMAN is the disaster-recovery backbone for the whole database at any point in time. Data Pump handles migrations, schema refreshes, and selective moves. A real production strategy uses both, because they solve different problems.

## Segment 5 (outro)

Next up: RMAN architecture and configuration — the recovery catalog, retention policy, and backup optimization settings that shape how RMAN actually behaves.
