# Script — Understanding Database Monitoring & Creating a Performance Baseline

## Segment 1 (title)

Every dashboard shows you a number — CPU at 62%, average query duration at 40 milliseconds. On its own, a number tells you nothing. You can't know abnormal without already knowing what normal looks like for this specific database. That known-normal is the performance baseline, and it's built before anything goes wrong, not after.

## Segment 2 (code: without vs with a baseline)

Without a baseline, every incident starts with a guess. With one, it starts with a comparison — CPU is at 95% right now, and this database normally sits at 60 to 70% during business hours, so something changed. The baseline is what turns a scary number into a useful fact.

## Segment 3 (steps: what a baseline captures)

A real baseline captures three things over at least a full business cycle: typical CPU or DTU utilization by hour and day, query duration percentiles — not just the average, since a slow tail hides inside a fine-looking mean — and the top wait types, which tell you whether this workload is normally I/O-bound, CPU-bound, or blocking-bound.

## Segment 4 (outro)

A baseline goes stale the moment the workload changes underneath it, so re-capture it after any major release or traffic shift. Next up: Azure Monitor, metrics, and alerts — turning that baseline into something that actually notifies you.
