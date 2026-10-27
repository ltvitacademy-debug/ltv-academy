# Lesson 16 — Wrap-Up: What You Built, and What's Next

**Chapter 1 · Intermediate Capstone: Two Departments, One Performance Problem · Lesson 16 of 16**

## What you'll learn

- A full recap of every root cause this chapter found, in order
- Why three genuinely different problems needed three genuinely different fixes
- What makes this investigation repeatable on any real production system
- Where the Advanced project picks up from here

## Three complaints, three real root causes

This chapter started with what looked like two vague complaints and
ended up finding **three** distinct, confirmed root causes:

```
1. Billing's invoice lookups  -->  missing index on dbo.Invoices
                                    (Lessons 3-7)

2. Scheduling's calendar       -->  a batch job's open transaction
   freezing                        blocking everyone else
                                    (Lessons 8-9)

3. Provider-schedule lookup     -->  parameter sniffing on a cached
   slowdown, weeks later            stored procedure plan
                                    (Lessons 13-15)
```

Three real causes with three genuinely different fixes — an index,
a transaction boundary, and `OPTION (RECOMPILE)` — because three
genuinely different mechanisms were at fault. No single fix would
have caught all three, which is exactly why Lesson 2's five-step plan
insisted on gathering evidence before guessing.

## The investigation method, not just the fixes

The specific queries and fixes in this chapter matter, but the
repeatable part is the method itself: identify active sessions, find
the slow queries, read the plan, diagnose with real DMV evidence,
then fix and re-test with a new plan as proof — applied three
separate times to three separate symptoms. That method works on any
real SQL Server or Azure SQL Database system, not just
`OverlookClinicalDB`.

## What's still watching, going forward

`dbo.vw_HealthDashboard` (Lesson 12) and the weekly Elastic Job
(Lesson 11) didn't stop mattering once the three bugs were fixed —
they're the reason a fourth complaint is more likely to show up as a
dashboard row than a department's angry email. Maintenance that
isn't automated quietly expires; this chapter's fixes are built to
last specifically because they're scheduled and monitored, not just
applied once.

## Where the Advanced project picks up

This Intermediate project stayed inside one database, diagnosing and
fixing performance problems a DBA finds after they've already
happened. The Advanced project goes further — the kind of
architecture, resilience, and platform-level decisions that reduce
how often problems like these occur in the first place, at a scale
beyond one Azure SQL Database.

## Key terms

| Term | Meaning |
|---|---|
| Three root causes | Missing index, blocking transaction, parameter sniffing — genuinely distinct mechanisms |
| Repeatable method | Sessions → slow queries → plan → diagnose → fix and re-test, reusable on any system |
| Automated + monitored | The difference between a fix that lasts and one that quietly expires |

## Check yourself

Before moving to the Advanced project, you should be able to explain,
without looking: what were this chapter's three root causes, why did
each need a genuinely different fix, and why do Lessons 11 and 12
matter just as much after the bugs are fixed as during the
investigation itself?
