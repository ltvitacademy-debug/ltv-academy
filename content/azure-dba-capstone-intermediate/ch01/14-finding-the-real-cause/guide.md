# Lesson 14 — Finding the Real Cause

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 14 of 16**

## What you'll learn

- Checking exactly what plan is cached, and when it was compiled
- Running a controlled test to confirm a hypothesis before touching anything
- Parameter sniffing, explained precisely with this exact procedure's mechanics
- Why this bug is easy to make and easy to miss during normal operation

## Step 1: check what's actually in the plan cache

```sql
SELECT
    qs.plan_handle,
    qs.creation_time,
    qs.execution_count,
    st.text AS query_text
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) st
WHERE st.text LIKE '%usp_GetProviderSchedule%';
```

`creation_time` shows exactly when this plan was compiled — and
cross-checking against the clinic's own change log shows that's the
same morning the part-time provider (the fast one, `@ProviderID =
4`) was the very first person whose schedule got pulled up that day,
right after an overnight statistics update forced a recompile.

## Step 2: confirm the hypothesis with a controlled test

Don't just infer it — prove it. Force a fresh recompile and test
again, in a specific order:

```sql
-- Force this one procedure's cached plan to be thrown away
EXEC sp_recompile 'dbo.usp_GetProviderSchedule';

-- Now run the TYPICAL provider FIRST, so the new plan compiles for them
EXEC dbo.usp_GetProviderSchedule @ProviderID = 112; -- fast now
EXEC dbo.usp_GetProviderSchedule @ProviderID = 4;   -- now slower than before
```

That's a controlled experiment: changing one thing — which
`@ProviderID` compiles the plan first — flips which provider is fast
and which is slow. The procedure's text never changed at any point.

## Step 3: understand exactly why this happens

```sql
CREATE PROCEDURE dbo.usp_GetProviderSchedule @ProviderID int AS
SELECT a.AppointmentID, a.AppointmentDate, p.FirstName, p.LastName
FROM dbo.Appointments a
JOIN dbo.Patients p ON p.PatientID = a.PatientID
WHERE a.ProviderID = @ProviderID;
```

SQL Server compiles **one** plan per procedure and caches it,
optimized for the *specific* `@ProviderID` value passed in on that
first call. For the part-time provider with very few appointments,
the optimizer chose a `Nested Loops`/seek-based plan — correct for a
handful of rows. Every subsequent call reuses that *same cached
plan*, regardless of which `@ProviderID` is actually passed in next.
For a typical provider with hundreds of appointments, that same
seek-based plan is a poor fit — but it's still the plan that runs,
because SQL Server doesn't automatically recompile just because a
different parameter value came in. This is **parameter sniffing**:
the plan is correct for the parameter it was *sniffed* with, and
wrong for everyone else.

## Why this is realistic, not contrived

Nothing about the stored procedure's T-SQL is wrong — it's a
perfectly reasonable, simple procedure. The bug is in *which value*
happened to compile the cached plan, which depends on something as
arbitrary as whose schedule got pulled up first after a recompile.
That's exactly why "no code change" didn't rule this out in Lesson
13 — the plan changed, the code never did.

## Key terms

| Term | Meaning |
|---|---|
| Parameter sniffing | A cached plan optimized for the first parameter value it compiled with, reused for all others |
| `sp_recompile` | Forces a procedure's next execution to compile a fresh plan |
| `creation_time` | When a cached plan was compiled — useful for correlating against other events |

## Lab

On your own practice `dbo.usp_GetProviderSchedule`, run `sp_recompile`
and then call it first with a large-appointment-count provider,
then a small one. Confirm the fast/slow pattern reverses exactly as
described.

## Check yourself

You're ready for Lesson 15 when you can explain, without looking: why
did the part-time provider's schedule look fast for everyone when the
plan first compiled, and what specifically flips which provider is
fast after `sp_recompile`?
