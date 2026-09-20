# Capstone: A Production Support Scenario

Six weeks in, MERSQL01 is stable — and then the phone rings. Dispatchers across all 40
terminals can't update load statuses in DispatchTrack; the app just spins and times out. This
is the moment Chapter 10's triage methodology exists for, and it's the first real test of
whether the work in Lessons 65 and 66 actually holds up under pressure.

## What you'll learn

- How to run Chapter 10's triage methodology start to finish, on a real symptom
- How to find a head blocker using the DMVs this course has built toward all along
- How to resolve the incident and then close the loop with root-cause follow-up

## Symptom, not diagnosis, first

The triage methodology starts with the symptom as reported, not a guess at the cause:
dispatchers can't save updates to the `Loads` table; new updates hang; nothing is erroring
outright, it's just slow to the point of unusable. That's consistent with blocking, not a crash
— DispatchTrack's own health check page still loads fine, which tells you the Database Engine
itself is up and answering simple requests.

## Finding the head blocker

You go straight to the DMVs:

```sql
SELECT blocking_session_id, session_id, wait_type, wait_time, status
FROM sys.dm_exec_requests
WHERE blocking_session_id <> 0;

SELECT session_id, login_name, host_name, last_request_start_time, open_transaction_count
FROM sys.dm_exec_sessions
WHERE session_id = 82;  -- the session everything is blocked behind
```

The chain leads to session 82, logged in as `priya_analyst` from a reporting workstation, with
`open_transaction_count = 1` and a request that finished executing eleven minutes ago — a
classic **open, idle transaction**: she ran an ad hoc `UPDATE` against `Loads` inside an
explicit `BEGIN TRANSACTION` to test something, got pulled into a meeting, and never issued a
`COMMIT` or `ROLLBACK`. Every row lock she took is still held, and every dispatcher trying to
touch the same rows queues up behind her.

## Resolving it

You check `sys.dm_tran_locks` to confirm the scope of what session 82 is holding, then you try
to reach Priya directly first — she can commit or roll back cleanly. When she doesn't answer
in a few minutes and terminals are backing up, you make the call to end the session:

```sql
KILL 82;
```

The transaction rolls back, the locks release immediately, and the blocking chain clears within
seconds. Total time from the first call to resolution: twelve minutes — a number you'd have had
no way to hit six weeks ago, before you had a methodology and knew which DMVs to check.

## Closing the loop

Resolving the symptom isn't the end of triage — Chapter 10 also covers documentation and
follow-up. You log the incident (start time, symptom, root cause, resolution, duration) the way
Lesson 59 described, and you make two changes so it's less likely to recur: you set a
connection-level `LOCK_TIMEOUT` for ad hoc reporting connections, and you flag `DispatchDB` as a
candidate for **Read Committed Snapshot Isolation** so future reader/writer contention doesn't
turn into blocking chains at all — a change you'll evaluate properly, through change management,
rather than flip on the spot.

## Key terms

| Term | Meaning |
|---|---|
| Head blocker | The session at the root of a blocking chain, holding a lock everyone else is waiting on |
| Open, idle transaction | A transaction left uncommitted after its last statement finished — locks stay held with nothing actively running |
| `KILL` | The command that terminates a session and rolls back its open transaction |
| RCSI (Read Committed Snapshot Isolation) | A database option that uses row versioning so readers don't block behind writers |

## Check yourself

`sys.dm_exec_requests` alone wasn't enough to fully understand session 82 — you also checked
`sys.dm_exec_sessions` and `sys.dm_tran_locks`. What did each of those two views tell you that
the first one didn't?
