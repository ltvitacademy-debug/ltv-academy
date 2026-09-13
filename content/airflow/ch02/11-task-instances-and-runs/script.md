# Script — Task Instances & DAG Runs

## Segment 1 (title)

Three genuinely different things: a DAG is the definition, the Python file — it doesn't run by itself. A DAG Run is one specific execution, tied to one logical date. A Task Instance is one specific task within one specific DAG Run — the same task has a different instance for every run it's ever been part of.

## Segment 2 (screenshot: task instances table)

Clicking into one task and choosing its Task Instances view shows every run that task has ever been part of, side by side. Same task, seven different Task Instances — some Upstream Failed, most Success, each row a genuinely separate execution record.

## Segment 3 (steps: try number)

Try Number matters here — several rows show 1, meaning that instance succeeded on its first attempt. A retries setting would show a higher number after Airflow automatically re-attempted a failed task.

## Segment 4 (steps: upstream failed vs failed)

Upstream Failed isn't the same as Failed. The task itself never ran at all, because something it depends on failed first. Airflow correctly records that the task was skipped, not that it was attempted and crashed.

## Segment 5 (outro)

Next lesson: XComs — how tasks actually pass small pieces of data to each other.
