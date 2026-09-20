# Script — Finding Open Transactions

## Segment 1 (title)

A transaction that never commits or rolls back is one of the most common causes of a server-is-slow ticket. It holds its locks, blocks whoever's next in line, and stops the transaction log from truncating until someone finds it.

## Segment 2 (code: DBCC OPENTRAN)

DBCC OPENTRAN is your fast, single-database check. It reports the oldest active transaction in the current database — its transaction ID, start time, and the session that owns it. If nothing's open, it just says so. It's the right first move when someone says the log is growing.

## Segment 3 (steps: the DMV path)

For the full server-wide picture, join sys.dm_tran_active_transactions to sys.dm_tran_session_transactions to sys.dm_exec_sessions. The first DMV lists every active transaction on the instance, the second bridges it to a session ID, and the third gets you the login name and program that actually opened it.

## Segment 4 (code: full query)

Put together, that's one query returning every open transaction, how long each has been open, and who's responsible — ordered oldest first, because the oldest one is almost always the one causing the pain.

## Segment 5 (outro)

An open transaction doesn't just block sessions — it pins the tempdb version store too, so a forgotten BEGIN TRAN can grow both the log and tempdb overnight. Next up: locks and blocking, and how to read a blocking chain.
