# Lesson 8 — Diagnosing a Blocking Chain

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 8 of 16**

## What you'll learn

- Starting Scheduling's investigation back at Step 1 of the plan, on `dbo.Appointments`
- The real difference between a slow query and a blocked query
- Tracing a blocking chain with `sys.dm_exec_requests` and `blocking_session_id`
- What's actually holding up Scheduling's appointment calendar

## Back to Step 1 — for a second, separate problem

Billing's fix is done, but Lesson 1 described **two** complaints.
Scheduling's calendar freezing is a different symptom with a
different shape: it's not one query running slowly on its own — it's
several sessions that each start fine and then just **stop**,
mid-request, for minutes at a time. That shape is the signature of
blocking, not a bad plan.

## Re-running Lesson 3's queries against Scheduling's window

```sql
SELECT
    r.session_id,
    r.status,
    r.wait_type,
    r.wait_time,
    r.blocking_session_id,
    s.program_name
FROM sys.dm_exec_requests AS r
JOIN sys.dm_exec_sessions AS s ON r.session_id = s.session_id
WHERE r.blocking_session_id <> 0;
```

During the scheduling calendar's mid-morning freeze, this returns
several rows, all with the same `blocking_session_id` — several
different scheduling sessions, all waiting on *one* session.

## Chasing the chain to its head

```sql
SELECT session_id, status, command, wait_type, open_tran_count,
       last_request_start_time
FROM sys.dm_exec_requests
WHERE session_id = @BlockingSessionId -- the shared blocking_session_id above
UNION ALL
SELECT session_id, status, command, NULL, open_tran_count, last_request_start_time
FROM sys.dm_exec_sessions
WHERE session_id = @BlockingSessionId AND session_id NOT IN (SELECT session_id FROM sys.dm_exec_requests);
```

The session at the head of the chain — the one with
`blocking_session_id = 0` in its own row — turns out to be a
scheduling-application session running a large batch update against
`dbo.Appointments`, with `open_tran_count = 1`: an open transaction
that hasn't committed yet, holding locks the whole time.

## What that session is actually doing

```sql
SELECT ProviderID, AppointmentDate, Status
FROM dbo.Appointments
WHERE AppointmentDate = @Today;

UPDATE dbo.Appointments
SET Status = 'Confirmed'
WHERE AppointmentDate = @Today AND Status = 'Pending';
-- no COMMIT yet -- the application only commits after it has also
-- sent confirmation messages for every row in this batch
```

This is a daily "confirm today's appointments" batch job that reads
a day's appointments, updates their status, and only commits after a
separate, slower step (sending confirmation messages) finishes for
every row — holding row and page locks on `dbo.Appointments` open the
entire time. Every other session trying to read or write an
appointment for today — exactly what Scheduling's staff are doing all
morning — queues up behind it.

## Why this is a genuinely different cause from Billing's

Nothing about this is a missing index or a bad plan — the batch
job's own query plan may be perfectly fine. The problem is
**duration**: a transaction staying open across a slow, unrelated step
(sending messages) while holding locks the whole scheduling staff
needs. Lesson 9 fixes exactly that.

## Key terms

| Term | Meaning |
|---|---|
| Blocking chain | A set of sessions all waiting, directly or indirectly, on one session holding a lock |
| `open_tran_count` | Number of open (uncommitted) transactions on a session |
| Head of the chain | The one session with `blocking_session_id = 0` actually responsible for the wait |

## Lab

Simulate a long-running update against a practice `dbo.Appointments`
table inside an explicit transaction without committing, then run a
second session trying to update the same rows. Use the query above to
find the blocking chain and confirm the head session matches the one
holding the open transaction.

## Check yourself

You're ready for Lesson 9 when you can explain, without looking: why
is a blocking chain a genuinely different kind of problem than a
missing index, and what specifically is keeping this batch job's
transaction open so long?
