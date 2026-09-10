# Lesson 43 — What Makes a Pipeline "Production Ready"?

**Chapter 3 · Production Data Engineering · Lesson 43 of 70**

## What you'll learn

- Why "it runs" and "it's production ready" are two different bars
- The six qualities that separate a demo from a system people rely on
- A concrete example: the Lesson 41 taxi dashboard, re-examined
- What this chapter actually covers, lesson by lesson

## Two different bars

Every pipeline built across this entire Data Engineering track —
DE Foundations, Databricks & Delta Lake, and this course's own
Chapters 1–2 — has cleared one bar: it runs, and it produces a
correct answer, at least once, when you're watching it. Production
readiness is a different, higher bar: does it keep producing correct
answers when nobody's watching, when the input data misbehaves, when
the person who built it is on vacation, and when something
inevitably breaks at 2am?

## Six qualities, one at a time

```
1. Reproducible    -- runs the same way in dev, test, and prod
2. Tested            -- verified by something other than a human eyeballing it
3. Observable        -- you can tell it's healthy without opening the code
4. Alertable          -- something notifies a human before a user does
5. Recoverable        -- a bad run or bad deploy can be undone
6. Cost-aware          -- someone knows what it costs and why
```

None of these showed up as a real constraint in Chapters 1–2,
because a lesson's demo pipeline only ever needs to work once, for
one audience: you, right now. A real pipeline runs for months,
touched by multiple people, feeding decisions nobody in the room
right now will personally double-check.

## Re-examining Lesson 41's taxi dashboard

Lesson 41's pipeline — Eventstream, KQL Database, dashboard,
Activator — is functionally complete. It is not yet production
ready: there's no test verifying the KQL query still returns the
right shape after a change, no alert if the Eventstream itself
stops running, no documented cost budget, and no defined process for
what happens if the on-call engineer needs to roll back last week's
change. None of that is a criticism of Lesson 41 — it was correctly
scoped to teach the pipeline's logic. This chapter teaches everything
around that logic.

## What this chapter covers

CI/CD and environments (Lessons 44–47), testing (Lessons 48–51),
observability and alerting (Lessons 52–53), cost management
(Lessons 54–56), incident response (Lessons 57–59), governance and
security (Lessons 60–64), and deployment/operational practice
(Lessons 65–69) — closing with Lesson 70, the finale for this
entire course.

## Key terms

| Term | Meaning |
|---|---|
| Production ready | Keeps working correctly when nobody's watching and things go wrong |
| The six qualities | Reproducible, tested, observable, alertable, recoverable, cost-aware |

## Check yourself

You're ready for Lesson 44 when you can explain, without looking: why
can a pipeline be functionally complete and still not be production
ready?
