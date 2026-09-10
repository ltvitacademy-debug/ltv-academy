# Lesson 58 — Root Cause Analysis, Step by Step

**Chapter 3 · Production Data Engineering · Lesson 58 of 70**

## What you'll learn

- The Five Whys — a simple technique for not stopping at the first answer
- Using Lesson 52's three observability pillars as actual evidence
- Root cause vs. contributing factor vs. symptom
- Blameless write-ups — why they get better information, not worse

## The Five Whys, applied to Lesson 57's incident

```
Symptom: The Activator alert fired for fares over $200, repeatedly,
         for the same trips.

Why?     Because FareAmount was being computed as a running total
         instead of a per-trip value.
Why?     Because the Window transformation's aggregation was
         accidentally set to a hopping window instead of tumbling.
Why?     Because the change was made directly in the prod workspace,
         skipping the dev/test promotion path (Lesson 44).
Why?     Because there was no CI check (Lesson 45) blocking a
         direct edit to a prod Eventstream.
Why?     Because the CI/CD pipeline only validated notebooks,
         never Eventstream definitions.
```

Each "why" moves one layer deeper, from the visible symptom toward
something that's actually fixable. Stopping after the first or
second "why" ("the window was misconfigured") would have led to
just fixing that one window — leaving the actual gap (no CI
validation for Eventstream changes) wide open for the exact same
mistake to happen again, differently, next month.

## Evidence, not guessing

```kql
EventstreamLogs
| where Timestamp between (incident_start .. incident_end)
| where ItemId == "trip-events-stream"
```

Lesson 52's three pillars are what makes each "why" answerable with
evidence instead of a guess. A trace shows exactly which stage
produced the bad aggregate; logs show exactly when the
misconfiguration was deployed; metrics show exactly when behavior
changed. Root cause analysis without observability data is just
speculation dressed up as an investigation.

## Root cause vs. contributing factor vs. symptom

The **symptom** is what got noticed (repeated alerts). A
**contributing factor** made the problem worse or more likely (no
CI validation for Eventstreams), but didn't cause it by itself. The
**root cause** is the earliest point where a real, fixable decision
would have prevented the whole chain (the missing CI check itself).
Fixing only the symptom or a contributing factor leaves the actual
root cause standing, waiting to cause the next incident.

## Blameless write-ups get better information

A postmortem that asks "who broke this" gets people minimizing what
they did, out of self-protection — completely understandable, and
completely useless for actually preventing a recurrence. A
postmortem that asks "what in our systems and processes allowed
this to happen" gets the same people volunteering the full,
honest sequence of events, because nobody's defending themselves —
they're just describing what happened.

## Key terms

| Term | Meaning |
|---|---|
| Five Whys | Repeatedly asking why, moving past the first answer to a fixable cause |
| Root cause | The earliest fixable point that would have prevented the whole chain |
| Blameless postmortem | A process focused on systems and gaps, not individual fault |

## Check yourself

You're ready for Lesson 59 when you can explain, without looking: why
does asking "who broke this" get worse information than asking "what
allowed this to happen"?
