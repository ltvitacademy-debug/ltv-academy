# Lesson 42 — Extended Events

**Chapter 7 · Monitoring Azure SQL · Lesson 42 of 95**

## What you'll learn

- What Extended Events (XEvents) is, and why it replaced SQL Trace/Profiler
- The session model: events, actions, predicates, and targets
- How to build a session with the New Session wizard in SSMS
- How to read back captured data with T-SQL once a session is running

## Why Extended Events exists

SQL Trace and its GUI front end, SQL Server Profiler, are **deprecated**
— Microsoft has said for years that a future version will remove them
entirely, and they've already been pulled from newer tooling. Extended
Events (often shortened to **XEvents**) is the lightweight tracing
system that replaced them: same basic idea — capture specific things
that happen inside the engine as they happen — but with dramatically
lower overhead, because it only captures the events and data fields you
actually ask for, instead of Profiler's comparatively heavy, chatty
default footprint.

## The session model

An Extended Events **session** is built from four pieces:

| Piece | What it does |
|---|---|
| Event | The specific thing you want to capture — e.g. `sql_statement_completed`, `login_failed`, `error_reported` |
| Action | Extra context attached to a captured event — e.g. capture the session ID or client hostname alongside every event |
| Predicate | A filter so you only capture events matching a condition — e.g. only statements taking longer than 500ms |
| Target | Where captured data goes — a ring buffer in memory, or an `.xel` file on disk for later analysis |

You build a session once, start it, and it runs in the background with
minimal impact on the workload it's watching — which is the entire point
versus Profiler's older, heavier trace mechanism.

## Building a session with the New Session wizard

SSMS's New Session wizard walks you through exactly the session model
above, visually.

![Choosing events to capture in the New Session wizard](/courses/azure-dba/ch07/42-extended-events/xevents-session-new-session-selected-events.png)
*Selecting which events (e.g. query execution, errors, logins) this session captures — only the events you pick add any overhead.*

After picking events, the wizard moves to where the captured data
actually goes:

![Configuring the session's data storage target](/courses/azure-dba/ch07/42-extended-events/xevents-session-new-session-data-storage.png)
*Choosing the target — save to an event file on disk for a durable, reviewable capture, or keep it in-memory only for a short live look.*

Saving to a file is the right choice when you need to walk away and come
back to the results, or hand them to someone else; an in-memory-only
target disappears when the session stops.

## Reading captured data back with T-SQL

Once a session has been running and writing to a file target, you don't
need the SSMS UI to read the results — a table-valued function reads the
`.xel` file directly:

```sql
SELECT
    object_name,
    CAST(event_data AS XML) AS event_xml
FROM sys.fn_xe_file_target_read_file(
    'S:\XEvents\slow_queries*.xel', NULL, NULL, NULL
);
```

`sys.fn_xe_file_target_read_file` returns each captured event as XML,
which you can then shred with standard XML querying to pull out specific
fields like duration or the statement text — the same session you built
visually in the wizard, read back in plain T-SQL.

## Key terms

| Term | Meaning |
|---|---|
| Extended Events (XEvents) | SQL Server's lightweight, low-overhead event-capture and tracing system |
| Session | A configured set of events, actions, predicates, and a target that XEvents runs |
| Target | Where a session's captured data is written — ring buffer (memory) or event file (disk) |

## Check yourself

You're ready for Lesson 43 when you can explain: why is Extended Events
lower-overhead than SQL Trace/Profiler, and what are the four pieces that
make up an Extended Events session?
