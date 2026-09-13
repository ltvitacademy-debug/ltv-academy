# Script — Troubleshooting Failed DAGs

## Segment 1 (title)

A task is red, and you need to know why, in order — not by randomly re-running things. This is a real, repeatable diagnostic checklist for any failed task.

## Segment 2 (steps: the checklist)

Read the actual error in the log first — most failures name themselves. Check upstream task status, since a task can fail because its upstream never produced what it expected. Check Connections if the error mentions a database or API. Then decide: does this reproduce every time anywhere, meaning a code bug, or only in one environment, meaning something external.

## Segment 3 (screenshot: Admin Connections)

Airflow's Admin, Connections screen lists every connection configured in this environment. If a task's error mentions a connection ID that isn't in this list, or points at the wrong host, that's the failure — not a bug in the task's Python code. Checking this screen takes ten seconds and rules out an entire category of failure.

## Segment 4 (steps: code bug vs environment)

A code bug fails identically every time, same input, same place — fix the DAG. An environment issue works locally but fails only in the deployed environment, or started failing after nothing in the DAG code changed — check Connections, packages, and permissions.

## Segment 5 (outro)

Next up: the capstone — a real, multi-task DAG pulling together everything from this entire course.
