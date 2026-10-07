# Gang Scheduling

Imagine Kubernetes' default scheduler places 50 of Solara-70B's 64 required Pods, then runs out of free GPUs because another job snuck in and claimed the rest. Those 50 Pods sit there, each holding 8 H100s idle, waiting for 14 more that may not show up for hours. This is exactly the failure mode gang scheduling exists to prevent, and it's why Solara AI runs Volcano in front of the Kubeflow Training Operator rather than relying on Kubernetes' default scheduler alone.

## What you'll learn

- What gang scheduling guarantees that Kubernetes' default scheduler does not
- Why distributed training specifically needs that guarantee, down to what NCCL does if it doesn't get it
- How to express a gang-scheduling requirement with Volcano's `PodGroup` and its `minMember` field
- What happens to a job's Pods while a gang scheduling decision is still pending

## The problem: partial scheduling

Kubernetes' default scheduler places Pods one at a time, independently, as capacity frees up. That's correct behavior for stateless services — a Deployment with 3 of 5 replicas running is still doing useful work. It's actively harmful for distributed training: a PyTorchJob with 50 of 64 Pods running is doing *nothing* useful, because `init_process_group` on the Master blocks waiting for every rank to join, and those 50 Pods are holding 400 GPUs that sit idle rather than running some other team's job. Worse, if two large jobs are both allowed to partially schedule at once, they can deadlock — each holding GPUs the other needs, with neither ever reaching enough Pods running to start.

## What gang scheduling guarantees

**Gang scheduling** adds an all-or-nothing rule: a job's Pods are only scheduled once there is enough free capacity for *all* of them simultaneously. If the cluster can't fit all 64 Pods right now, none of them are placed — the whole job waits as a unit instead of partially consuming GPUs other jobs could be using productively in the meantime. This is the one guarantee the plain Kubernetes scheduler does not provide on its own; it schedules Pods, not groups of Pods with a joint "all or nothing" requirement.

## Expressing it with Volcano's PodGroup

Volcano implements gang scheduling through a `PodGroup` object with a `minMember` field — the minimum number of Pods that must be schedulable together before any of them are placed:

```yaml
apiVersion: scheduling.volcano.sh/v1beta1
kind: PodGroup
metadata:
  name: solara-70b-train-pg
  namespace: training
spec:
  minMember: 64
  queue: language-modeling
  minResources:
    nvidia.com/gpu: "512"
```

When the Kubeflow Training Operator creates a `PyTorchJob`'s Pods, Volcano groups them under a `PodGroup` like this automatically. Volcano's scheduler holds all 64 Pods in `Pending` until it can place all of them at once; only then does it schedule the batch together. `minMember: 64` paired with `minResources` matching the full 512-GPU request means Volcano won't even start placing Pods unless the entire job can land in one pass.

## Why training specifically can't tolerate partial scheduling

NCCL's collective operations — the AllReduce from Chapter 2 — are synchronous across every rank. A collective call blocks until all participating ranks reach it; there's no "run with the ranks you have." If only 50 of 64 Pods ever started, torchrun's rendezvous on the Master would simply hang waiting for the other 14 to connect, holding 400 GPUs doing nothing while it waits. Gang scheduling prevents that scenario from ever reaching the point where PyTorch processes are even running: either the full job gets its full allocation, or none of its Pods start consuming GPUs at all.

## Key terms

| Term | Meaning |
|---|---|
| Gang scheduling | All-or-nothing scheduling: a job's Pods are placed together or not at all |
| PodGroup | Volcano's object expressing a gang-scheduling requirement for a set of Pods |
| minMember | The minimum number of Pods in a PodGroup that must be schedulable together |
| Partial scheduling | Some but not all of a job's Pods running — harmless for services, harmful for training |

## Recap

Gang scheduling's all-or-nothing guarantee — expressed through Volcano's `PodGroup` and `minMember` — is what keeps a 64-node training job from ever holding GPUs half-idle waiting for a rendezvous that can't complete. Next lesson: Kubernetes vs. Slurm, pulling together everything from Lessons 12 through 15 into a direct comparison.
