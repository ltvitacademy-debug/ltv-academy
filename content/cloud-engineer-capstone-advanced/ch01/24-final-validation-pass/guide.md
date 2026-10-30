# Lesson 24 — The Final Validation Pass

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 24 of 26**

## What you'll learn

- Why validating each hardening change in isolation isn't the same as validating the
  platform, and what actually closes that gap
- How to structure one combined drill that exercises AKS, the multi-cloud Terraform,
  the FinOps dashboard, and every Lesson 23 hardening change together
- What "pass" and "fail" concretely mean for each piece of this drill, decided before
  the drill runs, not argued about afterward
- Why a drill that reveals a problem on a controlled schedule is a better outcome than a
  drill that reveals nothing

## Why one combined drill, not five separate tests

Lesson 23 made several real changes: a version-controlled ceiling bump, a default
`topologySpreadConstraints` policy, a new `PodDisruptionBudget`, two dashboard/alert
fixes from the audit, and a budget anomaly alert. Each one could be tested alone, and
each one passing alone would still miss the actual risk: these pieces are meant to work
*together*, under real load, during a real scheduled capacity change — which is exactly
the condition nobody fully tested before the original incident either. Theo schedules one
game-day drill that reproduces next season's sale conditions as closely as a controlled
exercise can, across both the AKS cluster and the secondary-cloud failover target the
multi-cloud Terraform modules manage.

## The drill plan, decided before it runs

| Step | What happens | Pass condition, decided in advance |
|---|---|---|
| 1. Load ramp | Synthetic traffic ramps to last sale's actual peak, then 20% past it | Autoscaler reaches the new sale-window ceiling without throttling requests |
| 2. Spread check | Per-AZ dashboard panel watched live during the ramp | All three AZs stay within the same tight band validated in Lesson 22 — no single zone spikes |
| 3. Controlled node drain | A node in the busiest AZ is deliberately drained mid-ramp | The `PodDisruptionBudget` blocks enough simultaneous evictions to avoid a capacity gap; traffic shows no error-rate increase |
| 4. Audit-fix check | The consumer-lag alert and the failover health check (Lesson 23's audit fixes) are watched under the same load | Both report per-dimension, not a masking average — confirmed by deliberately lagging one consumer pod and checking the alert fires on it specifically |
| 5. Multi-cloud failover | Traffic is deliberately failed over to the secondary cloud mid-drill, using the same Terraform modules from Lesson 6 | The secondary environment absorbs traffic within the planned RTO, with its own per-AZ (or per-region) balance holding, not just "the app responded" |
| 6. Cost signal | Billing/cost-allocation data for the drill window is checked the next business day | The budget anomaly alert fired once, tagged correctly to the scheduled ceiling bump — not silently, and not as an unexplained spike |

Deciding each pass condition **before** the drill runs is what keeps this a validation
instead of a storytelling exercise after the fact — there's no room to quietly redefine
"success" if something comes back borderline.

## What actually happened in the drill

The drill surfaces one real, minor finding worth naming honestly: the failover cutover to
the secondary cloud lands a few seconds past the originally planned RTO — inside an
acceptable margin, but not instant. That's logged as a follow-up for the documentation
pass, not treated as a drill failure, because the drill's own pass condition was "within
planned RTO," which it met. Every other step passes cleanly, including the deliberately
triggered node drain and the deliberately lagged consumer pod.

## Why a drill that finds something is the better outcome

It would be natural to want this drill to come back with a clean sweep and no findings at
all. The RTO margin finding is actually the more valuable result: it's a small, specific,
now-documented fact about the real system, discovered on a controlled schedule with time
to decide whether it matters — not discovered for the first time during an actual
failover under real pressure. This is the same principle the incident itself taught in
Lesson 13: a real number, even an imperfect one, beats an assumption every time.

## Key terms

| Term | Meaning |
|---|---|
| Combined validation | Testing multiple hardening changes together, under the real condition they're meant to work under jointly, rather than each in isolation |
| Pass condition | A specific, measurable threshold for success, defined before a test runs |
| RTO (Recovery Time Objective) | The target maximum time to restore service during a failover, measured against during a drill rather than assumed |

## Lab

1. For each of the six drill steps in the table, write the specific pass condition in your
   own words, without looking at the table.
2. Explain why defining pass conditions before the drill runs matters more than it might
   seem.
3. Write one sentence on why the RTO-margin finding is logged as a follow-up rather than
   treated as a failed drill.

## Check yourself

You're ready for Lesson 25 when you can explain why validating Lesson 23's changes
together, under one realistic combined drill, proves something that validating each change
alone could not — and you can name the one real finding this drill actually produced.
