# Lesson 9 — What SOAR Actually Automates, and What It Doesn't

**Chapter 3 · Building SOAR Playbooks · Lesson 1 of 4**

## What you'll learn

- What SOAR (Security Orchestration, Automation and Response) actually is,
  stripped of the vendor marketing language
- The real division of labor between **orchestration** (connecting tools),
  **automation** (running repeatable steps), and **response** (the action
  that changes system state)
- Which parts of incident handling SOAR genuinely replaces, and which parts
  it only speeds up for a human who's still deciding
- Why "autonomous SOAR" is mostly a marketing claim, and what the realistic
  scope looks like in a tool you already know: Microsoft Sentinel

## SOAR, without the marketing gloss

Every SIEM and XDR vendor sells some version of "SOAR" — Security
Orchestration, Automation and Response. The pitch often implies the
platform can triage an alert and decide what to do about it the way a
senior analyst would. That's not what's actually running under the hood.

Break the acronym apart and it gets more honest:

- **Orchestration** is the wiring — getting Sentinel, your ticketing
  system, Microsoft Entra ID, Defender for Endpoint, and Teams to pass data
  to each other through a common workflow engine, instead of an analyst
  tabbing between five consoles by hand.
- **Automation** is running a fixed, repeatable sequence of steps every
  time a condition is met — pull the user's risk score, look up the IP's
  geolocation, post a comment on the incident. Deterministic, not
  judgment-based.
- **Response** is the part that actually changes state in the real world —
  disabling an account, isolating a device, blocking an IP. This is the
  only piece with real blast radius, and it's the piece this chapter treats
  most carefully.

In Microsoft Sentinel, this whole stack is two pieces working together: an
**Automation Rule**, which watches for incidents matching a condition and
decides what to trigger, and a **Logic App playbook**, which is the actual
workflow — the sequence of connector actions that does the orchestration,
enrichment, and (optionally, behind a gate) the response.

## What SOAR genuinely replaces

SOAR is excellent, with no asterisk, at anything that is high-volume and
fully deterministic:

- Pulling context from three or four systems into one place on an
  incident, every time, without an analyst copy-pasting between tabs
- Posting a standardized comment or note the moment an incident opens, so
  the on-call analyst starts from a populated incident instead of a blank
  one
- Routing — assigning an incident to the right queue or team based on
  which analytics rule fired, which entities are involved, or which
  business unit owns the affected resource
- Closing a narrowly defined, already-proven-benign alert pattern (a
  specific scanner's known noisy signature, for example) so it never
  reaches a human queue at all

All four of those are cases where the decision rule is fixed in advance
and a human already agreed what "correct" looks like. The platform is
executing a decision that was already made, not making a new one.

## What SOAR does not genuinely replace

What a Logic App playbook cannot do is exercise judgment about a case it
wasn't specifically built for. A few concrete limits worth internalizing
before you build anything in this chapter:

- **It can't weigh ambiguous or conflicting signals.** A playbook has no
  way to know "this admin logged in from an unusual country, but there's
  also a change-ticket open for planned maintenance there this week" unless
  you built a specific check for exactly that case.
- **It can't decide an action is proportionate.** A condition can match
  ("impossible travel + high risk score"), but whether disabling that
  specific VIP's account right now is the right call given what else is
  going on is a judgment call a workflow engine doesn't make — which is
  exactly why Lesson 12 puts a mandatory approval step in front of any
  containment action.
- **It executes exactly the condition you wrote, including when that
  condition is wrong.** A playbook that auto-closes "low severity, single
  failed sign-in" incidents will keep closing them even during a real
  password-spray campaign, because nothing told it circumstances had
  changed.
- **It has no model of "this is a novel situation."** Every action a
  playbook takes was anticipated by whoever built it. A genuinely new
  attack pattern produces, at best, a playbook that does nothing useful
  and, at worst, one that takes the wrong fixed action anyway.

## The scope this chapter actually builds toward

By the end of this chapter you'll have built a real Automation Rule and
Logic App playbook that: triggers on incident creation, enriches the
incident with real context (user risk, asset criticality, geo-IP) before
anyone looks at it, and — only for actions with real blast radius —
prepares a containment action and stops at a human approval gate instead
of executing it unattended. That's the realistic, defensible shape of
SOAR: automate the pipeline, gate the action.

## Key terms

| Term | Meaning |
|---|---|
| Orchestration | Connecting separate tools (SIEM, identity, EDR, ticketing, chat) into one workflow instead of manual console-switching |
| Automation Rule | The Sentinel object that watches for incidents matching a condition and decides which playbook(s) to run and what metadata to set |
| Logic App playbook | The actual workflow of connector actions (Azure Logic Apps) that an Automation Rule, or an analyst, triggers |
| Deterministic action | A step that always produces the same result for the same input — the kind of step safe to fully automate |

## Check yourself

You're ready for Lesson 10 when you can explain, in your own words, why
"SOAR replaces analyst judgment" is an inaccurate claim, and give one
example of a decision in incident response that a Logic App playbook
should never be allowed to make unattended.
