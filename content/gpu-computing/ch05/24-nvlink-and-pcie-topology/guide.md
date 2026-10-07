# NVLink & PCIe Topology

Everything so far has treated "the GPU" as a single device. Real training servers often have 4 or 8 GPUs in one box, and how those GPUs connect to each other — and to the CPU — has a direct impact on how fast multi-GPU training actually runs. This lesson covers the two interconnects you'll see: PCIe and NVLink.

## What you'll learn

- What PCIe is, and why it's a bottleneck for GPU-to-GPU traffic
- What NVLink is, and how much faster it is than PCIe
- How GPUs are physically wired together on a multi-GPU server
- How to read a topology diagram and connect it to real training performance

## PCIe: the default, and its limit

**PCIe (Peripheral Component Interconnect Express)** is the general-purpose bus every GPU uses to connect to the rest of the system — the CPU, system RAM, and (via the same bus) other GPUs. PCIe Gen4 x16 (common on recent servers) provides roughly 32GB/s of bandwidth in each direction. That sounds like a lot, but it's shared infrastructure, and it's dramatically slower than what GPUs can move internally — when two GPUs need to exchange gradients during distributed training, going through PCIe (and often through the CPU's PCIe root complex) is a real bottleneck.

## NVLink: a direct, high-bandwidth GPU-to-GPU link

**NVLink** is NVIDIA's proprietary direct GPU-to-GPU interconnect, bypassing PCIe and the CPU entirely for GPU-to-GPU traffic. NVLink 4 (used on H100s) provides around 900GB/s of total bidirectional bandwidth per GPU — more than 20x a single PCIe Gen4 x16 link. On servers with NVLink, GPUs are often also connected through an **NVSwitch**, a dedicated switch chip that gives every GPU in the box a direct, full-bandwidth path to every other GPU, rather than a point-to-point mesh with uneven paths.

## Why this matters for training

Multi-GPU training requires constant communication — gradients need to be averaged across all GPUs after every backward pass (covered in the next lesson). If that traffic has to cross PCIe and the CPU for every batch, training throughput can be dominated by communication time rather than compute time, no matter how fast each individual GPU is. This is the entire reason NVLink-equipped servers (like the NVIDIA DGX line) exist and command a premium: the interconnect, not just the GPUs, is the product.

```
$ nvidia-smi topo -m
        GPU0    GPU1    GPU2    GPU3    CPU Affinity
GPU0     X      NV12    NV12    NV12    0-31
GPU1    NV12     X      NV12    NV12    0-31
GPU2    NV12    NV12     X      NV12    0-31
GPU3    NV12    NV12    NV12     X      0-31
```

`NV12` here means an NVLink connection (the number is the link count/generation detail); `PHB` would mean the path goes through the PCIe host bridge instead — you'll learn to read this table fully in Lesson 27.

## Key terms

- **PCIe (Peripheral Component Interconnect Express)** — the general-purpose system bus connecting a GPU to the CPU and (by default) other GPUs
- **NVLink** — NVIDIA's proprietary direct, high-bandwidth GPU-to-GPU interconnect
- **NVSwitch** — a switch chip giving every GPU in a server a direct, full-bandwidth path to every other GPU
- **Topology** — the physical/logical layout of how GPUs connect to each other and the CPU
- **`nvidia-smi topo -m`** — the command that prints the interconnect type between every pair of GPUs
