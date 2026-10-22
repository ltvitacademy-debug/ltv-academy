# Lesson 18 — Incident/Problem/Change Lab

**Chapter 4 · Core ITIL 4 Practices: Incident, Problem & Change · Lesson 18 of 28**

## What you'll learn

- How to apply incident, problem, and change management to one realistic scenario
- How to triage an incident using impact and urgency
- When a recurring symptom should trigger a problem investigation
- How to decide between a normal change and an emergency change for a fix
- How to trace one scenario cleanly through all three practices

## The scenario

It's 8:40 a.m. on a Monday. The service desk gets a call: the order
management system is throwing errors every time a customer service
rep tries to apply a discount code at checkout. Three reps have
reported it in the last ten minutes, and the contact center supervisor
says it's happening to roughly one in five transactions — customers
are starting to complain, and reps can't manually work around it
because the discount field just won't submit. You're the service desk
analyst taking this call.

This is the fourth time this exact symptom has appeared this month.
Each previous time, it was resolved the same way: a tier-two engineer
manually restarted the discount-pricing microservice, and the errors
stopped for a few days before returning.

## Working it as an incident first

Your first move is incident management, and your first move there is
triage, not investigation. This is logged as an incident immediately:
service affected (checkout discount application), impact (roughly 20%
of transactions, multiple customers affected, revenue and reputation
at stake), and urgency (actively happening right now, during business
hours). That combination of impact and urgency puts this at high
priority — not necessarily a full major incident, since it isn't a
total outage, but high enough to escalate past routine ticket
handling. Given the pattern from the last three occurrences, you
escalate directly to the tier-two engineer who already knows the fix,
rather than running through a slower tiered investigation from
scratch — restarting the microservice is a known, fast path back to
normal service. The engineer restarts it, discount codes start
working again, and the incident is resolved. Notice what just
happened: service is restored in minutes, and nobody has yet explained
*why* the microservice keeps failing.

## Recognizing this needs a problem record

A single restart-and-move-on is a reasonable response to one
incident. A fourth occurrence of the identical symptom in a month is
exactly the pattern that should trigger problem identification: this
isn't bad luck, it's a recurring cause that incident management keeps
papering over. You (or your incident manager) open a problem record,
linking it to this incident and the three before it. Problem control
takes over the investigation: the engineering team pulls logs from
each of the four occurrences and finds that the discount-pricing
microservice is slowly leaking memory and crashing roughly every
seven to ten days under normal load. Root cause: a memory leak in a
recent code deployment, not a configuration or infrastructure issue.
Because a permanent code fix isn't ready yet, this becomes a known
error — documented, with "restart the microservice" recorded as the
official workaround until the real fix ships.

## Taking the fix through change enablement

Engineering identifies the fix: a corrected version of the
discount-pricing service with the memory leak patched. This is not a
standard change — it's new code going into a revenue-facing path, so
it needs real assessment of risk and impact, which means it's a
normal change. It goes through the defined evaluation: what's being
changed, what the rollback plan is if the new version misbehaves, and
who needs to sign off given that checkout revenue is involved. Because
the known error has a working interim fix (the restart) and isn't
actively causing an outage right now, there's no need to rush this
through as an emergency change — it gets properly assessed, approved
by the appropriate change authority, and scheduled for a low-traffic
deployment window.

If instead this had been discovered *during* a live outage with no
workaround available, the same fix might have gone through as an
emergency change — authorized fast by a smaller group, with full
documentation completed afterward. The authorization step doesn't
disappear either way; only its speed does.

## Closing the loop

The patched service deploys successfully in its scheduled window.
Engineering monitors it for the following two weeks: no further
memory-leak crashes, no recurrence of the discount-code incident. The
known error is closed, referencing the change that fixed it. The
problem record is closed, referencing the known error. And the
original incident — along with the three before it — now has a
documented explanation and a permanent resolution, instead of a fix
that was really just a monthly ritual.

## Check yourself

Walk through this scenario again from memory, out loud or on paper,
and name which practice owns each of these decisions: (1) escalating
straight to the engineer who knows the restart fix instead of
investigating from zero, (2) deciding a fourth occurrence warrants a
root-cause investigation, (3) deciding the memory-leak fix should be a
normal change rather than an emergency change, and (4) deciding when
the known error can finally be closed.
