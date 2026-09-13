# Lesson 27 — Monitoring & Logging

**Chapter 6 · Deploying & Monitoring Airflow · Lesson 27 of 30**

## What you'll learn

- Where to actually look first when checking on a production Airflow
  deployment
- How to read the Grid view's run history at a glance
- How to open a task's real log output, and what's actually in it
- What "monitoring" means day-to-day once a pipeline is running
  unattended

## Where to look first: the Grid view

Lesson 1 showed the DAG Overview's dashboard tab — the Grid tab is
where you actually spend most of your monitoring time. It's a
run-by-run, task-by-task history: every column is one DAG run, every
row is one task, and every cell is colored by that task's status on
that run.

![Airflow's DAG Overview Grid tab: a run-by-run, task-by-task grid of colored status cells (green success, red failed, etc.) with the task list down the left side and a run timeline across the top.](/courses/airflow/ch06/27-monitoring-and-logging/airflow-dag-overview-grid.png)
*Scanning left to right across one row shows a task's health over time — a row that's mostly green with one recent red cell tells a very different story than a row that fails every third run.*
Source: [Apache Airflow Documentation — UI Overview](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

This is the habit worth building: before digging into any one
failure, look at the Grid first. A single red cell in an otherwise
healthy row is a different problem than a row that's been failing
consistently — the Grid tells you which one you're dealing with in
about two seconds.

## Reading a task's actual log

Once you've spotted the task and run that needs attention, click into
that cell. Airflow opens the task instance's real log output — not a
summary, the actual text Python and Airflow produced during that run.

![Airflow's task instance Logs tab: real, timestamped log output for one task run, showing the task's actual stdout and Airflow's own execution messages.](/courses/airflow/ch06/27-monitoring-and-logging/airflow-task-instance-logs.png)
*Every line here is real output from that specific run — timestamps, Airflow's own status messages ("Starting attempt 1 of 1"), and anything your Python or Bash code printed. If a task raised an exception, the full traceback is in here.*
Source: [Apache Airflow Documentation — UI Overview](https://airflow.apache.org/docs/apache-airflow/stable/ui.html)

Two habits make this faster:

- **Read from the bottom up first.** The most recent lines are usually
  where the actual failure (an exception, a non-zero exit code) shows
  up — the setup noise is earlier in the log.
- **Look for your own print statements.** Anything your operator's
  Python function printed lands here too — if you added logging inside
  your own task code, this is where it shows up.

## What "monitoring" means day-to-day

Monitoring isn't a separate tool bolted onto Airflow — it's a habit
built entirely on the UI you already know:

1. Check the Grid across your important DAGs, at least once a day if
   nothing's alerting you (Lesson 25 covered actually alerting on
   failure so you don't have to check manually).
2. When a cell is red, open the log immediately rather than guessing.
3. Note whether a failure is isolated (one cell) or a pattern (a row
   trending red) — that distinction drives whether you fix a task or
   investigate something upstream.

## Key terms

| Term | Meaning |
|---|---|
| Grid view | The DAG Overview tab showing a run-by-run, task-by-task history as a colored grid |
| Task instance log | The real, timestamped text output — including any exception traceback — from one specific task run |
| Monitoring | The habit of regularly checking run health and reading logs when something fails, not a separate tool |

## Lab

1. Open the Grid tab for any DAG with a run history (an example DAG is
   fine) and identify, by color alone, whether any row shows a
   pattern of repeated failure vs. a single isolated one.
2. Click into one task instance's log (success or failure) and find
   the timestamp of the very first line and the very last line —
   confirm you can locate exactly how long that task ran.

## Check yourself

You're ready for Lesson 28 when you can explain, in one sentence, the
difference between what the Grid view tells you and what a task's log
tells you.
