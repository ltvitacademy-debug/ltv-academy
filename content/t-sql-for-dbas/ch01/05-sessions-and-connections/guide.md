# Sessions & Connections

"Who's connected to this server, and what are they running?" is one of the first questions a
DBA asks during a slowdown. Two DMVs answer it directly: `sys.dm_exec_sessions` and
`sys.dm_exec_connections`. This lesson closes out Chapter 1 by putting the catalog views and
DMVs from the last three lessons together into one real diagnostic query.

## What you'll learn

- `sys.dm_exec_sessions` — one row per logged-in session, login name, host, program
- `sys.dm_exec_connections` — one row per physical network connection
- How to join sessions to connections to requests for a full picture of "who, from where,
  running what"
- The difference between a session and a connection

## sys.dm_exec_sessions: who's logged in

```sql
SELECT session_id, login_name, host_name, program_name,
       status, login_time, last_request_end_time
FROM sys.dm_exec_sessions
WHERE is_user_process = 1;
```

`is_user_process = 1` filters out SQL Server's own internal background sessions, leaving only
real client connections. `status` shows `running`, `sleeping`, or `dormant` — a session can be
logged in and idle without actively running anything.

## sys.dm_exec_connections: how they're connected

```sql
SELECT session_id, client_net_address, local_net_address,
       connect_time, protocol_type, auth_scheme
FROM sys.dm_exec_connections;
```

A session and a connection aren't quite the same thing: `sys.dm_exec_connections` is about the
network-level link (client IP, protocol, when it connected), while `sys.dm_exec_sessions` is
about the logical login session running on top of it. Most of the time there's a 1:1 match, but
it's still two different DMVs answering two different questions.

## Putting it together: who's connected, from where, running what

```sql
SELECT s.session_id, s.login_name, s.host_name, s.program_name,
       c.client_net_address, s.status,
       r.command, r.wait_type, r.total_elapsed_time
FROM sys.dm_exec_sessions AS s
JOIN sys.dm_exec_connections AS c ON c.session_id = s.session_id
LEFT JOIN sys.dm_exec_requests AS r ON r.session_id = s.session_id
WHERE s.is_user_process = 1
ORDER BY s.login_time;
```

The `LEFT JOIN` to `sys.dm_exec_requests` matters: a session with nothing currently executing
simply won't have a matching request row, and `LEFT JOIN` keeps it in the results anyway
instead of silently dropping it.

## Key terms

| Term | Meaning |
|---|---|
| Session | A logical login context — `sys.dm_exec_sessions`, one row per logged-in user session |
| Connection | The underlying network link — `sys.dm_exec_connections`, one row per physical connection |
| `is_user_process` | A flag distinguishing real client sessions from SQL Server's internal background sessions |

## Check yourself

Why is a `LEFT JOIN` (not an inner `JOIN`) the right choice when joining
`sys.dm_exec_sessions` to `sys.dm_exec_requests`?
