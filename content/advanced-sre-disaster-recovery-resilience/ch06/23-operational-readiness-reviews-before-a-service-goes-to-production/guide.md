# Lesson 23 — Operational Readiness Reviews Before a Service Goes to Production

**Chapter 6 · On-Call and Operational Excellence · Lesson 23 of 32**

## What you'll learn

- What an Operational Readiness Review (ORR) actually is, and why it
  functions as a real production gate, the same way code review gates
  a merge
- The five areas a real ORR checklist has to cover, and what counts
  as a genuine pass versus a box checked out of habit
- Who should own the sign-off, and why "the team that built it says
  it's ready" isn't the same as an ORR
- How a post-launch follow-up review closes the loop that a
  pre-launch review alone can't

## An ORR is a gate, not a formality

Code review exists so a second set of eyes catches a problem before
it merges, not after. An Operational Readiness Review is the same
idea applied to a service's first day in production: before traffic
hits it for real, someone other than the team that built it confirms
the operational basics are actually in place. A service that passes
an ORR in name only — a checklist filled in quickly to satisfy a
process requirement — gets exactly the outcome you'd expect from a
rubber-stamped code review: the problems show up later, in production,
at a worse time than they would have during review.

## The five areas a real ORR checklist covers

**Monitoring.** Does the service have dashboards for the metrics that
actually indicate health — latency, error rate, saturation — or only
whatever the framework emits by default? Are SLIs defined with real
target SLOs, not just "we'll watch it and see"?

**Alerting.** Does every alert that can fire route to an on-call
rotation that actually exists? Is each alert tied to a runbook, and
has anyone confirmed the alert doesn't fire on normal, expected
behavior — an alert that pages on noise gets ignored by the time it
matters?

**Runbooks.** Do runbooks exist for the failure modes this service is
likely to hit, written in the decision-tree format from Lesson 22,
and has anyone actually run them against this specific service, not
just a similar one?

**Capacity.** Has the service been load-tested at a realistic
multiple of expected peak traffic? Is autoscaling configured with
sane bounds, and have the service's own downstream dependencies been
checked for whether they can absorb this service's expected load
without becoming the new bottleneck?

**Rollback plan.** Can this specific deployment be rolled back inside
a defined time window, and is that mechanism actually tested — feature
flags that can be flipped off, a previous container image that's
still available to redeploy, a database migration that's confirmed
reversible rather than assumed to be?

```
ORR CHECKLIST (abbreviated)
[ ] Dashboards exist for latency, error rate, saturation
[ ] SLOs defined with named owners
[ ] Every alert routes to a real on-call rotation
[ ] Every alert has an attached, tested runbook
[ ] Load test run at >= 2x expected peak, results attached
[ ] Autoscaling bounds reviewed against dependency capacity
[ ] Rollback mechanism identified AND exercised in staging
[ ] Sign-off owner named, not "the team"
```

## Sign-off needs an owner outside the building team

An ORR run entirely by the team that built the service tends to
inherit that team's blind spots — they're confident about the parts
they tested and may not notice the parts they didn't think to test.
Real ORR practice puts sign-off in the hands of someone with
operational authority who didn't write the code: an SRE lead, a
platform team representative, or a rotating peer reviewer from another
team. That person's job isn't to re-litigate design decisions, it's to
hold the checklist against the evidence and say no when the evidence
isn't there — the same authority a senior reviewer has to block a pull
request that technically works but isn't safe to merge.

## The follow-up review closes the loop

A pre-launch ORR checks what the team can test before real traffic
exists. It can't catch what only shows up under production load — a
metric that looked fine under synthetic load testing but drifts once
real user behavior hits it, an alert that turns out noisier in
practice than in the dry run. A short follow-up review, typically two
to four weeks after launch, checks the service against its own
production data: did the SLOs hold, did any alert page more than
expected, did the on-call team actually use a runbook and find it
accurate? That follow-up is what turns the ORR from a one-time hurdle
into a real feedback loop.

## Key terms

| Term | Meaning |
|---|---|
| Operational Readiness Review (ORR) | A pre-production gate checking monitoring, alerting, runbooks, capacity, and rollback plan before a service takes real traffic |
| SLI / SLO | The measured indicator and its target threshold that an ORR confirms are actually defined, not assumed |
| Rollback plan | A tested, time-bounded mechanism to revert a deployment — not just an assumption that it would probably work |
| Follow-up review | A post-launch check, typically weeks after go-live, validating the ORR's assumptions against real production data |

## Check yourself

You're ready for Lesson 24 when you can explain, without looking: name
the five areas a real ORR checklist covers, and why sign-off authority
shouldn't rest solely with the team that built the service.
