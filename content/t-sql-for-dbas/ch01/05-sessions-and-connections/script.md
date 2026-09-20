# Script — Sessions & Connections

## Segment 1 (title)

Who's connected to this server, and what are they running — that's one of the first questions a DBA asks during a slowdown. Two DMVs answer it directly: sys.dm_exec_sessions and sys.dm_exec_connections.

## Segment 2 (code: sessions)

Sys.dm_exec_sessions returns one row per logged-in session — login name, host, program name, status. Filtering is_user_process equals 1 strips out SQL Server's own internal background sessions, leaving only real client connections.

## Segment 3 (code: putting it together)

A session and a connection aren't quite the same thing — connections are the network-level link, sessions are the logical login on top of it. Join sessions to connections to requests with a left join, and you get who's connected, from where, and what they're currently running.

## Segment 4 (steps: session vs connection)

Three pieces make up the full picture: sys.dm_exec_sessions for who's logged in, sys.dm_exec_connections for the network-level link they're using, and sys.dm_exec_requests, left-joined, for whatever they're currently executing, if anything.

## Segment 5 (outro)

That join — sessions, connections, and requests — is the exact pattern Chapter 2 builds on for real-time monitoring. Next up: monitoring CPU, memory, and I/O with T-SQL.
