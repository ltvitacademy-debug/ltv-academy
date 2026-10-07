# Communication Overhead & Its Costs

Every technique in this chapter so far has been described partly in terms of "how much communication it needs" -- data parallelism's all-reduce, tensor parallelism's in-layer all-reduces, pipeline parallelism's point-to-point hand-offs, ZeRO/FSDP's all-gathers. This lesson makes that cost concrete: what these communication patterns actually move, what determines how long they take, and why the same technique can look cheap on one cluster and expensive on another.

## What you'll learn

- The two things that determine communication cost: bandwidth and latency
- Why gradient all-reduce cost scales with model size, not batch size
- Why tensor parallelism is far more sensitive to interconnect speed than pipeline parallelism
- NVLink vs. InfiniBand vs. Ethernet, and why the gap between them matters enormously
- How to actually look at where time goes with `torch.profiler`

## Bandwidth-bound vs. latency-bound

Communication cost has two separate components: **bandwidth** (how much data can move per second once transfer starts) and **latency** (the fixed delay before any data arrives at all, regardless of size). A single large all-reduce of gradients is mostly bandwidth-bound -- the data volume is big, so the time to move it dominates. Pipeline parallelism's frequent small point-to-point sends between stages are comparatively more latency-sensitive, since each individual message is small but there are many of them, so fixed per-message overhead adds up.

## Why DP's communication scales with model size

In data parallelism, the all-reduce happens once per step but moves a gradient for every parameter in the model, so its cost scales with **model size**, not batch size. Doubling the model roughly doubles the gradient volume synced every step; doubling the batch size (holding the model fixed) doesn't change how much needs to be synced, since a larger local batch just means more compute per step on the way to the same single all-reduce. This is part of why larger models see communication eat a bigger share of step time, all else equal.

## Why tensor parallelism is uniquely interconnect-sensitive

Tensor parallelism's all-reduces happen *inside every layer*, many times per forward and backward pass -- not once per step like DP's gradient sync. That multiplies the number of synchronization points by the depth of the model, which is exactly why Lesson 32 confined tensor parallelism to a single server's NVLink: NVLink's extremely high bandwidth and low latency (connecting GPUs directly, bypassing the slower PCIe/network path) keeps this frequent communication from dominating step time. Stretch the same tensor-parallel group across a standard network between servers, and those same all-reduces -- now crossing a link that might be an order of magnitude slower -- can make the GPUs spend more time waiting on data than computing.

## The interconnect hierarchy

Real clusters have a layered bandwidth hierarchy, and which layer a given communication pattern crosses matters enormously:

- **NVLink / NVSwitch** -- direct GPU-to-GPU links within a server, the fastest tier, hundreds of GB/s
- **InfiniBand** -- the common choice for the network *between* servers in an AI training cluster, built specifically for low-latency, high-bandwidth collective operations
- **Standard Ethernet** -- far slower and higher-latency than InfiniBand for this kind of traffic; workable for less communication-intensive jobs, but a poor fit for tightly coupled model-parallel training across nodes

Picking which parallelism axis crosses which tier (tensor parallel inside NVLink, pipeline/data parallel across InfiniBand between nodes) is the whole point of the decision framework from Lesson 32.

## Measuring where time actually goes

Rather than guessing, PyTorch's profiler can show directly how much step time is communication versus compute:

```python
from torch.profiler import profile, ProfilerActivity

with profile(activities=[ProfilerActivity.CUDA], profile_memory=True) as prof:
    loss = model(**batch).loss
    loss.backward()
    optimizer.step()

print(prof.key_averages().table(sort_by="cuda_time_total"))
```

The resulting table breaks down CUDA time by operation, including NCCL collective calls (`all_reduce`, `all_gather`, and similar), making it possible to see directly whether a training run is compute-bound or stalling on communication -- rather than assuming.

## Key terms

- **Bandwidth-bound** -- communication cost dominated by the volume of data moved
- **Latency-bound** -- communication cost dominated by fixed per-message delay, regardless of size
- **NVLink/NVSwitch** -- the fastest GPU-to-GPU interconnect, within a single server
- **InfiniBand** -- the common high-bandwidth, low-latency network between servers in a training cluster
- **NCCL** -- NVIDIA's collective communication library implementing all-reduce, all-gather, and similar operations used by PyTorch and DeepSpeed
