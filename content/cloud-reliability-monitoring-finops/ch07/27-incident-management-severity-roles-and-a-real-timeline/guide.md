# Lesson 27 — Incident Management: Severity, Roles, and a Real Timeline

**Chapter 7 · Site Reliability Engineering Fundamentals · Lesson 3 of 4**

## What you'll learn

- How severity levels turn "something's wrong" into a response that
  matches how bad it actually is
- The core incident roles — Incident Commander, Operations Lead,
  Communications Lead, Scribe — and why they're deliberately separate
  people whenever possible
- What a real incident timeline looks like end to end, from detection
  through resolution
- Why structure matters most in the first chaotic minutes, not after
  things have calmed down

## Severity levels: matching response to impact

Not every alert deserves the same response. A structured incident
program sorts incoming problems into severity tiers so the right
amount of urgency, staffing, and communication gets applied
immediately, without debate. A common scheme, illustrative rather than
universal:

| Severity | What it means | Example impact |
|---|---|---|
| SEV1 | Critical, widespread outage or data loss | Checkout is down for all users; payments failing |
| SEV2 | Significant degradation, not total outage | Checkout is slow for most users; some orders failing |
| SEV3 | Limited impact, workaround exists | One secondary feature is broken; core flows unaffected |
| SEV4 | Minor, cosmetic, or already mitigated | A UI glitch with no functional impact |

SEV1 pages the on-call engineer and likely their manager immediately,
pulls in an Incident Commander, and opens a live communications
channel. SEV4 might just become a ticket worked during business hours.
The point of the tiering isn't bureaucracy — it's removing the need to
*decide*, under pressure, how big a deal something is before you can
start responding to it.

## The roles: why one person can't do it all

During a real SEV1 or SEV2, trying to have one person both fix the
problem and keep everyone informed reliably produces worse outcomes on
both fronts — digging into logs and writing a stakeholder update pull
attention in opposite directions at the exact moment focus matters
most. Structured incident response splits the job:

- **Incident Commander (IC)** — owns the incident, not the fix. The
  IC doesn't necessarily touch the keyboard; they coordinate who's
  working on what, make the call on escalation, and decide when the
  incident is actually resolved. One voice, one decision-maker.
- **Operations/Technical Lead** — drives the actual technical
  investigation and mitigation: reading dashboards, trying rollbacks,
  checking recent deploys.
- **Communications Lead** — owns the outward-facing updates: internal
  stakeholders, status page, support team talking points. This keeps
  the technical lead from being interrupted every ten minutes for a
  status update.
- **Scribe** — keeps a running, timestamped log of what happened and
  when, in real time. This log becomes the backbone of the postmortem
  in the next lesson, and nobody can reconstruct an accurate timeline
  from memory after the fact.

On a smaller team one person may hold two of these roles out of
necessity, but the roles themselves don't disappear — they're
functions that still need covering, even if the headcount is thin.

## A real timeline, end to end

Here's an illustrative SEV1 timeline — not a real company's incident,
but the shape a real one takes:

```
00:00  Alert fires: checkout success rate drops below 97% (SLO: 99.9%)
00:02  On-call engineer acknowledges; confirms it's not a false alarm
00:04  Incident declared SEV1; Incident Commander assigned
00:06  IC pulls in a Technical Lead and opens a dedicated incident channel
00:08  Communications Lead posts initial internal status; status page updated
00:12  Technical Lead identifies a deploy 18 minutes prior as the likely cause
00:15  Rollback initiated
00:19  Checkout success rate climbing back toward normal
00:24  Success rate back above 99.9%; IC declares the incident mitigated
00:40  Sustained normal behavior confirmed; IC formally closes the incident
```

Two things stand out in that timeline. First, the gap between
detection (00:00) and a confirmed cause (00:12) is the most expensive
part — that's the window where the error budget bleeds fastest, which
is exactly why fast triage tooling and clear roles matter more than
clever root-cause analysis in the moment. Second, "mitigated" (00:24)
and "closed" (00:40) are different states — mitigated means the
symptom has stopped, closed means the team has confirmed it's staying
stopped and handed off to the next lesson's work: the postmortem.

## Key terms

| Term | Meaning |
|---|---|
| Severity (SEV1–SEV4) | A tier assigned to an incident based on impact, which determines staffing, urgency, and communication requirements |
| Incident Commander (IC) | The single decision-maker who coordinates the response and declares resolution, without necessarily doing the technical fix themselves |
| Communications Lead | The role that owns outward-facing updates so the technical responders aren't interrupted for status checks |
| Scribe | The role that keeps a real-time, timestamped log of the incident, which becomes the factual record for the postmortem |
| Mitigated vs. closed | Mitigated means the symptom has stopped; closed means the team has confirmed it's staying stopped |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: why
does splitting the Incident Commander and Communications Lead roles
apart actually make the technical response faster, not slower, and
what's the practical difference between an incident being "mitigated"
and being "closed"?
