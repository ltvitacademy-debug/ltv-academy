# Lesson 28 — Troubleshooting Failed DAGs

**Chapter 6 · Deploying & Monitoring Airflow · Lesson 28 of 30**

## What you'll learn

- A real, repeatable diagnostic checklist for a failed task, instead
  of randomly re-running things
- How to tell a code bug apart from an environment issue
- Why checking upstream task status comes before assuming the failing
  task itself is broken
- How Connections fit into troubleshooting, not just setup

## A real diagnostic checklist

Every lesson in this chapter has been building toward this one moment
— a task is red, and you need to know why, in order. Work through
these in sequence, not at random:

1. **Read the actual error in the log first** (Lesson 27). Most
   failures name themselves — a `KeyError`, a connection timeout, a
   `FileNotFoundError` — before you do anything else, read what
   Airflow already told you.
2. **Check upstream task status.** If a task failed because its
   upstream never produced the file or row it expected, the bug isn't
   in the task that's red — it's further back in the DAG. Trigger
   rules (Lesson 19) determine whether a task even runs when upstream
   fails, so confirm what actually happened before that task started.
3. **Check Connections** if the error mentions a database, API, or any
   external system. A huge share of "it worked yesterday" failures are
   an expired credential, a changed hostname, or a Connection that was
   never actually configured in this environment.
4. **Decide: code bug or environment issue.** A code bug reproduces
   every time, anywhere, with the same input — an environment issue
   (a missing package, a different Connection, a permissions
   difference) often only shows up in one specific deployment.

## Checking Connections

Lesson 13 covered setting up Connections; troubleshooting is where
that setup gets tested for real. Airflow's Admin > Connections screen
lists every Connection configured in this environment:

![Airflow's Admin > Connections screen: a table listing every configured connection by Conn Id, Conn Type, and Description, with edit and delete actions per row.](/courses/airflow/ch06/28-troubleshooting-failed-dags/airflow-admin-connections.png)
*If a task's error mentions a connection ID that isn't in this list at all — or is there but points at the wrong host — that's the failure, not a bug in the task's Python code.*
Source: [Apache Airflow Documentation](https://airflow.apache.org/docs/apache-airflow/stable/administration-and-deployment/connections.html)

This is a genuinely common failure mode: a DAG that works perfectly
in one environment fails in another purely because the Connection ID
it references was never created there. Checking this screen takes ten
seconds and rules out (or confirms) an entire category of failure.

## Code bug vs. environment issue

| Signal | Points to |
|---|---|
| Fails identically every time, same input, same place | Code bug — fix the DAG |
| Works locally, fails in the deployed environment only | Environment — check Connections, packages, permissions |
| Started failing after nothing in the DAG code changed | Environment — something external changed (credential, upstream schema, network) |
| Fails on some runs but not others with identical inputs | Often a race condition, a timeout, or a genuinely flaky upstream dependency |

## Key terms

| Term | Meaning |
|---|---|
| Diagnostic checklist | Read the error, check upstream status, check Connections, then classify code vs. environment — in that order |
| Code bug | A failure that reproduces identically regardless of environment |
| Environment issue | A failure caused by something outside the DAG's code — a Connection, a package, a permission |

## Lab

1. For a task that fails with a database connection timeout, walk
   through all four checklist steps out loud, in order, and state what
   you'd check at each one.
2. For a task that fails only in production but works locally, name
   the two or three most likely environment differences you'd check
   first.

## Check yourself

You're ready for the capstone when you can walk through this entire
four-step checklist from memory, in order, for any failed task —
without looking anything up.
