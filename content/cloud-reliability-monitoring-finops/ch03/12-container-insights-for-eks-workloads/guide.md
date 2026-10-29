# Lesson 12 — Container Insights for EKS Workloads

**Chapter 3 · AWS CloudWatch & X-Ray in Depth · Lesson 4 of 4**

## What you'll learn

- What **Container Insights** actually is: a curated set of CloudWatch
  metrics and dashboards purpose-built for containerized workloads,
  not a separate monitoring product
- How the **CloudWatch agent** collects performance metrics at the
  cluster, node, pod, and container level on EKS
- How **Fluent Bit** separately ships container logs into CloudWatch
  Logs, and why that's a different pipeline from the metrics path
- How to find and read the specific metrics Container Insights
  publishes, and where to look first during a pod-level incident

## What Container Insights actually is

**Container Insights** is CloudWatch's purpose-built view for
containerized workloads — EKS, self-managed Kubernetes on EC2, ECS,
and Fargate. It isn't a separate product you buy; it's a specific
CloudWatch namespace (`ContainerInsights`) populated with metrics
collected by agents you deploy into the cluster, plus a set of
automatic dashboards in the CloudWatch console that organize those
metrics by cluster, namespace, node, service, and pod — the same
underlying CloudWatch metrics and alarms this chapter already covered,
pre-organized for the Kubernetes mental model instead of the raw EC2
one.

## The CloudWatch agent: metrics at every Kubernetes level

On EKS, Container Insights metrics are collected by the **CloudWatch
agent**, deployed as a DaemonSet so one agent pod runs on every node in
the cluster. Running as a DaemonSet matters: metrics collection has to
happen locally on each node to see that node's own resource usage, and
Kubernetes schedules a DaemonSet pod onto every node automatically,
including new nodes added by cluster autoscaling, with no manual step.

The agent publishes metrics at four levels, each answering a different
question:

- **Cluster** — aggregate CPU/memory utilization and node/pod counts
  across the whole EKS cluster (`cluster_node_count`,
  `cluster_failed_node_count`)
- **Node** — per-node CPU, memory, disk, and network usage
  (`node_cpu_utilization`, `node_memory_utilization`), the level where
  you'd catch a node running hot before pods on it start getting evicted
- **Pod** — per-pod CPU and memory, including usage against the pod's
  own requests/limits (`pod_cpu_utilization`,
  `pod_memory_utilization_over_pod_limit`) — this last one is the
  metric that explains an OOMKilled pod after the fact
- **Container** — per-container metrics within a pod
  (`container_cpu_utilization`, `container_memory_utilization`), useful
  the moment a pod runs more than one container and you need to know
  which one is actually consuming the resources

```
# A real Container Insights alarm condition: pod pressure before an OOMKill
MetricName: pod_memory_utilization_over_pod_limit
Namespace: ContainerInsights
Dimensions: ClusterName=prod-cluster, Namespace=checkout, PodName=checkout-7f9c
Statistic: Maximum
Threshold: GreaterThanThreshold 90
```

## Fluent Bit: a separate pipeline for logs

Metrics and logs travel through two different agents on EKS, and
that's deliberate — it's the same metrics/logs separation Chapter 1
and Lesson 9 already established, just implemented concretely here.
**Fluent Bit**, also deployed as a DaemonSet, tails container stdout/
stderr on every node and ships it into CloudWatch Logs, organized into
log groups like `/aws/containerinsights/<cluster-name>/application`
(your app's own container output), `/aws/containerinsights/<cluster-
name>/host` (kubelet and node-level logs), and `/aws/containerinsights/
<cluster-name>/dataplane` (networking and container-runtime logs).
Once those logs land in CloudWatch Logs, they're queryable with the
exact Logs Insights syntax from Lesson 9 — `fields`, `filter`, `stats`,
`parse` all work against container logs the same way they work against
any other log group.

## Where to look first on a pod-level incident

A practical path through an EKS problem, using what this lesson and
the rest of the chapter already built: a composite alarm (Lesson 10)
built on `pod_memory_utilization_over_pod_limit` crossing 90% pages
on-call. You check the Container Insights dashboard, filtered to the
affected namespace, and see which specific pod is climbing. You pull
that pod's application logs from
`/aws/containerinsights/<cluster>/application` with a Logs Insights
query scoped to the pod name, filtered to the time window just before
the memory spike, to find what the application itself was doing right
before it ran out of headroom. Container Insights gave you *which* pod
and *when*; the logs gave you *why*.

## Key terms

| Term | Meaning |
|---|---|
| Container Insights | CloudWatch's curated namespace and dashboards for containerized workloads (EKS, ECS, Fargate) |
| CloudWatch agent | The DaemonSet that collects cluster/node/pod/container metrics into the ContainerInsights namespace |
| DaemonSet | A Kubernetes workload type that runs exactly one pod per node automatically, including new nodes |
| Fluent Bit | The DaemonSet that ships container stdout/stderr into CloudWatch Logs — a separate pipeline from metrics |
| pod_memory_utilization_over_pod_limit | A pod-level metric showing usage against its own memory limit — the leading indicator before an OOMKill |

## Check yourself

You're ready to move on when you can explain, without looking: why do
metrics and logs travel through two different DaemonSets on EKS
instead of one, what does `pod_memory_utilization_over_pod_limit`
tell you that cluster-level CPU utilization never could, and what two
things does a composite alarm plus a Logs Insights query together give
you on a real pod incident that neither one gives you alone?
