# The Real Cost of GPU Idle Time

MIG and time-slicing exist because of one simple, expensive fact: an idle GPU costs exactly the same as a busy one. This lesson makes that concrete with real numbers, and connects every profiling and scheduling idea from this course into a single economic argument.

## What you'll learn

- Why GPU idle time is a pure financial loss, not just a performance footnote
- The common real-world causes of idle GPU time, chapter by chapter
- How to measure utilization over time, not just at one instant
- Why this is the actual job of a GPU resource management strategy

## The core fact: idle GPUs still cost money

A cloud data-center GPU instance (an A100 or H100) costs on the order of $2-6+ per GPU-hour on-demand, and an owned GPU has the same depreciation and power cost whether it's running a kernel or sitting idle. `nvidia-smi`'s `GPU-Util` column reports the percentage of time, over the last sampling period, that at least one kernel was executing — and in real ML infrastructure, this number sitting at 30-40% average utilization across a cluster is extremely common, meaning well over half of every GPU-hour paid for is being wasted.

```
$ nvidia-smi --query-gpu=utilization.gpu,utilization.memory --format=csv -l 5
utilization.gpu [%], utilization.memory [%]
12 %, 8 %
9 %, 8 %
14 %, 9 %
```

A GPU sitting around 10-15% utilization for sustained periods, as shown here, is a strong signal that something upstream of the GPU — not the GPU itself — is the actual bottleneck.

## Where idle time actually comes from, chapter by chapter

- **A CPU-bound data loader** (Chapter 1) starving the GPU between batches
- **Memory-bound kernels** (Chapter 3) where the GPU is waiting on HBM, not computing
- **Slow inter-GPU or inter-node communication** (Chapters 5-6) where GPUs sit idle waiting for an all-reduce to finish
- **Poor cluster scheduling** — a job waiting in `Pending` state for a GPU that's allocated but barely used by another job
- **Checkpoint/logging I/O stalls** — writing a large checkpoint to slow storage while the GPU sits idle

## Measuring utilization properly

A single `nvidia-smi` snapshot can be misleading — a kernel-launch-heavy workload might show 100% utilization while doing very little useful work per launch. Sustained monitoring (`nvidia-smi dmon`, or a real monitoring stack like NVIDIA DCGM exporting to Prometheus/Grafana) over the full duration of a job is what actually answers "is this GPU-hour being used well," by averaging utilization, memory usage, and power draw over the whole run rather than a single moment.

## Why this is the whole point of cluster GPU management

Every tool in this chapter — Kubernetes scheduling, MIG, time-slicing — exists to solve exactly this problem: keeping expensive GPU hardware as close to continuously busy with useful work as possible, across every job and every team sharing a cluster, rather than having idle capacity sit allocated to one job while another waits in `Pending`.

## Key terms

- **GPU-Util** — the percentage of time a GPU had at least one kernel executing, reported by `nvidia-smi`
- **Utilization** — a measure of how busy a resource is, best assessed as a sustained average, not a single snapshot
- **`nvidia-smi dmon`** — a command for continuous, streaming GPU monitoring over time
- **NVIDIA DCGM** — NVIDIA's Data Center GPU Manager, used for cluster-wide GPU monitoring
- **Idle GPU cost** — the financial loss of paying for or depreciating GPU hardware that is not doing useful work
