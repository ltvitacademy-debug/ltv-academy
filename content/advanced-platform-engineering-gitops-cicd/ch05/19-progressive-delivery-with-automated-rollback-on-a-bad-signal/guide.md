# Lesson 19 — Progressive Delivery with Automated Rollback on a Bad Signal

**Chapter 5 · Advanced CI/CD Pipeline Design · Lesson 19 of 4**

## What you'll learn

- Why a canary's pauses are only useful if something is actually
  watching metrics during them
- How Argo Rollouts' `AnalysisTemplate` queries real metrics — the
  same Prometheus setup from the observability course — to decide
  whether to advance or abort
- What a "bad signal" means in practice: elevated error rate or
  latency measured against a defined threshold, not a guess
- How automated rollback closes the loop without waiting for a human
  to notice a dashboard

## The gap in a plain canary rollout

Lesson 18's canary strategy paused at each weight step — 10%, 25%,
50% — but nothing in that YAML decided whether it was actually safe
to move on. In practice, that decision either falls to a human
watching a Grafana dashboard in real time, which doesn't scale past a
handful of deployments a day, or it doesn't happen at all, and the
rollout just marches forward on a fixed timer regardless of what the
metrics are doing. **Progressive delivery** closes that gap: it wires
the rollout's own advance/abort decision directly into real metrics.

## AnalysisTemplate: querying real metrics automatically

Argo Rollouts (and the comparable tool, Flagger) support an
`AnalysisTemplate` — a resource that defines a metric query and a
pass/fail threshold, run automatically at each canary step. This is
the same Prometheus and PromQL from the observability course, now
driving a deployment decision instead of just a dashboard panel:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: AnalysisTemplate
metadata:
  name: error-rate-check
spec:
  metrics:
    - name: error-rate
      interval: 1m
      successCondition: result[0] <= 0.01
      failureLimit: 2
      provider:
        prometheus:
          address: http://prometheus.monitoring:9090
          query: |
            sum(rate(http_requests_total{job="checkout",status=~"5.."}[5m]))
            /
            sum(rate(http_requests_total{job="checkout"}[5m]))
```

This query computes the ratio of 5xx responses to total requests over
a 5-minute window — a real error-rate calculation, the same PromQL
pattern from the Prometheus chapter. `successCondition` says the
result has to stay at or below 1%; `failureLimit: 2` means two
consecutive failed checks is enough to call the whole analysis a
failure, not just a blip.

## Wiring analysis into the rollout steps

The `Rollout` resource references the `AnalysisTemplate` directly in
its canary steps:

```yaml
spec:
  strategy:
    canary:
      steps:
        - setWeight: 10
        - analysis:
            templates:
              - templateName: error-rate-check
        - setWeight: 50
        - analysis:
            templates:
              - templateName: error-rate-check
        - setWeight: 100
```

Now each `setWeight` step is followed by an actual check against
live production metrics, not a fixed-duration pause. If error rate
at 10% weight stays under the threshold, the rollout proceeds to 50%
automatically. If it breaches the threshold, Argo Rollouts aborts the
rollout and shifts traffic back to the previous stable version — on
its own, without anyone paging a human first.

## What counts as a "bad signal"

Error rate is the most common signal, but it's rarely the only one.
A realistic `AnalysisTemplate` setup also watches p95 or p99 latency
— a new version that's technically correct but twice as slow is
still a regression worth catching. Some teams add business-level
signals too, like checkout conversion rate, though those take longer
to produce a confident sample size than request-level metrics do.
The threshold itself matters as much as the metric: too strict, and
normal variance triggers false rollbacks; too loose, and a real
regression sails through at every step.

## Why automated rollback matters

The value isn't just catching bad deploys — it's catching them in
minutes, consistently, at 2 a.m. or during a release nobody is
actively staring at a dashboard for. A human watching a canary at
10% traffic for five minutes, every single deployment, doesn't scale.
A query that runs automatically every minute and aborts on its own
when the threshold is breached does.

## Key terms

| Term | Meaning |
|---|---|
| Progressive delivery | Automatically gating a canary or blue-green rollout's advancement on real metric checks, not a fixed timer |
| `AnalysisTemplate` | An Argo Rollouts resource that defines a metric query and a pass/fail threshold, run at each canary step |
| Bad signal | A metric (error rate, latency) that breaches a defined threshold during analysis, triggering an automatic abort |
| Automated rollback | The rollout controller shifting traffic back to the previous stable version on its own, without a human decision |

## Check yourself

You're ready for Lesson 20 when you can explain what `failureLimit: 2`
actually protects against, and why a progressive-delivery pipeline
still can't catch a bug that only shows up after a feature is fully
released to users, not just deployed to a small percentage of traffic.
