# Lesson 3 — Querying Active Sessions With DMVs

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 3 of 16**

## What you'll learn

- Step 1 of the investigation plan, for real: seeing what's actually running
- `sys.dm_exec_sessions`, `sys.dm_exec_connections`, and `sys.dm_exec_requests` together
- The real difference between a session that exists and a request that's actively executing
- What this step actually turns up for `OverlookClinicalDB` during the reported window

## Sessions vs. requests: not the same question

`sys.dm_exec_sessions` is one row per authenticated connection — every
application and user currently connected, whether or not they're
doing anything right this second. `sys.dm_exec_requests` is narrower
and more useful for "what's slow right now": one row per request that
is **actively executing** this instant. A session can exist for hours
with nothing in `sys.dm_exec_requests` for it at all; a request only
appears there while a batch is actually running.

## Who's connected, during the reported window

```sql
SELECT
    s.session_id,
    s.login_name,
    s.host_name,
    s.program_name,
    s.status,
    s.cpu_time,
    c.client_net_address
FROM sys.dm_exec_sessions AS s
LEFT JOIN sys.dm_exec_connections AS c
    ON s.session_id = c.session_id
WHERE s.is_user_process = 1
ORDER BY s.cpu_time DESC;
```

Filtering to `is_user_process = 1` drops SQL Server's own internal
system sessions, leaving only real client connections — the Billing
application, the Scheduling application, and anyone connected
directly through SSMS. `program_name` is the fastest way to tell
which department's traffic you're looking at without knowing every
login name by heart.

## What's actually executing right now

```sql
SELECT
    r.session_id,
    r.status,
    r.command,
    r.cpu_time,
    r.total_elapsed_time,
    r.wait_type,
    r.blocking_session_id,
    s.program_name
FROM sys.dm_exec_requests AS r
JOIN sys.dm_exec_sessions AS s ON r.session_id = s.session_id
WHERE r.session_id > 50
ORDER BY r.total_elapsed_time DESC;
```

`r.session_id > 50` excludes SQL Server's own internal system session
IDs, same purpose as `is_user_process = 1` above but for a DMV that
doesn't have that column. `blocking_session_id` is worth watching
closely here — a non-zero value means this request isn't actually
running slow on its own; it's **waiting** on another session, which
is a completely different problem from a genuinely slow query.

## Running this during the mid-morning window

Run both queries against `OverlookClinicalDB` during the window both
departments described. You'll see a realistic mid-morning picture:
several Billing sessions with `program_name` pointing at the billing
application, several Scheduling sessions pointing at the scheduling
application, and — this is the useful part — a handful of requests in
`sys.dm_exec_requests` with unusually high `total_elapsed_time`
relative to everything else connected. Those long-running requests
are exactly what Lesson 4 narrows down to specific queries.

## Key terms

| Term | Meaning |
|---|---|
| `sys.dm_exec_sessions` | One row per connected session, whether or not anything is actively running |
| `sys.dm_exec_requests` | One row per request actively executing right now |
| `is_user_process` | Filters `sys.dm_exec_sessions` down to real client connections |
| `blocking_session_id` | Non-zero means this request is waiting on another session, not genuinely slow on its own |

## Lab

Against your own `OverlookClinicalDB` (or a practice database with
similar tables), run both queries above during a busy window. Note
which `program_name` values show up, and record the `session_id` and
`total_elapsed_time` of the two or three longest-running requests —
you'll use those session IDs again in Lesson 4.

## Check yourself

You're ready for Lesson 4 when you can explain, without looking: why
does `sys.dm_exec_sessions` showing a connection tell you less than
`sys.dm_exec_requests` showing a request, and what does a non-zero
`blocking_session_id` tell you that `total_elapsed_time` alone
doesn't?
