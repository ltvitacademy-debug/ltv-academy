# Script — Trigger Rules

## Segment 1 (title)

Every task has a trigger_rule, whether you set it explicitly or not. The default is all_success — a task only runs once every one of its upstream tasks has succeeded. That's the exact rule that made last lesson's join task get skipped.

## Segment 2 (code: the fix)

For a task that should run after a branch, regardless of which branch was taken, none_failed_min_one_success is almost always the right rule — it only cares that nothing failed, and at least one upstream task actually succeeded.

## Segment 3 (screenshot: branch with trigger rule)

Same DAG, same branch outcome — one line added to join's definition, and it correctly shows Success instead of Skipped this time.

## Segment 4 (steps: other trigger rules)

Other trigger rules worth knowing: all_failed, one_success, and all_done — the natural choice for a cleanup step or summary notification that should run no matter what happened upstream, success or failure.

## Segment 5 (outro)

Next lesson: dynamic task mapping — generating a variable number of tasks at run time from a list, instead of hardcoding them.
