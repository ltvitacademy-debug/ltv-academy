# Script — Locks & Blocking

## Segment 1 (title)

Locking is how SQL Server keeps transactions from stepping on each other. Blocking is what happens when one session's lock stands in the way of another. A little blocking is normal. A chain that lasts minutes is a production incident.

## Segment 2 (code: sys.dm_tran_locks)

sys.dm_tran_locks lists every lock currently held or waiting on the instance. Request_status is the key column — GRANT means the session has the lock, WAIT means it's queued behind someone else.

## Segment 3 (steps: lock modes)

You'll see four modes day to day. S is a shared read lock, compatible with other reads. X is exclusive, compatible with nothing. U is an update lock, held while deciding whether to escalate. And intent locks — IS and IX — get placed at the table level so SQL Server doesn't have to scan every row to check for conflicts.

## Segment 4 (code: tracing the chain)

Sys.dm_exec_requests has a blocking_session_id column. Join it to sql text and you get every blocked session, who's blocking it, and what it's waiting on — in one query. Find the session that's blocking everyone but isn't itself blocked, and that's your root cause.

## Segment 5 (outro)

Everyone behind the head of the chain is just waiting — killing the wrong session won't help. Next up: isolation levels, and how they change what locks get taken in the first place.
