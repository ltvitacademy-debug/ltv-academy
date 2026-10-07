# Why Network Bandwidth Dominates at Scale

Chapter 1 closed with a wall-clock estimate for training Solara-70B that assumed the network keeps up. This lesson is about why that assumption needs defending, not assuming: at 512 GPUs, the volume of data that has to move between them on every single training step is enormous, and if the network can't move it fast enough, those expensive H100s sit idle waiting.

## What you'll learn

- How much data actually has to move per training step when using FSDP
- The real formula for how long a ring AllReduce-style collective takes, and why it doesn't improve just by adding more GPUs
- Why compute-to-communication ratio gets worse, not better, as you scale out
- What "compute-communication overlap" means as the mitigation

## How much data moves per step

Solara-70B has 70 billion parameters. With FSDP's reduce-scatter and all-gather pattern, the *amount of data all 512 GPUs collectively move per step is on the order of the full parameter and gradient size* — roughly 2 bytes per parameter in BF16, times 2 (parameters and gradients) — so on the order of 280 GB has to move through the fabric collectively on every single step, every few seconds, for the entire ~33.6-day run.

## The communication time formula

For a ring-based collective moving a total payload of size *S* across *N* GPUs at per-link bandwidth *β*, the time to complete it is approximately:

```text
T_comm ≈ 2 × (N - 1) / N × (S / β)
```

The key insight: as *N* grows large, `(N-1)/N` approaches 1 — so the *per-GPU* communication time for a ring collective stays roughly constant regardless of how many GPUs you add. That's good news for scaling the algorithm, but it means the *absolute* time spent communicating doesn't shrink just because you added more compute. If `T_comm` is already a meaningful fraction of your step time at 64 GPUs, it's still a meaningful fraction at 512.

## Compute-to-communication ratio gets worse with scale

Per-GPU compute time per step shrinks as you add more GPUs (each one does less work). But per-GPU communication time, per the formula above, stays roughly flat. That means the ratio of useful compute time to communication time gets *worse* as the cluster grows — which is exactly why network bandwidth, something you could mostly ignore on a single 8-GPU node, becomes the dominant constraint at 512 GPUs.

## The mitigation: overlap, not just bandwidth

More bandwidth helps, but the other lever is **overlapping** communication with compute — starting the AllReduce/ReduceScatter for one layer's gradients while the backward pass is still computing the next layer's. PyTorch's FSDP does this by default; NCCL operations are asynchronous specifically so this overlap is possible. Chapter 2's remaining lessons (NCCL mechanics, the AllReduce/AllGather algorithms themselves, InfiniBand vs. Ethernet, topology, and diagnosis) are all in service of making sure this overlap actually happens and the fabric can sustain it.

## Key terms

- **Ring AllReduce time formula** — `T_comm ≈ 2(N-1)/N × (S/β)`; per-GPU time stays roughly constant as N grows
- **Compute-to-communication ratio** — shrinks as cluster size grows, making bandwidth the binding constraint at scale
- **Overlap** — starting communication for one part of the model while compute continues on another part

## Recap

At 512 GPUs, hundreds of gigabytes move through the fabric every step, and the ring communication time formula shows that scaling out more GPUs doesn't shrink that time — it just shrinks the useful compute time around it, making bandwidth the dominant constraint. Next, Lesson 7 introduces NCCL, the library that actually implements these collectives on solara-train.
