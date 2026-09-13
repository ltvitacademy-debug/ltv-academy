# Script — Pipeline Troubleshooting, End to End

## Segment 1 (title)

It's nine a.m., and the reporting table still shows yesterday's numbers. No error, no page — it just quietly didn't happen. This is the most common real troubleshooting scenario in a shop running Snowpipe into Streams and Tasks, and walking the chain in order finds the break far faster than guessing.

## Segment 2 (steps: the chain)

Four links, checked in order: did the file load through the pipe, did the stream capture a change, did the task run and succeed, did the downstream table actually update. Each has its own diagnostic query, and the order matters — jumping straight to "the task must be broken" skips two steps that are faster to check.

## Segment 3 (code: pipe and stream)

SYSTEM$PIPE_STATUS and COPY_HISTORY answer step one — did the file even load. SYSTEM$STREAM_HAS_DATA answers step two — a false result, with rows clearly loaded, points at the stream itself, often consumed by an earlier run.

## Segment 4 (code: task history)

TASK_HISTORY answers step three, and it has a state value that's easy to miss: SKIPPED, not FAILED, which happens when a task's WHEN condition — usually tied to stream-has-data — evaluated false. A string of skipped runs means the chain is consistent, just stalled one link back at the stream.

## Segment 5 (steps: root cause, one sentence)

Checking all four links in order turns a vague "the load didn't run" into one specific sentence every time: the file never arrived, the stream was empty, the task skipped for a reason, or the task ran but hit a real error. That specificity is the entire point of walking the chain instead of guessing.

## Segment 6 (outro)

That's the last lesson of Chapter 14. Next: the capstone — a full pipeline of your own, from raw SQL Server, CSV, and JSON data all the way through to Power BI.
