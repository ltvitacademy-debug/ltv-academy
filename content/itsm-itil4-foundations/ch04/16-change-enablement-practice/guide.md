# Lesson 16 — Change Enablement Practice

**Chapter 4 · Core ITIL 4 Practices: Incident, Problem & Change · Lesson 16 of 28**

## What you'll learn

- The ITIL 4 purpose statement for change enablement
- Why ITIL 4 renamed "change management" to "change enablement"
- The three change types: standard, normal, and emergency
- Who authorizes each type, and why that differs by risk
- Why "maximize successful changes" is not the same as "minimize changes"

## The purpose: more successful changes, properly assessed

ITIL 4 defines the purpose of change enablement as maximizing the
number of successful service and product changes by ensuring risks
are properly assessed, authorizing changes to proceed, and managing a
change schedule. Notice what that purpose statement does *not* say:
it doesn't say "prevent changes" or "slow changes down." A change
process that blocks everything is just as much a failure as one that
rubber-stamps everything recklessly. The goal is successful change at
whatever pace the organization can sustain safely — fewer failed
changes, fewer changes that cause incidents, not fewer changes.

## Why the name changed

In ITIL v3, this practice was called "change management." ITIL 4
renamed it **change enablement** specifically to avoid confusion with
organizational change management — the separate discipline of
helping people adapt to new ways of working, tools, or structures.
IT change enablement is about assessing and authorizing changes to
services, systems, and configuration items; it has nothing to do with
managing how employees feel about a reorganization. The rename is a
small detail, but it's a real and deliberate ITIL 4 change worth
remembering precisely, because the two "change management" concepts
get confused constantly in practice.

## Standard changes: pre-authorized and repeatable

A **standard change** is low-risk, well-understood, and has been
done the same way successfully many times before — resetting a
password, provisioning a standard laptop image, adding a user to an
existing distribution list. Because the risk and the procedure are
both already known, standard changes are **pre-authorized**: there's
a model or template for exactly how to do it, and no one needs to
seek individual sign-off every single time it's performed. This is
what lets routine, high-volume work move fast without becoming a
bottleneck in front of a change advisory board.

## Normal changes: assessed and scheduled

A **normal change** is anything that needs individual assessment —
its risk and impact aren't already proven safe by repetition. Normal
changes go through a defined evaluation and authorization process:
someone (or a change authority, which might be a single approver or
a change advisory board depending on risk level) reviews what's being
changed, what could go wrong, and what the rollback plan is, then
authorizes it to proceed, usually scheduled for a time that minimizes
disruption. The more risk and impact a normal change carries, the
more scrutiny and the more senior the required authorization tends
to be.

## Emergency changes: fast, but still real authorization

An **emergency change** must be implemented as soon as possible —
often because it's the fix for a major incident that's actively
hurting the business. Speed is the point, but ITIL 4 is explicit that
emergency changes still go through authorization; it's an expedited
version of the process, not a skipped one. A smaller group of
authorizers, available on short notice, reviews the change quickly
and approves (or rejects) it, and the full paperwork and review can
be completed after the fact. Skipping authorization entirely isn't an
emergency change — it's an unauthorized change, which is exactly what
this practice exists to prevent.

## Key terms

| Term | Meaning |
|---|---|
| Change enablement | The ITIL 4 practice that maximizes successful changes by properly assessing risk |
| Standard change | Low-risk, well-understood, pre-authorized; no individual sign-off needed each time |
| Normal change | Needs individual assessment and authorization through a defined process |
| Emergency change | Must be implemented ASAP, with an expedited but still-real authorization process |
| Change authority | The person or group with the power to authorize a given change |

## Check yourself

Your organization wants to fix a major incident right now by changing
a firewall rule in production. Why would calling this an "emergency
change" still require some form of authorization, rather than just
letting the on-call engineer make the edit unilaterally?
