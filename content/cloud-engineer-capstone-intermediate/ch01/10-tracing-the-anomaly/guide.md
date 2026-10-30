# Lesson 10 — Tracing the Anomaly to a Scaling Misconfiguration

**Chapter 1 · Intermediate Capstone: Containers, CI/CD, and a Real Misconfiguration · Lesson 10 of 16**

## What you'll learn

- How to go from "this service costs too much" to "this specific setting is why," using the same
  group-by-then-drill-down pattern from Cost Analysis
- Why running p95 CPU and memory utilization is the right way to confirm a scaling problem instead
  of guessing
- Exactly how Driftwood's Horizontal Pod Autoscaler ended up running ten replicas around the clock
  for an app that needs two
- Why the mistake traces back to a copy-paste during Lesson 4's Terraform setup, not to anything
  wrong with the app itself

## From "AKS costs too much" to "which part of AKS"

Lesson 9 left off with Azure Kubernetes Service as the dominant, growing line item behind the cost
overshoot. That's a service-level answer, not a root cause. Theo's next step is the same one
Lesson 18's cost-reporting pattern teaches: **group broadly, then drill down**. Inside the AKS
resource group, the node pool backing the storefront app's deployment is the specific piece
driving the growth — more nodes than the app's actual traffic should require, running
continuously.

```bash
kubectl get hpa storefront-app -n production
```

```
NAME             REFERENCE                   TARGETS    MINPODS   MAXPODS   REPLICAS
storefront-app   Deployment/storefront-app   22%/70%     10        20        10
```

Ten running replicas, CPU utilization sitting at 22% against a 70% scale-up target — the
Horizontal Pod Autoscaler isn't broken. It's doing exactly what it's configured to do. The
configuration itself is the problem: **`minReplicas` is set to 10.**

## Confirming it with real numbers, not a hunch

Before changing anything, Theo pulls real utilization data rather than trusting a gut feeling —
the same p95-over-the-observation-window method used for right-sizing any compute resource. Over
the roughly two weeks since the deploy:

```kql
InsightsMetrics
| where Name == "cpuUsageNanoCores" and Computer startswith "aks-storefront"
| where TimeGenerated > ago(14d)
| summarize p50 = percentile(Val, 50), p95 = percentile(Val, 95) by bin(TimeGenerated, 1h)
| order by TimeGenerated desc
```

p95 CPU across the pool comes back low and flat — nowhere close to needing ten replicas just to
stay under the autoscaler's 70% target. Two replicas comfortably cover real traffic, even at peak
hours, with real headroom left over.

## Where the number actually came from

The root cause isn't a bug in the Helm chart or the HPA itself — it's in Lesson 4's Terraform
module. Driftwood's platform repo keeps two named scaling profiles for this app, meant for two
different situations:

- **`standard`** — `minReplicas: 2`, `maxReplicas: 6` — the normal, everyday traffic profile
- **`peak-season`** — `minReplicas: 10`, `maxReplicas: 20` — reserved for scheduled high-traffic
  events like a seasonal sale, applied deliberately and temporarily

During Lesson 4's module setup, the engineer wiring up the HPA values referenced the
**`peak-season`** profile instead of **`standard`** — most likely by copying a working example
from a different, higher-traffic environment's Terraform configuration without swapping the
profile name. The mistake shipped silently: ten replicas is a perfectly valid, intentional setting
for the right environment. It's just the wrong one for Driftwood's everyday production traffic,
and nothing in the deploy pipeline at the time checked which profile a given environment was
actually supposed to use.

```hcl
# modules/storefront-app/hpa.tf — the mistake
module "storefront_hpa" {
  source       = "../scaling-profile"
  profile_name = "peak-season"   # should have been "standard"
}
```

## Why this, specifically, costs money

Each of this app's pods requests enough CPU/memory that roughly 2–3 fit comfortably on one
`Standard_D2s_v3` node. At `minReplicas: 2`, that's one node. At the misconfigured
`minReplicas: 10`, the cluster autoscaler keeps enough nodes running to host all ten pods around
the clock — about three extra nodes that wouldn't exist under the correct profile, each running
whether real traffic needs them or not. Three idle nodes at roughly $70/month apiece, plus the
load balancer and managed-disk overhead that scales with node count, account for most of the gap
between the $1,750 projection and the $2,460 forecast from Lesson 9.

## What happens next

The autoscaling fix and the root-cause confirmation only cover half of this review pass. Lesson 11
picks up a second, completely unrelated finding from the same pass: something on the AWS side that
nobody flagged either.

## Key terms

| Term | Meaning |
|---|---|
| `minReplicas` / `maxReplicas` | The Horizontal Pod Autoscaler's floor and ceiling for how many pod replicas can run |
| Scaling profile | A named, reusable set of `minReplicas`/`maxReplicas` values meant for a specific traffic situation |
| p95 utilization | The value utilization sits below 95% of the time — the right number to size an autoscaler against, not the average |
| Cluster autoscaler | The node-level autoscaler that adds or removes nodes based on how many pods actually need to be scheduled |

## Lab

Driftwood's module repo has `standard` (2/6) and `peak-season` (10/20) profiles. Write the one-line
Terraform module argument change that fixes Lesson 4's mistake, and explain in one sentence why the
`maxReplicas` ceiling should stay generous even after the floor is corrected.

## Check yourself

You're ready for Lesson 11 when you can explain, without looking: why was running ten replicas not
a bug in the Horizontal Pod Autoscaler itself, and where did the actual mistake happen?
