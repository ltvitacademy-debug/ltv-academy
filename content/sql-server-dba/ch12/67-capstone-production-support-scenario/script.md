# Script — Capstone: A Production Support Scenario

## Segment 1 (title)

Six weeks in, MERSQL01 is stable — and then the phone rings. Dispatchers across all 40 terminals can't update load statuses, and it's time to find out whether Chapter 10's triage methodology actually holds up under pressure.

## Segment 2 (code: finding the head blocker)

The app hanging but the engine still answering health checks points to blocking, not a crash. You go straight to the DMVs, and the blocking chain leads to one session — 82 — that everyone else is queued up behind.

## Segment 3 (code: an open, idle transaction)

Session 82 belongs to an analyst who ran an ad hoc update inside an explicit transaction, got pulled into a meeting, and never committed or rolled it back. Every row lock she took eleven minutes ago is still held. After trying to reach her, you kill the session and the locks release immediately.

## Segment 4 (steps: from call to resolution)

Symptom first, then the head blocker, then resolution — twelve minutes total, a number that would have been impossible six weeks ago without a methodology and knowing which DMVs to check. You log the incident and flag two follow-up fixes so it's less likely to happen again.

## Segment 5 (outro)

Next up: a real schema change needs to go out, and you apply Chapter 9 to deploy it safely.
