# Script — Using Query Store to Find Regressed Queries

## Segment 1 (title)

Lesson 44 asked whether a problem is new or has always existed. Query Store is how you actually answer that with evidence -- its Regressed Queries report surfaces queries whose duration, CPU, or reads got meaningfully worse recently.

## Segment 2 (screenshot: before/after index creation)

The same Plan Summary chart from last lesson, read differently. Here it's annotated showing average duration before a new index, and after -- dropping from roughly seventeen to twenty million microseconds down to eight to twelve million once the index landed. If the new cluster doesn't drop, the fix didn't work.

## Segment 3 (screenshot: compare plans side by side)

Compare Plans lays two plan IDs for the same query top and bottom. Here a Clustered Index Scan at fifty-one percent cost in the older plan gets replaced by an Index Seek at twenty-four percent in the newer one -- the exact seek-versus-scan distinction from Lesson 46, shown as the literal cause of a regression.

## Segment 4 (code: forcing a plan)

sp_query_store_force_plan locks the optimizer onto a known-good plan ID without touching the query itself. It's a stabilizer, not a permanent fix -- it buys time while you diagnose the real cause, and you unforce it once a real fix like a new index is in place.

## Segment 5 (outro)

Regression detection, before/after confirmation, side-by-side comparison, and forcing a fix -- that's the full Query Store workflow. Next up: blocking, locking, and deadlocks -- three genuinely distinct concepts that get confused constantly.
