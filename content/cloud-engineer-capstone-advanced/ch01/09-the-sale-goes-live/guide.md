# Lesson 9 — The Sale Goes Live

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 9 of 26**

## What you'll learn

- What the first hours of Driftwood's biggest sale of the year actually look like from inside the
  platform, minute by minute
- How to read the FinOps dashboard's story during a real traffic ramp, and why that story looks
  completely healthy
- Why this lesson ends on an uneasy note instead of a clean win — and why noticing that unease,
  rather than resolving it, is the actual skill this lesson is teaching

## 9:00 AM: the sale opens

Driftwood's biggest sale of the year opens at 9:00 AM, promoted across email and social the night
before. Theo watches from the platform team's war room, with the FinOps dashboard from Lesson 7
up on one screen. Traffic ramps the way the marketing team predicted: a sharp climb in the first
twenty minutes, then a sustained plateau well above normal baseline.

```
09:00 — baseline traffic, checkout-api at 6 replicas
09:08 — traffic up 4x, HPA scales checkout-api to 14 replicas
09:22 — traffic up 9x, HPA scales checkout-api to 26 replicas
09:40 — traffic holds steady at 9-10x baseline, checkout-api at 28 replicas
```

That ramp — fast, then a surge, then a series of rapid HPA scale-events — is exactly the pattern
Lesson 8's single-origin load test never reproduced. For the first forty minutes, nobody on the
platform team has any reason to think that matters.

## What the FinOps dashboard shows

By 9:45, the FinOps dashboard is telling a reassuring story:

- **Cluster-wide CPU utilization**: averaging 58% across `apppool` — comfortably inside the range
  Theo planned for, with headroom before the autoscaler's 15-node ceiling.
- **Cost burn-down**: tracking almost exactly on the forecasted line Casey approved — the extra
  nodes the autoscaler added are costing what the capacity model predicted they would.
- **Cost per namespace**: `storefront`'s share of spend is up proportionally with traffic, which
  is the expected, healthy shape — cost scaling with the revenue driving it, not running ahead of
  it.

Every number on the one dashboard built specifically to answer "are we spending what we expected
on the capacity we have" says yes. Casey checks in over Slack at 9:50 and Theo reports exactly
that: on budget, scaling as planned, nothing to flag.

## An uneasy note

At 10:15, a message lands in the `#platform-oncall` Slack channel from someone on the customer
support team, relaying a handful of scattered reports: a few customers mentioning checkout felt
slow, or that a payment confirmation took longer than expected before finally going through.
It's not a flood of complaints — just a handful, easy to attribute to normal sale-day chatter, a
flaky customer connection, or a browser tab somebody left open too long.

Theo glances back at the FinOps dashboard. Cluster-wide CPU: 58%, unchanged. Cost burn-down: still
on the forecasted line. Nothing on the one screen built to answer "is this platform healthy under
load" is showing anything unusual. He makes a note to keep an eye on it, flags it lightly to
Casey as "a few scattered reports, nothing the dashboard is showing" — and the sale keeps running.

## Why this lesson doesn't resolve that note

It would be easy to write this lesson so that Theo immediately digs in, finds the problem, and
fixes it before lunch. That's not what happens here, and deliberately so: the entire reason this
capstone exists is to show what it actually looks like when a healthy-looking dashboard and a
handful of easy-to-dismiss reports coexist for a little while before anyone connects them. Theo
isn't making a mistake by not panicking at 10:15 — a few scattered complaints against a dashboard
showing 58% cluster-wide CPU and an on-budget cost curve is not, by itself, a five-alarm signal.
It's a loose thread. What happens when someone finally pulls on it — and what it turns out to be
connected to — is where this capstone goes next.

## Key terms

| Term | Meaning |
|---|---|
| Traffic ramp | The real, observed climb in request volume once a promoted sale goes live, as opposed to a modeled or tested forecast |
| Scale-event | A single HPA action that changes a Deployment's replica count in response to a metric crossing its threshold |
| Loose thread | A small, easy-to-dismiss signal that doesn't yet justify an investigation on its own, but turns out to matter once connected to something else |
| Cost-to-revenue shape | Whether cost is scaling proportionally with the traffic/revenue driving it, a key health signal on a FinOps dashboard |

## Lab

1. Write the sale's first-forty-minutes timeline (09:00 through 09:40) in your own words, and
   explain why that specific ramp pattern is the one Lesson 8's load test never reproduced.
2. Write two sentences: one from Theo's perspective explaining why the 10:15 reports don't look
   urgent given what the FinOps dashboard shows, and one naming what information Theo does *not*
   have in front of him at 10:15 that might change that read.

## Check yourself

You're ready for Lesson 10 when you can describe the sale's traffic ramp, state exactly what the
FinOps dashboard shows at 9:45 and why it looks healthy, and explain why a handful of scattered
checkout complaints against that dashboard is a loose thread rather than an obvious five-alarm
signal — without yet knowing how the two connect.
