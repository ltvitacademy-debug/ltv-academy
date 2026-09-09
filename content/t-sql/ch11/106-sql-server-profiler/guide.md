# Lesson 106 — SQL Server Profiler

**Chapter 11 · Database Design Fundamentals · Lesson 12 of 12**

## What you'll learn

- What SQL Server Profiler actually does, and how it differs from
  everything in Chapter 10
- What a trace captures, event by event
- Why Microsoft has deprecated it, and what replaces it
- When you'd still reach for this style of tool at all

## What Profiler does differently

Every performance tool from Chapter 10 — the execution plan (Lesson 90),
`STATISTICS TIME`/`IO` (Lesson 91) — analyzes **one query you already
picked**, one at a time. **SQL Server Profiler** does the opposite: it
watches the **entire server**, capturing every query from every session,
in real time, as a **trace** — useful for exactly the situation those other
tools can't help with: "something on this server is slow, and I don't
even know which query is causing it yet."

## What a trace event captures

Each row in a Profiler trace is one event — a query starting, finishing, a
login connecting — with columns like:

| Column | What it tells you |
|---|---|
| TextData | The actual T-SQL statement that ran |
| Duration | How long it took, in milliseconds |
| CPU | Processor time consumed |
| Reads / Writes | Logical reads and writes — the same concept as Lesson 91 |
| LoginName | Who ran it |
| DatabaseName | Which database it ran against |

That's Chapter 10's per-query metrics, but captured passively for
**everything hitting the server**, instead of one query you deliberately
wrapped in `SET STATISTICS` yourself.

## Why it's deprecated

Microsoft has officially deprecated SQL Server Profiler and the underlying
SQL Trace feature — the same fate as Lesson 92's `SET STATISTICS PROFILE`.
The modern replacement is **Extended Events**, a lighter-weight tracing
engine with far less server overhead, accessible in SSMS through the
**XEvent Profiler** (right-click a server in Object Explorer → *Start PAG
XEvent Trace* / *XEvent Profiler*).

```sql
-- The modern replacement's flavor, conceptually (Extended Events session)
CREATE EVENT SESSION Lesson106Trace ON SERVER
ADD EVENT sqlserver.sql_statement_completed
ADD TARGET package0.event_file (SET filename = N'Lesson106Trace.xel');

ALTER EVENT SESSION Lesson106Trace ON SERVER STATE = START;
-- ... run some queries ...
ALTER EVENT SESSION Lesson106Trace ON SERVER STATE = STOP;
DROP EVENT SESSION Lesson106Trace ON SERVER;
```

## When you'd still reach for this style of tool

Whenever a problem is server-wide and undiagnosed rather than query-specific
— "the whole application feels slow right now" — a trace (via XEvent
Profiler today, or legacy Profiler on an older instance) is how you narrow
"something, somewhere" down to the one specific statement worth running
through Chapter 10's tools.

## Key terms

| Term | Meaning |
|---|---|
| Trace | A recorded log of server events, captured live across all sessions |
| SQL Server Profiler | The deprecated GUI tool for creating and viewing traces |
| Extended Events | The modern, lower-overhead replacement tracing engine |
| XEvent Profiler | SSMS's built-in, ready-made Extended Events trace, replacing Profiler's default view |

## Lab

In SSMS, right-click your server in Object Explorer and choose
**Start PAG XEvent Trace** (or **XEvent Profiler** in recent SSMS
versions) to see a live, modern trace running against your own session —
notice how closely its columns match the classic Profiler trace columns
above.

## Check yourself

You've completed Chapter 11 when you can explain, without looking: what
does a trace capture that Chapter 10's per-query tools can't, and what's
the modern replacement for SQL Server Profiler?
