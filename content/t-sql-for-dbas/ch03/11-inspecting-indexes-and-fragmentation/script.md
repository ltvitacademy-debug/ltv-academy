# Script — Inspecting Indexes & Fragmentation

## Segment 1 (title)

Chapter Three turns to index and statistics administration — the maintenance work that keeps queries fast long after they were written. We start with the DMV that measures fragmentation directly.

## Segment 2 (code: sys.dm_db_index_physical_stats)

Sys.dm_db_index_physical_stats takes a database ID, object, index, and scan mode. Passing nulls scans the whole database. "Limited" is the lightest scan mode — safe to run against production during the day, unlike the far more expensive "detailed" mode.

## Segment 3 (steps: documented thresholds)

Microsoft's own guidance ties avg_fragmentation_in_percent to one of three actions: under 10 percent, do nothing; 10 to 30 percent, reorganize, which is always online; over 30 percent, rebuild, which is more thorough but locks more heavily.

## Segment 4 (code: filter out tiny indexes)

Page count matters as much as the percentage. An index under roughly a thousand pages fits in a handful of extents — fragmentation there barely changes I/O, since it's tiny and usually already cached. Filter small indexes out before acting on percentage alone.

## Segment 5 (outro)

Fragmentation percentage without page count is a half-answer. Next up: missing, unused, and duplicate indexes — because fragmentation on the wrong index doesn't help if the right index doesn't even exist.
