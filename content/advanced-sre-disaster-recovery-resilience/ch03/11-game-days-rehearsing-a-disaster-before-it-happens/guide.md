# Lesson 11 — Game Days: Rehearsing a Disaster Before It Happens

**Chapter 3 · Chaos Engineering and Resilience Testing · Lesson 3 of 4**

## What you'll learn

- How a **game day** differs from a single chaos experiment — broader
  scope, a real scenario, and the human response tested alongside the
  system
- Why a game day tests the team's process (paging, roles, decisions
  under pressure) just as rigorously as it tests the infrastructure
- What a scripted scenario and a real debrief look like in practice
- Why some of the most valuable game-day findings are about
  communication and ownership, not code

## From one experiment to a whole scenario

The chaos experiments from the last two lessons are narrow and
technical by design: one hypothesis, one injected failure, one
measured result. A **game day** is a different, broader exercise
built on the same safety discipline — blast radius, abort criteria,
business hours, people watching — but run against a full scenario
instead of a single failure. "A region goes down," "the primary
database becomes unreachable for ten minutes," "a third-party payment
processor starts timing out" — a game day picks a scenario the team
actually believes could happen, schedules it like any other planned
work, and runs the organization through it as if it were real,
usually with chaos tooling injecting the technical half of the
scenario underneath.

## Testing the system and the people, at the same time

Here's what makes a game day different from just a bigger chaos
experiment: it deliberately tests the **human response process**
alongside the technical system. Does the on-call engineer actually get
paged correctly? Does whoever picks up the page know they're supposed
to declare an incident and pull in an incident commander, or do they
quietly try to fix it alone for twenty minutes first? Does the status
page actually get updated, and does someone remember to notify the
account team before a customer does? A system that fails over flawlessly
but whose team has no idea who's supposed to communicate what to whom
is not actually ready for a real disaster — and a game day is one of
the only ways to find that out before it matters. This is close to
what Google's SRE practice calls DiRT (Disaster Recovery Testing): a
deliberately scheduled exercise where real production systems are
put through real scenarios specifically to validate both the technical
recovery path and the organizational one.

## Running the scenario

A real game day has a written scenario and a facilitator who knows the
intended outcome but doesn't reveal it upfront — the team has to work
the problem the way they would during an actual incident: declare
severity, assign an incident commander, communicate status, and work
toward resolution, while the facilitator injects further complications
if the scenario calls for it ("now the status page itself is down
too"). Some teams run a lighter, tabletop version of this with no
real infrastructure touched at all — sometimes called a "wheel of
misfortune" exercise — where the team talks through a past or
hypothetical incident step by step. Both versions share the same goal:
rehearsing the decisions and communication patterns under realistic
pressure, in a setting where getting it wrong costs nothing but
learning.

## The debrief is where the value gets captured

A game day that ends the moment the scenario resolves has wasted most
of its value. The debrief — run like a blameless postmortem, the same
discipline covered earlier in this path — is where the team writes
down what actually happened: who got paged and when, how long it took
to declare an incident, which runbook step was missing or wrong, which
dashboard didn't actually show the signal someone needed, and who
didn't know they were supposed to be in the room. Those findings are
frequently more valuable than anything the technical failure itself
revealed, because they're the gaps that turn a recoverable technical
issue into a prolonged, confusing real outage.

## Key terms

| Term | Meaning |
|---|---|
| Game day | A scheduled, scenario-based exercise that tests both the technical system and the team's human response process together |
| DiRT | Google's term (Disaster Recovery Testing) for deliberately scheduled exercises that validate recovery against real production scenarios |
| Wheel of misfortune | A lighter, tabletop version of a game day: the team talks through an incident scenario without touching real infrastructure |
| Debrief | The blameless, post-exercise review where process gaps — paging, roles, communication, runbooks — get written down and acted on |

## Check yourself

You're ready for Lesson 12 when you can explain, without looking: what
does a game day test that a single chaos experiment doesn't, and why
is the debrief often where the exercise's real value shows up?
