# Lesson 15 — Security Incident Response: Overview

**Chapter 5 · Security Operations on the Platform · Lesson 15 of 24**

## What you'll learn

- Why a security breach, a phishing report, or detected malware needs a dedicated application, not a regular Incident record
- How Security Incident Response (SIR) reuses the same `task`-table extension pattern this path has relied on since Course 2, with its own specialized workflow on top
- The real phases a security incident moves through: containment, eradication, and recovery — and why that order matters
- Why a SIR record carries legal, compliance, and investigative concerns a regular ITSM Incident never has to
- How SIR's post-incident review closes the loop instead of just closing the ticket

## This is not a regular Incident with a different label

ServiceNow ITSM Implementation covered Incident Management in depth: a service is degraded or
unavailable, you restore it, you close the record. Security Incident Response looks superficially
similar — it's a record, it has a state field, it gets assigned and worked — but it tracks
something fundamentally different in nature. A regular Incident asks "what's broken, and how fast
can we restore service?" A Security Incident asks "has this organization been compromised, who did
it, what did they touch, and what does the law or a regulator now require us to do about it?" A
printer outage and a confirmed phishing campaign that just harvested forty employees' credentials
are not the same kind of problem, even though both could, in theory, be logged as "an incident."
That difference in *nature* — not just severity — is exactly why ServiceNow ships Security Incident
Response as its own dedicated application, `sn_si_incident`, rather than asking security teams to
just use heavier priority values on the regular Incident table.

## Built on the same foundation, with its own workflow on top

Nothing about *how* SIR is built on the platform is new to you. ServiceNow Scripting & Application
Development's coverage of extending `task` showed exactly this pattern: a specialized table that
inherits `task`'s core fields — short description, assignment group, state, work notes, activity
log — and layers its own fields and logic on top. The Security Incident table does the same thing.
What's different is the workflow layered on top of that familiar foundation, because a security
incident's lifecycle doesn't match a regular Incident's "New → In Progress → Resolved → Closed"
path at all. SIR's lifecycle is built around three real response phases, and a fourth step after
the dust settles.

```
Regular Incident lifecycle:          Security Incident lifecycle:
New -> In Progress -> Resolved       Draft/Analysis -> Contain -> Eradicate
  -> Closed                            -> Recover -> Review -> Closed
(restore service, done)              (stop it, remove it, recover,
                                       then learn from it)
```

## Containment, eradication, and recovery — and why the order is the point

**Containment** comes first, and deliberately before you've even fully understood the threat:
stop it from spreading or doing further damage right now — isolating an infected endpoint from the
network, disabling a compromised account, blocking a malicious IP at the firewall. You contain
before you fully understand, because waiting to understand everything first lets the damage keep
growing.

**Eradication** comes next: remove the actual root cause, not just the symptom you contained.
Isolating an infected laptop from the network (containment) doesn't remove the malware sitting on
its disk — eradication is the actual malware removal, the patching of the vulnerability that let
the attacker in, the deactivation of credentials the attacker is known to have stolen.

**Recovery** comes last: restoring normal operation with confidence the threat is actually gone —
reconnecting the cleaned endpoint, restoring from a verified-clean backup, monitoring closely for
any sign of recurrence before declaring the incident truly over. Doing recovery before eradication
is finished just reconnects a still-infected system to the network — the exact mistake this ordered
phase model exists to prevent.

## Why the legal and investigative dimension changes everything

A regular Incident's work notes are for troubleshooting. A Security Incident's work notes may
become evidence — read, eventually, by legal counsel, a regulator, a cyber-insurance carrier, or
in a worst case, a court. That reality shapes how SIR records get used in practice: documenting
exactly what was found, when, by whom, and what action was taken, with a level of precision and an
unbroken chain of custody that a routine "fixed it, closing" Incident note never needs. Many
organizations also route specific SIR categories — a confirmed breach involving personal data, for
example — through notification obligations that simply don't exist for an outage ticket. This is
the real reason SIR isn't "Incident Management with a scarier name": the record exists inside a
different set of obligations from the moment it's opened.

## Post-incident review: closing the loop, not just the ticket

SIR's final phase, after Recovery, is a structured post-incident review: what actually happened,
how was it detected, how effective was the response, and what should change — a new detection
rule, a patched gap in the vulnerability management process (Lesson 16 picks this up directly), a
revised containment runbook — so the same category of incident is caught faster, or prevented
outright, next time. A regular Incident closes when service is restored. A Security Incident
isn't really finished until that review happens, because the whole point of tracking security
incidents formally is organizational learning, not just one-off firefighting.

## Key terms

| Term | Meaning |
|---|---|
| Security Incident Response (SIR) | ServiceNow's dedicated application (`sn_si_incident`) for tracking real security incidents, built on `task` with its own specialized workflow |
| Containment | Stopping an active threat from spreading further, before root cause is fully understood |
| Eradication | Removing the actual root cause of a security incident, not just its visible symptom |
| Post-incident review | SIR's structured final phase: what happened, how effective the response was, and what should change |

## Check yourself

You're ready for Lesson 16 when you can explain, without looking: why does ServiceNow give security
incidents their own dedicated application instead of just using the regular Incident table with a
higher priority, what does each of containment, eradication, and recovery actually do, and why is
doing them out of order a real mistake rather than just a stylistic preference?
