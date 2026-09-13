# Script — Building Incremental Pipelines With Streams + Tasks

## Segment 1 (title)

Watermark columns from Lesson 23 got replaced by a Stream tracking changes natively. Tasks added scheduling with no external orchestrator. Put all three ideas together, and you get a pipeline that requires no manual intervention at all.

## Segment 2 (code: the combined pattern)

A task, gated on the stream having data, running a MERGE — the same MERGE pattern from Lesson 9, except now it merges from a stream containing only what actually changed, not a full source table. The WHEN clause means the warehouse doesn't even spin up when there's nothing new.

## Segment 3 (steps: why this matters for SCD)

This isn't just for keeping a table in sync. A stream tells you exactly which rows changed and whether it was an insert, update, or delete — everything SCD Type 2 needs to close out an old row version and start a new one. This is how SCD Type 2 runs continuously in production instead of as a batch job someone remembers to kick off.

## Segment 4 (screenshot: query history task filter)

This is Snowsight's Query History, filtered to queries executed by user tasks — isolating exactly what your scheduled task ran, separate from everyone else's worksheet activity. Open one of the MERGE statements here and check its rows-affected count — it should track the size of your actual changes, not the whole source table.

## Segment 5 (outro)

Next lesson: task dependencies — chaining multiple tasks together into a DAG, so a whole transformation chain runs automatically.
