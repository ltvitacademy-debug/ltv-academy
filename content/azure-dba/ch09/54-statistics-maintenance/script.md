# Script — Statistics Maintenance

## Segment 1 (title)

This is a different "statistics" than SET STATISTICS TIME and IO from T-SQL Development. Column and index statistics are stored summaries of value distribution that the optimizer reads before building a plan, for every query, until they're updated.

## Segment 2 (code: why stale statistics break plans)

Cardinality estimates come from statistics, not an actual row count. If real inserts shift a column's distribution and the statistics haven't caught up, the optimizer isn't picking a slightly worse plan — it's confidently picking the wrong shape of plan, based on a number that used to be true.

## Segment 3 (steps: auto-update's blind spot, and the manual fix)

Auto-update fires only after a threshold of changes has accumulated, so some queries run on stale statistics before it triggers, and ASYNC mode means even the triggering query runs on the old numbers. Ahead of a known bulk load, update statistics manually with FULLSCAN instead of waiting.

## Segment 4 (outro)

DBCC SHOW_STATISTICS WITH STAT_HEADER is the fastest way to confirm whether a bad plan is a statistics problem before looking anywhere else. Next up: DBCC CHECKDB, and the real integrity check statistics can't give you.
