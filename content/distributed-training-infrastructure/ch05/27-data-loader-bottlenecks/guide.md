# Data Loader Bottlenecks

Lessons 24 through 26 covered how to build a data pipeline that *should* keep 512 GPUs fed: tuned `DataLoader` settings, sharded datasets, and a storage backend sized for the throughput the job needs. This lesson is about what to do when all of that is in place and the GPUs are *still* underutilized — because the data pipeline has a specific bottleneck somewhere, and finding it is a diagnostic skill, not a guessing game.

## What you'll learn

- How to tell data-loading starvation apart from a genuinely compute-bound or network-bound step
- The most common causes of a slow data loader, and how each one shows up
- How to use the PyTorch Profiler to see exactly where step time goes
- Why `num_workers` tuning has a ceiling, not just a floor

## The first signal: GPU utilization that doesn't match the story

The earliest clue that the data loader — not the network or the GPUs themselves — is the bottleneck is a GPU utilization metric that dips rhythmically at the start of every step and recovers once the batch arrives, rather than staying low throughout. (Chapter 6 covers reading this signal from DCGM metrics in Grafana in detail; for now, the diagnostic habit is what matters.) If GPU utilization is healthy *except* for a recurring stall right when the next batch should load, that's a strong sign the loader, not communication or compute, is the limiting factor.

## Common causes, and how to spot each one

- **Too few `num_workers`.** The main process blocks waiting on the next batch because there aren't enough worker processes preparing it in advance. Symptom: step time improves roughly linearly as `num_workers` increases, up to a point.
- **CPU-bound preprocessing.** Tokenization, decompression, or augmentation that's expensive per sample can saturate the node's CPU cores before the GPU ever sees a slowdown elsewhere. Symptom: node-level CPU utilization pegged near 100% while GPU utilization dips.
- **`pin_memory=False` or missing.** Without page-locked memory, the host-to-device copy is slower and synchronous. Symptom: a visible gap between "batch ready on CPU" and "batch visible to the GPU kernel" in a profiler trace.
- **Storage throughput, not CPU.** If shards are streaming from S3 directly rather than through a warm FSx for Lustre cache (Lesson 28), network-to-storage latency itself can be the limit. Symptom: CPU and GPU both under-utilized at once, with time clearly spent waiting on I/O.
- **Batch size too small relative to overhead.** A very small per-step batch spends a larger fraction of each step on fixed overhead (Python dispatch, kernel launch) rather than useful work, which can look like a data problem but isn't.

## Using the PyTorch Profiler to find out for sure

Guessing which of these applies wastes cluster time. The PyTorch Profiler shows exactly where each step's time goes:

```python
from torch.profiler import profile, ProfilerActivity, schedule

with profile(
    activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],
    schedule=schedule(wait=1, warmup=1, active=3, repeat=1),
    on_trace_ready=torch.profiler.tensorboard_trace_handler("./profiler_logs"),
) as prof:
    for step, batch in enumerate(loader):
        train_step(batch)
        prof.step()
```

The resulting trace, viewed in TensorBoard, breaks each step down into data-loading wait time versus actual compute and communication time — turning "GPUs feel slow" into a specific number of milliseconds spent waiting on the `DataLoader`, which is the evidence needed to decide whether the fix is more workers, a storage change, or something else entirely.

## Why `num_workers` has a ceiling

It's tempting to treat `num_workers` as a dial that only helps when turned up. It doesn't: each node has a fixed number of CPU cores, and workers compete with each other — and with any CPU-side NCCL or orchestration overhead — for that same pool. Past a certain point, adding workers increases context-switching and memory pressure faster than it increases throughput, and step time gets *worse*. The right value is found empirically, per node shape, not assumed.

## Key terms

- **Data-loading starvation** — the GPU idling because the next batch isn't ready, visible as rhythmic utilization dips
- **PyTorch Profiler** — a tool that breaks step time down into data-loading, compute, and communication segments
- **CPU-bound preprocessing** — preprocessing work expensive enough to saturate CPU cores before the GPU is the limit
- **`num_workers` ceiling** — the point past which more worker processes hurt throughput instead of helping it

## Recap

Diagnosing a data loader bottleneck means distinguishing starvation from a genuine compute or network limit, checking the common culprits — worker count, CPU-bound preprocessing, missing `pin_memory`, storage throughput, batch size — and confirming with the PyTorch Profiler rather than guessing. Next, Lesson 28 covers caching strategies that address one of the most common root causes directly: repeatedly re-reading the same data from slow storage.
