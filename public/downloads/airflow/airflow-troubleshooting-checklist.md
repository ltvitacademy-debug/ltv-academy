# Airflow Troubleshooting Checklist

Work through these four steps **in order**, not at random, every time a
task shows red.

## The four steps

1. **Read the actual error in the log first.** Most failures name
   themselves — a `KeyError`, a connection timeout, a
   `ProgrammingError`, a `FileNotFoundError`. Read what Airflow already
   told you before doing anything else.
2. **Check upstream task status.** If a task failed because its
   upstream never produced the file, row, or connection it expected, the
   bug isn't in the task that's red — it's further back in the DAG.
   Trigger rules determine whether a task even runs when upstream fails
   or is skipped, so confirm what actually happened upstream before
   assuming the failing task itself is broken.
3. **Check Connections** if the error mentions a database, API, or any
   external system. Open Admin > Connections and confirm the `conn_id`
   the task references actually exists in this environment, and that
   its fields (host, login, password, Extra) are current — a huge share
   of "it worked yesterday" failures are an expired or rotated
   credential, a changed hostname, or a Connection that was never
   configured in this specific environment at all.
4. **Classify: code bug or environment issue.** Use the signal table
   below.

## Code bug vs. environment issue

| Signal | Points to |
|---|---|
| Fails identically every time, same input, same place | Code bug — fix the DAG |
| Works locally, fails in the deployed environment only | Environment — check Connections, packages, permissions |
| Started failing after nothing in the DAG code changed | Environment — something external changed (credential, upstream schema, network) |
| Fails on some runs but not others with identical inputs | Often a race condition, a timeout, or a genuinely flaky upstream dependency |

## Incident note template

Fill this in the moment you've finished Step 4 — before you forget any
of the details that got you there.

```text
What broke: <dag_id>.<task_id>, <N> retries, <time range>.

Root cause: <one or two sentences — what Step 1's log actually said,
and what Step 3's Connections check (or Step 2's upstream check)
confirmed>.

Classification: code bug / environment issue (circle one).

Fix applied: <what was actually changed, and how it was verified
before clearing the task — not just "updated the password">.

Follow-up: <what prevents this specific failure from recurring —
a runbook update, a monitoring alert, a code fix merged>.
```
