# Finding & Fixing a GPU Bottleneck

This lesson pulls together everything from this chapter into one workflow: a training job is running slower than it should, and you have to find out why using `nvidia-smi`, Nsight Systems, and Nsight Compute, then actually fix it. There's no substitute for walking through the decision tree once end to end.

## What you'll learn

- A practical, ordered workflow for diagnosing a slow GPU job
- How to tell a CPU-bound dataloader bottleneck from a GPU-bound kernel bottleneck
- How to distinguish a memory-bound kernel from a compute-bound one once you've found it
- Which fix matches which diagnosis — and why applying the wrong fix wastes time

## Step 1 — confirm the GPU is actually the bottleneck

Start with `nvidia-smi dmon` while the job runs. If GPU utilization is low and spiky (dropping to 0% repeatedly) rather than sustained near 100%, the GPU is frequently starved — it's waiting on something else, usually the CPU-side data pipeline (loading, augmenting, or collating batches) rather than anything happening on the GPU itself.

```
$ nvidia-smi dmon -s u
# gpu   sm   mem
    0    12    4
    0     0    0
    0    85   30
    0     0    0
```

Utilization bouncing between near-zero and a spike, repeatedly, is the signature of a starved GPU — fix the feeding pipeline (more dataloader workers, `pin_memory=True`, prefetching) before touching any kernel.

## Step 2 — if the GPU is busy, find out on what

If utilization is sustained and high, the bottleneck is on the GPU itself. Capture a timeline with Nsight Systems to see what's actually running and whether operations that could overlap — a memory copy and a kernel on a different stream, for instance — are instead serialized:

```
$ nsys profile -o report python train.py
```

Look for unnecessary host-device synchronization points in the trace (a `.item()` or `.cpu()` call inside a training loop is a classic culprit — it forces the GPU to finish everything queued before the CPU can read the value, stalling the pipeline every iteration).

## Step 3 — profile the specific slow kernel

Once the timeline points at a specific kernel (or a handful of them) taking the bulk of the time, profile just that kernel with Nsight Compute:

```
$ ncu --set full --kernel-name matmul_kernel -o report python train.py
```

Read the "speed of light" section of the resulting report: if DRAM throughput is near its peak percentage and compute throughput is low, the kernel is memory-bound. If it's the reverse, it's compute-bound. If achieved occupancy is far below the theoretical max, check whether registers, shared memory, or block size is the limiter — Nsight Compute names it directly.

## Step 4 — apply the fix that matches the diagnosis

- **CPU-starved pipeline** → more `DataLoader` workers, `pin_memory=True`, prefetching, or moving augmentation off the critical path.
- **Unnecessary synchronization** → remove `.item()`/`.cpu()` calls from the hot loop, batch logging less frequently, use `non_blocking=True` transfers.
- **Memory-bound kernel** → fix the access pattern (coalescing), fuse adjacent elementwise ops to cut memory round-trips, or increase arithmetic intensity if the algorithm allows it.
- **Compute-bound kernel** → mixed precision (Tensor Cores), a better algorithm, or accept the cost if it's already near peak throughput.
- **Low occupancy** → adjust block size, or reduce per-thread register/shared-memory pressure if that's the stated limiter.

Applying a compute-side fix (like mixed precision) to a kernel that Nsight Compute reports as memory-bound won't move the needle — always let the profiler's own limiter verdict decide which fix is worth trying, rather than guessing from intuition.

## Key terms

- **Starved GPU** — utilization drops to near-zero repeatedly because the GPU is waiting on the CPU pipeline, not computing
- **Host-device synchronization** — a call (like `.item()`) that forces the CPU to wait for all queued GPU work to finish
- **Speed of light (limiter)** — Nsight Compute's verdict on which resource is actually capping a kernel
- **Dataloader bottleneck** — a CPU-side data pipeline too slow to keep the GPU fed
- **Kernel fusion** — combining operations to reduce memory round-trips for a memory-bound kernel
- **Diagnosis-first fix** — matching the remedy to what the profiler actually measured, not to intuition
