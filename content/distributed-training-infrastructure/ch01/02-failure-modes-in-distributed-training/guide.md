# Failure Modes in Distributed Training

A training run for Solara-70B can span days to weeks across all 512 GPUs in solara-train. At that scale and duration, something failing isn't an edge case the Solara ML Platform team plans around — it's an expected, recurring event. This lesson catalogs what actually breaks, so the fault-tolerance work in Chapter 4 has a concrete list of problems to solve rather than a vague worry about "reliability."

## What you'll learn

- The four broad categories of failure a 512-GPU training job can hit
- Why a single bad GPU can stall all 512, not just the one it's attached to
- How NCCL surfaces a hung collective operation, and what the resulting error looks like
- The vocabulary for talking about failures precisely: Xid errors, stragglers, silent corruption

## Hardware failures: GPUs and NICs

GPUs fail in ways that are often silent at first. An ECC (error-correcting code) memory error on an H100 can be corrected transparently — until it can't, at which point the NVIDIA driver logs an **Xid error** to the kernel log and the GPU may need to be drained and rebooted. NICs fail more bluntly: a InfiniBand HCA (host channel adapter) can flap, drop its link, or silently degrade to a lower link speed, which doesn't crash anything but quietly slows every collective operation that has to cross it.

## Network partitions and NCCL timeouts

Distributed training depends on every rank reaching every collective operation (like AllReduce) at the same time. If one rank's node loses network connectivity — a switch port flaps, a cable is bad — the other 511 ranks block, waiting. NCCL has a watchdog for exactly this: after a configurable timeout, it raises an error instead of hanging forever.

```bash
export NCCL_DEBUG=INFO
# a stuck collective eventually surfaces as something like:
# NCCL WARN Timeout waiting for data from rank 37, seconds elapsed: 1800
```

## Stragglers: the quiet failure mode

Not every failure is a crash. A **straggler** is a rank that's still running but noticeably slower than the rest — a thermally throttled GPU, a node sharing a noisy PCIe bus, a NIC stuck at half speed. Because collectives like AllReduce are synchronous, every rank waits for the slowest one on every single step. One straggler out of 512 GPUs can silently cut the whole job's throughput, with no error message at all — which is why Lesson 11's diagnosis skills matter as much as crash recovery.

## Silent data corruption

The rarest and most dangerous failure: a bit flip or a hardware bug corrupts a gradient or an activation without crashing anything or raising any error. The loss curve looks a little off, or doesn't — and Solara AI only trusts it was a one-off if it doesn't recur after a restart. This is why periodic checkpointing (Chapter 4) and loss-curve monitoring (Chapter 6) exist as parallel safety nets, not substitutes for each other.

## Key terms

| Term | Meaning |
|---|---|
| Xid error | NVIDIA driver's log entry for a GPU-level hardware fault |
| NCCL watchdog timeout | The mechanism that turns a hung collective into an explicit error instead of an infinite hang |
| Straggler | A rank that's alive but running slower than the rest, silently capping throughput |
| Silent data corruption | A hardware fault that corrupts data without crashing or raising an error |

## Recap

Across 512 GPUs running for weeks, failures show up as GPU hardware faults, network partitions that trip NCCL's watchdog, silent stragglers that just slow everything down, and — rarely — silent corruption with no error at all. Next, Lesson 3 steps back to draw the line between this infrastructure work and the training algorithms running on top of it.
