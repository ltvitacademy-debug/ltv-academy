# NCCL & Collective Communication

Lesson 6 established that communication is expensive and has to overlap with compute. On solara-train, the library doing that communication — every AllReduce, every AllGather, every ReduceScatter — is **NCCL** (NVIDIA Collective Communication Library). This lesson introduces NCCL itself: the collectives it provides and the environment variables the Solara ML Platform team actually touches when configuring it.

## What you'll learn

- The core collective operations NCCL provides and what each one does
- How NCCL automatically detects and uses the fastest available path (NVLink, then InfiniBand)
- The NCCL environment variables you'll actually see on solara-train
- How to read NCCL's own debug output to confirm it picked the path you expect

## The core collectives

- **Broadcast** — one GPU sends the same data to all others (e.g., distributing initial weights)
- **AllReduce** — every GPU contributes data, an operation (usually sum) is applied, and every GPU ends up with the identical reduced result. This is the classic data-parallel gradient sync.
- **ReduceScatter** — every GPU contributes data, it's reduced, but each GPU only keeps *its own shard* of the result. FSDP uses this for gradients.
- **AllGather** — the inverse of ReduceScatter: every GPU has a shard, and every GPU ends up with the full, concatenated result. FSDP uses this to reconstruct full parameters before a forward/backward pass.

## NCCL picks the fastest path automatically

NCCL inspects the hardware topology at startup — it sees which GPUs share NVLink and which only reach each other over the InfiniBand fabric — and builds its ring/tree communication pattern to prefer the fastest links available, without the training code needing to know anything about the physical layout. That's why Lesson 4's topology-reading skill matters: NCCL is reacting to exactly that topology.

## Environment variables you'll actually use

```bash
# Which network interface(s) NCCL should use for socket-based bootstrap traffic
export NCCL_SOCKET_IFNAME=eth0

# Force NCCL to skip InfiniBand entirely (debugging / fallback only — never
# set this in production on solara-train, since it forces a far slower path)
export NCCL_IB_DISABLE=0

# Which InfiniBand HCA(s) NCCL is allowed to use
export NCCL_IB_HCA=mlx5

# Verbose logging — shows which algorithm and path NCCL selected
export NCCL_DEBUG=INFO
```

## Reading NCCL's debug output

With `NCCL_DEBUG=INFO` set, NCCL logs its topology discovery and the ring it built at job startup. A healthy launch on solara-train includes lines confirming it found the InfiniBand HCAs and chose them over any fallback:

```text
NCCL INFO NET/IB : Using [0]mlx5_0:1/IB [1]mlx5_1:1/IB ...
NCCL INFO Channel 00/04 : 0 1 2 3 4 5 6 7 ... (ring established)
```

If that log instead shows `NET/Socket` where you expected `NET/IB`, something is wrong with the InfiniBand configuration — exactly the kind of thing Lesson 11 teaches you to catch.

## Key terms

| Term | Meaning |
|---|---|
| NCCL | NVIDIA Collective Communication Library — implements AllReduce, AllGather, ReduceScatter, Broadcast |
| NCCL_SOCKET_IFNAME | Env var selecting the network interface for NCCL's bootstrap/socket traffic |
| NCCL_IB_HCA | Env var restricting which InfiniBand adapters NCCL may use |
| NCCL_DEBUG | Env var controlling NCCL's log verbosity (WARN, INFO, TRACE) |

## Recap

NCCL provides the actual collective operations — Broadcast, AllReduce, ReduceScatter, AllGather — and automatically builds its communication pattern around the fastest hardware path it detects, configurable through environment variables like `NCCL_SOCKET_IFNAME` and `NCCL_IB_HCA`, and observable through `NCCL_DEBUG=INFO`. Next, Lesson 8 goes inside AllReduce and AllGather themselves: what actually happens, step by step, during one of these operations.
