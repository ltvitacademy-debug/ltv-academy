# Job Queues & Priorities

solara-train has 512 GPUs, and the language-modeling team's Solara-70B run routinely wants all of them. The multimodal team also needs GPU time, and inside the language-modeling team itself, a quick 2-node debugging job and a 64-node production run compete for the same hardware. Someone — or something — has to decide whose job runs now and whose waits. This lesson covers how both Kubernetes (via Volcano queues) and Slurm decide that.

## What you'll learn

- Why a FIFO queue alone isn't a workable policy once jobs have wildly different sizes and urgency
- How Volcano's `Queue` object and Kubernetes `PriorityClass` express priority on Kubernetes
- How Slurm expresses the same idea with partitions, priority weights, and QOS (Quality of Service)
- What preemption means in a scheduling queue, and when it does and doesn't apply to a training job

## The problem with plain FIFO

A naive scheduler just runs jobs in the order they were submitted. That breaks down fast on a shared cluster: if the multimodal team submits a 400-GPU job Monday morning and the language-modeling team's higher-priority Solara-70B run needs to start Tuesday, pure FIFO makes it wait behind a job that might run for days. Every real scheduler used for shared training infrastructure layers priority and fairness rules on top of submission order instead of relying on it alone.

## Priority and queues on Kubernetes: Volcano

Volcano, the batch scheduler Solara AI runs alongside the Kubeflow Training Operator, adds a `Queue` object that groups jobs and sets how much of the cluster's capacity that group can claim:

```yaml
apiVersion: scheduling.volcano.sh/v1beta1
kind: Queue
metadata:
  name: language-modeling
spec:
  weight: 2
  capability:
    cpu: "2048"
    nvidia.com/gpu: "384"
---
apiVersion: scheduling.volcano.sh/v1beta1
kind: Queue
metadata:
  name: multimodal
spec:
  weight: 1
  capability:
    nvidia.com/gpu: "256"
```

`weight` sets relative share when both queues want the cluster at once (language-modeling gets roughly twice multimodal's share here); `capability` caps the absolute GPUs a queue can ever use, so one team can't starve the other outright even with a high weight. A `PyTorchJob` (or raw Volcano `Job`) is assigned to a queue, and Kubernetes' own `PriorityClass` can additionally rank jobs within a queue:

```yaml
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: training-production
value: 1000000
---
apiVersion: scheduling.k8s.io/v1
kind: PriorityClass
metadata:
  name: training-debug
value: 100
```

A production Solara-70B run submitted with `priorityClassName: training-production` jumps ahead of a `training-debug` job sitting in the same queue.

## Priority and QOS on Slurm

Slurm expresses the same idea differently: every job accumulates a **priority** score from factors like how long it's been waiting and which **QOS** (Quality of Service) it was submitted under, and the scheduler's backfill logic picks the highest-priority job that fits the currently free nodes — not strictly submission order. A production QOS might carry a priority multiplier and a higher `GrpTRES` (group trackable-resource limit) than a debug QOS, submitted like this:

```bash
#SBATCH --qos=production
#SBATCH --nice=0
```

versus a lower-priority debug submission using `#SBATCH --qos=debug`.

## Preemption: when a job can be bumped, not just delayed

Priority alone only affects which *waiting* job starts next. **Preemption** goes further: a high-priority job can stop a lower-priority job that's already running and reclaim its resources. Both Volcano and Slurm support this, but it's a real decision for training specifically, because killing a running job mid-step loses un-checkpointed progress. Solara AI's policy: debug jobs are preemptible by production jobs, but production training runs are never preempted by anything — losing hours of a 64-node run to free capacity for a lower-priority job is never worth it.

## Key terms

| Term | Meaning |
|---|---|
| Volcano Queue | Groups jobs on Kubernetes with a weight (relative share) and capability (absolute cap) |
| PriorityClass | Kubernetes object ranking Pods/jobs against each other for scheduling order |
| QOS (Quality of Service) | Slurm's mechanism for priority multipliers and resource limits per job class |
| Preemption | Stopping a running lower-priority job to reclaim resources for a higher-priority one |

## Recap

Both Kubernetes (via Volcano queues and PriorityClass) and Slurm (via QOS and priority scoring) go well beyond FIFO, and both support preemption — though Solara AI only lets debug jobs get preempted, never production runs. Next lesson: Gang Scheduling, the guarantee that makes it safe to even start a 64-node job in the first place.
