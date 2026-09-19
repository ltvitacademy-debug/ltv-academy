# Script — Error Handling in Step Functions

## Segment 1 (title)

If a Glue job fails in the state machine we built last lesson, the execution just stops — no retry, no cleanup. ASL gives every Task state two fields built for exactly this: Retry and Catch.

## Segment 2 (code: Retry and Catch on a Task state)

Retry lets a state automatically retry itself when it fails, instead of the whole execution dying. Catch is what runs when a state fails and retries are exhausted — it routes to a fallback state instead of just stopping.

## Segment 3 (steps: Retry fields)

ErrorEquals lists which error types the rule applies to. IntervalSeconds is the wait before the first retry. BackoffRate multiplies that interval on each subsequent attempt — that's exponential backoff. MaxAttempts caps how many times it retries before giving up.

## Segment 4 (steps: Catch fields)

Catch runs once retries are exhausted, or immediately if there's no Retry block at all. It routes execution to a Next state — commonly one that logs the failure or sends an alert — so a human finds out instead of the pipeline silently stopping.

## Segment 5 (outro)

Retry and Catch down. Next up: orchestrating a full pipeline — a Glue crawler, a Glue ETL job, and a Lambda notification, chained end to end.
