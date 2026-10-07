# MIG & Time-Slicing

The last lesson treated a GPU as indivisible — you get a whole one, or you wait. That's true by default, but NVIDIA and Kubernetes both offer ways around it for workloads that genuinely don't need a full GPU. This lesson covers the two real mechanisms: MIG and time-slicing, and the very different trade-off each one makes.

## What you'll learn

- What MIG (Multi-Instance GPU) is, and which GPUs support it
- What time-slicing is, and how it differs fundamentally from MIG
- The real trade-off between the two: isolation versus flexibility
- How each is requested from a pod spec

## MIG: hardware-level partitioning

**MIG (Multi-Instance GPU)**, available on A100, H100, and similar data-center GPUs, splits a single physical GPU into up to 7 fully isolated instances at the hardware level — each with its own dedicated slice of SMs, memory, and memory bandwidth. A workload running on one MIG instance cannot be slowed down or crashed by a workload on another instance on the same physical card; the isolation is real, not just a scheduling courtesy.

```
$ nvidia-smi -i 0 --query-gpu=index,name --format=csv
$ sudo nvidia-smi mig -i 0 -cgi 9,9,9 -C
# creates 3 MIG instances using the 1g.10gb profile on GPU 0
```

Kubernetes then schedules each MIG instance as its own separate `nvidia.com/gpu` resource (or a MIG-specific resource name depending on configuration), so a pod requesting `nvidia.com/gpu: 1` gets one MIG slice, not the whole card.

## Time-slicing: software-level sharing

**Time-slicing** instead lets multiple workloads share one GPU by having the GPU's scheduler rapidly switch between them in time — each gets the full GPU's resources, just not simultaneously. Configured through the NVIDIA device plugin's config map:

```yaml
version: v1
sharing:
  timeSlicing:
    resources:
      - name: nvidia.com/gpu
        replicas: 4
```

This makes Kubernetes advertise 4 schedulable "GPU" slots on a single physical card instead of 1 — but unlike MIG, there's no memory isolation: one workload can still exhaust the GPU's shared memory or create contention that slows every other workload sharing that card.

## The real trade-off

| | MIG | Time-slicing |
|---|---|---|
| Isolation | Hardware-level, real | None — shared memory and compute |
| Hardware support | A100, H100, and similar only | Any NVIDIA GPU |
| Granularity | Fixed profiles (e.g. 1g.10gb) | Arbitrary replica count |
| Best for | Multiple untrusted or latency-sensitive workloads | Many small, bursty, trusted workloads on older hardware |

## Key terms

- **MIG (Multi-Instance GPU)** — hardware-level partitioning of a supported GPU into isolated instances
- **Time-slicing** — software scheduling that lets multiple workloads take turns using a whole GPU
- **Isolation** — whether one workload can be slowed down or affected by another sharing the same physical GPU
- **MIG profile** (e.g. `1g.10gb`) — a fixed-size slice definition specifying compute and memory allocation
- **Device plugin config map** — the Kubernetes configuration enabling time-slicing for the NVIDIA device plugin
