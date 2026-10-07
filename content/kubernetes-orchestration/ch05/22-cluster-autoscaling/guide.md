# Cluster Autoscaling

The HPA from the last lesson can decide checkout needs 25 replicas instead of 3, but it can't create room for them if every existing node is already full. If Northbridge's cluster has no node with enough spare CPU or memory, those new Pods just sit **Pending** — scheduled nowhere, waiting. The **Cluster Autoscaler** solves the other half of this problem: it adds and removes entire nodes, not Pods.

## What you'll learn

- Why the HPA alone can't solve capacity problems, and what a Pending Pod actually signals
- What the Cluster Autoscaler watches for, and what it does about it
- How scale-down works, and why it's more cautious than scale-up
- How the Cluster Autoscaler and the HPA fit together as two layers of the same problem

## The gap the HPA can't close

HPA and Cluster Autoscaler solve different layers of the same scaling problem:

| | HorizontalPodAutoscaler | Cluster Autoscaler |
|---|---|---|
| Scales | Pod replica count | Node count |
| Trigger | A metric (e.g. CPU utilization) | Pods stuck Pending from insufficient capacity |
| Acts on | A Deployment/StatefulSet | A node group / autoscaling group |

When the HPA scales checkout up and the scheduler can't place the new Pods anywhere:

```bash
kubectl get pods
# checkout-7f9d8c6b5-x2k9p   0/1   Pending   0   2m

kubectl describe pod checkout-7f9d8c6b5-x2k9p
# Events:
#   Warning  FailedScheduling  ...  0/5 nodes are available:
#   5 Insufficient cpu, 5 Insufficient memory.
```

That `FailedScheduling` event with "Insufficient cpu/memory" is exactly the signal the Cluster Autoscaler watches for.

## Scaling up: adding nodes

The Cluster Autoscaler is cloud-provider-specific — on AWS it drives an Auto Scaling Group, on Azure a VM Scale Set, on GKE a managed node pool. When it sees Pods that would schedule successfully if one more node existed, it asks the cloud provider to add a node to the relevant node group, and once that node joins the cluster and becomes Ready, the scheduler places the Pending Pods onto it.

## Scaling down: removing nodes, carefully

The Cluster Autoscaler also watches for underutilized nodes — ones whose Pods could all fit comfortably on other existing nodes — and removes them to save cost. This is deliberately more conservative than scale-up: a node won't be considered for removal if it's running Pods that can't be safely evicted, such as Pods using local storage, Pods without a controller (bare Pods), or Pods explicitly annotated to block eviction. Flags like `--scale-down-utilization-threshold` and `--scale-down-unneeded-time` control how underutilized a node must be, and for how long, before it's actually removed.

## How HPA and Cluster Autoscaler work together

In practice these run continuously side by side: the HPA reacts first to rising CPU by requesting more checkout replicas; if the existing nodes have room, the scheduler places them immediately; if not, those Pods go Pending, and the Cluster Autoscaler reacts next by adding capacity so the scheduler can finish the job. Node Pods are scaled; Pod count is scaled by the HPA — two different controllers, each watching a different signal, cooperating without directly knowing about each other.

## Key terms

- **Cluster Autoscaler** — a controller that adds or removes nodes based on Pod scheduling pressure
- **Pending** — a Pod's status when the scheduler can't yet find a node with enough capacity
- **Node group** — the cloud-provider construct (ASG, VM Scale Set, node pool) the Cluster Autoscaler resizes
- **Scale-down** — removing underutilized nodes, gated by safety checks on what's running on them
