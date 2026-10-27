# Lesson 15 — Writing the DR Runbook

**Chapter 4 · High Availability & Disaster Recovery · Lesson 15 of 26**

## What you'll learn

- Why everything built in Lessons 11-14 is still incomplete without this document
- The real sections a DR runbook needs, and what goes in each one
- Who actually needs to be able to follow this document, and why that changes how it's written
- How Chapter 7's drill will use this exact runbook to grade itself

## Why the runbook is not optional paperwork

Lessons 11-14 built real, working mechanisms: RPO/RTO targets, a tested failover group, and an
understanding of geo-replication's trade-offs. None of that is usable at 2 a.m. during a real
incident unless it's written down somewhere a person under pressure can actually follow, step by
step, without needing to remember or re-derive any of it. A DR runbook is the artifact that turns
"we built this" into "anyone on the team can execute this."

## What this runbook actually needs — section by section

| Section | What goes in it |
|---|---|
| **Roles** | Who declares a disaster, who executes the failover, who communicates status — named roles, not "whoever's available" |
| **Trigger criteria** | What specifically counts as a disaster worth triggering failover for, vs. a transient blip to wait out |
| **Step-by-step failover procedure** | The exact `Switch-AzSqlDatabaseFailoverGroup` command from Lesson 13, with the real resource group and server names already filled in — not a placeholder |
| **Verification checklist** | The exact checks from Lesson 13: confirm the listener endpoint repointed, confirm the application reconnected, query known rows to confirm data correctness |
| **RPO/RTO targets** | Lesson 11's 5-minute RPO and 1-hour RTO, stated explicitly, so a real incident can be measured against them afterward |
| **Rollback / fail-back procedure** | How to return to the original primary once it's healthy again, once the emergency has passed |
| **Communication plan** | Who tells Overlook's leadership and staff what's happening, and when |

## Who actually needs to follow this document

A runbook written only for the person who built this chapter is a runbook that fails the moment
that specific person is unavailable during a real incident — which is exactly the "whoever happened
to be on call" problem Lesson 1 named as part of the original gap. Writing commands with the real
names already filled in, not generic placeholders, and writing trigger criteria in plain, specific
language rather than DBA jargon, is what makes this document usable by whoever is actually on call
when an incident happens — not just by its author.

## How Chapter 7 uses this exact document

Chapter 7's DR drill doesn't test the failover group in isolation — it tests whether *this runbook*
actually gets someone through a real incident successfully. That's the real purpose of writing it
now, carefully, instead of treating it as an afterthought: a runbook with gaps or wrong assumptions
gets found during Chapter 7's drill, which is a much better place to find them than during an actual
disaster.

## Key terms

| Term | Meaning |
|---|---|
| DR runbook | A step-by-step document turning a disaster recovery plan into something anyone on the team can execute |
| Trigger criteria | The specific conditions that count as a disaster worth triggering failover for |
| Fail-back | Returning to the original primary once it's healthy again, after an emergency has passed |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: name the seven sections this
runbook needs, and why it has to be written for whoever is on call, not just for the person who
built this chapter.
