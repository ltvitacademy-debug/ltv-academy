# Lesson 7 — Building the FinOps Dashboard

**Chapter 1 · Advanced Capstone: Kubernetes, Multi-Cloud, and a Cross-Team Incident · Lesson 7 of 26**

## What you'll learn

- How to build a real FinOps dashboard that gives Casey Lindqvist and Dana Whitfield one shared
  view of cost and capacity, following the FinOps framework's Inform → Optimize → Operate shape
- How to pull cost data (Azure Cost Management, tagged by namespace) and capacity data (Container
  Insights, cluster-wide utilization) into the same Grafana view
- Why aggregating utilization as a **cluster-wide average** is a genuinely reasonable, common
  design choice for a cost dashboard — and exactly what question that choice answers, and doesn't

## What this dashboard needs to do

The mandate from Lesson 1 asked for "one honest picture of cost and capacity." Theo designs the
dashboard around the FinOps framework's **Inform** stage first: before anyone can optimize
anything, Casey and Dana need to be able to look at one screen and answer, in plain terms, "are we
spending what we expected to, and do we have the capacity we think we have?"

The dashboard ships with four panels:

1. **Daily spend by cloud** — Azure (AKS and its managed databases) versus AWS (the backup/DR
   infrastructure), pulled from Azure Cost Management exports and AWS Cost Explorer, so leadership
   sees the full multi-cloud bill in one place.
2. **Cost per namespace** — `storefront` (the three migrated services) tagged separately from
   platform overhead, so cost is attributable to the work that's actually driving it.
3. **Cluster-wide CPU and memory utilization** — the average utilization across every node in the
   `apppool` node pool, pulled from Container Insights.
4. **Budget burn-down** — spend-to-date against the sale-period budget Casey approved, with an
   anomaly alert if the daily rate deviates sharply from forecast.

## Wiring up the data

Cost data comes from a Log Analytics workspace fed by Azure Cost Management's daily export,
queried in KQL:

```kql
CostDetails
| where ResourceGroup == "rg-driftwood-prod"
| summarize DailyCost = sum(CostInBillingCurrency) by bin(Date, 1d), ResourceGroup
```

Capacity data comes from Container Insights' `Perf` table, averaged across the whole node pool:

```kql
Perf
| where ObjectName == "K8SNode" and CounterName == "cpuUsagePercentage"
| where InstanceName startswith "driftwood-prod-aks/apppool"
| summarize AvgClusterCpuPercent = avg(CounterValue) by bin(TimeGenerated, 5m)
```

Both queries feed Grafana panels through the Azure Monitor data source, sitting right next to the
cost panels — cost and capacity, in the same dashboard, on the same timeline, which is exactly the
point of a FinOps dashboard: a cost conversation and a capacity conversation should use the same
numbers.

## Why cluster-wide average is a reasonable choice here, not a flaw

It's worth being precise about what `AvgClusterCpuPercent` actually answers: *"across all the
compute Driftwood is paying for in `apppool`, how much of it is being used?"* That's exactly the
question a FinOps dashboard exists to answer — it's the number that tells Casey whether the node
pool's autoscaler range is sized correctly for the money being spent, and it's the number that
would show up as a smoking gun if the whole cluster were sitting idle while the bill kept growing.

A cluster-wide average is the standard, defensible choice for that specific question, used
throughout the real FinOps and cost-dashboard material this capstone draws on. Nothing about
building it this way is a mistake, and nothing about it should be rebuilt differently with the
information available today.

## What a cluster-wide average cannot tell you

An average, by construction, answers "how much, in total" and not "how evenly distributed." If
twelve nodes in `apppool` are sitting at 20% utilization and three nodes are pinned at 95%, the
average lands somewhere comfortably mid-range — healthy-looking, unremarkable, and not wrong about
the total compute being paid for. It's just a different question than "is any single part of this
cluster struggling right now," which is a *reliability* question, not a cost or capacity one, and
belongs on a different dashboard entirely — the one tracking latency and error rates per service,
which this capstone does not build in this lesson.

That distinction — one dashboard answering "are we spending what we expected on the capacity we
have," a separate dashboard answering "is anything actually struggling right now" — is the exact
seam this capstone's incident runs through, starting several lessons from now. Nothing about
today's dashboard is incomplete for the job it was built to do. It's simply not the only question
worth asking about this platform, and it was never scoped to be.

## Key terms

| Term | Meaning |
|---|---|
| FinOps framework | Inform → Optimize → Operate: first give everyone the same cost/capacity picture, then act on it, then run that process continuously |
| Cost attribution | Tagging cloud spend by namespace or team so cost can be traced to the work actually driving it |
| Cluster-wide average | A single utilization figure computed across every node in a pool — answers "how much total capacity is used," not "how evenly" |
| Budget burn-down | Tracking actual spend against a forecasted budget over a defined period, to catch deviation early |

## Lab

1. Write the two KQL queries above from memory, and explain in one sentence what question each
   one answers for Casey and Dana.
2. Write two sentences: one defending cluster-wide average as the right choice for a cost
   dashboard, and one stating precisely what question it cannot answer on its own.

## Check yourself

You're ready for Lesson 8 when you can explain what each of the dashboard's four panels is for,
why aggregating utilization as a cluster-wide average is a defensible FinOps design choice, and —
specifically — what kind of problem that average could exist on a healthy-looking screen while
still being true somewhere inside the cluster.
