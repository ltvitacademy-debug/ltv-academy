# Lesson 26 — Capstone Wrap-Up & Deployment Runbook

**Chapter 7 · Capstone: a Tested, Deployable Application Pipeline · Lesson 26 of 26**

## What you'll learn

- How to write a real pre-deployment checklist for a scoped application, not a generic one
- How to choose a deployment window that respects a hard business timing constraint
- How to build a rollback plan you'd actually be willing to execute under pressure
- How this course's testing and deployment discipline connects to what comes next: performance under real load

## From requirements to a runbook

Lesson 24 wrote the requirements. Lesson 25 built the ATF coverage those
requirements demanded. This lesson closes the capstone the way a working
ServiceNow DevOps engineer actually would close out a real project: by writing
the deployment runbook that a second engineer could follow without needing you
in the room. A runbook that only makes sense to the person who wrote it isn't a
runbook — it's a memory.

## The pre-deployment checklist

Before Course Registration's promotion to Prod is even scheduled, every item on
this checklist has to be independently verifiable, not just assumed:

1. **ATF Suite passing.** The "Course Registration — Critical Path" Test Suite
   from Lesson 25 has run against the candidate change in Test, and every test —
   the happy-path UI Test, the full-section UI Test, and the server-side
   capacity-check Test — passed. A failing or skipped test is a hard stop, full
   stop, with no exceptions for "it's probably fine."
2. **Dependencies sequenced correctly.** Chapter 2's lesson on Update Set
   batching strategies applies directly here: if this change includes both a new
   field on the Section table and a Flow Action that reads that field, the field
   has to commit before the Flow Action, in that order, in every instance the
   change promotes through. Getting this sequence wrong is exactly the kind of
   collision Chapter 2 spent a full lesson on.
3. **Change Request status confirmed.** Per Chapter 5, the Change Request
   covering this promotion exists, has the ATF Test Suite's pass result attached
   as evidence, and has been formally approved by the Change Advisory Board — not
   "pending," not "probably fine by Thursday."

## Choosing the deployment window

Chapter 6 covered deployment timing in general; this capstone's constraint is
specific and absolute. The registrar's three peak enrollment weeks — the first
week of fall, spring, and summer terms — are blacked out entirely: no deployments,
no planned changes, no exceptions. Outside those weeks, the deployment window is
scheduled for a low-traffic time — late evening, midweek, outside add/drop
periods — specifically so that if something unexpected happens, the people who
need to respond are awake, available, and not also trying to register for
classes themselves.

## The rollback plan

A rollback plan that exists only as an idea is not a rollback plan. This one is
written out before the first production deployment, exactly as Chapter 6
recommended, and rehearsed on paper so nobody is improvising under pressure:

- **Trigger condition.** If, within the first hour after deployment, the ATF
  Suite re-run against Prod fails, or real students report being unable to
  register for sections with confirmed open seats, rollback begins immediately —
  no "let's wait and see."
- **Rollback mechanism.** Because the application is Source Control-connected
  (Chapter 3), rollback means reverting the Git commit and re-promoting the
  prior known-good version through the same Dev → Test → Prod pipeline, not
  hand-editing Prod to undo the change. Hand-editing Prod to "fix" a bad
  deployment is the same anti-pattern this whole course has been arguing
  against since Chapter 1.
- **Communication.** The registrar's office and IT director are notified the
  moment rollback begins, not after it completes — especially critical if this
  happens during a peak enrollment week despite every precaution, because
  students actively registering need to know what's happening in real time.
- **Post-incident review.** After any rollback, a short written review captures
  what the ATF Suite missed, if anything, and whether a new test needs to be
  added to the Lesson 25 suite before the fix is re-attempted.

## What this capstone didn't test — and what's next

Every test built in Lesson 25 confirms *correctness*: does registration work, does
the full-section case get rejected properly, does the capacity math return the
right answer. None of those tests say anything about what happens when five
thousand students hit that same registration form in the same ten-minute window
during real peak enrollment. A deployment can pass every ATF test, follow this
exact runbook, and still slow to a crawl or time out under load that correctness
testing never simulated. That gap — a technically successful, fully tested
deployment that still breaks under real production traffic — is precisely where
course 12, **ServiceNow Performance Troubleshooting**, picks up.

## Key terms

| Term | Meaning |
|---|---|
| Pre-deployment checklist | The verifiable, no-exceptions list (tests passing, dependencies sequenced, Change Request approved) confirmed before promotion to Prod |
| Deployment window | The scheduled time for a promotion to Prod, chosen here to avoid peak enrollment weeks entirely |
| Rollback trigger | The specific, predefined condition (failed re-test, confirmed user-reported breakage) that starts rollback immediately, with no "wait and see" |
| Post-incident review | A short written review after any rollback, checking whether the ATF Suite needs a new test to catch the same failure next time |

## Check yourself

This capstone built an application that passes every correctness test and follows
a real deployment runbook. In one or two sentences, explain why that same
application could still fail in production during peak enrollment week — and
name the course that picks up exactly that gap next.
