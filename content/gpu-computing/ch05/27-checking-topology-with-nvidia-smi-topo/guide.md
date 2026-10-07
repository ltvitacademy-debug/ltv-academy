# Checking Topology With nvidia-smi topo

Earlier lessons showed fragments of `nvidia-smi topo -m` output. This lesson reads the full table properly — every connection type you'll actually see, what each one means for performance, and how to pair it with CPU affinity information to avoid a second, easy-to-miss bottleneck.

## What you'll learn

- The full set of connection types `nvidia-smi topo -m` reports
- How to read the CPU Affinity and NUMA columns, and why they matter
- How to spot a topology that will bottleneck multi-GPU training
- How this table connects to the `NCCL_DEBUG=INFO` transport log from the last lesson

## The full connection-type table

```
$ nvidia-smi topo -m
        GPU0    GPU1    GPU2    GPU3    CPU Affinity    NUMA Affinity
GPU0     X      NV12    SYS     SYS     0-15            0
GPU1    NV12     X      SYS     SYS     0-15            0
GPU2    SYS     SYS      X      NV12    16-31           1
GPU3    SYS     SYS    NV12      X      16-31           1
```

Connection types, from fastest to slowest:
- **`NVx`** — a direct NVLink connection (the number indicates link count/width)
- **`PIX`** — connected through a single PCIe switch
- **`PXB`** — connected through multiple PCIe switches
- **`PHB`** — connected through the PCIe host bridge (crosses through CPU-adjacent infrastructure)
- **`SYS`** — connected across a NUMA/CPU socket boundary — the slowest path, often crossing the CPU interconnect (e.g. AMD Infinity Fabric or Intel UPI) in addition to PCIe

In the example above, GPU0 and GPU1 have a fast NVLink path between them, as do GPU2 and GPU3 — but GPU0/GPU1 to GPU2/GPU3 only have `SYS`, meaning those pairs are on different NUMA nodes entirely.

## CPU Affinity and NUMA Affinity

**CPU Affinity** lists which CPU cores are physically "closest" to each GPU (same NUMA node) — pinning a process's CPU threads (like `DataLoader` workers) to those cores avoids cross-NUMA memory access, which has its own latency penalty separate from GPU interconnects entirely. **NUMA Affinity** gives the actual node number directly. If a training job's CPU-side work runs on cores far from the GPU it's feeding, that's a second, easy-to-miss source of slowdown layered on top of GPU-to-GPU topology.

## Putting it together

A training job that places 4 processes on GPUs 0-3 should ideally keep communication between GPU0/GPU1 and between GPU2/GPU3 (the fast NVLink pairs) more frequent than communication crossing the `SYS` boundary, if the workload allows that kind of grouping. In practice, DDP's all-reduce doesn't get to choose this — it talks to every GPU — but this table explains why an 8-GPU server with a `SYS` link to half its GPUs may not scale much better than a 4-GPU server once you add the slower half.

## Key terms

- **`NVx`** — a direct NVLink connection between two GPUs
- **`PIX` / `PXB` / `PHB`** — progressively slower PCIe-switch-based connections
- **`SYS`** — the slowest connection type, crossing a NUMA/CPU socket boundary
- **CPU Affinity** — the CPU cores physically closest to a given GPU
- **NUMA Affinity** — the specific NUMA node a GPU belongs to, relevant for pinning CPU-side work
