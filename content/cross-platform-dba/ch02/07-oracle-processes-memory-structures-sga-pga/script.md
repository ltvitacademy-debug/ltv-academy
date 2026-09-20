# Script — Oracle Processes, Memory Structures & the SGA/PGA

## Segment 1 (title)

The previous lesson established that an Oracle instance is background processes plus shared memory. This lesson opens that up — which processes, doing what, and which memory regions, holding what.

## Segment 2 (steps: background processes)

Every started instance runs a set of mandatory background processes: PMON cleans up after failed user processes, SMON performs instance recovery and space housekeeping, DBWn writes dirty buffers out to the datafiles, LGWR writes the redo log buffer out to disk, and CKPT signals checkpoints so recovery knows where to start.

## Segment 3 (code: SGA)

The System Global Area, or SGA, is shared memory for the whole instance. Its main pieces are the database buffer cache, which holds cached data blocks; the shared pool, which caches parsed SQL and execution plans; and the redo log buffer, which holds redo entries before LGWR flushes them to disk.

## Segment 4 (code: PGA)

The Program Global Area, or PGA, is the opposite in one key way — it's private, per-process memory, not shared. Each server process gets its own PGA for things like sort areas and session-specific cursor state, work that has no reason to be visible to any other session.

## Segment 5 (outro)

Next up: actually installing Oracle Database and creating your first database — the Oracle Universal Installer puts the software down, and a separate tool, DBCA, is what actually creates the database.
