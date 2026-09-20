# Script — Index Maintenance Jobs

## Segment 1 (title)

Before touching any index, measure it. sys.dm_db_index_physical_stats reports real fragmentation percentage and page count — LIMITED mode is fast enough for a routine maintenance job.

## Segment 2 (steps: Microsoft's standard thresholds)

Microsoft's standard thresholds drive the decision. Under 5% fragmentation, do nothing. Between 5 and 30%, reorganize. Above 30%, rebuild.

## Segment 3 (code: the real syntax)

REORGANIZE defragments the leaf level in place, is always online, and can be stopped without losing progress — but it doesn't refresh statistics. REBUILD drops and recreates the index, fully resolving fragmentation and refreshing statistics with a full scan as a side effect.

## Segment 4 (code continued)

ONLINE equals ON keeps the table available during a rebuild, edition-dependent — without it, a rebuild takes a blocking lock for its duration, a real scheduling consideration on a large, busy table. A real job loops this fragmentation check per index rather than hardcoding one statement per table.

## Segment 5 (outro)

Next up: statistics jobs — UPDATE STATISTICS scheduling, sp_updatestats, and real cadence considerations for high-churn tables.
