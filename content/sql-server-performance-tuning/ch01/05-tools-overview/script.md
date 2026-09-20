# Script — Tools Overview

## Segment 1 (title)

Every step of the workflow leans on specific tools. None of them does the thinking for you — they surface data; the workflow is what turns that data into a fix.

## Segment 2 (steps: four real sources)

SSMS's plan viewer shows what the optimizer actually decided to do. Query Store tracks history and regressions over time. Extended Events captures fine-grained detail at low overhead. DMVs are always on, queryable directly with T-SQL.

## Segment 3 (code: Extended Events)

Extended Events is the modern, lightweight successor to Profiler. This session captures every statement that runs over one second, without the overhead of the old trace GUI — safe to leave running in production.

## Segment 4 (code: third-party tools, honestly)

Third-party monitoring tools add continuous dashboards, alerting, and a friendlier UI over the same underlying data. What they don't add is the tuning itself, or an understanding of why a query is slow in the first place.

## Segment 5 (outro)

That's the full toolkit this course builds on. Next up: Chapter 2 starts with reading execution plans properly, in depth — where the time in a query actually goes.
