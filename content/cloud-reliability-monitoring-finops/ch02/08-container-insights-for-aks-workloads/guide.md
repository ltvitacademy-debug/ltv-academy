# Lesson 8 — Container Insights for AKS Workloads

**Chapter 2 · Azure Monitor & Log Analytics in Depth · Lesson 4 of 4**

## What you'll learn

- What Container Insights actually collects for an AKS cluster — at
  the node, pod, and container level — and the agent that collects it
- The real tables Container Insights writes to in your Log Analytics
  workspace, and how to query them with the same KQL from Lesson 6
- What Live Data gives you that a KQL query can't: real-time pod logs
  and events without a separate `kubectl` session
- Why Container Insights is also a direct line item on your Azure
  bill — the FinOps connection this chapter closes with

## Container Insights is Azure Monitor's view into a cluster

Container Insights is the Azure Monitor feature purpose-built for
container workloads — most commonly AKS, though it also covers
Azure Arc-enabled Kubernetes and other container platforms. Enabling it
on an AKS cluster deploys the **Azure Monitor agent** as a containerized
DaemonSet running on every node (the modern replacement for the older
`omsagent`), which collects performance data, inventory, and logs and
ships them to a Log Analytics workspace — the same destination from
Lesson 5, so everything here is queryable with the KQL you learned in
Lesson 6.

By default the agent collects on a one-minute interval (configurable),
and it collects at every layer that matters for a Kubernetes workload:
node-level CPU, memory, and disk; pod-level status and resource usage;
and container-level CPU and memory consumption, down to an individual
container inside a pod.

## The real tables behind Container Insights

A handful of tables carry the cluster data:

- **`KubeNodeInventory`** — every node in the cluster, its status,
  and labels.
- **`KubePodInventory`** — every pod, its phase (`Running`, `Pending`,
  `Failed`), namespace, and the node it's scheduled on.
- **`KubeEvents`** — Kubernetes events: scheduling failures, image
  pull errors, OOMKills.
- **`Perf`** — the same table from Lesson 6, now also carrying
  container-level counters like `cpuUsageNanoCores` and
  `memoryWorkingSetBytes`, scoped by `InstanceName`.
- **`ContainerLogV2`** (the current, more efficient schema;
  `ContainerLog` is the older one) — stdout/stderr from every
  container, when log collection is enabled.

```kql
KubePodInventory
| where ClusterName == "my-aks-cluster"
| where PodStatus in ("Failed", "Pending")
| summarize count() by Namespace, PodStatus, bin(TimeGenerated, 1h)
```

That's a real health check: which namespaces have pods stuck in a bad
state, bucketed hourly — exactly the kind of query you'd run while
chasing a rollout that isn't converging.

```kql
Perf
| where ObjectName == "K8SContainer" and CounterName == "cpuUsageNanoCores"
| where InstanceName contains "checkout-service"
| summarize avg(CounterValue) by bin(TimeGenerated, 5m)
| render timechart
```

Same `summarize`/`bin`/`render` pattern from Lesson 6 — this time
isolating one container's CPU usage over time by filtering
`InstanceName`, instead of a VM's `Computer` field.

## Live Data: real-time logs and events without kubectl

Container Insights' **Live Data** feature streams pod logs, Kubernetes
events, and exec access directly in the Azure portal, in close to real
time — genuinely useful when you want to watch a pod's output the
moment it starts crash-looping, without needing a local `kubectl`
session and the right RBAC already configured on your machine. It's
the AKS equivalent of Application Insights' Live Metrics from Lesson
7: a live view that doesn't require writing a query first.

## The FinOps connection: Container Insights has a cost

Container Insights is also one of the most common drivers of Log
Analytics ingestion cost on a cluster, because `ContainerLogV2` and
high-cardinality `Perf` data can generate a large volume of billed
data if every container's verbose stdout is collected at full
fidelity on every node. Azure Monitor's **data collection rules**
(DCRs) let you scope exactly which namespaces, log levels, or
container data get collected — a decision that belongs to both this
chapter and Chapter 5's FinOps material, because the "turn on more
monitoring" instinct and the cost-control instinct pull in opposite
directions on the same dial.

## Key terms

| Term | Meaning |
|---|---|
| Container Insights | Azure Monitor's feature for AKS/Kubernetes: node, pod, and container-level metrics, inventory, and logs |
| Azure Monitor agent (AMA) | The containerized DaemonSet that collects and ships cluster data to a Log Analytics workspace |
| `KubePodInventory` | Table recording every pod's status, namespace, and scheduled node |
| `ContainerLogV2` | The current table/schema for container stdout/stderr, replacing the older `ContainerLog` |
| Live Data | Real-time pod logs, events, and exec access in the Azure portal, no local `kubectl` session required |
| Data collection rule (DCR) | The configuration that scopes exactly which cluster data gets collected and billed |

## Check yourself

You're ready to move on when you can explain, without looking: which
table would you query to find pods stuck in a `Pending` state, which
one carries a container's raw stdout, and why a team watching their
Log Analytics bill climb might look first at their Container Insights
collection scope.
