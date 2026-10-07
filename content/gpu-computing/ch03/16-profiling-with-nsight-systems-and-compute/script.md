# Script — Profiling With Nsight Systems & Compute

## Segment 1 (title)

Nvidia-smi tells you the GPU looked busy. It can't tell you which kernel was running, how long it took, or whether it was compute-bound or memory-bound. That's the job of two real profilers: Nsight Systems for the big picture, and Nsight Compute for a deep dive into one kernel.

## Segment 2 (code)

Nsight Systems traces a whole application over time — CPU threads, CUDA API calls, kernel launches, memory copies — and lays it all out on one timeline. Running nsys profile against a training script generates a report you open in the Nsight Systems GUI, where you can spot things a single utilization number can't, like an idle gap waiting on the CPU or a synchronization call serializing work that should overlap.

## Segment 3 (code)

Once that timeline points at a specific kernel worth investigating, Nsight Compute profiles that kernel in isolation with full hardware-counter detail. Running ncu with the full metric set against that kernel produces a report with achieved occupancy, memory throughput against peak bandwidth, compute throughput against peak FLOPs, and which of those is the actual limiter — directly answering compute-bound or memory-bound instead of making you estimate it.

## Segment 4 (steps)

The workflow is triage, then diagnose. Start with Nsight Systems when you don't know where the time is going — it could be the dataloader, a sync stall, or any number of kernels. Once you've spotted a specific target, switch to Nsight Compute, since its deep instrumentation is too expensive to run on every kernel in a large model.

## Segment 5 (outro)

Up next, lesson seventeen: finding and fixing a GPU bottleneck, where you put nvidia-smi, Nsight Systems, and Nsight Compute together on one realistic slow training job.
