# Script — Finding Blocking Chains

## Segment 1 (title)

Last lesson flagged LCK_M waits as the signature of blocking. This lesson turns that signal into an actual answer: which session is blocking which, and which one sits at the root of the chain.

## Segment 2 (code: the one column that matters)

Sys.dm_exec_requests carries a blocking_session_id column — zero when a request isn't waiting on anyone, and a real session ID when it is. Wait_resource tells you exactly what's being contended for, and wait_time tells you how long it's been stuck.

## Segment 3 (code: walk the chain to its root)

On a busy server, chains run several sessions deep — a blocker can itself be blocked by yet another session. A recursive common table expression follows blocking_session_id back link by link until it reaches the session with no blocker of its own: the root.

## Segment 4 (steps: reading a chain)

The root session often isn't blocked by anyone. It's just running a long transaction — a big update, an unindexed scan, an app that opened a transaction and went idle — holding locks everyone downstream needs. That's the session that actually matters.

## Segment 5 (outro)

Killing a session in the middle of the chain does nothing if its own blocker is still upstream. Next up: tempdb usage and database space, chasing down the single most common "the server is slow" root cause.
