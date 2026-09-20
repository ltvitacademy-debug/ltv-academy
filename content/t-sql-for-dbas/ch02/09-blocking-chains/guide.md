# Finding Blocking Chains

Lesson 8 flagged `LCK_M_*` waits as the signature of blocking. This lesson turns that
signal into an actual answer: which session is blocking which, how deep the chain runs,
and which session sits at the very root of it — the one actually holding the lock
everyone else is waiting on.

## What you'll learn

- `sys.dm_exec_requests.blocking_session_id` — the single column that exposes blocking
- Writing a query that lists every blocked session and its blocker in one pass
- Walking a blocking chain back to its root session
- Why the root blocker is sometimes not blocked by anything at all — it's just slow

## The one column that matters

`sys.dm_exec_requests` (introduced in Lesson 5) carries a `blocking_session_id` column.
It's `0` when a request isn't waiting on another session, and a real session ID when it
is:

```sql
SELECT r.session_id       AS blocked_session,
       r.blocking_session_id,
       r.wait_type,
       r.wait_time,
       r.wait_resource
FROM sys.dm_exec_requests AS r
WHERE r.blocking_session_id <> 0;
```

Every row here is a session actively stuck waiting on another one. `wait_resource`
identifies exactly what's being contended for — a key, a page, or an object — and
`wait_time` (in milliseconds) tells you how long it's already been stuck.

## Pulling in the query text on both sides

A blocked-session list is more useful once you can see what both sides are actually
running:

```sql
SELECT r.session_id       AS blocked_session,
       r.blocking_session_id,
       r.wait_type, r.wait_time,
       t.text AS blocked_query_text
FROM sys.dm_exec_requests AS r
CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) AS t
WHERE r.blocking_session_id <> 0;
```

Run the same query filtered to `session_id = <blocking_session_id>` and you can see the
blocker's query too — but a busy server can have chains several sessions deep, where a
blocker is itself being blocked by yet another session.

## Walking the chain to its root

To find the root of a chain rather than just one link in it, follow
`blocking_session_id` back recursively:

```sql
;WITH chain AS (
    SELECT session_id, blocking_session_id, 0 AS depth
    FROM sys.dm_exec_requests
    WHERE blocking_session_id <> 0
    UNION ALL
    SELECT r.session_id, r.blocking_session_id, c.depth + 1
    FROM sys.dm_exec_requests AS r
    JOIN chain AS c ON r.session_id = c.blocking_session_id
    WHERE r.blocking_session_id <> 0
)
SELECT * FROM chain ORDER BY depth DESC;
```

The session with the highest `depth` in its own right, that has no further blocker
above it, is the root — the one actually holding the lock. Everything else in the chain
is waiting, directly or indirectly, on that one session finishing or releasing.

## The root blocker isn't always "blocked"

The root session at the top of a chain often has `blocking_session_id = 0` itself — it
isn't waiting on anyone. It's simply running a long transaction (a big update, an
unindexed scan inside an explicit `BEGIN TRAN`, an app that opened a transaction and
went idle) that's holding locks everyone downstream needs. Finding that session is the
entire point of the exercise: killing or waiting on the wrong session in the middle of
the chain does nothing, because its blocker is still blocked upstream.

## Key terms

| Term | Meaning |
|---|---|
| `blocking_session_id` | Column on `sys.dm_exec_requests`; the session ID currently holding the lock a request is waiting on, or `0` if none |
| Blocking chain | A sequence of sessions each waiting on the next, ending at a root session that holds the actual lock |
| `wait_resource` | Identifies the specific object, page, or key a blocked request is waiting to acquire a lock on |

## Check yourself

In a blocking chain three sessions deep, why does killing the middle session usually
not fix the problem for the session at the front of the chain?
