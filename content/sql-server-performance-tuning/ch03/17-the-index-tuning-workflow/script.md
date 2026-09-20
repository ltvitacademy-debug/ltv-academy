# Script — The Index Tuning Workflow

## Segment 1 (title)

This chapter covered five index shapes. This lesson ties it all back to Lesson 1's systematic loop, applied specifically to indexes, starting with the real DMV that kicks off the process.

## Segment 2 (code: measure)

sys.dm_db_index_usage_stats tracks seeks, scans, lookups, and updates per index since the last service restart. Two patterns jump out immediately: an index with lots of updates and almost no reads is pure write overhead, and an index missing from this view entirely has never been used since the last restart.

## Segment 3 (steps: identify the gap)

High lookups on a clustered index paired with heavy seeks on a nonclustered index is the DMV-level signature of a Key Lookup — telling you that index is almost covering its queries and just needs an INCLUDE. Pair that with missing-index suggestions from actual execution plans, and "the database feels slow" becomes a specific, evidence-backed list.

## Segment 4 (code: change and verify)

Change exactly one index, then re-run the target query and check its actual plan — did the Key Lookup disappear, did the scan become a seek. Then re-check usage stats after real traffic passes. Changing several indexes at once and declaring victory means you can't attribute the improvement, and you might miss a change that quietly hurt something else.

## Segment 5 (outro)

That closes out index tuning. Next up: Chapter 4, Query Tuning Techniques, starting with rewriting queries for performance.
