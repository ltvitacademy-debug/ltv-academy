# Lesson 20 — Capacity Planning for a Traffic Spike You Can See Coming

**Chapter 5 · Capacity Planning and Performance Engineering · Lesson 4 of 4**

## What you'll learn

- Why a known, scheduled event — a product launch, a seasonal sale,
  a marketing push — deserves its own capacity plan, separate from
  routine forecasting
- How to build a pre-scaling plan and verify it with a load test
  built for the exact expected spike, not a generic one
- What to put in place before the event so a problem is caught by
  monitoring instead of by a customer
- Why the plan includes a rollback and de-scale step, not just a
  scale-up step

## A known spike is a different problem than routine growth

Lesson 17 covered forecasting steady growth trends; this lesson
covers something structurally different — a spike you already know
is coming, on a specific date, often with a specific expected
magnitude: a product launch, a flash sale, a Black Friday weekend, a
marketing campaign with a hard air date, a live event. The good news
is this type of spike is the most plannable failure mode in all of
capacity engineering, precisely because it isn't a surprise. The bad
news is that teams still get caught by it constantly, almost always
because the plan existed only as an assumption instead of an actual
written, tested, owned plan with a named date attached to each step.

## Build a pre-scaling plan with a real deadline

A real pre-scaling plan works backward from the event date, with
each step owned by a specific person and dated:

- **Estimate the spike's magnitude** from the best available signal —
  a previous year's equivalent event, marketing's projected reach, or
  a comparable launch — and apply the same headroom discipline as
  routine forecasting, erring high rather than low for a one-shot
  event you can't easily recover from mid-spike.
- **Pre-provision capacity ahead of the date**, accounting for
  provisioning lead time: request cloud quota increases, pre-warm
  autoscaling groups or reserved capacity, scale database read
  replicas, and raise rate limits on downstream dependencies that
  will see traffic they don't normally see — all far enough ahead
  that the request actually clears before the event, not during it.
- **Load test against the exact expected load**, using the
  realistic-traffic discipline from Lesson 18, built specifically
  around this event's expected request mix rather than a generic
  test — a launch page hit by a flash of traffic behaves nothing like
  the steady-state traffic a generic load test usually models.

## Put monitoring and a kill switch in place before the event, not during it

The goal is for the first sign of trouble to come from a dashboard,
not a customer. That means, before the event starts: dashboards built
specifically for the event's key signals (not just the standard
service dashboard), alert thresholds tuned for the expected spike
traffic so normal spike behavior doesn't trigger constant false
alarms, a staffed war room or on-call escalation path for the
duration of the event, and feature flags or kill switches ready to
shed non-essential load (recommendation engines, non-critical
background jobs) if capacity gets tight. All of this has to exist
*before* the first minute of the spike — building a dashboard during
an active incident is exactly the reactive scramble this lesson is
about avoiding.

## The plan includes scaling back down, and a rollback

A complete spike plan doesn't stop at "survive the peak." It
includes a de-scale step once the event ends, so pre-provisioned
capacity doesn't sit there running up cost indefinitely, and a
rollback step defined in advance — if a specific pre-scaling action
turns out to cause its own problem (a bad autoscaling config, a
database replica that doesn't come up cleanly), the team should know
exactly how to reverse that one action without having to improvise a
fix live during the event itself. Writing the rollback path ahead of
time is the same discipline as a disaster recovery runbook from
earlier in this course — figured out calmly in advance, not invented
under pressure at the worst possible moment.

## Key terms

| Term | Meaning |
|---|---|
| Pre-scaling plan | A dated, owned sequence of capacity actions completed ahead of a known event, accounting for provisioning lead time |
| Event-specific load test | A load test built around the exact expected request mix and magnitude of a specific known event, not a generic traffic profile |
| Kill switch | A pre-built mechanism to shed non-essential load (e.g., disabling a recommendation engine) if capacity gets tight during an event |
| De-scale step | The planned step of scaling pre-provisioned capacity back down once a known event ends, to control ongoing cost |

## Check yourself

You've completed Chapter 5 when you can explain, without looking: why
does a known, scheduled traffic spike deserve a dated, owned
pre-scaling plan rather than being handled by routine capacity
forecasting alone, and what should already be in place — before the
event starts — so a problem is caught by monitoring instead of by a
customer?
