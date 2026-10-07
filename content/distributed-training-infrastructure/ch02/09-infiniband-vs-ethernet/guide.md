# InfiniBand vs. Ethernet

Solara AI built solara-train's inter-node fabric on InfiniBand NDR rather than Ethernet. This lesson explains that choice concretely — the real latency and bandwidth numbers, what RDMA and GPUDirect actually buy you, and when Ethernet is a perfectly reasonable choice instead.

## What you'll learn

- Real latency and bandwidth numbers for InfiniBand NDR vs. common Ethernet deployments
- What RDMA and GPUDirect RDMA mean, and why they matter for NCCL specifically
- Why InfiniBand's lossless, credit-based fabric matters for collective operations
- When RoCEv2 (RDMA over Converged Ethernet) narrows the gap enough that Ethernet is the right call

## The numbers

| | InfiniBand NDR | Ethernet (RoCEv2, 400GbE) | Ethernet (plain TCP/IP) |
|---|---|---|---|
| Bandwidth per port | 400 Gb/s | 400 Gb/s | varies, often lower |
| Latency | roughly 1 microsecond or less, switch-to-switch | low microseconds with RDMA | tens of microseconds or more |
| RDMA support | native | yes, if configured (RoCEv2) | no (kernel TCP/IP stack) |
| Lossless fabric | yes, built-in credit-based flow control | requires PFC/ECN tuning | no, relies on TCP retransmission |

The headline difference isn't really raw bandwidth — modern Ethernet can match InfiniBand's 400 Gb/s port speed. It's **latency and loss behavior**, especially under the many-small-message traffic pattern that collective operations create.

## RDMA and GPUDirect RDMA

**RDMA (Remote Direct Memory Access)** lets one machine's NIC write directly into another machine's memory, bypassing the CPU and the OS kernel's network stack entirely. **GPUDirect RDMA** goes one step further: the NIC writes directly into GPU memory, so a gradient never has to be copied through host (CPU) RAM at all on its way across the network. InfiniBand has supported this natively for years; NCCL's `NCCL_NET_GDR_LEVEL` setting controls how aggressively it's used.

```bash
# How aggressively NCCL uses GPUDirect RDMA (skip host memory copies)
export NCCL_NET_GDR_LEVEL=PIX   # PIX/PHB/SYS — closer topology = more direct

# P2P transport level between GPUs (NVLink/PCIe) — separate from GDR
export NCCL_P2P_LEVEL=NVL
```

## Why losslessness matters for collectives

Plain Ethernet's TCP/IP stack handles packet loss by retransmitting — fine for most traffic, but a single dropped packet in the middle of a ring AllReduce stalls every GPU in the ring until it's resent. InfiniBand's fabric uses **credit-based flow control**: a sender only transmits when the receiver has confirmed buffer space is available, so packets essentially never get dropped due to congestion in the first place. RoCEv2 approximates this over Ethernet using Priority Flow Control (PFC) and ECN, but it takes careful switch configuration to get right — easier to get wrong than InfiniBand's native behavior.

## When Ethernet is the right call

Solara AI chose InfiniBand for solara-train because collective-heavy LLM training is exactly the worst-case traffic pattern for Ethernet's weaknesses. But for workloads with less synchronous, less latency-sensitive traffic — or where an organization already has deep Ethernet operational expertise and 400GbE RoCEv2 hardware — Ethernet is a legitimate, often cheaper choice. The decision isn't "InfiniBand is always better," it's "which fabric's weaknesses matter least for this specific traffic pattern."

## Key terms

- **RDMA** — direct memory-to-memory transfer between machines, bypassing CPU/OS network stack
- **GPUDirect RDMA** — RDMA directly into/out of GPU memory, skipping host RAM entirely
- **Credit-based flow control** — InfiniBand's native lossless mechanism; a sender waits for confirmed receiver buffer space
- **RoCEv2** — RDMA over Converged Ethernet v2, Ethernet's way of approximating InfiniBand's low-latency, lossless behavior

## Recap

InfiniBand NDR's real advantage over Ethernet isn't raw bandwidth, it's sub-microsecond latency and a natively lossless, credit-based fabric — both of which matter enormously for the many-small-message, fully-synchronous traffic pattern of collective communication. Next, Lesson 10 looks at how that fabric is actually wired together into a cluster-wide topology.
