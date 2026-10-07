# Capstone: Diagnosing a Slow Training Job

This is the final lesson of GPU Computing. Instead of introducing a new concept, it walks through a single realistic scenario end to end, using only the tools and signals this course has already covered, in the order a real engineer would actually reach for them.

## What you'll learn

- A repeatable diagnostic order for "training is slower than it should be"
- How to use `nvidia-smi` to triage before reaching for a deeper profiler
- How the course's signals (data loading, memory-bound kernels, communication, scheduling) map onto one real symptom
- Why diagnosis should always start broad and narrow down, not the reverse

## The scenario

A team reports that a 4-GPU DDP training job is taking twice as long per epoch as it did last month, with no code changes to the model itself.

## Step 1: Check GPU utilization first, always

```
$ nvidia-smi dmon
# gpu   pwr  temp    sm   mem
#   0    210   68    38     61
#   1    205   67    35     58
#   2    198   66    31     55
#   3    201   67    34     57
```

38% average SM utilization across all 4 GPUs, fairly even. This immediately rules out one GPU being a straggler (Chapter 5's topology concerns) and points toward every GPU spending a lot of time waiting on something, rather than one misbehaving card.

## Step 2: Is it the data pipeline?

```python
import time
t0 = time.time()
for i, batch in enumerate(dataloader):
    if i == 0:
        print(f"first batch: {time.time() - t0:.2f}s")
    t0 = time.time()
```

Timing time between batches (Chapter 1's CPU/GPU split) is the cheapest first check — if the gap between batches is large and GPU utilization is low during that gap, the data loader is CPU-bound and starving the GPU, and the fix is more `DataLoader` workers or prefetching, not anything GPU-side at all.

## Step 3: If the pipeline is fine, check communication

```
$ NCCL_DEBUG=INFO torchrun --nproc_per_node=4 train.py 2>&1 | grep -i "via"
NCCL INFO Channel 00 : 0[0] -> 1[1] via NVLINK
NCCL INFO Channel 00 : 0[0] -> 2[2] via P2P/IPC
```

If the data pipeline checks out, the next suspect (Chapters 5-6) is the all-reduce itself — confirm it's still using NVLink and hasn't silently fallen back to a slower path, which can happen after a driver update or a change in which physical GPUs a job lands on.

## Step 4: If everything above is clean, profile the kernel itself

```
$ nsys profile -o report python train.py
$ ncu --set full python train.py
```

Only once data loading and communication are ruled out does it make sense to open Nsight Systems (the timeline view, from Chapter 3) and Nsight Compute (per-kernel memory-bound vs. compute-bound analysis) to check whether the model's own kernels have become memory-bound — for example, from a recent batch size change that changed occupancy without anyone noticing.

## Why this order matters

Each step is strictly cheaper and broader than the next: `nvidia-smi dmon` costs nothing and rules out entire categories in seconds; a timing print rules out the data pipeline; an NCCL log line rules out communication; only the full profiler, the most expensive and detailed tool, gets reached for last, once everything cheaper has been eliminated. This is the diagnostic discipline this entire course has been building toward — you never need a different tool than the ones already covered, only the judgment of which to reach for first.

## Key terms

- **Triage** — starting with the cheapest, broadest checks before reaching for a detailed profiler
- **Straggler** — one GPU in a multi-GPU job running meaningfully slower than its peers
- **Inter-batch timing** — measuring the gap between batches to detect a CPU-bound data loader
- **NCCL transport log** — confirming which interconnect (NVLink vs. a slower fallback) an all-reduce is actually using
- **Diagnostic order** — broad and cheap first, narrow and expensive last
