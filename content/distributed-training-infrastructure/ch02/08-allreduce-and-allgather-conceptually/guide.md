# AllReduce & AllGather, Conceptually

Lesson 7 named the collectives NCCL provides. This lesson opens up the most important one, ring AllReduce, step by step, and then contrasts it with the tree algorithm NCCL also uses — because knowing *which* algorithm is running explains the bandwidth formula from Lesson 6.

## What you'll learn

- The two-phase ring AllReduce algorithm: scatter-reduce, then all-gather
- Why ring AllReduce's bandwidth cost is independent of the number of GPUs
- When NCCL switches to a tree algorithm instead, and what it trades off
- How AllGather alone (without the reduce) relates to the same ring pattern

## Ring AllReduce: two phases

Picture 8 GPUs arranged in a logical ring (the arrangement NCCL actually uses maps onto solara-train's real NVLink/InfiniBand topology, but the ring itself is logical). Each GPU starts with its own chunk of gradients to contribute.

**Phase 1 — scatter-reduce:** each GPU splits its data into N pieces and sends one piece to its ring neighbor, receiving and reducing (summing) a piece in return. After N-1 steps around the ring, every GPU holds one fully-reduced piece of the total result — but only one piece.

**Phase 2 — all-gather:** each GPU now passes its fully-reduced piece around the ring so that, after another N-1 steps, every GPU has collected every piece. The result: every GPU ends up with the complete, identical, reduced result.

## The bandwidth formula, revisited

Each GPU sends and receives roughly `2(N-1)/N` times its share of the data (`S/N`) across the two phases, for a total per-GPU traffic of about `2(N-1)S/N`. As N grows, this approaches `2S` — a constant, independent of how many GPUs are participating. That's the formula from Lesson 6, and it's *why* ring AllReduce is called bandwidth-optimal: the total data any one GPU has to move doesn't blow up as the cluster grows.

```text
Per-GPU traffic ≈ 2 × (N-1)/N × S   (S = size of this GPU's data share)
→ approaches 2S as N → ∞ (bandwidth-optimal, but latency grows with N)
```

## Where ring loses: latency at large N

Ring AllReduce needs `2(N-1)` total communication steps — each one with its own fixed latency overhead, regardless of how little data it carries. At small N this is negligible; at very large N, that per-step latency adds up. This is why NCCL can switch to a **tree** algorithm for some operations: a tree reduces the number of sequential steps to roughly `log(N)`, trading a bit of extra bandwidth for far lower latency at scale. `NCCL_ALGO` is the environment variable that controls (or lets you inspect) this choice.

## AllGather is half the pattern

AllGather alone — no reduction, just collecting shards into a full copy — uses exactly the same ring data-movement pattern as ring AllReduce's second phase. That's why FSDP's AllGather (to reconstruct full parameters) and its ReduceScatter (to shard gradients) are, together, structurally similar to one full AllReduce: FSDP has effectively split AllReduce's two phases apart and spread them across the forward and backward passes.

## Key terms

- **Scatter-reduce** — ring AllReduce's first phase: reduce data in pieces, each GPU ends with one complete piece
- **All-gather phase** — ring AllReduce's second phase: circulate pieces so every GPU gets all of them
- **Bandwidth-optimal** — per-GPU traffic stays bounded (≈2S) regardless of GPU count
- **Tree algorithm** — NCCL's alternative with ~log(N) steps, trading bandwidth for lower latency at large N

## Recap

Ring AllReduce is scatter-reduce followed by all-gather, and that two-phase structure is exactly why its per-GPU bandwidth cost stays flat as GPU count grows — the formula from Lesson 6 made concrete. Next, Lesson 9 compares the two fabrics these collectives actually run over: InfiniBand and Ethernet.
