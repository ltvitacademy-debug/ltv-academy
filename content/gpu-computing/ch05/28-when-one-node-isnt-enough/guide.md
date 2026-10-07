# When One Node Isn't Enough

This closes out multi-GPU basics by looking past the single server. Everything so far — DDP, NCCL, NVLink topology — has lived inside one machine's 4 or 8 GPUs. This lesson covers what changes, and what doesn't, when a training job needs more GPUs than any one node has.

## What you'll learn

- The practical limits that push a job from one node to many
- How DDP's concepts extend across nodes (world size, global rank)
- Why inter-node networking becomes the new bottleneck, replacing NVLink
- What this sets up for Chapter 6's cluster-level resource management

## What pushes you past one node

A single node tops out at however many GPUs fit in its chassis — commonly 4 or 8 for a GPU server. You outgrow one node when the model itself doesn't fit on 8 GPUs' combined memory, or more commonly, when training would simply take too long on 8 GPUs and more parallelism (more GPUs, even across machines) is the only lever left to pull.

## DDP's concepts, extended across nodes

The same `DistributedDataParallel` abstraction from Lesson 25 scales to multiple nodes — the process-per-GPU model doesn't change, only the vocabulary gets more precise:

- **World size** — the total number of processes (GPUs) across every node combined, not just one machine
- **Global rank** — a process's unique ID across the entire job (0 to world_size - 1), distinct from `LOCAL_RANK` (its GPU index on its own node)
- **Rendezvous** — how processes on different nodes find each other and agree on their ranks before training starts, handled by `torchrun`'s `--rdzv` flags or a scheduler like Kubernetes

```
$ torchrun --nproc_per_node=8 --nnodes=4 --node_rank=0 \
    --master_addr=10.0.0.1 --master_port=29500 train.py
```

This launches 8 processes on this one node (`node_rank=0` of 4 total nodes), for a world size of 32 — every node runs an equivalent command with its own `node_rank`.

## The new bottleneck: inter-node networking

Inside one node, gradients cross NVLink at hundreds of GB/s. Between nodes, communication crosses a network — commonly InfiniBand or high-speed Ethernet, with bandwidth an order of magnitude or more lower than NVLink, and real latency added by the network stack itself. NCCL still handles this transparently (using whatever inter-node transport is available), but it means the arithmetic-intensity-vs-communication tradeoff from Chapter 3 gets harder: you need proportionally more compute per byte communicated to keep GPUs busy, or the job becomes network-bound rather than GPU-bound.

## What comes next

Once a job spans multiple nodes, something has to decide which nodes it runs on, how many GPUs each job gets, and what happens when two jobs compete for the same hardware — that's cluster-level resource management, the subject of Chapter 6, starting with how Kubernetes schedules GPU workloads.

## Key terms

- **World size** — the total number of processes (GPUs) across all nodes in a distributed job
- **Global rank** — a process's unique identifier across the entire job
- **`LOCAL_RANK`** — a process's GPU index on its own node (distinct from global rank)
- **Rendezvous** — the mechanism by which processes on different nodes discover each other and agree on ranks
- **InfiniBand** — a high-speed networking technology commonly used for inter-node GPU communication
