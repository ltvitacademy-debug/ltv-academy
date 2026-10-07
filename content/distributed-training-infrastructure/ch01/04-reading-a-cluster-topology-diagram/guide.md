# Reading a Cluster Topology Diagram

Before you can reason about why training is slow, or plan capacity for a new job, you need to be able to look at a cluster topology diagram and know what each layer means. This lesson teaches you to read solara-train's topology the way the Solara ML Platform team does — as a set of layers, each with its own bandwidth and its own failure domain.

## What you'll learn

- The three layers of solara-train's topology: GPU-to-GPU, node-to-node, and the fabric that connects them
- How to read `nvidia-smi topo -m` output to see the intra-node layer directly
- What "rail-optimized" means and why it matters for collective communication
- The questions to ask first when handed any unfamiliar topology diagram

## Layer 1: inside a node — NVLink

Within one of solara-train's 64 nodes, all 8 H100 GPUs are connected by NVLink, giving each GPU up to 900 GB/s of bidirectional bandwidth to its neighbors. You can see this directly with a tool from GPU Computing:

```bash
nvidia-smi topo -m
```

This prints a matrix where each cell shows the connection type between two GPUs (`NV#` for an NVLink connection with that many links, or `PHB`/`SYS` for a slower path through the CPU). On a healthy node, every GPU-to-GPU cell should show an NVLink connection — a `PHB` where you expected `NV18` is a sign something is misconfigured.

## Layer 2: between nodes — InfiniBand NDR

Outside the node, each GPU (or small group of GPUs) has its own InfiniBand NDR host channel adapter (HCA) running at 400 Gb/s. That link carries traffic to the InfiniBand switch fabric, which connects all 64 nodes together.

## Layer 3: the fabric shape — rail-optimized

"Rail-optimized" describes *how* those HCAs connect to switches. Each GPU in a node is assigned to the same numbered "rail" across every node — for example, GPU 0 on every node connects to "rail 0's" switch, GPU 1 to "rail 1's" switch, and so on. This matters because NCCL's ring and tree algorithms (Lesson 8) move data between the *same* GPU index across different nodes far more often than between different indices — rail-optimization puts that traffic on a dedicated, non-contended switch instead of making it compete with everything else.

```text
Node 0  GPU0 ──┐                        ┌── GPU0  Node 1
Node 0  GPU1 ──┼── Rail 0 switch ... ────┤
   ...         │                        │
Node 0  GPU7 ──┘   Rail 7 switch ... ────┘── GPU7  Node 1
```

## Questions to ask of any topology diagram

1. **What's the fastest path, and what uses it?** (GPU-to-GPU NVLink — intra-node collectives)
2. **What's the bottleneck path, and what uses it?** (Inter-node InfiniBand — the traffic Chapter 2 is all about)
3. **What's the blast radius of one failure?** A switch failure takes out one rail across every node; a node failure takes out 8 GPUs at once.
4. **Is anything oversubscribed?** (Lesson 10 covers bisection bandwidth and oversubscription ratios directly.)

## Key terms

- **HCA (host channel adapter)** — the InfiniBand NIC equivalent, one or more per node
- **Rail-optimized topology** — wiring where each GPU index across all nodes shares a dedicated switch/rail
- **`nvidia-smi topo -m`** — command that prints the intra-node GPU interconnect matrix
- **Blast radius** — how much of the cluster a single component failure takes down

## Recap

Reading a topology diagram means reading it in layers: NVLink inside the node, InfiniBand between nodes, and the rail-optimized wiring that decides how that inter-node traffic is distributed across switches. Next, Lesson 5 puts a number on all of this: capacity planning for an actual training job.
