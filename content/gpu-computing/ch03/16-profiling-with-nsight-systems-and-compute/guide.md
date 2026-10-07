# Profiling With Nsight Systems & Compute

`nvidia-smi` tells you the GPU looked busy. It can't tell you which kernel was running, how long it took, or whether it was compute-bound or memory-bound. That's the job of NVIDIA's two real profilers: Nsight Systems for the big-picture timeline, and Nsight Compute for a deep dive into a single kernel. This lesson covers what each one is for and how to run a first pass with each.

## What you'll learn

- The difference in scope between Nsight Systems (timeline, system-wide) and Nsight Compute (per-kernel, deep)
- How to capture a timeline trace with `nsys profile`
- How to capture a detailed kernel report with `ncu`
- Which tool answers "where is the time going" vs. "why is this kernel slow"

## Nsight Systems: the timeline view

Nsight Systems (`nsys`) traces a whole application over time — CPU threads, CUDA API calls, kernel launches and execution, memory copies, and (if you add them) custom NVTX markers — and lays all of it out on a single timeline. This is the right tool when the question is "where is the time actually going," not yet "why is this one kernel slow."

```
$ nsys profile -o report python train.py
Generating '/tmp/nsys-report.qdstrep'
Collecting data...
Processing events...
Saving temporary "/tmp/nsys-report.qdstrep" file to disk...
Generated:
    report.nsys-rep
    report.sqlite
```

Opening `report.nsys-rep` in the Nsight Systems GUI shows a timeline where you can visually spot patterns a single utilization number can't: gaps where the GPU sits idle waiting on the CPU (often a data-loading bottleneck), kernels that don't overlap with memory copies when they could, or a host-device synchronization call that serializes work that should be running concurrently.

## Nsight Compute: the per-kernel deep dive

Once Nsight Systems points at a specific kernel worth investigating, Nsight Compute (`ncu`) profiles that kernel in isolation with full hardware-counter detail — achieved occupancy, memory throughput against the roofline, instruction mix, and the specific limiter holding it back.

```
$ ncu --set full -o kernel_report python train.py
==PROF== Connected to process 8842
==PROF== Profiling "matmul_kernel" - 0: 0%....50%....100% - 8 passes
==PROF== Disconnected from process 8842
==PROF== Report: kernel_report.ncu-rep
```

The resulting report breaks down, per kernel, metrics like achieved occupancy versus theoretical maximum, DRAM throughput as a percentage of peak bandwidth, compute (SM) throughput as a percentage of peak FLOPs, and which of these is the "speed of light" limiter for that specific kernel — directly answering whether a kernel is compute-bound or memory-bound instead of making you estimate it from arithmetic intensity by hand.

## Choosing between the two

- Start with **Nsight Systems** when you don't yet know where the time is going — a slow training step could be the dataloader, host-device synchronization, CPU-side Python overhead, or any one of dozens of kernels.
- Switch to **Nsight Compute** once you've identified a specific kernel (or small set of kernels) worth investigating in depth, and want to know exactly why that kernel is slow and which resource is limiting it.

Running `ncu` on every kernel in a large model is expensive — its deep instrumentation adds significant per-kernel overhead — so the typical workflow is `nsys` first to triage, then `ncu` on the few kernels that actually matter.

## Key terms

- **Nsight Systems (`nsys`)** — system-wide timeline profiler covering CPU, GPU, and memory activity
- **Nsight Compute (`ncu`)** — per-kernel profiler with detailed hardware-counter metrics
- **NVTX marker** — a custom-named range you add to code so it shows up labeled in the Nsight Systems timeline
- **Speed of light (SoL) / limiter** — the resource (compute or memory) that Nsight Compute identifies as actually capping a kernel's performance
- **DRAM throughput** — achieved memory bandwidth as a percentage of the GPU's peak, reported by Nsight Compute
- **Triage workflow** — profiling broadly with Nsight Systems first, then deeply with Nsight Compute on the kernels that matter
