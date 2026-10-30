# Lesson 14 — Validating the Fix Under Load

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 14 of 26**

## What you'll learn

- Why "the rollout finished" is not the same thing as "the fix worked"
- How Theo re-checks the exact same per-zone breakdown from Lesson 12,
  this time under the sale's continuing real traffic, to confirm the
  fix actually holds
- What the reliability dashboard shows once pods are evenly spread,
  and why that — not the rollout status — is the real proof
- Why validation has to happen under live load, not just after a quiet
  rollout, for a fix like this one

## The rollout finishing is not the finish line

`kubectl rollout status deployment/checkout-api -n driftwood` reports
`successfully rolled out` a few minutes after Theo applies the
topology spread constraint. That's a necessary checkpoint, not proof
the incident is over. A rollout can complete cleanly and still leave
the underlying problem unresolved if the fix itself was wrong, or if
new load arrives and recreates an imbalance some other way. Theo
treats the rollout completing as "the change is live," not "the
problem is gone" — and goes to check the same two things that caught
the problem in the first place.

## Re-checking the per-zone breakdown

```
kubectl get pods -n driftwood -l app=checkout-api -o wide
```

```
NAME                             NODE               ZONE
checkout-api-8f2k7c-2mz9q        aks-np1-eastus2-1  eastus2-1
checkout-api-8f2k7c-4d8vn        aks-np1-eastus2-1  eastus2-1
checkout-api-8f2k7c-5x1pr        aks-np1-eastus2-1  eastus2-1
checkout-api-8f2k7c-6q3wt        aks-np1-eastus2-1  eastus2-1
checkout-api-8f2k7c-7n9kd        aks-np2-eastus2-2  eastus2-2
checkout-api-8f2k7c-8m2jz        aks-np2-eastus2-2  eastus2-2
checkout-api-8f2k7c-9p4xv        aks-np2-eastus2-2  eastus2-2
checkout-api-8f2k7c-a1r6b        aks-np2-eastus2-2  eastus2-2
checkout-api-8f2k7c-b5t8c        aks-np3-eastus2-3  eastus2-3
checkout-api-8f2k7c-c2w4n        aks-np3-eastus2-3  eastus2-3
checkout-api-8f2k7c-d9y7m        aks-np3-eastus2-3  eastus2-3
checkout-api-8f2k7c-e3z1k        aks-np3-eastus2-3  eastus2-3
```

Four pods, every zone, exactly what `maxSkew: 1` across three zones and
twelve replicas was designed to produce. Theo pulls CPU utilization per
zone again: `eastus2-1` ~48%, `eastus2-2` ~46%, `eastus2-3` ~47% — no
zone anywhere near saturated, and critically, no zone sitting idle
either. The sale's real traffic is now actually spread across the
capacity that was always there.

## Confirming it on the dashboard that caught it

The real proof isn't the pod listing — it's the reliability dashboard
going back to its baseline while the sale's traffic is still live and
climbing toward its peak:

| Metric | During the incident | ~20 minutes after the fix |
|---|---|---|
| checkout-api p95 latency | 2,000ms+ | ~190ms |
| checkout-api error rate | 5%+ | ~0.2% |

Theo keeps both dashboards open for the rest of the sale rather than
closing the incident the moment the numbers look good. A fix that
holds for twenty minutes and a fix that holds for the remaining six
hours of the sale's traffic ramp are different claims, and only the
second one is the one worth reporting to leadership.

## Key terms

| Term | Meaning |
|---|---|
| Rollout status | Confirms a Deployment's new ReplicaSet is fully available — a deployment-mechanics checkpoint, not a reliability proof |
| Validation under load | Confirming a fix holds while real, live traffic continues — not just immediately after a quiet change |
| Baseline | The normal, pre-incident value of a metric, used as the target the fix should return the system to |

## Lab

1. Reproduce Theo's second per-zone pod count and explain why it now
   matches what `maxSkew: 1` was designed to guarantee.
2. Explain why Theo keeps watching both dashboards for the rest of the
   sale instead of closing the incident the moment latency drops.
3. Write one sentence distinguishing "the rollout succeeded" from
   "the fix worked."

## Check yourself

You're ready for Lesson 15 when you can explain, without looking, what
two separate things Theo checks to validate the fix, and why a clean
`kubectl rollout status` alone would not have been enough evidence to
close this incident.
