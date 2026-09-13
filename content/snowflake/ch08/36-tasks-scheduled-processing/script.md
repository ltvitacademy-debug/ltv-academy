# Script — Tasks: Scheduled Processing

## Segment 1 (title)

A TASK runs a single SQL statement or stored procedure on a schedule you define, with no external scheduler needed — no cron job, no Airflow DAG required to just run something on Snowflake's own clock.

## Segment 2 (steps: creating and resuming a task)

Three things to know. CREATE TASK with a warehouse and a schedule — a fixed interval or cron syntax. It's created suspended by default — that trips up almost everyone, so you have to explicitly ALTER TASK RESUME to turn it on. And ALTER TASK SUSPEND turns it back off, at zero cost while suspended.

## Segment 3 (screenshot: task run history)

This is a task's real run history in Snowsight — a chart of runs per day, and a table of every scheduled time, status, and duration. This is exactly where you'd notice a task that's been silently failing — status would show Failed right next to the run that caused it.

## Segment 4 (steps: skipping empty runs)

Running a task's full logic every hour is wasteful if nothing changed. Pair it with a stream from last lesson, and SYSTEM dollar STREAM_HAS_DATA in the WHEN clause skips the run entirely when the stream is empty — the warehouse only spins up when there's real work.

## Segment 5 (outro)

Next lesson: building a full incremental pipeline by combining Streams and Tasks together.
