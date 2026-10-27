# Lesson 13 — A New Slowdown Appears — Now What?

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 13 of 16**

## What you'll learn

- Reproducing a new report instead of guessing at it, the same discipline as every earlier lesson
- Why "no code change" doesn't mean "no cause"
- Isolating the one variable that narrows this down before opening a single DMV
- The specific pattern that's the real tell here

## Weeks later, a new report comes in

Everything from Lessons 3-12 is working: Billing's index is in place
and maintained on schedule, Scheduling's transaction fix is holding,
and `dbo.vw_HealthDashboard` has been quiet. Then a new message
arrives from Scheduling: "The provider-schedule lookup — the one
that shows a provider's appointments for the day — was fine
yesterday. Today it's crawling for some providers, but not others.
Nothing was deployed."

## Reproduce it, exactly, before touching anything

The stored procedure behind this screen is `dbo.usp_GetProviderSchedule
@ProviderID`. Before guessing at a cause, reproduce the report
precisely:

```sql
EXEC dbo.usp_GetProviderSchedule @ProviderID = 4; -- fast
EXEC dbo.usp_GetProviderSchedule @ProviderID = 112; -- reported slow
```

Time both. If they're both fast, or both slow, the report was
describing something else entirely. If one is fast and one is slow —
which is what you'll find here — the report is confirmed real, and
now you have two concrete numbers instead of a vague complaint.

## Isolate the variable: which providers, specifically?

```sql
SELECT ProviderID, COUNT(*) AS appointment_count
FROM dbo.Appointments
GROUP BY ProviderID
ORDER BY appointment_count DESC;
```

Run several more providers through the same timed test. The pattern
that emerges: providers with a **typical or large** number of
appointments are slow. One specific provider — a part-time provider
with a very small number of appointments — is fast, and always was.

## Why "no code change" doesn't rule anything out

`dbo.usp_GetProviderSchedule` hasn't been edited. That's a real,
verifiable fact, and it's also not the same as "nothing changed."
Query plans, cached in the plan cache, can change for reasons that
have nothing to do with the stored procedure's own text — a
statistics update, a plan eviction and recompile, or simply which
`@ProviderID` happened to be passed in the *first* time this
procedure compiled after its last recompile.

## What NOT to do yet

Don't rewrite the procedure, don't add an index speculatively, and
don't assume this is the same missing-index pattern from Lesson 6
just because it's also about `dbo.Appointments`. You have a
reproducible symptom and a pattern — fast for one atypical provider,
slow for everyone else — but not yet a confirmed cause. Lesson 14
follows that lead.

## Key terms

| Term | Meaning |
|---|---|
| Reproduce | Confirm a reported problem by triggering it yourself, under known conditions |
| Isolate the variable | Change one thing (here, which `@ProviderID`) and observe what differs |
| "No code change" | Confirms the procedure's text is unchanged — not that nothing in the system changed |

## Lab

Time `dbo.usp_GetProviderSchedule` for at least four different
`@ProviderID` values on your own practice database, including the
provider with the fewest appointments. Record each timing and
appointment count.

## Check yourself

You're ready for Lesson 14 when you can explain, without looking: what
specific pattern — not just "some providers are slow" — points toward
the real cause, and why doesn't "no code change" rule out a plan
change?
