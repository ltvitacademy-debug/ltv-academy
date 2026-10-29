# Lesson 9 — Triage at Incident Scale, Not Just Single Alerts

**Chapter 3 · Detection & Analysis Deep Dive · Lesson 9 of 32**

## What you'll learn

- Why a **confirmed incident** usually means dozens of related alerts and events, not the one
  alert that first got an analyst's attention
- The real difference between single-alert triage (Lesson 3) and incident-scale analysis
- How analysts pull related alerts together using a shared entity instead of treating each one
  as its own case
- Why treating every alert in a cluster as a separate, unrelated ticket wastes time and hides the
  real attack

## From one alert to a confirmed incident

Lesson 3 covered triage at the single-alert level: a sign-in from an unfamiliar country lands in
the queue, and the analyst's job is to decide, quickly, whether it's a real threat or noise. That
skill doesn't go away once an alert is confirmed real — it's just the entry point. The moment an
analyst confirms that one alert represents actual malicious activity, the job changes shape. A
real incident is almost never just that one alert. It's the alert that happened to fire first,
sitting on top of a cluster of related activity: a mailbox rule change, an OAuth app grant, a
suspicious sign-in, a file download, a lateral RDP connection — all tied to the same compromised
account or host, often spread across identity, email, and endpoint systems. Confirming the first
alert doesn't close the case. It opens it.

## A concrete example: one alert becomes twelve

Say the alert that lands in the queue is "impossible travel" on a user's account — a sign-in from
two geographically distant locations within minutes of each other. Single-alert triage confirms
it's real: no VPN explanation, no travel on record. Incident-scale triage asks a different
question immediately: what else is tied to this same account in the same window? Pulling every
event tied to that user turns up a new mailbox forwarding rule created eleven minutes later, an
OAuth consent grant to an unfamiliar app two minutes after that, and a download of a shared
finance folder twenty minutes after that. That's not one alert — it's a confirmed account
takeover with four to twelve related events, and every one of them matters to understanding what
the attacker actually did.

## Grouping by entity, not by alert ID

The practical move is to stop triaging alerts one at a time once an incident is confirmed, and
instead pull every alert and raw event sharing the same entity — the same user account, the same
host, the same external IP — into one working set. That's the same entity-based thinking behind
Sentinel's investigation graph (Chapter 6 of the Sentinel course covers this directly): the graph
exists precisely because a confirmed incident is a cluster of connected activity, not a single
point. At incident scale, an analyst's real job is to build that cluster deliberately — querying
for every event tied to the compromised account or host across every log source — rather than
waiting for the platform to hand it over as a pre-built graph.

## Why skipping this step is a real failure mode

Treating each alert in a cluster as its own separate ticket is one of the most common ways real
incidents get under-investigated. An analyst who closes the "impossible travel" alert as
"confirmed, escalated" without pulling the mailbox-rule and OAuth-grant events tied to the same
account has technically done their job on paper, while missing that the attacker already set up a
way to keep reading email after the password gets reset. Incident-scale triage exists specifically
to catch that gap before containment starts (Chapter 4) — because containment decisions made on
an incomplete picture of what happened are decisions made on bad information.

## Key terms

| Term | Meaning |
|---|---|
| Single-alert triage | Deciding whether one alert is a real threat or noise (Lesson 3's scope) |
| Incident-scale triage | Pulling every alert and event tied to a confirmed incident's entities into one working set |
| Entity-based grouping | Collecting activity by shared user account, host, or IP rather than by individual alert ID |
| Alert cluster | The full set of related alerts and events that together make up one real incident |

## Check yourself

An "impossible travel" alert is confirmed real. Why isn't closing that one alert, by itself, a
complete triage of the incident — and what should the analyst pull next?
