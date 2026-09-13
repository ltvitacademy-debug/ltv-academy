# Script — Monitoring & Logging

## Segment 1 (title)

Monitoring isn't a separate tool bolted onto Airflow — it's a habit built entirely on the UI you already know. Where you actually look first is the Grid view, and where you look next is a task's real log.

## Segment 2 (screenshot: Grid view)

The Grid tab is a run-by-run, task-by-task history — every column is one run, every row is one task, colored by status. Scanning one row left to right shows a task's health over time: a single red cell in an otherwise healthy row is a very different problem than a row failing every third run.

## Segment 3 (screenshot: task instance logs)

Click into any cell and Airflow opens that task instance's real log — not a summary, the actual text produced during that run, including any exception traceback. Read from the bottom up first; that's usually where the real failure shows up.

## Segment 4 (steps: monitoring as a habit)

Check the Grid across your important DAGs regularly. When a cell is red, open the log immediately rather than guessing. Note whether a failure is isolated or a pattern — that distinction drives whether you fix one task or investigate something upstream.

## Segment 5 (outro)

Next lesson: troubleshooting failed DAGs — a real diagnostic methodology for when a task fails and you need to know why.
