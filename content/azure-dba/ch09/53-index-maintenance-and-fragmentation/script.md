# Script — Index Maintenance & Fragmentation

## Segment 1 (title)

Every insert, update, and delete against an indexed column can force a page split, and enough of those and an index's physical order on disk stops matching its logical order. That mismatch is fragmentation, and it turns sequential reads into scattered ones.

## Segment 2 (code: measuring and fixing it)

`sys.dm_db_index_physical_stats` measures real fragmentation and page count — filter out small indexes, because fragmentation only costs real I/O once an index is big enough for physical layout to matter. REBUILD drops and recreates the index, fully defragmenting but resource-heavy. REORGANIZE walks the leaf level in place, always online, but less thorough.

## Segment 3 (steps: the decision)

Reorganize in the 5-30% fragmentation range, rebuild above that — as a starting point, not a law. On Azure, a rebuild consumes the same metered CPU, IO, and log throughput your application is paying for, so when you run it and which option you pick are real cost and availability decisions, not just SQL syntax.

## Segment 4 (outro)

Rebuilding an index also happens to refresh its statistics as a side effect — but statistics go stale on their own timeline too, independent of fragmentation. Next up: statistics maintenance, and why the optimizer can go wrong even when your indexes are pristine.
