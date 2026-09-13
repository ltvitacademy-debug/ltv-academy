# Script — Capstone: Dimensional Model, Streams/Tasks & RBAC

## Segment 1 (title)

Milestone two: your staging tables become a real star schema, that schema stays current automatically through Streams and Tasks, and the whole thing is secured with roles that actually reflect who should touch what.

## Segment 2 (code: surrogate key + fact table)

At least one dimension needs a real surrogate key and SCD Type 2 history — the piece that separates a genuine dimensional model from just renaming your staging tables. The fact table joins to dimensions on the surrogate key, never the natural key, which is exactly what makes that history possible without rewriting fact rows.

## Segment 3 (code: stream and task)

A Stream on staging, feeding a Task that merges into the fact table — the Chapter 8 pattern, pointed at your own tables. The WHEN STREAM_HAS_DATA clause is what keeps it cheap: the task wakes up on schedule but skips the merge entirely when nothing changed.

## Segment 4 (code: RBAC)

At least two roles, with grants that reflect what each one actually needs. A loader role that can write to raw and staging. An analyst role that can only read the warehouse layer — no grant on raw at all. That absence is the point.

## Segment 5 (steps: verify, don't assume)

Confirm the star schema is populated by a real incremental run in task history, not a one-time manual load. Confirm the analyst role's boundary with SHOW GRANTS, not a guess about what you think you configured.

## Segment 6 (outro)

Next lesson: the final milestone — performance tuning, connecting Power BI, and presenting this whole project. It's the last lesson of the entire course.
