# Script — Oracle Database Architecture: Instance vs. Database

## Segment 1 (title)

This is the single most important mental reset a SQL Server DBA needs before touching Oracle. Instance and database aren't nested the way they are in SQL Server — in Oracle they're two genuinely different things.

## Segment 2 (code: instance vs database)

An Oracle instance is background processes plus a block of shared memory called the SGA, living only in RAM — stop it, and it's simply gone. The database is the physical datafiles, control files, and redo logs on disk, and it exists whether or not any instance is currently running against it.

## Segment 3 (steps: CDB/PDB)

Since Oracle Database 12c, the default shape of a database is a Container Database, or CDB, with a root container holding shared metadata and one or more Pluggable Databases, or PDBs, inside it. Each PDB looks self-contained to an application, even though every PDB in the CDB shares the same instance and the same SGA.

## Segment 4 (outro)

Next up: what actually lives inside a running instance — the specific background processes and the memory regions of the SGA and PGA that make Oracle's instance do real work.
