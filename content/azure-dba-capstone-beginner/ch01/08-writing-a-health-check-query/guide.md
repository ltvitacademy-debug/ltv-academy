# Lesson 8 — Writing a Basic Health-Check Query

**Chapter 1 · Beginner Capstone: The First Backup Plan · Lesson 8 of 10**

## What you'll learn

- Why "is the database healthy right now" deserves its own simple, repeatable check
- A real DMV-based query confirming who's actually connected to Overlook's database
- Confirming the backup chain is current, using the same signal from Lessons 4-6
- Why this check belongs in the runbook, not just in your head

## A different kind of check than Lesson 7's restore test

Lesson 7 proved the backup-and-restore mechanism works. This lesson is
smaller and faster: a quick, repeatable query a DBA (or anyone covering for
one) can run to get a snapshot answer to "is this database okay right
now" — without waiting for an incident to find out.

## Who's actually connected: `sys.dm_exec_sessions`

```sql
SELECT
    s.session_id,
    s.login_name,
    s.host_name,
    s.program_name,
    s.status,
    s.cpu_time,
    s.memory_usage
FROM sys.dm_exec_sessions AS s
WHERE s.is_user_process = 1
ORDER BY s.cpu_time DESC;
```

`sys.dm_exec_sessions` is a real-time dynamic management view — one row per
authenticated session, showing who's logged in, from where, and how much
CPU and memory that session has used. Filtering to `is_user_process = 1`
drops SQL Server's own internal system sessions, so you're only looking at
real client activity: the scheduling app, the billing app, and anyone
connected directly through SSMS or Azure Data Studio.

For a quick health check, this answers two practical questions at a
glance: is anything actually connected (a database with zero sessions
during business hours might itself be a sign something's wrong upstream),
and does anything look abnormal — an unexpectedly high session count, or
one session consuming far more CPU than the rest.

## Confirming the backup chain is current

The second half of a basic health check reuses the signal from Lessons 4
through 6 — confirming the automated backup chain is actually current, not
just assumed to be:

```
az sql db show \
  --name db-overlook-core \
  --resource-group rg-overlook-dba-capstone \
  --server sql-overlook-capstone \
  --query earliestRestoreDate
```

A healthy database shows a recent, moving `earliestRestoreDate` and a
**Restore** dialog in the Portal that reflects a current retention window.
If that value looks stale or missing, that's the first sign something's
wrong with the backup chain underneath the database — worth investigating
long before it becomes Lesson 1's scenario all over again.

## Why a "basic" check, not a monitoring dashboard

This capstone deliberately doesn't build an alerting pipeline or a
dashboard — that's real, valuable work, but it's a different project from
what Priya asked for in Lesson 1. What this lesson produces is something
smaller and more honest: one query and one CLI command, simple enough that
any team member can run them in thirty seconds, any time they want a
sanity check before or after touching the database.

## Why this belongs in the runbook

A health check that only exists as something you remember to run isn't
reliable. Lesson 9's runbook is where this query and command get written
down as a named, repeatable step — "before making any change to
`db-overlook-core`, run the health check" — so the practice survives beyond
whoever happens to be on the team this month.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_exec_sessions` | A DMV returning one row per authenticated session — who's connected, from where, and resource usage |
| `is_user_process` | A column on `sys.dm_exec_sessions` that filters out SQL Server's own internal system sessions |
| Health check | A quick, repeatable query confirming current status — distinct from a full monitoring/alerting system |

## Lab

Run the `sys.dm_exec_sessions` query against your Lesson 3 database and the
`earliestRestoreDate` check from Lesson 4. Write down what a "normal"
result looks like for each — you'll need that baseline for Lesson 9's
runbook.

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: what does
filtering `sys.dm_exec_sessions` by `is_user_process = 1` accomplish, and
why does this lesson deliberately stop at a simple two-part check instead
of building a full monitoring dashboard?
