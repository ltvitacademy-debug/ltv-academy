# Autoscaling a Training Cluster

Not every hour of every day needs all 64 nodes of solara-train running. Between large Solara-70B runs, the language-modeling and multimodal teams run smaller experiments, hyperparameter sweeps, and evaluation jobs that need a handful of GPUs, not all 512. Keeping every node powered on and billed around the clock for peak demand wastes money the rest of the time. This lesson covers how Solara AI autoscales GPU nodes up and down with Kubernetes Cluster Autoscaler and Karpenter, and why GPU autoscaling behaves differently from autoscaling a web tier.

## What you'll learn

- Why GPU node autoscaling is slower and more constrained than CPU node autoscaling
- How to configure a GPU node pool with Karpenter's `NodePool` so it scales from real demand
- How gang-scheduled Pods (from Lesson 15) interact with the autoscaler's scale-up decisions
- The trade-off between scaling down aggressively (saving money) and scaling down too eagerly (killing a job mid-collective)

## Why GPU autoscaling is slower and pricier than it sounds

A web tier's Cluster Autoscaler can add a new CPU node in under a minute and have it serving traffic almost immediately. An H100 node is a different story: provisioning the instance, attaching NVLink and InfiniBand fabric, loading GPU drivers and the NCCL stack, and running health checks before the node is actually usable can take several minutes to tens of minutes depending on the cloud provider. GPU instances are also far more expensive per hour than CPU instances, so an autoscaler that's slow to scale down costs real money, and one that's too eager to scale down can kill a job that was about to need that capacity back.

## Karpenter NodePool for GPU nodes

Karpenter (the node-provisioning autoscaler Solara AI runs instead of the older Cluster Autoscaler) defines a `NodePool` describing what kind of node it's allowed to provision and under what limits:

```yaml
apiVersion: karpenter.sh/v1
kind: NodePool
metadata:
  name: gpu-h100-pool
spec:
  template:
    spec:
      requirements:
        - key: node.kubernetes.io/instance-type
          operator: In
          values: ["p5.48xlarge"]
        - key: karpenter.sh/capacity-type
          operator: In
          values: ["on-demand"]
      taints:
        - key: nvidia.com/gpu
          value: "true"
          effect: NoSchedule
  limits:
    cpu: "4096"
    nvidia.com/gpu: "512"
  disruption:
    consolidationPolicy: WhenEmpty
    consolidateAfter: 10m
```

Karpenter watches for Pods stuck `Pending` because no node has room, matches their resource requests and tolerations against this `NodePool`'s requirements, and provisions exactly the instance type needed — here, `p5.48xlarge` (an 8× H100 instance type), tainted so only GPU-tolerating Pods land on it. `limits` caps the pool at 512 GPUs total, matching solara-train's hardware ceiling. `consolidationPolicy: WhenEmpty` with a 10-minute delay means a node only gets removed once it's sat completely idle for that long — not the instant the last Pod leaves — to avoid thrashing nodes up and down for short gaps between jobs.

## Scale-up meets gang scheduling

When a gang-scheduled `PodGroup` needs 64 nodes and only 40 currently exist, Volcano can't place any of the job's Pods (by design, from Lesson 15) — but those Pending Pods are exactly the signal Karpenter watches for. Karpenter provisions the missing 24 nodes to satisfy the `NodePool`'s capacity, and only once all 64 are `Ready` does Volcano release the gang's Pods to actually schedule. The two systems compose correctly without any special integration: gang scheduling controls *when* Pods are placed, autoscaling controls *how many nodes exist* to place them on.

## Scaling down without killing a running job

The real risk with GPU autoscaling isn't scaling up slowly — it's scaling down a node that's mid-collective in an active training job. Karpenter respects Pod Disruption Budgets and won't consolidate away a node running Pods that aren't evictable, and Solara AI's training Pods set `PodDisruptionBudget` with `minAvailable` equal to the full replica count for the duration of the job, so no node backing an active PyTorchJob is ever a consolidation candidate. Scale-down only touches genuinely idle capacity.

## Key terms

| Term | Meaning |
|---|---|
| Karpenter | Kubernetes node-provisioning autoscaler; provisions nodes matching a `NodePool`'s requirements |
| NodePool | Karpenter object describing allowed instance types, limits, and disruption policy for a set of nodes |
| consolidationPolicy | Controls when Karpenter is allowed to remove underused nodes |
| Pod Disruption Budget | Guards running Pods from eviction/consolidation while a job is actively using them |

## Recap

GPU autoscaling trades the speed of CPU autoscaling for real constraints — slow provisioning, high cost, and the need to never scale down a node mid-collective — and Karpenter's `NodePool`, consolidation policy, and respect for Pod Disruption Budgets are how Solara AI manages that trade-off. That closes out Chapter 3's look at orchestration. Chapter 4 turns to what happens when, despite all this scheduling discipline, a node still fails mid-run: Why Long Training Runs Need Fault Tolerance.
