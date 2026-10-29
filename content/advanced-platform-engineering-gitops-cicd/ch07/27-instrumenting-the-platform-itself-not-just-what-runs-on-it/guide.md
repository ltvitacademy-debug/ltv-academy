# Lesson 27 — Instrumenting the Platform Itself, Not Just What Runs on It

**Chapter 7 · Platform Observability and Developer Experience · Lesson 3 of 4**

## What you'll learn

- Why the CI runner, the GitOps controller, and the developer portal
  backend are production services in their own right, not "tooling"
  that gets a pass on observability
- How to apply the same three pillars — metrics, logs, and traces —
  to the platform's own components, not only to the applications it
  deploys
- What's actually worth measuring on a CI runner and a GitOps
  controller like ArgoCD or Flux
- Why writing real SLOs for the platform's own services changes how
  seriously a platform team treats its own reliability

## The platform is a production system, not a utility

Every team building an internal developer platform eventually makes
the same mistake once: they instrument every application the platform
deploys with careful dashboards and alerts, and then leave the
platform's own services — the CI runner fleet, the GitOps controller,
the portal's backend API, the service catalog — running with nothing
but default logs and a shrug. That's backwards. If the GitOps
controller stops syncing, nothing deploys anywhere, for anyone. If the
CI runner queue backs up, every team's lead time (Lesson 25) silently
gets worse at once. The platform isn't infrastructure that happens to
sit underneath your applications — it's the single most load-bearing
production system in the organization, because everything else
depends on it staying healthy.

## The same three pillars, pointed at the platform

This course's earlier observability foundation used metrics, logs,
and traces to understand applications. Apply exactly that same
discipline to the platform's own components:

- **Metrics** on the CI runner: queue depth, job wait time, job
  duration, job failure rate, concurrent job count against capacity.
- **Metrics** on the GitOps controller: sync latency (time between a
  Git commit and the cluster reconciling to match it), reconciliation
  error rate, number of applications currently out of sync or
  degraded, drift-detection frequency.
- **Logs** from each component: structured logs for every sync
  attempt, every job dispatch, every portal API request, so a
  failure can be traced back to a specific event instead of inferred
  from a gap in a graph.
- **Traces** across the request path: when a developer clicks
  "create service" in the portal, that request fans out through the
  portal backend, the service catalog, a pipeline trigger, and
  eventually a GitOps commit — tracing that whole path is how you
  find which hop is actually slow when "the portal feels sluggish."

## Writing real SLOs for the platform's own services

Once you're collecting these metrics, write actual service level
objectives against them, the same way you would for any production
API:

```text
SLO: 95% of CI jobs start running within 60 seconds of being queued
SLO: 99% of GitOps sync operations complete within 2 minutes of a commit
SLO: Portal API p95 latency stays under 300ms
SLO: GitOps reconciliation error rate stays below 1% of sync attempts
```

An SLO is only useful if someone gets paged when it's at risk —
which means the platform team needs its own on-call rotation and its
own error budget, exactly like the application teams it serves. A
platform with no SLOs is informally promising infinite reliability to
every team that depends on it, which is a promise no team can
actually keep without saying so out loud.

## Why this changes behavior, not just dashboards

Instrumenting the platform itself does two things at once. First, it
turns "the CI system felt slow today" from an anecdote into a number
you can act on — queue depth spiked at 2pm, here's why. Second, it
makes the platform team accountable to the same standard it holds
every other team to, which is the only way "platform as a product"
from Chapter 1 means anything in practice rather than just as a
slogan.

## Key terms

| Term | Meaning |
|---|---|
| CI runner metrics | Queue depth, job wait time, duration, and failure rate for the build/test execution layer |
| GitOps controller metrics | Sync latency, reconciliation error rate, and out-of-sync application count for tools like ArgoCD or Flux |
| SLO (service level objective) | A specific, measurable reliability target for a service — here, applied to the platform's own components, not just to customer-facing applications |
| Error budget | The amount of unreliability an SLO tolerates before it's considered breached, used to balance platform teams' pace of change against stability |

## Check yourself

You're ready for Lesson 28 when you can explain, without looking: name
two metrics worth tracking on a GitOps controller and two on a CI
runner, and explain why a platform team should carry its own SLOs and
on-call rotation instead of treating platform outages as lower
priority than application outages.
