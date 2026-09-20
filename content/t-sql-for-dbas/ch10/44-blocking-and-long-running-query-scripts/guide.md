# Blocking & Long-Running Query Scripts

This is the script you run the moment someone says "the database is slow" — before you
ask any follow-up questions. It combines blocking chain detection (`sys.dm_exec_requests`'s
`blocking_session_id` column, from Lesson 9) with the expensive-active-query ranking from
Lesson 7. One tells you who's stuck waiting on whom; the other tells you what's actually
burning CPU and I/O right now. Together they cover the two most common reasons a database
"feels slow": something's blocked, or something's just genuinely expensive.

## What you'll learn

- Finding every blocked session and its immediate blocker in one query
- Identifying the head of a blocking chain, not just its victims
- Ranking currently running requests by resource cost, with query text attached
- Why both checks belong in the same incident-response script

## Section 1: blocking chains

`blocking_session_id` is `0` when a request isn't blocked, and the session ID of its
blocker when it is. Because a blocker can itself be blocked by someone else, chains form —
the query below returns every blocked session and its immediate blocker in one pass.

```sql
-- =====================================================================
-- Script:         blocking-and-long-running-queries.sql
-- Purpose:        Incident-response snapshot: every blocking chain right
--                 now, plus the currently running requests burning the
--                 most CPU or I/O.
-- Usage:          Run as-is, any time, on any instance. Read-only —
--                 safe to run against production without a guard.
-- Last verified:  SQL Server 2019 / 2022, September 2026
-- =====================================================================

-- Section 1: who is blocking whom, right now
SELECT
    r.session_id        AS blocked_session,
    r.blocking_session_id AS blocked_by,
    r.wait_type,
    r.wait_time,
    r.wait_resource,
    t.text AS blocked_sql
FROM sys.dm_exec_requests AS r
CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) AS t
WHERE r.blocking_session_id <> 0
ORDER BY r.wait_time DESC;
```

An empty result set here is good news: it means nothing is currently blocked. A result
set with the same `blocked_by` value repeated across many rows is the head of a chain
worth investigating first — everyone else in the list is just waiting behind it.

## Section 2: finding the head of the chain

The query above shows every link in a chain, but not which session is the *root cause*.
The head is a session that appears in `blocked_by` but never appears in `blocked_session`
— it's blocking others while not being blocked itself.

```sql
-- Section 2: the head of each chain — blocking others, not itself blocked
SELECT DISTINCT r.blocking_session_id AS head_of_chain
FROM sys.dm_exec_requests AS r
WHERE r.blocking_session_id <> 0
  AND r.blocking_session_id NOT IN (
        SELECT session_id FROM sys.dm_exec_requests WHERE blocking_session_id <> 0
      );
```

That's the session ID to look at first — its current statement, its open transaction, and
whether it's just slow or genuinely stuck. Killing a session further down the chain does
nothing; everyone behind the head is still waiting on the head, not on each other.

## Section 3: expensive active queries

Independent of blocking, a query can simply be expensive — high CPU, high logical reads,
running long — with nobody waiting on it at all. This is the ranking query from Lesson 7,
unchanged, sitting in the same script because "what's slow" and "what's blocked" are two
different questions that both come up in the same incident.

```sql
-- Section 3: what's actually expensive right now
SELECT
    r.session_id, r.status, r.cpu_time, r.logical_reads,
    r.total_elapsed_time, r.wait_type, r.blocking_session_id,
    t.text AS query_text
FROM sys.dm_exec_requests AS r
CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) AS t
WHERE r.session_id <> @@SPID
ORDER BY r.cpu_time DESC;
```

`blocking_session_id` is carried into this section too — a row here with a non-zero value
is both expensive *and* blocked, which is usually the single most important row in the
entire output.

## Reading it as one incident-response pass

Run in order: is anything blocked, what's the root cause if so, and what's expensive
regardless of blocking. A DBA who opens this script the moment a slowness ticket comes in,
instead of building three separate queries from memory under pressure, gets to an answer
in the time it takes to read three result sets.

## Key terms

| Term | Meaning |
|---|---|
| `blocking_session_id` | Column in `sys.dm_exec_requests` naming the session blocking the current request, or `0` if not blocked |
| Head of a chain | The session blocking others while not itself being blocked — the actual root cause to investigate |
| Incident-response script | A toolkit script designed to be run first, unmodified, the moment a problem is reported |

## Check yourself

In a blocking chain of five sessions, why does killing the session at the *end* of the
chain fail to fix the problem, while killing the *head* usually resolves it immediately?
