# Script — Blocking, Locking & Deadlocks

## Segment 1 (title)

Three terms used interchangeably in conversation, and genuinely distinct in practice. Locking is the mechanism. Blocking is the consequence of locking becoming visible. A deadlock is the one failure mode SQL Server can't resolve on its own.

## Segment 2 (code: sys.dm_tran_locks)

Locking is always happening, mostly invisible, mostly healthy -- shared locks for reads, exclusive for writes, at row, page, or table level. sys.dm_tran_locks shows every lock currently held, and a WAIT status row is a session blocked right now.

## Segment 3 (code: finding a blocking chain)

Blocking itself is normal -- the problem is a chain that lasts long enough for users to notice. blocking_session_id tells you exactly who's holding the lock. Chase that chain back to the session with blocking_session_id equal to zero -- that's the actual root cause.

## Segment 4 (code: deadlock priority)

A deadlock is specifically circular -- two sessions each waiting on a lock the other holds. Neither can proceed, so SQL Server kills a chosen victim to break the cycle. SET DEADLOCK_PRIORITY LOW makes a session more likely to be picked as that victim.

## Segment 5 (outro)

Shorter transactions, consistent access order, and the right indexes reduce lock contention, blocking, and deadlocks all at once. Next up: the query-performance-specific DMVs, distinct from Chapter 7's general monitoring coverage.
