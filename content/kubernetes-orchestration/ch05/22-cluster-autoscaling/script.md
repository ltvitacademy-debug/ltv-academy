# Script — Cluster Autoscaling

## Segment 1 (title)

The HPA can decide checkout needs 25 replicas instead of 3, but it can't create room for them if every node is already full. The Cluster Autoscaler solves the other half of this problem — it adds and removes entire nodes, not Pods.

## Segment 2 (code)

When the scheduler can't place a new Pod anywhere, that Pod sits in Pending status, and describing it shows a FailedScheduling event with insufficient CPU or memory. That exact signal is what the Cluster Autoscaler watches for.

## Segment 3 (steps)

HPA and Cluster Autoscaler solve two different layers of the same problem. HPA reacts to a metric and adjusts replica count on a Deployment. Cluster Autoscaler reacts to Pending Pods and adjusts node count on a cloud-specific node group — an AWS Auto Scaling Group, an Azure VM Scale Set, or a GKE node pool.

## Segment 4 (steps)

Scaling up happens quickly once Pods go Pending. Scaling down is deliberately more cautious — a node is only removed if its Pods can fit comfortably elsewhere, and safety checks block removal for Pods using local storage, bare Pods with no controller, or Pods explicitly annotated against eviction.

## Segment 5 (outro)

In practice, the two controllers run side by side without directly knowing about each other — HPA requests more replicas, and if there's no room, Cluster Autoscaler adds the capacity to finish the job. Next lesson: scheduling, taints, and affinity — controlling exactly where Pods are allowed to land in the first place.
