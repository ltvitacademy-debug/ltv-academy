# Lesson 23 — Hardening the Platform for Next Season

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 23 of 26**

## What you'll learn

- How the three workstreams Lesson 20 scoped — the audit, the capacity number, and
  documentation — turn into actual implementation work
- What the Lesson 19 dashboard/alert audit actually found once Theo ran it
- Concrete platform changes made ahead of next season, each traceable to a specific
  lesson earlier in this incident
- Why a hardening pass that isn't itself tested is just a hope, not a fix — which sets up
  Lesson 24

## What the audit actually found

Theo closes out the audit promised in Lesson 19: every dashboard panel and alert
threshold reporting a single aggregate across AZs, nodes, or regions, reviewed one by one.
It surfaces two more real candidates, not an exhaustive rewrite of the whole platform:

| Finding | Risk it mirrors | Action taken |
|---|---|---|
| The order-processing queue's consumer-lag alert averaged across all consumer pods | Could mask one pod silently falling behind while the average looks healthy, the same way the FinOps dashboard masked one AZ | Alert threshold split per-consumer, not just cluster-wide |
| The secondary-cloud failover region's health check reported one aggregate "healthy/unhealthy" status across all its node pools | Could report "healthy" while one node pool was actually degraded | Health check broken out per node pool, surfaced in the same per-AZ-style panel pattern |

Two findings, both fixed, is the honest result — not twenty, and not zero. That's worth
stating plainly: the audit's job was never to prove the platform has no more blind spots,
only to find the ones that actually exist and fix them.

## Making the Lesson 22 capacity agreement durable

The sale-window ceiling bump Casey and Dana agreed to in Lesson 22 only holds up if it
survives the next person who touches the Terraform or the HPA manifests. Theo hardens it
into code instead of a verbal agreement:

- The scheduled ceiling bump becomes a version-controlled Terraform variable change tied
  to a calendar date, reviewed in a pull request like any other infrastructure change —
  not a manual `kubectl patch` someone has to remember to run and then undo.
- `topologySpreadConstraints` with `maxSkew: 1` is no longer specific to the one deployment
  that broke during the incident — it's rolled out as the **default** for every
  multi-replica deployment in the cluster, closing the same class of risk everywhere at
  once rather than one incident at a time.
- A **PodDisruptionBudget** is added alongside the spread constraint on every
  customer-facing deployment, so a node drain or a rolling update during the next sale
  can't accidentally take out enough replicas in one zone to recreate the same imbalance
  through a different mechanism.

## Hardening the FinOps side, not just the Kubernetes side

Lesson 22's ceiling bump is also a cost event Finance needs visibility into, not a silent
one:

- A **budget anomaly alert** is added specifically for the sale-window ceiling bump,
  tagged to the same cost-allocation tags the FinOps dashboard already uses — so Dana's
  team sees the expected spend increase land exactly when and where it's supposed to,
  instead of discovering it cold in next month's bill.
- The off-hours scale-to-minimum pattern underneath the ceiling is explicitly re-verified,
  not assumed — the hardening work raises a ceiling, and it would be easy to accidentally
  raise the floor along with it without noticing.

## Scheduling a real drill, not another tabletop walkthrough

A runbook and a Terraform diff both describe *intended* behavior. Neither one proves
*actual* behavior the way running the real thing does. Theo schedules a game-day exercise
ahead of next season: deliberately triggering a controlled node drain during a load test,
on a known schedule, to watch the new `PodDisruptionBudget` and spread constraint actually
hold under a real failure condition — not just read correctly in a YAML file. Lesson 24
is where that drill, and everything else in this lesson, gets run for real.

## Key terms

| Term | Meaning |
|---|---|
| PodDisruptionBudget | A Kubernetes object limiting how many replicas of a deployment can be voluntarily disrupted at once, protecting against a drain or rollout causing an outage |
| Budget anomaly alert | A FinOps alert that fires when spend deviates from an expected pattern, tagged to the resource or event that caused it |
| Game day | A deliberately scheduled, controlled exercise that triggers a real failure condition to test whether a safeguard actually works |

## Lab

1. List the two findings from the dashboard/alert audit and explain, for each, which
   earlier risk pattern it mirrors.
2. Explain why putting the sale-window ceiling bump into version-controlled Terraform is
   more durable than a manual `kubectl patch`.
3. Write one sentence on why a PodDisruptionBudget addresses a different failure mode than
   `topologySpreadConstraints`, even though both protect against the same kind of outcome.

## Check yourself

You're ready for Lesson 24 when you can name every concrete hardening change made in this
lesson, trace each one back to the specific earlier lesson that motivated it, and explain
why none of them are considered actually "done" until they're tested under a real drill.
