# Lesson 8 — GPU Scheduling and Sharing a Single GPU Across Workloads

**Chapter 2 · Provisioning GPU Infrastructure · Lesson 4 of 4**

## What you'll learn

- Why the default "one pod, one whole GPU" model from the last lesson
  leaves expensive hardware sitting idle most of the time
- How time-slicing shares one physical GPU across multiple pods in
  software, and what it does and doesn't isolate
- How Multi-Instance GPU (MIG) partitions a single physical GPU into
  genuinely isolated hardware instances, on the GPUs that support it
- When to reach for each one

## The problem: one whole GPU is often overkill

An A100 is enormous — 40 or 80 GiB of memory and enough compute for
training a large model from scratch. A lot of real workloads, though,
especially inference, never come close to needing all of that: a
small model serving a modest request rate might use 10% of an A100's
memory and compute. Under the default Kubernetes model from the
previous lesson, that inference pod still claims the *entire* physical
GPU, because `nvidia.com/gpu` is only ever handed out as a whole unit.
The other 90% of the GPU sits idle, and you're still paying for all of
it.

Two real NVIDIA mechanisms address this, and they solve it in
different ways with different tradeoffs.

## Time-slicing: software sharing, no isolation

**Time-slicing** lets the NVIDIA device plugin advertise more copies
of `nvidia.com/gpu` than there are physical GPUs — each "replica" maps
to the same underlying GPU, and the GPU's hardware scheduler
context-switches between the processes sharing it, the same basic
idea as CPU time-slicing between threads. You configure it with a
ConfigMap read by the device plugin:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: nvidia-device-plugin-config
  namespace: kube-system
data:
  config.yaml: |
    version: v1
    sharing:
      timeSlicing:
        resources:
          - name: nvidia.com/gpu
            replicas: 4
```

With `replicas: 4`, one physical GPU now shows up to the scheduler as
4 schedulable `nvidia.com/gpu` units, and 4 separate pods can each
request `1` and land on the same card. The catch: there's **no memory
or fault isolation** between them. All 4 pods share the GPU's full
memory pool and can still trip each other's out-of-memory errors or
contend badly under heavy concurrent load. Time-slicing is a good fit
for light, bursty workloads — several small inference services, or
development/test pods — where you accept that tradeoff in exchange for
not paying for 4 idle GPUs.

## MIG: hardware partitioning, real isolation

**Multi-Instance GPU (MIG)** is a different mechanism entirely, built
into the GPU's hardware on the chips that support it — the A100 and
H100 are the common ones. MIG physically partitions a single GPU into
up to 7 separate **GPU instances**, each with its own dedicated slice
of memory, cache, and compute cores, isolated from the others at the
hardware level. A workload on one MIG instance genuinely cannot see or
interfere with a workload on another — this is isolation, not just
scheduling fairness.

MIG instances come in fixed profiles, e.g. on an 80GB A100:
`1g.10gb`, `2g.20gb`, `3g.40gb`, `7g.80gb` — the number before `g` is
the fraction of compute slices, the number after is the memory
allotted. Enabling MIG and carving up a GPU is done once at the node
level:

```
nvidia-smi -mig 1
nvidia-smi mig -cgi 19,19,19 -C
```

(profile IDs like `19` vary by GPU and driver version — `nvidia-smi
mig -lgip` lists what's available). In production, the NVIDIA GPU
Operator can manage this MIG partitioning declaratively across a node
pool via its `mig.strategy` setting, rather than running `nvidia-smi`
by hand on every node.

Once partitioned, each MIG instance shows up as its own extended
resource, and a pod requests a specific slice directly:

```yaml
resources:
  limits:
    nvidia.com/mig-1g.10gb: 1
```

## Choosing between them

Time-slicing works on any NVIDIA GPU, is simple to turn on, and costs
you isolation — fine for small, forgiving workloads. MIG is only
available on GPUs that support it, requires choosing a fixed partition
layout up front, and in exchange gives you real hardware isolation —
the right call when multiple tenants or workloads genuinely can't be
allowed to affect each other's memory or performance. Neither one
changes the training-workload story from the earlier lessons in this
chapter: a large training job still wants a whole GPU, or several, to
itself. Sharing is squarely an inference and multi-tenant-dev-and-test
problem.

## Key terms

| Term | Meaning |
|---|---|
| Time-slicing | Software sharing of one physical GPU across multiple pods via context-switching; no memory/fault isolation |
| MIG (Multi-Instance GPU) | Hardware-level partitioning of a single GPU (A100/H100-class) into isolated GPU instances with dedicated memory and compute |
| GPU instance | One MIG-partitioned slice of a physical GPU, exposed as its own schedulable resource, e.g. `nvidia.com/mig-1g.10gb` |
| NVIDIA GPU Operator | Automates driver/toolkit/device-plugin setup and can manage MIG partitioning declaratively across a node pool |

## Check yourself

You're ready to move on when you can explain, without looking: what
specifically does MIG give you that time-slicing doesn't, and why does
that difference matter more for a multi-tenant inference service than
it does for a single large training job?
