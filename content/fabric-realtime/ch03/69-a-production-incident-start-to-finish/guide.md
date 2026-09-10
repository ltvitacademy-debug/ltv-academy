# Lesson 69 — A Production Incident, Start to Finish

**Chapter 3 · Production Data Engineering · Lesson 69 of 70**

## What you'll learn

- Every Chapter 3 concept, chained through one realistic incident
- Where each lesson's mechanism actually fires, in sequence
- Why none of these pieces work in isolation — they're one system
- What "done" looks like for an incident, not just for a pipeline

## The incident, start to finish

```
00:00  Activator alert fires (Lesson 37/53): FareAmount alert
       repeating for the same trips -- Sev 1, pages on-call (Lesson 68)
00:04  On-call opens the runbook (Lesson 67) for this exact alert
00:07  Triage (Lesson 57): confirmed real, not a blip -- stays Sev 1
00:10  Mitigate: canary-rollback (Lesson 65) the Window transformation
       change deployed 40 minutes earlier -- traffic routed back
00:12  Dashboard numbers correct again; alert stops firing
00:15  Communication: "issue mitigated, investigating cause, next
       update in 30 min" posted (Lesson 57)
```

Every mechanism up to this point already exists from earlier
lessons — nothing new had to be invented mid-incident. That's the
entire point of building all of it in advance: an incident is the
worst possible time to be designing a process instead of running one.

## Root cause, resolution, and review

```
00:20  Observability (Lesson 52): logs show the deploy at 23:32 changed
       the Window's type from tumbling to hopping, unintentionally
00:25  Five Whys (Lesson 58): traced to a missing CI check (Lesson 45)
       that never validated Eventstream definitions, only notebooks
00:40  Forward fix (Lesson 66): CI pipeline updated to validate
       Eventstream definitions too -- shipped through normal CI/CD
09:00  (next day) Blameless write-up published: what happened, the
       real root cause, the fix, and the runbook (Lesson 67) updated
       with this exact scenario for next time
```

Resolution isn't the rollback — that was mitigation. Resolution is
the CI check that makes this specific mistake impossible to repeat,
which is a genuinely different, slower piece of work done carefully,
not under pressure.

## Checking what this incident wasn't

```
Not a disaster (Lesson 59):  the system was never down or unreachable,
                              just producing wrong numbers -- incident
                              response applied, not disaster recovery
Not a PII exposure (Lesson 61): FareAmount isn't sensitive data --
                              no additional governance response needed
SLO impact (Lesson 56):       12 minutes of degraded freshness --
                              debited from this month's error budget
```

Part of running this well is correctly recognizing what it *isn't* —
applying disaster recovery to a mere incident, or a PII response to
non-sensitive data, would waste real time on the wrong playbook.

## Why none of this works in isolation

Take away Lesson 53's severity tiers and the alert doesn't reach
anyone appropriately. Take away Lesson 67's runbook and the on-call
engineer starts from zero at 2am. Take away Lesson 45's CI/CD and
the fix can't ship safely. Every lesson in this chapter is one gear
in the same machine — this incident is what makes that visible all
at once.

## Key terms

| Term | Meaning |
|---|---|
| Chained response | Every stage of an incident using a mechanism already built for it |
| Mitigation vs. resolution | The rollback vs. the CI check that prevents recurrence |
| Recognizing what it isn't | Correctly ruling out disaster recovery or PII response saves real time |

## Check yourself

You're ready for Lesson 70 when you can explain, without looking: why
is an incident "the worst possible time to be designing a process
instead of running one"?
