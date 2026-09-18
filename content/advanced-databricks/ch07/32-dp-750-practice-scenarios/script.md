# Script — DP-750 Practice Scenarios

## Segment 1 (title)

DP-750 doesn't ask "what is a catalog binding" — it describes a situation and asks what you'd actually do. This lesson drills that scenario-reasoning skill, one situation from each of this course's six chapters.

## Segment 2 (code: Unity Catalog governance)

A finance team needs analysts to see aggregate revenue but never customer names on individual transactions. The wrong instinct is a second catalog just for masked data. The real answer is a column mask on the customer-name column, scoped to a group — one table, one source of truth, different views by role.

## Segment 3 (code: Auto Loader ingestion)

A pipeline ingesting millions of files a day across thousands of subdirectories times out doing directory listing on every run. That's exactly what file notification mode exists for — subscribing to cloud storage events instead of listing the tree every time.

## Segment 4 (code: Lakeflow pipelines)

A silver table needs to reject negative order totals but keep running instead of failing. That's an expectation with a drop-row action — expect-or-drop, not fail-update, which would halt the whole pipeline instead of just filtering.

## Segment 5 (code: Jobs orchestration)

A job has one task feeding two independent tasks that both feed a final task. That's a dependency graph, not a straight line — the two middle tasks run in parallel, and the final task depends on both of them finishing.

## Segment 6 (code: performance tuning)

A big join runs fine on most partitions but crawls on a handful. That's data skew. Adaptive Query Execution can detect and split those skewed partitions automatically, and can broadcast the small dimension table on its own too.

## Segment 7 (code: security)

A pipeline needs a database password without hard-coding it in a notebook anyone can open. That's secrets management — store it in a secret scope, reference it at runtime, and it never shows up in notebook output or history.

## Segment 8 (outro)

Six scenarios, six chapters, one pattern: a constraint that rules out the obvious wrong answer, and one feature that fits precisely. Next up: the capstone that ties all of it together into one real pipeline.
