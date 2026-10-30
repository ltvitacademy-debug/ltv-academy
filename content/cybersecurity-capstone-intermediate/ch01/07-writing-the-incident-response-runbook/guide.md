# Lesson 7 — Writing the First Incident-Response Runbook

**Chapter 1 · Intermediate Capstone: Multi-Source Detection and a Real Misconfiguration · Lesson 7 of 16**

## What you'll learn

- The difference between an incident-response *plan* (policy) and a *runbook* (tactical steps)
- The six phases Hartwell's runbook walks a responder through, in order
- Why severity criteria have to be decided and written down before any real alert, not during one
- Why this runbook gets written now, with no incident yet underway, on purpose

## A runbook is the tactical half of a plan

A full incident-response *plan* covers Hartwell's policy-level decisions: scope, severity scale,
communication chain, legal notification deadlines. A **runbook** is narrower and more tactical —
the specific sequence of steps a responder actually follows, in the moment, for the kinds of
incidents Hartwell is realistically going to see. Where the plan says *who gets called and when*,
the runbook says *what do I actually do, right now, with this alert in front of me*. Hartwell has
never had a real runbook before; this project writes the first one, built specifically around
the detection this project just stood up.

## The six phases

Mara structures the runbook around six phases, each with concrete, Hartwell-specific actions:

1. **Triage** — is this alert a real concern or likely noise? Check the entities involved
   (account, IP address), check whether the activity matches a known, expected pattern (a
   scheduled vendor session, a known traveling employee), and decide: escalate or close as benign.
2. **Scope** — if it's real, what else does it touch? Same account active anywhere else? Same
   source address seen against any other system? This phase exists to answer "is this bigger than
   the one alert" before containment decisions get made.
3. **Contain** — stop it from getting worse without destroying evidence: disable the specific
   account, not the whole server; block the specific source address at the firewall, not the
   whole port; isolate a single host rather than take down a shared system, when isolation alone
   solves the immediate problem.
4. **Eradicate** — remove the actual root cause, not just the symptom that got noticed — a
   misconfigured rule, a compromised credential, a vulnerable service, whatever the real "why"
   turns out to be once it's found.
5. **Recover** — bring things back to normal operation deliberately: restore from a known-good
   state if needed, validate before trusting the system again, and watch closely afterward rather
   than assuming the problem is definitely gone the moment it's fixed.
6. **After-action** — once it's resolved, document what happened, what the team learned, and
   what changes (a new alert, a new control, a process fix) should come out of it so the same
   thing is harder to miss next time.

## Deciding severity before it's needed

The runbook defines Hartwell's severity tiers up front — a simple SEV1–SEV4 scale, with concrete
criteria for each level (for example: SEV1 for any confirmed unauthorized access to an internal
admin system; SEV2 for a suspicious-but-unconfirmed alert touching an admin system; lower tiers
for activity that's anomalous but clearly contained to a low-value target). Deciding this now,
calmly, with no real incident underway, means a responder at 3 a.m. is matching an alert against
an existing scale instead of inventing a severity judgment from scratch under pressure.

## Why now, with nothing happening yet

Writing the runbook before any real incident has happened is deliberate, not incidental. A
runbook drafted in the middle of an actual incident is really just improvisation with better
formatting — the whole point of writing it now, calmly, with both Owen's operational input and
Renee's documentation requirements already folded in, is so the next real alert this project's
new correlation rule produces has somewhere concrete to go.

## Key terms

| Term | Meaning |
|---|---|
| Incident-response runbook | The tactical, step-by-step document a responder follows during a real incident |
| Triage | Deciding whether an alert represents a real concern or likely noise |
| Scope (incident) | Determining what else, beyond the original alert, an incident actually touches |
| Containment | Stopping an incident from getting worse while preserving evidence |
| Severity tier | A predefined level (e.g., SEV1–SEV4) with concrete criteria, decided in advance |

## Check yourself

You're ready for Lesson 8 when you can list, in order, the six phases this runbook walks a
responder through, and explain why Hartwell's severity tiers had to be decided now instead of
during the first real alert.
