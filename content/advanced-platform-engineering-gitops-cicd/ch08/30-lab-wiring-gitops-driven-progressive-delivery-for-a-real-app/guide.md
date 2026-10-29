# Lesson 30 — Lab: Wiring GitOps-Driven Progressive Delivery for a Real App

**Chapter 8 · Capstone: Building an Internal Developer Platform · Lesson 30 of 32**

## What you'll learn

- How to wire Chapter 5's canary and automated-rollback concepts into a real ArgoCD-managed
  application using Argo Rollouts, instead of a plain `Deployment`
- How traffic shifts in small, scheduled steps instead of all at once, and where that
  schedule actually lives in Git
- How an `AnalysisTemplate` turns a Prometheus query into the automated go/no-go signal
  that decides whether a canary proceeds or rolls back
- Why this whole setup is still GitOps, start to finish — the rollout's state lives in Git,
  and ArgoCD reconciles it exactly like any other resource from Chapter 4

## The scenario

`order-notifications`, the service scaffolded in Lesson 29, is ready for its first real
release past dev. acme-corp's platform team wants every promotion to staging and prod to
ship as a canary — a small slice of traffic first, watched automatically, promoted or rolled
back without a human babysitting a dashboard. This lab wires that up end to end, using the
same GitOps repo structure Chapter 4 already established.

## Step 1 — Swap the Deployment for a Rollout

Argo Rollouts replaces the standard Kubernetes `Deployment` kind with a `Rollout` that
understands progressive traffic shifting natively:

```yaml
# apps/order-notifications/overlays/prod/rollout.yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: order-notifications
spec:
  replicas: 6
  strategy:
    canary:
      steps:
        - setWeight: 10
        - pause: { duration: 5m }
        - setWeight: 25
        - pause: { duration: 5m }
        - setWeight: 50
        - pause: { duration: 5m }
        - setWeight: 100
```

Everything else about the `Rollout` — container spec, resource limits, labels — stays
identical to the `Deployment` it replaces. Only the `strategy` block is new: traffic moves in
four scheduled steps, 10%, 25%, 50%, then 100%, pausing five minutes between each one for
the automated analysis in Step 2 to run.

## Step 2 — Define the automated go/no-go signal

A `pause` by itself only waits — it doesn't look at anything. The actual decision comes from
an `AnalysisTemplate` that queries Prometheus for the canary's error rate:

```yaml
# apps/order-notifications/base/analysis-template.yaml
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: error-rate-check
spec:
  metrics:
    - name: error-rate
      interval: 1m
      successCondition: result[0] < 0.01
      failureLimit: 2
      provider:
        prometheus:
          address: http://prometheus.monitoring.svc:9090
          query: |
            sum(rate(http_requests_total{service="order-notifications",revision="canary",status=~"5.."}[2m]))
            /
            sum(rate(http_requests_total{service="order-notifications",revision="canary"}[2m]))
```

`successCondition: result[0] < 0.01` means the canary's error rate has to stay under 1% —
cross that twice (`failureLimit: 2`) and the analysis fails outright, no human needs to
notice first.

## Step 3 — Attach the analysis to the rollout steps

```yaml
# apps/order-notifications/overlays/prod/rollout.yaml (continued)
spec:
  strategy:
    canary:
      analysis:
        templates:
          - templateName: error-rate-check
        startingStep: 2
      steps:
        - setWeight: 10
        - pause: { duration: 5m }
        - setWeight: 25
        - pause: { duration: 5m }
        - setWeight: 50
        - pause: { duration: 5m }
        - setWeight: 100
```

`startingStep: 2` means the analysis begins running once traffic first reaches real users, not
during the very first 10% step while things are still settling. From this point on, every pause
is backed by a real check, not just a timer.

## Step 4 — Let ArgoCD own the whole thing, the normal GitOps way

Nothing here changes how Chapter 4's `Application` points at this path. The `Rollout` and
`AnalysisTemplate` are just more YAML in the same overlay ArgoCD already syncs:

```
$ git commit -am "order-notifications: promote v1.3.0 to prod canary"
$ git push
# ArgoCD detects the change, syncs the Rollout's new image tag
$ kubectl argo rollouts get rollout order-notifications -n orders --watch
```

```
Name:            order-notifications
Strategy:        Canary
  Step:          3/7
  SetWeight:     25
  ActualWeight:  25
Images:          acme-corp/order-notifications:v1.3.0 (canary)
                 acme-corp/order-notifications:v1.2.4 (stable)
AnalysisRuns:
  ✔ error-rate-check   Successful
```

## Step 5 — Watch an automated rollback actually happen

If the canary's error rate crosses the 1% threshold twice, Argo Rollouts aborts on its own —
no one has to run a rollback command:

```
AnalysisRuns:
  ✖ error-rate-check   Failed (2/2 consecutive failures)
Status:  Degraded
Message: RolloutAborted: analysis run failed, canary scaled to 0
```

Traffic returns entirely to the stable `v1.2.4` revision, the canary pods scale to zero, and
the `Application` in ArgoCD still shows the commit that introduced `v1.3.0` as `OutOfSync` —
it's visible in Git and in ArgoCD exactly as the failure happened, with no manual
`kubectl rollback` and no incident call needed to stop the bad release from reaching
everyone.

## Key terms

| Term | Meaning |
|---|---|
| `Rollout` | Argo Rollouts' replacement for `Deployment`, adding native canary/blue-green traffic shifting |
| `AnalysisTemplate` | Defines a metrics query and a pass/fail condition used to gate a rollout step automatically |
| `setWeight` / `pause` | Canary strategy steps that shift traffic percentage and wait before the next step or check |
| Automated rollback | A rollout aborting and returning traffic to the stable revision on its own, triggered by a failed analysis run |

## Check yourself

You're ready for Lesson 31 when you can explain, without looking: what specifically would be
missing if the `pause` steps existed but the `AnalysisTemplate` didn't, and why does an
aborted canary still show up as a Git commit and an `OutOfSync` status instead of disappearing
without a trace?
