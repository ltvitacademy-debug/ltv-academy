# Lesson 20 — When and How to Escalate to Tier 2

**Chapter 5 · Alert Triage & Investigation Workflow · Lesson 20 of 32**

## What you'll learn

- What a clean escalation actually hands Tier 2 — and what it spares them from redoing
- The real channels an escalation travels through: ticketing systems, direct handoff, and severity-based routing
- Why a messy escalation can cost more time than it saves
- How Lessons 17 through 19 — triage, validation and scoping, and the case note — all feed directly into this one handoff

## What Tier 2 actually needs to pick up a case

Escalation isn't throwing an alert over a wall and moving on — it's a **handoff**, and a clean one
means Tier 2 can start exactly where Tier 1 left off instead of re-running work that's already
done. A clean handoff hands Tier 2 four things: the **classification** Tier 1 already reached
(confirmed malicious, with the reasoning), the **scope** already established (what's been checked,
what's affected, what hasn't been checked yet), the **evidence already gathered** (the specific
logs, timestamps, and findings from validation — exactly what Lesson 19's case note format
captures), and a **clear reason for escalating** (which of the three criteria from Lesson 18 —
confirmed malicious, unclear scope, or needs deeper tools — applied here). Everything this chapter
has covered so far exists to produce exactly those four things.

## Why a messy escalation costs more than it saves

An escalation that skips any of those four pieces doesn't actually save Tier 2 time — it just
moves the missing work downstream, onto a team with less availability and higher-stakes cases
stacking up behind it. A Tier 2 analyst who receives "this looks bad, escalating" with no case note
has to start by re-validating the alert from scratch, because they have no way to know what Tier 1
already confirmed. That's slower overall than if Tier 1 had simply kept the alert and finished the
validation themselves — the whole point of escalating is to hand off a problem that genuinely needs
Tier 2's deeper access or authority, not to hand off Tier 1's unfinished homework.

## The real escalation channels

Escalations travel through a small number of real channels, and which one is used usually depends
on urgency. A **ticketing system** is the default path for most escalations — the case note and
evidence get attached to a ticket, routed to the Tier 2 queue, and Tier 2 picks it up in the order
their workload allows. A **direct handoff** — a phone call, a page, or a message in a shared
incident channel — supplements the ticket when something can't wait for the normal queue, such as
active data exfiltration in progress; the direct handoff gets a human on the case immediately, but
the ticket still gets filed so there's a record. **Severity-based routing** decides which path an
escalation takes in the first place: most SOCs route by a severity level attached to the case, so a
confirmed critical incident triggers an immediate page or call in addition to a ticket, while a
high-severity-but-not-urgent case rides the normal ticketing queue with an appropriate response-time
expectation attached.

## A clean handoff, start to finish

Picking up the file-share example from Lesson 18: Tier 1 validated the login as real, confirmed no
other accounts were affected, found the unfamiliar file-share access, and documented all of it with
timestamps in the case note — exactly the kind of note Lesson 19 described. Because the activity
touches a resource Tier 1 doesn't have the tooling to fully investigate, this meets the "needs
deeper tools" escalation criterion. The analyst files a ticket with the full case note attached, sets
the severity based on the sensitivity of the file share involved, and — because that severity level
calls for it — also sends a direct message in the team's incident channel so Tier 2 knows it's
waiting. Tier 2 opens the ticket already knowing what happened, what was checked, and what wasn't —
and starts their part of the investigation instead of repeating Tier 1's.

## Key terms

| Term | Meaning |
|---|---|
| Clean handoff | An escalation that includes classification, scope, evidence, and a clear reason, so Tier 2 doesn't redo Tier 1's work |
| Ticketing system | The default path for routing an escalation's case note and evidence to the Tier 2 queue |
| Direct handoff | An immediate phone call, page, or channel message used alongside a ticket for urgent cases |
| Severity-based routing | Using a case's severity level to decide whether it goes through the normal queue, an immediate page, or both |

## Check yourself

A Tier 1 analyst escalates an alert with the message "this looks bad, escalating" and no case note.
What specifically does Tier 2 now have to redo that a clean handoff would have spared them?
