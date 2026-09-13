# Script — Branching

## Segment 1 (title)

Every task you've built so far runs every time its dependencies are met. Branching breaks that assumption on purpose — a branch task decides, at run time, which of several downstream paths should actually execute, and the rest are deliberately skipped.

## Segment 2 (screenshot: branch without trigger)

A branch task's decision is completely visible in the UI — the chosen path shows real states, the unchosen path shows skipped. Skipped isn't a failure — it's Airflow correctly recording that this path was never meant to run on this particular DAG Run.

## Segment 3 (steps: why join gets skipped too)

Notice the join task at the end is also skipped, even though its branch_a path succeeded. By default, a task only runs once all of its upstream tasks succeed — and since branch_false was skipped, not succeeded, join's default trigger rule treats that as not all upstream tasks succeeded.

## Segment 4 (steps: the preview)

This is genuinely surprising the first time you see it, and it's exactly why Trigger Rules exist — the fix is one parameter away, covered next lesson.

## Segment 5 (outro)

Next lesson: trigger rules — controlling exactly when a task runs relative to its upstream tasks' outcomes.
