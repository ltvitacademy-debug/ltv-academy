# Lesson 12 — Finding the Real Bottleneck

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 12 of 26**

## What you'll learn

- How to break a cluster-wide average down **per availability zone**
  instead of trusting the single blended number
- The real per-AZ numbers Theo finds, and exactly how they average out
  to the "healthy" 72% the FinOps dashboard was reporting
- Why the Kubernetes scheduler produced this exact imbalance — and the
  one missing piece of configuration that's the actual root cause
- Why this is the moment the incident goes from "a confusing metric"
  to "a specific, fixable bug"

## Re-running the same query, split by zone

Theo doesn't need a new tool — he needs the same metrics-server/Prometheus
data the FinOps dashboard already reads, grouped by the
`topology.kubernetes.io/zone` node label instead of collapsed into one
cluster-wide number:

```
kubectl get pods -n driftwood -l app=checkout-api -o wide
```

```
NAME                             NODE               ZONE
checkout-api-6b7f9d-2kq9p        aks-np1-eastus2-1  eastus2-1
checkout-api-6b7f9d-7x4mz        aks-np2-eastus2-2  eastus2-2
checkout-api-6b7f9d-9p2kd        aks-np2-eastus2-2  eastus2-2
checkout-api-6b7f9d-c8v3n        aks-np2-eastus2-2  eastus2-2
checkout-api-6b7f9d-d1m7q        aks-np2-eastus2-2  eastus2-2
checkout-api-6b7f9d-f4j2x        aks-np2-eastus2-2  eastus2-2
checkout-api-6b7f9d-g9n5r        aks-np2-eastus2-2  eastus2-2
checkout-api-6b7f9d-h2w8t        aks-np2-eastus2-2  eastus2-2
checkout-api-6b7f9d-k5r1v        aks-np2-eastus2-2  eastus2-2
checkout-api-6b7f9d-m3t6b        aks-np3-eastus2-3  eastus2-3
checkout-api-6b7f9d-n7y4w        aks-np1-eastus2-1  eastus2-1
checkout-api-6b7f9d-p8z2c        aks-np3-eastus2-3  eastus2-3
```

Twelve `checkout-api` pods, and the zone column is not evenly split.
**Eight of the twelve are running in `eastus2-2`.** Zones 1 and 3 each
have two.

## The real per-zone numbers

Theo pulls CPU utilization for the pods in each zone separately:

| Zone | Pods | CPU utilization (per pod, vs. request) |
|---|---|---|
| eastus2-1 | 2 | ~24% |
| eastus2-2 | **8** | **~96%** |
| eastus2-3 | 2 | ~24% |

That's the whole mystery, solved in one table. The cluster-wide average
the FinOps dashboard reports is exactly what you'd get by blending
these: `(96×8 + 24×2 + 24×2) / 12 ≈ 72%`. The math is correct. The
average genuinely is 72%. It's also genuinely useless for spotting that
eight pods are nearly pegged while four sit almost idle. `eastus2-2`
is the real bottleneck — its pods are saturated, which is exactly what
drives the latency and 5xx spikes the reliability dashboard caught,
while `eastus2-1` and `eastus2-3` are dragging the average down to a
number that looks fine.

## Why the scheduler did this

This isn't a scheduler bug. `kube-scheduler` is doing exactly what it's
designed to do: pack pods onto nodes with available capacity, as
efficiently as it can, using whatever constraints the Deployment spec
actually gives it. Theo checks the `checkout-api` Deployment built back
in Lesson 4 alongside the AKS cluster, and finds the gap immediately —
there is no `topologySpreadConstraints` or pod anti-affinity rule in
its spec at all. Nothing ever told the scheduler "spread these pods
across zones." Without that instruction, the scheduler is free to pack
pods wherever bin-packing math says is efficient, and during this
sale's traffic ramp, that happened to mean stacking eight of twelve
pods into a single zone's nodes.

## Key terms

| Term | Meaning |
|---|---|
| `topology.kubernetes.io/zone` | The standard node label identifying which availability zone a node lives in |
| Topology spread constraint | A Deployment-level rule telling the scheduler to distribute pods evenly across a topology key like zone |
| Pod anti-affinity | A related mechanism that repels pods from each other by label — spreads pods, though with different tuning than a spread constraint |
| Bin-packing | The scheduler's default behavior of placing pods wherever capacity fits, with no notion of "spread" unless told to care |

## Lab

1. Reproduce Theo's per-zone table from the pod listing above: count
   pods per zone, and compute each zone's CPU utilization contribution
   to the 72% cluster-wide average.
2. Explain, in your own words, why `kube-scheduler` isn't malfunctioning
   even though it produced a badly imbalanced result.
3. Name the exact missing piece of the `checkout-api` Deployment spec
   that Theo identifies as the root cause.

## Check yourself

You're ready for Lesson 13 when you can explain, without looking, how
eight overloaded pods and four idle ones can average out to a number
that looks healthy, and why the fix has to be a scheduling rule on the
Deployment, not a scaling change or a restart.
