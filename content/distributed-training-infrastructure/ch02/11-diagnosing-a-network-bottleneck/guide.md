# Diagnosing a Network Bottleneck

Chapter 2 has built the theory: why bandwidth matters, how NCCL moves data, how AllReduce actually works, what fabric it runs over, and how that fabric is wired. This lesson closes the chapter by turning that theory into a diagnostic checklist — what the Solara ML Platform team actually runs when a Solara-70B job is training slower than the capacity-planning estimate from Lesson 5 predicted.

## What you'll learn

- How to benchmark raw collective performance with `nccl-tests`, independent of the training job
- The difference between algorithm bandwidth (algbw) and bus bandwidth (busbw), and why busbw is the number to trust
- Where to look for packet-level problems: InfiniBand port counters
- How to tell network-bound from compute-bound using GPU utilization during a collective

## Step 1: benchmark the fabric directly with nccl-tests

Before suspecting the training job itself, the team runs NVIDIA's `nccl-tests` — a standalone benchmark that exercises exactly the same collectives NCCL uses, isolated from anything else the training code is doing:

```bash
# all_reduce_perf: sweep message sizes from 8MB to 8GB, across 8 GPUs
all_reduce_perf -b 8M -e 8G -f 2 -g 8
```

## Step 2: read algbw vs. busbw, not just "time"

`nccl-tests` output includes two bandwidth columns that are easy to confuse:

- **algbw (algorithm bandwidth)** — simply `message size / time`. It looks like the number you'd want, but it understates how much data actually moved, because a collective moves more bytes across the wire than the logical message size.
- **busbw (bus bandwidth)** — algbw multiplied by the ring AllReduce factor from Lesson 8, `2(N-1)/N`. This is the number that should be compared against the fabric's actual hardware bandwidth (InfiniBand NDR's 400 Gb/s per port) to judge whether you're close to hardware limits.

If busbw is far below the expected hardware bandwidth, the fabric itself — not the training code — is the first suspect.

## Step 3: check for packet-level problems

A degraded (not dead) link often doesn't show up as a crash — just as unexpectedly low busbw. InfiniBand's own counters catch this:

```bash
ibstat                 # link state and negotiated speed per HCA
perfquery -x <port>    # CRC errors, symbol errors, retransmits on that port
```

A link negotiated at a lower speed than its rated 400 Gb/s, or a nonzero and climbing CRC error count, points straight at a hardware or cabling problem on that specific link — not a software misconfiguration.

## Step 4: separate network-bound from compute-bound

During an actual training step, watch GPU utilization (`nvidia-smi dmon`) while the collective is running. If GPU compute utilization drops to near zero *during* the AllGather/ReduceScatter phases but the step is still slow, the GPUs are idle waiting on the network — confirming a network-bound bottleneck rather than a compute-bound one.

## Key terms

| Term | Meaning |
|---|---|
| nccl-tests | NVIDIA's standalone benchmark suite for raw collective performance, independent of any training job |
| algbw | Algorithm bandwidth: message size ÷ time — understates actual wire traffic |
| busbw | Bus bandwidth: algbw × 2(N-1)/N — the number to compare against hardware limits |
| ibstat / perfquery | InfiniBand tools for checking link speed and packet-level error counters |

## Recap

Diagnosing a network bottleneck means benchmarking the fabric in isolation with nccl-tests, trusting busbw over algbw when comparing against hardware limits, checking InfiniBand's own port counters for packet-level problems, and confirming the GPUs are actually idle during the slow phase before blaming the network. That closes Chapter 2 — Chapter 3, "Kubernetes Job Scheduling for ML," picks up with how solara-train actually decides which jobs get GPUs in the first place.
