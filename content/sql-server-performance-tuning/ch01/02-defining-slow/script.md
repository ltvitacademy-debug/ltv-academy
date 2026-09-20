# Script — Defining "Slow"

## Segment 1 (title)

"The report feels slow" isn't yet something you can act on. Before touching anything, slow has to become a specific, measured number — because different kinds of slow point to completely different problems.

## Segment 2 (code: three different numbers)

Duration is wall-clock time and includes waiting. CPU time is just the processor's actual work. Logical reads — pages pulled from the buffer pool — is usually the most stable number of the three, run to run.

## Segment 3 (code: getting real numbers)

SET STATISTICS TIME and IO ON gives you all three for a single execution — CPU time, elapsed time, and logical reads per table touched. Query Store and sys.dm_exec_query_stats capture the same numbers over time.

## Segment 4 (steps: from feeling to target)

"Slow" becomes: 14 seconds duration, 2 seconds CPU, 1.2 million logical reads, versus 3 seconds last month. That's a target you can chase, and it already hints where to look — duration far exceeds CPU time.

## Segment 5 (outro)

A big gap between duration and CPU time means the query is waiting, not computing — indexing or rewriting won't fix a lock wait. Next up: gathering a real performance baseline before you change anything.
