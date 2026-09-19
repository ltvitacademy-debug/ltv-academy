# Lesson 90 — Project Introduction: You're the DBA

**Chapter 15 · Real-World Azure DBA Project · Lesson 90 of 95**

## What you'll learn

- The fictional company and environment the rest of this chapter is built on
- The three real production databases you've inherited, and what's actually wrong with each
- The business requirements as stakeholders would actually state them — not a checklist
- Why this chapter is one continuous scenario, not four separate how-tos

## Meet Meridian Fleet Logistics

Meridian Fleet Logistics runs a regional trucking and dispatch operation —
roughly 2,200 trucks, a few hundred office staff, and a single physical
server closet that has quietly become the most important room in the
building. You've just been brought in as their first dedicated database
administrator. Nobody has held this role before you. That matters: a lot
of what's broken isn't broken because someone made a bad call — it's
broken because nobody was ever specifically responsible for it.

## The environment you've inherited

| Database | Size | Known problem |
|---|---|---|
| `OrderManagement` | ~800 GB | Dispatch queries time out every morning, 7-9am |
| `DriverHR` | ~40 GB | Driver SSNs & license numbers, wide-open shared login |
| `Telemetry` | ~50 GB/month growth | GPS/sensor feed from 2,200 trucks, storage pressure rising |

All three run on a single on-prem SQL Server 2016 Standard Edition
instance. There is no HA/DR of any kind — if that server's disk fails,
the business stops. Backups exist, but nobody can tell you the last time
someone actually tried restoring one.

## What the business is actually asking for

This is the part that matters most: none of the people below handed you a
to-do list. They described a situation, in their own words, and it's your
job to translate that into the deployment, security, performance, and
availability decisions ahead in Lessons 91-93.

> **Ops Director:** "Dispatchers are staring at a spinner every single
> morning between 7 and 9. That's the exact window we're supposed to be
> planning routes, and instead we're waiting on the database."

> **Compliance Officer:** "Driver records have Social Security numbers and
> license data in them. I asked who has access to that table last month
> and got three different answers. I don't think anyone's actually looked
> at those permissions in years."

> **CFO:** "We refresh this server every four years and it's a six-figure
> capital expense every time. I want a plan that stops treating this as a
> hardware purchase."

> **CEO:** "If that server room has a bad day, I need to know exactly how
> bad — in hours and in minutes of lost data — not a vague 'we have
> backups.'"

## How this chapter works

Lessons 91, 92, and 93 apply everything from Chapters 1-14 to this exact
scenario — deployment choice, security controls, performance tuning,
automation, migration, backup, and HA/DR — but as decisions you have to
justify against Meridian's specific constraints, not as a script to
follow. There isn't a single "correct" slide handed to you at the end of
each lesson. There's a constraint, the tools this course already gave
you, and the expectation that you can reason from one to the other out
loud — which is exactly what Chapter 16's interview preparation asks you
to do again, on a stranger's terms, in Lesson 95.

## Key terms

| Term | Meaning |
|---|---|
| Business requirement | A stated constraint or goal from a stakeholder, in their language — not a technical to-do item |
| Stakeholder | Anyone with a legitimate claim on how the database should behave — Ops, Compliance, Finance, and leadership all have different, sometimes competing, ones |
| Shared login | A single database credential used by many people or services — the opposite of least privilege, and exactly what Compliance flagged above |

## Check yourself

Before Lesson 91: without re-reading the quotes above, can you restate
each stakeholder's concern in one sentence, and name which later lesson
(91, 92, or 93) it's going to get solved in?
