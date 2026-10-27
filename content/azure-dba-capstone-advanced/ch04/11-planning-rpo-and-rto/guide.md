# Lesson 11 — Planning RPO and RTO

**Chapter 4 · High Availability & Disaster Recovery · Lesson 11 of 26**

## What you'll learn

- Why "we have backups" was never a real disaster recovery plan for Overlook
- What RPO and RTO actually measure, in concrete numbers, not vague goals
- The specific RPO/RTO targets this capstone sets for Overlook's database
- Why those numbers matter differently for a patient-facing system than for most databases

## "We have backups" is not a plan

Lesson 1 named the honest state of Overlook's DR readiness before this project: nobody actually
knew if the company would survive a real incident. Overlook did have backups — the Beginner
capstone made sure of that — but a backup existing somewhere is not the same thing as a *tested,
targeted* recovery plan. A real DR plan answers two specific questions in numbers, not vague
confidence:

## RPO: how much data can Overlook afford to lose

**Recovery Point Objective (RPO)** is the maximum acceptable amount of data loss, measured in
time — "how far back could the restored data be, worst case?" An RPO of 5 minutes means: if a
disaster strikes right now, Overlook should lose at most the last 5 minutes of writes to
`OverlookDB` — not the last hour, not the last day.

## RTO: how long Overlook can afford to be down

**Recovery Time Objective (RTO)** is the maximum acceptable time to get the system back up and
serving requests after a disaster is declared. An RTO of 1 hour means: from the moment a failure is
detected, Overlook's scheduling and billing systems need to be reachable again within 1 hour — not
"eventually," not "by end of day."

```
RPO  →  how much data can we lose?        (measured backward from the disaster)
RTO  →  how long can we be down?           (measured forward from the disaster)
```

## This capstone's targets for Overlook

| Target | Value | Why |
|---|---|---|
| RPO | 5 minutes | Appointment bookings and billing entries are business-critical; losing more than a few minutes of them risks double-bookings and billing errors that directly affect patients |
| RTO | 1 hour | A healthcare provider's scheduling and billing systems being down for a full business day is a real operational and reputational cost the board explicitly wants to avoid |

These aren't arbitrary round numbers — they're the kind of targets a board actually sets after
asking "what's the worst case we're willing to accept," then working backward to the technical
mechanism that can deliver it. Lesson 12's failover group and Lesson 14's geo-replication exist
specifically because they can hit numbers in this range; a nightly-backup-only strategy could not.

## Why these numbers matter differently for a healthcare database

A retail company losing an hour of browsing history is an inconvenience. Overlook losing an hour of
appointment and billing writes means patients who thought they had an appointment that no longer
exists in the system, and billing records that don't match what actually happened — a different
category of consequence than most databases carry, which is exactly why the board's mandate in
Lesson 1 called this out by name.

## Key terms

| Term | Meaning |
|---|---|
| RPO (Recovery Point Objective) | Maximum acceptable data loss, measured in time |
| RTO (Recovery Time Objective) | Maximum acceptable downtime before service is restored |
| DR plan | A tested, targeted recovery strategy — not just "backups exist somewhere" |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: what is the difference between
RPO and RTO, and what are this capstone's specific numeric targets for each?
